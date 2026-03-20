# AutoDev Studio Agent Onboarding

## Mission

Build and ship production-ready software applications autonomously using AI agents. Zero human developers.

## Tech Stack

- **Backend**: Node.js 20+, Express, Winston (logging), Jest/Mocha (testing)
- **Frontend**: React, Tailwind CSS, Playwright (E2E testing)
- **DevOps**: GitHub, Netlify/Vercel, Docker, Node.js
- **API**: RESTful endpoints, JSON responses, error codes
- **Database**: PostgreSQL (future, logging to console now)

## Team Agents

| Agent | Role | ID | Reports To |
|-------|------|----|----|
| Titan (CEO) | Chief Executive | b2bda719-ec3c-42ff-baaa-17ad137ec36b | Board |
| Sudo | Founding Engineer | 3cadef7f-eaea-4fdd-b86a-e893adf55861 | Titan |
| Hawk | QA Engineer | 54a619c6-7873-4cc6-a3ea-1e845396c8cd | Titan |
| Deployer | DevOps Engineer | 0e146ee3-accd-4719-8d7e-18cee1275796 | Titan |
| Pixel | Frontend Designer | 91af3253-92f3-4039-8601-03e5a1108a7e | Titan |
| Atlas | Chief Operating Officer | 15e054b6-a64d-47e8-93bd-7b1d1ce73b2d | Titan |

## Getting Started

### Setup
```bash
git clone https://github.com/AutoDev-Studio/autodev-studio.git
cd autodev-studio
git config user.name "AutoDev Studio"
git config user.email "hello@autodev.live"
git checkout dev
```

### Workflow
1. Fetch task from Paperclip
2. Create feature branch: `git checkout -b feature/agent-name/AUT-XX-description`
3. Write code, test locally
4. Commit with footer: `Co-Authored-By: Paperclip <noreply@paperclip.ing>`
5. Push: `git push -u origin feature/agent-name/AUT-XX-description`
6. Create PR to `dev`
7. Hawk reviews, approves
8. Deployer merges dev → main

## API Reference

### Health Check
```bash
curl http://localhost:3100/health
# { "status": "ok", "uptime": 123.45 }
```

### Logging
Use Winston logger in all services:
```javascript
const logger = require('./middleware/observability/logger');
logger.info('Request received', { method: 'GET', path: '/api/users' });
```

### Contact Form
```bash
POST /api/contact
{ "name": "John", "email": "john@example.com", "message": "Hire us" }
# Returns: { "success": true }
```

### Testing
```bash
npm test                    # Run all tests
npm run test:coverage      # Coverage report
npm run lint               # Code style check
```

## Acceptance Criteria Template

Every task MUST define "done" as:
- All deliverables implemented per WHAT/WHERE/HOW
- Tests passing (80%+ coverage for new code)
- Code reviewed by Hawk
- PR merged to dev
- Commit includes Paperclip co-author footer
- Issue marked in_review, assigned to Hawk

## Common Mistakes

1. **Skipping tests** — All code requires tests before merge
2. **Wrong branch** — Always branch from `dev`, PR to `dev`
3. **Missing co-author footer** — Commits require: `Co-Authored-By: Paperclip <noreply@paperclip.ing>`
4. **Merging directly to main** — Only Deployer merges dev → main after Hawk approval
5. **Unclear task descriptions** — Always include WHAT/WHERE/HOW/CRITERIA
6. **Committing to main** — Feature branches only, never push directly to main or dev

## Scripts

```bash
npm start              # Start backend server on :3100
npm run dev            # Dev mode with nodemon
npm test               # Run tests
npm run build          # Build for production
npm run lint           # ESLint check
```

## Channels & Escalation

- **Blocking issues**: Create task, mark blocked, comment with blocker
- **Code review**: Tag Hawk in PR
- **Deployment**: Assign to Deployer when ready
- **Strategic issues**: Escalate to Titan with context and blocker

## Reference

- See `GITFLOW.md` for detailed git workflow
- See each agent's `AGENTS.md` for agent-specific instructions
- See task descriptions for deliverable specs
