import { createFileRoute } from "@tanstack/react-router";
import { ConfirmDelete, EntryDialog } from "@/components/entry-dialog";
import { EntryActions } from "@/components/entry-actions";
import { PageHeader } from "@/components/page-header";
import { PlusCard } from "@/components/plus-card";
import { useCollection } from "@/components/use-collection";
import { listEntries } from "@/lib/portfolio.functions";
import { tagsOf } from "@/lib/portfolio";

export const Route = createFileRoute("/experience")({
  loader: () => listEntries({ data: { kind: "experience" } }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const entries = Route.useLoaderData();
  const col = useCollection("experience");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        kicker="Experience"
        title="Where the work is made"
        lede="Software by day. Stories, characters, and cinematic scenes in the hours after. Click plus to add a role."
      />
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {entries.map((job) => (
          <li
            key={job.id}
            className="relative grid gap-4 py-8 md:grid-cols-4 md:gap-10"
          >
            <EntryActions
              onEdit={() => col.setEditing(job)}
              onDelete={() => col.setRemoving(job)}
            />
            <p className="text-xs tracking-nav text-muted uppercase md:col-span-1">
              {job.payload.years}
            </p>
            <div className="md:col-span-3 pr-24">
              <h2 className="font-display text-2xl text-fg">{job.payload.title}</h2>
              <p className="mt-1 text-sm text-primary">{job.payload.place}</p>
              <p className="mt-3 max-w-prose text-muted">{job.payload.summary}</p>
              {tagsOf(job.payload).length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tagsOf(job.payload).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs tracking-wide text-muted shadow-[var(--shadow-border)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <PlusCard label="Add experience" onClick={col.openNew} />
      </div>
      {col.editing !== null ? (
        <EntryDialog
          kind="experience"
          entry={col.editing === "new" ? null : col.editing}
          onClose={() => col.setEditing(null)}
          onSave={col.save}
          busy={col.busy}
          error={col.error}
        />
      ) : null}
      {col.removing ? (
        <ConfirmDelete
          title={col.removing.payload.title || "This experience"}
          onCancel={() => col.setRemoving(null)}
          onConfirm={col.confirmRemove}
          busy={col.busy}
        />
      ) : null}
    </div>
  );
}
