const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");
    

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

const AllMyPetRoutes = require("./server/routes/pet.routes");
AllMyPetRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );