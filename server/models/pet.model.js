const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Pet's name must be at least 3 characters long!"]
        
    },
    type: {
        type: String,
        required: [true, "Type of pet is required"],
        minlength: [3, "Pet's type must be at least 3 characters long!"]
    },
    description: {
        type: String,
        required: [true, "Description of pet is required!"],
        minlength: [3, "Description must be at least 3 characters long!"]
    },
    skill1: {
        type: String,
        required: [false]
    },
    skill2: {
        type: String,
        required: [false]
    },
    skill3: {
        type: String,
        required: [false]
    }
    
    },

    {timestamps: true}

);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;

