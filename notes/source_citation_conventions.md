# Source Citation Conventions

## Principles

- Prefer primary sources: official repositories, official documentation, release pages, standards documents, and command output from the local environment.
- Record the access date for web sources because project health, releases, docs, and maintainers can change.
- Keep copied text short. Paraphrase findings and link to the source.
- Tie every non-obvious factual claim in the report to a source link or an evidence file.
- Use synthetic data only in examples, fixtures, commands, screenshots, and prototype outputs.

## Citation ID Format

Use compact citation IDs in notes and tool records when a claim needs repeated references.

```text
[DOC-tool-slug-001]
[REPO-tool-slug-001]
[REL-tool-slug-001]
[CMD-tool-slug-001]
[META-tool-slug-001]
```

Suggested categories:

| Prefix | Use for |
|---|---|
| `DOC` | Official documentation pages, manuals, API docs, schemas, or tutorials |
| `REPO` | Source repository home pages, files, tags, branches, or issue discussions |
| `REL` | Release pages, changelogs, package versions, or downloads |
| `CMD` | Local command output, install logs, version checks, test runs, and failure transcripts |
| `META` | Project-health snapshots such as commit recency, license, contributors, stars, forks, or issue counts |
| `NOTE` | Local analysis notes that synthesize multiple sources |

## Web Source Citation

Use this shape in research notes and tool records:

```md
- [DOC-beancount-001] Beancount documentation, "Title or page name", URL, accessed YYYY-MM-DD.
  - Used for: plain-language summary of the claim this source supports.
```

For repository metadata:

```md
- [META-ledger-001] Ledger repository snapshot, URL, accessed YYYY-MM-DD.
  - Observed: license, latest release, recent commit activity, documentation location.
```

## Command Output Citation

Save command output in `evidence/commands/` when it supports setup, version, behavior, or error claims.

Recommended file name:

```text
evidence/commands/YYYY-MM-DD_tool-slug_command-purpose.txt
```

Reference it like this:

```md
- [CMD-tool-slug-001] `command --version`, local output saved at `evidence/commands/YYYY-MM-DD_tool-slug_version.txt`.
  - Used for: installed version and environment verification.
```

When output is short, a Markdown file is fine. When output is long or noisy, save raw output as `.txt` and summarize the important lines in notes.

## Documentation Notes

For docs pages, capture:

- Page title.
- URL.
- Access date.
- Tool version or docs version, if visible.
- The exact feature or limitation being supported.
- Whether the claim is explicit in the docs or inferred from examples.

## Repository Metadata Notes

For repo/project metadata, capture:

- Repository URL.
- License file or package metadata.
- Latest visible release or tag.
- Most recent visible commit date.
- Contributor or maintainer signal.
- Issue and pull-request activity signal, if relevant.
- Documentation location.
- Access date.

Do not overstate metadata. If a value is not visible or was not checked, write `not checked` or `unclear` instead of guessing.
