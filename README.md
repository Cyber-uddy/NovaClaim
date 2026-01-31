
# 🚀 NOVACLAIM — AI-Assisted Innovation Gap Analyzer

NOVACLAIM is an **enterprise-grade decision-support platform** that analyzes patent and research abstracts to identify **innovation gaps** aligned with **SDG-9 (Industry, Innovation & Infrastructure)**.

Unlike traditional patent analytics that focus on **what exists**, NOVACLAIM highlights **what is missing** — enabling smarter R&D, policy, and infrastructure planning.

---

## 🧠 Key Idea

> Innovation volume does not guarantee innovation impact.
> NOVACLAIM reveals **under-explored innovation domains** using **unsupervised semantic analysis**.

---

## 🏗️ System Architecture

```
Frontend (Vite + React / Google AI Build)
        ↓ REST API
Backend (FastAPI)
        ↓
NLP + Embeddings + Clustering + Gap Logic
```

---

## 🔑 Role-Based Design (Enterprise-Focused)

* **CTO** → System validation & governance
* **Principal Analyst** → Domain & gap interpretation
* **Strategist** → Innovation planning & SDG alignment

> NOVACLAIM is designed as a **decision-support system**, not a fully autonomous AI.

---

## 🧰 Tech Stack

### 🔹 Frontend

* React
* Chart.js

### 🔹 Backend

* Python 3.10+
* FastAPI
* Pandas, NumPy

### 🔹 NLP & AI

* spaCy + NLTK (text preprocessing)
* Sentence Transformers (`all-MiniLM-L6-v2`)
* HDBSCAN (unsupervised clustering)

---

## ⚙️ Local Setup Instructions

### 📁 Project Structure

```
NovaClaim/
├── frontend/
└── backend/
```

---

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

## 🧪 Backend Setup

### 1️⃣ Install dependencies

```bash
pip install -r backend/requirements.txt
```

### 2️⃣ Download spaCy language model

```bash
python -m spacy download en_core_web_sm
```

### 3️⃣ Run backend

```bash
uvicorn backend.main:app --reload
```

Backend will run on:

```
http://localhost:8000
```

---

## 🔍 API Documentation

Once backend is running, open:

```
http://localhost:8000/docs
```

You can:

* Upload CSV data
* Trigger analysis
* View detected innovation gaps

---

## 📄 Expected CSV Format

Your CSV **must contain** at least:

```text
abstract
```

(Optional columns like `title`, `year`, etc. are supported.)

---

## 🔄 Backend Workflow

1. Data ingestion (CSV upload)
2. Text cleaning (spaCy + NLTK)
3. Sentence embeddings
4. Innovation domain clustering (HDBSCAN)
5. Innovation gap detection (density-based logic)
6. Insight delivery via REST API

---

## 📌 Learning Paradigm

* **Unsupervised semantic analysis**
* No labeled training data
* No predictive modeling
* Human-in-the-loop decision support

---

## 🎯 MVP Scope

* Upload innovation data
* Discover innovation domains
* Identify low-density (gap) domains
* Visualize insights for enterprise roles

---

## 💡 Potential Users

* Government & policy institutions
* Enterprise R&D divisions
* Infrastructure planners
* Research organizations
* Innovation consultancies

---

## 💰 Business Model (Conceptual)

* Enterprise subscription (annual)
* Department / organization licensing
* Pilot deployments for public institutions

---

## 🔒 Ethics & Responsibility

NOVACLAIM does **not replace human judgment**.
It augments strategic thinking by making innovation blind spots visible.

---

## 🚧 Future Scope

* Multi-country patent datasets
* SDG-wise innovation mapping
* Trend analysis across years
* Public exploratory dashboard (read-only)

---

## 🏆 Hackathon Context

Built during a **24-hour hackathon** with focus on:

* Practicality
* Explainability
* Enterprise relevance
* SDG-9 alignment

---
Made by : Caffeine&Code 
@sonilakshita
@Snowwden-gpa


## 📜 License

This project is for **educational and demonstration purposes**.


