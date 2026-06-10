/**
 * Community discussions system for wikisites.
 * Allows users to create and participate in discussions.
 *
 * Usage:
 *   import { createDiscussion, getDiscussions, addComment } from "../lib/discussions";
 *   createDiscussion({ title: "Question about oxytocin", body: "...", userId: "user123" });
 */

export type Discussion = {
  id: string;
  title: string;
  body: string;
  userId: string;
  userName: string;
  timestamp: number;
  tags: string[];
  upvotes: number;
  views: number;
  comments: Comment[];
  resolved: boolean;
};

export type Comment = {
  id: string;
  body: string;
  userId: string;
  userName: string;
  timestamp: number;
  upvotes: number;
  isAnswer: boolean;
};

const STORAGE_KEY = "wikisites:discussions";

/**
 * Create a new discussion.
 */
export function createDiscussion(
  discussion: Omit<Discussion, "id" | "timestamp" | "upvotes" | "views" | "comments" | "resolved">,
): Discussion {
  const newDiscussion: Discussion = {
    ...discussion,
    id: generateId(),
    timestamp: Date.now(),
    upvotes: 0,
    views: 0,
    comments: [],
    resolved: false,
  };

  const discussions = getAllDiscussions();
  discussions.push(newDiscussion);
  saveDiscussions(discussions);

  return newDiscussion;
}

/**
 * Get all discussions.
 */
export function getAllDiscussions(): Discussion[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Get a discussion by ID.
 */
export function getDiscussion(discussionId: string): Discussion | null {
  return getAllDiscussions().find((d) => d.id === discussionId) || null;
}

/**
 * Get discussions by tag.
 */
export function getDiscussionsByTag(tag: string): Discussion[] {
  return getAllDiscussions().filter((d) => d.tags.includes(tag));
}

/**
 * Get discussions sorted by activity.
 */
export function getRecentDiscussions(limit: number = 20): Discussion[] {
  return getAllDiscussions()
    .sort((a, b) => {
      const aLatest =
        a.comments.length > 0 ? a.comments[a.comments.length - 1].timestamp : a.timestamp;
      const bLatest =
        b.comments.length > 0 ? b.comments[b.comments.length - 1].timestamp : b.timestamp;
      return bLatest - aLatest;
    })
    .slice(0, limit);
}

/**
 * Add a comment to a discussion.
 */
export function addComment(
  discussionId: string,
  comment: Omit<Comment, "id" | "timestamp" | "upvotes" | "isAnswer">,
): Comment | null {
  const discussions = getAllDiscussions();
  const discussion = discussions.find((d) => d.id === discussionId);
  if (!discussion) return null;

  const newComment: Comment = {
    ...comment,
    id: generateId(),
    timestamp: Date.now(),
    upvotes: 0,
    isAnswer: false,
  };

  discussion.comments.push(newComment);
  saveDiscussions(discussions);
  return newComment;
}

/**
 * Upvote a discussion.
 */
export function upvoteDiscussion(discussionId: string): boolean {
  const discussions = getAllDiscussions();
  const discussion = discussions.find((d) => d.id === discussionId);
  if (!discussion) return false;

  discussion.upvotes++;
  saveDiscussions(discussions);
  return true;
}

/**
 * Upvote a comment.
 */
export function upvoteComment(discussionId: string, commentId: string): boolean {
  const discussions = getAllDiscussions();
  const discussion = discussions.find((d) => d.id === discussionId);
  if (!discussion) return false;

  const comment = discussion.comments.find((c) => c.id === commentId);
  if (!comment) return false;

  comment.upvotes++;
  saveDiscussions(discussions);
  return true;
}

/**
 * Mark a comment as the answer.
 */
export function markAsAnswer(discussionId: string, commentId: string): boolean {
  const discussions = getAllDiscussions();
  const discussion = discussions.find((d) => d.id === discussionId);
  if (!discussion) return false;

  // Unmark any existing answers
  discussion.comments.forEach((c) => (c.isAnswer = false));

  const comment = discussion.comments.find((c) => c.id === commentId);
  if (!comment) return false;

  comment.isAnswer = true;
  discussion.resolved = true;
  saveDiscussions(discussions);
  return true;
}

/**
 * Increment view count.
 */
export function incrementViews(discussionId: string): void {
  const discussions = getAllDiscussions();
  const discussion = discussions.find((d) => d.id === discussionId);
  if (!discussion) return;

  discussion.views++;
  saveDiscussions(discussions);
}

/**
 * Get discussion statistics.
 */
export function getDiscussionStats(): {
  total: number;
  resolved: number;
  unresolved: number;
  totalComments: number;
} {
  const discussions = getAllDiscussions();
  return {
    total: discussions.length,
    resolved: discussions.filter((d) => d.resolved).length,
    unresolved: discussions.filter((d) => !d.resolved).length,
    totalComments: discussions.reduce((sum, d) => sum + d.comments.length, 0),
  };
}

function saveDiscussions(discussions: Discussion[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(discussions));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
