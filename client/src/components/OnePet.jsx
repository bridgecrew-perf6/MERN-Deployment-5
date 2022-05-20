import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import {Link, useHistory} from 'react-router-dom';

const OnePet = () => {

    const { _id } = useParams();
    let [info, setInfo] = useState({});
    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${_id}`)
            .then(res => {
                setInfo(res.data.pet)
                console.log(res.data.pet)
            })
            .catch(err => {console.log("Something went wrong! ", err)})
    }, [])

    const adoptPet = (petId) => {
        
        axios.delete(`http://localhost:8000/api/pets/delete/${petId}`)
            .then(res => {
                console.log(res)
                history.push("/")
            })
            .catch(err => {console.log(err)})
    }

    return(
        <>
            <h3><Link to="/">back to home</Link></h3>
            <br />

            <div className="container">
            <h3>Details about: {info.name}</h3>
            <button onClick={(e) => adoptPet(info._id)}>Adopt {info.name}</button>
            </div>
            <br />
            <div className="container mx-auto" style={{border: "2px solid white"}}>
                <h4>Pet Type: {info.type}</h4>
                <h4>Description: {info.description}</h4>
                <h4>Skills: {info.skill1} {info.skill2} {info.skill3}</h4>
            </div>
        </>
    )
}

export default OnePet;