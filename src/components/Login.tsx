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
      <div className="absolute inset-0 overflow-hidden z-[-1]">
        <div className="absolute h-40 w-40 rounded-full bg-red-500 blur-[100px] top-20 -left-20"></div>
        <div className="absolute h-40 w-40 rounded-full bg-blue-500 blur-[100px] bottom-0 -right-20"></div>
        <div className="absolute h-40 w-40 rounded-full bg-green-500 blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="z-10shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
