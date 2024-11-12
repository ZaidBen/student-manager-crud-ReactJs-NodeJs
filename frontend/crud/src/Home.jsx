import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Fetch students data on mount
        axios.get('http://localhost:8081/')
            .then(res => {
                setData(res.data);
                setFilteredData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        // Confirm delete action with the user
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            axios.delete(`http://localhost:8081/delete/${id}`)
                .then(res => {
                    // Update the state to remove the deleted student without reloading the page
                    const updatedData = data.filter(student => student.ID !== id);
                    setData(updatedData);
                    setFilteredData(updatedData);
                    alert("Student deleted successfully.");
                })
                .catch(err => {
                    console.log(err);
                    alert("Error deleting student.");
                });
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            const filtered = data.filter(student =>
                student.Name.toLowerCase().includes(query) || 
                student.Email.toLowerCase().includes(query)
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="min-vh-100 bg-primary d-flex justify-content-center align-items-center p-4">
            <div className="bg-white rounded-4 p-4 shadow-lg" style={{ width: '800px' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fs-2 fw-normal">Student List</h2>
                    <Link to='/create' className="btn btn-success">Add Student</Link>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name or Email"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                
                <table className="table">
                    <thead>
                        <tr className="border-bottom">
                            <th className="fw-medium ps-0">ID</th>
                            <th className="fw-medium">Name</th>
                            <th className="fw-medium">Email</th>
                            <th className="fw-medium text-end pe-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((student, index) => (
                                <tr key={index} className="border-bottom">
                                    <td className="ps-0">{student.ID}</td>
                                    <td>{student.Name}</td>
                                    <td>{student.Email}</td>
                                    <td className="text-end pe-0">
                                        <Link to={`/Read/${student.ID}`} className="btn btn-info btn-sm me-1 rounded-2 text-white">Read</Link>
                                        <Link to={`/Edit/${student.ID}`} className="btn btn-primary btn-sm me-1 rounded-2">Edit</Link>
                                        <button onClick={() => handleDelete(student.ID)} className="btn btn-danger btn-sm rounded-2">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
