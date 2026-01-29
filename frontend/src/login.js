import { useState } from "react";
import axios from "axios";

export default function Login(){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const login = async ()=>{
    if(!email || !pass){
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login",{email,password:pass});
      localStorage.setItem("token",res.data.token);
      alert("Logged in!");
    }catch(err){
      setError(err.response?.data?.message || "Login failed");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div style={{textAlign:"center",marginTop:"50px"}}>
      {error && <div style={{color:"red",marginBottom:"10px"}}>{error}</div>}
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
      <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}/><br/>
      <button onClick={login} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  )
}
