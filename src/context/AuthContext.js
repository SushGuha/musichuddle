import { useContext,createContext, useEffect ,useState} from "react";
import {GoogleAuthProvider, signInWithPopup ,signOut,signInWithRedirect,onAuthStateChanged} from "firebase/auth";
import {auth} from '../firebase/config';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState({});
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
            alert("error with Google Login.");
          });
      };
     const logout = () => {
        signOut(auth);
     }
     useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
        });
        return () => {
            unsub();
        }
     },[]) 
    return (
        <AuthContext.Provider value = {{googleSignIn,logout,user}}>
            {children}
        </AuthContext.Provider>
    )
}

 export const UserAuth = () => {
    return useContext(AuthContext);
}