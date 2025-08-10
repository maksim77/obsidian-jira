# Installation and Setup Guide

This guide provides step-by-step instructions for installing and configuring the Obsidian Jira Plugin.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Initial Configuration](#initial-configuration)
- [Security Setup](#security-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the plugin, ensure you have:

1. **Obsidian** installed (version 0.15.0 or higher)
2. **Jira Access** with API permissions
3. **Network Access** to your Jira instance
4. **Basic Knowledge** of your Jira instance URL and credentials

### Jira Requirements

- Jira instance must be accessible via HTTPS
- Your user account must have permission to view issues
- REST API must be enabled (enabled by default in most instances)

## Installation Methods

### Method 1: Manual Installation (Recommended)

1. **Download the Plugin**
   - Go to [GitHub Releases](https://github.com/maksim77/obsidian-jira/releases)
   - Download the latest release ZIP file
   - Extract the ZIP file to a temporary location

2. **Install in Obsidian**
   - Open Obsidian
   - Go to `Settings` → `Community plugins`
   - Turn off `Safe mode` if it's enabled
   - Click `Open plugins folder`
   - Copy the extracted plugin folder to the plugins directory
   - The folder structure should look like:
     ```
     .obsidian/plugins/
     └── obsidian-jira/
         ├── main.js
         ├── manifest.json
         └── styles.css
     ```

3. **Enable the Plugin**
   - Go back to `Settings` → `Community plugins`
   - Find "Jira Issue Notes" in the list
   - Toggle the switch to enable it

### Method 2: Community Plugins (Coming Soon)

Once the plugin is available in the Community Plugins list:

1. Open Obsidian settings
2. Go to `Community plugins`
3. Turn off `Safe mode`
4. Click `Browse`
5. Search for "Jira Issue Notes"
6. Click `Install`
7. Click `Enable`

## Initial Configuration

### Step 1: Access Plugin Settings

1. Open Obsidian settings (`Ctrl/Cmd + ,`)
2. Navigate to `Community plugins` → `Jira Issue Notes`
3. Click the gear icon next to the plugin name

### Step 2: Configure Basic Settings

#### Required Settings

**API URL**
- Enter your Jira instance URL
- Examples:
  - Cloud: `https://your-company.atlassian.net`
  - Server: `https://jira.yourcompany.com`
  - Data Center: `https://jira.yourcompany.com`
- **Important**: Include `https://` and don't add trailing slashes

**Username**
- Enter your Jira username or email address
- For Jira Cloud: Use your email address
- For Jira Server: Use your username

**Password**
- Enter your Jira password or API token
- **Recommendation**: Use an API token for better security

**Jira Notes Path**
- Specify the folder where issue notes will be saved
- Examples: `jira`, `issues`, `work/jira`
- The folder will be created automatically if it doesn't exist

#### Optional Settings

**Ignore TLS Certificate Errors**
- Enable only if your Jira instance uses self-signed certificates
- **Security Warning**: This reduces security and should only be used in trusted environments

**Template**
- Leave empty to use the default template
- See [Templates Guide](TEMPLATES.md) for customization options

### Step 3: Test Configuration

1. Save your settings
2. Create a test issue note:
   - Select an issue key (e.g., `PROJ-123`) in any note
   - Open command palette (`Ctrl/Cmd + Shift + P`)
   - Run `Jira: Create issue`
3. Check if the note is created successfully
4. Verify the content matches your Jira issue

## Security Setup

### Using API Tokens (Recommended)

For better security, especially with Jira Cloud, use API tokens instead of passwords:

#### Jira Cloud
1. Go to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click `Create API token`
3. Give it a meaningful label (e.g., "Obsidian Plugin")
4. Copy the generated token
5. Use the token as your password in the plugin settings

#### Jira Server/Data Center
1. Go to your Jira instance
2. Navigate to `User Settings` → `Personal Access Tokens`
3. Click `Create token`
4. Give it a name and set appropriate permissions
5. Copy the token and use it as your password

### Network Security

- Ensure your Jira instance uses HTTPS
- If using a corporate network, verify firewall rules allow API access
- Consider using VPN if accessing from external networks

### Credential Storage

- Credentials are stored locally in Obsidian's settings
- They are not transmitted to external servers except your Jira instance
- Consider using your system's credential manager for additional security

## Advanced Configuration

### Custom Templates

1. Go to plugin settings
2. In the `Template` field, enter your custom Nunjucks template
3. See [Templates Guide](TEMPLATES.md) for examples and syntax

### Multiple Jira Instances

Currently, the plugin supports one Jira instance at a time. For multiple instances:

1. Use different Obsidian vaults for different Jira instances
2. Or manually switch configurations as needed

### Folder Organization

Consider organizing your Jira notes by:

- **Project**: `jira/project-name/`
- **Issue Type**: `jira/bugs/`, `jira/stories/`, `jira/tasks/`
- **Status**: `jira/active/`, `jira/completed/`
- **Date**: `jira/2024/01/`

## Troubleshooting

### Common Issues

#### Connection Errors

**Error**: "Error fetching issue: 401 Unauthorized"
- **Solution**: Check your username and password
- Verify your account is active and not locked
- Try using an API token instead of password

**Error**: "Error fetching issue: 403 Forbidden"
- **Solution**: Verify you have permission to view the issue
- Check if the issue is in a private project
- Contact your Jira administrator

**Error**: "Error fetching issue: 404 Not Found"
- **Solution**: Verify the issue key is correct
- Check if the issue exists in your Jira instance
- Ensure you're using the correct Jira instance URL

#### Network Issues

**Error**: "Network timeout" or "Connection refused"
- **Solution**: Check your internet connection
- Verify the Jira URL is correct and accessible
- Try accessing Jira in your browser
- Check firewall settings

#### Certificate Errors

**Error**: "SSL certificate verification failed"
- **Solution**: Enable "Ignore TLS certificate errors" in settings
- Contact your Jira administrator for proper certificate setup
- Verify the certificate is valid and trusted

#### Template Errors

**Error**: "Template rendering failed"
- **Solution**: Check Nunjucks syntax in your template
- Verify field names exist in your Jira instance
- Use the curl command to explore available fields:
  ```bash
  curl -u username:password https://your-jira.com/rest/api/2/issue/PROJ-123
  ```

### Debug Mode

Enable debug logging for more detailed error information:

1. Open Obsidian settings
2. Go to `About`
3. Click `Open developer tools`
4. Check the console for detailed error messages

### Getting Help

If you're still experiencing issues:

1. **Check the logs**: Enable developer tools and look for error messages
2. **Test with curl**: Verify your Jira API access:
   ```bash
   curl -u username:password https://your-jira.com/rest/api/2/issue/PROJ-123
   ```
3. **Create an issue**: Report bugs on [GitHub Issues](https://github.com/maksim77/obsidian-jira/issues)
4. **Join discussions**: Ask questions in [GitHub Discussions](https://github.com/maksim77/obsidian-jira/discussions)

## Next Steps

After successful installation and configuration:

1. **Read the [Templates Guide](TEMPLATES.md)** to customize your note format
2. **Explore the [Usage Guide](../README.md#usage)** to learn how to use the plugin
3. **Join the community** to share templates and get help
4. **Consider contributing** to improve the plugin

## Support

- **Documentation**: [GitHub Wiki](https://github.com/maksim77/obsidian-jira/wiki)
- **Issues**: [GitHub Issues](https://github.com/maksim77/obsidian-jira/issues)
- **Discussions**: [GitHub Discussions](https://github.com/maksim77/obsidian-jira/discussions)
- **Author**: Maxim Syomochkin - [Website](https://mak-sim.ru)