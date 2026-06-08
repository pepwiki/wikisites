import { createContext, useContext, createSignal, onMount, type ParentComponent } from "solid-js";
import {
  STORAGE_KEY,
  emptySessionData,
  emptySessionSnapshot,
  mergeSession,
  type SessionData,
  type SessionSnapshot,
} from "@wikisites/query/session-stats";

interface SessionContextValue {
  /** Record a review (correct or incorrect) */
  recordReview: (correct: boolean) => void;
  /** Record a quiz (correct or incorrect) */
  recordQuiz: (correct: boolean) => void;
  /** Reset current session counters */
  resetSession: () => void;
  /** Current session snapshot */
  session: () => SessionSnapshot;
  /** All-time persisted data */
  allTime: () => SessionData;
}

const SessionContext = createContext<SessionContextValue>();

function loadStats(): SessionData {
  if (typeof window === "undefined") return emptySessionData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptySessionData();
    return JSON.parse(raw) as SessionData;
  } catch {
    return emptySessionData();
  }
}

function saveStats(data: SessionData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // quota exceeded or SSR
  }
}

export const SessionProvider: ParentComponent = (props) => {
  const [allTime, setAllTime] = createSignal<SessionData>(emptySessionData());
  const [session, setSession] = createSignal<SessionSnapshot>(emptySessionSnapshot());

  onMount(() => {
    setAllTime(loadStats());
  });

  const persist = () => {
    const merged = mergeSession(allTime(), session(), new Date());
    setAllTime(merged);
    saveStats(merged);
  };

  const recordReview = (correct: boolean) => {
    setSession((prev) => ({
      ...prev,
      reviews: prev.reviews + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));
    persist();
  };

  const recordQuiz = (correct: boolean) => {
    setSession((prev) => ({
      ...prev,
      quizzes: prev.quizzes + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));
    persist();
  };

  const resetSession = () => {
    setSession(emptySessionSnapshot());
  };

  return (
    <SessionContext.Provider value={{ recordReview, recordQuiz, resetSession, session, allTime }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
