// import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './constants/routes';
import DarkModeToggle from './features/darkMode';

function App() {

  const user = {
    name: "Anthony"
  }

  return (
    <div className=" dark:bg-black dark:text-white">
      <ToastContainer />
      <RouterProvider router={routes(user)} />
      <DarkModeToggle isNotVisible />
    </div>
  )
}

export default App
