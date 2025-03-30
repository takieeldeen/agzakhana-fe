/**
 *
 * @param timeString get time in the form of "08:00 AM"
 * @param locale
 * @returns
 */
export const getLocalizedTimeString = (
  timeString: string,
  locale: "ar" | "en"
): string => {
  const dateString = timeString
    ? `3/15/2025, ${timeString?.split(" ")?.[0]}:00 ${
        timeString?.split(" ")?.[1]
      }`
    : undefined;

  const finalString = dateString
    ? new Date(dateString)?.toLocaleTimeString(
        locale === "ar" ? "ar-EG" : "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    : "--";
  return finalString;
};
