export const parseQueryParams = <
  T extends Record<string, string | number | boolean>
>(
  url: string
): Partial<T> => {
  const queryParams: Partial<T> = {};
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  params.forEach((value, key) => {
    let parsedValue: string | number | boolean;

    if (!isNaN(Number(value)) && value.length > 0) {
      parsedValue = Number(value);
    } else if (!value) {
      parsedValue = true;
    } else {
      parsedValue = value;
    }

    queryParams[key as keyof T] = parsedValue as T[keyof T];
  });

  return queryParams;
};
