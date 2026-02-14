import React, { useState } from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { getCustomers } from "../storage/authStorage";

export function CustomerLogin(): React.ReactElement {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginCustomer } = useAuthSession();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const customers = getCustomers();
    const inputAcc = accountNumber.trim();
    const foundCustomer = customers.find(
      (customer) =>
        (customer.accountNumber === inputAcc || customer.accountNumber === `ACCT-${inputAcc}`) &&
        customer.password === password,
    );

    if (!foundCustomer) {
      setError("Invalid account number or password.");
      return;
    }

    loginCustomer(foundCustomer);
    setError("");
    console.log("MEMBER LOGIN:", foundCustomer.fullName);
    window.location.href = "/";
  };

  return (
    <section style={cardStyle}>
      <h2 style={{ marginTop: 0, color: "#0a1f44" }}>Customer Login</h2>
      <p style={hintStyle}>
        Members use account credentials to access only their own banking information.
      </p>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Account Number
          <input
            type="text"
            value={accountNumber}
            onChange={(event) => setAccountNumber(event.target.value)}
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
          Sign In as Customer
        </button>
      </form>
      <p style={hintStyle}>Demo: 1002003001 / 1234</p>
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
