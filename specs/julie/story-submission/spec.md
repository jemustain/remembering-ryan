# Feature Specification: User Story Submission with GitHub PR Generation

**Feature Branch**: `julie/story-submission`  
**Created**: 2025-12-05  
**Status**: Draft  
**Input**: User description: "I want signed-in users to submit stories through a form, which automatically generates a PR in the GitHub repo"

## Clarifications

### Session 2025-12-05

- Q: GitHub PR Creation Method - Which authentication method should be used for GitHub API access? → A: Personal Access Token (PAT) stored in environment variables
- Q: Story Submission Persistence - Should submissions be stored in database or processed ephemerally? → A: Ephemeral only - process immediately without persistence
- Q: Concurrent Submission Handling - How should system handle multiple simultaneous submissions? → A: Sequential processing with user feedback - queue at API level, process one at a time
- Q: Content Validation Timing - When should content validation occur? → A: Client and server validation - immediate feedback plus security verification
- Q: Image Upload Failure Recovery - How should system handle image upload failures? → A: Fail entire submission - user retries with form data preserved in browser

## User Scenarios & Testing

### User Story 1 - Submit New Story Content (Priority: P1)

A signed-in user with appropriate permissions fills out a form to submit a new story about Ryan. The form collects the story title, content, author name, and optional images. Upon submission, the system creates a properly formatted story file and opens a pull request in the GitHub repository for review.

**Why this priority**: This is the core functionality that enables family members to contribute stories without requiring technical knowledge of Git, MDX, or Next.js. It's the MVP that delivers immediate value.

**Independent Test**: Can be fully tested by signing in as a family member, submitting a complete story through the form, and verifying a pull request is created with the correct file structure and content in the repository.

**Acceptance Scenarios**:

1. **Given** a signed-in user with FAMILY or ADMIN role, **When** they access the story submission form, **Then** they see fields for title, content, author name, and image upload
2. **Given** a user completes all required form fields, **When** they click Submit, **Then** the system validates the content on both client-side (immediate feedback) and server-side (security) against story guidelines (no emojis, uses "Ryan" throughout, age-appropriate language)
3. **Given** valid story content is submitted, **When** the system processes the submission, **Then** it generates a properly numbered story folder with page.mdx file following the constitution's story structure requirements
4. **Given** a story file is generated, **When** the system creates the PR, **Then** the PR includes the story file, uploaded images in the correct directory, and a descriptive title following the naming convention
5. **Given** a PR is created successfully, **When** the user returns to the form, **Then** they see a confirmation message with a link to view the PR

---

### User Story 2 - Review and Edit Submitted Stories (Priority: P2)

An administrator reviews pull requests created by story submissions, makes necessary edits directly in GitHub, and either approves or requests changes before merging.

**Why this priority**: Ensures content quality and consistency with the memorial site's tone and guidelines before stories go live. Required for governance but can be handled through GitHub's existing PR workflow.

**Independent Test**: Can be fully tested by creating a test story submission, accessing the PR in GitHub, making edits to the content or structure, and verifying changes are reflected correctly.

**Acceptance Scenarios**:

1. **Given** a new story PR is created, **When** an admin views it in GitHub, **Then** they see the story content rendered correctly in the preview
2. **Given** an admin needs to make edits, **When** they modify the story content in the PR, **Then** the changes follow the constitution's content guidelines and story structure
3. **Given** a story meets quality standards, **When** the admin approves and merges the PR, **Then** the story appears on the live site with proper authentication (if family-protected)

---

### User Story 3 - Track Submission History (Priority: P3)

Users can view their previously submitted stories and their approval status (pending review, approved, published).

**Why this priority**: Provides transparency and engagement for contributors, but not critical for initial launch. Can be added after core submission workflow is proven.

**Independent Test**: Can be fully tested by submitting multiple stories, viewing the submission history page, and verifying status updates appear correctly as PRs are reviewed and merged.

**Acceptance Scenarios**:

1. **Given** a signed-in user has submitted stories, **When** they access the submission history page, **Then** they see a list of their submissions with current status
2. **Given** a story PR is merged, **When** the user refreshes their history, **Then** the story status updates to "Published" with a link to the live story

---

### Edge Cases

- What happens when a user submits a story with emojis or inappropriate language? System validates content on both client-side (immediate feedback) and server-side, displays specific error messages indicating which guidelines were violated.
- How does the system handle duplicate story submissions? System checks for existing stories with the same title and prompts user to modify or confirms they want to proceed.
- What happens if GitHub API is unavailable during submission? System displays error message and user must resubmit (no queuing or retry since submissions are ephemeral).
- How does the system handle image uploads larger than size limits? System validates image sizes before upload, compresses if needed, and rejects if compression still exceeds limits with clear error message.
- What happens if image upload fails during submission? Entire submission fails atomically, form data is preserved in browser storage, user receives clear error message and can retry.
- What happens if a user's authentication expires during form completion? System preserves form data in browser storage and prompts re-authentication without data loss.
- How does the system determine the next story number? System queries the repository for existing story folders, identifies the highest number, and assigns the next sequential number with proper zero-padding.
- How does sequential processing affect user experience? Users see their queue position and estimated wait time if submissions are being processed ahead of them.

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST allow FAMILY and ADMIN role users to access the story submission form
- **FR-002**: System MUST validate that users are authenticated before displaying the submission form
- **FR-003**: Form MUST collect story title, content body, author name, and optional image uploads (hero image and additional images)
- **FR-004**: System MUST validate story content against constitution guidelines on both client-side (immediate feedback within 500ms) and server-side (security verification): no emojis, uses "Ryan" consistently, age-appropriate language
- **FR-005**: System MUST automatically determine the next sequential story number by querying existing story folders
- **FR-006**: System MUST generate a properly formatted page.mdx file with required imports (StoryImage, HeroImage, StoryMeta components)
- **FR-007**: System MUST create a story folder structure at `/app/stories/[##-story-slug]/` with proper numbering
- **FR-008**: System MUST upload and organize images in `/public/images/stories/[story-slug]/` directory
- **FR-009**: System MUST create a GitHub pull request with descriptive title and body including story metadata
- **FR-010**: System MUST display confirmation message with PR link after successful submission
- **FR-011**: System MUST handle submission failures gracefully with clear error messages and preserve user input in browser storage
- **FR-012**: System MUST preserve user input if authentication expires or submission fails (including image upload failures - entire submission fails atomically)
- **FR-013**: System MUST validate image file types (accept jpg, png, webp) and sizes (reject files larger than 5MB before compression)
- **FR-014**: System MUST automatically optimize uploaded images for web delivery
- **FR-015**: System MUST prevent duplicate submissions by checking existing story titles

### Non-Functional Requirements

- **NFR-001**: Story submission form MUST load within 2 seconds for authenticated users
- **NFR-002**: Form validation feedback MUST appear within 500 milliseconds of user input
- **NFR-003**: GitHub PR creation MUST complete within 10 seconds of form submission (excluding queue wait time)
- **NFR-004**: System MUST process submissions sequentially to avoid story numbering conflicts, displaying queue position to waiting users
- **NFR-005**: Image uploads MUST support files up to 5MB with automatic compression
- **NFR-006**: System MUST maintain audit log of all story submissions with timestamp and submitter
- **NFR-007**: Form MUST be fully keyboard accessible and screen reader compatible
- **NFR-008**: System MUST work reliably with GitHub API rate limits by implementing retry logic
- **NFR-009**: Sensitive operations (GitHub API tokens) MUST be secured server-side

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Family members can submit a complete story from form to PR creation in under 5 minutes (when no queue)
- **SC-002**: 90% of submissions generate valid PRs that pass automated checks without requiring manual fixes
- **SC-003**: System processes submissions sequentially without story number conflicts
- **SC-004**: Submitted stories follow constitution structure requirements in 95% of cases (automatic validation)
- **SC-005**: Users receive submission confirmation within 10 seconds of clicking Submit
- **SC-006**: Zero GitHub API credentials or sensitive data exposed in client-side code
- **SC-007**: Form validation catches 100% of content guideline violations before PR creation
- **SC-008**: Image optimization reduces file sizes by at least 40% while maintaining visual quality

---

## Key Entities & Data

### Story Submission Data
- **Title**: Text field for story title
- **Content**: Multi-line text area for story body (markdown format)
- **Author**: Text field for author name (defaults to session user)
- **Hero Image**: File upload for featured image
- **Additional Images**: Multiple file upload for inline story images
- **Status**: Submission state (processing, pr-created, error) - ephemeral, not persisted
- **PR URL**: Link to generated GitHub pull request - returned in response only
- **Created At**: Timestamp of submission - not persisted, for request tracking only
- **Submitted By**: User ID of submitter - captured in PR metadata only

**Note**: Submissions are processed immediately without database persistence. If GitHub API fails, user receives error and must resubmit.

### GitHub Pull Request Metadata
- **Branch Name**: Format `story-submission/[story-slug]-[timestamp]`
- **PR Title**: Format `Story Submission: [story-title]`
- **PR Body**: Includes story metadata, submitter info, review checklist
- **Files Changed**: Story page.mdx, images, and any metadata updates

---

## Assumptions

- GitHub repository has appropriate branch protection rules allowing PR creation but requiring review before merge
- System has valid GitHub API credentials with write access to the repository
- Authenticated users (FAMILY and ADMIN roles) are trusted to submit appropriate content (validation provides guidance but is not security layer)
- Story numbering is managed sequentially and there is no need for custom numbering
- Images will be stored directly in the repository (not external CDN) for simplicity
- Story review and approval workflow happens entirely through GitHub's PR review interface
- Form submission is a one-time action (no draft saving functionality in MVP)
- All submitted stories follow the same MDX template structure defined in the constitution

---

## Out of Scope

- Rich text editor with WYSIWYG preview (MVP uses plain textarea with markdown support)
- Story scheduling or delayed publication
- Multi-step wizard or draft saving functionality
- Direct publishing without PR review process
- Bulk story uploads or imports
- Story editing after submission (must be done through GitHub PR)
- Automatic story categorization or tagging
- Email notifications for PR status changes (relies on GitHub notifications)
- Story analytics or engagement metrics in submission form
- Integration with external content management systems

---

## Dependencies

- NextAuth.js authentication system with role-based access control (already implemented)
- GitHub API access via Personal Access Token (PAT) with repository write permissions stored in environment variable
- Existing story structure and components (StoryImage, HeroImage, StoryMeta)
- Image optimization library for file compression
- Markdown validation library
- File upload handling (multipart form data)

---

## Technical Constraints

- Must integrate with existing Next.js 15 App Router architecture
- Must follow constitution's story structure requirements exactly
- Must respect GitHub API rate limits (5000 requests per hour for authenticated requests)
- Image processing must complete within serverless function execution time
- Must maintain backward compatibility with existing story discovery mechanism

---

## Security Considerations

- Form must validate user has FAMILY or ADMIN role before accepting submissions
- GitHub API tokens must be stored as environment variables, never exposed to client
- Image uploads must be validated for file type and scanned for malicious content
- Story content must be sanitized to prevent XSS attacks (though MDX provides some protection)
- PR creation must include audit trail of who submitted the story
- Failed submissions must not expose internal error details to user
- Rate limiting must prevent submission spam or abuse

---

## Notes

### Constitution Alignment
- Story structure requirements from Constitution Principle V must be strictly followed
- Content guidelines from Constitution Principle IV (no emojis, use "Ryan", age-appropriate) must be validated
- Authentication requirements from Constitution Principle III must be enforced

### Future Enhancements (Post-MVP)
- Rich text editor with live markdown preview
- Draft saving and resume functionality
- Email notifications when PRs are reviewed/merged
- Story templates for common story types
- Image cropping and editing tools
- Submission history and status tracking (User Story 3)
- Bulk image upload with automatic captioning suggestions
