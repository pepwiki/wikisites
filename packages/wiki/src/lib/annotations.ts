/**
 * Community annotations system for wikisites.
 * Allows users to add annotations to articles and peptides.
 *
 * Usage:
 *   import { addAnnotation, getAnnotations, deleteAnnotation } from "../lib/annotations";
 *   addAnnotation({ articleId: "glutathione", text: "Important note", userId: "user123" });
 */

export type Annotation = {
  id: string;
  articleId: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  replies: Reply[];
};

export type Reply = {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: number;
};

const STORAGE_KEY = "wikisites:annotations";

/**
 * Add an annotation to an article.
 */
export function addAnnotation(
  annotation: Omit<Annotation, "id" | "timestamp" | "upvotes" | "downvotes" | "replies">,
): Annotation {
  const newAnnotation: Annotation = {
    ...annotation,
    id: generateId(),
    timestamp: Date.now(),
    upvotes: 0,
    downvotes: 0,
    replies: [],
  };

  const annotations = getAllAnnotations();
  annotations.push(newAnnotation);
  saveAnnotations(annotations);

  return newAnnotation;
}

/**
 * Get all annotations for an article.
 */
export function getAnnotations(articleId: string): Annotation[] {
  return getAllAnnotations().filter((a) => a.articleId === articleId);
}

/**
 * Get all annotations.
 */
export function getAllAnnotations(): Annotation[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Delete an annotation.
 */
export function deleteAnnotation(annotationId: string): boolean {
  const annotations = getAllAnnotations();
  const index = annotations.findIndex((a) => a.id === annotationId);
  if (index === -1) return false;

  annotations.splice(index, 1);
  saveAnnotations(annotations);
  return true;
}

/**
 * Upvote an annotation.
 */
export function upvoteAnnotation(annotationId: string): boolean {
  const annotations = getAllAnnotations();
  const annotation = annotations.find((a) => a.id === annotationId);
  if (!annotation) return false;

  annotation.upvotes++;
  saveAnnotations(annotations);
  return true;
}

/**
 * Downvote an annotation.
 */
export function downvoteAnnotation(annotationId: string): boolean {
  const annotations = getAllAnnotations();
  const annotation = annotations.find((a) => a.id === annotationId);
  if (!annotation) return false;

  annotation.downvotes++;
  saveAnnotations(annotations);
  return true;
}

/**
 * Add a reply to an annotation.
 */
export function addReply(
  annotationId: string,
  reply: Omit<Reply, "id" | "timestamp">,
): Reply | null {
  const annotations = getAllAnnotations();
  const annotation = annotations.find((a) => a.id === annotationId);
  if (!annotation) return null;

  const newReply: Reply = {
    ...reply,
    id: generateId(),
    timestamp: Date.now(),
  };

  annotation.replies.push(newReply);
  saveAnnotations(annotations);
  return newReply;
}

/**
 * Get annotation statistics for an article.
 */
export function getAnnotationStats(articleId: string): {
  total: number;
  totalUpvotes: number;
  totalReplies: number;
} {
  const annotations = getAnnotations(articleId);
  return {
    total: annotations.length,
    totalUpvotes: annotations.reduce((sum, a) => sum + a.upvotes, 0),
    totalReplies: annotations.reduce((sum, a) => sum + a.replies.length, 0),
  };
}

function saveAnnotations(annotations: Annotation[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
