import React, { useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import "./Maindiv.css";
import { useAuth } from "react-oidc-context";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import Doctors from "./Doctors/Doctors";
import Home from "./Home/Home";
import BASE_URL from "../constraints/URL";
import Locations from "./Locations/Locations";
import DoctorProfile from "./Doctors/DoctorProfile";
import Patients from "./Patients/Patients";
import Appointments from "./Appointments/Appointments";
import NewAppiontment from "./Appointments/NewAppointment";
import PatientProfile from "./Profile/PatientProfile";
import DocProfile from "./Profile/DocProfile";
import Covid19 from "./Covid19/Covid19";
import ClinicGidlines from "./Covid19/ClinicGuidlines";


function MainWithAuth({user, setUser}) {
  const auth = useAuth();
  const [appointments, setAppoinements] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [locations, setLocations] = useState(null);


  const userRole = localStorage.getItem("role");
  localStorage.setItem("email", auth.user?.profile.email);
  localStorage.setItem("role", "patient");

  // auto-login----------------------
  useEffect(() => { 
    fetch(BASE_URL + `/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": auth.user?.access_token},
      body: JSON.stringify({"email": `${auth.user?.profile.email}`}),
    }).then((r)=>{
      if(r.ok){
        r.json().then((patientProfile)=>{
          setUser(patientProfile.body);
        })
      }
    })

   },[]);


  // LOGOUT-----------------------

  function logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      setUser(null);
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
          user={user}
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
          <Route path="/doctors/:id" element={<DoctorProfile user={user} />} />
          <Route
            path="/patients"
            element={<Patients locations={locations} user={user} />}
          />
          <Route
            path="/profile"
            element={
              userRole === "patient" ? (
                <PatientProfile
                  user={user}
                  appointments={appointments}
                  locations={locations}
                  setUser={setUser}
                />
              ) : (
                <DocProfile
                  user={user}
                  appointments={appointments}
                  locations={locations}
                  setUser={setUser}
                />
              )
            }
          />
          <Route
            path="/newappointment"
            element={
              <NewAppiontment
                doctors={doctors}
                user={user}
                setAppoinements={setAppoinements}
                appointments={appointments}
              />
            }
          />
          <Route
            path="/appointments"
            element={
              <Appointments
                user={user}
                setAppoinements={setAppoinements}
                appointments={appointments}
                doctors={doctors}
                setUser={setUser}
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
    </div>
  );
}
export default MainWithAuth;
