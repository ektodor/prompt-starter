export function formatThousands(x) {
  if (x === null || x === undefined) return "";
  const s = String(x);
  const negative = s.startsWith("-") ? "-" : "";
  const core = negative ? s.slice(1) : s;
  const [intPart, decPart] = core.split(".");
  const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return negative + intFormatted + (decPart !== undefined ? "." + decPart : "");
}
