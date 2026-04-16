export function buildParams(paramsObj: Record<string, any>) {
  const searchParams = new URLSearchParams();

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, String(v)));
    } else {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}