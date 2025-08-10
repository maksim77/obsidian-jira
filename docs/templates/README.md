# Template Examples

This directory contains ready-to-use Nunjucks templates for creating Jira issue notes. Copy any file into your vault and paste its contents into the plugin settings Template field.

- `minimal.njk`: Minimal frontmatter and body with summary and description.
- `issue-full.njk`: Rich frontmatter and structured sections (people, project, links).
- `changelog.njk`: Compact layout highlighting status and a simple changelog list.

Variables available depend on the Jira API response. Common paths:
- `key` — issue key (e.g., `PROJ-123`)
- `fields.summary`, `fields.description`
- `fields.status.name`, `fields.issuetype.name`, `fields.priority.name`
- `fields.assignee.displayName`, `fields.reporter.displayName`
- `fields.project.key`, `fields.components`, `fields.fixVersions`, `fields.labels`

Optional contextual variables supported by some templates:
- `baseUrl` — base URL of your Jira instance (e.g., `https://jira.example.com`)
- `browseUrl` — direct URL to the issue (overrides auto-built link from `baseUrl`)
- `changelog` — include if your API call includes changelog expansion

Tips:
- If you need changelog data, make sure your request expands it (e.g., `?expand=changelog`).
- Adjust frontmatter keys to match your vault conventions.
- Use Obsidian links in frontmatter (e.g., `[[{{ fields.assignee.displayName }}]]`) if you maintain people notes.