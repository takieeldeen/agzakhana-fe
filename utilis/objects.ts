export const clearEmptyValues = (passedObject: { [prop: string]: any }) => {
  if (!passedObject) return {};
  const tempObject = { ...passedObject };
  Object?.keys(tempObject)?.forEach((key: keyof typeof tempObject) => {
    if (
      tempObject[key] === "" ||
      tempObject[key] === null ||
      tempObject[key] === undefined
    )
      delete tempObject[key];
  });
  return tempObject;
};
