import Footer from '@/components/Footer';
import LandingHeader from '@/components/LandingHeader';
import Loading from '@/components/Loading';
import Login from '@/components/Login';
import Navbar from '@/components/Navbar';
import Rooms from '@/components/Rooms';
import { db } from '@/db/firebase.config';
import { AuthContext } from '@/libs/AuthContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { Inter } from 'next/font/google';
import { useContext, useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function Home({ initialData }: any) {
  const auth = useContext(AuthContext);
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

  if (auth?.user?.uid == '') {
    return (
      <main className="relative">
        {/* login component */}
        {auth.loading && <Loading />}
        {!auth.loading && (
          <>
            <Login />
          </>
        )}
      </main>
    );
  }

  return (
    <main className="relative h-screen">
      <div className="absolute inset-0 overflow-hidden z-[-1]">
        <div className="absolute h-40 w-40 rounded-full bg-red-500 blur-[100px] top-20 -left-20"></div>
        <div className="absolute h-40 w-40 rounded-full bg-blue-500 blur-[100px] bottom-0 -right-20"></div>
        <div className="absolute h-40 w-40 rounded-full bg-green-500 blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <Navbar initialData={data} />
      <LandingHeader />
      <hr />
      <div className="text-xl font-semibold px-10 mb-4 mt-4 ">Session</div>
      <hr />
      <Rooms initialData={data} />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
