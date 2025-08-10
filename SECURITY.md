# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### 1. **DO NOT** create a public GitHub issue
Security vulnerabilities should be reported privately to prevent exploitation.

### 2. Email the security team
Send an email to [security@mak-sim.ru](mailto:security@mak-sim.ru) with:
- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if available)

### 3. What to expect
- **Response time**: We aim to respond within 48 hours
- **Assessment**: We'll assess the vulnerability and determine severity
- **Fix timeline**: Critical issues will be addressed immediately
- **Credit**: We'll credit you in the security advisory (if desired)

## Security Best Practices

### For Users
- **Keep updated**: Always use the latest version of the plugin
- **Secure credentials**: Use API tokens instead of passwords
- **Network security**: Ensure your Jira instance uses HTTPS
- **Access control**: Limit plugin access to necessary users only

### For Developers
- **Dependency updates**: Keep dependencies updated
- **Code review**: All changes are reviewed for security issues
- **Testing**: Security testing is part of our development process
- **Documentation**: Security considerations are documented

## Known Security Considerations

### API Credentials
- Credentials are stored locally in Obsidian settings
- They are only transmitted to your Jira instance
- Consider using API tokens for better security

### Network Communication
- All communication uses HTTPS
- Self-signed certificates can be bypassed (use with caution)
- No data is transmitted to external servers except Jira

### File System Access
- The plugin creates and modifies files in your Obsidian vault
- Ensure your vault is in a secure location
- Consider vault encryption for sensitive data

## Security Updates

Security updates will be released as:
- **Patch releases**: For critical security fixes
- **Minor releases**: For important security improvements
- **Major releases**: For significant security enhancements

## Disclosure Policy

1. **Private disclosure**: Vulnerabilities are disclosed privately first
2. **Coordinated disclosure**: We work with reporters on disclosure timing
3. **Public disclosure**: After fixes are available, we publish security advisories
4. **Credit**: We credit security researchers in advisories (with permission)

## Security Team

- **Primary Contact**: [security@mak-sim.ru](mailto:security@mak-sim.ru)
- **Backup Contact**: [maksim@mak-sim.ru](mailto:maksim@mak-sim.ru)
- **Response Time**: 48 hours for initial response

## Security Resources

- [GitHub Security Advisories](https://github.com/maksim77/obsidian-jira/security/advisories)
- [Dependency Security](https://github.com/maksim77/obsidian-jira/security/dependabot)
- [Security Policy](https://github.com/maksim77/obsidian-jira/security/policy)

---

**Thank you for helping keep our community secure!**