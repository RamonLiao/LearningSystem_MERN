import axios from "axios";

// const API_URL = process.env.REACT_APP_API + "/api/courses";
const API_URL = "https://learning-system-mern.vercel.app/api/courses";

class CourseService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // it is the easiest way to populate data but not the most efficient way.
  getEnrolledCourses(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    // avoid empty string and allow to select all items
    if (name === "") {
      name = ".*";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }

  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/instructor/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  enroll(_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/enroll/" + _id,
      { user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new CourseService();
