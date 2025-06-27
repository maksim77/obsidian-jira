import { Editor, Notice, Plugin } from "obsidian";

import { renderString } from "nunjucks";

import { JiraSettings, JiraSettingTab, DEFAULT_SETTINGS } from "./settings";
import { JiraApi } from "./jiraApi";

export default class Jira extends Plugin {
	settings: JiraSettings;
	statusBarItemEl: HTMLElement;
	jiraApi: JiraApi;

	async onload() {
		await this.loadSettings();

		this.createJiraApi();

		this.addCommand({
			id: "create-issue",
			name: "Create issue",
			editorCallback: this.createCallback.bind(this),
		});

		this.addCommand({
			id: "update-issue",
			name: "Update issue",
			editorCallback: this.UpdateCallback.bind(this),
		});

		this.addCommand({
			id: "update-all-issues",
			name: "Update all issues",
			editorCallback: this.UpdateAllCallback.bind(this),
		});

		this.statusBarItemEl = this.addStatusBarItem();
		this.statusBarItemEl.addClass("jira-statusbar-btn");

		this.statusBarItemEl.addEventListener("click", () => {
			const file = this.app.workspace.getActiveFile();

			if (file?.basename) {
				this.UpdateIssue(file.basename);
			} else {
				new Notice("No active file to update.");
			}
		});

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				const file = this.app.workspace.getActiveFile();

				if (file && this.settings.issues.includes(file.basename)) {
					this.statusBarItemEl.show();
					this.statusBarItemEl.setText(`Update: ${file.basename}`);
				} else {
					this.statusBarItemEl.hide();
				}
			})
		);

		this.addSettingTab(new JiraSettingTab(this.app, this));
	}

	private createJiraApi() {
		this.jiraApi = new JiraApi(
			this.settings.apiUrl,
			this.settings.username,
			this.settings.password,
			this.settings.ignoreTLS
		);
	}

	private async saveIssueToFile(issueKey: string, data: any) {
		const filePath = `${this.settings.path}/${issueKey}.md`;
		const content = renderString(this.settings.template, data);
		await this.app.vault.adapter.write(filePath, content);
	}

	private async UpdateIssue(issueKey: string) {
		new Notice(`Updating ${issueKey}`);
		const data = await this.jiraApi.fetchIssue(issueKey);
		await this.saveIssueToFile(issueKey, data);
		new Notice(`Issue ${issueKey} updated`);
	}

	private async UpdateCallback() {
		const file = this.app.workspace.getActiveFile();
		if (file && this.settings.issues.includes(file.basename)) {
			const data = await this.jiraApi.fetchIssue(file.basename);

			await this.saveIssueToFile(file.basename, data);

			new Notice(`Issue ${file.basename} updated`);
		} else {
			new Notice("This note is not linked to a Jira issue.");
		}
	}

	private async UpdateAllCallback() {
		for (const issue of this.settings.issues) {
			this.UpdateIssue(issue);
		}
	}

	private async createCallback(editor: Editor) {
		const issueKey = editor.getSelection();
		const data = await this.jiraApi.fetchIssue(issueKey);

		await this.saveIssueToFile(issueKey, data);

		editor.replaceSelection(`[[${issueKey}]]`);
		if (!this.settings.issues.includes(issueKey)) {
			this.settings.issues.push(issueKey);
			this.saveSettings();
		}

		new Notice(`Note ${issueKey} created`);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.createJiraApi();
	}
}
