import "./logoutLandingPage.css"
function LogoutLandingPage() {

    const signOutRedirect = () => {
    const clientId = "2kih0h4ra0c1ognli9tomv1hs7";
    const logoutUri = "https://main.d11x0rh1r8wz2j.amplifyapp.com";
    const cognitoDomain = "https://us-east-2smuhwfuds.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };


    return<>
    <div className="logoutLandingPageDiv">
      <h2>"You have Successfully logged Out" </h2>
      <h3>"I'm sending you a virtual hug and wishes of good health!"</h3>
      <img
              src="../hospital logo.png"
              alt="Logo"
              style={{ width: "90px", marginLeft: "10px" }}
            /><br/>
      <p>Click below button, If you wish to clear browser data related to this website</p>
      <button className="btn btn-warning styled-button" onClick={() => signOutRedirect()}>Clear Browser Data</button>
    </div>
    </>
}
export default LogoutLandingPage;