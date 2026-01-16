// App.js
import {useState, createContext} from "react";
import { useAuth } from "react-oidc-context";
import MainWithoutAuth from "./Components/LandingWithoutAuth";
import MainWithAuth from "./Components/LandingWithAuth";
export const UserContext = createContext();
function App() {
  const auth = useAuth();
  const [user, setUser] = useState();

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
    </div>
  );
}

export default App;