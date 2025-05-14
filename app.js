import express from "express";
import cors from "cors";

import routes from "./src/controllers/users.js";

import { client } from "./src/database/config.js";
import createUserTable from "./src/database/migrations.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(routes);

app.get("/", (req, res) => {
  res.send("Server online");
});

client
  .connect()
  .then(() => {
    console.info("Base de datos conectada");
    createUserTable(client).then(() => {
      app.listen(3000, () => {
        console.info("Server online in port 3000");
      });
    });
  })
  .catch((err) =>
    console.error(`Error al conectar con la base de datos: ${err}`)
  );
