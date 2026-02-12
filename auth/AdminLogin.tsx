import React, { useState } from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { getAdmins } from "../storage/authStorage";

export function AdminLogin(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAdmin } = useAuthSession();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const admins = getAdmins();
    const foundAdmin = admins.find(
      (admin) => admin.email === email.trim() && admin.password === password,
    );

    if (!foundAdmin) {
      setError("Invalid admin email or password.");
      return;
    }

    loginAdmin(foundAdmin);
    setError("");
    console.log("LOGIN SUCCESS:", foundAdmin.name, "as", foundAdmin.role);
    window.location.href = "/";
  };

  return (
    <section style={cardStyle}>
      <h2 style={{ marginTop: 0, color: "#0a1f44" }}>Admin Login</h2>
      <p style={hintStyle}>
        Bank staff sign in with work credentials. Roles decide what each staff member can access.
      </p>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            style={inputStyle}
          />
        </label>
        {error ? <p style={errorStyle}>{error}</p> : null}
        <button type="submit" style={buttonStyle}>
          Sign In as Admin
        </button>
      </form>
      <p style={hintStyle}>Demo: super@psifederal.com / 1234</p>
    </section>
  );
}

const cardStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #d0d7de",
  borderRadius: "12px",
  padding: "1rem",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.75rem",
  fontWeight: 700,
  color: "#0a1f44",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "0.35rem",
  padding: "0.6rem",
  borderRadius: "8px",
  border: "1px solid #d0d7de",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem",
  border: "none",
  borderRadius: "8px",
  fontWeight: 700,
  cursor: "pointer",
  background: "#0a1f44",
  color: "white",
};

const hintStyle: React.CSSProperties = {
  color: "#4b5563",
  fontSize: "0.9rem",
};

const errorStyle: React.CSSProperties = {
  color: "#b91c1c",
  fontWeight: 700,
  fontSize: "0.9rem",
};
