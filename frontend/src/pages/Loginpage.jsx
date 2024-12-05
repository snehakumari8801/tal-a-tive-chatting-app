// import React from "react";
// import { useState } from "react";
// import {useNavigate} from 'react-router'
// import axios from 'axios'

// function Loginpage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleSubmit() {
//     setLoading(true);
//     if (!email || !password) {
//       setError("Please fill all fields and upload a picture.");
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         config
//       );
//       console.log(data);
//       console.log("Login successfully");

//       localStorage.setItem("userInfo", JSON.stringify(data));

//       setLoading(false);
//        navigate.("/chats");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }

//     // Proceed with form submission logic
//     console.log("Form submitted", { email, password });
//     // Reset form after submission
//     setEmail("");
//     setPassword("");
//   }

//   return (
//     <div>
//       <div className="text-2xl flex flex-col">
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleSubmit}>submit</button>
//       </div>
//     </div>
//   );
// }

// export default Loginpage;






// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import axios from "axios";

// function Loginpage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleSubmit() {
//     setLoading(true);
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         config
//       );
//       console.log(data);
//       console.log("Login successful");

//       localStorage.setItem("userInfo", JSON.stringify(data));

//       setLoading(false);
//       navigate.("/chats");
//     } catch (error) {
//       console.log(error);
//       setError("Invalid email or password");
//       setLoading(false);
//     }

//     // Reset form after submission
//     setEmail("");
//     setPassword("");
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//     <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-2xl font-semibold text-gray-700 text-center">
//         Login
//       </h2>
//       {error && (
//         <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
//       )}
//       <div className="mt-6">
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
//         />

//         <button
//           onClick={handleSubmit}
//           className={`w-full mt-6 py-2 px-4 text-sm font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   </div>
//   );
// }

// export default Loginpage;






// import React from "react";
// import { useState } from "react";
// import {useNavigate} from 'react-router'
// import axios from 'axios'

// function Loginpage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleSubmit() {
//     setLoading(true);
//     if (!email || !password) {
//       setError("Please fill all fields and upload a picture.");
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         config
//       );
//       console.log(data);
//       console.log("Login successfully");

//       localStorage.setItem("userInfo", JSON.stringify(data));

//       setLoading(false);
//        navigate("/chats");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }

//     // Proceed with form submission logic
//     console.log("Form submitted", { email, password });
//     // Reset form after submission
//     setEmail("");
//     setPassword("");
//   }

//   return (
//     <div className="w-[100vw] overflow-hidden flex justify-center items-center mt-20">
//         <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
//          <h2 className="text-2xl font-semibold text-gray-700 text-center">
//            Login
//           </h2>
//          {error && (
//              <p className="text-red-500 text-sm mt-2 text-center">{error.message}</p>
//            )}
//            <div className="mt-6">
//            <input
//                type="text"
//                placeholder="Email"
//                value={email}
//                onChange={(e) => setEmail(e.target.value)}
//                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
//             />
    
//              <input
//                type="password"
//                placeholder="Password"
//                value={password}
//              onChange={(e) => setPassword(e.target.value)}
//              className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
//            /> 
//            {password === " " && <p>Password is required</p>}
    
//             <button
//               onClick={handleSubmit}
//               className={`w-full mt-6 py-2 px-4 text-sm font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none ${
//                 loading ? "opacity-50 cursor-not-allowed" : ""
//              }`}
//                disabled={loading}
//             >
//                {loading ? "Loading..." : "Submit"}
//                {error && <p>{error.message}</p>}
//            </button>
//          </div>
//         </div>
//        </div>
//   );
// }

// export default Loginpage;




import React, { useState } from "react";
import { useNavigate } from 'react-router';
import axios from 'axios';

function Loginpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  async function handleSubmit() {
    setLoading(true);
    setError(""); // Clear previous errors

    // Check if both fields are filled
    if (!email || !password) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Send login request to the backend
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      console.log("Login successful", data);

      // Store user info in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/chats"); // Redirect to the chats page

    } catch (error) {
      setLoading(false);

      // Check if the error response has a message
      const errorMessage = error.response && error.response.data.message
        ? error.response.data.message
        : "Something went wrong, please try again.";
      setError(errorMessage);
    }

    // Reset form fields after submission
    setEmail("");
    setPassword("");
  }

  return (
    <div className="w-[100vw] overflow-hidden flex justify-center items-center mt-20">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <div className="mt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          {/* Display password error */}

          <button
            onClick={handleSubmit}
            className={`w-full mt-6 py-2 px-4 text-sm font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;

