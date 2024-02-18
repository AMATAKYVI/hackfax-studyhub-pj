import { FC } from 'react';
import Card from './Card';

interface RoomsProps {
  initialData: any;
}

const Rooms: FC<RoomsProps> = ({ initialData }: any) => {
  console.log(initialData);
  if (initialData?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-xl text-gray-700">No Room Available</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mx-10 mt-2 mb-2">
      {initialData?.map((data: any) => {
        return <Card key={data.uid} data={data} />;
      })}
    </div>
  );
};

export default Rooms;
