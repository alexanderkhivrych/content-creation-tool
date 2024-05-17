import { buildUrlWithQueryParams } from './build-url-with-query-params';

describe('buildUrlWithQueryParams', () => {
  it('should return a valid URL with query params when given a base URL and valid params', () => {
    const baseUrl = 'https://example.com';
    const params = {
      param1: 'value1',
      param2: 2,
      param3: undefined,
    };

    const result = buildUrlWithQueryParams(baseUrl, params);

    expect(result).toBe('https://example.com?param1=value1&param2=2');
  });

  it('should return a valid URL without query params', () => {
    const baseUrl = 'https://example.com';
    const params = {
      param3: undefined,
    };

    const result = buildUrlWithQueryParams(baseUrl, params);

    expect(result).toBe('https://example.com');
  });

  it('should return a valid URL with boolean query param', () => {
    const baseUrl = 'https://example.com';
    const params = {
      param3: true,
    };

    const result = buildUrlWithQueryParams(baseUrl, params);

    expect(result).toBe('https://example.com?param3');
  });
});
