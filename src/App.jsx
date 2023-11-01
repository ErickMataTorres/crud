import Home from "./Components/Home";
import Navvar from "./Components/Navvar"
import { Routes, Route } from "react-router-dom";
import Sports from "./Components/Sports";



function App() {
  return (
    <>
      <Navvar></Navvar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Sports" element={<Sports></Sports>}></Route>
      </Routes>
    </>
  )
}

export default App
