// structuring the JSON Data to be sent

export const dataFormatter = (data: any) => {
  const status = "success";
  if (data instanceof Array) return { status, count: data.length, data };
  else if (typeof data === "string" || typeof data === "number")
    return { status, message: data };
  else return { status, data };
};
