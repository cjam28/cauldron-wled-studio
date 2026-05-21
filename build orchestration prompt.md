Execute the WLED Studio plan end-to-end.

PLAN FILE (source of truth, read in full first):
/Users/christoalto/.cursor/plans/wled_visual_controller_hacs_8179d266.plan.md

SUPPORTING RESEARCH (read sections as referenced by each phase):
- CauldronOS/Stacks/WLED/WLED_16x_API_Reference.md
- CauldronOS/Stacks/WLED/v1_voice_and_effect_builder_brief.md
- CauldronOS/Stacks/WLED/wled-studio-mobile-research.md
- CauldronOS/Stacks/WLED/WLED_Studio_Hardening_Report.md

WORKING TREE:
CauldronOS/Stacks/cauldron-wled-studio/ (create in Phase 0; private GitHub repo cauldron-wled-studio)

YOUR ROLE:
You are the orchestrator. Follow the "Execution playbook" section of the plan exactly. For each phase:
1. Switch out of plan mode if needed.
2. Mark the phase todo in_progress via TodoWrite.
3. Read the phase brief + cited research sections.
4. Either work directly (main-chat pattern) or spawn a background subagent (parallel pattern), choosing the model per the playbook table.
5. After the phase is implemented, run lints + tests, commit with a conventional message, and mark the todo completed.
6. Tick the matching items in the "v1 hardening commitments (definition of done)" checklist as you go.
7. After Phases 1, 6, 9, and 11, spawn a readonly Opus hardening review subagent against the diff + the cited Hardening Report sections; work through any punchlist items before moving on.
8. Stop and ask the user for confirmation at these checkpoints: end of Phase 0, end of Phase 1, end of Phase 6, and before tagging v1.0.0.

MODEL POLICY:
- Default to composer-2.5 for your own work as orchestrator.
- Spawn subagents with model= per the playbook table. Sonnet-4.6-medium for tricky phases (1, 3, 5, 6, 9c, 10). Composer-2.5 for the rest. Opus-4.7-thinking-high only for readonly hardening reviews.
- If Sonnet is rate-limited, fall back to gpt-5.5-medium; do not silently downgrade to composer-2.5-fast for tricky phases.

CONSTRAINTS:
- Never modify the stock `wled` integration; only attach to it via the `wled_studio` companion.
- Browser never talks to WLED directly — always browser → HA WS → wled_studio → WLED.
- All DDP packets must pass the property-based fast-check fuzz tests before Phase 6 commits.
- Every Lit component must extend BasePoweredElement.
- Container queries only; no media queries except `prefers-color-scheme`.
- All WS messages carry `schema_version: 1`; all scenes/layouts/palettes carry `etag`.
- Commit per phase; never pile up uncommitted phases.
- Do not push to remote without user confirmation.
- Do not flip the GitHub repo public; do not submit to HACS default repo. Both are explicit post-v1.0.0 decision points.

START NOW WITH PHASE 0.