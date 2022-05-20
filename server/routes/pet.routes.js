const PetController = require("../controllers/pet.controller");

module.exports = app => {
    app.post("/api/pets/new", PetController.createPet);
    app.get("/api/pets", PetController.findAllPets);
    app.get("/api/pets/:id", PetController.findOnePet);
    app.get("/api/pets/names/:name", PetController.findOnePetByName);
    app.put("/api/pets/edit/:id", PetController.updatePet);
    app.delete("/api/pets/delete/:id", PetController.deletePet);
}