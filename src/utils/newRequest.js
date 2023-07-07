import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://surojuapinew.vercel.app/",
  withCredentials: true,
});

export default newRequest;
