# TalentAI Scout 🎯

**Precision AI Talent Scouting Agent for High-Growth Teams**

TalentAI Scout is an end-to-end recruitment platform that leverages AI to automate candidate sourcing, technical screening, and initial outreach. It transforms hours of manual screening into minutes of intelligent, data-driven decision-making.

---

## 🚀 Live Demo & Presentation

🌐 **Live App**: https://ahana-catalyst-submission.netlify.app/  
🎥 ## [![Watch Demo](https://cdn.loom.com/sessions/thumbnails/e69b7993809c4f208e4e0c21ee191756-with-play.gif)](https://www.loom.com/share/e69b7993809c4f208e4e0c21ee191756)

## ✨ Core Features

### 1. AI-Powered Precision Scoring
Paste any Job Description and the AI evaluates candidates based on:

- Technical Depth – Skill and tech stack alignment  
- Strategic Fit – Domain and career trajectory  
- Actionable Insights – Match reasons + identified gaps  

---

### 2. Fully Automated Pipeline (Zero-Click)

- Instant candidate evaluation  
- AI-driven interaction simulation  
- Real-time interest scoring  
- Continuous pipeline updates  

---

### 3. Premium CRM Dashboard

- Ranked candidates by priority  
- Combined Match + Interest scores  
- Clear visualization of hiring pipeline  

---

## 🧠 Scoring Logic & Methodology

The system uses a hybrid weighted scoring model:

### 🎯 Final Score

Total Score = (0.7 × Match Score) + (0.3 × Interest Score)

---

### 🔍 Match Score (70%)

Match Score =
(0.5 × Skill Match) +
(0.3 × Experience Match) +
(0.2 × Domain Match)

- Skill Match = (matched skills / required skills) × 100  
- Experience Match = proportional to required experience  
- Domain Match = industry alignment  

---

### ❤️ Interest Score (30%)

Interest Score =
(0.4 × Salary Fit) +
(0.3 × Role Match) +
(0.3 × Engagement Level)

- Salary compatibility  
- Role alignment  
- Simulated engagement level  

---

### 📊 Example

Match Score = 75.5  
Interest Score = 80  

Total Score = 76.85 ≈ 77%

---

## 🏗️ Architecture Overview

User → React Frontend → Scoring Engine → Candidate Analysis → Dashboard

- Frontend: React + Vite  
- Logic Layer: Scoring + simulation engine  
- Output: Ranked candidates with explanations  

---

## 📊 Sample Input & Output

### Input:
- Job: React Developer (2+ years)
- Candidate: React + Node, 1.5 years experience

### Output:
- Match Score: 75%  
- Interest Score: 80%  
- Final Score: 77%  

Insights:
- Strong frontend skills  
- Slight experience gap  

---

## 🛠️ Tech Stack

- Frontend: React 18, Vite  
- Styling: CSS3 (Glassmorphism UI)  
- Logic: Simulated AI scoring engine  
- Deployment: Netlify  

---

## 📦 Getting Started

npm install  
npm run dev  

---

## 🌐 Deployment

This project is deployed using Netlify (manual static deployment) for maximum reliability.

---

## 🏆 Hackathon Notes

This project demonstrates:

- Autonomous AI workflow design  
- Explainable scoring system  
- Real-world recruitment simulation  

The goal is to reduce recruiter workload while improving decision quality through transparent, data-driven insights.
---
