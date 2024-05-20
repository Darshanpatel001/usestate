import React from 'react'
import { useState } from 'react'
const Singalelineusestate = () => {

    const [singale, setsingale] = useState({
        name:"",
        email:"",
        password:"",
    })

    // let handle =(e)=>{
    // setsingale({...singale,[e.target.name]:e.target.value})
    // }
    const handle = (e) => {
        const { name, value  } = e.target;
        setsingale((prev)=>{
            return {...prev,[name]:value}
        })
      };
    
    let submit =()=>{
        console.log(singale);
    }
  return (
    <div style={{ textAlign:"center"}}>
        <h3 >name :</h3>{" "}
    <input type="text" style={{marginTop:"", marginBottom:"10px"}} name='name' onChange={handle} placeholder='enter youre name' />
    
    <h3>email :</h3>{" "}
    <input type="email" required style={{ marginBottom:"10px"}} name='email' onChange={handle} placeholder='enter youre email' />
    <br />
    <h3>password :</h3>{" "}
    <input type="password" required style={{ marginBottom:"10px"}} name='password' onChange={handle} placeholder='enter youre password' />
    <br />
    <button type='submit' style={{marginBottom:"100px"}} onClick={submit}>login</button>
    
   </div>
  )
}

export default Singalelineusestate