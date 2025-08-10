# Development Guide

This guide is for developers who want to contribute to the Obsidian Jira Plugin.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Building](#building)
- [Testing](#testing)
- [Contributing](#contributing)
- [Code Style](#code-style)
- [Architecture](#architecture)

## Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Git**
- **Obsidian** (for testing)
- **TypeScript** knowledge
- **Jira instance** (for testing)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/obsidian-jira.git
   cd obsidian-jira
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/maksim77/obsidian-jira.git
   ```

## Project Structure

```
obsidian-jira/
├── src/                    # Source code
│   ├── main.ts            # Main plugin class
│   ├── settings.ts        # Settings and UI
│   └── jiraApi.ts         # Jira API client
├── docs/                  # Documentation
│   ├── README.md
│   ├── INSTALLATION.md
│   ├── TEMPLATES.md
│   ├── FAQ.md
│   └── DEVELOPMENT.md
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── esbuild.config.mjs     # Build configuration
├── manifest.json          # Plugin manifest
├── styles.css             # Plugin styles
└── README.md              # Main documentation
```

### Key Files

- **`src/main.ts`**: Main plugin class that handles Obsidian integration
- **`src/settings.ts`**: Settings interface and UI components
- **`src/jiraApi.ts`**: Jira API client for fetching issue data
- **`manifest.json`**: Plugin metadata for Obsidian
- **`esbuild.config.mjs`**: Build configuration using esbuild

## Development Setup

### Install Dependencies

```bash
npm install
```

### Development Mode

Run the plugin in development mode with hot reloading:

```bash
npm run dev
```

This will:
- Watch for file changes
- Rebuild the plugin automatically
- Output files to the project directory

### Link to Obsidian

1. Create a symbolic link to your development directory:
   ```bash
   # On macOS/Linux
   ln -s /path/to/your/obsidian-jira /path/to/obsidian/vault/.obsidian/plugins/obsidian-jira
   
   # On Windows (as Administrator)
   mklink /D "C:\path\to\obsidian\vault\.obsidian\plugins\obsidian-jira" "C:\path\to\your\obsidian-jira"
   ```

2. Or copy the built files manually:
   ```bash
   cp main.js manifest.json styles.css /path/to/obsidian/vault/.obsidian/plugins/obsidian-jira/
   ```

### Testing Setup

1. Create a test Obsidian vault
2. Install the plugin in development mode
3. Configure with a test Jira instance
4. Create test issues for development

## Building

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

This will:
- Type-check the code
- Build optimized production files
- Update version numbers

### Version Management

The project uses automatic version bumping:

```bash
npm run version
```

This will:
- Increment the version number
- Update `manifest.json` and `versions.json`
- Stage the changes for commit

## Testing

### Manual Testing

1. **Installation**: Test plugin installation in Obsidian
2. **Configuration**: Test settings UI and validation
3. **API Connection**: Test Jira API connectivity
4. **Template Rendering**: Test template functionality
5. **Commands**: Test all plugin commands
6. **Status Bar**: Test status bar integration

### Test Scenarios

#### Basic Functionality
- [ ] Plugin loads without errors
- [ ] Settings can be configured
- [ ] Jira connection works
- [ ] Issue notes can be created
- [ ] Issue notes can be updated
- [ ] Templates render correctly

#### Error Handling
- [ ] Invalid credentials show appropriate errors
- [ ] Network errors are handled gracefully
- [ ] Invalid issue keys show appropriate errors
- [ ] Template errors are handled properly

#### Edge Cases
- [ ] Missing Jira fields are handled
- [ ] Large issue descriptions work
- [ ] Special characters in templates
- [ ] Multiple concurrent requests

### Testing Checklist

Before submitting a pull request, ensure:

- [ ] Code compiles without errors
- [ ] All existing functionality works
- [ ] New features are tested
- [ ] Error cases are handled
- [ ] Documentation is updated
- [ ] Code follows style guidelines

## Contributing

### Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write code
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

### Commit Message Format

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

### Pull Request Guidelines

1. **Title**: Clear, descriptive title
2. **Description**: Explain what and why, not how
3. **Testing**: Describe how you tested
4. **Screenshots**: Include UI changes if applicable
5. **Breaking Changes**: Note any breaking changes

## Code Style

### TypeScript

- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use strict type checking
- Avoid `any` type when possible

### Naming Conventions

- **Files**: kebab-case (`jira-api.ts`)
- **Classes**: PascalCase (`JiraApi`)
- **Functions**: camelCase (`fetchIssue`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_SETTINGS`)
- **Interfaces**: PascalCase with `I` prefix (`IJiraSettings`)

### Code Organization

- Keep functions small and focused
- Use meaningful variable names
- Add comments for complex logic
- Group related functionality together

### Error Handling

- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors for debugging
- Show user-friendly notifications

## Architecture

### Plugin Structure

The plugin follows Obsidian's plugin architecture:

```typescript
export default class Jira extends Plugin {
  settings: JiraSettings;
  jiraApi: JiraApi;

  async onload() {
    // Initialize plugin
  }

  async onunload() {
    // Cleanup
  }
}
```

### Key Components

#### Main Plugin (`main.ts`)
- Handles Obsidian integration
- Manages commands and events
- Coordinates between components

#### Settings (`settings.ts`)
- Defines settings interface
- Creates settings UI
- Handles settings persistence

#### Jira API (`jiraApi.ts`)
- Manages Jira API communication
- Handles authentication
- Provides data fetching methods

### Data Flow

1. **User Action**: User triggers a command
2. **Plugin Handler**: Main plugin handles the action
3. **API Call**: JiraApi fetches data from Jira
4. **Template Rendering**: Data is rendered using Nunjucks
5. **File Creation**: Note is saved to Obsidian vault

### Error Handling Strategy

- **Network Errors**: Retry with exponential backoff
- **Authentication Errors**: Show clear error messages
- **Template Errors**: Provide debugging information
- **File System Errors**: Handle gracefully with user feedback

## Development Tips

### Debugging

1. **Enable Developer Tools** in Obsidian
2. **Use console.log** for debugging
3. **Check Network Tab** for API calls
4. **Use Obsidian's API** for file operations

### Common Issues

#### Build Errors
- Check TypeScript configuration
- Verify all dependencies are installed
- Ensure proper import/export syntax

#### Runtime Errors
- Check Obsidian console for errors
- Verify plugin is properly loaded
- Test with minimal configuration

#### API Issues
- Test with curl first
- Check authentication
- Verify API endpoints

### Performance Considerations

- **Caching**: Consider caching API responses
- **Batch Operations**: Group multiple API calls
- **Lazy Loading**: Load data only when needed
- **Memory Management**: Clean up resources properly

## Release Process

### Pre-release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Version numbers are correct
- [ ] Changelog is updated
- [ ] Build is successful

### Release Steps

1. **Update version**:
   ```bash
   npm run version
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Create release**:
   - Tag the release
   - Create GitHub release
   - Upload built files

4. **Update documentation**:
   - Update README if needed
   - Update installation guide

## Support

### Getting Help

- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Request review for complex changes

### Resources

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)
- [Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)

---

**Ready to contribute?** Start by reading the existing code and understanding the current implementation. Feel free to ask questions in the discussions!