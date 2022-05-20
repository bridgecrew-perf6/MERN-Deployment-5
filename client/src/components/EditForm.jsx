import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

const EditForm = () => {

    const { _id } = useParams();
    const [info, setInfo] = useState({});
    let [errors, setErrors] = useState({});
    let [nameFound, setNameFound] = useState(false);
    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${_id}`)
            .then(res => {
                console.log(res);
                setInfo(res.data.pet);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const changeHandler = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const updatePet = (e) => {
        e.preventDefault();
        console.log("WORKING")
        setNameFound(false)

        axios.get(`http://localhost:8000/api/pets/names/${info.name}`)
            .then(res => {
                if (res.data.pet == null) {
                    axios.put(`http://localhost:8000/api/pets/edit/${_id}`, info)
                        .then(res => {

                            console.log("response after posting form", res)

                            if (res.data.error) {
                                setErrors(res.data.error.errors);
                            }
                            else {
                                setInfo({});
                                history.push("/");
                            }

                        })
                        .catch(err => console.log("ERROR!!!", err))
                }
                else if(res.data.pet.name == info.name){
                    console.log("No way...")
                    setNameFound(true)
                }
            })

    }

    return (
        <>
            <h3><Link to="/">back to home</Link></h3>
            <h4>Edit {info.name} </h4>
            <div>
                <form onSubmit={updatePet} className='mx-auto container'>
                    <div className='form-group'>
                        <label >Pet Name:</label>
                        <input type="text" name="name" className='form-control' value={info.name} onChange={changeHandler} />
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
                        <input type="text" name="type" className='form-control' value={info.type} onChange={changeHandler} />
                        <p className="text-danger">{errors.type?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Pet Description</label>
                        <input type="text" name="description" id="" className="form-control" value={info.description} onChange={changeHandler} />
                        <p className="text-danger">{errors.description?.message}</p>
                    </div>
                    <h4>Skills (optional)</h4>
                    <div className="form-group">
                        <label htmlFor="">Skill 1:</label>
                        <input type="text" name="skill1" id="" className="form-control" value={info.skill1} onChange={changeHandler} />
                        <p className="text-danger">{errors.skill1?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Skill 2:</label>
                        <input type="text" name="skill2" id="" className="form-control" value={info.skill2} onChange={changeHandler} />
                        <p className="text-danger">{errors.skill2?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Skill 3:</label>
                        <input type="text" name="skill3" id="" className="form-control" value={info.skill3} onChange={changeHandler} />
                        <p className="text-danger">{errors.skill3?.message}</p>
                    </div>
                    <input type="submit" value="Edit Pet" />
                </form>
            </div>
        </>
    )

}

export default EditForm;