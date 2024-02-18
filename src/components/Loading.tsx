import { FC } from 'react';
interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;
