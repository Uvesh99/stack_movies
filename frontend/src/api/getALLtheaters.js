import axios from "axios";

export const getAlltheaters = async () => {
    const res = await axios.get("http://localhost:5000/api/theatres/")
    .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("No Data");
    }
  
    const data = await res.data;
    return data;
  };
