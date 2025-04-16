# ClickHouse Data Ingestion Tool

A full-stack application for bi-directional data transfer between ClickHouse databases and flat files (CSV).

---

## 🚀 Project Overview

This tool provides a user-friendly interface for:

- Connecting to ClickHouse databases
- Exporting data from ClickHouse to CSV files
- Importing data from CSV files to ClickHouse
- Browsing and previewing database tables and columns

---

## 📁 Project Structure

```
.
├── backend/                # Node.js/Express backend
│   ├── src/                # Source code
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # Main server file
│   ├── uploads/            # Uploaded files directory
│   ├── exports/            # Exported files directory
│   └── package.json        # Backend dependencies
│
├── frontend/               # React/Next.js frontend
│   ├── src/                # Source code
│   │   ├── app/            # Next.js app directory
│   │   ├── components/     # UI components
│   │   └── lib/            # Utilities and API services
│   └── package.json        # Frontend dependencies
│
├── package.json            # Root with workspace scripts
├── start.sh                # Unix startup script
├── start.bat               # Windows startup script
└── .gitignore              # Git ignore rules
```

---

## ✨ Features

- **Database Connectivity**: Connect to any ClickHouse instance
- **Data Export**: Export ClickHouse table data to CSV files
- **Data Import**: Import CSV file contents into ClickHouse
- **Table/Column Browsing**: Select specific tables and columns
- **Data Preview**: Preview data before performing operations
- **File Handling**: Upload/download CSVs with ease

---

## 🛠 Technologies Used

### Backend

- Node.js with Express
- ClickHouse Node.js client
- CSV parsing utilities
- Multer for file uploads

### Frontend

- React with Next.js
- Tailored UI components
- Axios/fetch for API communication

---

## ⚡ Performance Considerations

- Efficient **stream-based file operations**
- Support for **custom CSV delimiters**
- Connection pooling and error management

---

## ✅ Prerequisites

- Node.js (v16+)
- A running ClickHouse database instance
- [pnpm](https://pnpm.io) as the package manager (recommended)

---

## 📦 Installation

### Recommended (Using Root `pnpm` Workspace)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install all dependencies:

   ```bash
   pnpm install:all
   ```

### Alternative (Manual)

```bash
git clone <repository-url>
cd <repository-directory>

# Backend
cd backend
pnpm install
cd ..

# Frontend
cd frontend
pnpm install
```

---

## ▶ Running the App

### Option 1: Use Start Scripts

**Unix/Linux/Mac:**

```bash
chmod +x start.sh
./start.sh
```

**Windows:**

```cmd
start.bat
```

### Option 2: Use Workspace Script

```bash
pnpm dev
```

This concurrently runs both frontend and backend.

### Option 3: Run Individually

```bash
# Backend
cd backend
pnpm dev

# Frontend
cd frontend
pnpm dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage

### 1. Connect to ClickHouse

- Enter connection details (host, port, user, etc.)
- Click **Connect**

### 2. Export Data

- Choose “ClickHouse to CSV”
- Select table and columns
- Provide a filename
- Click **Export**

### 3. Import Data

- Choose “CSV to ClickHouse”
- Upload a CSV file
- Select or create a target table
- Click **Import**

---

## 📚 More Info

- Backend details: [`backend/README.md`](backend/README.md)
- ClickHouse client usage: [ClickHouse JS Docs](https://clickhouse.com/docs/integrations/javascript)

---

## 🚀 Performance Optimization

From official guidance:

- Use `compression: true` in the client config for bandwidth reduction
- Use streams for large file transfers
- Prefer async inserts for high-throughput operations

---

## 📄 License

This project is licensed under the **ISC License**.
