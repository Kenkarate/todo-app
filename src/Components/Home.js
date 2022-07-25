import React, { useContext } from "react";
import GoogleButton from "react-google-button";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import app from "../Config/Config";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./context/UserContext";
import ToDo from "./ToDo/ToDo";

function Home() {
  // const [users, setUsers] = React.useState({});

  const navigate = useNavigate();

  const { users, setUsers, setuid, setUserPresent } = useContext(LoginContext);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  // google signin with popup
  const handler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // results contains the details of logged in user
        // displayName of the user is set to users from LoginContext
        const user = result.user;
        setUsers(user.email);
        // navigate to ToDo
        navigate("/todo");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode, email);
        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(credential);
      });
  };
  // change auth state when a user is logged in and uid is set to the user's uid
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setuid(uid);
      setUserPresent(true);
      console.log(setUserPresent);
    } else {
      setUserPresent(false);
      const uid = null;
    }
  });

  return (
    <div>
      {/* Google button for sign in */}
      <GoogleButton onClick={handler} />
    </div>
  );
}

export default Home;
