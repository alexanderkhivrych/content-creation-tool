export const buildUrlWithQueryParams = (
  baseUrl: string,
  params: { [key: string]: string | number | undefined | boolean }
): string => {
  const queryParams = Object.entries(params)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return `${encodeURIComponent(key)}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`;
    })
    .join('&');

  return `${baseUrl}${queryParams ? '?' + queryParams : ''}`;
};
