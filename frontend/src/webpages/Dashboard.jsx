import { useState, useRef, useEffect } from "react"
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export const Dashboard = ( ) => {

    const nav = useNavigate();

    const [loginStatus, setLoginStatus] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/login").then((response) => {
          if (response.data.loggedIn == true){
            setLoginStatus(response.data.user[0].email)
          } else {
            nav("/")
            setLoginStatus("Not logged in.")
          }
        })
      },[])
    

    return (
        <>Welcome {loginStatus}</>
    );
}