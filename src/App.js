// App.js
import {useState, createContext} from "react";
import { useAuth } from "react-oidc-context";
import MainWithoutAuth from "./Components/LandingWithoutAuth";
import MainWithAuth from "./Components/LandingWithAuth";
export const UserContext = createContext();
function App() {
  const auth = useAuth();
  const [user, setUser] = useState();

  const signOutRedirect = () => {
    const clientId = "2kih0h4ra0c1ognli9tomv1hs7";
    const logoutUri = "https://main.d11x0rh1r8wz2j.amplifyapp.com";
    const cognitoDomain = "https://us-east-2smuhwfuds.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        {/* <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre> */}
      <MainWithAuth user={user} setUser={setUser}/>
      </div>
    );
  }

  return (
    <div>
      <MainWithoutAuth/>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;