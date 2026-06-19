import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname, basename } from "node:path";

interface SearchEntry {
  id: string;
  type: "quiz" | "flashcard" | "glossary";
  title: string;
  content: string;
  tags: string[];
  path: string;
}

async function readJsonFiles(dir: string): Promise<Record<string, unknown>[]> {
  const entries: Record<string, unknown>[] = [];
  try {
    const files = await readdir(dir);
    for (const file of files) {
      if (extname(file) !== ".json") continue;
      const raw = await readFile(join(dir, file), "utf-8");
      const data: unknown = JSON.parse(raw);
      if (typeof data === "object" && data !== null) {
        entries.push({ ...(data as Record<string, unknown>), _filename: file });
      }
    }
  } catch (_e) {
    // Directory may not exist
  }
  return entries;
}

async function readGlossaryFiles(dir: string): Promise<SearchEntry[]> {
  const entries: SearchEntry[] = [];
  try {
    const files = await readdir(dir);
    for (const file of files) {
      if (extname(file) !== ".md") continue;
      const raw = await readFile(join(dir, file), "utf-8");
      const lines = raw.split("\n");

      let currentTerm = "";
      let currentContent = "";
      let currentCategory = "";

      for (const line of lines) {
        const h3Match = line.match(/^###\s+(.+)/);
        if (h3Match) {
          if (currentTerm) {
            entries.push({
              id: `glossary-${basename(file, ".md")}-${currentTerm.toLowerCase().replace(/\s+/g, "-")}`,
              type: "glossary",
              title: currentTerm,
              content: currentContent.trim(),
              tags: [currentCategory],
              path: `/glossary/${basename(file, ".md")}`,
            });
          }
          currentTerm = h3Match[1]!;
          currentContent = "";
        } else if (line.startsWith("**Category:**")) {
          const catMatch = line.match(/\*\*Category:\*\*\s*(.+)/);
          if (catMatch) currentCategory = catMatch[1]!.trim();
        } else if (currentTerm && !line.startsWith("---") && !line.startsWith("##")) {
          currentContent += line + " ";
        }
      }

      if (currentTerm) {
        entries.push({
          id: `glossary-${basename(file, ".md")}-${currentTerm.toLowerCase().replace(/\s+/g, "-")}`,
          type: "glossary",
          title: currentTerm,
          content: currentContent.trim(),
          tags: [currentCategory],
          path: `/glossary/${basename(file, ".md")}`,
        });
      }
    }
  } catch (_e) {
    // Directory may not exist
  }
  return entries;
}

async function main(): Promise<void> {
  const baseDir = "packages/wiki/src/content";
  const entries: SearchEntry[] = [];

  const quizzes = await readJsonFiles(join(baseDir, "quizzes"));
  for (const q of quizzes) {
    const filename = (q._filename as string) ?? "unknown";
    const id = filename.replace(".json", "");
    entries.push({
      id: `quiz-${id}`,
      type: "quiz",
      title: (q.question as string) ?? "",
      content: (q.explanation as string) ?? "",
      tags: Array.isArray(q.tags) ? (q.tags as string[]) : [],
      path: `/quizzes/${id}`,
    });
  }

  const flashcards = await readJsonFiles(join(baseDir, "flashcards"));
  for (const fc of flashcards) {
    const filename = (fc._filename as string) ?? "unknown";
    const id = filename.replace(".json", "");
    entries.push({
      id: `flashcard-${id}`,
      type: "flashcard",
      title: (fc.front as string) ?? "",
      content: (fc.back as string) ?? "",
      tags: Array.isArray(fc.tags) ? (fc.tags as string[]) : [],
      path: `/flashcards/${id}`,
    });
  }

  const glossaryEntries = await readGlossaryFiles(join(baseDir, "glossary"));
  entries.push(...glossaryEntries);

  const outputPath = "packages/wiki/public/search-index.json";
  await writeFile(outputPath, JSON.stringify(entries, null, 2), "utf-8");
  console.log(`Indexed ${entries.length} searchable items → ${outputPath}`);
}

main().catch((err: unknown) => {
  console.error("Search index build failed:", err);
  process.exit(1);
});
