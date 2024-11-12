import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {

    const [values, setValues] = useState({
        name: '',
        email: ''
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/student', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="min-vh-100 bg-primary d-flex justify-content-center align-items-center">
        <div className="bg-white rounded-4 p-4 shadow-lg" style={{ width: '500px' }}>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Add Student</h2>
                
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Name" 
                        className="form-control"
                        id="name"
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
                        onChange={e => setValues({...values, email: e.target.value})}

                    />
                </div>

                <button className="btn btn-success w-100">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default Create