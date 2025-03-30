export function formatDistances(
  meterDistance: number | undefined,
  locale?: "ar" | "en"
): string {
  if (!meterDistance) return `0 m`;
  const kilometers = Math.floor(meterDistance / 1000);
  const meters = meterDistance % 1000;
  const distanceString = kilometers
    ? `${kilometers} ${locale === "ar" ? "كم" : "km"}`
    : `${meters} ${locale === "ar" ? "م" : "m"}`;
  return distanceString;
}
