# Jira Plugin Templates Guide

This guide provides detailed examples and best practices for creating custom templates for the Obsidian Jira Plugin.

## Table of Contents
- [Template Basics](#template-basics)
- [Available Fields](#available-fields)
- [Template Examples](#template-examples)
- [Advanced Techniques](#advanced-techniques)
- [Best Practices](#best-practices)

## Template Basics

The plugin uses [Nunjucks](https://mozilla.github.io/nunjucks/) templating engine. Nunjucks provides powerful features like:
- Variable interpolation: `{{ variable }}`
- Conditional statements: `{% if condition %}...{% endif %}`
- Loops: `{% for item in items %}...{% endfor %}`
- Filters: `{{ value | filter }}`

## Available Fields

### Core Fields
| Field | Description | Example |
|-------|-------------|---------|
| `{{ key }}` | Issue key | `PROJ-123` |
| `{{ fields.summary }}` | Issue title | `Fix login bug` |
| `{{ fields.description }}` | Issue description | Full description text |
| `{{ fields.status.name }}` | Current status | `In Progress` |
| `{{ fields.assignee.displayName }}` | Assignee name | `John Doe` |
| `{{ fields.reporter.displayName }}` | Reporter name | `Jane Smith` |
| `{{ fields.issuetype.name }}` | Issue type | `Bug`, `Story`, `Task` |
| `{{ fields.priority.name }}` | Priority | `High`, `Medium`, `Low` |
| `{{ fields.project.key }}` | Project key | `PROJ` |
| `{{ fields.project.name }}` | Project name | `My Project` |

### Date Fields
| Field | Description | Format |
|-------|-------------|--------|
| `{{ fields.created }}` | Creation date | ISO 8601 |
| `{{ fields.updated }}` | Last update | ISO 8601 |
| `{{ fields.duedate }}` | Due date | YYYY-MM-DD |

### Array Fields
| Field | Description | Type |
|-------|-------------|------|
| `{{ fields.components }}` | Components | Array of objects |
| `{{ fields.labels }}` | Labels | Array of strings |
| `{{ fields.attachment }}` | Attachments | Array of objects |
| `{{ fields.comment.comments }}` | Comments | Array of objects |

### Custom Fields
Custom fields follow the pattern: `{{ fields.customfield_XXXXX }}`
- Replace `XXXXX` with your custom field ID
- Use the curl command to discover custom field IDs

## Template Examples

### 1. Minimal Template
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
---

# {{ key }}: {{ fields.summary }}

**Status:** {{ fields.status.name }}

{{ fields.description }}
```

### 2. Standard Issue Template
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
jira_reporter: {{ fields.reporter.displayName }}
jira_type: {{ fields.issuetype.name }}
jira_priority: {{ fields.priority.name }}
jira_project: {{ fields.project.key }}
jira_created: {{ fields.created }}
jira_updated: {{ fields.updated }}
jira_link: https://your-jira.com/browse/{{ key }}
---

# {{ key }}: {{ fields.summary }}

## Issue Details
- **Status:** {{ fields.status.name }}
- **Type:** {{ fields.issuetype.name }}
- **Priority:** {{ fields.priority.name }}
- **Project:** {{ fields.project.name }} ({{ fields.project.key }})
- **Assignee:** {{ fields.assignee.displayName }}
- **Reporter:** {{ fields.reporter.displayName }}
- **Created:** {{ fields.created | date }}
- **Updated:** {{ fields.updated | date }}

## Description
{{ fields.description }}

## Links
- [View in Jira](https://your-jira.com/browse/{{ key }})
```

### 3. Obsidian-Linked Template
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: "[[{{ fields.assignee.displayName }}]]"
jira_reporter: "[[{{ fields.reporter.displayName }}]]"
jira_type: {{ fields.issuetype.name }}
jira_priority: {{ fields.priority.name }}
jira_project: "[[{{ fields.project.name }}]]"
jira_components: [{% for comp in fields.components %}"{{ comp.name }}"{% if not loop.last %}, {% endif %}{% endfor %}]
jira_labels: [{% for label in fields.labels %}"{{ label }}"{% if not loop.last %}, {% endif %}{% endfor %}]
---

# [[{{ key }}]]

**Summary:** {{ fields.summary }}

## Details
- **Status:** {{ fields.status.name }}
- **Type:** {{ fields.issuetype.name }}
- **Priority:** {{ fields.priority.name }}
- **Project:** [[{{ fields.project.name }}]]
- **Assignee:** [[{{ fields.assignee.displayName }}]]
- **Reporter:** [[{{ fields.reporter.displayName }}]]

{% if fields.components.length > 0 %}
- **Components:** {% for comp in fields.components %}{{ comp.name }}{% if not loop.last %}, {% endif %}{% endfor %}
{% endif %}

{% if fields.labels.length > 0 %}
- **Labels:** {% for label in fields.labels %}#{{ label }}{% if not loop.last %} {% endif %}{% endfor %}
{% endif %}

## Description
{{ fields.description }}

## Related
- [[Jira Issues]]
- [[{{ fields.project.name }}]]
```

### 4. Bug Report Template
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
jira_reporter: {{ fields.reporter.displayName }}
jira_priority: {{ fields.priority.name }}
jira_severity: {{ fields.customfield_10000 }}
jira_environment: {{ fields.customfield_10001 }}
---

# 🐛 {{ key }}: {{ fields.summary }}

## Bug Information
- **Status:** {{ fields.status.name }}
- **Priority:** {{ fields.priority.name }}
- **Severity:** {{ fields.customfield_10000 }}
- **Environment:** {{ fields.customfield_10001 }}
- **Assignee:** {{ fields.assignee.displayName }}
- **Reporter:** {{ fields.reporter.displayName }}

## Description
{{ fields.description }}

## Steps to Reproduce
{% if fields.customfield_10002 %}
{{ fields.customfield_10002 }}
{% else %}
*Steps to reproduce not provided*
{% endif %}

## Expected vs Actual Behavior
{% if fields.customfield_10003 %}
**Expected:** {{ fields.customfield_10003 }}
{% endif %}

{% if fields.customfield_10004 %}
**Actual:** {{ fields.customfield_10004 }}
{% endif %}

## Additional Information
- [View in Jira](https://your-jira.com/browse/{{ key }})
```

### 5. User Story Template
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
jira_story_points: {{ fields.customfield_10000 }}
jira_epic: {{ fields.customfield_10001 }}
---

# 📖 {{ key }}: {{ fields.summary }}

## Story Details
- **Status:** {{ fields.status.name }}
- **Story Points:** {{ fields.customfield_10000 }}
- **Epic:** {{ fields.customfield_10001 }}
- **Assignee:** {{ fields.assignee.displayName }}

## User Story
**As a** [user type]
**I want** [goal]
**So that** [benefit]

## Acceptance Criteria
{% if fields.customfield_10002 %}
{{ fields.customfield_10002 }}
{% else %}
*Acceptance criteria not defined*
{% endif %}

## Description
{{ fields.description }}

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Notes
*Add implementation notes here*
```

## Advanced Techniques

### Conditional Rendering
```nunjucks
{% if fields.assignee %}
**Assignee:** {{ fields.assignee.displayName }}
{% else %}
**Assignee:** Unassigned
{% endif %}

{% if fields.components.length > 0 %}
**Components:** {% for comp in fields.components %}{{ comp.name }}{% if not loop.last %}, {% endif %}{% endfor %}
{% endif %}
```

### Date Formatting
```nunjucks
**Created:** {{ fields.created | date('YYYY-MM-DD') }}
**Updated:** {{ fields.updated | date('MMM DD, YYYY') }}
```

### Array Handling
```nunjucks
{% if fields.labels.length > 0 %}
**Labels:** {% for label in fields.labels %}#{{ label }}{% if not loop.last %} {% endif %}{% endfor %}
{% endif %}

{% if fields.attachment.length > 0 %}
**Attachments:**
{% for attachment in fields.attachment %}
- [{{ attachment.filename }}]({{ attachment.content }})
{% endfor %}
{% endif %}
```

### Custom Field Handling
```nunjucks
{% if fields.customfield_10000 %}
**Story Points:** {{ fields.customfield_10000 }}
{% endif %}

{% if fields.customfield_10001 %}
**Epic Link:** {{ fields.customfield_10001 }}
{% endif %}
```

## Best Practices

### 1. Use Frontmatter for Metadata
Store important metadata in YAML frontmatter for easy querying:
```nunjucks
---
jira_key: {{ key }}
jira_status: {{ fields.status.name }}
jira_type: {{ fields.issuetype.name }}
jira_priority: {{ fields.priority.name }}
---
```

### 2. Include Obsidian Links
Use double brackets for internal links:
```nunjucks
**Assignee:** [[{{ fields.assignee.displayName }}]]
**Project:** [[{{ fields.project.name }}]]
```

### 3. Handle Missing Data
Always check if fields exist before using them:
```nunjucks
{% if fields.assignee %}
**Assignee:** {{ fields.assignee.displayName }}
{% else %}
**Assignee:** Unassigned
{% endif %}
```

### 4. Use Consistent Formatting
Maintain consistent structure across all issue types:
- Issue header with key and summary
- Details section with metadata
- Description section
- Links section

### 5. Include External Links
Always include a link back to Jira:
```nunjucks
[View in Jira](https://your-jira.com/browse/{{ key }})
```

### 6. Use Emojis for Visual Distinction
```nunjucks
# 🐛 {{ key }}: {{ fields.summary }}  # Bug
# 📖 {{ key }}: {{ fields.summary }}  # Story
# ⚡ {{ key }}: {{ fields.summary }}  # Task
# 🎯 {{ key }}: {{ fields.summary }}  # Epic
```

## Troubleshooting Templates

### Common Issues

1. **Field Not Found**
   - Use the curl command to verify field names
   - Check for typos in field names
   - Some fields may be null or undefined

2. **Template Syntax Errors**
   - Validate Nunjucks syntax
   - Check for missing closing tags
   - Ensure proper escaping of special characters

3. **Date Formatting Issues**
   - Use proper date filters
   - Handle null date values
   - Consider timezone differences

### Debugging Tips

1. **Test with curl first:**
   ```bash
   curl -u username:password https://your-jira.com/rest/api/2/issue/PROJ-123
   ```

2. **Use simple templates initially:**
   Start with basic templates and add complexity gradually

3. **Check field existence:**
   Always use conditional checks for optional fields

4. **Validate template syntax:**
   Use online Nunjucks validators to check syntax

## Custom Field Discovery

To find custom field IDs:
1. Make a curl request to your Jira instance
2. Look for fields starting with `customfield_`
3. Note the field ID and available properties
4. Test the field in your template

Example curl command:
```bash
curl -u username:password https://your-jira.com/rest/api/2/issue/PROJ-123 | jq '.fields | keys | .[] | select(startswith("customfield_"))'
```

This will show all custom field IDs available for the issue.