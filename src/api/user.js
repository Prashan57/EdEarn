import axiosInstance from "./axiosInstance";

export const signUpUserApi = async ({ email, password }) => {
  const res = await axiosInstance.post("/api/createUser", {
    email,
    password,
  });
  console.log(res.data.status);

  return res.data;
};

export const loginInUserApi = async ({ email, password }) => {
  const res = await axiosInstance.post("/api/loginUser", {
    email,
    password,
  });
  console.log(res.data.status);
  return res.data;
};
