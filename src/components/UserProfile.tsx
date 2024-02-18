import { AuthContext } from '@/libs/AuthContext';
import Image from 'next/image';
import { FC, useContext } from 'react';
interface UserProfileProps {}

const UserProfile: FC<UserProfileProps> = ({}) => {
  const auth = useContext(AuthContext);
  return (
    <div className=" bg-white shadow-md rounded-lg p-6 max-w-xs mx-auto">
      <div className="flex items-center justify-center">
        <Image
          width={40}
          height={40}
          className="h-24 w-24 rounded-full object-cover"
          src={auth?.user?.image || ''}
          alt="User Profile"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {auth?.user?.name}
        </h2>
        <p className="text-gray-600">{auth?.user?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
