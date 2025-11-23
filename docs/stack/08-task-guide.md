# 08 · Task Guide

Follow this triage whenever new work arrives.

1. **Clarify scope** – Is it architecture, content, runtime, or ops? Map to a stack doc.
2. **Open the relevant playbook** – Most requests align with `add-page`, `add-section`, `update-content`, etc.
3. **Check dependencies** – Do you need new config, assets, or env vars? Update `05-configuration` notes if so.
4. **Implement** – Adhere to the architecture/content rules while coding.
5. **Self-review** – Use `stack/checklists.md` before opening a PR or handing work back.
6. **Cache + action audit** – If the task touched Server Actions or caching knobs, call out the chosen `revalidatePath`/`revalidateTag`, `'use cache'`, `cacheComponents`, and `serverActions.allowedOrigins` decisions in your PR so reviewers can trace them (Next.js caching + Server Actions docs, v15.1.8, Next.js 16 release notes).

If a task doesn’t fit any playbook, add a new one using `templates/playbook-template.md` so the knowledge base grows consistently.
