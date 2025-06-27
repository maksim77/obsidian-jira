import { App, PluginSettingTab, Setting, setIcon } from "obsidian";

import Jira from "./main";

export interface JiraSettings {
	apiUrl: string;
	username: string;
	password: string;
	path: string;
	template: string;
	issues: string[];
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

		new Setting(containerEl).setName("apiUrl").addText((text) =>
			text
				.setValue(this.plugin.settings.apiUrl)
				.onChange(async (value) => {
					this.plugin.settings.apiUrl = value;
					await this.plugin.saveSettings();
				})
		);
		new Setting(containerEl).setName("username").addText((text) =>
			text
				.setValue(this.plugin.settings.username)
				.onChange(async (value) => {
					this.plugin.settings.username = value;
					await this.plugin.saveSettings();
				})
		);
		new Setting(containerEl).setName("password").addText((text) => {
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
		new Setting(containerEl).setName("path").addText((text) =>
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

		new Setting(containerEl).setName("template").addTextArea((text) => {
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
			li.textContent = issue;

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

		// Форма для добавления нового issue
		const addDiv = document.createElement("div");
		const input = document.createElement("input");
		input.type = "text";
		input.placeholder = "Add issue...";
		addDiv.appendChild(input);

		const addBtn = document.createElement("button");
		addBtn.textContent = "Add";
		addBtn.onclick = async () => {
			const value = input.value.trim();
			if (value && !this.plugin.settings.issues.includes(value)) {
				this.plugin.settings.issues.push(value);
				await this.plugin.saveSettings();
				this.display();
			}
			input.value = "";
		};
		addDiv.appendChild(addBtn);

		details.appendChild(addDiv);

		containerEl.appendChild(details);
	}
}
