import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const register=(e)=>{
    e.preventDefault();
    API.post("/register.php",{name,email,password}).then(()=>{
      alert("Registered successfully");
      navigate("/");
    });
  };

  return (
    <form onSubmit={register}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button>Register</button>
    </form>
  );
}
