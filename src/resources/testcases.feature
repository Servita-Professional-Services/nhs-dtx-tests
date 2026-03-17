@alpha @copd @dtx
Feature: NHS HealthStore DTx Alpha – COPD Exemplar Validation

  Background:
    Given the system is deployed in the Alpha environment
    And synthetic COPD test patients exist
    And licences are configured for the Alpha ICB
    And NHS Login SSO is operational

  # 1️⃣ End-to-End Journey

  @p0 @e2e
  Scenario: Successful COPD patient journey from invite to completion
    Given an eligible COPD patient exists
    And a licence is available
    When a clinician triggers a DTx invitation
    And the patient logs in via NHS Login
    And the patient launches the DTx application
    And the patient engages with therapeutic content
    And the supplier reports completion
    Then the licence is allocated correctly
    And the launch succeeds with a valid token
    And engagement events are ingested
    And KPIs reflect activation and completion
    And all systems reconcile successfully

  # 2️⃣ Authentication & SSO

  @p0 @auth
  Scenario: Expired token at launch
    Given a valid DTx invite exists
    And the launch token has expired
    When the patient attempts to launch
    Then re-authentication is required
    And no duplicate licence is created

  @p0 @auth
  Scenario: Invalid token rejection
    Given a tampered launch token
    When the supplier API receives the request
    Then the request is rejected
    And an error is logged with a correlation ID

  @p1 @auth
  Scenario: Session timeout and relaunch
    Given a patient is logged in
    When the session expires
    And the patient relaunches the DTx
    Then re-authentication occurs
    And no additional invite is created

  # 🎫 3️⃣ Licence & Entitlement Controls

  @p0 @licence
  Scenario: Licence pool exhausted
    Given all licences are allocated
    When a new invite is triggered
    Then the invite is blocked
    And a clear error is displayed

  @p0 @licence
  Scenario: Duplicate invite prevention
    Given a patient has an active licence
    When a second invite is triggered
    Then duplicate allocation is prevented

  @p1 @licence
  Scenario: Licence revocation enforcement
    Given a patient has an active licence
    When the licence is revoked
    And the patient attempts to launch
    Then access is denied
    And the licence returns to the pool

  @p0 @entitlement
  Scenario: Cohort gating validation
    Given a non-COPD patient
    When an invite is attempted
    Then the invite is blocked by eligibility rules

  #4️⃣ Supplier Reporting & Data Integrity

  @p0 @reporting
  Scenario: Engagement event ingestion
    Given a patient engagement occurs
    When the supplier sends an engagement event
    Then the event is stored successfully
    And the KPI dashboard updates correctly

  @p0 @reporting
  Scenario: Duplicate engagement event handling
    Given an engagement event already exists
    When the same event is received again
    Then idempotency prevents double counting

  @p0 @contract
  Scenario: Missing mandatory field rejection
    Given a supplier payload missing required fields
    When ingestion validation runs
    Then the payload is rejected
    And a validation error is logged

  @p1 @reporting
  Scenario: Delayed batch reporting handling
    Given a completion occurred earlier
    When a delayed batch is received
    Then timestamps remain accurate
    And no duplicate KPI entries are created

  # 🚨 5️⃣ Safety & Escalation

  @p0 @safety
  Scenario: Red-flag deterioration event
    Given a patient is using the DTx
    When the supplier flags a deterioration event
    Then an escalation workflow is triggered
    And the correct clinical team is notified

  @p1 @safety
  Scenario: Non-engagement threshold breach
    Given a patient has not engaged beyond threshold
    When inactivity checks run
    Then a non-engagement alert is generated

  @p1 @safety
  Scenario: Escalation ownership validation
    Given an escalation event is triggered
    When routing logic executes
    Then the escalation is assigned to the correct owner

  # 🔄 6️⃣ Integration & API Resilience

  @p0 @integration
  Scenario: Supplier API timeout handling
    Given a launch request is sent
    When the supplier API times out
    Then retry logic is applied
    And no duplicate licence is created

  @p0 @contract
  Scenario: Schema change detection
    Given the supplier modifies the API schema
    When payload validation executes
    Then schema validation fails
    And an alert is raised

  @p1 @observability
  Scenario: Correlation ID traceability
    Given a full patient journey is executed
    When logs are queried by correlation ID
    Then the journey is traceable across all systems

  # ⚡ 7️⃣ Performance & Reliability (Alpha Scale)

  @p1 @performance
  Scenario: Invite wave simulation
    Given the system is within Alpha capacity limits
    When a bulk invite wave is triggered
    Then the system remains stable
    And no licence leakage occurs

  @p1 @performance
  Scenario: Concurrent launches
    Given multiple active invites
    When patients launch simultaneously
    Then no token collision occurs
    And performance remains stable

  @p0 @reliability
  Scenario: Supplier downtime handling
    Given the supplier system is unavailable
    When a patient attempts to launch
    Then the system fails gracefully
    And retry/backoff logic executes

  # 8️⃣ KPI & Reconciliation

  @p0 @kpi
  Scenario: Invite to activation mapping
    Given a patient receives an invite
    When the patient activates the DTx
    Then activation is recorded correctly
    And conversion KPI is updated

  @p0 @kpi
  Scenario: Completion KPI accuracy
    Given a patient completes the programme
    When supplier completion data is ingested
    Then the dashboard reflects accurate completion metrics

  @p0 @kpi @reconciliation
  Scenario: Cross-system reconciliation
    Given a completed patient journey
    When orchestration, supplier, and reporting data are compared
    Then all datasets match within agreed tolerance