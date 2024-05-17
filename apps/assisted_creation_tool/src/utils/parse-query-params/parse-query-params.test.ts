import { parseQueryParams } from './parse-query-params';

describe('parseQueryParams', () => {
  it('should return an empty object when given an empty string', () => {
    const url = 'https://example.com';
    const result = parseQueryParams(url);
    expect(result).toEqual({});
  });

  it('should correctly parse query parameters with special characters in the value', () => {
    const url = 'https://example.com?param1=hello%20world&param2';
    const result = parseQueryParams(url);
    expect(result).toEqual({
      param1: 'hello world',
      param2: true,
    });
  });
});
