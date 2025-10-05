# Memorial Website Development Specification

## Project Overview

**Project Name:** Remembering Ryan - A Memorial Website  
**Subject:** Ryan William Alf (10/10/85 - 4/28/22)  
**Purpose:** Create a loving memorial website for Ryan featuring a memorial page and children's book-style stories for his 3-year-old son  
**Target Audience:** Primary - 3-year-old child; Secondary - Family and friends  
**Project Timeline:** 4-6 weeks  
**Hosting:** GitHub Pages + Vercel deployment  
**Content Format:** Markdown files for easy story creation  

## Project Goals

1. **Memorial Page**: Create a beautiful, respectful memorial showcasing Ryan's life through photos and memories
2. **Children's Stories**: Develop a blog-like collection of stories written in children's book style about Ryan
3. **Child-Friendly Design**: Ensure the website is accessible and engaging for a young child
4. **Preservation**: Create a lasting digital legacy that can grow over time
5. **Responsive Design**: Ensure accessibility across all devices

## Quick Start Bootstrap Options

### Option 1: Nextra (Recommended)
Nextra is perfect for your markdown-based stories and provides a beautiful, ready-to-use blog/documentation theme.

**Bootstrap Command:**
```bash
npx create-nextra-app@latest remembering-ryan --template=blog
```

**Features:**
- Built-in blog functionality
- MDX support (markdown + React components)
- Automatic routing based on file structure
- Built-in search functionality
- Responsive design out of the box

### Option 2: Astro Blog Template
Astro excels at content-heavy sites and has excellent markdown support.

**Bootstrap Command:**
```bash
npm create astro@latest remembering-ryan -- --template=blog
```

**Features:**
- Lightning-fast static site generation
- Built-in markdown processing
- Content collections for organized stories
- Excellent SEO optimization

### Option 3: Custom Next.js with MDX
For more control over the design and functionality.

**Bootstrap Command:**
```bash
npx create-next-app@latest remembering-ryan --typescript --tailwind --eslint --app
```

Then add MDX support with `@next/mdx` and `next-mdx-remote`.

## Docker Development Setup

### Docker Configuration Files

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

**Dev Container (.devcontainer/devcontainer.json):**
```json
{
  "name": "Remembering Ryan",
  "dockerFile": "../Dockerfile",
  "forwardPorts": [3000],
  "postCreateCommand": "npm install",
  "customizations": {
    "vscode": {
      "extensions": [
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-typescript-next"
      ]
    }
  }
}
```

### Local Development Workflow
1. **Clone repository**: `git clone <your-repo>`
2. **Start with Docker**: `docker-compose up`
3. **Create story**: Add new `.md` file in `/stories` folder
4. **Preview changes**: Hot reload shows changes instantly
5. **Commit and push**: Vercel auto-deploys on push to main branch

## Technical Architecture

### Recommended Technology Stack

**Option 1: Nextra (Recommended for your use case)**
- **Framework**: Next.js 14 with Nextra (MDX-based documentation framework)
- **Why**: Perfect for markdown-based content, built-in blog functionality, easy to write stories as .md files
- **Content**: Write stories as simple markdown files with frontmatter
- **Deployment**: GitHub repository + Vercel (seamless integration)

**Option 2: Astro (Alternative)**
- **Framework**: Astro with content collections
- **Why**: Excellent for content-heavy sites, built-in markdown support, very fast
- **Content**: Markdown files with TypeScript frontmatter validation

**Styling:** Tailwind CSS + Framer Motion
- **Why**: Rapid styling development with utility classes
- Framer Motion for gentle, child-friendly animations
- Responsive design out of the box

**Content Management:** 
- **Markdown Files** with frontmatter (Your preference)
  - Simple `.md` files for each story
  - Easy to write and version control with Git
  - No complex CMS needed

**Development Environment:**
- **Docker**: Yes, for consistent local development
- **Dev Container**: VS Code dev container for easy setup
- **Hot Reload**: Instant preview of markdown changes

**Hosting:** GitHub + Vercel
- **Repository**: GitHub for source control
- **Deployment**: Vercel for automatic deployments on push
- **Domain**: Custom domain support

## Site Structure

### 1. Home Page
- Hero section with Ryan's photo and dates
- Brief welcome message for visitors
- Navigation to main sections
- Gentle, warm color scheme

### 2. Memorial Page (`/memorial`)
#### Features:
- **Photo Gallery**
  - Chronological timeline of Ryan's life
  - Interactive photo viewer with captions
  - Categories: Childhood, Family, With Son, Hobbies, etc.
- **Life Timeline**
  - Key milestones and achievements
  - Important dates and memories
- **Memory Wall**
  - Contributed memories from family and friends
  - Ability for visitors to leave memories (moderated)
- **Favorite Things**
  - Ryan's hobbies, interests, favorite quotes
  - Things he loved to do

### 3. Stories for [Son's Name] (`/stories`)
#### Features:
- **Story Collection**
  - Each story as a separate markdown file (`/stories/story-name.md`)
  - Children's book style layout with large text and images
  - Audio narration option (recorded by family)
  - Stories refer to "Ryan" throughout (not "Daddy")
- **Story Categories**
  - "When Ryan was Little"
  - "Ryan's Adventures"
  - "How Ryan Met Mommy"
  - "Ryan's Love for You"
  - "Ryan's Dreams for You"
- **Interactive Elements**
  - Simple animations on scroll
  - Gentle sound effects
  - Large, colorful illustrations
- **Markdown Features**
  - Easy to write stories in simple markdown
  - Frontmatter for metadata (title, date, category, featured image)
  - Support for images, videos, and audio embeds

### 4. About Page (`/about`)
- Information about the website's purpose
- Credits and acknowledgments
- Contact information for family

## Design Specifications

### Color Palette
- **Primary**: Soft blues and greens (calming, peaceful)
- **Secondary**: Warm oranges and yellows (joy, happiness)
- **Neutral**: Cream, light gray (readability)
- **Accent**: Gentle purple (special moments)

### Typography
- **Headings**: Poppins or similar friendly, rounded font
- **Body Text**: Open Sans or similar highly readable font
- **Story Text**: Comic Neue or similar child-friendly font
- **Font Sizes**: Large text for child accessibility (minimum 18px)

### UI/UX Considerations
- **Child-Friendly Navigation**: Large buttons, simple icons
- **Touch-Friendly**: Large tap targets for tablet use
- **Loading States**: Gentle animations during page loads
- **Accessibility**: High contrast, screen reader friendly
- **Progressive Enhancement**: Works without JavaScript

## Story Markdown Structure

### Example Story File (`/stories/when-ryan-was-three.md`)

```markdown
---
title: "When Ryan Was Three"
date: "2024-10-03"
category: "When Ryan was Little"
featuredImage: "/images/ryan-age-3.jpg"
readingTime: "3 minutes"
ageAppropriate: "3+"
summary: "A story about when Ryan was the same age as you are now!"
---

# When Ryan Was Three

Once upon a time, there was a little boy named Ryan who was exactly three years old - just like you are now!

![Ryan playing with toys](/images/ryan-toys.jpg)

Ryan loved to play with toy trucks and build tall towers with blocks. He would make "vroom vroom" sounds as he drove his trucks around the living room.

## Ryan's Favorite Things

When Ryan was three, his favorite things were:

- 🚛 Big red trucks
- 🍎 Apple slices with peanut butter  
- 📚 Stories before bedtime
- 🎵 Singing songs with his mommy

![Ryan with his family](/images/ryan-family.jpg)

Ryan always gave the biggest hugs and had the silliest laugh. He would giggle when Ryan tickled his toes!

> "I love you to the moon and back!" Ryan would say every night before bed.

And you know what? Ryan would be so proud of the smart, kind little boy you're becoming. You have his beautiful smile and his curious eyes.

*The End*

---

**Family Note:** This story was written in October 2024, when [Son's name] was 3 years old. Ryan would have loved sharing these memories with his son.
```

### Frontmatter Options
- `title`: Story title
- `date`: When story was written/published
- `category`: Story category for organization
- `featuredImage`: Main image for the story
- `readingTime`: Estimated reading time
- `ageAppropriate`: Recommended age
- `summary`: Brief description
- `tags`: Keywords for searching
- `audioFile`: Link to audio narration (optional)

## Content Strategy

### Memorial Content
1. **Photo Collection Process**
   - Gather photos from family and friends
   - Organize chronologically and by theme
   - Scan/digitize physical photos at high resolution
   - Create captions with dates and context

2. **Memory Collection**
   - Interview family members and friends
   - Collect written memories and stories
   - Record audio testimonials
   - Organize by themes and time periods

### Children's Stories Content
1. **Story Planning**
   - Create age-appropriate narratives (3-year-old level)
   - Focus on positive memories and lessons
   - Include simple moral lessons Ryan would want to share
   - Plan for growth as child ages

2. **Illustration Strategy**
   - Commission custom illustrations or use family photos
   - Ensure consistent art style across stories
   - Create characters representing Ryan and family
   - Include interactive elements in illustrations

## Technical Features

### Core Features (MVP)
- [ ] Responsive design for all devices
- [ ] Photo gallery with lightbox functionality
- [ ] Story pages with child-friendly layout
- [ ] Simple navigation suitable for young children
- [ ] Fast loading times and optimized images
- [ ] SEO optimization for search engines

### Enhanced Features (Phase 2)
- [ ] Audio narration for stories
- [ ] Guest book for visitors to leave memories
- [ ] Simple animations and micro-interactions
- [ ] Print-friendly versions of stories
- [ ] Email newsletter for updates
- [ ] Multi-language support (if needed)

### Future Features (Phase 3)
- [ ] User accounts for family members
- [ ] Ability to add new stories and photos
- [ ] Comments system for stories (moderated)
- [ ] Mobile app version
- [ ] Integration with photo sharing services
- [ ] Annual memory compilation feature

## Development Phases

### Phase 1: Foundation (Weeks 1-2)
- Set up development environment
- Create basic site structure and navigation
- Implement responsive design system
- Set up content management system
- Create homepage and basic layouts

### Phase 2: Core Content (Weeks 3-4)
- Build memorial page with photo gallery
- Create story template and first stories
- Implement basic animations and interactions
- Add audio capabilities for story narration
- Content upload and organization

### Phase 3: Polish & Launch (Weeks 5-6)
- Performance optimization
- SEO implementation
- Accessibility testing and improvements
- User testing with family members
- Content review and finalization
- Deployment and DNS setup

## Content Management Workflow

### For Adding New Stories
1. Write story content in child-friendly language
2. Create or select accompanying illustrations
3. Record audio narration (optional)
4. Add to CMS with proper categorization
5. Review and publish

### For Adding Memorial Content
1. Collect and organize photos/memories
2. Write descriptive captions
3. Categorize by time period or theme
4. Upload to gallery with proper metadata
5. Review for appropriateness and accuracy

## SEO & Accessibility

### SEO Strategy
- Semantic HTML structure
- Proper meta tags and descriptions
- Image alt text for all photos
- Structured data markup
- Fast loading speeds
- Mobile-friendly design

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Large touch targets for mobile
- Clear heading hierarchy

## Maintenance & Updates

### Regular Maintenance
- **Monthly**: Check for broken links and images
- **Quarterly**: Review and update content
- **Annually**: Add new stories or memories on special dates
- **Ongoing**: Monitor site performance and security

### Content Growth Strategy
- Plan new stories for birthdays, holidays, milestones
- Encourage family members to contribute memories
- Document son's reactions and favorites for future reference
- Create printable versions for physical keepsakes

## Budget Considerations

### Development Costs
- **Hosting**: $0-20/month (Vercel free tier or paid)
- **Domain**: $10-15/year
- **CMS**: $0-99/month (Sanity free tier or paid)
- **Development**: DIY or professional development
- **Design/Illustrations**: Custom artwork if desired

### Ongoing Costs
- Hosting and domain renewal
- Content management system fees
- Occasional design updates
- Additional storage for photos/audio

## Success Metrics

### Primary Goals
- Site successfully preserves Ryan's memory in an accessible format
- Stories are engaging and appropriate for a 3-year-old
- Family can easily add new content over time
- Site remains functional and fast-loading

### Measurable Outcomes
- Page load times under 3 seconds
- Mobile-friendly score of 95+
- Positive feedback from family members
- Regular engagement from young visitor
- Successful story additions over time

## Risk Mitigation

### Technical Risks
- **Data Loss**: Regular backups of all content and code
- **Performance Issues**: Image optimization and CDN usage
- **Browser Compatibility**: Progressive enhancement approach
- **Security**: Regular updates and secure hosting

### Content Risks
- **Inappropriate Content**: Moderation system for user contributions
- **Emotional Impact**: Age-appropriate content guidelines
- **Privacy**: Careful consideration of what to share publicly

## Next Steps

1. **Immediate Actions**
   - Set up development environment
   - Begin collecting photos and memories
   - Create detailed content outline for first stories
   - Choose final technology stack

2. **Week 1 Goals**
   - Complete technical setup
   - Design initial wireframes
   - Begin photo organization
   - Write first 2-3 stories

3. **Getting Started Checklist**
   - [ ] Choose domain name
   - [ ] Set up development tools
   - [ ] Create content collection spreadsheet
   - [ ] Design initial mockups
   - [ ] Begin technical implementation

---

*This specification serves as a living document that can be updated as the project evolves and new requirements emerge.*
