import Navbar from "./components/Navbar/Navbar"
import Main from "./components/Main/Main"
import { Routes, Route } from "react-router-dom"
import MainItem from "./components/Main/MainItem/MainItem"


function App() {

  return (
    <>
      <div className="container">
        <Navbar />
      </div>

        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/:id" element={<MainItem/>}/>
        </Routes>
      
    </>
  )
}

export default App
