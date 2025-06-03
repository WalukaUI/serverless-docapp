import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./Maindiv.css";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import Doctors from "./Doctors/Doctors";
import Home from "./Home/Home";
import BASE_URL from "../constraints/URL";
import Locations from "./Locations/Locations";
import Covid19 from "./Covid19/Covid19";
import ClinicGidlines from "./Covid19/ClinicGuidlines";

function MainWithoutAuth({user}) {
  const [doctors, setDoctors] = useState(null);
  const [locations, setLocations] = useState(null);
  const [getAddress, setAddress] = useState("");
  
  // LOGOUT-----------------------

  function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setAddress("");
    };
  
  // GET Locations-------------------;
  useEffect(() => {
    fetch(BASE_URL + "/locations", {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        setLocations(data.body)});
  }, []);

  // GET Doctors------------------------
  useEffect(() => {
    fetch(BASE_URL + `/doctors`, {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setDoctors(data.body);
        });
      }
    });
  }, []);


  return (
    <div className="mainDiv">
        <NavBar
          logout={logout}
          getAddress={getAddress}
          setAddress={setAddress}
        />
        <div className="covidWarnning">
          <ClinicGidlines />
        </div>
        <Routes>
          <Route path="/covid19" element={<Covid19 />} />
          <Route
            path="/locations"
            element={<Locations locations={locations?.filter ((card)=>card.name !== "Club Hills")} />}
          />
          <Route
            path="/doctors"
            element={<Doctors doctors={doctors} user={user} />}
          />
          <Route path="/doctors/:id"/>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
    </div>
  );
}
export default MainWithoutAuth;
