import { Input } from "@material-tailwind/react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
export default function Dashboard() {
  return (
      <div>
          <div className="capitalize">
              <nav aria-label="breadcrumb" className="mr-5 float-right w-max">
                  <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                      <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                          <a href="#/dashboard">
                              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                                  dashboard
                              </p>
                          </a>
                          <span className="text-blue-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                              /
                          </span>
                      </li>
                      <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              home
                          </p>
                      </li>
                  </ol>
              </nav>
              <h6 className="float-left block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900">
                  home
              </h6>
          </div>
      </div>
  );
}
