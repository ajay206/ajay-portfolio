import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, type ReactNode, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

type Fields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const empty: Fields = { name: "", email: "", subject: "", message: "" };

function ContactPage() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);

  function validate(next: Fields) {
    const e: Partial<Fields> = {};
    if (next.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) {
      e.email = "A real email, please.";
    }
    if (next.subject.trim().length < 3) e.subject = "Add a subject.";
    if (next.message.trim().length < 12) {
      e.message = "A little more context helps.";
    }
    return e;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const payload = {
      ...fields,
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("ajay-kumar-mail") ?? "[]") as unknown[];
      localStorage.setItem("ajay-kumar-mail", JSON.stringify([payload, ...prev].slice(0, 20)));
    } catch {
      /* ignore quota */
    }

    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(
      `${fields.message}\n\n— ${fields.name}\n${fields.email}`,
    )}`;
    window.location.href = mailto;
    setSent(true);
  }

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <PageHeader
            kicker="Contact"
            title="Write when the picture is ready"
            lede="New work, collaborations, and quiet questions. Direct — Hyderabad, and the inbox below."
          />
          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-xs tracking-label text-subtle uppercase">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-fg underline-offset-4 hover:underline"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-label text-subtle uppercase">
                Based
              </dt>
              <dd className="mt-1 text-fg">{SITE.location}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-label text-subtle uppercase">
                Currently
              </dt>
              <dd className="mt-1 text-fg">{SITE.status}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-7">
          {sent ? (
            <div>
              <h2 className="font-display text-2xl text-fg">Sent.</h2>
              <p className="mt-3 text-muted">
                Your note is ready in your mail client. If nothing opened, write
                directly to {SITE.email}.
              </p>
              <Button
                className="mt-6"
                variant="ghost"
                onClick={() => {
                  setSent(false);
                  setFields(empty);
                }}
              >
                Write another
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <Field label="Name" error={errors.name}>
                <Input
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="Subject" error={errors.subject}>
                <Input
                  name="subject"
                  value={fields.subject}
                  onChange={(e) => set("subject", e.target.value)}
                />
              </Field>
              <Field label="Message" error={errors.message}>
                <Textarea
                  name="message"
                  value={fields.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </Field>
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                Send
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs tracking-nav text-muted uppercase">
        {label}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-primary">{error}</span> : null}
    </label>
  );
}
