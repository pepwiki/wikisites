/**
 * User profiles and reputation system for wikisites.
 * Tracks user activity, contributions, and reputation.
 *
 * Usage:
 *   import { getProfile, updateProfile, addReputation } from "../lib/user-profile";
 *   getProfile("user123");
 */

export type UserProfile = {
  id: string;
  displayName: string;
  bio: string;
  avatar: string;
  joinedAt: number;
  lastActive: number;
  reputation: number;
  level: number;
  badges: string[];
  stats: {
    annotations: number;
    discussions: number;
    comments: number;
    upvotesReceived: number;
    quizzesCompleted: number;
    flashcardsReviewed: number;
    streakDays: number;
  };
};

const STORAGE_KEY = "wikisites:user-profiles";
const CURRENT_USER_KEY = "wikisites:current-user";

/**
 * Get a user profile by ID.
 */
export function getProfile(userId: string): UserProfile | null {
  const profiles = getAllProfiles();
  return profiles.find((p) => p.id === userId) || null;
}

/**
 * Get the current user profile.
 */
export function getCurrentProfile(): UserProfile | null {
  if (typeof localStorage === "undefined") return null;
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;
  return getProfile(userId);
}

/**
 * Create a new user profile.
 */
export function createProfile(
  profile: Omit<
    UserProfile,
    "joinedAt" | "lastActive" | "reputation" | "level" | "badges" | "stats"
  >,
): UserProfile {
  const newProfile: UserProfile = {
    ...profile,
    joinedAt: Date.now(),
    lastActive: Date.now(),
    reputation: 0,
    level: 1,
    badges: ["newcomer"],
    stats: {
      annotations: 0,
      discussions: 0,
      comments: 0,
      upvotesReceived: 0,
      quizzesCompleted: 0,
      flashcardsReviewed: 0,
      streakDays: 0,
    },
  };

  const profiles = getAllProfiles();
  profiles.push(newProfile);
  saveProfiles(profiles);

  if (typeof localStorage !== "undefined") {
    localStorage.setItem(CURRENT_USER_KEY, newProfile.id);
  }

  return newProfile;
}

/**
 * Update a user profile.
 */
export function updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile | null {
  const profiles = getAllProfiles();
  const profile = profiles.find((p) => p.id === userId);
  if (!profile) return null;

  Object.assign(profile, updates, { lastActive: Date.now() });
  saveProfiles(profiles);
  return profile;
}

/**
 * Add reputation points to a user.
 */
export function addReputation(userId: string, points: number): boolean {
  const profile = getProfile(userId);
  if (!profile) return false;

  profile.reputation += points;
  profile.lastActive = Date.now();

  // Level up check
  const newLevel = Math.floor(Math.log2(profile.reputation / 100)) + 1;
  if (newLevel > profile.level) {
    profile.level = newLevel;
    // Award level badge
    if (!profile.badges.includes(`level-${newLevel}`)) {
      profile.badges.push(`level-${newLevel}`);
    }
  }

  updateProfile(userId, profile);
  return true;
}

/**
 * Award a badge to a user.
 */
export function awardBadge(userId: string, badge: string): boolean {
  const profile = getProfile(userId);
  if (!profile) return false;

  if (!profile.badges.includes(badge)) {
    profile.badges.push(badge);
    updateProfile(userId, profile);
  }

  return true;
}

/**
 * Increment a stat counter.
 */
export function incrementStat(
  userId: string,
  stat: keyof UserProfile["stats"],
  amount: number = 1,
): boolean {
  const profile = getProfile(userId);
  if (!profile) return false;

  profile.stats[stat] += amount;
  profile.lastActive = Date.now();
  updateProfile(userId, profile);

  // Award reputation for contributions
  const reputationMap: Record<string, number> = {
    annotations: 5,
    discussions: 10,
    comments: 2,
    upvotesReceived: 1,
    quizzesCompleted: 3,
    flashcardsReviewed: 1,
  };

  if (reputationMap[stat]) {
    addReputation(userId, reputationMap[stat] * amount);
  }

  return true;
}

/**
 * Get leaderboard.
 */
export function getLeaderboard(limit: number = 10): UserProfile[] {
  return getAllProfiles()
    .sort((a, b) => b.reputation - a.reputation)
    .slice(0, limit);
}

/**
 * Get all profiles.
 */
export function getAllProfiles(): UserProfile[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveProfiles(profiles: UserProfile[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}
