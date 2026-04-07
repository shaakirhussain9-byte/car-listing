import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

import SignUp from "./Pages/SignUp"; 
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Hearder from "./Components/Hearder";
import Signing from "./Pages/Signing";

const App = () => {
  return (
    <>
    <Hearder />
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/Signup" element={<SignUp/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/Signing" element={<Signing/>} />
    </Routes>
   
    </>

  );
};

export default App;