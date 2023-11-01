import {useState, useEffect} from "react";
import Sports from "../Components/Sports";
import API_URL from "../API_URL.JS";
function SportsCode(){
    const [data, setData]=useState([]);

    useEffect(()=>{
        fetch(API_URL + "/Sports/getSports?parameter=''")
        .then((response) => {
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data)=>{
            setData(data);
            
        })
        .catch((error)=>{
            console.error("Error get the data: ", error);
        });
    },[]);

    return(
            <Sports data={data}></Sports>
    )
}

export default SportsCode;