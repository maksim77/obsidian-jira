import { App, PluginSettingTab, Setting, setIcon } from "obsidian";

import Jira from "./main";
import { Notice } from "obsidian";

export interface JiraSettings {
	apiUrl: string;
	username: string;
	password: string;
	path: string;
	template: string;
	issues: { key: string; path: string }[];
	ignoreTLS: boolean;
}

export const DEFAULT_SETTINGS: JiraSettings = {
	apiUrl: "https://jira.example.com",
	username: "",
	password: "",
	path: "jira",
	template: "",
	issues: [],
	ignoreTLS: false,
};

export class JiraSettingTab extends PluginSettingTab {
	plugin: Jira;

	constructor(app: App, plugin: Jira) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl).setName("API URL").addText((text) =>
			text
				.setValue(this.plugin.settings.apiUrl)
				.onChange(async (value) => {
					this.plugin.settings.apiUrl = value;
					await this.plugin.saveSettings();
				})
		);
		new Setting(containerEl).setName("Username").addText((text) =>
			text
				.setValue(this.plugin.settings.username)
				.onChange(async (value) => {
					this.plugin.settings.username = value;
					await this.plugin.saveSettings();
				})
		);
		new Setting(containerEl).setName("Password").addText((text) => {
			text.setValue(this.plugin.settings.password).onChange(
				async (value) => {
					this.plugin.settings.password = value;
					await this.plugin.saveSettings();
				}
			);
			text.inputEl.type = "password";

			const toggleBtn = document.createElement("button");
			toggleBtn.type = "button";
			toggleBtn.classList.add("jira-password-toggle");
			let visible = false;

			setIcon(toggleBtn, "eye");

			toggleBtn.onclick = () => {
				visible = !visible;
				text.inputEl.type = visible ? "text" : "password";
				setIcon(toggleBtn, visible ? "eye-off" : "eye");
			};

			text.inputEl.parentElement?.appendChild(toggleBtn);
		});
		new Setting(containerEl).setName("Jira notes path").addText((text) =>
			text.setValue(this.plugin.settings.path).onChange(async (value) => {
				this.plugin.settings.path = value;
				await this.plugin.saveSettings();
			})
		);

		new Setting(containerEl)
			.setName("Ignore TLS certificate errors")
			.setDesc("Disable TLS certificate validation (not secure)")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.ignoreTLS)
					.onChange(async (value) => {
						this.plugin.settings.ignoreTLS = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl).setName("Template").addTextArea((text) => {
			text.setValue(this.plugin.settings.template).onChange(
				async (value) => {
					this.plugin.settings.template = value;
					await this.plugin.saveSettings();
				}
			);
			text.inputEl.setAttr("rows", 25);
			text.inputEl.setAttr("cols", 50);
		});

		const details = document.createElement("details");
		const summary = document.createElement("summary");
		summary.textContent = "Issues (expand to view/edit)";
		details.appendChild(summary);

		const issuesList = document.createElement("ul");
		this.plugin.settings.issues.forEach((issue, idx) => {
			const li = document.createElement("li");
			li.textContent = issue.key;

			const removeBtn = document.createElement("button");
			removeBtn.type = "button";
			removeBtn.classList.add("jira-issue-remove-btn");
			removeBtn.title = "Remove";
			setIcon(removeBtn, "trash");

			removeBtn.onclick = async () => {
				this.plugin.settings.issues.splice(idx, 1);
				await this.plugin.saveSettings();
				this.display();
			};
			li.appendChild(removeBtn);

			issuesList.appendChild(li);
		});
		details.appendChild(issuesList);

		const addDiv = document.createElement("div");
		const input = document.createElement("input");
		input.type = "text";
		input.placeholder = "Add issue (e.g., JRA-123)";
		addDiv.appendChild(input);

		const addBtn = document.createElement("button");
		addBtn.textContent = "Add";
		addBtn.onclick = async () => {
			const value = input.value.trim();
			if (value) {
				const existingIssue = this.plugin.settings.issues.find(
					(issue) => issue.key === value
				);
				if (!existingIssue) {
					this.plugin.settings.issues.push({ key: value, path: "" });
					await this.plugin.saveSettings();
					this.display();
				} else {
					new Notice("Issue already added - this issue key is already in the list.");
				}
			}
			input.value = "";
		};
		addDiv.appendChild(addBtn);

		details.appendChild(addDiv);

		containerEl.appendChild(details);
	}
}
