import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../store/session";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
const LoginFormPage = () => {

    const [credential,setCredential] = useState({username:"", password: ""});
    const [errors,setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    // debugger
    const dispatch = useDispatch();

    if (sessionUser !== null) {
        // debugger
        <Redirect to ="/" />
    }

    const submitLoginForm = (e) => {
        e.preventDefault()
        // console.log(credential)
        // debugger

        dispatch(loginUser(credential)).catch(async res => setErrors(await res.json()))
        

    }

    const handleChange = (keyword) => (e) => {
        e.preventDefault();
        // debugger
        setCredential({...credential,[keyword]: e.target.value})

    }


    return (
        <form className = "login-form" onSubmit={submitLoginForm}>
            {errors && errors.map(error => <p className="error-message">{error}</p>)}
            <label>Username
            <input value ={credential.username} onChange={handleChange("username")} />
            </label>
            <label>Password
            <input value ={credential.password} onChange={handleChange("password")} />
            </label>
            <button>Submit</button>

        </form>
    )

}

export default LoginFormPage