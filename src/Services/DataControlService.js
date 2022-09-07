import axios from "axios";

export default axios.create({
    baseURL: "https://parentalapp.herokuapp.com/",
});