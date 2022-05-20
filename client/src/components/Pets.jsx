import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Pets = () => {

    let[allPets, setAllPets] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8000/api/pets")
            .then(res => {
                console.log(res)
                setAllPets(res.data.pets)})
            .catch(err => {console.log("Something went wrong", err)})
    }, [])

    // const deletePet = (petId, idx) => {
        
    //     axios.delete(`http://localhost:8000/api/pets/delete/${petId}`)
    //         .then(res => {
    //             console.log(res)
                
    //         })
    //         .catch(err => {console.log(err)})

    //     }

    return(
        <>
            <div className='container-sm'>
                <h3><Link to="/pets/new">Add a pet to the shelter</Link></h3>
                <h4>These pets are looking for a good home </h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Type</th>
                            <th scope='col'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                              {
                                  allPets.map((petObj, idx) => {
                                      return(
                                          <tr key={idx}>
                                              <td>{petObj.name}</td>
                                              <td>{petObj.type}</td>
                                              <td><button className='btn btn-dark'><Link to={`/pets/${petObj._id}`}>Details</Link></button> <button className='btn btn-dark'><Link to={`/pets/edit/${petObj._id}`}>Edit</Link></button></td>
                                          </tr>
                                      )
                                  })
                              }          
                        </tbody>
                </table>
            </div>
                
    

        </>
    )
    
}

export default Pets;