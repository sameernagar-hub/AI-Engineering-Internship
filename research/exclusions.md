# Discovery Exclusions

Day 4 artifact for Phase 4: Discovery Search.

Planned phase date: 2026-07-04. Executed on 2026-07-05. An exclusion here does not mean a tool is bad; it means the tool is not a strong fit for the main consumer/freelancer-oriented, open-source tax-tooling shortlist as currently scoped. Some entries remain useful as background or prior art.

## Exclusion Matrix

| Tool / source | Exclusion type | Why it is excluded or deferred | Revisit condition |
|---|---|---|---|
| Akaunting | License / scope | Repository README says Akaunting is released under the BSL license. It is also small-business/freelancer accounting software rather than consumer tax preparation. | Revisit only if the mentor wants business accounting systems or non-OSI source-available tools in scope. |
| ERPNext | Scope | Full enterprise resource planning system with accounting, inventory, order management, manufacturing, assets, projects, and HR. Too broad for the consumer/freelancer tax-tooling comparison. | Revisit only as an API architecture comparator if Week 1 lacks any API-native accounting examples. |
| OpenTaxForms | Health / active-candidate fit | Relevant IRS-form extraction prior art, but the README warns the project needs a redesign and has no e-file capability. | Cite as form/PDF/API prior art; do not treat as a hands-on candidate unless the project shifts to form-schema extraction. |
| Python-Taxes | Narrow helper | Python library for Social Security, Medicare, and Federal Income Tax withholding calculations; useful, but narrower than return prep, bookkeeping, or tax-line mapping. | Revisit if W-4/payroll-withholding math becomes part of the prototype. |
| TaxStuff | Maturity / caution | Basic federal tax-return calculator that explicitly says it is a work in progress and not a substitute for filing software. | Revisit only if looking for historical hobby-project examples of 1040 calculation logic. |
| Maybe Finance | Project health | Repository notice says it is no longer actively maintained. | Revisit only if project maintenance resumes or a maintained fork becomes clear. |
| Kresus | Geography / scope | Libre self-hosted personal finance manager focused on server-side bank retrieval and budgeting; useful, but no US tax relevance or clear programmatic tax surface was found in the Day 4 pass. | Revisit if non-US bank-aggregation/API patterns become a mentor-requested comparator. |
| ezBookkeeping | Relevance / surface unclear | Self-hosted personal finance app, but no clear tax-line mapping, US tax workflow, or documented integration surface surfaced during Day 4. | Revisit if Day 5 needs more self-hosted personal-finance comparators. |
| Skrooge | Duplication / surface unclear | KDE personal-finance app, but KMyMoney has clearer import/export documentation and a closer Quicken-like comparator role for this study. | Revisit if KMyMoney proves unusable locally. |
| NBER TAXSIM | Not a local open-source candidate | Important external benchmark/service for tax calculations, but not a public, locally inspectable open-source tool for this internship's prototype path. | Use as background or validation context only. |
| IRS Free File Fillable Forms | Closed/hosted service | Official free filing pathway, but not an open-source local tool or API/library candidate. | Use only as context for the broader filing ecosystem. |
| Commercial consumer tax products | Closed source | TurboTax, H&R Block, TaxAct, and similar products are important market context but do not satisfy the open-source/publicly inspectable criterion. | Mention only as closed-source contrast in the final landscape section. |

## Notes

- Tools that are merely lower priority but still credible, such as HomeBank, Money Manager Ex, Fava, Paisa, and ofxstatement, were added to `research/longlist.md` instead of excluded.
- OpenFile was promoted to the longlist with a strong accuracy/status caveat because it is a public Direct File fork and was already visible in the Day 3 source index.
- Exclusions should be rechecked only if they affect the Day 7 shortlist decision.

## Source Index

- [REPO-akaunting-001] Akaunting repository, https://github.com/akaunting/akaunting, accessed 2026-07-05.
  - Used for: BSL license statement, small-business/freelancer accounting scope, REST/API and app-store posture.
- [REPO-erpnext-001] ERPNext repository, https://github.com/frappe/erpnext, accessed 2026-07-05.
  - Used for: enterprise ERP scope, accounting/API capability, and GPL-3.0 repository posture.
- [REPO-opentaxforms-001] OpenTaxForms repository, https://github.com/jsaponara/opentaxforms, accessed 2026-07-05.
  - Used for: IRS PDF/form extraction prior art, API notes, no-e-file warning, and redesign caveat.
- [REL-python-taxes-001] Python-Taxes PyPI page, https://pypi.org/project/python-taxes/, accessed 2026-07-05.
  - Used for: package scope, supported tax years, withholding focus, and MIT license.
- [REPO-taxstuff-001] TaxStuff repository, https://github.com/AustinWise/TaxStuff, accessed 2026-07-05.
  - Used for: basic federal tax-return calculator identity and work-in-progress disclaimer.
- [REPO-maybe-001] Maybe Finance repository, https://github.com/maybe-finance/maybe, accessed 2026-07-05.
  - Used for: project identity and no-longer-actively-maintained notice.
- [DOC-kresus-001] Kresus website, https://kresus.org/en/, accessed 2026-07-05.
  - Used for: libre self-hosted personal-finance/bank-aggregation scope.
- [REPO-ezbookkeeping-001] ezBookkeeping repository, https://github.com/mayswind/ezbookkeeping, accessed 2026-07-05.
  - Used for: self-hosted personal-finance scope and feature positioning.
- [DOC-skrooge-001] Skrooge website, https://skrooge.org/, accessed 2026-07-05.
  - Used for: KDE personal-finance scope and supported-platform signal.
- [DOC-taxsim-001] NBER TAXSIM, https://taxsim.nber.org/, accessed 2026-07-05.
  - Used for: external tax-calculation benchmark/service identity.
- [DOC-free-file-fillable-001] IRS Free File Fillable Forms page, https://www.irs.gov/e-file-providers/free-file-fillable-forms, accessed 2026-07-05.
  - Used for: official hosted filing-context exclusion.
