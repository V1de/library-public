import React from 'react';
import { GrClose } from 'react-icons/gr';
import { toast } from 'react-toastify';
import ApiService from '../../helpers/api-helpers';
const usersApi = new ApiService('users/register');

const SignUpForm = ({ handleClose, setIsRegistered }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    usersApi
      .createItem({ username: e.target.username.value, email: e.target.email.value, password: e.target.password.value })
      .then(() => {
        toast.success('You successfully registered. Follow next steps on your email!');
        setIsRegistered(true);
      })
      .catch();
  };

  return (
    <div className="w-full">
      <div className="flex w-[220px] sm:w-[350px] justify-between mb-4 font-bold text-lg underline">
        <div>Registration</div>
        <GrClose onClick={() => handleClose()} size={20} className="cursor-pointer" />
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid font-semibold">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            className="mb-2 py-1 px-2 font-normal border-2 border-gray-300 rounded-lg"
          />
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
            value="Sign up"
            className="w-full bg-blue-200 mx-auto my-4 py-1 font-semibold border-2 border-blue-300 rounded-lg cursor-pointer"
          />
        </div>
      </form>
      <div className="text-end">
        <a onClick={() => setIsRegistered(true)} className="underline">
          Already registered?
        </a>
      </div>
    </div>
  );
};

export default SignUpForm;
