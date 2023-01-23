import express from "express";
import usersRoutes from "./routes/users.routes.js";
import rentsRoutes from "./routes/rents.routes.js";

const app = express();
app.use(express.json());

app.use(usersRoutes);
app.use(rentsRoutes);

app.listen(4000, () => console.log(`Server running in port: 4000`));