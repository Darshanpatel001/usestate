import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Apifourth = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState({ });
  const email = useRef();
  const name = useRef();
  const password = useRef();

  // get-data-process
  async function getData() {
    let res = await axios.get("http://localhost:30001/user");
    setData(res.data);
    console.log(res.data);
  }

  // save-data
  async function saveData() {
    let person = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    };
    console.log(person);
    let res = await axios.post("http://localhost:30001/user", person);
    setData([...data, res.data]);

  }

  // delete method
  async function deleteMethod(id) {
    await axios.delete(`http://localhost:30001/user/${id}`);
    setData(data.filter((val) => val.id !== id));
  }

  // viewdata
  function viewData(person) {
    setView(person);
  }

  // handle update form input change
  function handleInputChange(e) {
    setView({ ...view, [e.target.name]: e.target.value });
  }

  // update user
  async function updateUser() {
    let res = await axios.put(`http://localhost:30001/user/${view.id}`, view);
    setData(data.map((val) => (val.id === res.data.id ? res.data : val)));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <input type="text" name='name' ref={name} placeholder="Name" />
      <input type="text" name='email' ref={email} placeholder="Email" />
      <input type="password" name='password' ref={password} placeholder="Password" />
      <button onClick={saveData}>Submit</button>

      <br /><br /><br /><br />

      <input type="text" name='name' value={view.name} onChange={handleInputChange} placeholder="Name" />
      <input type="text" name='email' value={view.email} onChange={handleInputChange} placeholder="Email" />
      <input type="password" name='password' value={view.password} onChange={handleInputChange} placeholder="Password" />
      <button onClick={updateUser}>Update</button>

      <br /><br /><br />

      <table border="1" cellPadding="10" cellSpacing="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {data.map((val) => (
            <tr key={val.id}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.password}</td>
              <td>
                <button onClick={() => viewData(val)}>View</button>
              </td>
              <td>
                <button onClick={() => deleteMethod(val.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Apifourth;
