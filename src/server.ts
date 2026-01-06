import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import pdfRoutes from "./routes/pdf.routes.js";

dotenv.config({ quiet: true });

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/pdf", pdfRoutes);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
