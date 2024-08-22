import axios from "axios";

export const postUser = async () => {
    const res = await axios.post("http://localhost:5000/api/admin/signup")
    .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("No Data");
    }
  
    const data = await res.data;
    return data;
  };