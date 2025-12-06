<!-- 
Sync Impact Report:
Version: 0.0.0 → 1.0.0 (MAJOR - initial constitution)
Modified principles: None (initial creation)
Added sections: All core principles, technical constraints, development workflow
Removed sections: None
Templates requiring updates:
  ⚠ .specify/templates/spec-template.md - should reference content guidelines
  ⚠ .specify/templates/tasks-template.md - should include story structure validation
Follow-up: None
-->

# Remembering Ryan Constitution

**Project**: Memorial website for Ryan William Alf (10/10/85 - 4/28/22), featuring stories for his young son

## Core Principles

### I. Child-Centered Design
All content and features MUST be appropriate and accessible for a 3-year-old child. This includes:
- Large, readable text (minimum 18px base font size)
- Simple navigation with touch-friendly targets (minimum 44x44px)
- Age-appropriate language and concepts
- Clear visual hierarchy with warm, comforting colors
- Comic Sans MS or similar child-friendly fonts

**Rationale**: The primary audience is Ryan's young son. The site must serve his developmental needs while remaining respectful as a memorial.

### II. Story-First Architecture
Stories are the core content type and MUST be implemented as MDX files for maximum flexibility and maintainability.
- All stories live in `/app/stories/[##-story-slug]/page.mdx`
- Stories use MDX components for images, heroes, and metadata
- Story metadata includes author (Julie), reading time (150 wpm), and featured images
- Each story folder numbered sequentially (01-24) for chronological ordering

**Rationale**: MDX provides the perfect balance of markdown simplicity and React component power for rich storytelling.

### III. Family Privacy & Authentication
Family stories require authentication and role-based access control.
- Stories 01-07 are public
- Stories 08-24 are family-protected content requiring authentication
- NextAuth.js handles authentication with Google OAuth
- Role-based access: ADMIN, FAMILY, USER
- Story view tracking for family engagement analytics
- Admin dashboard for user management

**Rationale**: Private family memories must be protected while still being accessible to authorized family members.

### IV. Content Guidelines (NON-NEGOTIABLE)
All content MUST follow these strict rules:
- **NO EMOJIS ANYWHERE** - use descriptive text instead (e.g., "Ryan smiled warmly" not "Ryan 😊")
- Refer to "Ryan" by name throughout stories (never "Daddy" or "Dad")
- Use simple, age-appropriate language for a 3-year-old
- Focus on positive memories and Ryan's character
- Include family context notes at story end where appropriate
- Avoid overly cute language (see STORY_STYLE_GUIDE.md for details)

**Rationale**: Emojis appear differently across devices/platforms and may not age well. Text-based descriptions are timeless, accessible, screen-reader friendly, and maintain a consistent respectful tone. Using "Ryan" helps the child develop a personal connection to Ryan as an individual.

### V. Story Structure Requirements
Every story MUST have a complete, consistent structure:
- Located at `/app/stories/[##-story-slug]/page.mdx`
- Includes numbered prefix (01-24) for chronological ordering
- Contains required imports:
  ```javascript
  import StoryImage from '../../../components/StoryImage'
  import HeroImage from '../../../components/HeroImage'
  import StoryMeta from '../../../components/StoryMeta'
  ```
- Title as H1 heading
- `<StoryMeta author="Julie" />` component immediately after title
- `<HeroImage>` component with featured image and caption
- Story content in markdown with optional `<StoryImage>` components
- Images stored in `/public/images/stories/[story-slug]/`

**Rationale**: Consistent structure ensures maintainability, automatic story discovery, proper metadata generation, and uniform user experience.

### VI. Performance & Optimization
Images and content MUST be optimized for fast loading:
- Use Next.js `<Image>` component for automatic optimization
- Store images at appropriate sizes (max 1200px wide for hero images)
- Lazy load images below the fold
- Reading time calculated at runtime from DOM content (client-side)
- API endpoints cache story metadata

**Rationale**: Fast loading is critical for engagement, especially with young users who may lose interest quickly.

## Technical Constraints

### Stack Requirements
- **Framework**: Next.js 15.5.4 (App Router)
- **Content**: MDX for stories with `@next/mdx`
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v4 with Google OAuth
- **Database**: PostgreSQL with Prisma ORM (development: SQLite)
- **Deployment**: Vercel (recommended for automatic deployments)
- **Node.js**: Version 18+ required

### File Organization Standards
```
app/
├── stories/
│   ├── [##-story-slug]/
│   │   └── page.mdx          # REQUIRED for every story
│   ├── page.js               # Story listing page
│   ├── layout.js             # Stories section layout
│   └── meta.json             # Story metadata
├── api/
│   ├── stories/route.js      # Story metadata API
│   └── track-story-view/     # Analytics endpoint
├── admin/
│   ├── page.js               # Admin dashboard
│   └── UserManagement.js     # User management component
└── auth/
    └── signin/page.js        # Sign-in page

components/
├── StoryImage.js             # Inline story images
├── HeroImage.js              # Featured hero images
├── StoryMeta.js              # Author/reading time metadata
├── FamilyOnly.js             # Auth wrapper for protected content
└── AuthButton.js             # Authentication UI

public/images/stories/
└── [story-slug]/             # Story-specific images
    ├── hero.jpg              # Featured image
    └── *.jpg                 # Additional story images
```

### Design Constraints
- **Colors**: Warm blues and soft colors (no harsh contrasts)
- **Fonts**: Comic Sans MS for body text (child-friendly)
- **Typography**: 18-20px base font size
- **Spacing**: Generous padding and margins for touch targets
- **Responsive**: Mobile-first design (works on phones, tablets, desktops)

## Development Workflow

### Adding New Stories
1. Create folder: `/app/stories/[##-story-title]/` (use next number in sequence)
2. Create `page.mdx` file with required imports and structure
3. Add hero image to `/public/images/stories/[story-title]/hero.jpg`
4. Add additional images as needed to same folder
5. Write story following STORY_STYLE_GUIDE.md guidelines
6. Test locally with `npm run dev`
7. Verify authentication if family-protected (stories 08+)
8. Check reading time calculation renders correctly
9. Test responsive layout on mobile/tablet/desktop
10. Commit and push to deploy

### Story Content Review Checklist
Before publishing any story, verify:
- [ ] No emojis used anywhere in content or file names
- [ ] "Ryan" used consistently (not "Daddy" or other terms)
- [ ] Age-appropriate language (3-year-old reading level)
- [ ] All required imports present at top of file
- [ ] `<StoryMeta author="Julie" />` included after title
- [ ] `<HeroImage>` component included with proper path and alt text
- [ ] Images optimized (reasonable file sizes, proper dimensions)
- [ ] Family notes included at end if appropriate
- [ ] Story reads naturally without overly cute language
- [ ] File saved as `page.mdx` in numbered folder

### Feature Development Process
1. Create specification using `/speckit.specify`
2. Create implementation plan using `/speckit.plan`
3. Generate tasks using `/speckit.tasks`
4. Review constitution compliance before implementation
5. Implement features following Next.js best practices
6. Test authentication and authorization flows
7. Verify mobile responsiveness
8. Update documentation as needed

## Governance

### Amendment Process
1. Propose amendment with clear rationale in GitHub issue
2. Document impact on existing stories/features/code
3. Update constitution with semantic version bump
4. Update dependent templates and documentation
5. Add sync impact report as HTML comment at top of file
6. Get family approval for content-related changes
7. Commit with descriptive message

### Version Policy (Semantic Versioning)
- **MAJOR**: Breaking changes to story structure, authentication, or core architecture
- **MINOR**: New principles, significant expansions, or new mandatory requirements
- **PATCH**: Clarifications, wording improvements, typo fixes

### Compliance Review
All new features and stories MUST be reviewed against this constitution before deployment:
- Check content guidelines (no emojis, proper names, age-appropriate)
- Verify story structure requirements met
- Ensure authentication properly implemented for family content
- Validate performance optimization (image sizes, lazy loading)
- Test responsive design on multiple devices

The admin dashboard tracks story views to ensure family engagement goals are met.

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
