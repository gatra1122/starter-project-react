import {usePageContext} from "../context/ContextPage.jsx";
import { useEffect } from "react";
import TabelContoh from "../components/tabel/TabelContoh.jsx";
import Paginasi from "../components/tabel/Paginasi.jsx";

export default function DataContoh(){
  const judulPage = "Data Contoh"
  const {title,setTitle,bread,setBread} = usePageContext();
  const breadcrumList = [
    {
        id: 1,
        name: "Dashboard",
        url: "/dashboard",
    },
    {
        id: 2,
      name: judulPage,
      url: "#",
  },
];

// Inisialisasi
  useEffect(() => {
    setTitle(judulPage)
    setBread(breadcrumList)
  }, [])

    return (
        <div className="animate-fade-down animate-duration-200">
            <div>
              <TabelContoh></TabelContoh>
            </div>
        </div>
    );
}

