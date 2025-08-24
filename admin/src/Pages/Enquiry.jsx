import React, { useState, useEffect } from 'react';
import { getData, postData } from "../services/FetchNodeAdminServices";
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Enquiry() {
    const [enquiryList, setEnquiryList] = useState([]);
    const navigate = useNavigate();

    const fetchAllEnquiry = async (showAlert = true) => {
        try {
            const result = await getData('enquiry/get-all-enquiry');
            if (result.status) {
                setEnquiryList(result.data.enquiry);
            } else if (showAlert) {
                alert(result.message || "Failed to fetch enquiries.");
            }
        } catch (error) {
            if (showAlert) {
                alert("Something went wrong while fetching enquiries.");
            }
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchAllEnquiry();
    }, []);

    useEffect(() => {
        const handleFocus = () => fetchAllEnquiry(false);
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, []);

    const reversedEnquiries = [...enquiryList].reverse();

    const enquiryDelete = async (item) => {
        const result = await postData(`enquiry/delete-enquiry/${item}`, {});
        if (result) {
            alert('Deleted enquiry successfully.');
            setTimeout(() => navigate('/enquiry'), 2000);
        } else {
            alert('Failed to delete enquiry.');
        }
        fetchAllEnquiry();
    };

    const deleteAllEnquiries = async () => {
        const result = await getData('enquiry/deleteEnquiry', {});
        if (result.status) {
            alert("All enquiries deleted!");
            setTimeout(() => navigate('/enquiry'), 2000);
            window.location.reload();
        } else {
            alert("Failed to delete enquiries.");
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Enquiry List", 14, 15);

        const tableColumn = ["#", "Name", "Email", "Phone", "Address", "Course Name", "Created At"];
        const tableRows = [];

        reversedEnquiries.forEach((item, index) => {
            const rowData = [
                index + 1,
                item.name || "-",
                item.email || "-",
                item.phone || "-",
                item.address || "-",
                item.course || "-",
                new Date(item.createdAt).toLocaleString(),
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 25,
            styles: { fontSize: 9 },
        });

        doc.save("Enquiry_List.pdf");
    };

    return (
        <div className="container-fluid px-2 px-md-4 mt-4">
            <div className="card shadow border-0 rounded-lg">
                <div className="card-header bg-primary text-light d-flex flex-wrap justify-content-between align-items-center gap-2">
                    <h5 className="mb-0">Enquiries</h5>
                    <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-danger btn-sm" onClick={deleteAllEnquiries}>
                            🗑️ Delete All
                        </button>
                        <button className="btn btn-light btn-sm" onClick={downloadPDF}>
                            📄 Download PDF
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Course Name</th>
                                    <th>Created At</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reversedEnquiries.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name || "-"}</td>
                                        <td>{item.email || "-"}</td>
                                        <td>{item.phone || "-"}</td>
                                        <td>{item.address || "-"}</td>
                                        <td>{item.course || "-"}</td>
                                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => enquiryDelete(item._id)}
                                            >
                                                <FaTrashAlt className="fs-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {reversedEnquiries.length === 0 && (
                                    <tr>
                                        <td colSpan="8">No enquiries found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-muted mt-2 d-block d-md-none" style={{ fontSize: '0.9rem' }}>
                        👉 Swipe left/right to view full table on mobile
                    </p>
                </div>
            </div>
        </div>
    );
}
