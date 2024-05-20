import React from 'react'
import { useState } from 'react'
const Multipalusestate = () => {

const [input, setinput] = useState()
const [email, setemail] = useState()
const [password, setpassword] = useState()
function submit (){
    let data ={
        name:input,
        email:email,
        password:password,
    }
    console.log(data);
}
  return (
   <div style={{textAlign:'center', }}>
    <input type="text" style={{marginTop:"100px", marginBottom:"10px"}} onChange={(e)=>setinput(e.target.value)} placeholder='enter youre name' />
    <br />
    <input type="email" required style={{ marginBottom:"10px"}} onChange={(e)=>setemail(e.target.value)} placeholder='enter youre email' />
    <br />
    <input type="password" required style={{ marginBottom:"10px"}} onChange={(e)=>setpassword(e.target.value)} placeholder='enter youre password' />
    <br />
    <button type='submit' style={{marginBottom:"100px"}} onClick={submit}>login</button>
    
   </div>
  )
  
}

export default Multipalusestate