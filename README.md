# Obsidian Jira Plugin

A plugin for [Obsidian](https://obsidian.md/) that enables you to create Markdown notes from Jira issues and keep them up to date automatically. Easily generate notes from your Jira tickets and ensure your vault always reflects the latest issue status.

## 🚀 Features

- **Fetch Jira Issues**: Create Markdown notes from Jira tickets using customizable templates
- **Auto-Update**: Keep your notes synchronized with the latest Jira issue status
- **Quick Actions**: Create issue notes from selected text in the editor
- **Status Bar Integration**: One-click updates directly from the status bar
- **Batch Updates**: Update all tracked issues with a single command
- **Flexible Templates**: Use Nunjucks templating for custom note formats
- **Self-Signed Certificates**: Support for Jira servers with self-signed certificates
- **Issue Management**: Track and manage your Jira issues from the settings panel

## 📦 Installation

### Manual Installation
1. Download the latest release from [GitHub Releases](https://github.com/maksim77/obsidian-jira/releases)
2. Extract the downloaded file
3. Place the extracted folder into your Obsidian vault's `.obsidian/plugins/` directory
4. Restart Obsidian
5. Enable the plugin in `Settings → Community plugins`

### Community Plugins (Coming Soon)
- The plugin will be available in the Obsidian Community Plugins list soon

## ⚙️ Configuration

### Initial Setup
1. Open Obsidian settings (`Ctrl/Cmd + ,`)
2. Navigate to `Community plugins → Jira Issue Notes`
3. Configure the following settings:

#### Required Settings
- **API URL**: Your Jira instance URL (e.g., `https://your-company.atlassian.net`)
- **Username**: Your Jira username or email
- **Password**: Your Jira password or API token
- **Jira notes path**: Folder where issue notes will be saved (e.g., `jira`)

#### Optional Settings
- **Ignore TLS certificate errors**: Enable for self-signed certificates (not recommended for production)
- **Template**: Custom Nunjucks template for note formatting

### Security Note
For better security, consider using an API token instead of your password:
1. Go to your Atlassian account settings
2. Navigate to Security → Create API token
3. Use the token as your password in the plugin settings

## 📝 Usage

### Creating Issue Notes

#### Method 1: From Selected Text
1. Select an issue key (e.g., `PROJ-123`) in any note
2. Open the command palette (`Ctrl/Cmd + Shift + P`)
3. Run `Jira: Create issue`
4. The plugin will fetch the issue and create a note in your specified folder

#### Method 2: Manual Creation
1. Open the command palette
2. Run `Jira: Create issue` (without selecting text)
3. Enter the issue key when prompted

### Updating Issues

#### Single Issue Update
- **Status Bar**: Click the status bar button when viewing an issue note
- **Command Palette**: Run `Jira: Update issue` while viewing an issue note
- **Hotkey**: Assign a custom hotkey in Obsidian settings

#### Batch Update
- Run `Jira: Update all issues` to update all tracked issues at once

### Managing Tracked Issues
- View all tracked issues in the plugin settings
- Add or remove issues from tracking
- Monitor sync status

## 🎨 Template System

The plugin uses [Nunjucks](https://mozilla.github.io/nunjucks/) templating engine for creating custom note formats.

### Available Data Fields
All Jira issue fields are available in the template. Common fields include:
- `{{ key }}` - Issue key (e.g., PROJ-123)
- `{{ fields.summary }}` - Issue summary/title
- `{{ fields.description }}` - Issue description
- `{{ fields.status.name }}` - Current status
- `{{ fields.assignee.displayName }}` - Assignee name
- `{{ fields.reporter.displayName }}` - Reporter name
- `{{ fields.issuetype.name }}` - Issue type
- `{{ fields.priority.name }}` - Priority level
- `{{ fields.project.key }}` - Project key
- `{{ fields.components }}` - Array of components

### Example Templates

#### Basic Template
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
jira_type: {{ fields.issuetype.name }}
jira_priority: {{ fields.priority.name }}
jira_link: https://your-jira.com/browse/{{ key }}
---

# {{ key }}: {{ fields.summary }}

**Status:** {{ fields.status.name }}
**Assignee:** {{ fields.assignee.displayName }}
**Type:** {{ fields.issuetype.name }}
**Priority:** {{ fields.priority.name }}

## Description
{{ fields.description }}

## Links
- [View in Jira](https://your-jira.com/browse/{{ key }})
```

#### Advanced Template with Components
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: "[[{{ fields.assignee.displayName }}]]"
jira_reporter: "[[{{ fields.reporter.displayName }}]]"
jira_type: {{ fields.issuetype.name }}
jira_project: {{ fields.project.key }}
jira_priority: {{ fields.priority.name }}
jira_components: [{% for comp in fields.components %}"{{ comp.name }}"{% if not loop.last %}, {% endif %}{% endfor %}]
jira_link: https://your-jira.com/browse/{{ key }}
---

# [[{{ key }}]]

**Summary:** {{ fields.summary }}

## Details
- **Status:** {{ fields.status.name }}
- **Assignee:** [[{{ fields.assignee.displayName }}]]
- **Reporter:** [[{{ fields.reporter.displayName }}]]
- **Type:** {{ fields.issuetype.name }}
- **Priority:** {{ fields.priority.name }}
- **Project:** {{ fields.project.key }}
- **Components:** {% for comp in fields.components %}{{ comp.name }}{% if not loop.last %}, {% endif %}{% endfor %}

## Description
{{ fields.description }}

## External Links
- [View in Jira](https://your-jira.com/browse/{{ key }})
```

### Exploring Available Fields
To see all available fields for your Jira instance:
```bash
curl -u your-username:password https://your-jira.com/rest/api/2/issue/PROJ-123
```

## 🔧 Troubleshooting

### Common Issues

#### Connection Errors
- Verify your API URL is correct (include `https://`)
- Check your username and password
- Ensure your Jira instance is accessible from your network

#### Template Errors
- Check Nunjucks syntax in your template
- Verify field names exist in your Jira instance
- Use the curl command above to explore available fields

#### Certificate Errors
- Enable "Ignore TLS certificate errors" for self-signed certificates
- Contact your Jira administrator for proper certificate setup

#### Permission Errors
- Ensure your Jira user has permission to view the issues
- Check if your account is active and not locked

### Debug Mode
Enable debug logging in Obsidian settings to get more detailed error information.

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs and request features via [GitHub Issues](https://github.com/maksim77/obsidian-jira/issues)
- Submit pull requests for improvements
- Share templates and use cases with the community

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Run in development mode: `npm run dev`
4. Build for production: `npm run build`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the [Obsidian](https://obsidian.md/) community
- Uses [Nunjucks](https://mozilla.github.io/nunjucks/) for templating
- Inspired by the need for better Jira integration in note-taking workflows

## 📚 Documentation

For detailed guides and examples, see the [docs](docs/) folder:

- **[Installation Guide](docs/INSTALLATION.md)** - Step-by-step setup instructions
- **[Templates Guide](docs/TEMPLATES.md)** - Custom template examples and syntax
- **[Use Cases](docs/USE_CASES.md)** - Real-world examples and scenarios
- **[FAQ](docs/FAQ.md)** - Frequently asked questions
- **[Development Guide](docs/DEVELOPMENT.md)** - Contributing to the project
- **[Default Template](docs/DEFAULT_TEMPLATE.md)** - Default template breakdown

## 📞 Support & Feedback

- **GitHub Issues**: [Report bugs or request features](https://github.com/maksim77/obsidian-jira/issues)
- **Discussions**: [Join community discussions](https://github.com/maksim77/obsidian-jira/discussions)
- **Author**: Maxim Syomochkin - [Website](https://mak-sim.ru)

---

**Version:** 1.0.1 | **Last Updated:** 2024
