import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  EXPERIENCE_SEED,
  KINDS,
  type Entry,
  type Kind,
} from "@/lib/portfolio";

const kindSchema = z.enum(KINDS);

const payloadSchema = z.record(z.string(), z.string());

function parseRow(row: {
  id: number;
  kind: string;
  payload: string;
  sort_order: number;
}): Entry {
  let payload: Record<string, string> = {};
  try {
    const parsed = JSON.parse(row.payload) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      payload = Object.fromEntries(
        Object.entries(parsed as Record<string, unknown>).map(([k, v]) => [
          k,
          typeof v === "string" ? v : String(v ?? ""),
        ]),
      );
    }
  } catch {
    payload = {};
  }
  return {
    id: row.id,
    kind: row.kind as Kind,
    payload,
    sortOrder: row.sort_order,
  };
}

async function listKind(kind: Kind): Promise<Entry[]> {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    kind: string;
    payload: string;
    sort_order: number;
  }>`
    select id, kind, payload, sort_order
    from portfolio_entries
    where kind = ${kind}
    order by sort_order asc, id asc
  `;

  if (rows.length === 0 && kind === "experience") {
    await sql`
      insert into portfolio_entries (kind, payload, sort_order)
      values (
        ${"experience"},
        ${JSON.stringify(EXPERIENCE_SEED)},
        ${0}
      )
    `;
    const seeded = await sql<{
      id: number;
      kind: string;
      payload: string;
      sort_order: number;
    }>`
      select id, kind, payload, sort_order
      from portfolio_entries
      where kind = ${kind}
      order by sort_order asc, id asc
    `;
    return seeded.map(parseRow);
  }

  return rows.map(parseRow);
}

export const listEntries = createServerFn({ method: "GET" })
  .validator(z.object({ kind: kindSchema }))
  .handler(async ({ data }) => listKind(data.kind));

export const listHome = createServerFn({ method: "GET" }).handler(async () => {
  const [projects, videos] = await Promise.all([
    listKind("project"),
    listKind("video"),
  ]);
  return { projects, videos };
});

export const createEntry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      kind: kindSchema,
      payload: payloadSchema,
    }),
  )
  .handler(async ({ data }) => {
    const encoded = JSON.stringify(data.payload);
    if (encoded.length > 1_400_000) {
      throw new Error("That image is too large. Use a smaller file or a URL.");
    }
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const maxRows = await sql<{ max: number | null }>`
      select max(sort_order) as max from portfolio_entries where kind = ${data.kind}
    `;
    const next = (maxRows[0]?.max ?? 0) + 1;
    const inserted = await sql<{
      id: number;
      kind: string;
      payload: string;
      sort_order: number;
    }>`
      insert into portfolio_entries (kind, payload, sort_order)
      values (${data.kind}, ${encoded}, ${next})
      returning id, kind, payload, sort_order
    `;
    const row = inserted[0];
    if (!row) throw new Error("Could not save the entry.");
    return parseRow(row);
  });

export const updateEntry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      payload: payloadSchema,
    }),
  )
  .handler(async ({ data }) => {
    const encoded = JSON.stringify(data.payload);
    if (encoded.length > 1_400_000) {
      throw new Error("That image is too large. Use a smaller file or a URL.");
    }
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const updated = await sql<{
      id: number;
      kind: string;
      payload: string;
      sort_order: number;
    }>`
      update portfolio_entries
      set payload = ${encoded}
      where id = ${data.id}
      returning id, kind, payload, sort_order
    `;
    const row = updated[0];
    if (!row) throw new Error("That entry is gone.");
    return parseRow(row);
  });

export const deleteEntry = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`delete from portfolio_entries where id = ${data.id}`;
    return { ok: true as const };
  });
