import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Login() {
  const [username, setUsername] = useState('react');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate=useNavigate();
  const handleLogin=async(e)=>{
    e.preventDefault();
    const adminUsername = 'react'; 
    const adminPassword = '123456'; 

    if (username === adminUsername && password === adminPassword) {
      try {
        const response = await axios.post(
          'https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/authentication/versions/1/tickets',
          {
            userId: adminUsername,
            password: adminPassword,
          },
          {
            headers: {
              Authorization: `Basic ${btoa(`${adminUsername}:${adminPassword}`)}`,
            },
          }
        );
        if (response.data.entry.id) {
          console.log('Authentication successful');
          navigate("/personal-files")
        } else {
          console.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Username incorrect');
    }
  }

  return (
    <section className="login-content">
      <div className="login-container center">
        <div className="container">
          <div className="column-container">
            <div className="column-container-header">
              <img
                className=""
                src="https://1curd3ms.trials.alfresco.com/assets/images/alfresco-logo.svg"
                alt="logo"
              />
            </div>
            <form action="#" className="column-container-body" onSubmit={handleLogin}>
  <div className="form-input">
    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
  </div>
  <div className="form-input">
    <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password *'/>
    <FontAwesomeIcon 
              icon={showPassword ? faEye : faEyeSlash} // Toggle eye and eye-slash icons
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            />
  </div>
  <button className="log-button" type="submit">SIGN IN</button>
</form>

          </div>
        </div>
      </div>
      <footer>
        <p className="footer">
          © 2017 - 2020 Alfresco Software, Inc. All rights reserved.
        </p>
      </footer>
    </section>
  );
}

export default Login;
