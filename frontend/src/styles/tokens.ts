import { css } from "lit";

/** WLED Studio design tokens — fallback-wrapped over Home Assistant theme variables. */
export const wledDesignTokens = css`
  :host {
    --wled-accent: var(--primary-color, #03a9f4);
    --wled-accent-soft: color-mix(in srgb, var(--wled-accent) 18%, transparent);
    --wled-surface: var(--card-background-color, #1e1e1e);
    --wled-surface-elevated: var(--secondary-background-color, #2a2a2a);
    --wled-text: var(--primary-text-color, #fff);
    --wled-text-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
    --wled-border: var(--divider-color, rgba(255, 255, 255, 0.12));
    --wled-radius: var(--ha-card-border-radius, 12px);
    --wled-radius-sm: 8px;
    --wled-radius-lg: 20px;
    --wled-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
    --wled-tap: 44px;
  }
`;
