# Story Submission Review

## Story Information

**Story Number:** [Auto-filled]  
**Title:** [Auto-filled]  
**Author:** [Auto-filled]  
**Submitted By:** [Auto-filled]  
**Submission Date:** [Auto-filled]

---

## Constitution Compliance Checklist

### ✅ Content Guidelines (NON-NEGOTIABLE - Principle IV)

- [ ] **NO EMOJIS** - Content uses descriptive text instead of emojis (e.g., "Ryan smiled warmly" not "Ryan 😊")
- [ ] **"Ryan" naming** - Story refers to "Ryan" by name throughout (never "Daddy" or "Dad")
- [ ] **Age-appropriate language** - Uses simple language suitable for a 3-year-old
- [ ] **Positive tone** - Focuses on positive memories and Ryan's character
- [ ] **No overly cute language** - Avoids baby talk or overly precious phrasing (see STORY_STYLE_GUIDE.md)
- [ ] **Family context notes** - Includes family notes at story end where appropriate

### 📝 Story Structure Requirements (Principle V)

- [ ] Located at `/app/stories/[##-story-slug]/page.mdx`
- [ ] Numbered prefix matches next story number (sequential)
- [ ] Contains required imports:
  - [ ] `import StoryImage from '../../../components/StoryImage'`
  - [ ] `import HeroImage from '../../../components/HeroImage'`
  - [ ] `import StoryMeta from '../../../components/StoryMeta'`
- [ ] Title uses H1 heading (`#`)
- [ ] `<StoryMeta author="Julie" />` included immediately after title
- [ ] `<HeroImage>` component included with featured image and caption
- [ ] Story content written in valid markdown
- [ ] File saved as `page.mdx` in numbered folder

### 🖼️ Image Requirements (Principle VI)

- [ ] Hero image stored at `/public/images/stories/[story-slug]/hero.jpg` or `hero.webp`
- [ ] Hero image optimized (max 1200px wide, reasonable file size < 500KB)
- [ ] Additional images stored in same folder with descriptive names
- [ ] All images have proper alt text for accessibility
- [ ] Images are appropriate for young child audience
- [ ] Images enhance the narrative (not decorative)

### 🔒 Privacy & Authentication (Principle III)

- [ ] Story number determines authentication requirement correctly:
  - Stories 01-07: Public (no authentication)
  - Stories 08+: Family-protected (requires authentication)
- [ ] No personally identifiable information in public stories
- [ ] Sensitive family information appropriately protected

### ✨ Quality Standards

- [ ] Story reads naturally without grammatical errors
- [ ] Story maintains consistent tone with existing stories
- [ ] Reading time will calculate correctly (~150 words per minute)
- [ ] Story flows logically from beginning to end
- [ ] Captures Ryan's character authentically
- [ ] Appropriate and meaningful for Ryan's son

### 🧪 Testing Requirements

- [ ] Story renders correctly in development (`npm run dev`)
- [ ] Images load properly (no 404 errors)
- [ ] StoryMeta component displays author and reading time
- [ ] Story appears in story listing page (`/stories`)
- [ ] Authentication works correctly (for stories 08+)
- [ ] Mobile responsive layout verified
- [ ] No console errors or warnings in browser

---

## Review Guidelines for Administrators

### Step 1: Constitution Compliance Review
1. Read through the entire story carefully
2. Check off each item in the Constitution Compliance Checklist above
3. Pay special attention to NON-NEGOTIABLE items (emojis, "Ryan" naming)
4. If any items fail, request changes with specific guidance referencing constitution principles

### Step 2: Technical Validation
1. Verify file structure matches requirements exactly
2. Check that all images are properly referenced and load
3. Ensure MDX syntax is correct (no unclosed tags, proper component usage)
4. Clone the branch and run `npm run dev` locally to preview story
5. Test on mobile device or browser responsive mode (minimum 375px width)
6. Verify story appears in `/stories` listing with correct metadata

### Step 3: Content Quality Review
Ask yourself:
- Does the story capture Ryan's character authentically?
- Is the story appropriate and meaningful for Ryan's young son?
- Does it maintain the warm, comforting tone of the memorial?
- Are there any factual errors or inconsistencies?
- Does the story add value to the collection?

### Step 4: Family Approval (REQUIRED)
- [ ] Story reviewed and approved by Julie or designated family member
- [ ] Any sensitive content discussed with family before publication
- [ ] Family confirms story accuracy and appropriateness

---

## Reviewer Notes

<!-- Add any comments, suggestions, or concerns here -->
<!-- Example:
- Beautiful story about Ryan's kindness
- Suggested minor grammar fix in paragraph 3
- Image could be cropped for better mobile display
-->

---

## Merge Instructions

✅ **Before merging, ensure ALL of the following are complete:**

1. ✅ All Constitution Compliance items checked
2. ✅ Technical validation passed (tested locally)
3. ✅ Content quality approved by reviewer
4. ✅ Family approval received and documented
5. ✅ All testing requirements passed
6. ✅ No outstanding change requests

**Then:**
1. **Approve** the pull request
2. **Merge** using "Squash and merge" to keep history clean
3. **Delete** the source branch after merging
4. Verify story appears on production site after deployment
5. Notify submitter that their story has been published

**Deployment Note:** Vercel will automatically deploy after merge. Story will be live within 2-3 minutes.

---

## Auto-Generated Files

This PR contains the following auto-generated files:
- Story MDX file: `app/stories/##-story-name/page.mdx`
- Story images: `public/images/stories/##-story-name/*.webp`
- Story metadata in database: `StorySubmission` record created

*This pull request was automatically generated by the Story Submission feature.*

---

## Reference Documentation

- [Constitution](./.specify/memory/constitution.md) - Project principles and requirements
- [Story Style Guide](./STORY_STYLE_GUIDE.md) - Writing guidelines and examples
- [Story Review Workflow](./docs/STORY_REVIEW_WORKFLOW.md) - Detailed review process
