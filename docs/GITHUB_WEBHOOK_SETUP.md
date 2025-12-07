# GitHub Webhook Configuration Guide

This guide explains how to set up the GitHub webhook to automatically update story submission statuses when pull requests are merged.

## Purpose

The webhook listens for pull request events and automatically updates the status of story submissions in the database:
- When a PR is **merged** → Status changes to `published`
- When a PR is **closed without merging** → Status changes to `rejected`
- When a PR is **reopened** → Status changes back to `pending`

This allows users to see the real-time status of their submitted stories in the submission history page.

---

## Prerequisites

1. Admin access to the GitHub repository settings
2. A deployed production website with the webhook endpoint live
3. (Optional) A secret token for webhook signature verification

---

## Setup Instructions

### Step 1: Generate a Webhook Secret (Recommended)

1. Generate a strong random secret:
   ```bash
   # On Linux/Mac
   openssl rand -hex 32
   
   # On Windows PowerShell
   -join ((48..57) + (97..102) | Get-Random -Count 64 | ForEach-Object {[char]$_})
   ```

2. Add the secret to your environment variables:
   ```bash
   # In .env.local (for local testing)
   GITHUB_WEBHOOK_SECRET=your_generated_secret_here
   ```

3. Add the same secret to Vercel environment variables:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add `GITHUB_WEBHOOK_SECRET` with the same value
   - Redeploy your application

### Step 2: Configure the Webhook in GitHub

1. Navigate to your repository on GitHub:
   ```
   https://github.com/jemustain/remembering-ryan
   ```

2. Go to **Settings** → **Webhooks** → **Add webhook**

3. Configure the webhook:
   
   **Payload URL:**
   ```
   https://your-production-domain.com/api/webhooks/github
   ```
   Example: `https://remembering-ryan.vercel.app/api/webhooks/github`

   **Content type:**
   ```
   application/json
   ```

   **Secret:**
   ```
   [Paste the webhook secret you generated in Step 1]
   ```

   **Which events would you like to trigger this webhook?**
   - Select "Let me select individual events"
   - Check: **Pull requests** only
   - Uncheck: Everything else

   **Active:**
   - ✅ Check "Active"

4. Click **Add webhook**

### Step 3: Test the Webhook

1. **Test webhook endpoint health:**
   ```bash
   curl https://your-domain.com/api/webhooks/github
   ```
   Should return:
   ```json
   {
     "status": "ok",
     "message": "GitHub webhook endpoint is active",
     "timestamp": "2025-12-06T..."
   }
   ```

2. **Test with a real PR:**
   - Create a test story submission
   - The PR should be created automatically
   - Check the submission history - status should be "Pending"
   - Merge the PR on GitHub
   - Refresh the submission history - status should change to "Published"
   - The webhook typically fires within 1-2 seconds

3. **Check webhook deliveries:**
   - In GitHub, go to Settings → Webhooks
   - Click on your webhook
   - Click "Recent Deliveries" tab
   - You should see successful deliveries (green checkmarks)
   - Click on a delivery to see the request and response

### Step 4: Verify Database Updates

After merging a test PR, check that the database was updated:

```bash
# Connect to your database
npx prisma studio

# Or query directly
npx prisma db execute --stdin <<EOF
SELECT * FROM StorySubmission WHERE status = 'published';
EOF
```

---

## Webhook Events Handled

### Pull Request Closed (Merged)
- **Trigger:** PR is merged
- **Action:** Updates `status` to `'published'`
- **User Experience:** Story appears as published in submission history with "Read Story" link

### Pull Request Closed (Not Merged)
- **Trigger:** PR is closed without merging
- **Action:** Updates `status` to `'rejected'`
- **User Experience:** Story appears as rejected in submission history

### Pull Request Reopened
- **Trigger:** Previously closed PR is reopened
- **Action:** Updates `status` back to `'pending'`
- **User Experience:** Story appears as pending review again

---

## Troubleshooting

### Webhook Returns 401 "Invalid signature"

**Cause:** Webhook secret mismatch

**Solution:**
1. Verify `GITHUB_WEBHOOK_SECRET` is set in Vercel environment variables
2. Ensure the secret in GitHub webhook settings matches exactly
3. Redeploy the application after adding the environment variable

### Webhook Returns 500 Error

**Cause:** Database connection or code error

**Solution:**
1. Check Vercel function logs for detailed error messages
2. Verify database connection string is correct
3. Ensure Prisma client is generated (`prisma generate`)
4. Check that `StorySubmission` model exists in database

### Status Not Updating

**Cause:** PR number mismatch or webhook not firing

**Solution:**
1. Check webhook delivery history in GitHub (Settings → Webhooks)
2. Verify PR number matches the `prNumber` field in `StorySubmission` table
3. Check Vercel logs for webhook processing
4. Manually trigger webhook from GitHub "Recent Deliveries" → "Redeliver"

### No "Read Story" Link After Publishing

**Cause:** Status updated but slug doesn't match

**Solution:**
1. Verify story was actually deployed (check `/stories` page)
2. Check that story folder follows naming convention: `##-story-slug`
3. Verify `storyNumber` in database matches folder number

---

## Security Considerations

### Webhook Secret

**Always use a webhook secret in production!**

Without a secret:
- ❌ Anyone can send fake webhook requests to your endpoint
- ❌ Malicious actors could change submission statuses
- ❌ Could cause database corruption

With a secret:
- ✅ Only GitHub can send valid webhook requests
- ✅ Requests are cryptographically verified
- ✅ Protects against replay attacks

### Rate Limiting

The webhook endpoint does not currently implement rate limiting because:
- GitHub webhooks are already rate-limited by GitHub
- Endpoint only processes PR events (low volume)
- Each request is verified with signature

If you experience webhook spam:
1. Rotate your webhook secret
2. Add IP address whitelist (GitHub's IP ranges)
3. Implement rate limiting using Vercel Edge Config

---

## Monitoring and Maintenance

### Check Webhook Health

Create a monitoring script:

```bash
#!/bin/bash
# check-webhook.sh

WEBHOOK_URL="https://your-domain.com/api/webhooks/github"

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$WEBHOOK_URL")

if [ "$RESPONSE" -eq 200 ]; then
  echo "✅ Webhook is healthy"
else
  echo "❌ Webhook returned $RESPONSE"
  exit 1
fi
```

Run this daily with a cron job or monitoring service.

### Webhook Delivery Logs

GitHub keeps webhook delivery logs for 30 days:
- Go to Settings → Webhooks → [Your Webhook]
- Click "Recent Deliveries"
- Review any failed deliveries
- Use "Redeliver" to retry failed webhooks

### Database Monitoring

Monitor submission status distribution:

```sql
SELECT status, COUNT(*) as count
FROM StorySubmission
GROUP BY status;
```

Expected distribution:
- `pending`: 0-5 (recent submissions)
- `published`: Most submissions
- `rejected`: Few (edge cases only)

---

## Advanced Configuration

### Multiple Environments

If you have staging and production:

**Staging:**
```bash
GITHUB_WEBHOOK_SECRET=staging_secret_here
```

**Production:**
```bash
GITHUB_WEBHOOK_SECRET=production_secret_here
```

Create separate webhooks in GitHub for each environment.

### Custom Webhook Logic

To add custom logic when PRs are merged, edit `/app/api/webhooks/github/route.js`:

```javascript
if (action === 'closed' && wasMerged) {
  // Update status
  await prisma.storySubmission.update({ ... })
  
  // Custom logic here:
  // - Send notification email
  // - Post to Slack
  // - Update analytics
  // - etc.
}
```

### Webhook Debugging

Enable detailed logging:

```javascript
// In route.js
console.log('Webhook payload:', JSON.stringify(payload, null, 2))
console.log('Submission found:', submission)
console.log('Status update:', newStatus)
```

Check logs in Vercel:
```bash
vercel logs --prod
```

---

## Testing Without GitHub

For local development, you can simulate webhook events:

```bash
# Send a mock webhook request
curl -X POST http://localhost:3000/api/webhooks/github \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: pull_request" \
  -d '{
    "action": "closed",
    "pull_request": {
      "number": 123,
      "html_url": "https://github.com/user/repo/pull/123",
      "merged": true
    }
  }'
```

Or use a tool like [smee.io](https://smee.io) to forward GitHub webhooks to localhost.

---

## Reference

- **Webhook Endpoint:** `/api/webhooks/github/route.js`
- **Documentation:** [GitHub Webhooks Documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
- **Security:** [Securing webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks)
- **Events:** [Pull request events](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#pull_request)

---

## Quick Reference Commands

```bash
# Test webhook endpoint
curl https://your-domain.com/api/webhooks/github

# Generate webhook secret
openssl rand -hex 32

# Check Vercel logs
vercel logs --prod

# View recent submissions
npx prisma studio

# Test locally with mock webhook
curl -X POST http://localhost:3000/api/webhooks/github \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: pull_request" \
  -d '{"action":"closed","pull_request":{"number":1,"merged":true}}'
```

---

**Version:** 1.0.0  
**Last Updated:** 2025-12-06  
**Questions?** Open a GitHub discussion or contact the maintainer
