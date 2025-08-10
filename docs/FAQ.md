# Frequently Asked Questions (FAQ)

This document answers common questions about the Obsidian Jira Plugin.

## Table of Contents
- [General Questions](#general-questions)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Templates](#templates)
- [Troubleshooting](#troubleshooting)
- [Security](#security)

## General Questions

### What is the Obsidian Jira Plugin?

The Obsidian Jira Plugin is a community plugin for Obsidian that allows you to:
- Create Markdown notes from Jira issues
- Keep your notes synchronized with Jira
- Manage your Jira workflow directly from Obsidian
- Use customizable templates for note formatting

### What versions of Obsidian are supported?

The plugin requires Obsidian version 0.15.0 or higher.

### Is this plugin free to use?

Yes, the plugin is completely free and open-source under the MIT license.

### Can I use this plugin with any Jira instance?

Yes, the plugin works with:
- Jira Cloud (Atlassian Cloud)
- Jira Server (self-hosted)
- Jira Data Center

### Does the plugin work offline?

The plugin requires an internet connection to fetch data from Jira. However, once notes are created, you can view and edit them offline.

## Installation & Setup

### How do I install the plugin?

See the [Installation Guide](INSTALLATION.md) for detailed instructions. The basic steps are:
1. Download the plugin from GitHub Releases
2. Extract and copy to your Obsidian plugins folder
3. Enable the plugin in Obsidian settings

### Why can't I see the plugin in the Community Plugins list?

The plugin is not yet available in the official Community Plugins list. You need to install it manually for now.

### Do I need to restart Obsidian after installation?

Yes, you should restart Obsidian after installing the plugin to ensure it loads properly.

### Can I install the plugin on multiple devices?

Yes, you can install the plugin on multiple devices. Each device will need its own installation and configuration.

## Configuration

### What Jira credentials do I need?

You need:
- **API URL**: Your Jira instance URL (e.g., `https://your-company.atlassian.net`)
- **Username**: Your Jira username or email
- **Password**: Your Jira password or API token

### Should I use my password or an API token?

**API tokens are recommended** for better security, especially with Jira Cloud. See the [Security Setup section](INSTALLATION.md#security-setup) for instructions.

### What should I put in the "Jira notes path" field?

This is the folder where your Jira issue notes will be saved. Examples:
- `jira` - Creates notes in a "jira" folder
- `work/issues` - Creates notes in "work/issues" folder
- `projects/jira` - Creates notes in "projects/jira" folder

### Can I change the notes path after creating notes?

Yes, you can change the path in settings. However, existing notes won't be moved automatically. You'll need to move them manually or recreate them.

### What does "Ignore TLS certificate errors" do?

This option disables SSL certificate validation. Only enable it if your Jira instance uses self-signed certificates. **This reduces security and should only be used in trusted environments.**

## Usage

### How do I create a note from a Jira issue?

**Method 1: From selected text**
1. Select an issue key (e.g., `PROJ-123`) in any note
2. Open command palette (`Ctrl/Cmd + Shift + P`)
3. Run `Jira: Create issue`

**Method 2: Manual creation**
1. Open command palette
2. Run `Jira: Create issue`
3. Enter the issue key when prompted

### How do I update an existing issue note?

**Method 1: Status bar button**
- Click the status bar button when viewing an issue note

**Method 2: Command palette**
- Run `Jira: Update issue` while viewing an issue note

**Method 3: Hotkey**
- Assign a custom hotkey in Obsidian settings

### How do I update all tracked issues at once?

Run `Jira: Update all issues` from the command palette.

### Can I create notes for multiple issues at once?

Currently, you can only create one issue note at a time. You can use the "Update all issues" command to update multiple existing notes.

### What happens if I delete a Jira issue note?

The note is only deleted from your Obsidian vault. It doesn't affect the actual Jira issue. You can recreate the note using the same issue key.

### Can I edit the generated notes?

Yes, you can edit the notes like any other Obsidian note. However, your changes will be overwritten when you update the issue.

### How do I stop tracking an issue?

Remove the issue key from the "Tracked Issues" list in the plugin settings.

## Templates

### What is a template?

A template is a Nunjucks template that defines how your Jira issue notes are formatted. It controls the structure, metadata, and content of the generated notes.

### How do I create a custom template?

1. Go to plugin settings
2. Enter your Nunjucks template in the "Template" field
3. See the [Templates Guide](TEMPLATES.md) for examples and syntax

### What fields are available in templates?

All Jira issue fields are available. Common fields include:
- `{{ key }}` - Issue key
- `{{ fields.summary }}` - Issue title
- `{{ fields.description }}` - Issue description
- `{{ fields.status.name }}` - Current status
- `{{ fields.assignee.displayName }}` - Assignee name

See the [Templates Guide](TEMPLATES.md) for a complete list.

### Can I use different templates for different issue types?

Currently, the plugin uses one template for all issue types. You can use conditional logic in your template to format different issue types differently.

### How do I include Obsidian links in my template?

Use double brackets for internal links:
```nunjucks
**Assignee:** [[{{ fields.assignee.displayName }}]]
**Project:** [[{{ fields.project.name }}]]
```

### Can I use custom Jira fields in templates?

Yes, custom fields follow the pattern `{{ fields.customfield_XXXXX }}`. Use the curl command to discover available custom fields:
```bash
curl -u username:password https://your-jira.com/rest/api/2/issue/PROJ-123
```

## Troubleshooting

### The plugin won't connect to Jira

**Check these common issues:**
1. Verify your API URL is correct (include `https://`)
2. Check your username and password
3. Ensure your Jira instance is accessible
4. Try using an API token instead of password
5. Check if your account has permission to view issues

### I get a "401 Unauthorized" error

This means your credentials are incorrect or your account is locked. Try:
1. Double-check your username and password
2. Use an API token instead of password
3. Verify your account is active
4. Check if you can log into Jira normally

### I get a "403 Forbidden" error

This means you don't have permission to view the issue. Check:
1. If the issue is in a private project
2. Your user permissions in Jira
3. Contact your Jira administrator

### I get a "404 Not Found" error

This means the issue doesn't exist or you're using the wrong Jira instance. Check:
1. The issue key is correct
2. You're using the right Jira instance URL
3. The issue exists in your Jira instance

### My template isn't working

**Common template issues:**
1. Check Nunjucks syntax
2. Verify field names exist in your Jira instance
3. Use the curl command to explore available fields
4. Check for missing closing tags

### The status bar button doesn't appear

The status bar button only appears when viewing a tracked issue note. Make sure:
1. The note filename matches an issue key
2. The issue is in your tracked issues list
3. The plugin is enabled

### Notes aren't being created in the right folder

Check your "Jira notes path" setting. The folder will be created automatically if it doesn't exist.

## Security

### Are my credentials secure?

- Credentials are stored locally in Obsidian's settings
- They are only sent to your Jira instance
- Consider using API tokens instead of passwords for better security

### Should I enable "Ignore TLS certificate errors"?

Only enable this if your Jira instance uses self-signed certificates and you're in a trusted environment. This reduces security.

### Can I use the plugin with a corporate Jira instance?

Yes, but you may need to:
1. Configure corporate firewall rules
2. Use VPN if accessing from external networks
3. Work with your IT department for proper certificate setup

### What permissions does the plugin need?

The plugin only needs:
- Permission to view Jira issues
- Network access to your Jira instance
- File system access to create notes in your Obsidian vault

### Can I revoke access later?

Yes, you can:
1. Disable the plugin in Obsidian settings
2. Delete your API token in Jira (if using one)
3. Change your Jira password
4. Remove the plugin entirely

## Advanced Questions

### Can I use the plugin with multiple Jira instances?

Currently, the plugin supports one Jira instance at a time. For multiple instances, use different Obsidian vaults or manually switch configurations.

### Can I sync notes between devices?

The plugin doesn't sync notes between devices. However, if you use Obsidian Sync or another sync service, your notes will sync normally.

### Can I export my configuration?

Plugin settings are stored in your Obsidian vault's `.obsidian/plugins/jira-issue-notes/data.json` file. You can copy this file to backup your configuration.

### Can I contribute to the plugin?

Yes! Contributions are welcome. See the [Contributing section](../README.md#contributing) for details.

### Where can I get help?

- **Documentation**: [GitHub Wiki](https://github.com/maksim77/obsidian-jira/wiki)
- **Issues**: [GitHub Issues](https://github.com/maksim77/obsidian-jira/issues)
- **Discussions**: [GitHub Discussions](https://github.com/maksim77/obsidian-jira/discussions)
- **Author**: Maxim Syomochkin - [Website](https://mak-sim.ru)

---

**Still have questions?** Feel free to ask in the [GitHub Discussions](https://github.com/maksim77/obsidian-jira/discussions) or create an [issue](https://github.com/maksim77/obsidian-jira/issues).