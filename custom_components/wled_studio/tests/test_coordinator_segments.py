"""Segment entity mapping for stock WLED multi-light entities."""

from __future__ import annotations

from types import SimpleNamespace

from wled_studio.coordinator import WledStudioCoordinator


def test_segment_id_from_unique_id_suffix() -> None:
    entity = SimpleNamespace(
        unique_id="704bca42ba7c_2",
        entity_id="light.cloud_back",
    )
    assert WledStudioCoordinator._segment_id_from_entity(entity) == 2


def test_segment_id_from_legacy_segment_suffix() -> None:
    entity = SimpleNamespace(
        unique_id="704bca42ba7c_1",
        entity_id="light.strip_segment_1",
    )
    assert WledStudioCoordinator._segment_id_from_entity(entity) == 1


def test_segment_id_unknown_returns_none() -> None:
    entity = SimpleNamespace(
        unique_id="no_number_here",
        entity_id="light.cloud_speed",
    )
    assert WledStudioCoordinator._segment_id_from_entity(entity) is None
