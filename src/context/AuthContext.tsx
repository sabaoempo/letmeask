import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){

  const[user, setUser] = useState<User>();

  function setUserData(user: any){
    if(user){
      const { displayName, photoURL, uid } = user
      if(!displayName || !photoURL){
        throw new Error('Sem informações da Conta Google')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserData(user);
    })

    //Toda vez que um event listener é declarado dentro do useEffect, é recomendado retornar algo para parar de escutar esse event listener
    return () => {
      unsubscribe();
    }

  }, [])

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    setUserData(result.user);
  }

  return(
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}