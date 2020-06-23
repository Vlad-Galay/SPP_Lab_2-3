import React from 'react';
import ReactModalLogin from '../node_modules/react-modal-login';

class Sample extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        showModal: true,
        loggedIn: null,
        loading: false,
        error: null,
        initialTab: null,
        recoverPasswordSuccess: null,
      };
  
    }

    onLogin() {

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

          let response = JSON.parse(xhttp.response);
          this.closeModal();
          this.props.handle({isAuth : true, nick : response.nick, token : response.token});
        }else{
          this.props.handle({isAuth : false, nick : "", token : ""});
        }
      };
      xhttp.onreadystatechange = xhttp.onreadystatechange.bind(this); 





        //this.props.handle(document.querySelector('#email').value === "123");
        /*console.log('__onLogin__');
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);*/

        this.closeModal();

    
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;


    
        if (!email || !password) {
          this.setState({
            error: true
          })
          this.openModal();
        } else {
          xhttp.open("POST", "http://localhost:3003/api/authorize", false);
          //xhttp.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3003/api/authorize');
          xhttp.setRequestHeader('Content-Type', "application/json");
          let json = JSON.stringify({
            login: email,
            password: password
        })
        xhttp.send(json);
        }
      }
    
      onRegister() {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
  
            let response = JSON.parse(xhttp.response);
            this.closeModal();
            this.props.handle({isAuth : true, nick : response.nick, token : response.token});
          }else{
            this.props.handle({isAuth : false, nick : "", token : ""});
          }
        };
        xhttp.onreadystatechange = xhttp.onreadystatechange.bind(this);




        /*console.log('__onRegister__');
        console.log('login: ' + document.querySelector('#login').value);
        console.log('email: ' + document.querySelector('#email').value);
        console.log('password: ' + document.querySelector('#password').value);*/
    
        const login = document.querySelector('#login').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
    
        if (!login || !email || !password) {
          this.setState({
            error: true
          })
        } else {
          xhttp.open("POST", "http://localhost:3003/api/register", false);
          //xhttp.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3003/api/authorize');
          xhttp.setRequestHeader('Content-Type', "application/json");
          let json = JSON.stringify({
            name : login,
            login: email,
            password: password
        })
        xhttp.send(json);
        }
      }
  
    openModal() {
      this.setState({
        showModal: true,
      });
    }
  
    closeModal() {
      this.setState({
        showModal: false,
        error: null
      });
    }
    
    onLoginSuccess(method, response) {
      console.log('logged successfully with ' + method);
    }
  
    onLoginFail(method, response) {
      console.log('logging failed with ' + method);
      this.setState({
        error: response
      })
    }
  
    startLoading() {
      this.setState({
        loading: true
      })
    }
  
    finishLoading() {
      this.setState({
        loading: false
      })
    }
  
    onTabsChange() {
      this.setState({
        error: null
      });
    }
  
  
    render() {
  
      return (
        <div>
          <button
          className="RML-btn"
          onClick={() => this.openModal('login')}
        >
          Login
        </button>
  
          <ReactModalLogin
            visible={this.state.showModal}
            onCloseModal={this.closeModal.bind(this)}
            loading={this.state.loading}
            error={this.state.error}
            tabs={{
              onChange: this.onTabsChange.bind(this)
            }}
            loginError={{
              label: "Couldn't sign in, please try again."
            }}
            registerError={{
              label: "Couldn't sign up, please try again."
            }}
            startLoading={this.startLoading.bind(this)}
            finishLoading={this.finishLoading.bind(this)}
            form={{
                onLogin: this.onLogin.bind(this),
                onRegister: this.onRegister.bind(this),

                loginBtn: {
                  label: "Sign in"
                },
                registerBtn: {
                  label: "Sign up"
                },
                recoverPasswordBtn: {
                  label: "Send new password"
                },
                loginInputs: [
                  {
                    containerClass: 'RML-form-group',
                    label: 'Email',
                    type: 'email',
                    inputClass: 'RML-form-control',
                    id: 'email',
                    name: 'email',
                    placeholder: 'Email',
                  },
                  {
                    containerClass: 'RML-form-group',
                    label: 'Password',
                    type: 'password',
                    inputClass: 'RML-form-control',
                    id: 'password',
                    name: 'password',
                    placeholder: 'Password',
                  }
                ],
                registerInputs: [
                  {
                    containerClass: 'RML-form-group',
                    label: 'Nickname',
                    type: 'text',
                    inputClass: 'RML-form-control',
                    id: 'login',
                    name: 'login',
                    placeholder: 'Nickname',
                  },
                  {
                    containerClass: 'RML-form-group',
                    label: 'Email',
                    type: 'email',
                    inputClass: 'RML-form-control',
                    id: 'email',
                    name: 'email',
                    placeholder: 'Email',
                  },
                  {
                    containerClass: 'RML-form-group',
                    label: 'Password',
                    type: 'password',
                    inputClass: 'RML-form-control',
                    id: 'password',
                    name: 'password',
                    placeholder: 'Password',
                  }
                ],
                recoverPasswordInputs: [
                  {
                    containerClass: 'RML-form-group',
                    label: 'Email',
                    type: 'email',
                    inputClass: 'RML-form-control',
                    id: 'email',
                    name: 'email',
                    placeholder: 'Email',
                  },
                ],
              }}
          >
              </ReactModalLogin>
        </div>
      )
    }
  }

  export default Sample