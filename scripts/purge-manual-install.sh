#!/usr/bin/env bash
# Remove manually copied wled_studio from Cauldron Pi (use HACS install only after this).
set -euo pipefail

REMOTE="${REMOTE:-cauldron-pi}"
REMOTE_DIR="${REMOTE_DIR:-/data/compose/1/homeassistant_config/custom_components/wled_studio}"

echo "This removes the manual integration copy at:"
echo "  ${REMOTE}:${REMOTE_DIR}"
echo ""
echo "Before continuing in HA:"
echo "  1. Settings → Devices & services → remove all WLED Studio entries"
echo "  2. (Optional) Dashboards → Resources → remove wled-studio-card.js resource"
echo ""
read -r -p "Continue purge on Pi? [y/N] " ans
if [[ "${ans,,}" != "y" ]]; then
  echo "Aborted."
  exit 0
fi

ssh "$REMOTE" "rm -rf '${REMOTE_DIR}' && echo 'Removed ${REMOTE_DIR}' || echo 'Path not found (already clean)'"

echo ""
echo "Done. Install via HACS:"
echo "  https://github.com/cjam28/cauldron-wled-studio"
echo "Then add integration + Lovelace resource (see docs/HACS_DEVELOPMENT.md)."
