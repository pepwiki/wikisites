/**
 * A/B testing framework for wikisites.
 * Supports feature flags, experiments, and variant assignment.
 *
 * Usage:
 *   import { initExperiment, getVariant, trackConversion } from "../lib/ab-testing";
 *   initExperiment("dark-mode-default", ["light", "dark", "system"]);
 *   const variant = getVariant("dark-mode-default");
 */

type Experiment = {
  id: string;
  variants: string[];
  weights?: number[];
  startDate?: string;
  endDate?: string;
};

type Assignment = {
  experimentId: string;
  variant: string;
  timestamp: number;
  userId: string;
};

type Conversion = {
  experimentId: string;
  variant: string;
  metric: string;
  value: number;
  timestamp: number;
};

const EXPERIMENT_KEY = "wikisites:experiments";
const ASSIGNMENT_KEY = "wikisites:assignments";
const CONVERSION_KEY = "wikisites:conversions";

/**
 * Initialize an experiment.
 */
export function initExperiment(experiment: Experiment): void {
  if (typeof localStorage === "undefined") return;

  const experiments = getExperiments();
  experiments[experiment.id] = experiment;
  localStorage.setItem(EXPERIMENT_KEY, JSON.stringify(experiments));
}

/**
 * Get the variant assignment for an experiment.
 */
export function getVariant(experimentId: string): string | null {
  if (typeof localStorage === "undefined") return null;

  // Check if already assigned
  const assignments = getAssignments();
  const existing = assignments.find((a) => a.experimentId === experimentId);
  if (existing) return existing.variant;

  // Get experiment
  const experiments = getExperiments();
  const experiment = experiments[experimentId];
  if (!experiment) return null;

  // Assign variant
  const variant = assignVariant(experiment);
  const assignment: Assignment = {
    experimentId,
    variant,
    timestamp: Date.now(),
    userId: getUserId(),
  };

  assignments.push(assignment);
  localStorage.setItem(ASSIGNMENT_KEY, JSON.stringify(assignments));

  return variant;
}

/**
 * Track a conversion event.
 */
export function trackConversion(experimentId: string, metric: string, value: number = 1): void {
  if (typeof localStorage === "undefined") return;

  const variant = getVariant(experimentId);
  if (!variant) return;

  const conversions = getConversions();
  conversions.push({
    experimentId,
    variant,
    metric,
    value,
    timestamp: Date.now(),
  });

  localStorage.setItem(CONVERSION_KEY, JSON.stringify(conversions));
}

/**
 * Get experiment results.
 */
export function getExperimentResults(experimentId: string): {
  experiment: Experiment | null;
  variants: Record<
    string,
    { count: number; conversions: Record<string, { count: number; total: number }> }
  >;
} {
  const experiments = getExperiments();
  const experiment = experiments[experimentId] || null;

  const assignments = getAssignments().filter((a) => a.experimentId === experimentId);
  const conversions = getConversions().filter((c) => c.experimentId === experimentId);

  const variants: Record<
    string,
    { count: number; conversions: Record<string, { count: number; total: number }> }
  > = {};

  for (const a of assignments) {
    if (!variants[a.variant]) {
      variants[a.variant] = { count: 0, conversions: {} };
    }
    variants[a.variant].count++;
  }

  for (const c of conversions) {
    if (!variants[c.variant]) continue;
    if (!variants[c.variant].conversions[c.metric]) {
      variants[c.variant].conversions[c.metric] = { count: 0, total: 0 };
    }
    variants[c.variant].conversions[c.metric].count++;
    variants[c.variant].conversions[c.metric].total += c.value;
  }

  return { experiment, variants };
}

/**
 * Clear all experiment data.
 */
export function clearExperiments(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(EXPERIMENT_KEY);
  localStorage.removeItem(ASSIGNMENT_KEY);
  localStorage.removeItem(CONVERSION_KEY);
}

function getExperiments(): Record<string, Experiment> {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(EXPERIMENT_KEY) || "{}");
  } catch {
    return {};
  }
}

function getAssignments(): Assignment[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ASSIGNMENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function getConversions(): Conversion[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CONVERSION_KEY) || "[]");
  } catch {
    return [];
  }
}

function assignVariant(experiment: Experiment): string {
  const weights = experiment.weights || experiment.variants.map(() => 1);
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < experiment.variants.length; i++) {
    random -= weights[i];
    if (random <= 0) return experiment.variants[i];
  }

  return experiment.variants[0];
}

function getUserId(): string {
  if (typeof localStorage === "undefined") return "anonymous";

  let userId = localStorage.getItem("wikisites:user-id");
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("wikisites:user-id", userId);
  }

  return userId;
}
