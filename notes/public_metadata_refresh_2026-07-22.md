# Public Metadata Refresh - 2026-07-22

## Purpose

Day 30 left one publication caveat: refresh public release, license, and activity claims if the final report kept current/latest language. This note records the Day 31 refresh for the five hands-on evaluated tools.

## Sources Checked

| Tool | Source | Refreshed observation |
|---|---|---|
| hledger | https://hledger.org/install.html | The install page listed hledger `1.52.1` as the current stable release and `1.99.3` as the 2.0 preview 3 release. This matches the prototype's local verified baseline. |
| Actual Budget | https://actualbudget.org/docs/releases/ | The release notes listed `26.7.0`, released 2026-07-01, and noted the Actual CLI was released as stable. |
| Firefly III | https://github.com/firefly-iii/firefly-iii/releases | The stable release list showed `v6.6.6`, released 2026-07-01. The page also showed a separate development prerelease created 2026-07-21. |
| tenforty | https://pypi.org/project/tenforty/ and https://github.com/mmacpherson/tenforty | PyPI listed `tenforty 2025.10`, released 2026-05-03. The GitHub README continued to describe tenforty as an open-source educational/informational tax-computation package built on Open Tax Solver. |
| Filed Open Tax Engine | https://github.com/filedcom/opentax and https://github.com/filedcom/opentax/releases | The project still described a federal 1040 TY2025 tax engine for agents/developers. The release page stated dual licensing under AGPL v3 and the Filed Commercial License. |

## Effect On Recommendation

The refresh did not change the final recommendation. hledger remains the best prototype-backed transparent bookkeeping fact layer; Actual Budget remains the best local app/API backup; Firefly III remains the strongest REST comparator; tenforty remains the clearest downstream tax-liability component; and Filed Open Tax Engine remains high-upside but cautionary for form-level experimentation.

## Caveat

This refresh covers only the five hands-on evaluated tools. Longlist-only candidates remain point-in-time observations from the original research phase unless they are refreshed separately.
