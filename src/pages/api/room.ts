import { db } from '@/db/firebase.config';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;
    const roomRef = collection(db, 'rooms');
    const q = query(roomRef, where('uid', '==', data.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size >= 1) {
      res.status(400).json({ message: 'User already in a session' });
    } else {
      const docRef = await setDoc(doc(db, 'rooms', data.uid), data);
      res.status(200).json({
        message: 'Form submitted successfully',
      });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
