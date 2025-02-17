import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate("/");
    };
    if (user) navigate("/");
    return (
        <div>
            <p>sign in with google to continue</p>
            <button onClick={signInWithGoogle}>sign in with google</button>
        </div>
    );
};

export default Login;
