# Contributing to Obsidian Jira Plugin

Thank you for your interest in contributing to the Obsidian Jira Plugin! This document provides guidelines and information for contributors.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guides](#style-guides)
- [Additional Notes](#additional-notes)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs
- Use the [bug report template](.github/issue_template.md)
- Include detailed steps to reproduce
- Provide environment information
- Include screenshots if applicable

### Suggesting Enhancements
- Use the [feature request template](.github/issue_template.md)
- Describe the problem and proposed solution
- Consider alternatives you've explored
- Provide use cases and examples

### Pull Requests
- Fork the repository
- Create a feature branch
- Make your changes
- Follow the [style guides](#style-guides)
- Submit a pull request

### Documentation
- Improve existing documentation
- Add examples and use cases
- Fix typos and clarify instructions
- Translate documentation

### Testing
- Test new features thoroughly
- Report bugs you find
- Help improve test coverage
- Test on different platforms

## Development Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git
- Obsidian (for testing)

### Getting Started
1. **Fork and clone** the repository
   ```bash
   git clone https://github.com/your-username/obsidian-jira.git
   cd obsidian-jira
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up development environment**
   ```bash
   npm run prepare  # Install Git hooks
   ```

4. **Start development mode**
   ```bash
   npm run dev
   ```

5. **Link to Obsidian**
   - Copy built files to your Obsidian plugins folder
   - Or create a symbolic link for development

### Available Scripts
- `npm run dev` - Development build with watch mode
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking
- `npm run clean` - Clean build files

## Pull Request Process

### Before Submitting
1. **Test your changes**
   - Test on different platforms
   - Verify all functionality works
   - Check for regressions

2. **Follow style guides**
   - Run `npm run lint` and `npm run format`
   - Ensure code passes type checking
   - Follow commit message conventions

3. **Update documentation**
   - Update relevant documentation
   - Add examples if needed
   - Update changelog if applicable

### Pull Request Guidelines
1. **Use descriptive titles**
   - Clear, concise title
   - Reference related issues

2. **Provide detailed descriptions**
   - Explain what and why (not how)
   - Include testing instructions
   - Note any breaking changes

3. **Include screenshots**
   - For UI changes
   - For bug fixes (before/after)
   - For new features

4. **Follow the checklist**
   - Complete all checklist items
   - Ensure tests pass
   - Verify documentation is updated

### Review Process
1. **Automated checks** must pass
   - Build succeeds
   - Tests pass
   - Linting passes
   - Type checking passes

2. **Code review** required
   - At least one maintainer approval
   - Address all review comments
   - Resolve merge conflicts

3. **Final checks**
   - Documentation updated
   - Changelog updated
   - Release notes prepared

## Style Guides

### TypeScript
- Use TypeScript for all new code
- Prefer interfaces over types
- Use strict type checking
- Avoid `any` type when possible
- Use meaningful variable names

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Keep functions small and focused
- Add comments for complex logic
- Use consistent naming conventions

### Git Commits
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

Examples:
```
feat: add support for custom Jira fields
fix: handle null assignee in templates
docs: update installation guide
refactor: improve error handling
```

### Documentation
- Use clear, concise language
- Include examples and code snippets
- Follow existing documentation style
- Test all examples and links
- Update table of contents

### Testing
- Test on multiple platforms
- Test with different Jira configurations
- Test edge cases and error conditions
- Verify backward compatibility
- Test performance impact

## Additional Notes

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring

### Release Process
1. Update version numbers
2. Update changelog
3. Create release tag
4. Build and test
5. Create GitHub release
6. Update documentation

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/maksim77/obsidian-jira/issues)
- **Discussions**: [GitHub Discussions](https://github.com/maksim77/obsidian-jira/discussions)
- **Documentation**: [Development Guide](docs/DEVELOPMENT.md)
- **Author**: Maxim Syomochkin - [Website](https://mak-sim.ru)

### Recognition
Contributors will be:
- Listed in the README
- Credited in release notes
- Acknowledged in documentation
- Added to contributors list

---

**Thank you for contributing to the Obsidian Jira Plugin!**