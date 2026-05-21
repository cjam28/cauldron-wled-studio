import type { LayoutRecord } from "../api/layout.js";

export function kitchenIslandLayout(controllerId: string): LayoutRecord {
  return {
    id: "kitchen-island",
    controller_id: controllerId,
    name: "Kitchen island",
    pixel_count: 210,
    fixtures: [
      {
        id: "kitchen-island",
        name: "Kitchen island",
        kind: "polyline",
        closed: true,
        points: [
          [0, 0],
          [100, 0],
          [110, 10],
          [200, 10],
        ],
        anchors: [
          { led: 0, vertex_index: 0 },
          { led: 85, vertex_index: 1 },
          { led: 96, vertex_index: 2 },
          { led: 186, vertex_index: 3 },
        ],
      },
    ],
  };
}
