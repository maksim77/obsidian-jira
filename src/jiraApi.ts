import fetch from "node-fetch";
import https from "https";
import { Notice } from "obsidian";

export class JiraApi {
	constructor(
		url: string,
		username: string,
		password: string,
		ignoreTLS = true
	) {
		this.headers = {
			Accept: "application/json",
			Authorization:
				"Basic " +
				Buffer.from(`${username}:${password}`).toString("base64"),
		};
		this.url = `${url}/rest/api/2/issue/`;
		this.ignoreTLS = ignoreTLS;
	}

	private url: string;
	private headers: any;
	private ignoreTLS: boolean;

	public async fetchIssue(issueKey: string): Promise<any> {
		try {
			const options: any = { headers: this.headers };
			if (this.ignoreTLS) {
				options.agent = new https.Agent({ rejectUnauthorized: false });
			}
			const response = await fetch(this.url + issueKey, options);
			if (!response.ok) {
				const errorDetail = await response.text();
				throw new Error(
					`Error fetching issue: ${response.statusText}. Details: ${errorDetail}`
				);
			}
			const data: any = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching issue:", error);
			new Notice("Error fetching issue: " + error.message);
			throw error;
		}
	}
}
