// src/components/SecondPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Post } from "./interfaces/UserDetails";
import DepartmentList from "./DepartmentList"; 

// Json data
const departmentsData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user details are present in local storage
    const userDetailsString = localStorage.getItem("userDetails");
    if (!userDetailsString) {
      // If user details not found, redirect back to the form page
      navigate("/");
      alert("Please provide your details before accessing the second page.");
    } else {
      // Fetch data from the API and update the state
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Second Page</h2>
      <DataGrid rows={posts} columns={columns} />
      <DepartmentList data={departmentsData} />  {/*Passing the hardcored Json data*/}
    </div>
  );
};

export default SecondPage;