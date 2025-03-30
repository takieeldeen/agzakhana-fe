export const getDate = function <T extends "hours" | "minutes" | "ampm">(
  entityType: T,
  value: T extends "hours" | "minutes" ? number : "AM" | "PM",
  date: Date
): Date {
  // Handle Minute Changing
  const tempDate = new Date(date);
  if (entityType === "minutes")
    return new Date(tempDate.setMinutes(value as number));
  // Handle Minute Changing
  if (entityType === "hours") {
    const currentHours = date.getHours();
    if (currentHours > 12)
      return new Date(tempDate.setHours((value as number) + 12));
    if (currentHours < 12) return new Date(tempDate.setHours(value as number));
  }
  if (entityType === "ampm") {
    const currentHours = date.getHours();
    if (currentHours > 12 && value === "AM")
      return new Date(tempDate.setHours(currentHours - 12));
    if (currentHours < 12 && value === "PM")
      return new Date(tempDate.setHours(currentHours + 12));
  }
  return date;
};
