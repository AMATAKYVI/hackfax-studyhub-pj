import { AuthContext } from '@/libs/AuthContext';
import { FC, useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const auth = useContext(AuthContext);
  return (
    <div className="border z-10 flex justify-center items-center h-screen">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex mb-5 items-center justify-center text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300">
          <span className="mr-2">📚</span> StudyHub
        </div>{' '}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <hr className="mb-4" />
        <div className="mb-2 gap-2 flex items-center justify-between">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Login
          </button>
          <button
            className=" flex-1 text-gray-700 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
        </div>
        <hr className="mb-3" />
        <div className="">
          <div
            onClick={auth.login}
            className="w-fit hover:bg-gray-100 mx-auto mt-2 border items-center  transition duration-300 py-2 px-2 cursor-pointer rounded-lg"
          >
            <FaGoogle className="w-5 h-5 hover:bg-gray-100" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
