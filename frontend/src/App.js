import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./shop";
import Cart from "./Cart";
import Login from "./login";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
