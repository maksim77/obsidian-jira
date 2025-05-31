import { App, PluginSettingTab, Setting } from "obsidian";

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

			const icon = createEyeIcon();
			toggleBtn.appendChild(icon);

			toggleBtn.onclick = () => {
				visible = !visible;
				text.inputEl.type = visible ? "text" : "password";
				toggleBtn.replaceChild(
					visible ? createEyeOffIcon() : createEyeIcon(),
					toggleBtn.firstChild!
				);
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
			removeBtn.appendChild(createTrashIcon());

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

function createEyeIcon(): SVGSVGElement {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "18");
	svg.setAttribute("height", "18");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("stroke", "currentColor");
	svg.setAttribute("stroke-width", "2");
	svg.setAttribute("stroke-linecap", "round");
	svg.setAttribute("stroke-linejoin", "round");

	const path1 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	path1.setAttribute("d", "M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z");
	const circle = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"circle"
	);
	circle.setAttribute("cx", "12");
	circle.setAttribute("cy", "12");
	circle.setAttribute("r", "3");

	svg.appendChild(path1);
	svg.appendChild(circle);
	return svg;
}

// Функция для создания SVG-иконки "глаз зачёркнутый"
function createEyeOffIcon(): SVGSVGElement {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "18");
	svg.setAttribute("height", "18");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("stroke", "currentColor");
	svg.setAttribute("stroke-width", "2");
	svg.setAttribute("stroke-linecap", "round");
	svg.setAttribute("stroke-linejoin", "round");

	const path1 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	path1.setAttribute(
		"d",
		"M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06"
	);
	const path2 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	path2.setAttribute("d", "M1 1l22 22");
	const path3 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	path3.setAttribute("d", "M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47");
	const path4 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	path4.setAttribute("d", "M14.47 14.47A3 3 0 0 1 12 9a3 3 0 0 1-2.47 5.47");

	svg.appendChild(path1);
	svg.appendChild(path2);
	svg.appendChild(path3);
	svg.appendChild(path4);
	return svg;
}

// Функция для создания SVG-иконки "корзина" (удаление)
function createTrashIcon(): SVGSVGElement {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "16");
	svg.setAttribute("height", "16");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("stroke", "red");
	svg.setAttribute("stroke-width", "2");
	svg.setAttribute("stroke-linecap", "round");
	svg.setAttribute("stroke-linejoin", "round");

	const polyline = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"polyline"
	);
	polyline.setAttribute("points", "3 6 5 6 21 6");
	const path1 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"path"
	);
	path1.setAttribute(
		"d",
		"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
	);
	const line1 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"line"
	);
	line1.setAttribute("x1", "10");
	line1.setAttribute("y1", "11");
	line1.setAttribute("x2", "10");
	line1.setAttribute("y2", "17");
	const line2 = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"line"
	);
	line2.setAttribute("x1", "14");
	line2.setAttribute("y1", "11");
	line2.setAttribute("x2", "14");
	line2.setAttribute("y2", "17");

	svg.appendChild(polyline);
	svg.appendChild(path1);
	svg.appendChild(line1);
	svg.appendChild(line2);
	return svg;
}
