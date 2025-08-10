# Default Template

This is the default template that comes with the Obsidian Jira Plugin. You can use this as a starting point for creating your own custom templates.

## Template Code

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
- **Created:** {{ fields.created }}
- **Updated:** {{ fields.updated }}

## Description
{{ fields.description }}

## Links
- [View in Jira](https://your-jira.com/browse/{{ key }})
```

## Template Breakdown

### Frontmatter Section

The frontmatter (between `---`) contains metadata that can be used for:
- **Obsidian queries**: Search and filter your Jira notes
- **Dataview plugin**: Create dynamic views of your issues
- **Templater plugin**: Use variables in other templates
- **Quick reference**: See key information at a glance

#### Metadata Fields

| Field | Description | Example |
|-------|-------------|---------|
| `jira_key` | Issue key | `PROJ-123` |
| `jira_summary` | Issue title | `Fix login bug` |
| `jira_status` | Current status | `In Progress` |
| `jira_assignee` | Assignee name | `John Doe` |
| `jira_reporter` | Reporter name | `Jane Smith` |
| `jira_type` | Issue type | `Bug`, `Story`, `Task` |
| `jira_priority` | Priority level | `High`, `Medium`, `Low` |
| `jira_project` | Project key | `PROJ` |
| `jira_created` | Creation date | `2024-01-15T10:30:00.000Z` |
| `jira_updated` | Last update | `2024-01-16T14:20:00.000Z` |
| `jira_link` | Direct link to Jira | `https://jira.com/browse/PROJ-123` |

### Content Section

The main content area provides a human-readable format of the issue information.

#### Header
```nunjucks
# {{ key }}: {{ fields.summary }}
```
Creates a clear title combining the issue key and summary.

#### Issue Details
Organizes key metadata in an easy-to-scan format:
- Status, type, and priority for quick assessment
- Project information for context
- Assignee and reporter for responsibility tracking
- Creation and update dates for timeline awareness

#### Description
```nunjucks
{{ fields.description }}
```
Displays the full issue description as provided in Jira.

#### Links
```nunjucks
- [View in Jira](https://your-jira.com/browse/{{ key }})
```
Provides a direct link back to the original Jira issue.

## Customization Ideas

### 1. Add Obsidian Links

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

## Description
{{ fields.description }}

## Related
- [[Jira Issues]]
- [[{{ fields.project.name }}]]
```

### 2. Add Issue Type Icons

```nunjucks
# {% if fields.issuetype.name == 'Bug' %}🐛{% elif fields.issuetype.name == 'Story' %}📖{% elif fields.issuetype.name == 'Task' %}⚡{% else %}📋{% endif %} {{ key }}: {{ fields.summary }}
```

### 3. Add Priority Indicators

```nunjucks
- **Priority:** {% if fields.priority.name == 'High' %}🔴{% elif fields.priority.name == 'Medium' %}🟡{% else %}🟢{% endif %} {{ fields.priority.name }}
```

### 4. Add Components and Labels

```nunjucks
{% if fields.components.length > 0 %}
- **Components:** {% for comp in fields.components %}{{ comp.name }}{% if not loop.last %}, {% endif %}{% endfor %}
{% endif %}

{% if fields.labels.length > 0 %}
- **Labels:** {% for label in fields.labels %}#{{ label }}{% if not loop.last %} {% endif %}{% endfor %}
{% endif %}
```

### 5. Add Custom Fields

```nunjucks
{% if fields.customfield_10000 %}
- **Story Points:** {{ fields.customfield_10000 }}
{% endif %}

{% if fields.customfield_10001 %}
- **Epic:** {{ fields.customfield_10001 }}
{% endif %}
```

## Usage Examples

### With Dataview Plugin

Create dynamic views of your Jira issues:

```dataview
TABLE jira_status, jira_assignee, jira_priority
FROM "jira"
WHERE jira_status = "In Progress"
SORT jira_priority DESC
```

### With Templater Plugin

Use Jira data in other templates:

```javascript
<% tp.file.frontmatter.jira_assignee %>
<% tp.file.frontmatter.jira_project %>
```

### With Obsidian Queries

Search for specific issues:

```
jira_status:"In Progress" jira_assignee:"John Doe"
```

## Tips for Customization

1. **Start Simple**: Begin with the default template and add features gradually
2. **Test Thoroughly**: Test your template with various issue types and field combinations
3. **Handle Missing Data**: Use conditional statements for optional fields
4. **Keep It Readable**: Maintain clear formatting and structure
5. **Include Links**: Always provide a way to get back to the original Jira issue
6. **Use Metadata**: Leverage frontmatter for better organization and searchability

## Troubleshooting

### Common Issues

1. **Field Not Found**: Some fields may be null or undefined
   ```nunjucks
   {% if fields.assignee %}
   - **Assignee:** {{ fields.assignee.displayName }}
   {% else %}
   - **Assignee:** Unassigned
   {% endif %}
   ```

2. **Date Formatting**: Dates are in ISO format by default
   ```nunjucks
   - **Created:** {{ fields.created | date('YYYY-MM-DD') }}
   ```

3. **Special Characters**: Handle special characters in text fields
   ```nunjucks
   {{ fields.summary | escape }}
   ```

### Testing Your Template

1. Create a test issue in Jira
2. Use the plugin to create a note
3. Verify all fields render correctly
4. Test with different issue types
5. Check edge cases (missing fields, long text, etc.)

---

**Need help with templates?** Check out the [Templates Guide](TEMPLATES.md) for more examples and advanced techniques.