import React from 'react';
import { GrClose } from 'react-icons/gr';
import ApiService from '../../helpers/api-helpers';
import { toast } from 'react-toastify';
const authApi = new ApiService('auth/login');

const SignInForm = ({ handleClose }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    authApi
      .createItem({ username: e.target.email.value, password: e.target.password.value })
      .then((res) => {
        localStorage.setItem('token', 'Bearer ' + res.token);
        handleClose();
        window.location.reload();
      })
      .catch((err) => toast.error('Invalid credentials'));
  };

  return (
    <div className="w-full">
      <div className="flex w-[220px] sm:w-[350px] justify-between mb-4 font-bold text-lg underline">
        <div>Authorization</div>
        <GrClose onClick={() => handleClose()} size={20} className="cursor-pointer" />
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid font-semibold">
          <label>Email</label>
          <input
            type="text"
            name="email"
            required
            className="mb-2 py-1 px-2 font-normal border-2 border-gray-300 rounded-lg"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            className="mb-2 py-1 px-2 font-normal border-2 border-gray-300 rounded-lg"
          />
        </div>
        <div className="w-full">
          <input
            type="submit"
            value="Authorize"
            className="w-full bg-green-300 mx-auto my-4 py-1 font-semibold border-2 border-green-400 rounded-lg cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
