import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AuthModal() {
  const { user, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(isSignUp ? "Account created! Check your email." : "Logged in successfully!");
      setEmail("");
      setPassword("");
    }
  };

  if (user) {
    return (
      <div style={{ padding: "12px 16px", background: "#f3ecdd", border: "1px solid #e0a83e", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "14px", color: "#1e5040", fontWeight: "bold" }}>
          Active Session: {user.email}
        </span>
        <button onClick={() => signOut()} style={{ padding: "6px 14px", background: "#8b1e24", color: "white", border: 0, borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "white", border: "1px solid #e2e8f0", borderRadius: "14px", marginBottom: "20px" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#1e5040" }}>
        {isSignUp ? "Create CCD-HQ Account" : "Access Command Center"}
      </h3>
      <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 14px 0" }}>
        Authenticate with Supabase for persistent multi-tenant access.
      </p>

      {message && <p style={{ fontSize: "13px", color: "#8b1e24", fontWeight: "bold" }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ flex: 1, minWidth: "200px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ flex: 1, minWidth: "160px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          required
        />
        <button type="submit" style={{ padding: "8px 18px", background: "#1e5040", color: "white", border: 0, borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsSignUp(!isSignUp)}
        style={{ marginTop: "10px", background: "none", border: 0, color: "#1e5040", textDecoration: "underline", fontSize: "12px", cursor: "pointer" }}
      >
        {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
      </button>
    </div>
  );
}
