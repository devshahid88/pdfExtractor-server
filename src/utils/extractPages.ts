import { PDFDocument } from "pdf-lib";
import fs from "fs";

export const extractPages = async (
  filePath: string,
  pages: number[],
  outputPath: string
): Promise<void> => {
  const existingPdfBytes = fs.readFileSync(filePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(
    pdfDoc,
    pages.map(page => page - 1)
  );

  copiedPages.forEach(page => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  fs.writeFileSync(outputPath, pdfBytes);
};
