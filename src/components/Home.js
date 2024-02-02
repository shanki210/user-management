import React, { useEffect, useState } from "react";
import { Button, Form, Alert, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./Home.css"; 

const Home = () => {
  const { user, logOut } = useUserAuth();
  const [showname,setshowname] = useState("");
  const [shownumber,setshownumber] = useState("");
  const [showgender,setshowgender] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  },[user]); // Fetch user data 

  const fetchUserData = async () => {
    try {
      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        // Update state with user data
        setshowname(userData.name || "");
        setshownumber(userData.phoneNumber || "");
        setshowgender(userData.gender || "");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updatePassword(user, newPassword);
      setNewPassword("");
      alert("Password updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleUpdateUserData = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          name,
          phoneNumber,
          gender,
        },
        { merge: true }
      );
      alert("User data updated successfully!");
    } catch (err) {
      console.error("Error updating user data:", err);
      setError(err.message);
    }
  };

  return (
    <div className="container">
     <Container className="home-container">
      <Navbar  className="navbar">
        <Navbar.Brand className="navbar-brand">Hello, Welcome {showname?<span>back {showname}</span>:<span></span>}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse className="navbar-nav">
          <Button variant="primary" className="logout-btn" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <div className="user-details">

      {!showname && !shownumber && !showgender && (
        <div className="box">
          <h2>User Data</h2>
          <p>No user data available</p>
        </div>
      )}
      {showname && shownumber && showgender && (
        <div className="box">
          <h2>User Data</h2>
          <p>Name: {showname}</p>
          <p>Phone Number: {shownumber}</p>
          <p>Gender: {showgender}</p>
        </div>
      )}
      <div className="form-container">
      <div className="box">
        <h2>Update Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleUpdatePassword}>
          <Form.Group controlId="formBasicNewPassword">
            <Form.Control
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Update Password
          </Button>
        </Form>
      </div>

      <div className="box">
        <h2>Update User Data</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={handleUpdateUserData} className="mt-3">
            Update User Data
          </Button>
        </Form>
      </div>
      </div>
      </div>
     
     
    </Container>
    </div>
   
  );
};

export default Home;
