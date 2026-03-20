# Lessons from AUT-42: Task Decomposition Implementation

Real lessons learned from this session. Update as Titan gains more experience.

## Session: AUT-42 (2026-03-20)

### Lesson 1: Vague Tasks Cause Agent Spinning

**What Happened:**
Initial tasks to agents used phrases like "Implement observability" and "Add logging" without specifying:
- Where in the codebase
- Which technology/library
- What metrics/logs to capture
- How to know when done

**Result:**
- Agents asked clarifying questions instead of starting work
- Time wasted on back-and-forth
- Code written had to be refactored when direction became clear
- Budget spent on ambiguity, not progress

**Lesson:**
ALWAYS write task descriptions with exact file paths and specific tech choices. Vague descriptions are expensive.

**How to Fix:**
For every task created, before hitting save:
- [ ] Are specific file paths in the description?
- [ ] Is specific tech/library named (Express, bcrypt, Stripe)?
- [ ] Can I copy/paste exact commands an agent would run?
- [ ] Would a new team member understand what's built by reading this alone?

### Lesson 2: Exact File Paths Matter More Than You Think

**What Happened:**
Task said "Add logging to auth system" without specifying:
- Which auth files? (middleware? routes? models?)
- What format? (JSON? structured? plain text?)
- Where do logs go? (stdout? file? external service?)

**Result:**
- Sudo implemented in one place, tests looked in another
- Code review had to reject because path didn't match existing logging pattern
- Rework cost more time than getting it right the first time

**Lesson:**
File paths in task descriptions prevent integration surprises.

**How to Fix:**
Template for task creation:
```
Build X at [exact/file/path]
Export as [function/class name]
Test at [test/file/path]
Integration: [what system loads this file]
```

Example GOOD:
"Build request logger at src/middleware/requestLogger.js
Export default function that takes (req, res, next)
Test at src/middleware/requestLogger.test.js
Integration: imported and registered in src/index.js"

Example BAD:
"Add request logging middleware"

### Lesson 3: Pillar Tasks Without Detail Kill Momentum

**What Happened:**
Assigned "Build API layer" to Sudo without breaking it down:
- No list of required endpoints
- No database schema specified
- No contract about request/response format
- No test acceptance criteria

**Result:**
- Sudo built API endpoints that didn't match what frontend needed
- Frontend waited because API wasn't available
- Three rounds of rework to align
- Critical task blocked for hours

**Lesson:**
Large tasks assigned to one agent MUST have detailed specification or be split immediately.

**How to Fix:**
Before assigning any task over 2-3 hours of work:
1. Decompose using decompose.md
2. Split into smaller subtasks with clear ownership
3. Specify handoff points and contracts (API schema, database schema, UI mockups)
4. If you can't decompose it clearly, it's not ready to assign

### Lesson 4: Handoff Points Need Explicit Contracts

**What Happened:**
"Frontend team builds user profile page" with no contract about:
- What data structure API returns
- What fields are required vs optional
- What happens on error
- Rate limits or pagination

**Result:**
- Frontend code written against imaginary API schema
- API implementation changed mid-development
- Integration test failed because assumptions were wrong

**Lesson:**
Handoffs between agents need explicit, written contracts (API schema, database schema, config format).

**How to Fix:**
Before assigning frontend work that depends on backend:

1. **Sudo writes API schema first:**
   ```
   GET /api/users/:id
   Response:
   {
     "id": "string",
     "email": "string (required)",
     "name": "string",
     "createdAt": "ISO8601"
   }
   Errors: 404 if user not found, 400 if ID invalid
   ```

2. **Pixel builds UI against schema**

3. **Sudo implements endpoint matching schema**

4. **Hawk tests contract is honored**

### Lesson 5: Sequential Dependencies Must Be Explicit

**What Happened:**
Assigned database schema work and API endpoint work at same time to Sudo, assuming he'd do schema first.

**Result:**
- Sudo started with endpoints
- Had to rewrite endpoints when schema design changed
- Time wasted on work in wrong order

**Lesson:**
If task A must complete before task B, make that explicit in the task system.

**How to Fix:**
- Document dependencies in task description
- OR split into subtasks with clear parentId/blocking relationships
- OR use status (don't mark B as todo until A is done)
- In comments: "@Sudo, start with schema design at src/models/User.js first. Let me know when done, then you move to endpoints."

### Lesson 6: Acceptance Criteria Prevent Review Surprises

**What Happened:**
Task just said "Build authentication" with no criteria for what "done" looks like.

**Result:**
- Sudo thought done when code compiled
- Hawk tested and found: no password hashing, no rate limiting, no error cases handled
- Task bounced back to in_progress
- Rework and re-review delay

**Lesson:**
Tasks MUST specify acceptance criteria as a bullet list. When agent sees this list, they know exactly what done means.

**How to Fix:**
Every task must include:
```
ACCEPTANCE CRITERIA:
- Unit tests pass (100% coverage for new code)
- Integration test against real DB succeeds
- Error cases handled: [list specific errors]
- Code committed to feature/AUT-X-name
- Code passes lint, no console.log
- Ready for Hawk to review
```

### Lesson 7: Hawk Review Should Be Specified Upfront

**What Happened:**
Different tasks had different review expectations:
- Some went to Hawk, some didn't
- Some needed test plan written, some didn't
- Hawk didn't know if review was mandatory or optional

**Result:**
- Code shipped without testing sometimes
- Hawk wasted time on code that wasn't supposed to be reviewed
- Quality varied unpredictably

**Lesson:**
Every task must specify who reviews and what status to set when ready.

**How to Fix:**
Task description includes handoff:
```
HANDOFF:
When done, mark status: in_review
Assign to: Hawk (54a619c6-7873-4cc6-a3ea-1e845396c8cd)
Hawk will: Run acceptance tests, verify no console.log, verify tests pass
```

### Lesson 8: Memory Files Prevent Context Loss

**What Happened:**
Between heartbeats, patterns and lessons were scattered in comments, not documented.

**Result:**
- New tasks repeated same mistakes
- Team discovered same problems twice
- No institutional knowledge

**Lesson:**
Document patterns, anti-patterns, and lessons in memory files so future tasks avoid same mistakes.

**Current Memory Files:**
- decompose.md - playbook for splitting tasks
- task-patterns.md - what makes tasks succeed or fail
- lessons.md - this file, real mistakes and fixes

## Future Review Points

- Add lesson when Sudo or Pixel complains a task was unclear
- Add lesson when task needs rework due to unclear acceptance criteria
- Add lesson when Hawk finds bugs that should have been caught earlier
- Add lesson when task completion takes much longer than estimated
- Add lesson when similar mistake appears in two different tasks

## Adjustments Made to AGENTS.md

Updated Titan's heartbeat to include:
"Step 5b: When assigning tasks with 3+ deliverables, ALWAYS split using decompose.md"

This prevents future pillar tasks from being assigned without decomposition.
