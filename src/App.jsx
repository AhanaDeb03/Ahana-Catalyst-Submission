import { useState, useRef, useEffect } from "react";

const SAMPLE_JD = `Senior Full-Stack Engineer – FinTech
Location: Remote (India preferred)
Experience: 4–8 years

We're building the next generation of embedded finance infrastructure. We need a Senior Full-Stack Engineer who can own end-to-end feature delivery across our React frontend and Node.js/Python backend services.

Requirements:
- Strong proficiency in React, TypeScript, Node.js
- Experience with microservices and REST/GraphQL APIs
- Familiarity with PostgreSQL and Redis
- Exposure to AWS or GCP cloud infrastructure
- Prior experience in FinTech, payments, or banking domain is a strong plus
- Excellent communication and ability to work cross-functionally

Nice to have:
- Experience with Kafka or event-driven architecture
- Open source contributions
- Prior startup experience`;

const MOCK_CANDIDATES = [
  {
    id: 1,
    name: "Priya Sharma",
    title: "Senior Software Engineer",
    company: "Razorpay",
    location: "Bangalore, India",
    experience: "6 years",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "GraphQL"],
    summary: "Full-stack engineer with deep FinTech experience at Razorpay, led payment gateway integrations serving 10M+ transactions/day.",
    avatar: "PS",
    color: "#7C3AED"
  },
  {
    id: 2,
    name: "Arjun Mehta",
    title: "Lead Frontend Engineer",
    company: "CRED",
    location: "Pune, India",
    experience: "5 years",
    skills: ["React", "TypeScript", "Redis", "Node.js", "GCP"],
    summary: "Frontend specialist turned full-stack. Built CRED's rewards engine UI with high-performance React. Exploring backend-heavy roles.",
    avatar: "AM",
    color: "#0891B2"
  },
  {
    id: 3,
    name: "Sneha Rao",
    title: "Platform Engineer",
    company: "Stripe (APAC)",
    location: "Hyderabad, India",
    experience: "7 years",
    skills: ["Node.js", "Python", "Kafka", "PostgreSQL", "AWS", "Microservices"],
    summary: "Payments infrastructure engineer at Stripe. Owns the reconciliation platform. Strong in distributed systems and event-driven architecture.",
    avatar: "SR",
    color: "#059669"
  },
  {
    id: 4,
    name: "Rahul Gupta",
    title: "Full-Stack Developer",
    company: "Juspay",
    location: "Chennai, India",
    experience: "4 years",
    skills: ["React", "Node.js", "PostgreSQL", "REST APIs", "Docker"],
    summary: "Generalist engineer at a payments orchestration startup. Solid React and Node skills, working in FinTech from day one of career.",
    avatar: "RG",
    color: "#D97706"
  },
  {
    id: 5,
    name: "Kavya Nair",
    title: "Senior Backend Engineer",
    company: "PhonePe",
    location: "Bangalore, India",
    experience: "5 years",
    skills: ["Python", "Kafka", "PostgreSQL", "Redis", "GCP", "Microservices"],
    summary: "Backend-heavy engineer at PhonePe's transaction infrastructure team. Excellent at scale, but looking to expand into full-stack work.",
    avatar: "KN",
    color: "#BE185D"
  }
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function callClaude(messages, systemPrompt) {
  await sleep(1200); 

  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // If it's a scoring request (Scouting Phase)
  if (lastMessage.includes("matchscore")) {
    const scores = [85, 92, 78, 65, 88];
    const score = scores[Math.floor(Math.random() * scores.length)];
    return JSON.stringify({
      matchScore: score,
      matchReasons: ["Strong alignment with core stack", "Proven leadership in high-scale environments", "Excellent technical communication"],
      gaps: ["Potential overlap with existing senior leads"]
    });
  }

  // INTERVIEW PROGRESSION (Recruiter AI side)
  const turn = Math.floor(messages.length / 2);
  
  // Extract candidate name from the conversation context if possible
  const candidateName = messages[0].content.split(' ')[1].replace('!', '');
  
  const recruiterPool = {
    "Rahul": [
      `Thanks for the intro, Rahul! Since you're at Razorpay, I'd love to know how you've approached optimizing high-concurrency payment webhooks?`,
      `That's a solid architectural choice. Given our fast-paced environment, how do you manage technical debt while shipping critical features?`,
      `I'm very impressed with your depth on distributed systems. I'd like to move this to a technical deep-dive with our Engineering Head. \n\nINTEREST_DATA:{\"interestScore\":92,\"interestLevel\":\"Exceptional\",\"motivations\":[\"Complex Scale\",\"Architecture\"],\"timeline\":\"2 weeks\",\"summary\":\"Rahul is an elite engineer with deep domain expertise in payments. He is ready for a leadership challenge.\"}`
    ],
    "Priya": [
      `Hi Priya! Your work on data visualization at Zomato is impressive. What was the most challenging performance bottleneck you solved there?`,
      `Interesting! We're building a real-time analytics engine. How would you approach state management for thousands of live data points?`,
      `Your product-focused mindset is exactly what we need. I'll pass your notes to our CTO for an immediate follow-up. \n\nINTEREST_DATA:{\"interestScore\":88,\"interestLevel\":\"High\",\"motivations\":[\"Real-time Data\",\"Product Impact\"],\"timeline\":\"Immediate\",\"summary\":\"Priya combines strong technical skills with a keen product sense. She is particularly excited about our analytics roadmap.\"}`
    ],
    "Anish": [
      `Glad to connect, Anish! With your full-stack background at Ola, what's your preferred approach for maintaining consistency across mobile and web APIs?`,
      `Scaling services for millions of rides is no joke. How do you ensure your team maintains high code quality under that kind of pressure?`,
      `You have a very pragmatic approach to engineering. I'd like to schedule a culture-fit round next week. \n\nINTEREST_DATA:{\"interestScore\":75,\"interestLevel\":\"Moderate\",\"motivations\":[\"System Design\",\"Mentorship\"],\"timeline\":\"1 month\",\"summary\":\"Anish is a reliable senior engineer with great mentorship skills. He is looking for a stable environment with architectural ownership.\"}`
    ],
    "Sneha": [
      `Hi Sneha! Transitioning from Swiggy, how do you feel about working in a smaller, high-ownership team compared to a larger corporate setup?`,
      `That agility is key for us. Can you tell me about a time you had to build a complex feature from scratch with minimal documentation?`,
      `You have the 'builder' mindset we love. Let's get you on a call with our founding team tomorrow. \n\nINTEREST_DATA:{\"interestScore\":94,\"interestLevel\":\"Very High\",\"motivations\":[\"Agility\",\"Ownership\"],\"timeline\":\"Immediate\",\"summary\":\"Sneha is a self-starter who thrives in ambiguity. Her experience at Swiggy has prepared her for our fast-paced delivery cycle.\"}`
    ],
    "Vikram": [
      `Hey Vikram! Your experience with distributed systems is quite deep. What's your take on Microservices vs. Monoliths for an early-scale startup?`,
      `Fair point. How do you handle cross-team dependencies when deploying shared infrastructure components?`,
      `You've clearly thought deeply about infrastructure. I'll share your thoughts with our DevSecOps lead for the next round. \n\nINTEREST_DATA:{\"interestScore\":68,\"interestLevel\":\"Passive\",\"motivations\":[\"Infrastructure\",\"Security\"],\"timeline\":\"Flexible\",\"summary\":\"Vikram is highly knowledgeable but currently happy in his role. He would require a significant technical challenge to move.\"}`
    ]
  };

  const pool = recruiterPool[candidateName] || recruiterPool["Rahul"];
  return pool[turn] || pool[pool.length - 1];
}

// ── Scoring ──────────────────────────────────────────────────────────────────

async function scoreCandidate(jd, candidate) {
  const prompt = `You are a technical recruiter scoring a candidate against a job description.

JD:
${jd}

Candidate:
Name: ${candidate.name}
Title: ${candidate.title}
Company: ${candidate.company}
Experience: ${candidate.experience}
Skills: ${candidate.skills.join(", ")}
Summary: ${candidate.summary}

Return ONLY valid JSON (no markdown, no extra text):
{
  "matchScore": <integer 0-100>,
  "matchReasons": ["reason1","reason2","reason3"],
  "gaps": ["gap1","gap2"]
}`;

  const text = await callClaude([{ role: "user", content: prompt }], "You are a precise recruiter AI. Return only valid JSON.");
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return { matchScore: 70, matchReasons: ["Strong technical background"], gaps: [] };
  }
}

// ── Conversational outreach ───────────────────────────────────────────────────

async function conductOutreach(candidate, jd, history, userMsg) {
  const messages = [...history, { role: "user", content: userMsg }];
  const reply = await callClaude(messages, `You are a recruiter AI agent interviewing ${candidate.name} for a role based on this JD: ${jd}. Keep your responses professional and concise.`);
  
  let interestData = null;
  if (reply.includes("INTEREST_DATA:")) {
    try {
      const parts = reply.split("INTEREST_DATA:");
      interestData = JSON.parse(parts[1]);
    } catch (e) {
      console.error("Failed to parse interest data", e);
    }
  }
  
  return { reply: reply.split("INTEREST_DATA:")[0], interestData };
}

// ── Components ────────────────────────────────────────────────────────────────

function ScoreRing({ score, color, label, size = 60 }) {
  const r = (size / 2) - 4;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={3} />
          <circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={color} strokeWidth={3}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}
            style={{ transition: "stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        <div style={{ 
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size < 55 ? 12 : 14, fontWeight: 700, color: "white", fontFamily: "monospace"
        }}>
          {score}%
        </div>
      </div>
      <span style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{label}</span>
    </div>
  );
}

function CandidateCard({ candidate, onSelect, scored, index }) {
  const combined = scored ? Math.round((scored.matchScore + (scored.interestScore || 0)) / 2) : null;

  return (
    <div 
      onClick={() => onSelect(candidate)} 
      className="candidate-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className="avatar" style={{
          background: `linear-gradient(135deg, ${candidate.color}22, ${candidate.color}44)`,
          border: `1px solid ${candidate.color}44`,
          width: 48, height: 48
        }}>{candidate.avatar}</div>
        
        {combined !== null && (
          <div className="badge" style={{
            background: combined >= 75 ? "#10b98122" : combined >= 55 ? "#f59e0b22" : "#ef444422",
            border: `1px solid ${combined >= 75 ? "#10b981" : combined >= 55 ? "#f59e0b" : "#ef4444"}44`,
            color: combined >= 75 ? "#34d399" : combined >= 55 ? "#fbbf24" : "#f87171"
          }}>Rank #{scored.rank}</div>
        )}
      </div>

      <div>
        <div style={{ fontWeight: 700, color: "white", fontSize: 17, letterSpacing: "-0.01em" }}>{candidate.name}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
          <span>{candidate.title}</span>
          <span style={{ color: "#334155" }}>•</span>
          <span>{candidate.company}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {candidate.skills.slice(0, 3).map(s => (
          <span key={s} style={{
            background: "rgba(255, 255, 255, 0.03)", 
            color: "#cbd5e1",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 500
          }}>{s}</span>
        ))}
        {candidate.skills.length > 3 && (
          <span style={{ color: "#475569", fontSize: 11, alignSelf: "center" }}>+{candidate.skills.length - 3}</span>
        )}
      </div>

      {scored && (
        <div style={{ 
          display: "flex", 
          gap: "12px", 
          marginTop: "auto", 
          paddingTop: "16px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)"
        }}>
          <div className="score-pill">
            <span className="label">Match</span>
            <span className="value" style={{ color: "#8b5cf6" }}>{scored.matchScore}%</span>
          </div>
          <div className="score-pill">
            <span className="label">Interest</span>
            <span className="value" style={{ color: "#0ea5e9" }}>{scored.interestScore ?? "—"}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [phase, setPhase] = useState("jd"); // jd | scouting | shortlist | outreach
  const [jd, setJd] = useState(SAMPLE_JD);
  const [candidates] = useState(MOCK_CANDIDATES);
  const [scores, setScores] = useState({}); // id -> { matchScore, matchReasons, gaps }
  const [interestScores, setInterestScores] = useState({}); // id -> { interestScore, ... }
  const [scoutingLog, setScoutingLog] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [chatHistory, setChatHistory] = useState({}); // id -> [{role,content}]
  const [candidateStatus, setCandidateStatus] = useState({}); // id -> string
  const [chatLoading, setChatLoading] = useState(false);
  const [candidateTyping, setCandidateTyping] = useState({}); // id -> boolean
  const [processing, setProcessing] = useState({}); // id -> boolean
  const [sortedCandidates, setSortedCandidates] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (phase !== "shortlist" && phase !== "outreach") return;
    
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Handle Global Autonomous Loop for all candidates
    const timers = [];

    if (sortedCandidates.length > 0) {
      sortedCandidates.forEach(candidate => {
        // Skip if already being processed or if we already have a score
        if (processing[candidate.id] || interestScores[candidate.id]?.interestScore) return;

        const history = chatHistory[candidate.id] || [];
        if (history.length > 0) {
          const lastMsg = history[history.length - 1];
          // If the last message was from the recruiter (assistant), 
          // we wait and then trigger the candidate's (user) autonomous reply.
          if (lastMsg.role === "assistant") {
            const timer = setTimeout(() => {
              triggerAutonomousCandidateReply(candidate, history);
            }, 3000 + (Math.random() * 4000)); 
            timers.push(timer);
          }
        }
      });
    }

    return () => timers.forEach(t => clearTimeout(t));
  }, [chatHistory, sortedCandidates, processing, interestScores, phase]);

  async function runScouting() {
    setPhase("scouting");
    setScoutingLog([]);
    const results = {};

    try {
      for (const c of candidates) {
        setScoutingLog(l => [...l, { id: c.id, name: c.name, status: "analyzing" }]);
        const scored = await scoreCandidate(jd, c);
        results[c.id] = scored;
        setScores(prev => ({ ...prev, [c.id]: scored }));
        setScoutingLog(l => l.map(x => x.id === c.id ? { ...x, status: "done", score: scored.matchScore } : x));
      }

      // Rank
      const ranked = [...candidates].sort((a, b) => (results[b.id]?.matchScore || 0) - (results[a.id]?.matchScore || 0));
      ranked.forEach((c, i) => { 
        if (results[c.id]) results[c.id].rank = i + 1; 
      });
      
      setScores(results);
      setSortedCandidates(ranked);
      await sleep(500);
      setPhase("shortlist");

      // AUTOMATED PIPELINE: Start outreach for all ranked candidates immediately
      for (const c of ranked) {
        setCandidateStatus(prev => ({ ...prev, [c.id]: "Outreach" }));
        initiateAutomatedChat(c);
        await sleep(200); // Small stagger
      }
    } catch (error) {
      console.error("Scouting failed:", error);
      setPhase("jd"); // Fallback to JD if something goes wrong
    }
  }

  async function initiateAutomatedChat(candidate) {
    if (chatHistory[candidate.id]) return;

    const opening = `Hi ${candidate.name}! I'm reaching out on behalf of a fast-growing FinTech startup. I noticed your impressive background at ${candidate.company} — I think there might be a really exciting opportunity that aligns well with your experience. Would you have a few minutes to chat?`;

    const newHistory = [{ role: "assistant", content: opening }];
    setChatHistory(prev => ({ ...prev, [candidate.id]: newHistory }));
  }

  async function startChat(candidate) {
    setSelectedCandidate(candidate);
    setPhase("outreach");
  }

  async function triggerAutonomousCandidateReply(candidate, currentHistory) {
    // Track processing state per candidate
    setProcessing(prev => ({ ...prev, [candidate.id]: true }));
    
    // Update status based on conversation depth
    const turn = Math.floor(currentHistory.length / 2);
    const newStatus = turn === 0 ? "Interviewing" : turn < 2 ? "Interviewing" : "Analyzing";
    setCandidateStatus(prev => ({ ...prev, [candidate.id]: newStatus }));

    if (selectedCandidate?.id === candidate.id) setChatLoading(true);
    setCandidateTyping(prev => ({ ...prev, [candidate.id]: true }));
    
    // Mix up the timing for realism
    await sleep(3000 + Math.random() * 3000);
    
    setCandidateTyping(prev => ({ ...prev, [candidate.id]: false }));
    if (selectedCandidate?.id === candidate.id) setChatLoading(false);
    
    const candidatePool = {
      "Rahul": [
        "I've found that using an event-driven architecture with RabbitMQ works best for scaling webhooks without blocking the main event loop.",
        "I try to maintain a strict 20% rule for tech debt. We usually dedicate one sprint every month to refactoring and performance optimization.",
        "Scaling systems at Razorpay taught me a lot about distributed locks and database sharding. I'm ready to apply that at a smaller scale."
      ],
      "Priya": [
        "The biggest bottleneck at Zomato was our real-time tracking map. I optimized it by implementing a geo-hashing index on the database.",
        "I'm a big fan of using WebSockets for live data combined with a robust caching layer like Redis to prevent database thrashing.",
        "I love the idea of building an analytics engine. I've been reading a lot about ClickHouse lately for high-throughput data."
      ],
      "Anish": [
        "I'm a big proponent of GraphQL for maintaining API consistency. It allows us to define a single schema for all our client platforms.",
        "We used a mix of automated linting and peer code reviews for every single PR. It's the only way to scale quality with team size.",
        "I value architectural ownership. I'm looking for a place where I can lead the transition to a more modular service-oriented architecture."
      ],
      "Sneha": [
        "I actually prefer smaller teams. The feedback loop is much faster and you can see the direct impact of your code on the users.",
        "At Swiggy, I once had to reverse-engineer a legacy logistics service to build our new tracking API. It was tough but rewarding.",
        "That sounds perfect. I'm looking for a role where I can build fast and have a say in the core technical decisions."
      ],
      "Vikram": [
        "For an early startup, a modular monolith is often better. Microservices add a lot of operational overhead that you might not need yet.",
        "We used Terraform to manage our shared infra. It helps in versioning the infrastructure and makes deployments much more predictable.",
        "Infrastructure and security are my passions. I'm always looking for ways to automate our security compliance checks."
      ]
    };

    const pool = candidatePool[candidate.name] || candidatePool["Rahul"];
    const msg = pool[turn] || pool[pool.length - 1];
    
    const newHistory = [...currentHistory, { role: "user", content: msg }];
    setChatHistory(prev => ({ ...prev, [candidate.id]: newHistory }));
    
    // Trigger AI Agent to reply back to candidate
    const { reply, interestData } = await conductOutreach(candidate, jd, currentHistory, msg);
    const finalHistory = [...newHistory, { role: "assistant", content: reply }];
    setChatHistory(prev => ({ ...prev, [candidate.id]: finalHistory }));
    
    if (interestData) {
      setInterestScores(prev => ({ ...prev, [candidate.id]: interestData }));
      setCandidateStatus(prev => ({ ...prev, [candidate.id]: "Completed" }));
    }

    setProcessing(prev => ({ ...prev, [candidate.id]: false }));
    if (selectedCandidate?.id === candidate.id) setChatLoading(false);
  }

  const getRankedWithBoth = () => {
    return sortedCandidates.map(c => {
      const ms = scores[c.id]?.matchScore || 0;
      const is = interestScores[c.id]?.interestScore || null;
      const combined = is !== null ? Math.round((ms + is) / 2) : ms;
      return { ...c, matchScore: ms, interestScore: is, combinedScore: combined };
    }).sort((a, b) => b.combinedScore - a.combinedScore)
      .map((c, i) => ({ ...c, rank: i + 1 }));
  };

  const allScored = (id) => {
    const ms = scores[id];
    const is = interestScores[id];
    if (!ms) return null;
    return {
      ...ms,
      interestScore: is?.interestScore ?? null,
      rank: ms.rank
    };
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      color: "var(--text-primary)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <header className="responsive-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ 
              width: 36, height: 36, borderRadius: 10, 
              background: "linear-gradient(135deg, #8b5cf6, #0ea5e9)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
            }}>🎯</div>
            <span style={{ 
              fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #fff, #94a3b8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>TalentAI Scout</span>
            <div style={{
              background: "rgba(139, 92, 246, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              color: "#a78bfa",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginLeft: 4
            }}>Recruiter Console</div>
          </div>
        <div className="header-steps">
          {[
            { id: "jd", label: "1. Definition", isLocked: false },
            { id: "shortlist", label: "2. Shortlist", isLocked: sortedCandidates.length === 0 },
            { id: "outreach", label: "3. Engagement", isLocked: !selectedCandidate }
          ].map((p) => {
            const isActive = phase === p.id || (phase === "scouting" && p.id === "jd");
            return (
              <div
                key={p.id}
                className={`step-item ${isActive ? "active" : ""} ${p.isLocked ? "locked" : ""}`}
                onClick={() => {
                  if (!p.isLocked) setPhase(p.id);
                }}
                title={p.isLocked ? "Complete previous steps to unlock" : ""}
              >
                {p.label}
              </div>
            );
          })}
        </div>
      </header>

      <div className="responsive-main">
        {/* ── Phase: JD ── */}
        {phase === "jd" && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h1 style={{ 
                fontSize: 40, fontWeight: 800, letterSpacing: "-0.04em", margin: 0,
                background: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>
                Precision Talent Scouting
              </h1>
              <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 17, fontWeight: 400 }}>
                Leverage AI to identify and engage top-tier engineering talent.
              </p>
            </div>

            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Job Requirements
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}></span>
                  <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>AI Engine Ready</span>
                </div>
              </div>
              <textarea
                value={jd} onChange={e => setJd(e.target.value)}
                rows={14} style={{
                  width: "100%", background: "rgba(0, 0, 0, 0.2)", border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: 12, color: "#e2e8f0", fontSize: 14, padding: 20,
                  resize: "vertical", outline: "none", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  lineHeight: 1.7, boxSizing: "border-box", transition: "border-color 0.2s"
                }} 
                onFocus={e => e.target.style.borderColor = "rgba(139, 92, 246, 0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(255, 255, 255, 0.05)"}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                <button className="premium-btn" onClick={runScouting}>
                  Analyze Candidates
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Phase: Scouting ── */}
        {phase === "scouting" && (
          <div style={{ maxWidth: 600, margin: "60px auto", textAlign: "center" }}>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 32px" }}>
              <div style={{ 
                position: "absolute", inset: 0, borderRadius: "50%", 
                border: "2px solid rgba(139, 92, 246, 0.3)",
                borderTopColor: "#8b5cf6",
                animation: "spin 1s linear infinite"
              }}></div>
              <div style={{ 
                position: "absolute", inset: 12, borderRadius: "50%", 
                border: "2px solid rgba(14, 165, 233, 0.3)",
                borderBottomColor: "#0ea5e9",
                animation: "spin 1.5s linear infinite reverse"
              }}></div>
              <div style={{ 
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24
              }}>🔍</div>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>AI Analysis in Progress</h2>
            <p style={{ color: "#94a3b8", marginBottom: 40, fontSize: 16 }}>Cross-referencing candidate profiles with your job requirements…</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {scoutingLog.map(item => (
                <div key={item.id} className="glass-card" style={{
                  padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: item.status === "analyzing" ? "rgba(139, 92, 246, 0.05)" : "rgba(255, 255, 255, 0.02)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.status === "analyzing" ? "#8b5cf6" : "#10b981" }}></div>
                    <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14 }}>{item.name}</span>
                  </div>
                  {item.status === "analyzing"
                    ? <span style={{ color: "#8b5cf6", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Processing…</span>
                    : <span style={{ color: "#10b981", fontSize: 12, fontWeight: 700 }}>MATCH: {item.score}%</span>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Phase: Shortlist ── */}
        {phase === "shortlist" && (
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 24 }}>
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px 0", background: "linear-gradient(90deg, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Candidate Shortlist</h1>
                <p style={{ color: "#94a3b8", margin: 0, fontSize: 16 }}>AI has identified the following top candidates for this role.</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ 
                  background: "rgba(16, 185, 129, 0.05)", 
                  border: "1px solid rgba(16, 185, 129, 0.1)",
                  padding: "10px 18px",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 12
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite", boxShadow: "0 0 12px #10b981" }}></div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#10b981", letterSpacing: "0.02em" }}>Live AI Monitoring</span>
                </div>
                <button className="premium-btn" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)", boxShadow: "none", color: "#94a3b8", padding: "10px 20px" }} onClick={() => setPhase("jd")}>
                  Reset
                </button>
              </div>
            </div>

            <div className="candidate-grid">
              {getRankedWithBoth().map((c, idx) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  onSelect={startChat}
                  scored={allScored(c.id)}
                  index={idx}
                />
              ))}
            </div>

            {/* Summary table */}
            {getRankedWithBoth().some(c => c.interestScore !== null) && (
              <div style={{ marginTop: 64 }}>
                <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📊</div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "white" }}>Recruitment Pipeline Overview</h3>
                </div>
                <div className="table-wrapper">
                  <table className="summary-table">
                    <thead>
                      <tr>
                        {["Rank", "Candidate", "Match", "Engagement", "Total", "Action"].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getRankedWithBoth().map(c => (
                        <tr key={c.id}>
                          <td style={{ fontWeight: 800, color: "#8b5cf6", fontSize: 16, width: 60 }}>#{c.rank}</td>
                          <td>
                            <div className="candidate-info">
                              <div className="mini-avatar" style={{ background: `linear-gradient(135deg, ${c.color}44, ${c.color}66)` }}>
                                {c.avatar}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, color: "white" }}>{c.name}</div>
                                <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{c.title}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ width: 140 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ flex: 1, height: 4, background: "rgba(139, 92, 246, 0.1)", borderRadius: 2 }}>
                                <div style={{ height: "100%", background: "#8b5cf6", borderRadius: 2, width: `${c.matchScore}%` }}></div>
                              </div>
                              <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13, minWidth: 35 }}>{c.matchScore}%</span>
                            </div>
                          </td>
                          <td style={{ minWidth: 200 }}>
                            {c.interestScore !== null
                              ? <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                  <div style={{ flex: 1, height: 4, background: "rgba(14, 165, 233, 0.1)", borderRadius: 2 }}>
                                    <div style={{ height: "100%", background: "#0ea5e9", borderRadius: 2, width: `${c.interestScore}%`, transition: "width 1s ease-out" }}></div>
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 70 }}>
                                    <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13 }}>{c.interestScore}%</span>
                                    <span style={{ fontSize: 9, color: "#10b981", background: "#10b98111", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase", fontWeight: 800 }}>Ready</span>
                                  </div>
                                </div>
                              : (candidateStatus[c.id] 
                                ? <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ position: "relative", width: 12, height: 12 }}>
                                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(139, 92, 246, 0.2)", borderTopColor: "#8b5cf6", animation: "spin 0.8s linear infinite" }}></div>
                                    </div>
                                    <span style={{ color: "#8b5cf6", fontSize: 12, fontWeight: 700 }}>{candidateStatus[c.id]}...</span>
                                  </div>
                                : <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.4 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#475569" }}></div>
                                    <span style={{ color: "#64748b", fontSize: 12, fontWeight: 500 }}>Queued</span>
                                  </div>
                                )
                            }
                          </td>
                          <td style={{ width: 80 }}>
                            <span style={{
                              background: c.combinedScore >= 75 ? "#10b98115" : "#f59e0b15",
                              color: c.combinedScore >= 75 ? "#10b981" : "#f59e0b",
                              border: `1px solid ${c.combinedScore >= 75 ? "#10b98122" : "#f59e0b22"}`,
                              borderRadius: 8, padding: "4px 10px", fontWeight: 800, fontSize: 13
                            }}>{c.combinedScore}</span>
                          </td>
                          <td style={{ width: 140, textAlign: "right" }}>
                            <button className="premium-btn" style={{ 
                              padding: "8px 16px", 
                              fontSize: 11, 
                              background: chatHistory[c.id] ? "rgba(255,255,255,0.03)" : undefined, 
                              border: chatHistory[c.id] ? "1px solid var(--border-color)" : undefined, 
                              boxShadow: chatHistory[c.id] ? "none" : undefined,
                              color: chatHistory[c.id] ? "white" : undefined
                            }}
                              onClick={() => startChat(c)}>
                              {chatHistory[c.id] ? "View Intel" : "Evaluate"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Phase: Outreach ── */}
        {phase === "outreach" && selectedCandidate && (
          <div className="outreach-container">
            {/* Sidebar */}
            <div className="outreach-sidebar" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button className="premium-btn" style={{ background: "transparent", border: "1px solid var(--border-color)", boxShadow: "none", alignSelf: "flex-start", padding: "8px 16px" }}
                onClick={() => setPhase("shortlist")}>← Back to Shortlist</button>

              <div className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: `linear-gradient(135deg, ${selectedCandidate.color}22, ${selectedCandidate.color}44)`,
                    border: `1px solid ${selectedCandidate.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 700, color: "white"
                  }}>{selectedCandidate.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: "white" }}>{selectedCandidate.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{selectedCandidate.title}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                  <div style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--border-color)", textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>Match</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#8b5cf6" }}>{scores[selectedCandidate.id]?.matchScore}%</div>
                  </div>
                  <div style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--border-color)", textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>Interest</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#0ea5e9" }}>{interestScores[selectedCandidate.id]?.interestScore ?? "—"}%</div>
                  </div>
                </div>

                {interestScores[selectedCandidate.id] ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>AI Summary</div>
                      <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>
                        {interestScores[selectedCandidate.id].summary}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Key Motivations</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {interestScores[selectedCandidate.id].motivations?.map(m => (
                          <span key={m} style={{ fontSize: 11, background: "rgba(139, 92, 246, 0.1)", color: "#a78bfa", padding: "4px 10px", borderRadius: 6 }}>{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "20px", background: "rgba(139, 92, 246, 0.05)", borderRadius: 12, border: "1px dashed rgba(139, 92, 246, 0.2)", textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Initiate conversation to generate interest analysis.</p>
                  </div>
                )}
              </div>

              {scores[selectedCandidate.id]?.matchReasons?.length > 0 && (
                <div className="glass-card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Strategic Fit</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {scores[selectedCandidate.id].matchReasons.slice(0, 3).map(r => (
                      <div key={r} style={{ fontSize: 12, color: "#34d399", display: "flex", gap: 8 }}>
                        <span style={{ opacity: 0.7 }}>✦</span> {r}
                      </div>
                    ))}
                    {scores[selectedCandidate.id].gaps?.slice(0, 2).map(g => (
                      <div key={g} style={{ fontSize: 12, color: "#f472b6", display: "flex", gap: 8 }}>
                        <span style={{ opacity: 0.7 }}>◇</span> {g}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Chat */}
            <div className="outreach-chat glass-card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.01)" }}>
                <div>
                  <div style={{ fontWeight: 600, color: "white" }}>Autonomous Monitoring: {selectedCandidate.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>AI is engaging autonomously based on your Job Description</div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(139, 92, 246, 0.1)", padding: "4px 12px", borderRadius: 20 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6" }}></span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#a78bfa" }}>Agent Active</span>
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
                {(chatHistory[selectedCandidate.id] || []).map((m, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "assistant" ? "flex-start" : "flex-end", gap: 4 }}>
                    <div style={{ fontSize: 10, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginLeft: m.role === "assistant" ? 4 : 0, marginRight: m.role === "assistant" ? 0 : 4 }}>
                      {m.role === "assistant" ? "Recruiter AI" : selectedCandidate.name.split(' ')[0]}
                    </div>
                    <div style={{
                      maxWidth: "75%",
                      background: m.role === "assistant" ? "rgba(255,255,255,0.03)" : "var(--accent-primary)",
                      color: "white",
                      padding: "12px 16px",
                      borderRadius: m.role === "assistant" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      fontSize: 14,
                      lineHeight: 1.6,
                      border: m.role === "assistant" ? "1px solid var(--border-color)" : "none",
                      boxShadow: m.role === "assistant" ? "none" : "0 4px 12px rgba(139, 92, 246, 0.2)",
                      marginBottom: 12
                    }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", padding: "12px 16px", borderRadius: "4px 16px 16px 16px", border: "1px solid var(--border-color)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b5cf6", animation: "pulse 1s infinite" }}></div>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b5cf6", animation: "pulse 1s infinite 0.2s" }}></div>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b5cf6", animation: "pulse 1s infinite 0.4s" }}></div>
                        </div>
                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Recruiter AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                {candidateTyping[selectedCandidate?.id] && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                    <div style={{ background: "rgba(139, 92, 246, 0.1)", padding: "12px 16px", borderRadius: "16px 4px 16px 16px", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "#a78bfa", fontWeight: 500 }}>{selectedCandidate.name} is typing...</span>
                        <div style={{ display: "flex", gap: 4 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#a78bfa", animation: "pulse 1s infinite" }}></div>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#a78bfa", animation: "pulse 1s infinite 0.2s" }}></div>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#a78bfa", animation: "pulse 1s infinite 0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div style={{ padding: 20, borderTop: "1px solid var(--border-color)", background: "rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: "8px" }}>
                  <div style={{ fontSize: 13, color: "#94a3b8", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }}></span>
                    Autonomous AI Agent is currently leading the interview...
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
