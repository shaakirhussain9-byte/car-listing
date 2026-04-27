import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

import SignUp from "./Pages/SignUp"; 
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Hearder from "./Components/Hearder";
import Signing from "./Pages/Signing";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing.jsx";

const App = () => {
  return (
    <>
    <Hearder />
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route path="/sign-up" element={<SignUp/>} />
         <Route path="/sign-in" element={<Signing />} />
      <Route path="/about" element={<About/>} />
    
         <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing/>}
          />
        </Route>
      <Route path="/signin" element={<Signing/>} />
      
    </Routes>
   
    </>

  );
};

export default App;