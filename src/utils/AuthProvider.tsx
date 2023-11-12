import { createContext, useEffect, useState, ReactNode } from "react"; // Import ReactNode
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User, UserCredential } from "firebase/auth";
import app from "./firebase";

export const AuthContext = createContext<AuthInfo | undefined>(undefined); // Define the AuthInfo type

type AuthInfo = {
    user: User | null;
    loading: boolean;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
};

const auth = getAuth(app);

const AuthProvider = ({ children }: { children: ReactNode }) => { // Specify the ReactNode type for children
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }

    const signIn = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo: AuthInfo = {
        user,
        loading,
        createUser,
        signIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
