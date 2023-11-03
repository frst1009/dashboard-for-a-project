import React from "react";

function Login() {
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
            <form action="#" className="column-container-body">
  <div className="form-input">
    <input type="text" />
    <label htmlFor="">Username</label>
  </div>
  <div className="form-input">
    <input type="text" />
    <label htmlFor="">Password *</label>
  </div>
  <button type="submit">SIGN IN</button>
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
