import Login from "./Login.jsx";
import Register from "./Register.jsx";
import "./Auth.css";
const Auth = () => {
    return (
        <section className="account-page">
            <div className="container">
                <div className="account-wrapper">
                    <Login/>
                    <Register/>
                </div>
            </div>
        </section>
    );
};

export default Auth;