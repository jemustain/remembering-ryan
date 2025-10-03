# Remembering Ryan - Memorial Website

A beautiful memorial website for Ryan William Alf (10/10/85 - 4/28/22) featuring stories for his son.

**IMPORTANT: Please read the [GitHub Instructions](.github/CONTRIBUTING.md) before contributing. NO EMOJIS anywhere on the site.**

## Quick Start

### Option 1: Standard Development
```bash
npm install
npm run dev
```

### Option 2: Docker Development
```bash
docker-compose up
```

### Option 3: VS Code Dev Container
1. Open project in VS Code
2. Click "Reopen in Container" when prompted
3. The dev server will start automatically

## Project Structure

```
remembering-ryan/
├── app/                     # Next.js app directory
│   ├── page.mdx            # Home page
│   ├── layout.js           # Site layout
│   ├── globals.css         # Global styles
│   ├── stories/            # Stories section
│   │   ├── page.mdx        # Stories index
│   │   └── when-ryan-was-three/
│   │       └── page.mdx    # Individual story
│   ├── memorial/           # Memorial section
│   └── about/              # About page
├── public/
│   └── images/             # Photos and images
├── .github/
│   └── CONTRIBUTING.md     # GitHub repository guidelines
├── docker-compose.yml      # Docker setup
├── Dockerfile              # Docker configuration
└── devspec.md             # Full development specification
```

## Adding New Stories

1. Create a new folder in `app/stories/` with the story name (e.g., `ryan-loves-trucks`)
2. Add a `page.mdx` file with your story content
3. Use this template:

```markdown
# Story Title

Your story content here...

## Section Header

More content...

---

**Family Note:** Context about when this story was written or why it's special.
```

## Design Features

- **Child-friendly fonts**: Comic Sans MS for readability
- **Large text**: 18-20px for easy reading
- **Touch-friendly navigation**: Large buttons and links
- **Warm color scheme**: Blues and soft colors
- **Responsive design**: Works on phones, tablets, and computers
- **NO EMOJIS**: Clean, text-based design

## Technology Stack

- **Next.js 15**: Modern React framework
- **MDX**: Markdown with React components
- **Tailwind CSS**: Utility-first CSS framework
- **Docker**: Containerized development
- **Vercel**: Hosting and deployment (recommended)

## Content Guidelines

### For Stories
- Use simple, age-appropriate language for a 3-year-old
- Refer to "Ryan" by name (not "Daddy")
- Focus on positive memories and characteristics
- Include context notes for family
- **NO EMOJIS** - use descriptive text instead

### For Photos
- Place images in `public/images/`
- Use descriptive filenames
- Add alt text for accessibility
- Optimize for web (reasonable file sizes)

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Vercel will auto-deploy on every push to main branch

### Other Options
- Netlify
- GitHub Pages (with GitHub Actions)
- Any static hosting service

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linting (when added)
```

## Adding Content

### Stories Workflow
1. Write story in markdown
2. Add any images to `public/images/`
3. Test locally with `npm run dev`
4. Commit and push to deploy

### Memorial Content
- Add photos to `public/images/memorial/`
- Update memorial pages with new content
- Consider adding photo galleries

## Future Features

- Audio narration for stories
- Photo galleries with lightbox
- Guest book for memories
- Print-friendly story layouts
- Search functionality
- Comments system (moderated)

## About This Project

This website was created with love to preserve Ryan's memory and provide his son with stories about his father. The site is designed to be:

- Easy to maintain and add content
- Child-friendly and accessible
- A growing resource that can evolve over time
- A lasting tribute to Ryan's memory

## Contributing

To add stories or memories:
1. Read the [GitHub Instructions](.github/CONTRIBUTING.md) first
2. Contact the family
3. Share photos and memories
4. Help write age-appropriate stories
5. Provide feedback on existing content

---

*Made with love for Ryan's family*
