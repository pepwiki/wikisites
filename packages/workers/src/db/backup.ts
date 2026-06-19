interface BackupResult {
  readonly backup: Record<string, unknown[]>;
  readonly exported_at: string;
  readonly tables: string[];
}

const BACKUP_TABLES = [
  "users",
  "review_progress",
  "annotations",
  "quiz_results",
  "session_stats",
  "comments",
  "_migrations",
] as const;

export async function backupD1(db: D1Database): Promise<BackupResult> {
  const backup: Record<string, unknown[]> = {};
  const successfulTables: string[] = [];

  for (const table of BACKUP_TABLES) {
    try {
      const result = await db.prepare(`SELECT * FROM "${table}"`).all();
      backup[table] = result.results;
      successfulTables.push(table);
    } catch {
      backup[table] = [];
    }
  }

  return {
    backup,
    exported_at: new Date().toISOString(),
    tables: successfulTables,
  };
}

export async function backupD1AsResponse(db: D1Database): Promise<Response> {
  const data = await backupD1(db);

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="d1-backup-${Date.now()}.json"`,
      "Access-Control-Allow-Origin": "*",
    },
  });
}
