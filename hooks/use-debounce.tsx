import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, timeout: number = 500): T {
  const [val, setVal] = useState<T>(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setVal(value);
    }, timeout);
    return () => clearTimeout(timerId);
  }, [timeout, value]);
  return val;
}
