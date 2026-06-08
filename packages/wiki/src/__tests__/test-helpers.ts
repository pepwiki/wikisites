/**
 * Test helpers extracted from wiki components for pure-function testing.
 * These replicate the non-exported functions from DailyChallenge.tsx etc.
 */

export function hashDate(date: string): number {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    const char = date.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [result[i]!, result[j]!] = [result[j]!, result[i]!];
  }
  return result;
}
