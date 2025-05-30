# Obsidian Jira Plugin

A plugin for [Obsidian](https://obsidian.md/) that enables you to create Markdown notes from Jira issues and keep them up to date automatically. Easily generate notes from your Jira tickets and ensure your vault always reflects the latest issue status.

## Features

- Fetch Jira issues and save them as Markdown notes using a customizable template.
- Update individual or all tracked issues with a single click.
- Create new issue notes from selected text in the editor.
- Manage your Jira connection and tracked issues from the settings tab.
- Status bar button for quick updates of the current issue note.
- Supports ignoring TLS certificate errors (for self-signed Jira servers).

## Installation

1. **Manual Installation**
   - Download the plugin files (`main.ts`, `settings.ts`, `styles.css`) and build them using your preferred TypeScript build process.
   - Place the compiled files in your Obsidian vault's `.obsidian/plugins/your-plugin-folder/` directory.

2. **Via Community Plugins**
   - (Not yet available in the community plugins list.)

## Usage

1. **Configure Settings**
   - Go to `Settings → Jira Plugin`.
   - Enter your Jira API URL, username, and password.
   - Set the path where issue notes will be saved (e.g., `jira`).
   - Optionally, customize the Markdown template for issue notes.
   - Toggle "Ignore TLS certificate errors" if your Jira server uses a self-signed certificate.

2. **Creating an Issue Note**
   - Select an issue key (e.g., `PROJ-123`) in the editor.
   - Run the command palette and select `Jira: Create issue`.
   - The plugin will fetch the issue from Jira, create a note using your template, and link it.

3. **Updating Issues**
   - Open an issue note and click the status bar button to update it.
   - Or, use the command palette:
     - `Jira: Update issue` updates the current issue note.
     - `Jira: Update all issues` updates all tracked issues.

4. **Managing Issues**
   - In the settings tab, view, add, or remove tracked issues.

## Template

The template is filled with data received from Jira.
You can explore the available data fields by performing a `curl` request to your Jira API, for example:

```sh
curl -u your-username:password https://jira.example.com/rest/api/2/issue/PROJ-123
```

The template uses [Nunjucks](https://mozilla.github.io/nunjucks/) syntax. Example:

### Example template
```nunjucks
---
jira_assignee: "[[{{ fields.assignee.displayName }}]]"
jira_reporter:  "[[{{ fields.reporter.displayName }}]]"
jira_type:  {{ fields.issuetype.name }}
jira_project: {{fields.project.key}}
jira_status: {{fields.status.name}}
jira_summary: {{ fields.summary }}
jira_priority: {{fields.priority.name}}
jira_link: https://jira.example.com.com/browse/{{key}}
jira_components: [{% for comp in fields.components %}"{{ comp.name }}"{% if not loop.last %}, {% endif %}{% endfor %}]
---
# [[{{ key }}]]

{{ fields.description }}

```

## License
MIT. See LICENSE for details.

## Support & Feedback
For questions, suggestions, or bug reports, please open an issue on the GitHub repository.
