import { ArrowLink } from "@/components/ui/page-primitives";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[80dvh] flex-col justify-center pb-16 pt-28">
      <p className="t-label flex items-center gap-2 text-muted-foreground">
        <span className="mark-plus text-primary" aria-hidden="true" />
        Error
      </p>
      <h1 className="t-display fade-up mt-4">404</h1>
      <p className="fade-up mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
        This page does not exist, or it has moved.
      </p>
      <div className="draw-x mt-10 h-px max-w-xl bg-border" aria-hidden="true" />
      <ul role="list" className="mt-4 flex flex-wrap gap-x-8">
        <li>
          <ArrowLink href="/">Home</ArrowLink>
        </li>
        <li>
          <ArrowLink href="/projects">Projects</ArrowLink>
        </li>
        <li>
          <ArrowLink href="/contact">Contact</ArrowLink>
        </li>
      </ul>
    </div>
  );
}
