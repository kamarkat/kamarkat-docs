# Proposed pricing model: Outcome-based agentic workflows

My recommendation is to make the outcome a customer buys—not the underlying AI tokens, model calls, or agent steps—the primary unit of pricing.

A user should be able to browse the outcomes a multi-agent system (a “Computer”) delivers, understand the price of each run before starting, subscribe to the Computer, and execute those workflows using credits. The platform can track the underlying resource consumption for internal cost accounting without exposing unpredictable infrastructure costs to the customer.

This is different from simply selling a monthly bundle of AI credits. Credits become the payment mechanism for clearly defined, priced outcomes.

## 1. The customer-facing model

[Build Your Own Local AI Agent Control Center](https://images.openai.com/static-rsc-4/4FoLvThIt5uPnpD-28zpaqPk6aMTcL6-74PKVs7WPguS-wiIN0UsiqcFKjqjglItXGyZ-8mLiGpsi9ssuozDCuPFZW1M74c86CXHpSCHwfkEgtxvYlz-l30Fd4NVwvEoIi4QgrDkbjqDnWQe3fe1ic8p1jezL14Uux6ZruVfrmw?purpose=inline)

### Computer: Market Research

A subscribable multi-agent system

Research products, compare competitors, and generate evidence-backed reports.

Available outcomes

Competitor brief

Compare up to 5 competitors and produce a structured report.

100 credits / run

Illustrative

Market research report

Research a market segment and deliver a sourced report with findings.

300 credits / run

Illustrative

Competitive landscape analysis

Produce a deeper analysis across competitors, positioning, and market trends.

600 credits / run

Illustrative

These credit prices and outcome definitions are examples to explain the model, not recommended final prices.

The key experience is that customers see a defined deliverable, its scope, and its price before running it. Each Computer publishes its catalogue of outcomes and the corresponding prices.

## 2. Separate the four concepts

I recommend keeping these concepts distinct so that subscription management, access control, usage accounting, and pricing do not become one tangled implementation.

Computer subscription

Grants permission to use a particular Computer and its eligible outcomes. A subscription may be individual or organization-managed.

Outcome catalogue

Lists the deliverables, scope, fixed credit price per run, applicable limits, and version of each published outcome.

Credit account

Holds monthly included credits and purchased add-on credits, with the ownership and consumption rules appropriate to an individual or organization.

Outcome execution

Authorizes a run, accounts for its fixed price, invokes the multi-agent workflow, and records its execution status and delivered result.

This model allows you to introduce new Computers and outcomes without inventing a new subscription or metering mechanism for every workflow.

## 3. Recommended run and billing flow

1\. Discover and subscribe

The user subscribes to a Computer and can browse its available outcomes and exact credit prices.

2\. Select an outcome

Show the expected deliverable, scope, inputs, price, and applicable limits before execution.

3\. Authorize the full run price

Check the selected personal or organization balance. Reserve the fixed credit price atomically, or reject the request before starting if funds are insufficient.

4\. Execute the workflow

The multi-agent system performs the work. Internal token, model, tool, and compute consumption is recorded for operational analytics and cost accounting.

5\. Record the outcome and usage

Record the run, charged credits, workflow status, and delivered artifact. Publish an idempotent usage event for billing and reconciliation.

### Why I recommend authorizing the full price upfront

You require predictable prices and do not want an operation to exceed the available credit balance. These goals fit naturally with a fixed-price-per-run model.

For example, if a research report costs 300 credits, the platform must confirm that 300 credits are available before execution. If the customer has only 250 credits, the run does not start, and the interface offers a top-up.

This avoids charging users unpredictably for every internal agent step. Variations in token consumption or tool usage become a platform cost-management concern, not a reason to increase the advertised price halfway through a run.

There is one important distinction: a fixed price for starting a run is not the same commercial promise as payment only for a successfully delivered outcome. Since you have asked to ignore platform-failure credit refunds, my starting assumption is that the price applies to an accepted run. The customer-facing terms should make that explicit.

## 4. How this could map to OSS Lago

Lago is a promising candidate for the billing side of this architecture. Its public repository documents subscriptions, metered usage, pricing, invoices and payment workflows. Its usage-event API supports a unique `transaction_id`, a billable metric code, a timestamp and event properties—useful for recording outcome executions and safely retrying event delivery. 【turn850170view0】【turn674322view1】

However, we must verify the OSS feature boundary before choosing Lago as the credit-balance authority.

The current Lago pricing page places prepaid credits and entitlements among the features in its “Lago Premium key features” section, while the public repository describes prepaid credits and entitlements more generally. We should not assume that every documented wallet, entitlement, or real-time balance feature is available in the exact self-hosted OSS edition you intend to use. 【turn850170view1】【turn850170view0】

The design should therefore require the Platform team to establish the following:

| Concern                    | Recommended approach                                                                                                                                                                                           |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outcome pricing            | Maintain a versioned catalogue of Computers, outcomes, scope, and fixed credit prices.                                                                                                                         |
| Real-time spending control | Use a synchronous, concurrency-safe credit authorization and reservation mechanism. Verify whether the selected OSS Lago edition can provide the guarantees required.                                          |
| Billing records            | Record each accepted outcome run as a uniquely identifiable usage transaction and reconcile it against execution records.                                                                                      |
| Subscription and invoicing | Use Lago's verified native capabilities wherever they meet the requirement.                                                                                                                                    |
| Credit balances            | If Lago OSS cannot support the required atomic reservations and balance rules, introduce a Platform-owned credit ledger rather than pretending asynchronous billing events alone enforce the execution budget. |
| Product integration        | Expose a shared Platform interface for checking balances, starting priced outcomes, and retrieving usage history. Product teams should not implement their own billing infrastructure.                         |

The last point is especially important: Lago's event-ingestion API records usage for billing, but an event submission by itself is not a complete authorization mechanism for starting an expensive, potentially long-running workflow. The architecture must explicitly prove how concurrent runs cannot spend the same credits twice. 【turn674322view1】【turn968266search0】

## 5. Pricing rules I recommend carrying forward

Your previous clarifications remain the baseline.

Monthly-only subscriptions initially

Calendar-month credit resets; no annual subscription option in the initial model.

Included and add-on credits

Consume monthly included credits first, followed by purchased credits. Unused included credits expire at the monthly reset; add-on credits carry over while the account has an active paid subscription.

Individual and organization funding

Support individual balances and shared team pools. An organization can add a user who already has a personal subscription; joining should not silently cancel or merge their personal subscription or credit balance.

Monthly subscription changes

Upgrades take effect immediately with standard proration. Downgrades and cancellations take effect at the beginning of the following month, as previously specified.

Billing and currency

USD; the complete billing lifecycle remains in scope. Automated platform-failure credit refunds are excluded from the baseline.

## 6. Remaining decisions before the Platform architecture request

We now have enough information to define the direction, but a few business decisions will materially influence the design.

First, what does subscribing to a Computer mean commercially? My recommendation is that a Computer subscription grants access to that Computer and its published outcomes, while a separate monthly account or organization plan provides included credits. Each outcome run then consumes credits at its published price. A separate recurring fee for a Computer can be introduced where deliberately required, rather than charging an additional subscription by default.

Second, what is the actual commercial price catalogue? The screenshots are references, not authoritative pricing. We still need to define monthly plan prices, included credit allowances, the USD-to-credit top-up pricing, and the credit price of each outcome. These should be explicit configuration rather than hardcoded assumptions in Product implementations.

Third, how should the payer be selected when a user belongs to an organization but also has a personal subscription? I recommend keeping those balances independent and requiring each run to have a clear funding owner—personal or organization—so that the wrong account is never charged inadvertently.

Fourth, which exact Lago OSS release and features are available in your platform? This must be established through the codebase and version-specific evidence before selecting the final credit-ledger design.

My recommendation is to adopt the fixed-price-per-outcome-run model, make the full price visible before execution, authorize that price before starting, and separate customer-facing outcome billing from internal resource-cost metering. That establishes a predictable, outcome-driven agentic workflow model while leaving the Platform team responsible for the infrastructure and shared billing abstractions.