# Day 5 Metadata and Health Snapshot

Planned phase date: 2026-07-05. Executed on 2026-07-05.

## Goal

Gather comparable project-health evidence before choosing the shortlist.

## What I Did

- Created `research/project_health_snapshot.md` as the Phase 5 exit artifact.
- Checked GitHub repository pages, GitHub release pages, commit pages, PyPI package metadata, SourceForge project/download pages, IRS pages, and official documentation pages.
- Normalized recent activity, release/package cadence, license posture, community signals, documentation quality, tax-year support, and data/storage format for the plausible candidates from the Day 4 longlist.
- Separated core shortlist candidates from supporting import/UI/desktop comparators.

## Evidence Captured

- `research/project_health_snapshot.md`
- Source links and compact source IDs inside the snapshot.
- Command-driven metadata checks for GitHub and PyPI packages, plus browser-verified source pages for IRS, SourceForge, and project docs.

## Decisions Made

- Carry hledger, Firefly III, Actual Budget, Beancount, GnuCash, OpenTaxSolver, UsTaxes, tenforty, Tax-Calculator, and PolicyEngine US into the Day 6 programmatic-surface survey as the main evidence targets.
- Treat IRS Direct File, OpenFile, and IRS Tax Withholding Estimator as reference/cautionary architecture entries, not active filing-channel candidates.
- Treat ofxtools, ofxstatement, beangulp, smart_importer, beancount-import, and ledger-autosync as supporting integration substrate rather than standalone shortlist candidates.
- Flag HabuTax as scriptable but stale compared with the current tax-year candidates.
- Flag Filed Open Tax Engine as high-demo-potential but new and low-social-proof.

## Problems / Open Questions

- Several projects publish releases outside GitHub, so Day 6 should avoid relying on GitHub release metadata alone.
- GnuCash remains promising but needs local verification of `gnucash-cli`, install friction, and Python binding availability on Windows.
- Filed Open Tax Engine's accuracy and maturity need hands-on verification before it can be recommended.
- UsTaxes has current commits and 2025 tax-year support, but its GitHub release tags are stale.

## Tomorrow's Starting Point

Execute Day 6 by creating `research/programmatic_surface_survey.md` and comparing CLI, library, REST API, plugin, file format, schema, database, and structured-output surfaces across the strongest candidates.
