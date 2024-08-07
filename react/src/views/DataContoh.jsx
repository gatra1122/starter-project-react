import axiosClient from "../axios-client.js";
import {usePageContext} from "../context/ContextPage.jsx";
import { useEffect, useState } from "react";
import { Card,Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
export default function DataContoh(){
  const judulPage = "Data Contoh"
  const {title,setTitle,bread,setBread} = usePageContext();
  const [isLoading, setIsLoading] = useState(false);
  const [mahasiswa, setmahasiswa] = useState([]);
  const breadcrumList = [
    {
        name: "Dashboard",
        url: "/dashboard",
    },
    {
      name: judulPage,
      url: "#",
  },
];

  useEffect(() => {
    setTitle(judulPage)
    setBread(breadcrumList)
    getDataContoh();
  }, [])

  const getDataContoh = () => {
    setIsLoading(true)
    axiosClient.get('/datacontoh')
    .then(({data}) => {
      setIsLoading(false)
      setmahasiswa(data.data)
    })
    .catch(() => {
      setIsLoading(false)
    })
  }

  debugger;
    return (
        <div className="animate-fade-down animate-duration-200">
            <div>
                <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    NO
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    ID
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    NAMA
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    NPM
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    FAKULTAS
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    SEMESTER
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    CREATED
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        {isLoading && (
                            <tbody>
                                <tr>
                                    <td colSpan={8} className="p-4"><Spinner className="animate-duration-1000"></Spinner></td>
                                </tr>
                            </tbody>
                        )}
                        <tbody>
                            {mahasiswa.map((u, index) => (
                                <tr
                                    key={u.id}
                                    className="even:bg-blue-gray-50/50"
                                >
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{u.id}</td>
                                    <td className="p-4">{u.nama}</td>
                                    <td className="p-4">{u.npm}</td>
                                    <td className="p-4">{u.fakultas}</td>
                                    <td className="p-4">{u.semester}</td>
                                    <td className="p-4">{u.created_at}</td>
                                    <td className="p-4 flex">
                                        <Link
                                            className="btn-edit flex"
                                            to={"/datacontoh/" + u.id}
                                        >
                                            <PencilSquareIcon className="mr-1 mt-0 w-5 h-5"></PencilSquareIcon>
                                        </Link>
                                        &nbsp;&nbsp;
                                        <button className="btn-delete flex">
                                            <TrashIcon className="mr-1 mt-0 w-5 h-5"></TrashIcon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}