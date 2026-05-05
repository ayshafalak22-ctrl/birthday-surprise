import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <main className="flex-1">{children}</main>
      <footer className="bg-card border-t border-border py-4 text-center">
        <p className="text-muted-foreground text-xs">
          Made with 💕 &mdash; © {new Date().getFullYear()}. Built with love
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition-smooth"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
