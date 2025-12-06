# Tasks: User Story Submission with GitHub PR Generation

**Branch**: julie/story-submission | **Date**: 2025-12-05  
**Prerequisites**: plan.md, spec.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Install dependencies: @octokit/rest, sharp, unified, remark-parse, remark-stringify
- [X] T002 [P] Create environment variable GITHUB_TOKEN in .env.local with repository write permissions
- [X] T003 [P] Verify NextAuth.js configuration includes FAMILY and ADMIN role checks
- [X] T004 Create base directory structure: lib/github/, lib/validation/, lib/image/, app/api/story-submission/

---

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Update Prisma schema with StorySubmission model in prisma/schema.prisma
- [X] T006 Run Prisma migration: `npx prisma migrate dev --name add-story-submission`
- [X] T007 [P] Create GitHub API client wrapper in lib/github/client.js with Octokit initialization
- [X] T008 [P] Implement emoji detection function in lib/validation/emojiDetector.js using regex pattern
- [X] T009 [P] Implement content validator in lib/validation/contentValidator.js (checks emojis, "Ryan" usage, word count)
- [X] T010 [P] Implement image validator in lib/validation/imageValidator.js (file type, size checks)
- [X] T011 [P] Implement image optimizer in lib/image/optimizer.js using sharp (WebP conversion, resize, compression)
- [X] T012 Implement story number query function in lib/github/getNextStoryNumber.js
- [X] T013 Implement MDX file generator in lib/github/generateStoryFile.js (creates page.mdx with required imports)
- [X] T014 Implement GitHub file upload in lib/github/uploadFile.js (uses Octokit)
- [X] T015 Implement PR creation service in lib/github/createPullRequest.js (orchestrates branch, files, PR)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Submit New Story Content (Priority: P1) 🎯 MVP

**Goal**: Enable signed-in users to submit stories through a form that generates GitHub PRs

- [X] T016 [P] [US1] Create story submission page at app/submit-story/page.js with authentication check
- [X] T017 [P] [US1] Create StoryForm component in app/submit-story/StoryForm.js with form state management
- [X] T018 [P] [US1] Create ImageUpload component in app/submit-story/ImageUpload.js with preview
- [X] T019 [P] [US1] Create SubmissionSuccess component in app/submit-story/SubmissionSuccess.js with PR link
- [X] T020 [US1] Create validation API endpoint at app/api/story-submission/validate/route.js
- [ ] T021 [US1] Create image upload API endpoint at app/api/story-submission/upload-images/route.js
- [ ] T022 [US1] Create PR creation API endpoint at app/api/story-submission/create-pr/route.js (includes saving StorySubmission audit record to database)
- [X] T023 [US1] Create story number API endpoint at app/api/stories/next-number/route.js
- [X] T024 [US1] Implement client-side form validation with real-time feedback in StoryForm.js
- [X] T025 [US1] Implement server action for form submission in app/submit-story/actions.js
- [X] T026 [US1] Add loading states to StoryForm.js during validation and submission
- [X] T027 [US1] Add error handling with user-friendly messages in StoryForm.js
- [ ] T028 [US1] Implement form data persistence in browser storage (survives auth expiry)
- [X] T029 [US1] Add accessibility attributes (ARIA labels, keyboard navigation) to form components
- [X] T030 [US1] Create PR template at .github/PULL_REQUEST_TEMPLATE/story_submission.md with review checklist

**Checkpoint**: User Story 1 should be fully functional and testable

---

## Phase 4: User Story 2 - Review and Edit Submitted Stories (Priority: P2)

**Goal**: Enable administrators to review and edit story submissions via GitHub PR workflow

- [ ] T031 [US2] Update PR template body to include story metadata, constitution compliance checklist, review guidelines
- [ ] T032 [US2] Create documentation in docs/STORY_REVIEW_WORKFLOW.md explaining review process
- [ ] T033 [US2] Add GitHub Actions workflow at .github/workflows/validate-story-submission.yml to validate structure

**Checkpoint**: User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Track Submission History (Priority: P3)

**Goal**: Allow users to view their submitted stories and approval status

- [ ] T034 [P] [US3] Create submission history page at app/submit-story/history/page.js
- [ ] T035 [P] [US3] Create SubmissionList component in app/submit-story/history/SubmissionList.js
- [ ] T036 [P] [US3] Create SubmissionCard component in app/submit-story/history/SubmissionCard.js with status badge
- [ ] T037 [US3] Create API endpoint at app/api/story-submission/my-submissions/route.js
- [ ] T038 [US3] Create webhook endpoint at app/api/webhooks/github/route.js
- [ ] T039 [US3] Add webhook handler to listen for PR merge events and update StorySubmission status
- [ ] T040 [US3] Configure GitHub webhook in repository settings
- [ ] T041 [US3] Add link from submission history to live story (when status is "Published")
- [ ] T042 [US3] Add filtering options to submission history (All, Pending, Published)
- [ ] T043 [US3] Add sorting options to submission history (Date, Title, Status)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T044 [P] Add inline validation feedback to form fields (character count, emoji warnings)
- [ ] T045 [P] Implement image preview with crop/zoom functionality
- [ ] T046 [P] Add form field tooltips explaining constitution guidelines
- [ ] T047 [P] Create user guide documentation in docs/SUBMIT_STORY_GUIDE.md
- [ ] T048 [P] Add rate limiting to submission endpoints (max 5/hour per user)
- [ ] T049 [P] Implement retry logic for GitHub API calls (max 3 retries)
- [ ] T050 [P] Add logging for all story submissions
- [ ] T051 [P] Create admin dashboard widget showing recent submissions
- [ ] T052 Add performance monitoring for PR creation time
- [ ] T053 Optimize image upload with parallel processing
- [ ] T054 Add caching for story number queries (5-minute TTL)
- [ ] T055 Implement collision detection for concurrent story number assignment
- [ ] T056 Add submission success analytics tracking
- [ ] T057 Create E2E test for happy path: complete form → validation → PR creation
- [ ] T058 Create E2E test for validation errors: emoji detection, missing fields
- [ ] T059 Create E2E test for image upload: valid images, oversized images, invalid types
- [ ] T060 Add mobile responsive styles for story submission form
- [ ] T061 Test keyboard navigation through entire form flow
- [ ] T062 Test screen reader compatibility with NVDA and VoiceOver
- [ ] T063 Add error boundary component to handle unexpected errors
- [ ] T064 Create monitoring dashboard for submission metrics

---

## Summary

**Total Tasks**: 64  
**MVP Scope** (Phases 1-3): 30 tasks for working submission flow  
**Parallel Tasks**: 34 tasks marked [P]

### Phase Dependencies

1. Phase 1 (Setup) → Must complete before Phase 2
2. Phase 2 (Foundational) → BLOCKING - Must complete before Phase 3, 4, 5
3. Phase 3 (US1) → Can start after Phase 2
4. Phase 4 (US2) → Depends on Phase 3
5. Phase 5 (US3) → Depends on Phase 3
6. Phase 6 (Polish) → Can run in parallel with Phases 3-5

### MVP Implementation Order

For fastest time to value:
1. Complete Phase 1 (4 tasks)
2. Complete Phase 2 (11 tasks)
3. Complete Phase 3 (15 tasks)
4. Add error boundary from Phase 6 (T063)

**Total MVP**: 31 tasks delivers complete story submission with PR generation
