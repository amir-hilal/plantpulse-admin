import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
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
          <label>Email</label>
          <input
            type="email"
            className="p-inputtext w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
