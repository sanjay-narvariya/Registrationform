import React, { useEffect, useState } from 'react';
import { getData, postData, serverURL } from "../../services/FetchNodeAdminServices";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const SubEquipment = () => {

  const courses = ['C Trianing', 'C++ Training', 'Full Mern Stack', 'Python', 'Data Base Management', 'Digital Marketing', 'SEO Optimization', 'Google Services']

  const [course, setCourse] = useState("");
  const [name1, setName1] = useState("");
  const [mailid, setMailid] = useState("");
  const [error, setError] = useState("");

  const [phoneno, setPhoneno] = useState("");
  const [message1, setMessage1] = useState("");

  const navigate = useNavigate();




  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);



 const handleChange = (e) => {
    const value = e.target.value;
    // Sirf digits aur max 10 hi allow karo
    if (/^\d{0,10}$/.test(value)) {
      setPhoneno(value);
    }
  };



  const handleChange1 = (e) => {
    const value = e.target.value;
    setMailid(value);

    // Email validation regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
     if (phoneno.length !== 10) {
      alert("Mobile number must be exactly 10 digits!");
      return;
    }

    try {
      var result = await postData('enquiry/enquiry-submit', {
        course:course,
        name: name1,
        phone: phoneno,
        email: mailid,
        address: message1
      });

      if (result.status) {
        Swal.fire({
          title: "Good job!",
          text: "Inquiry sent successfully!",
          icon: "success",
        });

        // Reset form fields
        setCourse("");
        setName1("");
        setMailid("");
        setPhoneno("");
        setMessage1("");

        window.location.reload(); // Refresh the page after navigation

      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {

      Swal.fire({
        title: "Error",
        text: "Network error. Please try again later.",
        icon: "error",
      });

    }
  };


  return (
    <>
      <div className="container RentalEquipment">
        <div className="row">
          <div className="equipment-title">

          </div>
        </div>
      </div>


      <div className="modal-overlay" >
        <div
          className="modal-content"
        >
          <h2>Student Registration Form</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="course">Select a Course: </label>
              <select id="course" name="course"   onChange={(e) => setCourse(e.target.value)} >
                <option value="" hidden >-- Select Course --</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="number"
                placeholder="Phone Number"
                value={phoneno}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={mailid}
                onChange={handleChange1}
                required
                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                type="text"
                placeholder="Address"
                value={message1}
                onChange={(e) => setMessage1(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit">Confirm Registration</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubEquipment;
