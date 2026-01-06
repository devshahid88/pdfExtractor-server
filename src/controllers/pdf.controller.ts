import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { extractPages } from "../utils/extractPages.js";

export const uploadPdf = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded" });
    }

    return res.status(200).json({
      message: "PDF uploaded successfully",
      fileId: req.file.filename
    });
  } catch (error) {
    return res.status(500).json({ message: "Upload failed" });
  }
};

export const extractPdf = async (req: Request, res: Response) => {
  try {
    const { fileId, pages } = req.body as {
      fileId: string;
      pages: number[];
    };

    if (!fileId || !pages || pages.length === 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const inputPath = path.join("uploads", fileId);
    const outputFileName = `extracted-${Date.now()}.pdf`;
    const outputPath = path.join("uploads", outputFileName);

    await extractPages(inputPath, pages, outputPath);

    return res.status(200).json({
      message: "PDF extracted successfully",
      downloadUrl: `/api/pdf/download/${outputFileName}`
    });
  } catch (error) {
    return res.status(500).json({ message: "Extraction failed" });
  }

  
};

export const downloadPdf = (req: Request, res: Response) => {
  try {
    const fileName = req.params.file;
    const filePath = path.join("uploads", fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found"
      });
    }

    return res.download(filePath, fileName, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error downloading file"
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while downloading file"
    });
  }
};

