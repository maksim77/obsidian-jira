# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **File Path Migration**: Fixed issue where files would not be moved when their template path changed
  - Files are now automatically deleted from old locations when moved to new paths
  - Plugin settings are updated with new file paths
  - Users are notified when files are moved
  - Automatic migration of existing data from old format

## [1.1.0] - 2025-08-19

### Added
- Dynamic path rendering for saved files using template variables
- Support for organizing files by project and status (e.g., `jira/PROJECT/STATUS/issue.md`)

## [1.0.1] - Previous Release

### Added
- Initial release with basic Jira integration
- Issue fetching and note creation
- Template system with Nunjucks support

## [1.0.0] - Initial Release

### Added
- Basic plugin structure
- Core functionality for Jira issue management
