import axios from 'axios'
import React, { useEffect,useRef } from 'react'
import { useState } from 'react';
import logo from "./img/logo.png"

const Api = () => {
  const [data, setdata] = useState([])
  let firstname = useRef();
  let lastname = useRef();
  let age = useRef();
  let email = useRef();
  let password = useRef();

function submit (){
  console.log(data);
}
//get data
async function getData() {
  let res = await axios.get("http://localhost:30001/user");

  setdata(res.data);
}
// save data 
async function saveData(){
  let user ={
    firstname: firstname.current.value,
    lastname: lastname.current.value,
    age: age.current.value,
    email: email.current.value,
    password: password.current.value,

  }
  console.log(user);
  let res =await axios.post("http://localhost:30001/user", user)
  console.log(res);
  setdata([...data,res.data])
}
useEffect(()=>{
  getData()
},[])

  return (
    <div class="form p-3" >
    <h1><img src={logo} class="imgg" alt=""/></h1>

    <input type="text" name='name' ref={firstname} placeholder="enter your name"/>

    <input type="text" name='email' ref={lastname} placeholder="enter your lastname"/>

    <input type="text" name='password' ref={age} placeholder="enter your age"/>
    <input type="text" name='password' ref={email} placeholder="enter your email"/>
    <input type="text" name='password' ref={password} placeholder="enter your password"/>

    <button class="btn" onClick={saveData}><a href="#">Continue</a></button>

    <p id="title" style={{fontSize:"20px"}} class="link">don't have an account<br/>
      <a href="#">sign up</a> 
    </p>
    <p  class="liw">login with</p>

    <div class="icons">
      <a href="#"><i class="fa-brands fa-facebook"></i></a>
      <a href="#"><i class="fa-brands fa-instagram"></i></a>
      <a href="#"><i class="fa-brands fa-twitter"></i></a>
      <a href="#"><i class="fa-brands fa-google"></i></a>
      <a href="#"><i class="fa-brands fa-skype"></i></a>
    </div>
    {data.map((val, index)=>{
      return(
        <React.Fragment>
            <table border="1" cellpadding="10" cellspacing="1">
            <thead>
                <tr>
                    <th>id</th>
                    <th>first name</th>
                    <th>last Name</th>
                    <th>age</th>
                    <th>email</th>
                    <th>password</th>
                    <th>delete</th>
                    <th>view</th>
                </tr>
            </thead>
            <tbody id="tbody">
           <tr>
            <td>{val.id}</td>
            <td>{val.firstname}</td>
            <td>{val.lastname}</td>
            <td>{val.age}</td>
            <td>{val.email}</td>
            <td>{val.password}</td>
            <td><button>Update</button></td>
            <td><button>deletep</button></td>
           </tr>
            </tbody>
        </table>
        </React.Fragment>
      )
    })}
  </div >

  )
}

export default Api