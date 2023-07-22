import React, { StrictMode, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const FormPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform validation if needed
    if (name && phoneNumber && email) {
      const userDetails = {
        name,
        phoneNumber,
        email,
      }; 
      // Save user details to local storage
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      // Redirect to the second page
      navigate("/second-page");
    } else {
      alert("Please fill in all the fields before submitting.");
    }
  };

  return (

    <StrictMode>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Form Page</h4>
        <form onSubmit = {handleSubmit} className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-sm-7">
              <label htmlFor="Name" className="form-label">Name</label>
              <input type="text" className="form-control" id="Name" placeholder="" value={name} required  onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-7">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="col-7">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="tel" id="phone" className="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>

          <button className="mt-4 w-40 btn btn-primary btn-lg" type="submit">Submit</button>
        </form>
      </div>
    </StrictMode>
  
  );
};

export default FormPage;
