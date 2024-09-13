import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email_or_username, setEmailOrUsername] = useState('');  // New state to accept either email or username
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email_or_username, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/');  // Redirect to homepage/dashboard upon successful login
      }
    });
  };

  return (
    <div className="flex justify-content-center align-items-center vh-100">
      <form className="p-4 border-round shadow-2 surface-card" onSubmit={handleSubmit}>
        <h2 className="text-center">Login</h2>
        <div className="mb-3">
          <label>Email or Username</label>
          <input
            type="text"
            className="p-inputtext w-full"
            value={email_or_username}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="p-inputtext w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="p-button w-full" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
