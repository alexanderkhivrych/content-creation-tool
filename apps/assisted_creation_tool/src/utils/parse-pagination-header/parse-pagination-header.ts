type Links = {
  [key: string]: number;
};

export const parseLinkHeader = (header: string | null): Links => {
  const links: Links = {};

  if (!header) {
    return links;
  }

  const parts = header.split(',');

  parts.forEach((part) => {
    const section = part.split(';');
    if (section.length !== 2) {
      return;
    }

    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();
    const pageMatch = url.match(/page=(\d+)/);

    if (pageMatch) {
      const pageNumber = parseInt(pageMatch[1], 10);

      links[name] = pageNumber;
    }
  });

  return links;
};
