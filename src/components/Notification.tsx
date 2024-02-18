import Image from 'next/image';
import { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';

interface NotificationProps {
  initialData: any;
}

const Notification = ({ initialData }: NotificationProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide the popup after 2 seconds
  };

  return (
    <div className="relative">
      <IoMdNotificationsOutline
        className="w-5 h-5 mx-2 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer text-gray-900"
        onClick={togglePopup}
      />
      {showPopup && (
        <div className="absolute w-[200px] top-full right-0 mt-2 p-2 bg-gray-100 shadow-md rounded-md max-h-60 overflow-y-auto">
          {/* Popup content */}
          {initialData?.map((data: any) => (
            <div key={data.uid} className="mb-2 flex items-center gap-2">
              <Image
                className="rounded-lg"
                src={data.img}
                alt="Profile"
                width={20}
                height={20}
              />
              <div>
                <p className="text-xs font-semibold text-gray-600 ">
                  Session: {data.title}
                </p>
                <p className="text-xs text-gray-500">{data.description}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
      <span className="bg-red-500 text-xs text-white absolute top-0 right-2 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 rounded-full">
        {initialData?.length || 0}
      </span>
    </div>
  );
};

export default Notification;
