import { AuthContext } from '@/libs/AuthContext';
import Image from 'next/image';
import { FC, useContext } from 'react';

interface UserProfileProps {}

const UserProfile: FC<UserProfileProps> = ({}) => {
  const auth = useContext(AuthContext);
  return (
    <div className="bg-white border-t-3 shadow-xl border-t-green-400 mt-20 mx-20 py-8 px-6 flex flex-col items-center rounded-lg shadow-md relative backdrop-filter backdrop-blur-lg bg-opacity-70">
      {/* Blurry dots */}

      <div className="border border-t-2 px-10 py-5 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {auth?.user?.name}&apos;s Profile
        </h2>
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={auth?.user?.image || ''}
            alt="profile"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p className="text-md text-gray-700">
              Username: {auth?.user?.name}
            </p>
            <p className="text-md text-gray-700">Email: {auth?.user?.email}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-gray-200 bg-opacity-40 backdrop-blur-md px-6 py-8 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Innovation: Revolutionizing Collaborative Learning
        </h3>
        <p className="text-md text-gray-700">
          Our study hub session platform goes beyond traditional study groups.
          By leveraging cutting-edge technologies and innovative features,
          we&apos;re transforming the way students collaborate and learn
          together. With real-time collaboration tools, seamless communication
          channels, and personalized study recommendations, we&apos;re
          empowering students to achieve academic success like never before.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
