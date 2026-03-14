/**
 * Array utility functions
 */

/**
 * Sort array by key
 */
export function sortByKey<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Group array by key
 */
export function groupByKey<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Filter array by search term
 */
export function filterBySearchTerm<T>(
  array: T[],
  searchTerm: string,
  keys: (keyof T)[]
): T[] {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return array.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return String(value).toLowerCase().includes(lowerSearchTerm);
    })
  );
}

/**
 * Get unique values from array
 */
export function getUniqueValues<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
