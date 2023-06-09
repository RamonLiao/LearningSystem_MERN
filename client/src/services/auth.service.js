import axios from "axios";

// const API_URL = process.env.REACT_APP_API + "/api/user"; // for local test
const API_URL = "https://learning-system-mern.vercel.app/api/user";

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
