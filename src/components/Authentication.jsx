import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication(props) {
    const { handleCloseModal } = props;
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);
    const { signup, login } = useAuth();

    async function handleAuthenticate() {
        if (
            !email ||
            !email.includes("@") ||
            !password ||
            password.length < 6 ||
            isAuthenticating
        ) {
            return;
        }
        try {
            setIsAuthenticating(true);
            setError(null);
            if (isRegistration) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
            handleCloseModal();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAuthenticating(false);
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div>
                <h2 className="font-display text-2xl font-bold text-stone-100">
                    {isRegistration ? "Create account" : "Welcome back"}
                </h2>
                <p className="text-stone-400 text-sm mt-1">
                    {isRegistration ? "Sign up to track your caffeine." : "Sign in to continue."}
                </p>
            </div>
            {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-circle-exclamation" aria-hidden />
                    {error}
                </div>
            )}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                autoComplete="email"
                className="input-field"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password (6+ characters)"
                autoComplete={isRegistration ? "new-password" : "current-password"}
                className="input-field"
            />
            <button
                type="button"
                onClick={handleAuthenticate}
                disabled={isAuthenticating}
                className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {isAuthenticating ? (
                    <>
                        <span className="inline-block w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" aria-hidden />
                        Signing in…
                    </>
                ) : (
                    "Continue"
                )}
            </button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-stone-800/60 px-3 text-stone-500">
                        {isRegistration ? "Already have an account?" : "New here?"}
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={() => setIsRegistration(!isRegistration)}
                className="btn-ghost w-full justify-center"
            >
                {isRegistration ? "Sign in instead" : "Create an account"}
            </button>
        </div>
    );
}
