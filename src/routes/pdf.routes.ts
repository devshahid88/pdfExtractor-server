import { Router } from "express";
import { extractPages } from "../utils/extractPages.js";
import { uploadPdf, extractPdf,downloadPdf } from "../controllers/pdf.controller.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/upload", upload.single("pdf"), uploadPdf);
router.post("/extract", extractPdf);
router.get("/download/:file", downloadPdf);


export default router;
