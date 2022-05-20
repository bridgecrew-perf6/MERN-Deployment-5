import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const PetForm = () => {

    let [name, setName] = useState("");
    let [type, setType] = useState("");
    let [description, setDescription] = useState("");
    let [skill1, setSkill1] = useState("");
    let [skill2, setSkill2] = useState("");
    let [skill3, setSkill3] = useState("");
    let [errors, setErrors] = useState({});
    let [nameFound, setNameFound] = useState(false);
    let history = useHistory();
    

    const createPet = (e) => {
        e.preventDefault();
        setNameFound(false)

        let formInfo = { name, type, description, skill1, skill2, skill3 }

        axios.get(`http://localhost:8000/api/pets/names/${name}`)
            .then(res => {
                console.log(res)
                
                if(res.data.pet == null) {
                    axios.post("http://localhost:8000/api/pets/new", formInfo)
                        .then(res => {
                            console.log("Response after posting form", res)

                            if (res.data.error) {
                                setErrors(res.data.error.errors);
                            }
                            else {
                                setName("");
                                setType("");
                                setDescription("");
                                setSkill1("");
                                setSkill2("");
                                setSkill3("");
                                setNameFound(false)
                                history.push("/")
                            }
                        })
                        .catch(err => console.log("ERROR!!!", err))
                }
                else if(res.data.pet.name == name){
                    console.log("NOOOPE")
                    setNameFound(true)
                }
                
            })
            .catch(err => console.log("ERROR!!!", err))

         
                
            

    }

    return (
        <>
            <h3><Link to="/">back to home</Link></h3>
            <h4>Know a pet needing a home? </h4>
            <div>
                <form onSubmit={createPet} className='mx-auto container'>
                    <div className='form-group'>
                        <label >Pet Name:</label>
                        <input type="text" className='form-control' name="name" onChange={(e) => setName(e.target.value)} />
                        <p className="text-danger">{errors.name?.message}</p>
                        {
                            nameFound?
                            <p className="text-danger">This pet name is already in our database!</p>
                            :
                            ""
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Type:</label>
                        <input type="text" name="type" className='form-control' onChange={(e) => setType(e.target.value)} />
                        <p className="text-danger">{errors.type?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Description</label>
                        <input type="text" name="description" id="" className="form-control" onChange={(e) => setDescription(e.target.value)} />
                        <p className="text-danger">{errors.description?.message}</p>
                    </div>
                    <h4>Skills (optional)</h4>
                    <div className="form-group">
                        <label htmlFor="">Skill 1:</label>
                        <input type="text" name="skill1" id="" className="form-control" onChange={(e) => setSkill1(e.target.value)} />
                        <p className="text-danger">{errors.skill1?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Skill 2:</label>
                        <input type="text" name="skill2" id="" className="form-control" onChange={(e) => setSkill2(e.target.value)} />
                        <p className="text-danger">{errors.skill2?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Skill 3:</label>
                        <input type="text" name="skill3" id="" className="form-control" onChange={(e) => setSkill3(e.target.value)} />
                        <p className="text-danger">{errors.skill3?.message}</p>
                    </div>
                    <input type="submit" value="Add Pet" />
                </form>
            </div>
        </>
    )

}

export default PetForm;