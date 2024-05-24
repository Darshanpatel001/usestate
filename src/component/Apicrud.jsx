import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const Apicrud = () => {


    let [parsondata, setparsondata] = useState([]);
    let [updata, setupdata] = useState({});

    let Name = useRef();
    let Email = useRef();
    let Password = useRef();

    //get data
    const getdata = () => {
        axios.get("http://localhost:30001/user").then((res) => {
            setparsondata(res.data);
        })
    }

    //add data
    const adddata = () => {
        let parson = {
            Name: Name.current.value,
            Email: Email.current.value,
            Password: Password.current.value
        };
        axios.post("http://localhost:30001/user", parson).then((response) => {
            console.log(response.data);
            Name.current.value = "";
            Email.current.value = "";
            Password.current.value = "";
            setparsondata([...parsondata, response.data])
        })
    }

    // delete data 
    const deletedata = (id) => {
        axios.delete(`http://localhost:30001/user/${id}`).then((result) => {
            console.log(result.data);
            setparsondata(parsondata.filter((val) => val.id !== id));
        })
    }

    // updata  data 
    const viewAll = (index) => {
        console.log(index);
        let view = parsondata[index];
        setupdata(view);
    }

    const viewupdata = (e) => {
        setupdata({...updata,[e.target.name]:e.target.value})
    }
    
    const save = () =>{
            console.log(updata, "updata");
        axios.put(`http://localhost:30001/user/${updata.id}`,updata).then((res)=>{
            console.log(res.data,"viewupdata");

            setparsondata(parsondata.map((value,index) =>{
                if(value.id === res.data.id){
                    return  res.data;
                }else{
                    return value;
                }
            }))
        })
    }

    useEffect(() => {
        getdata();
    }, [])  

    return (
        <>
            <input type="text" placeholder="enter your name" name="name" ref={Name} />
            <input type="email" placeholder="Enter Your Email" name="email" ref={Email} />
            <input type="password" placeholder="enter your password" name="password" ref={Password} />
            <button onClick={adddata}>Add</button>

            <table cellpadding="10px" className="col-12 text-center table-bordered  border-secondary">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Updta</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        parsondata.map((value, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{value.Name}</td>
                                    <td>{value.Email}</td>
                                    <td>{value.Password}</td>
                                    <td><button onClick={() => deletedata(value.id)}>deletedata</button></td>
                                    <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => viewAll(index)}>Updata</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder="enter your name" name="Name" value = {updata.Name} onChange={viewupdata}/><br />
                            <input type="email" placeholder="Enter Your Email" name="Email" value = {updata.Email} onChange={viewupdata} /><br />
                            <input type="password" placeholder="enter your password" name="Password" value = {updata.Password} onChange={viewupdata} /><br />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={save}>save</button>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Apicrud;