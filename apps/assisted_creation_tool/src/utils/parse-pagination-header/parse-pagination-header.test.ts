import { parseLinkHeader } from './parse-pagination-header';

describe('parseLinkHeader', () => {
  it('should return only next page', () => {
    const header =
      '<https://picsum.photos/v2/list?page=2&limit=12>; rel="next"';
    const result = parseLinkHeader(header);
    expect(result).toEqual({
      next: 2,
    });
  });

  it('should return only prev page', () => {
    const header =
      '<https://picsum.photos/v2/list?page=2&limit=12>; rel="prev"';
    const result = parseLinkHeader(header);
    expect(result).toEqual({
      prev: 2,
    });
  });

  it('should return next and prev page', () => {
    const header =
      '<https://picsum.photos/v2/list?page=1&limit=12>; rel="prev", <https://picsum.photos/v2/list?page=2&limit=12>; rel="next"';
    const result = parseLinkHeader(header);
    expect(result).toEqual({
      next: 2,
      prev: 1,
    });
  });

  it('should return an empty object when passed a null header', () => {
    const header = null;
    const result = parseLinkHeader(header);
    expect(result).toEqual({});
  });

  it('should return an empty object when passed an empty string', () => {
    const header = '';
    const result = parseLinkHeader(header);
    expect(result).toEqual({});
  });
});
