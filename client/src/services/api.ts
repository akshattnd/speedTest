import { Result, Test } from "@/types";
import axios from "axios"
const backend = import.meta.env.VITE_API_URL || "http://localhost:3000";
// auth 
export const isAuth = async () => {
  try {
    const { data } = await axios.get(`${backend}/api/auth/isAuth`, { withCredentials: true })
    return data;
  } catch (err) {
    console.error("error occured", err)
    throw err;
  }
}
export const login = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${backend}/api/auth/login`, { email, password }, { withCredentials: true });
    return data;
  } catch (err) {
    console.error("err occured", err);
    throw err;
  }
};
export const signup = async (username: string, email: string, password: string) => {
  try {
    const { data } = await axios.post(`${backend}/api/auth/signup`, { username, email, password }, { withCredentials: true });
    return data;
  } catch (err) {
    console.log("err occured");
    throw err;
  }
};
export const logout = async () => {
  try {
    const { data } = await axios.post(`${backend}/api/auth/logout`, {}, { withCredentials: true });
    return data;

  } catch (err) {
    console.log("err occured");
    throw err;
  }
}
// user
export const user = async () => {
  try {
    const { data } = await axios.get(`${backend}/api/user/`, { withCredentials: true });
    return data;
  } catch (err) {
    console.log("err occured");
    throw err;
  }
}
export const updateUser = async (username: string, email: string, password: string) => {
  try {
    const { data } = await axios.put(`${backend}/api/user/`, { email, password, username }, { withCredentials: true });
    return data
  } catch (err) {
    console.log("err occured");
    throw err;
  }
}
export const deleteUser = async () => {
  try {
    const { data } = await axios.delete(`${backend}/api/user/`, { withCredentials: true });
    return data;
  } catch (err) {
    console.log("err occured");
    throw err;
  }
}
// test 
export const generateTest = async (length: number): Promise<Test> => {
  try {
    const { data } = await axios.post(`${backend}/api/test`, { length }, { withCredentials: true });
    return data;
  } catch (err) {
    console.log("err occured");
    throw err;
  }
};

// result
export const submitResult = async (wpm: number, accuracy: number, testId: string, timeTaken: number) => {
  try {
    const { data } = await axios.post(`${backend}/api/result/submit`, { wpm, accuracy, timeTaken, testId }, { withCredentials: true });
    return data;
  } catch (err) {
    console.log("err occured");
    throw err;
  }
}
export const getAllResults = async (): Promise<{ msg: string, results: Result[] }> => {
  try {
    const { data } = await axios.get(`${backend}/api/result/user`, { withCredentials: true });
    return data;
  } catch (err) {
    console.log("err occured");
    throw err;
  }
}
export const getResult = async (id: string) => {
  try {
    const { data } = await axios.get(`${backend}/api/result/${id}`, { withCredentials: true });
    return data;
  } catch (err) {
    console.log("err occured");
    throw err;
  }
}