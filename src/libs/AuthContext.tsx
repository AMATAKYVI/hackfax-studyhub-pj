import { app, db } from '@/db/firebase.config';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  user?: UserType;
  login?: () => void;
  logout?: () => void;
  loading?: boolean;
}
interface UserType {
  uid: string;
  name: string;
  email: string;
  image: string;
}
export const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    uid: '',
    name: '',
    email: '',
    image: '',
  });
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          image: user.photoURL || '',
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = async () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        setUser({
          uid: result.user?.uid || '',
          name: result.user?.displayName || '',
          email: result.user?.email || '',
          image: result.user?.photoURL || '',
        });
        const docRef = doc(db, 'users', result.user?.uid);
        await setDoc(docRef, {
          uid: result.user?.uid,
          name: result.user?.displayName,
          email: result.user?.email,
          image: result.user?.photoURL,
        });
        setLoading(false);
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({ uid: '', name: '', email: '', image: '' });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [session, setSession] = useState<boolean>(false);
  const updateSession = () => {
    setSession(!session);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login: signInWithGoogle,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
