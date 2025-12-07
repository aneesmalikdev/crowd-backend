export const cleanQuery = (query) => {
  const cleaned = {};
  Object.keys(query).forEach((key) => {
    if (query[key] !== undefined && query[key] !== '') {
      cleaned[key] = query[key];
    }
  });
  return cleaned;
};
