import axios from "axios";

export const postUser = async () => {
    const res = await axios.post("https://stack-movies4-20.onrender.com/api/admin/signup")
    .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("No Data");
    }
  
    const data = await res.data;
    return data;
  };
