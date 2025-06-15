import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { AnyAction } from "redux";


interface IErrors {
  email: string;
  password: string
}

function LoginFormModal(): JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IErrors | AnyAction>({ email: "", password: "" });
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse.ok) {
      closeModal();
    } else {
      setErrors(serverResponse);
    }
  };

  return (
    <div id='login'>
      <h1 id='login-title'>Log In</h1>
      <form onSubmit={(e) => handleSubmit(e)} id='login-form'>
        <label className='login-input-label'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='login-input'
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className='login-input-label'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='login-input'
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" id='login-button'>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
