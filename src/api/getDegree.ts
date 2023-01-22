import axios from "axios";
import type { Job } from "./types";

const getDegrees = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/degrees`;
  const response = await axios.get<Job[]>(url);
  return response.data;
};

export default getDegrees;
