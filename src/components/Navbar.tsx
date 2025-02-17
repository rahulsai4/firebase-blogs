import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
    const [user] = useAuthState(auth);
    const logOut = async () => {
        await signOut(auth);
    };
    return (
        <div className="navStyle">
            <Link to="/">Home</Link>
            {"     "}
            {!user && <Link to="/login">login</Link>}
            {"     "}
            {user && <Link to="/createpost">create post</Link>}

            {user && (
                <div className="profileStyle">
                    <img src={user?.photoURL || ""} width={30} height={30} />
                    <p>{user?.displayName}</p>
                    <button onClick={logOut}>logout</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
