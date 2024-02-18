import { AuthContext } from '@/libs/AuthContext';
import { FC, useContext } from 'react';
import LoginForm from './LoginForm';
interface LoginProps {}
//  <div className="flex justify-center items-center w-full h-full">
//       <div
//         onClick={auth.login}
//         className="flex flex-col items-center hover:bg-gray-100 transition duration-300 py-2 px-2 cursor-pointer rounded-lg"
//       >
//         <FaGoogle className="w-10 h-10" />
//         <span>Sign In</span>
//       </div>
//     </div>
const Login: FC<LoginProps> = ({}) => {
  const auth = useContext(AuthContext);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-[-1]">
        <div className="absolute top-10 w-40 h-40 bg-blue-500 rounded-full blur-xl opacity-50"></div>
        <div className="absolute left-0 w-40 h-40 bg-red-500 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-0 w-40 h-40 bg-red-500 rounded-full blur-xl opacity-50"></div>
      </div>
      <div className="z-10shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
