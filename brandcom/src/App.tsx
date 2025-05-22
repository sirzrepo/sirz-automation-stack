// import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './constants/routes';
import DarkModeToggle from './features/darkMode';

function App() {

  const user = {
    name: "Mhatons"
  }

  return (
    <div className="">
      <ToastContainer />
      <RouterProvider router={routes(user)} />
      <DarkModeToggle isNotVisible />
    </div>
  )
}

export default App
