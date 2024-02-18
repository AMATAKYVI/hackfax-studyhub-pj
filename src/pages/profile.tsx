import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import UserProfile from '@/components/UserProfile';
import { db } from '@/db/firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
interface ProfileProps {}

const Profile: FC<ProfileProps> = ({ initialData }: any) => {
  const [data, setData] = useState<any>(initialData);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const newData: any = [];
      snapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 overflow-hidden z-[-1]">
        <div className="absolute h-40 w-40 rounded-full bg-red-500 blur-[100px] top-20 -left-20"></div>
        <div className="absolute h-40 w-40 rounded-full bg-blue-500 blur-[100px] bottom-0 -right-20"></div>
        <div className="absolute h-40 w-40 rounded-full bg-green-500 blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <Navbar initialData={data} />
      <div className="mt-5">
        <UserProfile />
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
