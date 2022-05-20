const Pet = require("../models/Pet.model");

module.exports.findAllPets = (req, res) => {
    Pet.find().sort({"type": 1})
        .then(allPets => res.json({pets: allPets}))
        .catch(err => res.json({message: "Something went wrong", error: err}))
}

module.exports.createPet = (req, res) => {
    Pet.create(req.body)
        .then(newPet => res.json({pet: newPet}))
        .catch(err => res.json({ message: "Something went wrong", error: err}));
};

module.exports.findOnePet = (req, res) => {
    Pet.findOne({_id: req.params.id})
        .then(onePet => {res.json({pet: onePet})})
        .catch(err => res.json({message: "Something went wrong", error: err}))
};

module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, { new: true, runValidators: true})
        .then(updatedPet => {res.json({pet: updatedPet})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};

module.exports.deletePet = (req, res) => {
    Pet.findOneAndDelete({_id: req.params.id})
        .then(result => res.json({result: result}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
};

module.exports.findOnePetByName = (req, res) => {
    Pet.findOne({name: req.params.name})
        .then(namedPet => {res.json({pet: namedPet})})
        .catch(err => res.json({message: "Something went wrong!", error: err}))
};