// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";

// function Signuppage() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setconfirmPassword] = useState("");
//   const [pic, setPic] = useState(null); // Initially null for better control
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(""); // To show error messages

//   function postDetails(e) {
//     const file = e.target.files[0]; // Access the selected file
//     if (!file) {
//       setError("Please select an image.");
//       return;
//     }
//     setError(""); // Reset error if a file is selected

//     if (
//       file.type === "image/jpeg" ||
//       file.type === "image/jpg" ||
//       file.type === "image/png"
//     ) {
//       const data = new FormData();
//       data.append("file", file); // Corrected to append the actual file
//       data.append("upload_preset", "Chatt_app"); // Correct upload preset name
//       data.append("cloud_name", "dze7es1fb"); // Your Cloudinary cloud name
//       setLoading(true);

//       fetch("https://api.cloudinary.com/v1_1/dze7es1fb/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url); // Use the response URL
//           console.log(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error(error);
//           setLoading(false);
//           setError("Failed to upload image.");
//         });
//     } else {
//       setError("Please select a valid image (JPEG/JPG/PNG only).");
//     }
//   }

//   async function handleSubmit() {
//     setLoading(true);
//     if (!name || !email || !password || !confirmpassword || !pic) {
//       setError("Please fill all fields and upload a picture.");
//       return;
//     }

//     if (password !== confirmpassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user",
//         { name, email, password, pic },
//         config
//       );
//       console.log(data);
//       console.log("Registeration successfully");

//       localStorage.setItem("userInfo", JSON.stringify(data));

//       setLoading(false);
//       // navigate.("/chats");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }

//     // Proceed with form submission logic
//     console.log("Form submitted", { name, email, password, pic });
//     // Reset form after submission
//     setName("");
//     setEmail("");
//     setPassword("");
//     setconfirmPassword("");
//     setPic(null);
//   }

//   return (
//     <div>
//       <div className="text-2xl flex flex-col">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmpassword}
//           onChange={(e) => setconfirmPassword(e.target.value)}
//         />
//         <input
//           type="file"
//           placeholder="Upload your picture"
//           onChange={postDetails}
//         />
//         {pic && (
//           <img
//             src={pic}
//             alt="Uploaded"
//             style={{ height: "150px", width: "150px" }}
//           />
//         )}
//         {error && <div style={{ color: "red" }}>{error}</div>}{" "}
//         {/* Display error messages */}
//         <button onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Signuppage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Signuppage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function postDetails(e) {
    const file = e.target.files[0];
    if (!file) {
      setError("Please select an image.");
      return;
    }
    setError("");

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Chatt_app");
      data.append("cloud_name", "dze7es1fb");
      setLoading(true);

      fetch("https://api.cloudinary.com/v1_1/dze7es1fb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to upload image.");
        });
    } else {
      setError("Please select a valid image (JPEG/JPG/PNG only).");
    }
  }

  async function handleSubmit() {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword || !pic) {
      setError("Please fill all fields and upload a picture.");
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      console.log("Registration successful");
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("An error occurred. Please try again.");
    }

    setName("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
    setPic(null);
  }

  return (
    <div className="flex justify-center items-center w-[100vw] mt-10 scrollbar-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="file"
            placeholder="Upload your picture"
            onChange={postDetails}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {pic && (
            <div className="mt-4">
              <img
                src={pic}
                alt="Uploaded"
                className="rounded-full mx-auto"
                style={{ height: "150px", width: "150px" }}
              />
            </div>
          )}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
