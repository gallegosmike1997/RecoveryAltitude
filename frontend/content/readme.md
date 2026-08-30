# Content

This directory holds markdown content for Recovery Altitude. Edit these files to update program descriptions, field notes, and other content without redeploying.

## Adding a new program

Create a new `.md` file in this directory with frontmatter:

```markdown
---
id: your-program-id
name: Your Program Name
tagline: A short description.
duration: X weeks
intensity: Low / Moderate / High
format: Group / Individual / Community
---

Description paragraph (supports **bold** and *italic* markdown).

**What's included:**

- Item one
- Item two
- Item three

**A good fit if:** Description of ideal participant.
```

## Supported frontmatter fields

### Programs
- `id` - Unique identifier (used for URL hashes)
- `name` - Display name
- `tagline` - Short subtitle
- `duration` - Program length
- `intensity` - Effort level
- `format` - Delivery format

### Altitude Topics
- `id` - Unique identifier
- `name` - Display name
- `tagline` - Short subtitle
- `focus` - Area of focus
- `effort` - Effort level
- `where` - Location/context
