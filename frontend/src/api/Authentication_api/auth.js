// import axios from 'axios';


// export const Signup = async (input, userType, secretKey) => {
//   const endpoint = userType === 'Admin' ? "http://localhost:5000/api/admin/signup" : "http://localhost:5000/api/users/register";
//   try {
//     const res = await axios.post(endpoint, { ...input, userType, secretKey: userType === 'Admin' ? input.name : undefined });
//     console.log('Response from login:', res.data);
//     return res.data;
//   } catch (err) {
//     console.log(err.message);
//     throw err;
//   }
// };


// export const Login = async (input, userType, secretKey) => {
//     const endpoint = userType === 'Admin' ? "http://localhost:5000/api/admin/login" : "http://localhost:5000/api/users/login";
//     try {
//       const res = await axios.post(endpoint, { ...input, secretKey: userType === 'Admin' ? secretKey : undefined });
//       console.log('Response from login:', res.data);
//       return res.data;
//     } catch (err) {
//       console.log(err.message);
//       throw err;
//     }
// };

import axios from 'axios';

const API = axios.create({ baseURL: `https://stack-movies4-20.onrender.com` });

// API.interceptors.request.use(req => {
//   if (localStorage.getItem("Profile")) {
//     req.headers.authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("Profile")).token
//     }`;
//   }
//   return req;
// });

export const Signup = async (input, userType, secretKey) => {
  const endpoint = userType === 'Admin' ? "/api/admin/signup" : "/api/users/register";
  try {
    const res = await API.post(endpoint, { ...input, userType, secretKey: userType === 'Admin' ? input.name : undefined });
    console.log('Response from signup:', res.data);
    return res.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const Login = async (input, userType, secretKey) => {
  const endpoint = userType === 'Admin' ? "/api/admin/login" : "/api/users/login";
  try {
    const res = await API.post(endpoint, { ...input, secretKey: userType === 'Admin' ? secretKey : undefined });
    console.log('Response from login:', res.data);
    return res.data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
