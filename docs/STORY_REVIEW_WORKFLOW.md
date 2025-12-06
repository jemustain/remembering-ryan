# Story Review Workflow

**Purpose**: Guide administrators through the process of reviewing and approving story submissions

**Version**: 1.0.0  
**Last Updated**: 2025-12-06  
**Target Audience**: Administrators and family members with merge permissions

---

## Table of Contents

1. [Overview](#overview)
2. [Roles and Responsibilities](#roles-and-responsibilities)
3. [Review Process](#review-process)
4. [Constitution Compliance](#constitution-compliance)
5. [Technical Validation](#technical-validation)
6. [Content Quality Assessment](#content-quality-assessment)
7. [Common Issues and Solutions](#common-issues-and-solutions)
8. [Approval and Merge](#approval-and-merge)
9. [Post-Merge Verification](#post-merge-verification)

---

## Overview

The Story Review Workflow ensures that all submitted stories meet the project's constitution requirements, maintain quality standards, and appropriately honor Ryan's memory for his young son.

### Key Principles

1. **Child-First**: Every story must be appropriate and accessible for a 3-year-old
2. **Constitution Compliance**: All NON-NEGOTIABLE rules must be followed
3. **Quality Over Speed**: Take time to review thoroughly
4. **Family Approval**: Family must approve before publication
5. **Respectful Process**: Provide constructive feedback to submitters

### Timeline Expectations

- **Initial Review**: Within 48 hours of submission
- **Feedback Response**: Submitter has 7 days to address feedback
- **Final Approval**: Within 24 hours of requested changes being made
- **Publication**: Automatic deployment within 3 minutes of merge

---

## Roles and Responsibilities

### Story Submitter
- Writes story following constitution guidelines
- Provides images and metadata
- Responds to review feedback
- Commits to making required changes

### Reviewer/Administrator
- Reviews PR against constitution checklist
- Provides constructive, specific feedback
- Tests story locally before approval
- Ensures all requirements met before merge

### Family Approver (Julie or Designee)
- Final authority on story content and accuracy
- Verifies story appropriately represents Ryan
- Confirms story is suitable for Ryan's son
- Approves sensitive or personal content

---

## Review Process

### Step 1: Initial Assessment (5-10 minutes)

When a new story submission PR is created:

1. **Check PR Title Format**
   - Should be: `feat(story): Add story ##-story-title`
   - Example: `feat(story): Add story 25-first-camping-trip`

2. **Review Story Information**
   - Story number is sequential
   - Title is clear and descriptive
   - Submitter information is present

3. **Quick Scan of Content**
   - Read through the story once quickly
   - Check for obvious emoji violations
   - Verify story length is reasonable (200+ words)
   - Note any immediate concerns

4. **Check Automated Validations**
   - Review GitHub Actions results (if workflow configured)
   - Note any automated check failures

**Decision Point**: If obvious violations or major issues, provide immediate feedback and mark "Request Changes". Otherwise, proceed to detailed review.

---

### Step 2: Constitution Compliance Review (15-20 minutes)

Use the PR template checklist to verify each requirement. Reference: [Constitution](./.specify/memory/constitution.md)

#### Principle I: Child-Centered Design ✅
- [ ] Language is simple and age-appropriate (3-year-old level)
- [ ] Story maintains warm, comforting tone
- [ ] Content is positive and uplifting
- [ ] No scary, sad, or overwhelming themes

#### Principle IV: Content Guidelines (NON-NEGOTIABLE) 🚨

**CRITICAL CHECKS - Must be perfect:**

1. **NO EMOJIS Check** (5 minutes)
   ```bash
   # Search for common emojis in the story file
   grep -E '[\x{1F300}-\x{1F9FF}]' app/stories/##-story-name/page.mdx
   ```
   - Check title, content, image alt text, captions
   - Look for emoji shortcuts (`:smile:`, `:-D`, etc.)
   - Verify image filenames have no emojis
   - **If found**: Request immediate removal with specific locations

2. **"Ryan" Naming Check** (3 minutes)
   - Story uses "Ryan" consistently
   - No instances of "Daddy", "Dad", "Papa"
   - First mention establishes full name: "Ryan William Alf" (optional)
   - **If violations**: Provide specific line numbers to change

3. **Language Appropriateness** (5 minutes)
   - No baby talk (e.g., "widdle", "puppers")
   - No overly cute phrasing (see STORY_STYLE_GUIDE.md)
   - Words are simple but not condescending
   - **If issues**: Suggest specific rewording

4. **Positive Focus** (3 minutes)
   - Story highlights Ryan's character positively
   - Focuses on love, joy, kindness, humor
   - Avoids dwelling on loss or sadness
   - **If concerns**: Discuss with family approver

5. **Family Context Notes** (2 minutes)
   - Check if story includes context section at end
   - Verify explanations are helpful for Ryan's son
   - Ensure no inappropriate details shared
   - **If missing**: Suggest adding context where helpful

#### Principle V: Story Structure Requirements ✅

**File Structure** (5 minutes)
```
app/stories/
  └── ##-story-slug/
      └── page.mdx          ← Must exist with exact name

public/images/stories/
  └── story-slug/
      ├── hero.jpg or hero.webp  ← Must exist
      └── [other-images].jpg     ← Optional
```

**Check:**
- [ ] Story folder named correctly: `##-slug-format` (two-digit number, hyphen, lowercase slug)
- [ ] File is `page.mdx` (not `Page.mdx`, `index.mdx`, etc.)
- [ ] Number is sequential (e.g., if last story is 24, this should be 25)

**Required Imports** (2 minutes)
```javascript
import StoryImage from '../../../components/StoryImage'
import HeroImage from '../../../components/HeroImage'
import StoryMeta from '../../../components/StoryMeta'
```

**Check:**
- [ ] All three imports present at top of file
- [ ] Import paths are correct (three levels up: `../../../`)
- [ ] No typos in component names

**Required Components** (5 minutes)
```markdown
# Story Title

<StoryMeta author="Julie" />

<HeroImage
  src="/images/stories/story-slug/hero.jpg"
  alt="Descriptive alt text"
  caption="Optional caption"
/>

Story content here...
```

**Check:**
- [ ] H1 title exists (`# Title`)
- [ ] `<StoryMeta author="Julie" />` immediately after title
- [ ] `<HeroImage>` component included
- [ ] HeroImage has `src` and `alt` attributes
- [ ] Image paths are absolute (`/images/stories/...`)

#### Principle VI: Image Requirements ✅

**Image Files** (5 minutes)
- [ ] Hero image exists at specified path
- [ ] Hero image is optimized (< 500KB, max 1200px wide)
- [ ] Additional images (if any) properly named and optimized
- [ ] No excessively large images (> 1MB is a red flag)

**Image Quality** (3 minutes)
- [ ] Images are clear and well-composed
- [ ] Images are appropriate for young children
- [ ] Alt text is descriptive and meaningful
- [ ] Images enhance the story (not decorative)

**Check Image Dimensions** (if needed):
```bash
# On Windows with ImageMagick
magick identify public/images/stories/story-slug/hero.jpg
```

---

### Step 3: Technical Validation (10-15 minutes)

**Local Testing** (Required before approval)

1. **Pull the PR branch locally**
   ```bash
   git fetch origin
   git checkout julie/story-submission-##
   ```

2. **Install dependencies** (if needed)
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Test the story**
   - Navigate to `http://localhost:3000/stories`
   - Verify story appears in the list
   - Click on the story
   - Check that:
     - [ ] Story renders without errors
     - [ ] Images load correctly
     - [ ] StoryMeta shows author and reading time
     - [ ] Markdown formatting is correct
     - [ ] Links (if any) work properly
     - [ ] No console errors in browser DevTools

5. **Test Mobile Responsiveness**
   - Open browser DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test on:
     - [ ] iPhone SE (375px) - minimum width
     - [ ] iPad (768px)
     - [ ] Desktop (1200px+)
   - Check:
     - [ ] Text is readable
     - [ ] Images scale properly
     - [ ] No horizontal scrolling
     - [ ] Touch targets are adequate (44x44px minimum)

6. **Test Authentication** (for stories 08+)
   - Sign out if signed in
   - Try to access the story
   - Verify authentication redirect works
   - Sign in and verify story access

**Build Test** (Optional but recommended)
```bash
npm run build
```
- Should complete without errors
- Verifies MDX syntax is valid

---

### Step 4: Content Quality Assessment (10-15 minutes)

Beyond technical compliance, evaluate the story's quality and appropriateness:

#### Authenticity Check ✅
- Does the story feel genuine and personal?
- Does it capture Ryan's character authentically?
- Are the details specific enough to be meaningful?
- Does it sound like a real memory (not generic)?

#### Child-Appropriateness ✅
Ask yourself: "Would this story be meaningful and appropriate for a 3-5 year old?"
- Is the vocabulary accessible?
- Are the concepts understandable for a young child?
- Does it help Ryan's son know his father better?
- Is there anything confusing or potentially upsetting?

#### Narrative Quality ✅
- Does the story have a clear beginning, middle, and end?
- Does it flow naturally?
- Are there grammar or spelling errors?
- Is the pacing appropriate (not too rushed or too slow)?

#### Emotional Tone ✅
- Is the tone warm and comforting?
- Does it maintain the memorial's overall feeling?
- Does it balance remembering with hope?
- Is it respectful and dignified?

#### Red Flags 🚩

Request immediate changes if you notice:
- Emojis anywhere in the content
- References to "Daddy" or "Dad" instead of "Ryan"
- Overly sad or traumatic content
- Inappropriate details for a child
- Factual errors or inconsistencies
- Poor grammar that affects readability
- Insensitive or disrespectful tone

---

### Step 5: Family Approval (Required)

**Before final approval:**

1. **Tag Family Approver**
   - Add comment in PR: `@julie-username Please review and approve`
   - Include any specific questions or concerns

2. **Wait for Family Response**
   - Family approver must explicitly approve
   - They may request content changes
   - They have final say on story accuracy and appropriateness

3. **Document Approval**
   - Check the "Family Approval" box in PR template
   - Add comment: "Family approval received from @julie-username"

**Family Approver Guidelines:**
- Trust your instincts about what's appropriate
- Consider how the story will be perceived by Ryan's son
- Verify factual accuracy of events described
- Confirm story represents Ryan well
- Don't hesitate to request changes or reject if needed

---

## Common Issues and Solutions

### Issue: Emojis Found in Content
**Solution**: Provide specific locations and suggest text replacements
```markdown
Please remove emojis from:
- Line 25: "Ryan smiled 😊" → "Ryan smiled warmly"
- Line 42: "💙 favorite color" → "His favorite color"
```

### Issue: "Daddy" Used Instead of "Ryan"
**Solution**: Provide line-by-line replacements
```markdown
Please replace "Daddy" with "Ryan" on:
- Line 15: "Daddy laughed" → "Ryan laughed"
- Line 32: "Daddy's favorite" → "Ryan's favorite"
```

### Issue: Images Too Large
**Solution**: Request optimization with specific targets
```markdown
Please optimize images:
- hero.jpg is 2.5MB → should be < 500KB
- Use: https://squoosh.app/ or similar tool
- Target: 1200px wide, 80% quality JPEG or WebP
```

### Issue: Story Too Short
**Solution**: Suggest areas to expand
```markdown
Story is currently ~100 words. Suggest expanding:
- Add more sensory details (what did you see/hear/smell?)
- Include dialogue if you remember specific words
- Describe Ryan's reactions or expressions
- Target: 200-400 words for meaningful stories
```

### Issue: Overly Cute Language
**Solution**: Point to style guide and suggest rewording
```markdown
Please adjust language per STORY_STYLE_GUIDE.md:
- Line 18: "wittle puppers" → "little puppies"
- Line 25: "super duper happy" → "very happy" or "delighted"
```

### Issue: Missing Family Context
**Solution**: Suggest adding context section
```markdown
Consider adding a "Family Notes" section at the end:
- Explain who Grammy was (Ryan's grandmother)
- Mention this was shortly after you met
- Add any context that helps Ryan's son understand
```

---

## Approval and Merge

### Pre-Merge Checklist ✅

Before clicking "Approve" and "Merge", verify:

- [ ] All constitution compliance items checked
- [ ] Tested locally - story renders correctly
- [ ] Mobile responsiveness verified
- [ ] Authentication tested (if applicable)
- [ ] No console errors or build warnings
- [ ] Content quality meets standards
- [ ] Family approval explicitly received and documented
- [ ] All requested changes have been made
- [ ] PR template checklist is complete

### Merge Process

1. **Add Final Approval Comment**
   ```markdown
   ✅ All requirements met
   ✅ Tested locally - looks great!
   ✅ Family approval received
   
   Approved for merge. Thank you for this beautiful story about Ryan! 💚
   ```

2. **Click "Approve" in PR Review**

3. **Click "Squash and Merge"**
   - Use squash merge to keep history clean
   - Default merge commit message is usually fine
   - Can edit to add more context if desired

4. **Delete Source Branch**
   - GitHub will prompt after merge
   - Click "Delete branch" to clean up

5. **Monitor Deployment**
   - Vercel will automatically deploy
   - Check deployment status in Vercel dashboard
   - Usually completes in 2-3 minutes

---

## Post-Merge Verification

### Immediate Verification (within 5 minutes)

1. **Check Production Site**
   - Navigate to production URL
   - Go to `/stories` page
   - Verify new story appears in list
   - Click on story and verify it loads correctly

2. **Test on Mobile Device**
   - Open production site on actual phone
   - Navigate to the new story
   - Verify images load
   - Check for any layout issues

3. **Verify Authentication** (for stories 08+)
   - Sign out and try to access story
   - Verify redirect to sign-in page
   - Sign in and verify access granted

### Post-Publication Tasks

1. **Notify Submitter**
   - Comment on closed PR with publication confirmation
   - Include link to live story
   - Thank them for their contribution
   ```markdown
   🎉 Story published! You can view it here: [Story Title](https://yoursite.com/stories/##-story-slug)
   
   Thank you for sharing this beautiful memory of Ryan. It means so much to have these stories preserved for his son.
   ```

2. **Update Story List** (if needed)
   - Check if `meta.json` needs updating
   - Verify story appears in chronological order
   - Ensure featured image is correct

3. **Share with Family** (optional)
   - Notify family members of new story
   - Share link via family communication channel

---

## Quality Metrics

Track these metrics to improve the review process:

- **Time to First Review**: Target < 48 hours
- **Time to Approval**: Target < 7 days (including submitter response time)
- **Rejection Rate**: Should be < 20% (good initial guidance reduces rejections)
- **Change Requests Per PR**: Target < 2 rounds of feedback
- **Post-Merge Issues**: Target 0 (thorough review prevents problems)

---

## Review Best Practices

### DO ✅
- Provide specific, actionable feedback with line numbers
- Acknowledge the emotional significance of story submissions
- Test locally before approving
- Reference specific constitution principles when requesting changes
- Be thorough but kind in your feedback
- Thank submitters for their contributions

### DON'T ❌
- Approve without testing locally
- Skip the family approval step
- Provide vague feedback ("this doesn't sound right")
- Rush the review process
- Merge with known issues "to fix later"
- Make the submitter feel bad about mistakes

### Communication Tone

Remember: Story submissions are deeply personal. Review with empathy and respect.

**Good Feedback Example:**
```markdown
Thank you for this touching story about Ryan! I can tell this memory is special.

I found a few items that need adjustment per our constitution:

1. Line 25: Please replace "😊" with descriptive text like "smiled warmly"
2. Line 42: Use "Ryan" instead of "Daddy" to maintain consistency
3. Consider adding a brief family context note at the end explaining the timeline

Once these changes are made, I'll be happy to approve! Let me know if you have any questions.
```

**Poor Feedback Example:**
```markdown
❌ Rejected. Has emojis. Fix the content.
```

---

## Escalation Process

### When to Escalate

Escalate to project owner or senior family member if:
- Content is potentially sensitive or controversial
- You're unsure about constitutional interpretation
- Factual accuracy is questioned
- Submitter is unresponsive for > 14 days
- Family approvers disagree on story appropriateness

### How to Escalate

1. Add comment in PR: `@project-owner Please review - need guidance on [specific issue]`
2. Explain the concern clearly and objectively
3. Reference relevant constitution sections
4. Wait for guidance before proceeding

---

## Appendix: Quick Reference

### Constitution Principles

- **Principle I**: Child-Centered Design
- **Principle III**: Family Privacy & Authentication
- **Principle IV**: Content Guidelines (NON-NEGOTIABLE)
- **Principle V**: Story Structure Requirements
- **Principle VI**: Performance & Optimization

### Key Files

- Constitution: `.specify/memory/constitution.md`
- Style Guide: `STORY_STYLE_GUIDE.md`
- PR Template: `.github/PULL_REQUEST_TEMPLATE/story_submission.md`

### Useful Commands

```bash
# Pull PR branch
git fetch origin
git checkout branch-name

# Run dev server
npm run dev

# Build test
npm run build

# Search for emojis (PowerShell)
Select-String -Path "app/stories/##-story/page.mdx" -Pattern "[^\x00-\x7F]"
```

---

**Version History**
- v1.0.0 (2025-12-06): Initial comprehensive workflow documentation

**Maintained by**: Project Administrators  
**Questions?**: Open a GitHub discussion or contact family approver
