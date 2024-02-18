import { db } from '@/db/firebase.config';
import { AuthContext } from '@/libs/AuthContext';
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { RxCircleBackslash } from 'react-icons/rx';

interface CardProps {
  data: any;
}
/**
 * img who posting it? uid?
 * Title of study? Accounting Computer Science Math
 * Description of the study 3 - 4 sentences
 * Look people up current in the session
 * */
const Card: FC<CardProps> = ({ data }) => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState<any>([]);
  console.log(data);
  const joinSession = async () => {
    try {
      const docRef = doc(db, 'rooms', data.uid);
      await updateDoc(docRef, {
        people: arrayUnion(auth?.user?.uid),
      });
      localStorage.setItem('session', 'true');
    } catch (error) {}
    console.log('current user ' + auth?.user?.uid);
    console.log(data);
  };
  const endSession = async () => {
    try {
      if (data?.uid === auth?.user?.uid) {
        await deleteDoc(doc(db, 'rooms', data?.uid));
      }
      const userSession = localStorage.setItem('session', 'false');
      const docRef = doc(db, 'rooms', data.uid);
      await updateDoc(docRef, {
        people: data?.people.filter(
          (person: string) => person !== auth?.user?.uid
        ),
      });
    } catch (error) {}
  };
  const peopleInSession = async () => {
    try {
      data?.people.forEach(async (userId: any) => {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('uid', '==', userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc: any) => {
          setUsers((prev: any) => [...prev, doc.data()]);
        });
      });
    } catch (error) {}
    console.log('people in session');
  };
  //   console.log(auth?.user);
  return (
    <div className="border  rounded-lg flex flex-col p-5">
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <Image
            className="rounded-lg"
            src={data?.img}
            width={35}
            height={35}
            alt="Profile"
          />
        </div>
        {data?.uid === auth?.user?.uid ||
        data?.people.includes(auth?.user?.uid) ? (
          <div
            onClick={() => endSession()}
            className="bg-red-200 text-sm cursor-pointer hover:bg-gray-600 hover:text-white transition duration-300   flex items-center px-2 py-2 rounded text-gray-900 gap-2 shadow-sm"
          >
            <RxCircleBackslash />
            <button className="">End Session</button>
          </div>
        ) : (
          <div
            onClick={() => joinSession()}
            className="bg-green-200 text-sm cursor-pointer hover:bg-gray-600 hover:text-white transition duration-300   flex items-center px-2 py-2 rounded text-gray-900 gap-2 shadow-sm"
          >
            <IoCheckmark />
            <button className="">Join Session</button>
          </div>
        )}
      </div>
      <div className="font-medium mb-2">{data?.title}</div>
      <div className="font-semibold text-xs flex justify-between pr-5 text-gray-500">
        <p className="">Location:</p>
        <p>{data?.location || 'asdasd'}</p>
      </div>
      <div className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
        {data?.description.substring(0, 100)}...
      </div>
      <div
        onClick={() => peopleInSession()}
        className="px-5 cursor-pointer hover:bg-gray-600 transition duration-300 hover:text-white mt-[16px] p-[8px] flex border rounded-md shadow-sm justify-center gap-2 items-center"
      >
        <button className="text-sm font-semibold relative">People</button>
        <div className="transform  w-4 h-4 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">
          {data?.people.length}
        </div>
      </div>
    </div>
  );
};

export default Card;
