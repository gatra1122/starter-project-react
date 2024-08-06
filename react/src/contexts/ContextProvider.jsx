import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

const fetchData = async () => {

    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    //fetch user from Rest API
    await axios.get('http://localhost:8000/api/user')
    .then((response) => {

        //set response user to state
        user = response.data;
        setUser(response.data);
    })
}

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    // localStorage.getItem('ACCESS_TOKEN')

    const setToken = (token) => {
        _setToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return(
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);