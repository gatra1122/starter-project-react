import {createContext, useContext, useState} from "react";

const PageContext = createContext({
    title: null,
    bread: null,
    setTitle: () => {},
    setBread: () => {},
})

export const ContextPage = ({children}) => {
  const [title, setTitle] = useState('');
  const [bread, setBread] = useState([]);

  return (
    <PageContext.Provider value={{
      title,
      setTitle,
      bread,
      setBread
    }}>
      {children}
    </PageContext.Provider>
  );
}

export const usePageContext = () => useContext(PageContext);