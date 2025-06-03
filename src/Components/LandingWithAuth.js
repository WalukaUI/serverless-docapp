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
import LogoutLandingPage from "./Login/LogOutPage";

function MainWithAuth({user, setUser}) {
  const auth = useAuth();
  const [appointments, setAppoinements] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [locations, setLocations] = useState(null);


  const userRole = localStorage.getItem("role");
  localStorage.setItem("email", auth.user?.profile.email);

  const contextValue = {
    user,
    doctors,
    locations,
  };

  // auto-login----------------------
  useEffect(() => {
    // setUser({
    //     "id": "2",
    //     "first_name": "Enrique",
    //     "last_name": "Hamill",
    //     "email": "arvilla@mitchell.example",
    //     "contact_number": "0",
    //     "clinic_location": "8",
    //     "role": "patient",
    //     "username": "jonah",
    //     "password_digest": "Heard Island and McDonald Islands",
    //     "patient": true
    // })
    fetch(BASE_URL + `/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": auth.user?.access_token },
      body: JSON.stringify({"email": `${auth.user?.profile.email}`}),
    }).then((r)=>{
      console.log(r);
      if(r.ok){
        r.json().then((user)=>{
          console.log(user);
          setUser();
        })
      }
    })
  });


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
        />
        <div className="covidWarnning">
          <ClinicGidlines />
        </div>

        <Routes>
          <Route path="/covid19" element={<Covid19 />} />
          <Route
            path="/LogoutLandingPage"
            element={<LogoutLandingPage/>}
          />
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
