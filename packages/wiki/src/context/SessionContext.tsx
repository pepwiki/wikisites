import { createContext, useContext, createSignal, onMount, type ParentComponent } from "solid-js";
import {
  emptySessionData,
  emptySessionSnapshot,
  loadStats,
  saveStats,
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

export function useSessionOptional(): SessionContextValue | null {
  return useContext(SessionContext) ?? null;
}
