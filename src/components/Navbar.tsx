import { AuthContext } from '@/libs/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useContext, useState } from 'react';
import { CiSearch, CiSquarePlus } from 'react-icons/ci';
import Modal from './Modal';
import Notification from './Notification';

interface NavbarProps {
  initialData: any;
}

const Navbar: FC<NavbarProps> = ({ initialData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const auth = useContext(AuthContext);
  console.log(auth?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    console.log(showPopup);

    setShowPopup(!showPopup);
  };
  return (
    <div className=" mb-5 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 border-b">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"
        aria-label="Global"
      >
        <Link href="/">
          <div className="flex items-center justify-center text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300">
            <span className="mr-2">📚</span> StudyHub
          </div>
        </Link>

        <div className="sm:order-3 flex items-center gap-x-2">
          <button
            type="button"
            onClick={toggleMenu}
            className="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 "
            aria-label="Toggle navigation"
          >
            <svg
              className={`hs-collapse-open:hidden flex-shrink-0 w-4 h-4 ${
                isOpen ? 'block' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              className={`hs-collapse-open:block hidden flex-shrink-0 w-4 h-4 ${
                isOpen ? '' : 'block'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6L18 18" />
            </svg>
          </button>

          <div
            className="hidden sm:block sm:flex items-center gap-5"
            // className={`${
            //   isOpen ? 'block' : 'hidden'
            // } sm:block sm:flex items-center gap-2`}
          >
            {/* Search Input */}
            <div className="flex items-center gap-5">
              <input
                type="text"
                placeholder="Search"
                className="py-2 px-3 w-[40vw] border border-gray-200 rounded-lg bg-gray-100 text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <CiSearch className="w-5 h-5 mx-2 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer text-gray-900 " />
            </div>

            {/* notification */}
            <Notification initialData={initialData} />

            {/* Open Modal */}
            <div className="" onClick={toggleModal}>
              <CiSquarePlus className="w-5 h-5 mx-2 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer text-gray-900 " />
            </div>

            {isModalOpen && <Modal onClose={toggleModal} />}

            {/* Conditional rendering based on authentication */}
            {auth?.user?.name == '' && (
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Button
              </button>
            )}
            {auth?.user?.name != '' && (
              <div className="flex gap-3 items-center">
                <Image
                  className="rounded-lg cursor-pointer"
                  width={30}
                  height={30}
                  src={auth?.user?.image || ''}
                  alt="image"
                  onClick={() => router.push('/profile')}
                />
                <button
                  onClick={auth.logout}
                  className="bg-blue-600 py-2 px-2 rounded-lg text-white"
                >
                  logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          id="navbar-alignment"
          className={`${
            isOpen ? 'block' : 'hidden'
          } hs-collapse sm:hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2`}
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <div className="flex items-center gap-5">
              <input
                type="text"
                placeholder="Search"
                className="py-2 px-3 flex-1 border border-gray-200 rounded-lg bg-gray-100 text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <CiSearch className="w-5 h-5 mx-2 hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer text-gray-900 " />
            </div>

            {/* Modification */}
            <div className="">
              <span className="relative">
                Notification
                <span className="bg-red-500 text-xs text-white absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 rounded-full">
                  1
                </span>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
