# Product brief: Kamarkat

Sources: Kamarkat ADR-062, ADR-063, ADR-064, ADR-065 (addendum 1), ADR-066, ADR-068, ADR-071, and the
`kakt` CLI. Lines marked **Assumption** are not stated there and need confirming.

## Description

Kamarkat delivers a complete platform into a box in the customer's own cloud account and git
organization: a management cluster running the platform's services, and the managed
clusters it provisions. The platform is published as one versioned bundle; the customer's GitOps
repository is the only source of desired state, and the customer's management cluster applies it
(ADR-063, ADR-065). Kamarkat operates no customer infrastructure and holds no access to any
customer repository (ADR-065 addendum 1).

## Primary audience

Organizations that want a golden path and cannot staff a platform team (ADR-066: "The tenant has no
platform engineers").

**Assumption:** the reader is the engineer who sets up and runs the box: comfortable with git, a
terminal and a cloud console, not a Kubernetes specialist.

## Jobs to be done

1. Build a box in their own accounts: escrow, initialize the GitOps repository, run Day-0 (ADR-062,
   ADR-040; `kakt box init`, `kakt verify`).
2. Run their applications on it: declare an app, supply its secrets, publish and pin its chart
   (ADR-073, ADR-088).
3. Take new platform versions: review and merge the proposal their own Renovate opens; roll back by
   revert (ADR-064, ADR-065 addendum 1).
4. Know what they run: which components a version installs, where, and at what version (component
   inventory in each published bundle).
5. Recover: restore secrets and reach a cluster through the escrow when ordinary access fails.

## Motivation

The closest comparable system, kubefirst, provisions and hands over; Kamarkat ships the control
plane into the customer's box and publishes versions the customer accepts (ADR-071). The customer keeps custody: credentials, data and the decision to change anything
running stay with them (ADR-065). No catalog: every capability ships in the bundle and is enabled in
the customer's own values (ADR-071).

The docs describe the open-source, turnkey platform only (user instruction, 2026-11-01). Commercial
content (support, maintenance commitments, credits and billing) is deferred to `scratch/deferred/` and
will be added later, deliberately.
