import React, { useState, useEffect } from "react";
import TextField from "./TextField";
import CommonButton from "./CommonButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter} from "next/navigation";
const AdminLogin = () => {

    
  const router = useRouter();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;

  const handleEmailChange = (value) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      email: value,
    }));
  };

  const handlePasswordChange = (value) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      password: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/auth",
        {
          username: email,
          password: password,
        }
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        console.log("Login successful");
        console.log(response.data);
        router.push("/admin/dashboard");
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      // Handle error
      toast.error(error.response.data.message);
      console.error("Login failed:", error.response.data.message);
    }
  };
  return (
    <div className="p-5 rounded Admin-LoginIn-Container">
      <form onSubmit={handleSubmit}>
        <h2 className="d-flex align-items-center mb-4">Login Here</h2>
        <hr />
        <div className="d-flex flex-column gap-3">
          <TextField
            type="text"
            value={email}
            placeholder="Email"
            label="Email"
            onChange={handleEmailChange}
            width={"100%"}
            // disable={true}
          />

          <TextField
            type={"password"}
            value={password}
            placeholder="Password"
            label="Password"
            onChange={handlePasswordChange}
            width={"100%"}
          />

          <div className="d-flex mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                // checked={isChecked}
                // onChange={() => setIsChecked(!isChecked)}
              />
              <label className="form-check-label fw-bold" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
          </div>
        </div>
        <hr />
        <CommonButton text={"Login"} width={"100%"} />
      </form>
    </div>
  );
};

export default AdminLogin;
