import React from "react";
import Loginpage from "./Loginpage";
import Signuppage from "./Signuppage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Homepage() {
  const [isLogin, setIslogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(user);

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <div>
      <div className=" flex justify-center items-center flex-col mt-8 ">
      <div className="flex gap-4 ">
          <button
            className="border-2 border-gray-400 w-20 h-8 rounded-2xl text-black cursor-pointer"
            onClick={() => setIslogin(true)}
          >
            Login
          </button>
          <button
            className="border-2 border-gray-400  w-20 h-8 rounded-2xl text-black cursor-pointer"
            onClick={() => setIslogin(false)}
          >
            Sign up
          </button>
        </div>
     
        {isLogin ? <Loginpage /> : <Signuppage />}
      </div>

   
    </div>
  );
}

export default Homepage;
