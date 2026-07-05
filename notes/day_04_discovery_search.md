# Day 4 Discovery Search

Planned phase date: 2026-07-04. Executed on 2026-07-05.

## Goal

Find credible open-source tools beyond the starter list, promote relevant public candidates into `research/longlist.md`, and record exclusions for tools that are closed-source, source-available but not open-source, abandoned, too broad, too narrow, or outside the consumer/freelancer scope.

## What I Did

- Searched for open-source US tax calculators, 1040/form-preparation tools, tax-benefit rules engines, withholding estimators, personal-finance apps, plain-text-accounting interfaces, and import/export tooling.
- Checked primary sources where possible: GitHub repositories, official docs, IRS repositories/pages, PyPI package pages, and project websites.
- Promoted additional tax-specific candidates into `research/longlist.md`: UsTaxes, HabuTax, Filed Open Tax Engine, PSL Tax-Calculator, PolicyEngine US, IRS Tax Withholding Estimator, tenforty, and OpenFile.
- Promoted additional personal-finance or import-layer candidates: Actual Budget, KMyMoney, HomeBank, Money Manager Ex, Fava, Paisa, and ofxstatement.
- Created `research/exclusions.md` for tools that are not strong candidates under the current scope.

## Evidence Captured

- `research/longlist.md`
- `research/exclusions.md`
- Source links and citation IDs added to both files.
- Primary source families checked: GitHub repositories, official documentation, project websites, PyPI package pages, SourceForge pages, and IRS source/status pages.

## Decisions Made

- Promote OpenFile out of the Direct File footnote into the longlist, but keep it cautionary because its README disclaims accuracy and no releases were visible.
- Treat Tax-Calculator and PolicyEngine US as programmatic tax-model comparators rather than consumer return-preparation tools.
- Treat Actual Budget as a strong API/CLI personal-finance comparator because it has an official Node API, a stable CLI, documented import paths, and a visible community integration ecosystem.
- Treat Fava and Paisa as ecosystem prior art around plain-text accounting rather than standalone tax tools.
- Exclude or defer Akaunting, ERPNext, Maybe Finance, OpenTaxForms, Python-Taxes, TaxStuff, Kresus, ezBookkeeping, Skrooge, NBER TAXSIM, IRS Free File Fillable Forms, and closed commercial tax products for reasons documented in `research/exclusions.md`.

## Problems / Open Questions

- Some newer tools, especially Filed Open Tax Engine, look highly relevant but need Day 5 scrutiny for maturity, accuracy evidence, test coverage, release cadence, and social proof.
- UsTaxes and HabuTax appear directly tax-form relevant, but their current tax-year support and form coverage need normalization before shortlisting.
- Several desktop personal-finance tools have good import/export stories but no clear stable public API.
- Exact license details for KMyMoney and OpenFile need Day 5 verification before report claims.

## Tomorrow's Starting Point

Execute Day 5 by creating `research/project_health_snapshot.md`: normalize release dates, recent commits, licenses, contributor signals, documentation quality, annual tax-year support, and data-format evidence for plausible candidates.
