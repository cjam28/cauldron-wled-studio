#!/usr/bin/env bash
# Build frontend bundles into dist/ and custom_components/wled_studio/www/ (for HACS/git).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VERSION="$(python3 -c "import json; print(json.load(open('$ROOT/custom_components/wled_studio/manifest.json'))['version'])")"

echo "==> Building WLED Studio frontend (manifest v${VERSION})"
(cd "$ROOT/frontend" && npm run build)

echo "==> Built artifacts:"
ls -la "$ROOT/custom_components/wled_studio/www/"*.js 2>/dev/null || true
echo ""
echo "Next: git commit, git push, then HACS → Redownload on Cauldron HA."
