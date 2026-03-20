# Task Decomposition Playbook

Titan uses this playbook to analyze large tasks and split them into parallel subtasks assigned to the right agents.

## Agent Specialization

- **Pixel** (91af3253-92f3-4039-8601-03e5a1108a7e): React/UI/Frontend
- **Sudo** (3cadef7f-eaea-4fdd-b86a-e893adf55861): Node/API/Database/Tests/Backend
- **Deployer** (0e146ee3-accd-4719-8d7e-18cee1275796): Deploys/Infrastructure

## Decomposition Rules

### Rule 1: Parallelizable Work
If task has independent deliverables that can be worked on simultaneously, split them:

- Frontend (Pixel) and Backend (Sudo) can always be parallel
- Database schema and API endpoints can be parallel
- UI and API integration can be sequential (API first, then UI)

Example: "Build user registration"
- SPLIT: Create user API endpoint (Sudo) + registration form UI (Pixel)
- Parallel: both start immediately, Pixel waits for API docs

### Rule 2: Sequential Work
If deliverables have dependencies, keep them sequential OR create handoff point:

- Frontend depends on API contract: Sudo writes API spec first, then Pixel builds UI
- Tests depend on code: write code first, then tests (same agent)
- Deployment depends on code + tests: all non-deploy work first, then Deployer

### Rule 3: Agent Responsibility
NEVER split a single deliverable across agents unless unavoidable:

- Bad: "Build payment processing" → Pixel handles form, Sudo handles logic, Deployer handles keys
  - This creates multiple handoffs and context loss
- Good: "Build payment processing" → Sudo handles form + logic + tests (full backend), Pixel handles UI
  - Minimal context loss, clear responsibility

### Rule 4: Task Sizing
After decomposition, each subtask should be:

- **Small**: 1 deliverable, clear acceptance criteria
- **Estimable**: agent can judge scope without research
- **Owned**: one agent responsible, no "we'll figure it out together"

## Task Description Standard for Subtasks

Every subtask MUST include:

### WHAT
Exact deliverable, no abstract terms.
- GOOD: "Add POST /api/users endpoint handling registration form submission"
- BAD: "Implement user registration"

### WHERE
Exact file paths and directories.
- GOOD: "src/api/routes/auth.js, src/models/User.js, tests/auth.test.js"
- BAD: "Backend code"

### HOW
Specific tech, libraries, approach.
- GOOD: "Use Express, bcrypt for password hashing, Mongoose schema validation"
- BAD: "Use secure practices"

### ACCEPTANCE CRITERIA
Bullet list of done definition.
- Tests pass
- Endpoint returns 200 for valid input, 400 for missing fields
- Password hashed before storage
- Code committed to feature/AUT-X-name

### HANDOFF
Who to assign when done, their agent ID, what status to set.
- "mark in_review, assign to Hawk (54a619c6-7873-4cc6-a3ea-1e845396c8cd) for testing"

## Decomposition Decision Tree

1. **Does task have 3+ deliverables?** → SPLIT
2. **Do deliverables depend on each other?** → Keep sequential OR create handoff
3. **Can any parts be parallel?** → SPLIT those parts
4. **Does one agent own all code in a deliverable?** → Good, keep it
5. **Do multiple agents touch the same deliverable?** → Bad, recombine or use handoff points

## Anti-Patterns to Avoid

- **Vague role assignment**: "Frontend and backend work together on auth"
  - FIX: "Sudo builds API endpoint, Pixel builds UI forms, Sudo writes tests"

- **Over-splitting**: "Build API" → one subtask per HTTP verb
  - Related endpoints go to same agent; only split if truly independent

- **Under-splitting**: "Build entire app" assigned to one agent
  - Too large, unclear what done looks like

- **Missing specs**: Assigning frontend work before API contract is written
  - FIX: Have Sudo write API schema first, then handoff to Pixel with contract

- **Unclear dependencies**: "Pixel and Sudo both need to know the database schema"
  - FIX: Sudo creates schema + writes API docs with schema examples, Pixel references docs

## When NOT to Split

- Code is tightly coupled and changes together
- Task is small enough for one agent to own cleanly
- Splitting creates more handoff overhead than benefit
- Task requires deep investigation (spike/exploration) before decomposition

## Commit Practice

When decomposing a task:
1. Create parent task in AUT project
2. Create subtasks with parentId set to parent
3. Assign to specific agents per specialization
4. Set goalId on all subtasks
5. Link in Paperclip issue system for visibility
