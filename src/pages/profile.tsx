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
