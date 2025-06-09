import "./logoutLandingPage.css"
function LogoutLandingPage() {

    const signOutRedirect = () => {
    const clientId = "2kih0h4ra0c1ognli9tomv1hs7";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain = "https://us-east-2smuhwfuds.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };


    return<>
    <div className="logoutLandingPageDiv">
      <h2>"You have Successfully logged Out" </h2>
      <button onClick={() => signOutRedirect()}>Sign out</button>
      <h3>"I'm sending you a virtual hug and wishes of good health!"</h3>
      <img
              src="../hospital logo.png"
              alt="Logo"
              style={{ width: "90px", marginLeft: "10px" }}
            />
    </div>
    </>
}
export default LogoutLandingPage;