# NOVENTRA — File review and publication workflow

## Purpose
Every file intended to become visible to other users or appear in the learning library/store must pass moderation before publication. A question attachment remains private by default until the product policy for community visibility is finalized.

## Lifecycle
1. An authenticated user selects a file, section (Sewing, Kitchen, or Programming), and purpose.
2. The browser uploads it to Firebase Storage at quarantine/{uid}/{fileId}. This location is private and is not a public download URL.
3. The client creates a Firestore fileSubmissions/{submissionId} record with status=pending and approved=false.
4. A trusted Cloud Function validates metadata and actual file contents, checks size/type, computes a hash, scans for malware using a server-side scanning service, and creates a review-queue item.
5. A moderator/admin reviews the file and records approved, rejected, or needs_changes, with a reason and reviewer identity.
6. Only after approval and successful security checks does trusted server code copy the object to published/{fileId}, write approved metadata to publishedFiles/{fileId}, and mark the submission published.
7. Rejected or revision-requested files remain private. The uploader receives the reason and may submit a corrected version.
8. The backend writes an immutable review-history record for auditing.

## Roles
- Student/uploader: upload a file, see status and decision for own submissions, and submit a corrected version.
- Moderator: inspect the review queue, preview files through a protected interface, and record review decisions.
- Administrator: all moderator abilities plus user/role management, policy configuration, reports, and audit review.

Role claims (admin/moderator) must be assigned only by a trusted administrator using the Firebase Admin SDK. A browser client must never grant itself a role.

## Required states
- pending: awaiting checks/review
- scanning: automated security checks in progress
- needs_changes: uploader must correct or replace the submission
- rejected: not approved; private and unavailable publicly
- approved: passed checks and moderator approval
- published: copied to the approved public-file area

## Security requirements
- Never upload unreviewed files to the public GitHub Pages repository.
- Never store uploaded content in a public folder or expose a download token before approval.
- Do not trust filename, extension, or browser-supplied MIME type alone. Inspect file signatures on the server.
- Enforce size/type limits on both client and server. Current Storage rules set a 25 MiB initial cap and a conservative type allow-list; refine it after supported lesson formats are defined.
- Scan files server-side before publication. Firebase Storage Rules do not scan files for malware.
- Use short-lived protected review links where needed; quarantine objects must not be public.
- Keep an audit trail: submission ID, uploader, reviewer, decision, reason, timestamps, file hash, and published object path.
- Apply the same workflow to lesson uploads and paid products. Paid products must not become purchasable/downloadable before approval.
- For question attachments, decide whether all attachments need moderator approval or only attachments intended for community-wide visibility. Until that policy is finalized, keep uploads private by default.

## Current implementation status
This repository is a static GitHub Pages site and currently has a Firebase web configuration template. firestore.rules and storage.rules are security groundwork only. A working moderation queue still requires:
- a Firebase project with Firestore and Storage enabled;
- deployment of these rules;
- trusted Cloud Functions (or another secure backend) for scanning, copying approved files, updating statuses, and audit logging;
- a moderator/admin interface;
- Firebase Authentication custom claims assigned securely.

Do not describe file moderation as live until these backend components are deployed and tested. GitHub Pages alone cannot securely perform privileged file review or private file storage.
