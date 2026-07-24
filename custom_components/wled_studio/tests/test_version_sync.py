"""VERSION-SYNC: manifest version, build-stamp, and hacstag invariants."""

import json
import re
from pathlib import Path

from wled_studio.const import INTEGRATION_VERSION
from wled_studio.lovelace_resources import card_resource_url, resource_hacstag

_INTEGRATION_ROOT = Path(__file__).resolve().parent.parent
_MANIFEST = _INTEGRATION_ROOT / "manifest.json"
_BUILD_STAMP = _INTEGRATION_ROOT.parent.parent / "frontend" / "src" / "utils" / "build-stamp.ts"


def _manifest_version() -> str:
    return str(json.loads(_MANIFEST.read_text(encoding="utf-8"))["version"])


def _build_stamp_version() -> str:
    text = _BUILD_STAMP.read_text(encoding="utf-8")
    match = re.search(r'WLED_STUDIO_BUILD\s*=\s*"([^"]+)"', text)
    assert match is not None, "WLED_STUDIO_BUILD constant not found in build-stamp.ts"
    return match.group(1)


def _version_tuple(version: str) -> tuple[int, ...]:
    return tuple(int(part) for part in version.split("."))


def test_manifest_matches_integration_version() -> None:
    assert INTEGRATION_VERSION == _manifest_version()


def test_build_stamp_matches_manifest() -> None:
    """The documented invariant: build-stamp.ts mirrors manifest.json version."""
    assert _build_stamp_version() == _manifest_version()


def test_version_at_least_phase0_baseline() -> None:
    assert _version_tuple(_manifest_version()) >= (0, 11, 5)


def test_hacstag_busts_cache_for_baseline() -> None:
    """hacstag is digits-only of the version; 0.11.5 -> 0115 in the resource URL."""
    tag = resource_hacstag(_manifest_version())
    assert tag == re.sub(r"\D+", "", _manifest_version())
    assert tag.isdigit()
    assert card_resource_url(_manifest_version()).endswith(f"?hacstag={tag}")
