import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BrandMark } from "@/components/bridge/shell";
import { Button } from "@/components/ui/button";
import { getBridgeSession } from "@/lib/bridge/session";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    void getBridgeSession()
      .then((s) => {
        const home = s.home;
        if (home === "/creator" || home === "/studio" || home === "/buyer" || home === "/internal") {
          void navigate({ to: home });
        } else {
          void navigate({ to: "/onboarding" });
        }
      })
      .catch(() => navigate({ to: "/onboarding" }));
  }, [isPending, user, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await authClient.signIn.email({ email, password, callbackURL: "/onboarding" });
    setBusy(false);
    if (res.error) {
      setError(res.error.message ?? "Sign-in failed");
      return;
    }
    navigate({ to: "/onboarding" });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-bg p-6">
      <div className="w-full max-w-sm space-y-5 rounded-md border border-line bg-surface p-6">
        <BrandMark />
        <h1 className="font-display text-2xl">Sign in</h1>
        <p className="text-sm text-muted">Server session. No PIN. No localStorage authorization.</p>
        {authEnabled ? (
          <>
            <form className="space-y-3" onSubmit={(e) => void onSubmit(e)}>
              <label className="block text-sm">
                Email
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
                />
              </label>
              <label className="block text-sm">
                Password
                <input
                  required
                  type="password"
                  minLength={10}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 h-11 w-full rounded-sm border border-line-strong bg-elevated px-3"
                />
              </label>
              {error ? <p className="text-sm text-accent">{error}</p> : null}
              <Button type="submit" disabled={busy} className="w-full">
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>
            <div className="space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/onboarding" })}
                  className="h-11 w-full rounded-sm border border-line-strong text-sm hover:bg-fg/8"
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
        <p className="text-sm text-muted">
          <Link to="/forgot-password" className="text-accent underline-offset-4 hover:underline">
            Forgot password
          </Link>
          <span className="mx-2">·</span>
          <Link to="/signup" className="text-accent underline-offset-4 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
