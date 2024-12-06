import "./App.css";
import './index.css';

import {  Routes, Route } from "react-router"; // Import Routes for v5
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import ProfileModal from "./components/miscellaneous/ProfileModal";
import MyChats from "./components/miscellaneous/MyChats";
import SearchDrawer from "./components/miscellaneous/SearchDrawer";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/chats" element={<Chatpage/>} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/signup" element={<Signuppage/>} />
          <Route path="/myprofile" element={<ProfileModal/>} />
          <Route path="/mychats" element={<MyChats/>}/>
      </Routes>
    </div>
  );
}

export default App;
