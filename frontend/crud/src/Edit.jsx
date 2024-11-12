import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";


function Edit() {

    const {id} = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
        .then(res => {
            console.log(res)
            setValues({...values, name: res.data[0].Name, email:res.data[0].Email});
        })
        .catch(err => console.log(err));
    }, [])
    const [values, setValues] = useState({
        name: '',
        email: ''
    })
    
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/edit/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }

    return (
<div className="min-vh-100 bg-primary d-flex justify-content-center align-items-center">
        <div className="bg-white rounded-4 p-4 shadow-lg" style={{ width: '500px' }}>
            <form onSubmit={handleUpdate}>
                <h2 className="text-center mb-4">Update Student</h2>
                
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Name" 
                        className="form-control"
                        id="name"
                        value={values.name}
                        onChange={e => setValues({...values, name: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        className="form-control"
                        id="email"
                        value={values.email}
                        onChange={e => setValues({...values, email: e.target.value})}

                    />
                </div>

                <button className="btn btn-success w-100">Update</button>
            </form>
        </div>
    </div>    )
}
export default Edit