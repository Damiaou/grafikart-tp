import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { ApiError, apiFetch } from "../utils/api";

export default function LoginForm({ onConnect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async function (e) {
    setLoading(true);
    setError(null);
    e.preventDefault();
    const data = new FormData(e.target);
    try {
        const user = await apiFetch ('login', {
            method:'POST',
            body:data
        });
        onConnect(user);
    } catch (e) {
        if (e instanceof ApiError) {
            setError(e.errors[0].message);
        } else {
            console.error(e);
        }
        setLoading(false);
    }

    
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      {error && <Alert>{error}</Alert>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          required
        />
      </div>
      <Button type='submit' loading={loading}>Login</Button>
    </form>
  );
}

LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

function Alert({ children }) {
  return <div className="alert alert-danger">{children}</div>;
}
