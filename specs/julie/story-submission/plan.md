# Implementation Plan: User Story Submission with GitHub PR Generation

**Branch**: `julie/story-submission` | **Date**: 2025-12-05 | **Spec**: [spec.md](spec.md)

## Summary

Implement a web form that allows authenticated FAMILY and ADMIN users to submit new stories about Ryan. The form collects story metadata (title, content, author, images), validates content against constitution guidelines (no emojis, uses "Ryan", age-appropriate language), and automatically generates a GitHub pull request with properly formatted MDX files following the project's story structure requirements.

**Primary requirement**: Enable non-technical family members to contribute stories without requiring Git, MDX, or Next.js knowledge.

**Technical approach**: Next.js API routes for form handling, Octokit for GitHub API integration, sharp for image optimization, markdown validation for content guidelines enforcement.

---

## Technical Context

**Language/Version**: JavaScript (Next.js 15, Node.js 18+)  
**Primary Dependencies**: Next.js 15, NextAuth.js (existing), @octokit/rest (GitHub API), sharp (image processing), unified/remark (markdown validation)  
**Storage**: GitHub repository (code), PostgreSQL with Prisma (audit logging only - not retry queue)  
**Testing**: Jest with React Testing Library (component tests), Playwright (E2E)  
**Target Platform**: Vercel serverless functions  
**Performance Goals**: Form load <2s, validation <500ms, PR creation <10s  
**Constraints**: Vercel timeout (10s hobby/60s pro), GitHub API rate limits (5000/hour), constitution compliance  
**Scale/Scope**: ~10-20 family members, <50 submissions/year, <5MB images

---

## Constitution Check

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| **II. Story-First Architecture** | Stories MUST be MDX files at `/app/stories/[##-slug]/page.mdx` | ✅ PASS | Form generates MDX with required structure |
| **III. Family Privacy & Authentication** | FAMILY/ADMIN roles required | ✅ PASS | Form checks roles via NextAuth |
| **IV. Content Guidelines** | NO EMOJIS in content | ✅ PASS | Form validation rejects emojis |
| **IV. Content Guidelines** | Stories refer to "Ryan" by name | ✅ PASS | Form validation checks "Ryan" usage |
| **V. Story Structure** | Required imports, numbered prefix | ✅ PASS | Form generates complete structure |
| **VI. Performance & Optimization** | Images optimized | ✅ PASS | sharp optimizes uploads |

**Gate Decision**: ✅ PASS - All constitution principles satisfied

---

## Project Structure

### New Files to Create

```
app/
├── api/
│   └── story-submission/
│       ├── validate/route.js        # Content validation endpoint
│       ├── upload-images/route.js   # Image upload handler
│       └── create-pr/route.js       # GitHub PR creation
├── submit-story/
│   ├── page.js                      # Story submission form page
│   └── components/
│       ├── StoryForm.js             # Main form component
│       ├── ImageUpload.js           # Image upload component
│       └── SubmissionSuccess.js     # Confirmation component

lib/
├── github/
│   ├── createPullRequest.js         # GitHub API wrapper
│   ├── generateStoryFile.js         # MDX generation
│   └── uploadFile.js                # File upload to GitHub
├── validation/
│   ├── contentValidator.js          # Constitution validation
│   ├── emojiDetector.js             # Emoji detection
│   └── imageValidator.js            # Image validation
└── image/
    └── optimizer.js                 # Sharp-based optimization

prisma/
└── schema.prisma                    # Add StorySubmission model

tests/
├── e2e/
│   └── story-submission.spec.js     # E2E tests
└── unit/
    ├── validation/
    └── github/
```

---

## Phase 0: Research & Technical Decisions

### Research Areas

1. **GitHub API for PR Creation**
   - **Question**: How to create PR with multiple files using Octokit?
   - **Research needed**: Git Tree API, branch creation workflow, file content encoding

2. **Image Optimization Strategy**
   - **Question**: What image sizes/formats? Server-side optimization approach?
   - **Research needed**: Sharp compression ratios, WebP conversion, memory limits

3. **Markdown/MDX Validation**
   - **Question**: How to validate for emojis and "Ryan" usage?
   - **Research needed**: Regex patterns, unified/remark AST parsing

4. **Story Numbering Collision Prevention**
   - **Question**: How to handle concurrent submissions?
   - **Research needed**: Sequential processing queue, optimistic locking

5. **Serverless Function Timeout**
   - **Question**: Handle timeouts on PR creation?
   - **Research needed**: Vercel limits, fail fast vs queue strategy

**Output**: Document decisions before Phase 1

---

## Phase 1: Design & Contracts

### Data Model

```prisma
model StorySubmission {
  id            String   @id @default(cuid())
  title         String
  content       String   @db.Text
  authorName    String
  storySlug     String
  storyNumber   Int
  heroImagePath String?
  imagesPaths   String[]
  prUrl         String?
  prNumber      Int?
  status        SubmissionStatus @default(PENDING)
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  errorMessage  String?
}

enum SubmissionStatus {
  PENDING
  VALIDATING
  PR_CREATING
  PR_CREATED
  FAILED
}
```

### API Contracts

**POST /api/story-submission/validate**
- Request: `{ title: string, content: string, authorName: string }`
- Response: `{ valid: boolean, errors: string[] }`
- Validation:
  - No emojis in title or content
  - Content includes "Ryan" at least once
  - Title 3-50 characters
  - Content 100-5000 words

**POST /api/story-submission/upload-images**
- Request: multipart/form-data with images
- Response: `{ uploadedImages: [{ filename, path }] }`
- Processing:
  - Validate types (jpg, png, webp)
  - Validate sizes (<5MB)
  - Optimize with sharp

**POST /api/story-submission/create-pr**
- Request:
  ```json
  {
    "title": "string",
    "content": "string",
    "authorName": "string",
    "heroImage": { "filename": "string", "buffer": "base64" },
    "additionalImages": []
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "prUrl": "string",
    "prNumber": 123,
    "storyNumber": 25,
    "storySlug": "string"
  }
  ```

---

## Phase 2: Implementation

### High-Level Task Breakdown

1. **Setup** (5 tasks)
   - Install dependencies (@octokit/rest, sharp, unified)
   - Update Prisma schema
   - Run migration
   - Add GitHub token to env
   - Create GitHub API client

2. **Foundational Libraries** (5 tasks)
   - Content validation (emoji, "Ryan" check)
   - Image validation and optimization
   - GitHub PR creation service
   - Story file generator (MDX)
   - Story numbering query

3. **User Story 1 - Submit Story** (8 tasks)
   - Build form UI (StoryForm component)
   - Image upload component
   - Form state management
   - Validation API route
   - Image upload API route
   - PR creation API route
   - Success confirmation page
   - Error handling

4. **Testing & Polish** (5 tasks)
   - E2E tests (happy path)
   - E2E tests (validation failures)
   - Unit tests (validation logic)
   - Accessibility testing
   - Documentation

**Total**: ~25 tasks for MVP (User Story 1)

---

## Security Considerations

1. **GitHub Token**: Store in `GITHUB_TOKEN` env variable, never expose client-side
2. **Role Verification**: Every API route verifies FAMILY/ADMIN role
3. **Image Validation**: Server-side file type verification with sharp
4. **Content Sanitization**: Sanitize markdown to prevent XSS
5. **Rate Limiting**: Max 5 submissions/hour per user

---

## Testing Strategy

1. **Unit Tests**: Validation logic, emoji detection, image optimization
2. **Integration Tests**: API endpoints with mocked GitHub API
3. **E2E Tests**: Full form submission with Playwright
4. **Manual Testing**: Submit test stories, verify PR structure

---

## Rollout Plan

**Phase 1 - MVP**: Admin only, monitor first 5 submissions  
**Phase 2 - Beta**: Expand to FAMILY users  
**Phase 3 - Full**: All family members with tutorial

---

**Next Steps**: Run `/speckit.tasks` to generate detailed task breakdown
