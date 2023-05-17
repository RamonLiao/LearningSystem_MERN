import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();

const API_URL = process.env.BACKEND_API_URL + "/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")); // for dynamic navigation bar
  }
}

export default new AuthService();
