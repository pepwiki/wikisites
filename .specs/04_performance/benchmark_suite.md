# Benchmark Suite Design

## Overview

This document defines the benchmark suite for KP Wikisites, covering automated performance testing, regression detection, and continuous monitoring across all environments. The suite includes Lighthouse CI, WebPageTest automation, custom performance markers, and regression thresholds.

## 1. Lighthouse CI Configuration

### Installation and Setup

```bash
# Dependencies
npm install --save-dev @lhci/cli lighthouse

# Lighthouse CI config: lighthouserc.js
module.exports = {
  ci: {
    collect: {
      // Run Lighthouse 3 times for statistical significance
      numberOfRuns: 3,
      // URLs to test
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/wiki/test-wiki',
        'http://localhost:4173/wiki/test-wiki/page/getting-started',
        'http://localhost:4173/api/search?q=test',
      ],
      // Chrome launch flags
      chromeFlags: '--no-sandbox --headless --disable-gpu',
      // Custom audit settings
      settings: {
        preset: 'desktop',
        // Throttling simulation
        throttling: {
          cpuSlowdownMultiplier: 1,
          rttMs: 40,
          throughputKbps: 10240,
        },
        // Screen emulation
        screenEmulation: {
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        // Skip certain audits for CI
        skipAudits: ['uses-http2', 'redirects'],
      },
    },
    assert: {
      // Performance score assertion
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'server-response-time': ['error', { maxNumericValue: 200 }],
        
        // Resource budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 100000 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 40000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 500000 }],
        'resource-summary:document:size': ['error', { maxNumericValue: 20000 }],
        
        // Network
        'resource-summary:script:count': ['error', { maxNumericValue: 10 }],
        'resource-summary:stylesheet:count': ['error', { maxNumericValue: 5 }],
        'resource-summary:third-party:count': ['error', { maxNumericValue: 2 }],
        
        // Rendering
        'render-blocking-resources': ['warn', { maxNumericValue: 0 }],
        'uses-responsive-images': 'error',
        'offscreen-images': 'error',
        'unminified-javascript': 'error',
        'unused-css-rules': 'error',
        'unused-javascript': 'error',
      },
    },
    upload: {
      // Store results for comparison
      target: 'lhci',
      serverBaseUrl: process.env.LHCI_SERVER_URL || 'http://localhost:9001',
      token: process.env.LHCI_TOKEN,
    },
    server: {
      // Local Lighthouse CI server
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlPath: './lighthouse-ci.db',
      },
    },
  },
};
```

### Lighthouse CI Scripts

```json
// package.json scripts
{
  "scripts": {
    "perf:lighthouse": "lhci autorun",
    "perf:lighthouse:local": "LHCI_BUILD_CONTEXT__CURRENT_BRANCH=main lhci autorun",
    "perf:lighthouse:compare": "lhci compare --compareBranch main",
    "perf:lighthouse:server": "lhci server --port 9001",
    "perf:lighthouse:assert": "lhci assert"
  }
}
```

### CI Pipeline Integration

```yaml
# .github/workflows/lighthouse.yml (adapt for Forgejo)
name: Lighthouse CI
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Start preview server
        run: npm run preview &
        env:
          PORT: 4173
      
      - name: Wait for server
        run: npx wait-on http://localhost:4173
      
      - name: Run Lighthouse CI
        run: npm run perf:lighthouse
        env:
          LHCI_SERVER_URL: ${{ secrets.LHCI_SERVER_URL }}
          LHCI_TOKEN: ${{ secrets.LHCI_TOKEN }}
      
      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-results
          path: .lighthouseci/
          retention-days: 30
```

## 2. WebPageTest Automation

### WebPageTest Configuration

```javascript
// webpagetest.config.js
module.exports = {
  apiEndpoint: 'https://www.webpagetest.org/api/v1/',
  apiKey: process.env.WPT_API_KEY,
  
  testLocations: [
    'Dulles_Virginia',     // US East (closest to Cloudflare)
    'London_United_Kingdom', // EU
    'Tokyo_Japan',         // Asia Pacific
  ],
  
  testConfig: {
    connectivity: 'Cable',    // 5Mbps down, 1Mbps up, 28ms RTT
    bwIn: 5000,
    bwOut: 1000,
    latency: 28,
    packetLoss: 0,
    runs: 3,
    video: true,
    private: false,
    
    // Lighthouse integration
    lighthouse: true,
    lighthouseThresholds: {
      performance: 90,
      accessibility: 95,
    },
    
    // Custom metrics
    metrics: [
      'TTFB',
      'LCP',
      'CLS',
      'TBT',
      'INP',
      'FCP',
      'SI',
      'TTI',
    ],
  },
  
  testUrls: [
    {
      name: 'Homepage',
      url: 'https://kp-wikisites.pages.dev/',
      script: [
        'logData\t0',
        'navigate\thttps://kp-wikisites.pages.dev/',
        'logData\t1',
        'waitForElement\t#content',
      ],
    },
    {
      name: 'Wiki Page',
      url: 'https://kp-wikisites.pages.dev/wiki/test-wiki',
      script: [
        'logData\t0',
        'navigate\thttps://kp-wikisites.pages.dev/wiki/test-wiki',
        'logData\t1',
        'waitForElement\t#wiki-content',
      ],
    },
    {
      name: 'Search',
      url: 'https://kp-wikisites.pages.dev/wiki/test-wiki',
      script: [
        'logData\t0',
        'navigate\thttps://kp-wikisites.pages.dev/wiki/test-wiki',
        'logData\t1',
        'click\tsearch-input',
        'type\tsearch-input\ttest query',
        'waitForElement\t.search-results',
        'setValue\tsearch-input\t',
        'type\tsearch-input\tgetting started',
        'waitForElement\t.search-results',
      ],
    },
  ],
  
  budgets: {
    ttfb: { p50: 100, p95: 200 },
    lcp: { p50: 1800, p95: 2500 },
    cls: { p50: 0.05, p95: 0.1 },
    tbt: { p50: 100, p95: 200 },
    si: { p50: 2000, p95: 3000 },
    tti: { p50: 2500, p95: 3500 },
  },
};
```

### WebPageTest Automation Script

```javascript
// scripts/webpagetest-monitor.js
const WebPageTest = require('webpagetest');
const wpt = new WebPageTest(
  'www.webpagetest.org',
  process.env.WPT_API_KEY
);

async function runTest(url, location = 'Dulles_Virginia') {
  console.log(`Running test: ${url} from ${location}`);
  
  const result = await wpt.runTest(url, {
    location,
    connectivity: 'Cable',
    runs: 3,
    firstViewOnly: false,
    lighthouse: true,
    video: true,
    keepOriginalPackages: true,
    block: '*.doubleclick.net\n*googlesyndication.com',
  });
  
  return result;
}

async function analyzeResults(testId) {
  const results = await wpt.getTestResults(testId);
  const lighthouse = await wpt.getLighthouseResults(testId);
  
  const analysis = {
    testId,
    url: results.url,
    location: results.location,
    metrics: {
      ttfb: results.data.average.firstView.TTFB,
      fcp: results.data.average.firstView.FirstContentfulPaint,
      lcp: results.data.average.firstView.LargestContentfulPaint,
      cls: results.data.average.firstView.CumulativeLayoutShift,
      tbt: results.data.average.firstView.TotalBlockingTime,
      si: results.data.average.firstView.SpeedIndex,
      tti: results.data.average.firstView.TimeToInteractive,
    },
    lighthouse: {
      performance: lighthouse.categories.performance.score * 100,
      accessibility: lighthouse.categories.accessibility.score * 100,
      bestPractices: lighthouse.categories['best-practices'].score * 100,
      seo: lighthouse.categories.seo.score * 100,
    },
    requests: results.data.average.firstView.requests,
    bytes: results.data.average.firstView.bytesIn,
    score: results.data.average.firstView.qualityScore,
  };
  
  return analysis;
}

async function checkBudgets(analysis) {
  const violations = [];
  const budgets = {
    ttfb: 200,
    lcp: 2500,
    cls: 0.1,
    tbt: 200,
    si: 3000,
    tti: 3500,
    performanceScore: 90,
  };
  
  for (const [metric, budget] of Object.entries(budgets)) {
    const value = analysis.metrics[metric] || analysis.lighthouse.performance;
    if (value > budget) {
      violations.push({
        metric,
        value,
        budget,
        overage: ((value - budget) / budget * 100).toFixed(1) + '%',
      });
    }
  }
  
  return violations;
}

module.exports = { runTest, analyzeResults, checkBudgets };
```

## 3. Custom Performance Markers

### Performance Mark API

```typescript
// src/lib/performance/markers.ts
class PerformanceMarker {
  private marks: Map<string, number> = new Map();
  private measures: Map<string, number[]> = new Map();
  
  mark(name: string): void {
    performance.mark(name);
    this.marks.set(name, performance.now());
  }
  
  measure(name: string, startMark: string, endMark?: string): number {
    const startTime = this.marks.get(startMark);
    const endTime = endMark ? this.marks.get(endMark) : performance.now();
    
    if (startTime === undefined) {
      console.warn(`Start mark "${startMark}" not found`);
      return 0;
    }
    
    const duration = (endTime ?? performance.now()) - startTime;
    
    // Store for aggregation
    const history = this.measures.get(name) ?? [];
    history.push(duration);
    this.measures.set(name, history);
    
    // Performance API measurement
    performance.measure(name, startMark, endMark);
    
    return duration;
  }
  
  getStats(name: string): { p50: number; p95: number; p99: number; count: number } | null {
    const history = this.measures.get(name);
    if (!history || history.length === 0) return null;
    
    const sorted = [...history].sort((a, b) => a - b);
    return {
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
      count: sorted.length,
    };
  }
  
  clear(): void {
    this.marks.clear();
    this.measures.clear();
    performance.clearMarks();
    performance.clearMeasures();
  }
}

export const markers = new PerformanceMarker();
```

### Predefined Markers

```typescript
// src/lib/performance/defined-markers.ts
import { markers } from './markers';

// Application lifecycle markers
export const AppMarkers = {
  // Bootstrap
  appStart: () => markers.mark('app:start'),
  appReady: () => {
    markers.mark('app:ready');
    markers.measure('App Bootstrap', 'app:start', 'app:ready');
  },
  
  // Route transitions
  routeStart: (path: string) => markers.mark(`route:${path}:start`),
  routeReady: (path: string) => {
    markers.mark(`route:${path}:ready`);
    markers.measure(`Route Load (${path})`, `route:${path}:start`, `route:${path}:ready`);
  },
  
  // Component lifecycle
  componentMount: (name: string) => markers.mark(`component:${name}:mount`),
  componentReady: (name: string) => {
    markers.mark(`component:${name}:ready`);
    markers.measure(`Component Mount (${name})`, `component:${name}:mount`, `component:${name}:ready`);
  },
  
  // Data fetching
  fetchStart: (url: string) => markers.mark(`fetch:${url}:start`),
  fetchEnd: (url: string) => {
    markers.mark(`fetch:${url}:end`);
    markers.measure(`Fetch (${url})`, `fetch:${url}:start`, `fetch:${url}:end`);
  },
  
  // Search
  searchStart: (query: string) => markers.mark('search:start'),
  searchIndexLoad: () => {
    markers.mark('search:index:loaded');
    markers.measure('Search Index Load', 'search:start', 'search:index:loaded');
  },
  searchComplete: (query: string) => {
    markers.mark('search:complete');
    markers.measure('Search Complete', 'search:start', 'search:complete');
  },
  
  // Rendering
  renderStart: (component: string) => markers.mark(`render:${component}:start`),
  renderEnd: (component: string) => {
    markers.mark(`render:${component}:end`);
    markers.measure(`Render (${component})`, `render:${component}:start`, `render:${component}:end`);
  },
  
  // Markdown
  markdownParseStart: () => markers.mark('markdown:parse:start'),
  markdownParseEnd: () => {
    markers.mark('markdown:parse:end');
    markers.measure('Markdown Parse', 'markdown:parse:start', 'markdown:parse:end');
  },
  markdownRenderStart: () => markers.mark('markdown:render:start'),
  markdownRenderEnd: () => {
    markers.mark('markdown:render:end');
    markers.measure('Markdown Render', 'markdown:render:start', 'markdown:render:end');
  },
  
  // Images
  imageLoadStart: (src: string) => markers.mark(`image:${src}:start`),
  imageLoadEnd: (src: string) => {
    markers.mark(`image:${src}:end`);
    markers.measure(`Image Load (${src})`, `image:${src}:start`, `image:${src}:end`);
  },
};

// Worker markers
export const WorkerMarkers = {
  searchWorkerStart: () => markers.mark('worker:search:start'),
  searchWorkerReady: () => {
    markers.mark('worker:search:ready');
    markers.measure('Search Worker Init', 'worker:search:start', 'worker:search:ready');
  },
  markdownWorkerStart: () => markers.mark('worker:markdown:start'),
  markdownWorkerReady: () => {
    markers.mark('worker:markdown:ready');
    markers.measure('Markdown Worker Init', 'worker:markdown:start', 'worker:markdown:ready');
  },
};

// Server markers (Cloudflare Workers)
export const ServerMarkers = {
  requestStart: (requestId: string) => markers.mark(`server:${requestId}:start`),
  requestEnd: (requestId: string) => {
    markers.mark(`server:${requestId}:end`);
    markers.measure(`Server Request (${requestId})`, `server:${requestId}:start`, `server:${requestId}:end`);
  },
  kvRead: (key: string) => markers.mark(`kv:read:${key}`),
  kvReadComplete: (key: string) => {
    markers.mark(`kv:read:${key}:done`);
    markers.measure(`KV Read (${key})`, `kv:read:${key}`, `kv:read:${key}:done`);
  },
  d1Query: (query: string) => markers.mark(`d1:${query}:start`),
  d1QueryComplete: (query: string) => {
    markers.mark(`d1:${query}:done`);
    markers.measure(`D1 Query (${query})`, `d1:${query}:start`, `d1:${query}:done`);
  },
};
```

### Marker Reporting

```typescript
// src/lib/performance/reporter.ts
import { markers } from './markers';

interface PerformanceReport {
  timestamp: string;
  url: string;
  userAgent: string;
  connection: string;
  marks: Record<string, { p50: number; p95: number; count: number }>;
  navigationTiming: NavigationTiming;
  paintTiming: PaintTiming;
}

async function collectReport(): Promise<PerformanceReport> {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  const marks: Record<string, { p50: number; p95: number; count: number }> = {};
  const markNames = ['App Bootstrap', 'Route Load', 'Search Index Load', 'Markdown Parse'];
  
  for (const name of markNames) {
    const stats = markers.getStats(name);
    if (stats) {
      marks[name] = {
        p50: stats.p50,
        p95: stats.p95,
        count: stats.count,
      };
    }
  }
  
  return {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    connection: (navigator as any).connection?.effectiveType ?? 'unknown',
    marks,
    navigationTiming: {
      ttfb: navigation.responseStart - navigation.requestStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,
    },
    paintTiming: {
      fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime ?? 0,
    },
  };
}

// Send report to analytics endpoint
async function reportPerformance(): Promise<void> {
  if (document.visibilityState !== 'visible') return;
  
  const report = await collectReport();
  
  // Use sendBeacon for reliable delivery
  const blob = new Blob([JSON.stringify(report)], { type: 'application/json' });
  navigator.sendBeacon('/api/performance', blob);
}

// Report on page hide (most reliable for SPA navigation)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    reportPerformance();
  }
});

// Report on beforeunload
window.addEventListener('beforeunload', reportPerformance);
```

## 4. Regression Detection Thresholds

### Regression Detection Configuration

```typescript
// src/lib/performance/regression-detection.ts
interface RegressionThreshold {
  metric: string;
  warningThreshold: number;   // Percentage increase that triggers warning
  criticalThreshold: number;  // Percentage increase that triggers critical
  minSamples: number;         // Minimum samples before comparison
  baselineWindow: number;     // Days to consider for baseline
}

const REGRESSION_THRESHOLDS: RegressionThreshold[] = [
  // Core Web Vitals
  { metric: 'lcp', warningThreshold: 10, criticalThreshold: 25, minSamples: 50, baselineWindow: 7 },
  { metric: 'cls', warningThreshold: 10, criticalThreshold: 20, minSamples: 50, baselineWindow: 7 },
  { metric: 'tbt', warningThreshold: 15, criticalThreshold: 30, minSamples: 50, baselineWindow: 7 },
  { metric: 'inp', warningThreshold: 15, criticalThreshold: 30, minSamples: 50, baselineWindow: 7 },
  
  // Server metrics
  { metric: 'ttfb', warningThreshold: 10, criticalThreshold: 20, minSamples: 100, baselineWindow: 7 },
  { metric: 'api_response_time', warningThreshold: 15, criticalThreshold: 30, minSamples: 100, baselineWindow: 7 },
  { metric: 'search_response_time', warningThreshold: 10, criticalThreshold: 25, minSamples: 100, baselineWindow: 7 },
  
  // Resource metrics
  { metric: 'js_size', warningThreshold: 5, criticalThreshold: 15, minSamples: 1, baselineWindow: 30 },
  { metric: 'css_size', warningThreshold: 5, criticalThreshold: 15, minSamples: 1, baselineWindow: 30 },
  { metric: 'total_size', warningThreshold: 5, criticalThreshold: 10, minSamples: 1, baselineWindow: 30 },
  
  // Build metrics
  { metric: 'build_time', warningThreshold: 15, criticalThreshold: 30, minSamples: 5, baselineWindow: 14 },
];

interface Regression {
  metric: string;
  baseline: number;
  current: number;
  changePercent: number;
  severity: 'warning' | 'critical';
  samples: number;
}

function detectRegressions(
  currentMetrics: Record<string, number>,
  baselineMetrics: Record<string, number>,
  sampleCounts: Record<string, number>
): Regression[] {
  const regressions: Regression[] = [];
  
  for (const threshold of REGRESSION_THRESHOLDS) {
    const current = currentMetrics[threshold.metric];
    const baseline = baselineMetrics[threshold.metric];
    const samples = sampleCounts[threshold.metric] ?? 0;
    
    if (current === undefined || baseline === undefined) continue;
    if (samples < threshold.minSamples) continue;
    
    const changePercent = ((current - baseline) / baseline) * 100;
    
    if (changePercent > threshold.criticalThreshold) {
      regressions.push({
        metric: threshold.metric,
        baseline,
        current,
        changePercent,
        severity: 'critical',
        samples,
      });
    } else if (changePercent > threshold.warningThreshold) {
      regressions.push({
        metric: threshold.metric,
        baseline,
        current,
        changePercent,
        severity: 'warning',
        samples,
      });
    }
  }
  
  return regressions;
}

// Historical baseline calculation
function calculateBaseline(
  historicalData: number[],
  windowDays: number = 7
): { p50: number; p95: number; mean: number } {
  const sorted = [...historicalData].sort((a, b) => a - b);
  
  return {
    p50: sorted[Math.floor(sorted.length * 0.5)],
    p95: sorted[Math.floor(sorted.length * 0.95)],
    mean: sorted.reduce((sum, val) => sum + val, 0) / sorted.length,
  };
}
```

### CI Regression Check

```yaml
# Regression check in CI pipeline
- name: Check for performance regressions
  run: |
    node scripts/check-regressions.js \
      --current results/current.json \
      --baseline results/baseline.json \
      --output results/regressions.json \
      --fail-on critical
  continue-on-error: false
```

## 5. Test Environments

### Environment Configuration

| Environment | URL | Purpose | Data |
|---|---|---|---|
| Local | `localhost:4173` | Development testing | Mock data |
| Staging | `staging.kp-wikisites.pages.dev` | Pre-production validation | Staging dataset |
| Production | `kp-wikisites.pages.dev` | Live monitoring | Real data |

### Environment-Specific Settings

```typescript
// src/lib/performance/environment.ts
interface PerfEnvironment {
  name: string;
  baseUrl: string;
  sampleRate: number;
  reporting: 'local' | 'staging' | 'production';
  budgets: PerformanceBudgets;
  markers: {
    enabled: boolean;
    sampleRate: number;
  };
}

const environments: Record<string, PerfEnvironment> = {
  local: {
    name: 'Local Development',
    baseUrl: 'http://localhost:4173',
    sampleRate: 1.0, // 100% sampling locally
    reporting: 'local',
    budgets: {
      lcp: 3000,   // Relaxed for local
      cls: 0.15,
      tbt: 300,
      ttfb: 300,
    },
    markers: {
      enabled: true,
      sampleRate: 1.0,
    },
  },
  
  staging: {
    name: 'Staging',
    baseUrl: 'https://staging.kp-wikisites.pages.dev',
    sampleRate: 0.5, // 50% sampling on staging
    reporting: 'staging',
    budgets: {
      lcp: 2500,
      cls: 0.1,
      tbt: 200,
      ttfb: 200,
    },
    markers: {
      enabled: true,
      sampleRate: 0.2,
    },
  },
  
  production: {
    name: 'Production',
    baseUrl: 'https://kp-wikisites.pages.dev',
    sampleRate: 0.1, // 10% sampling in production
    reporting: 'production',
    budgets: {
      lcp: 1800,
      cls: 0.05,
      tbt: 100,
      ttfb: 100,
    },
    markers: {
      enabled: true,
      sampleRate: 0.05,
    },
  },
};

function getEnvironment(): PerfEnvironment {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return environments.local;
  }
  
  if (hostname.includes('staging')) {
    return environments.staging;
  }
  
  return environments.production;
}
```

### Staging Environment Setup

```bash
# Staging deployment script
#!/bin/bash
set -euo pipefail

echo "Deploying to staging..."

# Build with staging configuration
npm run build

# Deploy to Cloudflare Pages (staging branch)
npx wrangler pages deploy dist --project-name=kp-wikisites --branch=staging

# Wait for deployment
echo "Waiting for staging deployment..."
npx wait-on https://staging.kp-wikisites.pages.dev --timeout 60000

# Run smoke tests
npm run test:smoke

# Run Lighthouse on staging
npm run perf:lighthouse:staging

echo "Staging deployment complete."
```

### Production Monitoring Setup

```typescript
// src/lib/performance/production-monitor.ts
import { collectReport, reportPerformance } from './reporter';
import { detectRegressions } from './regression-detection';

class ProductionMonitor {
  private sampleRate: number;
  private reportQueue: PerformanceReport[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  
  constructor(sampleRate: number = 0.1) {
    this.sampleRate = sampleRate;
    this.setupListeners();
  }
  
  private setupListeners() {
    // Sample-based reporting
    if (Math.random() > this.sampleRate) return;
    
    // Report on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush();
      }
    });
    
    // Report on page unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });
    
    // Periodic reporting (every 30 seconds)
    this.flushInterval = setInterval(() => {
      this.flush();
    }, 30_000);
  }
  
  private async flush() {
    if (this.reportQueue.length === 0) return;
    
    const reports = [...this.reportQueue];
    this.reportQueue = [];
    
    try {
      await fetch('/api/performance/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reports }),
        keepalive: true,
      });
    } catch (error) {
      // Queue failed reports for retry
      this.reportQueue.unshift(...reports);
    }
  }
  
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }
}

// Initialize production monitor
if (import.meta.env.PROD) {
  new ProductionMonitor(0.1);
}
```

## 6. Benchmark Reporting

### Dashboard Data Format

```typescript
interface BenchmarkDashboard {
  timestamp: string;
  period: 'hourly' | 'daily' | 'weekly';
  
  coreWebVitals: {
    lcp: { p50: number; p75: number; p95: number; trend: 'up' | 'down' | 'stable' };
    cls: { p50: number; p75: number; p95: number; trend: 'up' | 'down' | 'stable' };
    tbt: { p50: number; p75: number; p95: number; trend: 'up' | 'down' | 'stable' };
    inp: { p50: number; p75: number; p95: number; trend: 'up' | 'down' | 'stable' };
  };
  
  serverMetrics: {
    ttfb: { p50: number; p75: number; p95: number };
    apiResponseTime: { p50: number; p75: number; p95: number };
    errorRate: number;
    cacheHitRate: number;
  };
  
  resourceMetrics: {
    totalTransferSize: number;
    jsSize: number;
    cssSize: number;
    imageSize: number;
    requestCount: number;
  };
  
  buildMetrics: {
    buildTime: number;
    bundleSize: number;
    chunkCount: number;
  };
  
  regressions: Regression[];
  improvements: Regression[];
}
```

### Alert Configuration

```typescript
interface AlertRule {
  metric: string;
  condition: 'above' | 'below' | 'change_percent';
  threshold: number;
  duration: number; // minutes
  severity: 'info' | 'warning' | 'critical';
  channels: ('slack' | 'email' | 'webhook')[];
}

const alertRules: AlertRule[] = [
  {
    metric: 'lcp.p75',
    condition: 'above',
    threshold: 2500,
    duration: 15,
    severity: 'critical',
    channels: ['slack', 'email'],
  },
  {
    metric: 'cls.p75',
    condition: 'above',
    threshold: 0.1,
    duration: 15,
    severity: 'warning',
    channels: ['slack'],
  },
  {
    metric: 'ttfb.p75',
    condition: 'above',
    threshold: 200,
    duration: 30,
    severity: 'warning',
    channels: ['slack'],
  },
  {
    metric: 'error_rate',
    condition: 'above',
    threshold: 0.05,
    duration: 10,
    severity: 'critical',
    channels: ['slack', 'email'],
  },
  {
    metric: 'cache_hit_rate',
    condition: 'below',
    threshold: 0.8,
    duration: 30,
    severity: 'warning',
    channels: ['slack'],
  },
];
```
