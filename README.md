# WLED Studio

Govee-grade WLED visual controller for Home Assistant — companion integration, Lovelace card, and sidebar panel. Attaches to the stock [WLED](https://www.home-assistant.io/integrations/wled/) integration (does not replace it).

**Requires:** Home Assistant ≥ 2025.7 and an existing WLED config entry.

## Install (HACS)

Repository: `https://github.com/cjam28/cauldron-wled-studio` (**public**).

1. **HACS → Integrations → ⋮ → Custom repositories**
2. Add `https://github.com/cjam28/cauldron-wled-studio` (category: **Integration**)
3. **HACS → Integrations → WLED Studio → Download**
4. **Settings → Devices & services → Add integration → WLED Studio** → select your WLED device  
   The integration **automatically** adds the Lovelace resource (storage-mode dashboards), with a cache-busting `?hacstag=` URL like other HACS cards.
5. Add card YAML, e.g.:

```yaml
type: custom:wled-studio-card
controller: Cloud
height: 56
```

## Development

**Do not rsync to the Pi.** Use the HACS redownload path like a real install.

```bash
./scripts/build.sh          # npm build → www/
git add -A && git commit -m "..." && git push
# On HA: HACS → WLED Studio → Redownload → Reload integration → bump resource ?v= → hard refresh
```

Full workflow: **[docs/HACS_DEVELOPMENT.md](docs/HACS_DEVELOPMENT.md)**

To remove an old manual copy from the server: `./scripts/purge-manual-install.sh`

## License

MIT — see [LICENSE](LICENSE).
