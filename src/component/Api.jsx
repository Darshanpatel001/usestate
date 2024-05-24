import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import logo from "./img/logo.png";

const Api = () => {
  const [data, setdata] = useState([]);
  const [view, setview] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
  });

  let firstname = useRef();
  let lastname = useRef();
  let age = useRef();
  let email = useRef();
  let password = useRef();

  async function getData() {
    let res = await axios.get("http://localhost:30001/user");
    setdata(res.data);
  }

  // save data
  async function saveData() {
    let user = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      age: age.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    console.log(user);
    let res = await axios.post("http://localhost:30001/user", user);
    console.log(res);
    setdata([...data, res.data]);
  }

  // delete data
  function deletedata(id) {
    axios.delete(`http://localhost:30001/user/${id}`).then((res) => {
      console.log(res);
    });
    setdata(data.filter((val) => val.id !== id));
  }

  // update data
  function viewdata(user) {
    console.log(user);
    setview(user);
  }

  function handleview(e) {
    setview({ ...view, [e.target.name]: e.target.value });
  }

  async function updateuser() {
    let res = await axios.put(`http://localhost:30001/user/${view.id}`, view);
    console.log(res);
    setdata(data.map((val) => (val.id === res.data.id ? res.data : val)));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className="form p-3">
        <h1>
          <img src={logo} className="imgg" alt="" />
        </h1>
        <input
          type="text"
          name="firstname"
          ref={firstname}
          placeholder="enter your firstname"
        />
        <input
          type="text"
          name="lastname"
          ref={lastname}
          placeholder="enter your lastname"
        />
        <input
          type="text"
          name="age"
          ref={age}
          placeholder="enter your age"
        />
        <input
          type="text"
          name="email"
          ref={email}
          placeholder="enter your email"
        />
        <input
          type="text"
          name="password"
          ref={password}
          placeholder="enter your password"
        />
        <button className="btn" onClick={saveData}>
          <a href="#">Continue</a>
        </button>
        <p id="title" style={{ fontSize: "20px" }} className="link">
          don't have an account
          <br />
          <a href="#">sign up</a>
        </p>
        <p className="liw">login with</p>
        <div className="icons">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-google"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-skype"></i>
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <table border="1" cellPadding="10" cellSpacing="1">
            <thead>
              <tr>
                <th>id</th>
                <th>first name</th>
                <th>last Name</th>
                <th>age</th>
                <th>email</th>
                <th>password</th>
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody id="tbody">
              {data.map((val) => {
                return (
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.firstname}</td>
                    <td>{val.lastname}</td>
                    <td>{val.age}</td>
                    <td>{val.email}</td>
                    <td>{val.password}</td>
                    <td>
                      <button onClick={() => viewdata(val)}>Update</button>
                    </td>
                    <td>
                      <button onClick={() => deletedata(val.id)}>delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <input
        type="text"
        name="firstname"
        value={view.firstname}
        onChange={handleview}
      />
      <input
        type="text"
        name="lastname"
        value={view.lastname}
        onChange={handleview}
      />
      <input type="text" name="age" value={view.age} onChange={handleview} />
      <input type="text" name="email" value={view.email} onChange={handleview} />
      <input
        type="text"
        name="password"
        value={view.password}
        onChange={handleview}
      />
      <button onClick={updateuser}>update</button>
    </React.Fragment>
  );
};

export default Api;
