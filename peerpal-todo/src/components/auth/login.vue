<template>
  <div class="form-container">
        <form
          class="form"
          @submit.prevent="loginUser"
        >
          <p class="form-title">Sign In!</p>
          <input
            type="text"
            id="email"
            class="input"
            placeholder="Email"
            v-model="login.email"
          />
         
          <input
            type="password"
            id="password"
            class="input"
            placeholder="Password"
            v-model="login.password"
          />
          <p class="go-to-register">
            <router-link class="go-to-register" to="/register"
              >Don't have an account yet?</router-link
            >
          </p>
          <center>
            <button class="sign-in-btn" type="submit">
              Sign in
            </button>
          </center>
        </form>
        <div class="welcome-message">
          <h1>Welcome to ToDo+</h1>
          <h2><span class="colored-text">Why ToDo+? Because you're busy.</span><br/>
          ToDo+ is an intuitive app that will allow you
            to organize your tasks in away that leaves you stress free and 
            prepared to attack whatever obstacles may be in your way
          </h2>
        </div>
  </div>
</template>
<script>
import swal from "sweetalert"
import axios from "axios"
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
           let response = await this.$http.post("/user/login", this.login);  //Development
        // let response = await axios.post("/user/login", this.login); //Production
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "success");
          this.$router.push("/home");
        }
      } catch(err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response)
      }
    }
  }
};
</script>

<style scoped>

.form-container {
  display: flex;
  padding: 150px;
  align-items: center;
  align-items: space-between;
}

.welcome-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* border: 1px solid black; */
  min-height: 600px;
  flex: 1.5;
  padding-left: 75px;
}

.colored-text {
  color: #b993d6;
}

.form-title {
  color: #b993d6;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  font-size: 23px;
}

.input {
    width: 76%;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    text-align: center;
    font-family: 'Ubuntu', sans-serif;
}

.sign-in-btn {
    cursor: pointer;
    border-radius: 5em;
    color: #fff;
    background: linear-gradient(to right, #b993d6, #8ca6db);
    border: 0;
    padding: 10px 40px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 13px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}

.go-to-register {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #b993d6;
    padding-top: 15px;
    text-decoration: none;
}

.go-to-register:hover {
  text-decoration: underline;
  transition: .4s;
}

.form {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #FFFFFF;
  width: 600px;
  min-height: 600px;
  padding: 40px;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);    
}

@media only screen and (max-width: 1500px) {
   .form-container {
      margin-top: 60px;
}
}

@media only screen and (max-width: 1250px) {
   .welcome-message {
      display: none;
}
}   
</style>