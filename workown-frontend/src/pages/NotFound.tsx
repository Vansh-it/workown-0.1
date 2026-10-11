import { Home, Search, Wrench } from "lucide-react";
import { Container, Section } from "../components/ui/Primitives";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="canvas" className="flex min-h-[70vh] items-center">
      <Container className="flex flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-primary-50)]">
          <Wrench className="h-10 w-10 text-[var(--color-primary-500)]" />
        </div>
        <p className="mt-6 font-display text-7xl font-bold text-[var(--color-ink)]">404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-[var(--color-ink)]">This page took a day off</h1>
        <p className="mt-3 max-w-sm text-[var(--color-ink-soft)]">The page you're looking for doesn't exist or may have moved. Let's get you back on track.</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" icon={<Home className="h-4 w-4" />}>Back to Home</Button>
          <Button to="/find-workers" variant="secondary" icon={<Search className="h-4 w-4" />}>Find Workers</Button>
        </div>
      </Container>
    </Section>
  );
}
