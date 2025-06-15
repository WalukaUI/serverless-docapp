import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "./NewAppointment.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import BASE_URL from "../../constraints/URL";


function NewAppiontment({ doctors, user, setAppoinements, appointments }) {
  const [newAppointment, setNewAppointment] = useState({});
  const [errors, setErrors] = useState(null);
  const [searchTearm, setSearchTearm] = useState("");
  const [selected, setSelectedDate] = useState(null);
  const auth = useAuth();

  const history = useNavigate();
  const form = useRef();

  //POST Appointment------------------------

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(BASE_URL + `/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth.user?.access_token,
      },
      body: JSON.stringify(newAppointment),
    }).then((res) => {
      if (res.ok) {
        res.json().then((booking) => {
          setAppoinements([...appointments, booking]);
          history("/appointments");
        });
      } else {
        res.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  //Supportive Functions----------------------

  function handleNewAppointment(e) {
    e.preventDefault();
    let newBooking = {
      ...newAppointment,
      patient_id: user.id,
      status: "open",
      date: selected,
      [e.target.name]: e.target.value,
    };
    setNewAppointment(newBooking);
  }

  function activeSearch(e) {
    e.preventDefault();
    setSearchTearm(e.target.value);
  }

  return (
    <div className="row">
      <div className="col col-sm-12 col-md-6">
        <div className="serchDoctor">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search Doctors By Last Name"
              onChange={activeSearch}
            />
          </form>
        </div>

        {doctors
          .filter((card) =>
            card.last_name.toLowerCase().includes(searchTearm.toLowerCase())
          )
          .map((doctor) => (
            <div key={doctor.id} className="docCardMainDiv">
              <div className="docCardMainInnerDiv">
                <div className="row doctorCradBox">
                  <div className="col col-sm-12 col-md-4 docImageDiv">
                    <img
                      className="doccardImage"
                      src={doctor.image}
                      alt="doctor"
                    />
                  </div>
                  <div className="col col-md-4" style={{ paddingTop: "10px" }}>
                    <h5>
                      {doctor.first_name} {doctor.last_name}
                    </h5>
                    <p>{doctor.speciality}</p>
                    <p>{doctor.education}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="col col-sm-12 col-md-6">
      <div className="newAppointmentFormContainer" style={{paddingTop:"8%"}}>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="form-group newAppointmentForm">
            <h4 style={{ color: "#00235B", paddingBottom: "20px" }} >Create a new Appointment</h4>
            <label>Select a Doctor</label>
            <select
              className="form-select"
              name="doctor_id"
              aria-label="Default select example"
              onChange={handleNewAppointment}
            >
              <option value="All"></option>
              {doctors.map((card) => (

                <option value={card.id} key={card.id}>
                  {card.first_name} {card.last_name}
                </option>
              ))}
            </select>
            <input
              name="last_name"
              defaultValue={user.last_name}
              style={{ display: "none" }}
            />
            <input
              name="email"
              defaultValue={user.email}
              style={{ display: "none" }}
            />
            <label>Select a Date</label>
            <div>
            <DayPicker mode="single" 
            selected={selected} 
            className="form-select" 
            dateFormat="dd/MM/yy" 
            name="date" onSelect={(date) => setSelectedDate(date)} 
            footer={selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."}/>
            </div>
            <label>Time</label>
            <select
              className="form-select"
              name="time"
              onChange={handleNewAppointment}
              disabled={!selected}
            >
              <option value=""></option>
              <option value={1000}>10.00 am</option>
              <option value={1030}>10.30 am</option>
              <option value={1100}>11.00 am</option>
              <option value={1300}>01.00 pm</option>
              <option value={1330}>01.30 pm</option>
            </select>
            <button type="submit" className="btn btn-primary formSubBtn" disabled={!selected}>
              Submit
            </button>
          </div>
        </form>
        <div style={{ textAlign: "center" }}>
          {errors ? (
            <p style={{ color: "red", marginTop: "10px" }}>
              Please fill all lines of the form
            </p>
          ) : null}
          {/* {errors 
            ? errors.map((e) => (
                <p style={{ color: "red", marginTop: "10px" }}>{e}</p>
              ))
            : null} */}
        </div>
        </div>
      </div>
    </div>
  );
}

export default NewAppiontment;
