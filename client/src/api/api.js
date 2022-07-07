import axios from "axios";

export const myApi = (token) => {
  let myUrl = "http://localhost:5050/api"; //development

  if (process.env.NODE_ENV === "production") {
    myUrl = "/api";
  }
  // console.log("myUrl: ", myUrl);
  axios.defaults.headers.common["Authorization"] = "Bearer " + `${token}`;

  return axios.create({
    baseURL: myUrl,
  });
};
