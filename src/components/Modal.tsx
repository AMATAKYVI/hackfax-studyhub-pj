import { AuthContext } from '@/libs/AuthContext';
import { FC, useContext, useEffect, useState } from 'react';
import { GoXCircle } from 'react-icons/go';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ModalProps {
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ onClose }) => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  // Close the modal when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    const modal = document.querySelector('.modal-content');
    if (modal && !modal.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const handleSubmit = async () => {
    const userInSession = false;
    /* Add your logic to check if the user is in a session */

    if (userInSession) {
      // Display an error message indicating that the user is already in a session
      console.log('User is already in a session');
      return;
    }
    const data = {
      title: title,
      description: description,
      session: true,
      poster: auth?.user?.uid,
      people: [auth?.user?.uid],
      img: auth?.user?.image,
      uid: auth?.user?.uid,
      location: location,
    };
    try {
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        toast.success('Session added successfully');
        onClose();
      } else {
        const data = await response.json();
        toast.error(data?.message);
        console.log(data);
        console.log('submit failed');
      }
    } catch (error) {
      toast.error('Session failed to add');
      console.log('error occur');
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full modal-content">
        {/* Modal content */}
        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Add Session</p>
            <GoXCircle
              onClick={() => onClose()}
              className="w-6 h-6 bg-gray-100 rounded-full transition duration-300 cursor-pointer text-gray-500 hover:text-gray-100 hover:bg-gray-600"
            />
          </div>
          <hr className="mb-2 mt-2" />
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-3 font-semibold mt-2">
              Subject
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              className="border py-3 px-2 rounded-lg bg-gray-100 focus:border-gray-600 focus:outline-none text-md text-gray-600"
              placeholder="Law, accounting, math..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-3 font-semibold mt-2">
              Location
            </label>
            <input
              type="text"
              name="Location"
              id="title"
              onChange={(e) => setLocation(e.target.value)}
              className="border py-3 px-2 rounded-lg bg-gray-100 focus:border-gray-600 focus:outline-none text-md text-gray-600"
              placeholder="Location..."
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-3 mt-3 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg bg-gray-100 py-3 px-4 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none text-md text-gray-600 placeholder-gray-400 resize-none"
              placeholder="Tell us more..."
            ></textarea>
          </div>
        </div>
        {/* Close button */}
        <div className="">
          <button
            onClick={handleSubmit}
            className="mt-5 bg-blue-200 hover:bg-blue-600 hover:text-white transition duration-300 text-gray-700 mb-2 font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer
        autoClose={1000}
        newestOnTop={true}
        hideProgressBar={true}
        className="z-10"
        position="top-center"
      />
    </div>
  );
};

export default Modal;
