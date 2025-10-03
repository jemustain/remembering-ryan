# GitHub Repository Instructions

## Repository Guidelines for Remembering Ryan Memorial Website

### Content Guidelines

#### NO EMOJIS
- **IMPORTANT**: Do not use any emojis anywhere on the site
- This includes stories, navigation, headings, or any content
- Use descriptive text instead of emoji symbols
- Examples:
  - Instead of "📖 Stories" use "Stories"
  - Instead of "💙 Memorial" use "Memorial"
  - Instead of "❤️ About" use "About"

#### Story Writing Guidelines
- Use simple, age-appropriate language for a 3-year-old
- Refer to "Ryan" by name (not "Daddy" or "Dad")
- Focus on positive memories and characteristics
- Include family context notes at the end of stories
- Use markdown formatting for structure

#### Image Guidelines
- Place all images in `public/images/` directory
- Use descriptive, web-friendly filenames
- Include alt text for accessibility
- Optimize images for web (reasonable file sizes)
- Organize by category: `memorial/`, `stories/`, etc.

### Development Workflow

#### Adding New Stories
1. Create new directory in `app/stories/[story-name]/`
2. Add `page.mdx` file with story content
3. Test locally with `npm run dev`
4. Commit and push to deploy automatically

#### Code Style
- Use Tailwind CSS for all styling
- Maintain child-friendly design principles
- Large text sizes (18px minimum)
- High contrast colors for readability
- Touch-friendly navigation elements

### Deployment
- Main branch auto-deploys to production via Vercel
- All commits should be tested locally first
- Use descriptive commit messages

### Design Principles
- Child-friendly without being overly playful
- Respectful memorial aesthetic
- Easy navigation for young users
- Clean, uncluttered layouts
- Warm, comforting color scheme

### Content Review
- All stories should be reviewed by family before publishing
- Memorial content should be appropriate and respectful
- Photos should have proper permissions before inclusion

## File Structure Rules
```
app/
├── page.mdx                 # Home page
├── layout.js               # Site layout
├── globals.css             # Global styles
├── stories/                # Stories section
│   ├── page.mdx           # Stories index
│   └── [story-name]/      # Individual stories
│       └── page.mdx
├── memorial/              # Memorial section
└── about/                 # About page

public/
└── images/                # All images
    ├── memorial/          # Memorial photos
    ├── stories/           # Story illustrations
    └── general/           # General site images
```

## Important Notes
- This is a memorial website - maintain respectful tone
- Primary audience is a young child
- Site should grow with the child over time
- Family members can contribute content through GitHub or by contact
