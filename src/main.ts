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

				if (file && this.settings.issues.some(issue => issue.key === file.basename)) {
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
		const newFilePath = renderString(`${this.settings.path}/${issueKey}.md`, data);
		const content = renderString(this.settings.template, data);
		
		// Найти существующий файл для этого issue
		const existingIssue = this.settings.issues.find(issue => issue.key === issueKey);
		const oldFilePath = existingIssue?.path;
		
		// Удалить старый файл, если он существует и отличается от нового
		if (oldFilePath && oldFilePath !== newFilePath) {
			try {
				await this.app.vault.adapter.remove(oldFilePath);
				new Notice(`Moved ${issueKey} from ${oldFilePath} to ${newFilePath}`);
			} catch (error) {
				console.warn(`Could not remove old file ${oldFilePath}:`, error);
			}
		}
		
		// Создать новый файл
		await this.app.vault.adapter.write(newFilePath, content);
		
		// Обновить путь в настройках
		if (existingIssue) {
			existingIssue.path = newFilePath;
		} else {
			this.settings.issues.push({ key: issueKey, path: newFilePath });
		}
		await this.saveSettings();
	}

	private async UpdateIssue(issueKey: string) {
		new Notice(`Updating ${issueKey}`);
		const data = await this.jiraApi.fetchIssue(issueKey);
		await this.saveIssueToFile(issueKey, data);
		new Notice(`Issue ${issueKey} updated`);
	}

	private async UpdateCallback() {
		const file = this.app.workspace.getActiveFile();
		if (file && this.settings.issues.some(issue => issue.key === file.basename)) {
			const data = await this.jiraApi.fetchIssue(file.basename);

			await this.saveIssueToFile(file.basename, data);

			new Notice(`Issue ${file.basename} updated`);
		} else {
			new Notice("This note is not linked to a Jira issue.");
		}
	}

	private async UpdateAllCallback() {
		for (const issue of this.settings.issues) {
			this.UpdateIssue(issue.key);
		}
	}

	private async createCallback(editor: Editor) {
		const issueKey = editor.getSelection();
		const data = await this.jiraApi.fetchIssue(issueKey);

		await this.saveIssueToFile(issueKey, data);

		editor.replaceSelection(`[[${issueKey}]]`);
		if (!this.settings.issues.some(issue => issue.key === issueKey)) {
			// Путь будет добавлен в saveIssueToFile
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
		
		// Миграция старых данных issues из string[] в объекты
		if (this.settings.issues.length > 0 && typeof this.settings.issues[0] === 'string') {
			const oldIssues = this.settings.issues as unknown as string[];
			this.settings.issues = oldIssues.map(key => ({ key, path: "" }));
			await this.saveSettings();
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.createJiraApi();
	}
}
