/** Bold digit width ≈ em × fontSize (system-ui); 3 digits need a wider factor. */
function anchorDigitWidthEm(digits: number): number {
  if (digits <= 1) return 0.58;
  if (digits === 2) return 0.62;
  return 0.72;
}

/** Font size (model units) so LED index fits inside anchor circle radius r. */
export function anchorLedFontSize(led: number, r: number): number {
  const digits = String(led).length;
  const innerDiameter = r * 1.92;
  const maxByHeight = r * 0.98;
  const maxByWidth = innerDiameter / (digits * anchorDigitWidthEm(digits));
  return Math.max(4, Math.min(maxByHeight, maxByWidth));
}
