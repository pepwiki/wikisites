const DOI_PATTERN = /^10\.\d{4,9}\/[^\s]+$/;
const PMID_PATTERN = /^\d+$/;

export interface Citation {
  readonly doi?: string;
  readonly pmid?: string;
  readonly url?: string;
}

export interface CitationValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export interface ResolvabilityResult {
  readonly resolvable: boolean;
  readonly status: number;
}

export function validateDOI(doi: string): boolean {
  return DOI_PATTERN.test(doi);
}

export function validatePMID(pmid: string): boolean {
  return PMID_PATTERN.test(pmid) && pmid.length > 0;
}

export function validateCitation(citation: Citation): CitationValidationResult {
  const errors: string[] = [];

  if (citation.doi !== undefined && !validateDOI(citation.doi)) {
    errors.push(`Invalid DOI format: "${citation.doi}". Expected format: 10.xxxx/xxxxx`);
  }

  if (citation.pmid !== undefined && !validatePMID(citation.pmid)) {
    errors.push(`Invalid PMID format: "${citation.pmid}". Expected numeric string.`);
  }

  if (citation.doi === undefined && citation.pmid === undefined && citation.url === undefined) {
    errors.push("Citation must have at least one of: doi, pmid, or url.");
  }

  return { valid: errors.length === 0, errors };
}

export async function isCitationResolvable(
  citation: Citation,
): Promise<ResolvabilityResult> {
  if (citation.doi) {
    const url = `https://doi.org/${citation.doi}`;
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
      return { resolvable: response.ok, status: response.status };
    } catch {
      return { resolvable: false, status: 0 };
    }
  }

  if (citation.pmid) {
    const url = `https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`;
    try {
      const response = await fetch(url, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
      return { resolvable: response.ok, status: response.status };
    } catch {
      return { resolvable: false, status: 0 };
    }
  }

  if (citation.url) {
    try {
      const response = await fetch(citation.url, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
      return { resolvable: response.ok, status: response.status };
    } catch {
      return { resolvable: false, status: 0 };
    }
  }

  return { resolvable: false, status: 0 };
}
