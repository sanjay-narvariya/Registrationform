import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import { getData, postData, serverURL } from "../../services/FetchNodeAdminServices";

export default function AdminHome() {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  const imgStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "2rem",
  };

  const fetchAllCategory = async () => {
    const result = await getData('category/get-all-category');
    if (result.status) {
      setCategoryList(result.data.categories);
    }
  };

  const isUserExist = () => {
    localStorage.getItem("isLoggedIn");
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  useEffect(() => {
    isUserExist();
  }, []);

  const categoryDelete = async (item) => {
    const result = await postData(`category/delete-category/${item}`, {});
    if (result) {
      alert('Deleted category successfully!');
      setTimeout(() => navigate('/home'), 2000);
      window.location.reload();
    } else {
      alert('Failed to delete category.');
    }
    fetchAllCategory();
  };

  return (
    <div className="container-fluid px-2 px-md-4 mt-4">
      <div className="card shadow border-0 rounded-lg">
        <div className="card-header bg-primary text-light d-flex justify-content-between align-items-center flex-wrap">
          <h5 className="mb-2 mb-md-0">Category Management</h5>
          <Link to="/categoryform" className="text-light fs-4">
            <IoMdAddCircle />
          </Link>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Category Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.categoryname}</td>
                    <td>{item.details}</td>
                    <td>
                      {item.categoryimage ? (
                        <img
                          style={imgStyle}
                          src={`${serverURL}/${item.categoryimage}`}
                          alt="Category"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning text-light"
                        onClick={() => navigate(`/categoryform/${item._id}`)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => categoryDelete(item._id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
