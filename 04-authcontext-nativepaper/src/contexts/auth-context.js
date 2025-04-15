import { createContext, useEffect, useState } from 'react';

// NAO FAZ PARTE DO CORE DO REACT-NATIVE E PRECISA SER INSTALADO A PARTE QUANDO QUEREMOS UTILIZAR;
import AsyncStorage from '@react-native-async-storage/async-storage';
// https://github.com/react-native-async-storage/async-storage/tree/main/packages/default-storage

const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // const storagedUser = AsyncStorage.getItem('@app:user');
        // if (storagedUser) {
        //     console.log({ storagedUser})
        //     // setUser(JSON.parse(storagedUser));
        // }
    }, []);

    useEffect(() => {
        // logica para quando o usuario for alterado / logar
    }, [user]);

    const login = (email, senha, cb) => {
        console.log({ email, senha})
        setUser({ email }, cb);
        // AsyncStorage.setItem('@app:user', JSON.stringify({ email }));
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };