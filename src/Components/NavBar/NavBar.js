import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "./NavBar.css";

function NavBar({ logout, user }) {
  const auth = useAuth();
  const history = useNavigate();

  function handlelogout(e) {
    e.preventDefault();
    auth.removeUser()
    logout();
    history("/LogoutLandingPage");
  }

  return (
    <div className="navBarMainDiv">
      <div className="logoDiv">
        <div id="cssmenu">
          <ul>
            <li>
              <span>
                <img
                  src="../menu.png"
                  alt="Logo"
                  style={{ width: "30px", marginRight: "5px" }}
                />
                Menu<i className="arrow"></i>
              </span>
              <ul className="dropdown">
                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/locations">Locations</Link>
                </li>
                {auth.isAuthenticated ? (
                  <li>
                    <span>
                      Appointments <i className="arrow"></i>
                    </span>
                    <ul className="dropdown">
                      <li>
                        <Link to="/appointments">All Apointments</Link>
                      </li>
                      <li>
                        {user === "patient" ? (
                          <Link to="/newappointment">New Appointment</Link>
                        ) : (
                          ""
                        )}
                      </li>
                    </ul>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <span>
                    Other
                    <i className="arrow"></i>
                  </span>
                  <ul className="dropdown">
                    <li>
                      <Link to="/">About us</Link>
                    </li>
                    <li>
                      <Link to="/">Careers</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/">
            <img
              src="../hospital logo.png"
              alt="Logo"
              style={{ width: "80px", marginLeft: "10px" }}
            />
          </Link>
        </div>
      </div>
      <div className="mainLinksDiv">
        <div>
          <Link to="/doctors" className="nav-bar-links"><span><img
                          src="./doctors.png"
                          alt="contact"
                          style={{ paddingRight: "10px", marginBottom: "10px" }}
                        />Doctors</span>
          </Link>
        </div>

        <div>
          <Link to="/locations" className="nav-bar-links"><span><img
                          src="./location.png"
                          alt="contact"
                          style={{ paddingRight: "10px", marginBottom: "15px" }}
                        />Locations</span>
          </Link>
        </div>
        {user ? (
          user.role === "doctor" ? (
            <>
              <div>
                <Link to="/appointments" className="nav-bar-links">
                        Appointments
                </Link>
              </div>
              <div>
                <Link to="/patients" className="nav-bar-links">
                  Patients
                </Link>
              </div>
            </>
          ) : (
            <div>
              <Link to="/appointments" className="nav-bar-links">
              <span><img
                          src="./apointmentsGray.png"
                          alt="contact"
                          style={{ paddingRight: "10px", marginBottom: "10px" }}
                        />Appointments</span>
              </Link>
            </div>
          )
        ) : (
          ""
        )}

        {auth.isAuthenticated ? (
          <Link
            className="btn btn-warning"
            onClick={handlelogout}
          >
           🔐 Log Out
          </Link>
        ) : (
         
          <button
            className="btn btn-outline-primary styled-button"
            onClick={() => auth.signinRedirect()}
          >
            Doctor Log in
          </button> 
        )}
        <button
          className={auth.isAuthenticated ? "changeDisplay" : "btn btn-primary styled-button"}
          onClick={() => auth.signinRedirect()}
        >
          Patient Sign In
        </button>
      </div>

      <div className="loginLogoutDiv">
        <div className="loggedUsername">
          <h6>
            {auth.isAuthenticated
              ? `You are logged in as ${auth.user?.profile.email}`
              : "🔑 Login to make an Appointment"}
          </h6>
        </div>
        <div style={{ textAlign: "center" }} className="accountSettingsDiv">
          {user ? (
            <Link to="/profile" className="btn"><span><img
            src="./settings.png"
            alt="contact"
            style={{ paddingRight: "10px", marginBottom: "10px" }}
          />Account Settings</span>
              
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
