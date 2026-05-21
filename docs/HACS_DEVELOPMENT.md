# HACS development workflow (Cauldron HA)

Use this instead of rsync/copying `custom_components/wled_studio` onto the Pi. Each iteration matches what end users do: **push to GitHub → update in HACS → reload HA**.

## One-time setup

### 1. GitHub

Repo: **https://github.com/cjam28/cauldron-wled-studio** (private is fine).

### 2. HACS custom repository (Cauldron HA)

Repository is **public**: `https://github.com/cjam28/cauldron-wled-studio`

1. **HACS → Integrations → ⋮ → Custom repositories**
2. Repository: `https://github.com/cjam28/cauldron-wled-studio`
3. Category: **Integration** → Add
4. **HACS → Integrations → WLED Studio → Download**

### 3. Home Assistant

1. **Settings → Devices & services → Add integration → WLED Studio**
2. Pick your existing WLED device (e.g. Cloud @ `192.168.20.71`).
3. **Settings → Dashboards → Resources → Add resource**
   - URL: `/wled_studio_static/wled-studio-card.js?v=0.2.8` (use the version from `manifest.json`)
   - Type: **JavaScript module**
4. Add the card: `type: custom:wled-studio-card`, `controller: Cloud`, etc.

### 4. Remove manual / copy-paste installs

If you previously rsync’d into `/config/custom_components/wled_studio`, remove that copy so only HACS owns the integration:

```bash
./scripts/purge-manual-install.sh
```

Then finish cleanup in HA (remove broken integration entry if shown, reinstall via HACS).

---

## Every code change

```bash
# 1. Build frontend → copies into custom_components/wled_studio/www/
./scripts/build.sh

# 2. Commit & push (bump manifest.json version when you want a clear cache bust)
git add -A
git commit -m "fix: describe change"
git push origin main
```

### On Cauldron HA after push

1. **HACS → Integrations → WLED Studio → ⋮ → Redownload** (or **Update** if HACS shows an update).
2. **Settings → Devices & services → WLED Studio → Reload**  
   — or restart Home Assistant if you changed `__init__.py` / static registration.
3. **Dashboards → Resources** — set the card URL to  
   `/wled_studio_static/wled-studio-card.js?v=<manifest version>`.
4. **Hard refresh** the dashboard editor (Cmd+Shift+R).

### Version / cache

- Bump `"version"` in `custom_components/wled_studio/manifest.json` when you want Settings and the Lovelace `?v=` to show a new build.
- Prebuilt `www/*.js` files are **committed** so HACS installs work without Node on the Pi.

---

## Do not use (deprecated)

- `scripts/deploy-cauldron.sh` (rsync to Pi) — removed; use HACS Redownload instead.

---

## Troubleshooting

| Symptom | Fix |
|--------|-----|
| `Custom element not found: wled-studio-card` | Resource URL wrong/missing; hard refresh; confirm only **one** load path (no duplicate manual copy + HACS). |
| Card works in view, editor fails | Hard refresh; bump `?v=` to match `manifest.json`. |
| `unknown_command` on WS API | Reload integration or restart HA after updating Python. |
| Stale JS after Redownload | Bump manifest version + update Lovelace resource `?v=` + hard refresh. |
