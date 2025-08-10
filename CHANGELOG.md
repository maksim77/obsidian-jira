# Changelog

All notable changes to the Obsidian Jira Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced documentation with comprehensive guides
- New template examples and use cases
- Improved error handling and user feedback
- Better security recommendations

### Changed
- Updated README with better structure and examples
- Improved template documentation
- Enhanced installation instructions

### Fixed
- Template rendering issues with special characters
- Connection error handling improvements

## [1.0.1] - 2024-01-15

### Added
- Support for self-signed certificates
- Status bar integration for quick updates
- Batch update functionality for all tracked issues
- Customizable Nunjucks templates
- Issue tracking management in settings

### Changed
- Improved error messages and user feedback
- Enhanced settings UI with password toggle
- Better template handling and validation

### Fixed
- Connection issues with certain Jira instances
- Template rendering errors with null fields
- Settings persistence issues

## [1.0.0] - 2024-01-01

### Added
- Initial release of Obsidian Jira Plugin
- Basic Jira issue fetching and note creation
- Simple template system
- Settings configuration
- Command palette integration
- Manual installation support

### Features
- Create Markdown notes from Jira issues
- Update individual issue notes
- Basic template customization
- Jira API integration
- Obsidian command integration

---

## Version History

### Version 1.0.1
- **Release Date**: January 15, 2024
- **Key Features**: Status bar integration, batch updates, self-signed certificate support
- **Improvements**: Better error handling, enhanced UI, improved templates

### Version 1.0.0
- **Release Date**: January 1, 2024
- **Key Features**: Initial release with core functionality
- **Foundation**: Basic Jira integration, template system, settings management

---

## Migration Guide

### From 1.0.0 to 1.0.1

#### Breaking Changes
- None

#### New Features
- Status bar button for quick updates
- Batch update functionality
- Self-signed certificate support
- Enhanced template system

#### Configuration Changes
- No configuration changes required
- New optional settings available:
  - Ignore TLS certificate errors
  - Enhanced template options

#### Template Changes
- Templates remain compatible
- New template features available:
  - Better conditional rendering
  - Enhanced field handling
  - Improved error handling

---

## Contributing

When contributing to this project, please update the changelog appropriately:

1. **Added** for new features
2. **Changed** for changes in existing functionality
3. **Deprecated** for soon-to-be removed features
4. **Removed** for now removed features
5. **Fixed** for any bug fixes
6. **Security** in case of vulnerabilities

### Changelog Entry Format

```markdown
### Added
- New feature description

### Changed
- Change description

### Fixed
- Bug fix description
```

---

## Release Process

1. **Update Version**: Run `npm run version` to bump version numbers
2. **Update Changelog**: Add entries for the new version
3. **Build**: Run `npm run build` to create production files
4. **Test**: Verify all functionality works correctly
5. **Tag**: Create a git tag for the release
6. **Release**: Create GitHub release with built files
7. **Document**: Update documentation if needed

---

## Support

For questions about specific versions or migration help:

- **GitHub Issues**: [Report bugs](https://github.com/maksim77/obsidian-jira/issues)
- **Discussions**: [Ask questions](https://github.com/maksim77/obsidian-jira/discussions)
- **Documentation**: [Installation Guide](docs/INSTALLATION.md), [FAQ](docs/FAQ.md)