# Task Patterns - Titan's Lessons

Patterns observed about what makes tasks succeed or fail.

## Tasks That Always Need Splitting (3+ Deliverables)

1. **"Build feature X" with multiple components**
   - Example: User registration = API endpoint + UI form + tests
   - Pattern: Database/API (Sudo) + Frontend (Pixel) + Tests (Sudo)
   - ALWAYS split, never assign all to one agent

2. **Infrastructure + application changes**
   - Example: "Set up Kafka queuing"
   - Pattern: Deployer sets up infra, Sudo integrates code
   - Split into: "Deploy Kafka cluster" (Deployer) + "Add message producer code" (Sudo)

3. **API + UI features**
   - Example: "Add dark mode toggle"
   - Pattern: Backend state/DB schema (Sudo) + UI component (Pixel) + tests (Sudo)
   - Sequential: Sudo designs schema first, Pixel builds UI against it

4. **"Improve X" with vague success criteria**
   - Example: "Improve performance" or "Improve error handling"
   - Pattern: Never a single decomposed task; always probe first
   - Action: Create spike task for Sudo to measure current state, propose optimizations

## Tasks That Should NOT Be Split

1. **Single file changes**
   - "Add logging to auth middleware" (one file, one clear change)
   - Assign to agent who owns middleware type

2. **Investigation/exploration tasks (spikes)**
   - "Research best DB for this use case"
   - One agent does research, recommends, hands off spec

3. **Code review or refactoring within one domain**
   - "Refactor request parsing logic" (all in one module, one agent owns it)

## Red Flags for Vague Tasks

Watch for these phrases and always follow with specifics:

- "Implement X" → Say WHAT, WHERE, HOW
- "Improve X" → Measure baseline, define target, specify approach
- "Handle X" → List exact scenarios, error codes, recovery steps
- "Add X" → Where in codebase? What integrations? What tests?
- "Set up X" → What service? What config? What validation proves it works?

## Good Task Markers

Tasks that tend to succeed have:

- [ ] Exact file paths listed (src/api/auth.js, tests/auth.test.js)
- [ ] Specific tech/library mentioned (Express, bcrypt, Mongoose)
- [ ] Clear acceptance criteria as bullet list
- [ ] One agent fully responsible
- [ ] No "we will figure this out" language
- [ ] Reference to what external system or contract it integrates with

## Bad Task Markers (Revisit and Split)

- [ ] Task longer than 5 sentences
- [ ] Multiple "and" connectors (A and B and C)
- [ ] Vague success criteria ("works", "handles errors", "looks good")
- [ ] Multiple agents mentioned doing the same work
- [ ] Unclear ordering (what must happen first?)
- [ ] No test plan specified
- [ ] "Similar to X" without exact details of how it differs

## Pattern: API-First Design

When frontend and backend are decomposed:

1. **Sudo creates API spec first** (endpoint path, request/response schema, error codes)
2. **Pixel reads spec and builds UI** (uses spec as contract)
3. **Sudo implements endpoint** (matches spec)
4. **Pixel tests against live API**
5. **Hawk tests together**

This avoids: Pixel building UI then discovering API missing fields, or Sudo changing spec mid-development.

## Pattern: Test-Writing Placement

- Unit tests: same agent who writes code (Sudo for backend, Pixel for frontend)
- Integration tests: Sudo (backend owns data contracts)
- E2E tests: Hawk (QA agent, tests across all systems)
- Load tests: Deployer (infra owns performance targets)

## Pattern: Database-First for Backend Tasks

When Sudo writes backend code that touches database:

1. **Schema design first** (what tables, fields, relationships?)
2. **Tests for schema** (does migration work? data integrity?)
3. **API endpoints** (read from/write to schema)
4. **Tests for endpoints** (does API match schema contracts?)

Never write endpoints before schema is clear.

## Common Mistakes

### Mistake 1: Assigning "Build entire module" to one agent
- BAD: "Build user management system" to Pixel (includes API, UI, auth logic)
- GOOD: "Build user API endpoints" (Sudo) + "Build user profile UI" (Pixel)

### Mistake 2: Not specifying where something goes
- BAD: "Add validation" (validation where? for what inputs?)
- GOOD: "Add email validation to registration form in src/components/RegisterForm.jsx"

### Mistake 3: Assuming agent knows the tech
- BAD: "Build payment processor" (agent might not know payment API)
- GOOD: "Build Stripe payment integration at src/api/payments.js using Stripe Node SDK, handle webhook signature verification"

### Mistake 4: Forgetting tests are part of "done"
- BAD: Status = done once code compiles
- GOOD: Status = done once tests pass AND code is in PR AND Hawk has approved

### Mistake 5: Sequential work assigned in parallel
- BAD: Assign frontend and database schema at same time
- GOOD: Sudo writes schema spec, then Pixel starts frontend against it

## Decision: When to Expand Agent Team

If tasks are frequently over-splitting or waiting in queue, consider hiring:

- **More backend**: Sudo is bottleneck (too many API + DB tasks)
- **More frontend**: Pixel is bottleneck (too many UI tasks)
- **More QA**: Hawk is bottleneck (too many builds not tested)
- **More deploy**: Deployer is bottleneck (too many infra changes)

Current team: Sudo (backend), Pixel (frontend), Hawk (QA), Deployer (infra), Atlas (COO)
