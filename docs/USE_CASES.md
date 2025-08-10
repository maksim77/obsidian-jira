# Use Cases and Examples

This document provides real-world examples of how to use the Obsidian Jira Plugin in different scenarios.

## Table of Contents
- [Project Management](#project-management)
- [Bug Tracking](#bug-tracking)
- [Documentation](#documentation)
- [Meeting Notes](#meeting-notes)
- [Personal Task Management](#personal-task-management)
- [Team Collaboration](#team-collaboration)
- [Reporting and Analytics](#reporting-and-analytics)

## Project Management

### Sprint Planning

**Scenario**: You're planning a sprint and want to create notes for all user stories.

**Setup**:
1. Create a template for user stories:
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
jira_story_points: {{ fields.customfield_10000 }}
jira_epic: {{ fields.customfield_10001 }}
jira_sprint: {{ fields.customfield_10002 }}
---

# 📖 {{ key }}: {{ fields.summary }}

**Story Points:** {{ fields.customfield_10000 }}
**Epic:** {{ fields.customfield_10001 }}
**Sprint:** {{ fields.customfield_10002 }}

## User Story
**As a** [user type]
**I want** [goal]
**So that** [benefit]

## Acceptance Criteria
{% if fields.customfield_10003 %}
{{ fields.customfield_10003 }}
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

2. Create notes for each story in your sprint
3. Use Obsidian's graph view to see relationships
4. Update notes regularly to track progress

### Epic Management

**Scenario**: You're managing a large epic and want to track all related issues.

**Setup**:
1. Create an epic note manually
2. Create notes for all epic issues
3. Use Obsidian links to connect them:
```nunjucks
## Related Issues
- [[PROJ-123]] - User authentication
- [[PROJ-124]] - Password reset
- [[PROJ-125]] - Two-factor authentication
```

4. Use Dataview to create dynamic lists:
```dataview
TABLE jira_status, jira_assignee, jira_story_points
FROM "jira"
WHERE jira_epic = "PROJ-100"
SORT jira_status ASC
```

## Bug Tracking

### Bug Investigation

**Scenario**: You're investigating a complex bug and need to track related issues.

**Setup**:
1. Create a bug investigation template:
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
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

## Description
{{ fields.description }}

## Investigation Steps
1. [ ] Reproduce the issue
2. [ ] Identify root cause
3. [ ] Check related issues
4. [ ] Test fix
5. [ ] Update documentation

## Related Issues
*Add links to related bugs or issues*

## Notes
*Add investigation findings here*

## Links
- [View in Jira](https://your-jira.com/browse/{{ key }})
```

2. Track investigation progress in the note
3. Link to related issues and findings
4. Update the note as you discover more information

### Bug Triage

**Scenario**: You need to triage multiple bugs and prioritize them.

**Setup**:
1. Create notes for all bugs in the triage queue
2. Use a consistent template with priority indicators
3. Create a triage dashboard using Dataview:
```dataview
TABLE jira_priority, jira_severity, jira_assignee
FROM "jira"
WHERE jira_type = "Bug" AND jira_status = "Open"
SORT jira_priority DESC, jira_severity DESC
```

4. Add triage notes to each bug:
```markdown
## Triage Notes
- **Impact:** High - affects 50% of users
- **Effort:** Medium - 2-3 days
- **Risk:** Low - isolated to login flow
- **Decision:** Fix in next sprint
```

## Documentation

### Technical Documentation

**Scenario**: You want to create technical documentation from Jira issues.

**Setup**:
1. Create a documentation template:
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
jira_type: {{ fields.issuetype.name }}
jira_components: [{% for comp in fields.components %}"{{ comp.name }}"{% if not loop.last %}, {% endif %}{% endfor %}]
---

# 📚 {{ key }}: {{ fields.summary }}

## Overview
{{ fields.description }}

## Technical Details
*Add technical implementation details*

## API Changes
*Document any API changes*

## Database Changes
*Document any database schema changes*

## Testing
*Document testing requirements*

## Deployment
*Document deployment steps*

## Related Documentation
- [[API Documentation]]
- [[Database Schema]]
- [[Deployment Guide]]
```

2. Create documentation notes for each feature
3. Link related documentation together
4. Use tags to categorize documentation:
```nunjucks
{% if fields.labels.length > 0 %}
**Tags:** {% for label in fields.labels %}#{{ label }}{% if not loop.last %} {% endif %}{% endfor %}
{% endif %}
```

### Release Notes

**Scenario**: You want to generate release notes from completed issues.

**Setup**:
1. Create a release notes template
2. Use Dataview to collect completed issues:
```dataview
TABLE jira_type, jira_assignee
FROM "jira"
WHERE jira_status = "Done" AND jira_updated >= date("2024-01-01")
SORT jira_type ASC
```

3. Organize by issue type:
```markdown
# Release Notes - v1.2.0

## 🐛 Bug Fixes
*List bug fixes*

## ✨ New Features
*List new features*

## 🔧 Improvements
*List improvements*

## 📚 Documentation
*List documentation updates*
```

## Meeting Notes

### Sprint Retrospectives

**Scenario**: You want to track issues discussed in sprint retrospectives.

**Setup**:
1. Create a retrospective template:
```nunjucks
---
meeting_type: "Sprint Retrospective"
sprint: "Sprint 15"
date: {{ date }}
participants: "Team Members"
---

# Sprint Retrospective - {{ sprint }}

## What Went Well
*List positive aspects*

## What Could Be Improved
*List areas for improvement*

## Action Items
*List action items with Jira links*

## Issues Discussed
*Link to relevant Jira issues*
```

2. Link to Jira issues discussed:
```markdown
## Issues Discussed
- [[PROJ-123]] - Performance issues in login
- [[PROJ-124]] - Need better error handling
- [[PROJ-125]] - Documentation gaps
```

### Stand-up Notes

**Scenario**: You want to track daily stand-up discussions.

**Setup**:
1. Create a daily stand-up template
2. Link to issues you're working on:
```markdown
# Daily Stand-up - {{ date }}

## Yesterday
- Worked on [[PROJ-123]] - Fixed login bug
- Updated [[PROJ-124]] - Added error handling

## Today
- Continue with [[PROJ-125]] - Documentation updates
- Review [[PROJ-126]] - Code review

## Blockers
- Waiting for feedback on [[PROJ-127]]
```

## Personal Task Management

### Personal Kanban

**Scenario**: You want to manage your personal tasks using a Kanban board.

**Setup**:
1. Create a personal task template:
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_priority: {{ fields.priority.name }}
jira_assignee: {{ fields.assignee.displayName }}
personal_notes: ""
---

# ⚡ {{ key }}: {{ fields.summary }}

## Task Details
- **Status:** {{ fields.status.name }}
- **Priority:** {{ fields.priority.name }}
- **Assignee:** {{ fields.assignee.displayName }}

## Description
{{ fields.description }}

## Personal Notes
{{ personal_notes }}

## Time Tracking
- **Estimated:** 2 hours
- **Actual:** 1.5 hours
- **Notes:** *Add time tracking notes*

## Next Steps
1. [ ] Step 1
2. [ ] Step 2
3. [ ] Step 3
```

2. Create Kanban columns using Dataview:
```dataview
TABLE jira_priority
FROM "jira"
WHERE jira_status = "To Do"
SORT jira_priority DESC
```

### Goal Tracking

**Scenario**: You want to track progress toward larger goals.

**Setup**:
1. Create goal notes manually
2. Link to related Jira issues
3. Track progress using Dataview:
```dataview
TABLE jira_status, jira_assignee
FROM "jira"
WHERE contains(jira_summary, "goal keyword")
SORT jira_status ASC
```

## Team Collaboration

### Code Reviews

**Scenario**: You want to track code review discussions.

**Setup**:
1. Create a code review template:
```nunjucks
---
jira_key: {{ key }}
jira_summary: {{ fields.summary }}
jira_status: {{ fields.status.name }}
jira_assignee: {{ fields.assignee.displayName }}
reviewer: ""
review_status: "Pending"
---

# 🔍 Code Review: {{ key }}

## Review Details
- **Author:** {{ fields.assignee.displayName }}
- **Reviewer:** {{ reviewer }}
- **Status:** {{ review_status }}

## Changes
*Describe the changes being reviewed*

## Review Comments
*Add review comments and feedback*

## Action Items
- [ ] Address feedback
- [ ] Update tests
- [ ] Update documentation

## Approval
- [ ] Code review approved
- [ ] Tests passing
- [ ] Documentation updated
```

2. Track review status and feedback
3. Link to related issues and pull requests

### Knowledge Sharing

**Scenario**: You want to share knowledge about specific issues or features.

**Setup**:
1. Create knowledge base notes
2. Link to relevant Jira issues
3. Use tags to categorize knowledge:
```markdown
# Knowledge Base: Authentication System

## Overview
Links to issues: [[PROJ-123]], [[PROJ-124]], [[PROJ-125]]

## Key Concepts
*Explain important concepts*

## Common Issues
*Document common problems and solutions*

## Best Practices
*Share best practices learned*

## Related Documentation
- [[API Documentation]]
- [[Security Guidelines]]
```

## Reporting and Analytics

### Sprint Reports

**Scenario**: You want to generate sprint reports and metrics.

**Setup**:
1. Use Dataview to collect sprint data:
```dataview
TABLE jira_assignee, jira_story_points
FROM "jira"
WHERE jira_sprint = "Sprint 15"
SORT jira_assignee ASC
```

2. Calculate metrics:
```dataview
LIST jira_story_points
FROM "jira"
WHERE jira_sprint = "Sprint 15" AND jira_status = "Done"
```

3. Create sprint reports:
```markdown
# Sprint 15 Report

## Completed Issues
*List completed issues*

## Velocity
- **Planned:** 40 story points
- **Completed:** 35 story points
- **Velocity:** 87.5%

## Team Performance
*Break down by team member*

## Lessons Learned
*Document insights for next sprint*
```

### Project Health Dashboard

**Scenario**: You want to track overall project health.

**Setup**:
1. Create a project health template
2. Use Dataview to track key metrics:
```dataview
TABLE jira_status, jira_priority
FROM "jira"
WHERE jira_project = "PROJ"
SORT jira_priority DESC
```

3. Track trends over time:
```markdown
# Project Health Dashboard

## Current Status
- **Total Issues:** 45
- **Open Issues:** 12
- **In Progress:** 8
- **Done:** 25

## Priority Distribution
*Break down by priority*

## Team Workload
*Break down by assignee*

## Trends
*Track trends over time*
```

## Tips for Success

### 1. Start Small
- Begin with a simple template
- Add complexity gradually
- Test with a few issues first

### 2. Be Consistent
- Use consistent naming conventions
- Follow the same structure across notes
- Use tags and links consistently

### 3. Regular Updates
- Update notes regularly
- Keep information current
- Archive old notes when appropriate

### 4. Leverage Obsidian Features
- Use the graph view to see relationships
- Use search and filters effectively
- Use Dataview for dynamic content

### 5. Collaborate
- Share templates with your team
- Document best practices
- Get feedback on your setup

---

**Need help with a specific use case?** Ask in the [GitHub Discussions](https://github.com/maksim77/obsidian-jira/discussions) or create an [issue](https://github.com/maksim77/obsidian-jira/issues).