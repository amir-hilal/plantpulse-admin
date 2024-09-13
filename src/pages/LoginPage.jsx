import React, { useState } from 'react';
import Loading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo_black.png';
import { loginUser } from '../redux/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email_or_username: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/'); // Redirect to homepage/dashboard upon successful login
      }
    });
  };

  return (
    <div className="w-screen h-30rem flex flex-column justify-content-center align-items-center">
      <img
        src={logo}
        alt="PlantPulse"
        className="logo mb-6 cursor-pointer"
        onClick={() => navigate('/')}
      />{' '}
      <div className=" flex flex-column align-items-center bg-tint-5 border-round-3xl w-9 md:w-6 lg:w-4 p-4">
        <div className="flex flex-column align-items-center w-10">
          <h2 className="text-center text-secondary">Admin PlantPulse</h2>
        </div>
        <form className="formgrid grid w-12 md:w-10" onSubmit={handleSubmit}>
          <div className="field col-12 flex p-0">
            <input
              type="text"
              name="email_or_username"
              placeholder="Email or Username"
              value={formData.email_or_username}
              onChange={handleChange}
              required
              className="h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
            />
          </div>
          <div className="field col-12 flex p-0">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className=" h-3rem text-xs md:text-base text-color bg-tint-5 p-3 border-1 border-solid border-400 border-round-lg appearance-none outline-none focus:border-primary w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary border-round-lg border-none p-3 h-3rem  text-xs md:text-base w-full flex align-items-center justify-content-center cursor-pointer"
          >
            {loading ? (
              <Loading type="spin" color="#fff" height={15} width={15} />
            ) : (
              'Login'
            )}
          </button>{' '}
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
