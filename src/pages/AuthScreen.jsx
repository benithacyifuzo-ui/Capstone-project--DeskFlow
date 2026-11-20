
import { useState } from "react";
import {
    Headset,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Mail,
    Lock,
    UserRound,
    Eye,
    EyeOff,
} from "lucide-react";
import "./AuthScreen.css";

function getSavedAccounts() {
    const savedAccounts = localStorage.getItem("deskflow-accounts");

    if (savedAccounts) {
        try {
            return JSON.parse(savedAccounts);
        } catch {
            return [];
        }
    }

    // Preserve the account from the previous DeskFlow version.
    const oldAccount = localStorage.getItem("deskflow-demo-account");

    if (oldAccount) {
        try {
            const account = JSON.parse(oldAccount);

            const migratedAccount = {
                id: "admin-legacy",
                name: account.name,
                email: account.email,
                password: account.password,
                role: "admin",
                active: true,
            };

            localStorage.setItem(
                "deskflow-accounts",
                JSON.stringify([migratedAccount])
            );

            return [migratedAccount];
        } catch {
            return [];
        }
    }

    return [];
}

function AuthScreen({ onAuthenticated }) {
    const [accounts] = useState(getSavedAccounts);
    const [screen, setScreen] = useState("welcome");
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const needsAdminSetup = accounts.length === 0;

    function openScreen(nextScreen) {
        setMessage("");
        setEmail("");
        setPassword("");
        setName("");
        setShowPassword(false);
        setScreen(nextScreen);
    }

    function handleAdminSetup(event) {
        event.preventDefault();
        setMessage("");

        const adminAccount = {
            id: `admin-${Date.now()}`,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
            role: "admin",
            active: true,
        };

        const updatedAccounts = [adminAccount];

        localStorage.setItem(
            "deskflow-accounts",
            JSON.stringify(updatedAccounts)
        );

        onAuthenticated(adminAccount);
    }

    function handleLogin(event) {
        event.preventDefault();
        setMessage("");

        const account = accounts.find(
            (savedAccount) =>
                savedAccount.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (!account || account.password !== password) {
            setMessage("Incorrect email or password. Please try again.");
            return;
        }

        if (account.active === false) {
            setMessage("This account has been deactivated. Contact your administrator.");
            return;
        }

        onAuthenticated(account);
    }

    return (
        <div className="auth-page">
            <div className="auth-decoration decoration-one"></div>
            <div className="auth-decoration decoration-two"></div>
            <div className="auth-decoration decoration-three"></div>

            <div className="auth-topbar">
                <div className="auth-brand">
                    <div className="auth-brand-icon">
                        <Headset size={25} />
                    </div>
                    <span>DeskFlow</span>
                </div>

                <div className="auth-top-link">
                    {screen === "welcome" ? (
                        <>
                            Already have an account?
                            <button onClick={() => openScreen("login")}>
                                Log in
                            </button>
                        </>
                    ) : (
                        <button onClick={() => openScreen("welcome")}>
                            Back to home
                        </button>
                    )}
                </div>
            </div>

            <div className="auth-content">
                <section className="auth-intro">
                    <span className="auth-eyebrow">
                        <Sparkles size={15} />
                        YOUR SUPPORT WORKSPACE
                    </span>

                    <h1>
                        Better support.
                        <br />
                        <span>Beautifully organized.</span>
                    </h1>

                    <p>
                        Bring your support requests, track progress, and keep
                        everything moving with DeskFlow.
                    </p>

                    <div className="auth-benefits">
                        <div>
                            <span><ShieldCheck size={19} /></span>
                            <p>Stay organized and in control</p>
                        </div>

                        <div>
                            <span><Sparkles size={19} /></span>
                            <p>Manage every ticket in one place</p>
                        </div>

                        <div>
                            <span><Headset size={19} /></span>
                            <p>Make support feel effortless</p>
                        </div>
                    </div>
                </section>

                <section className="auth-card">
                    {screen === "welcome" && (
                        <div className="auth-welcome">
                            <div className="auth-card-icon">
                                <Headset size={34} />
                            </div>

                            <span className="auth-small-label">
                                WELCOME TO DESKFLOW
                            </span>

                            <h2>Your workspace starts here.</h2>

                            <p>
                                Sign in to manage your support workspace.
                                {needsAdminSetup
                                    ? " Set up your administrator account to get started."
                                    : " Access your account and continue working."}
                            </p>

                            <button
                                className="auth-main-button"
                                onClick={() =>
                                    openScreen(needsAdminSetup ? "setup" : "login")
                                }
                            >
                                {needsAdminSetup ? "Set Up Administrator" : "Get Started"}
                                <ArrowRight size={19} />
                            </button>

                            {!needsAdminSetup && (
                                <>
                                    <div className="auth-divider">
                                        <span>OR</span>
                                    </div>

                                    <button
                                        className="auth-outline-button"
                                        onClick={() => openScreen("login")}
                                    >
                                        I already have an account
                                    </button>
                                </>
                            )}

                            <div className="auth-card-footer">
                                <ShieldCheck size={15} />
                                Your workspace, all in one place.
                            </div>
                        </div>
                    )}

                    {screen === "setup" && needsAdminSetup && (
                        <div>
                            <span className="auth-small-label">
                                ADMINISTRATOR SETUP
                            </span>

                            <h2>Create your administrator account</h2>

                            <p className="auth-form-description">
                                This first account will manage the DeskFlow workspace.
                            </p>

                            <form onSubmit={handleAdminSetup}>
                                <label>Full name</label>
                                <div className="auth-input-wrap">
                                    <UserRound size={18} />
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <label>Email address</label>
                                <div className="auth-input-wrap">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <label>Password</label>
                                <div className="auth-input-wrap">
                                    <Lock size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength={6}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {message && <p className="auth-error">{message}</p>}

                                <button type="submit" className="auth-main-button">
                                    Create Administrator Account
                                    <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>
                    )}

                    {screen === "login" && (
                        <div>
                            <span className="auth-small-label">WELCOME BACK</span>

                            <h2>Log in to DeskFlow</h2>

                            <p className="auth-form-description">
                                Enter your account details to access your workspace.
                            </p>

                            <form onSubmit={handleLogin}>
                                <label>Email address</label>
                                <div className="auth-input-wrap">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <label>Password</label>
                                <div className="auth-input-wrap">
                                    <Lock size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {message && <p className="auth-error">{message}</p>}

                                <button type="submit" className="auth-main-button">
                                    Log In <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>
                    )}
                </section>
            </div>

            <footer className="auth-footer">
                © 2026 DeskFlow. Support made simple.
            </footer>
        </div>
    );
}

export default AuthScreen;
