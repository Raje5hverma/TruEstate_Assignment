export function parseQuery(q = {}) {
  const toArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((v) => String(v));
    return String(value)
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  };

  const numOrNull = (value) => {
    if (value === undefined || value === null || value === "") return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  };

  return {
    search: q.search ? String(q.search).toLowerCase() : "",
    regions: toArray(q.regions || q.region),
    genders: toArray(q.genders || q.gender),
    categories: toArray(q.categories || q.category),
    payments: toArray(q.payments || q.payment),
    tags: toArray(q.tags).map((t) => t.toLowerCase()),
    ageMin: numOrNull(q.ageMin),
    ageMax: numOrNull(q.ageMax),
    dateFrom: q.dateFrom || null,
    dateTo: q.dateTo || null,
    sortBy: q.sortBy || null,
    page: numOrNull(q.page) || 1,
    limit: numOrNull(q.limit) || 10,
  };
}
