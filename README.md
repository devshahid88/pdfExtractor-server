# PDF Extractor - Backend Server

## What This Does
This is the backend server that handles PDF file uploads and page extraction.

## How It Works

### 1. Upload PDF
- User uploads a PDF file from the frontend
- Server saves it in the `uploads` folder
- Returns a unique file ID to the frontend

### 2. Extract Pages
- User selects which pages they want (e.g., pages 1, 3, 5)
- Frontend sends the file ID and selected page numbers
- Server uses `pdf-lib` to:
  - Open the original PDF
  - Copy only the selected pages
  - Create a new PDF with just those pages
  - Save it in the `uploads` folder

### 3. Download
- Server provides a download link
- User clicks and gets the new PDF with only selected pages

## Tech Stack
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Multer** - File upload handling
- **pdf-lib** - PDF manipulation

## Setup & Run

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Server runs on: `http://localhost:5000`

### Build for Production
```bash
npm run build
npm start
```

## API Endpoints

### POST `/api/pdf/upload`
Upload a PDF file
- **Body**: FormData with `pdf` file
- **Response**: `{ fileId: "1234567890-document.pdf" }`

### POST `/api/pdf/extract`
Extract selected pages
- **Body**: `{ fileId: "...", pages: [1, 3, 5] }`
- **Response**: `{ downloadUrl: "/api/pdf/download/extracted-1234.pdf" }`

### GET `/api/pdf/download/:filename`
Download the extracted PDF
- **Response**: PDF file download

## Folder Structure
```
server/
├── src/
│   ├── server.ts           # Main server setup
│   ├── routes/
│   │   └── pdf.routes.ts   # API routes
│   ├── controllers/
│   │   └── pdf.controller.ts  # Business logic
│   ├── middlewares/
│   │   └── upload.ts       # File upload config
│   └── utils/
│       └── extractPages.ts # PDF extraction logic
├── uploads/                # Uploaded & extracted PDFs
└── package.json
```

## Environment Variables
Create a `.env` file:
```
PORT=5000
```

## Notes
- Only PDF files are allowed
- Files are stored in the `uploads` folder
- Each uploaded file gets a unique timestamp-based name
