export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="stagger-in max-w-3xl">
      <p className="text-xs tracking-kicker text-primary uppercase">{kicker}</p>
      <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-fg sm:text-5xl">
        {title}
      </h1>
      {lede ? <p className="mt-4 max-w-prose text-muted">{lede}</p> : null}
    </header>
  );
}
