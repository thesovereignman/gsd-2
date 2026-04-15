function shieldForSeverity(s) {
  if (s === "critical" || s === "fail") return "critical";
  if (s === "high" || s === "medium") return "warning";
  return "secure";
}
function shieldForScore(score) {
  if (score >= 90) return "secure";
  if (score >= 70) return "warning";
  return "critical";
}

export { shieldForScore as a, shieldForSeverity as s };
