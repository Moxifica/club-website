import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString(), app: "SoLAcc IT Club Hub" });
  });

  // AI Advisor Endpoint for SoLAcc IT Students
  app.post("/api/ai/advisor", async (req, res) => {
    try {
      const { mode, prompt, context } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback simulated intelligent response if API key is not configured yet
        let fallbackResponse = "";
        if (mode === "project_idea") {
          fallbackResponse = `### 💡 Recommended Project Idea: Acadiana Community Tech Asset & Inventory Tracker
**Domain:** Full-Stack & Cloud / Cybersecurity
**Overview:** A secure inventory and loan tracking application for South Louisiana non-profits or community college labs to track equipment, laptops, and networking switches.
**Key Tech Stack:** React, Tailwind CSS, Node.js/Express, SQLite/PostgreSQL, JWT Auth, Docker containerization.
**Why it stands out to Acadiana Tech Employers (like CGI & Local IT):** Demonstrates real-world CRUD capabilities, role-based access control (RBAC), and clean deployment practices.
**Key Features to build:**
1. Barcode/QR scanning for quick checkouts
2. Role-based dashboard (Admin, Faculty, Student)
3. Audit logging for compliance and security`;
        } else if (mode === "resume_bullet") {
          fallbackResponse = `### 📝 Optimized Resume Bullet Points:
• **Spearheaded development** of a responsive full-stack inventory tracker using React, TypeScript, and Node.js, reducing equipment checkout discrepancies by 35%.
• **Architected secure RESTful APIs** with JWT-based authentication and role-based permissions, successfully mitigating unauthorized access attempts.
• **Automated containerized deployment** using Docker and CI/CD pipelines, cutting staging deployment cycles from 45 minutes to under 5 minutes.`;
        } else if (mode === "interview_prep") {
          fallbackResponse = `### 🎯 Technical Interview Scenario (Junior Sysadmin / Network Specialist):
**Question:** *"A user in the Devalcourt Hall computer lab reports they cannot connect to the internet, but other students in the same room can. Walk me through your step-by-step troubleshooting methodology."*
**Key Areas Interviewers Look For:**
1. **Layer 1 Physical check:** Cable connection, link lights on NIC and switch port.
2. **Layer 2/3 Networking:** Running \`ipconfig /all\` or \`ip a\`, checking for valid 169.254.x.x (APIPA) vs DHCP assigned IP, testing gateway ping (\`ping 192.168.1.1\`).
3. **DNS Testing:** Pinging public IP (8.8.8.8) vs hostname (\`ping solacc.edu\`) to isolate DNS resolution issues.
4. **Resolution:** \`ipconfig /release && ipconfig /renew\` or socket reset.`;
        } else {
          fallbackResponse = `Welcome to the SoLAcc IT Club Advisor! I'm here to help South Louisiana Community College students excel in IT, Cyber Security, Cloud, and Software Development. Ask me anything about choosing your IT concentration, preparing for CompTIA/Cisco certs, or building portfolio projects!`;
        }

        return res.json({
          success: true,
          content: fallbackResponse,
          isFallback: true,
        });
      }

      let systemInstruction = `You are the SoLAcc IT Club AI Mentor and Career Advisor at South Louisiana Community College (Lafayette, LA).
Your audience is college students pursuing Information Technology (Application Development, Cloud Computing, Cyber Security, Network Administration, Systems Support).
You are encouraging, highly practical, technically accurate, and familiar with the Louisiana/Acadiana tech job landscape (CGI Lafayette Innovation Center, Opportunity Machine, local healthcare IT, state agencies, remote IT roles).
Format all responses in clean, beautifully structured Markdown with bullet points, bold key terms, and code snippets when relevant.`;

      let promptInstruction = "";
      if (mode === "project_idea") {
        promptInstruction = `Generate 2 specific, impressive, and actionable IT project ideas for a student interested in: "${prompt}". Include: Project Name, Target IT Track, Tech Stack, Key Features, and why it will impress recruiters. Extra student context: ${context || "None"}`;
      } else if (mode === "resume_bullet") {
        promptInstruction = `Transform the following rough project or work description into 3-4 powerful, metric-driven, action-verb-oriented resume bullet points formatted in the STAR method for an IT resume:\n"${prompt}"`;
      } else if (mode === "interview_prep") {
        promptInstruction = `Provide a realistic technical interview question and a comprehensive breakdown of an ideal answer for the following IT topic or role: "${prompt}". Include tips on what local IT hiring managers look for.`;
      } else {
        promptInstruction = `Answer the following question from a SoLAcc IT student with friendly, actionable advice:\n"${prompt}"`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: promptInstruction,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        content: response.text || "No response received.",
        isFallback: false,
      });
    } catch (error: any) {
      console.error("AI Advisor error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI response",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SoLAcc IT Club server running on port ${PORT}`);
  });
}

startServer();
