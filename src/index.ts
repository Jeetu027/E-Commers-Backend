import express, { Request, Response } from "express";
import cors from "cors";
import foodsRoutes from "./foods/foods.routes";
import { ErrorHandler } from "./middleware/errorHandler";
import categoryRoutes from "./category/category.routes";
import usersRoutes from "./users/users.routes";
import ingredientsRoutes from "./ingredients/ingredients.routes";
import nutritionsRoutes from "./nutritions/nutritions.routes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/foods", foodsRoutes);
app.use("/category", categoryRoutes);
app.use("/users", usersRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/nutritions", nutritionsRoutes);

app.use(ErrorHandler);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express Server! 🚀");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
