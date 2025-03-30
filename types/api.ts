export type APIResposne<T> = {
  status: "success" | "fail";
  content: T;
  results: number;
};
