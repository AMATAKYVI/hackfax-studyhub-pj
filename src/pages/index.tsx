import Footer from '@/components/Footer';
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
      <Navbar initialData={data} />
      <Rooms initialData={data} />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </main>
  );
}
