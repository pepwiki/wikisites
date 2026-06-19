interface SearchEvent {
  type: "search" | "click";
  query: string;
  resultCount?: number;
  resultIndex?: number;
  resultId?: string;
  timestamp: number;
}

interface SearchStats {
  totalSearches: number;
  topQueries: Array<{ query: string; count: number }>;
  averageResultsPerQuery: number;
}

const STORAGE_KEY = "wikisites:search-analytics";
const MAX_EVENTS = 1000;

function getEvents(): SearchEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SearchEvent[];
  } catch {
    return [];
  }
}

function saveEvents(events: SearchEvent[]): void {
  if (typeof window === "undefined") return;
  const trimmed = events.length > MAX_EVENTS ? events.slice(events.length - MAX_EVENTS) : events;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage full — drop oldest half
    const reduced = trimmed.slice(Math.floor(trimmed.length / 2));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reduced));
    } catch {
      // Give up silently
    }
  }
}

export function trackSearch(query: string, resultCount: number): void {
  const events = getEvents();
  events.push({
    type: "search",
    query: query.trim(),
    resultCount,
    timestamp: Date.now(),
  });
  saveEvents(events);
}

export function trackSearchClick(
  query: string,
  resultIndex: number,
  resultId: string,
): void {
  const events = getEvents();
  events.push({
    type: "click",
    query: query.trim(),
    resultIndex,
    resultId,
    timestamp: Date.now(),
  });
  saveEvents(events);
}

export function getSearchStats(): SearchStats {
  const events = getEvents();
  const searchEvents = events.filter((e): e is SearchEvent & { type: "search"; resultCount: number } =>
    e.type === "search" && typeof e.resultCount === "number",
  );

  const totalSearches = searchEvents.length;

  const queryCounts = new Map<string, number>();
  for (const e of searchEvents) {
    queryCounts.set(e.query, (queryCounts.get(e.query) ?? 0) + 1);
  }

  const topQueries = [...queryCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));

  const totalResults = searchEvents.reduce((sum, e) => sum + e.resultCount, 0);
  const averageResultsPerQuery = totalSearches > 0
    ? Math.round((totalResults / totalSearches) * 100) / 100
    : 0;

  return { totalSearches, topQueries, averageResultsPerQuery };
}
