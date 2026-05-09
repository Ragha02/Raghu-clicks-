"use client";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const INTERN_PROJECTS = [
  {
    num: 'P1',
    name: 'Multi-Agent Content Creator',
    desc: 'A foundational system automating daily productivity tasks through agent-based coordination. A Coordinator Agent parses user requests and delegates to a Researcher, Writer, and Editor agent — each returning structured outputs to the central controller.',
    tags: ['CrewAI', 'Coordinator Agent', 'Python', 'LLM'],
    flow: ['User Input → Coordinator', 'Task Assignment → Agents', 'Researcher + Writer + Editor', 'Structured Response'],
  },
  {
    num: 'P2',
    name: 'Deep Research Agent',
    desc: 'Advanced AI agent using Model Context Protocol (MCP) for long-context reasoning and multi-hop research. Leverages Gemini API for reasoning + LinkUp API for real-world retrieval, with async handlers, modular tool wrapping, and input chunking.',
    tags: ['Gemini API', 'MCP', 'LinkUp', 'Async', 'Python'],
    flow: ['Gemini LLM Reasoning', 'LinkUp Web Retrieval', 'MCP Orchestration', 'Context Aggregation'],
  },
  {
    num: 'P3',
    name: 'MCP Video-RAG via Ragie',
    desc: 'Intelligent video analysis system using Retrieval-Augmented Generation to extract insights from transcripts and metadata. Ingestion → Embedding → Retrieval → LLM-grounded generation — all orchestrated through MCP.',
    tags: ['Ragie', 'Video RAG', 'MCP', 'Vector DB', 'LLM'],
    flow: ['Video Ingestion + Transcription', 'Vector Embedding', 'Semantic Retrieval', 'LLM Answer Generation'],
  },
]

const SIH_FEATURES = [
  { icon: '⬡', label: 'Seamless Submission', desc: 'User-friendly interface for institution applications' },
  { icon: '⬡', label: 'Automated Approval', desc: 'AI-driven routing as per AICTE annexures' },
  { icon: '⬡', label: 'Real-Time Notifications', desc: 'SMS & email updates at every approval stage via Amazon SNS' },
  { icon: '⬡', label: 'AI Document Validation', desc: 'LLM-based verification reducing human intervention' },
  { icon: '⬡', label: 'Reviewer Dashboard', desc: 'Data-driven insights for AICTE officials' },
  { icon: '⬡', label: 'RAG Chatbot', desc: 'AI-assisted query resolution with semantic search' },
]

export default function Experience() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Timeline line draw
    gsap.from('.exp-timeline-line', {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.exp-timeline',
        start: 'top 80%',
      },
    })

    // Internship cards stagger
    ScrollTrigger.batch('.intern-card', {
      onEnter: els => gsap.fromTo(els,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.15 }
      ),
      start: 'top 88%',
      once: true,
    })

    // SIH card
    gsap.from('.sih-card', {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.sih-card',
        start: 'top 85%',
      },
    })

    // SIH features
    ScrollTrigger.batch('.sih-feat', {
      onEnter: els => gsap.fromTo(els,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.07 }
      ),
      start: 'top 90%',
      once: true,
    })
  }, { scope: containerRef })

  return (
    <section className="exp-section" ref={containerRef}>
      <div className="chapter-header">
        <div className="chapter-ghost" aria-hidden="true">XP</div>
        <p className="chapter-num">02.5 / EXPERIENCE</p>
        <h2 className="chapter-title">Where I <em>Worked</em> & Won</h2>
        <div className="chapter-divider" />
      </div>

      {/* ── Internship Block ── */}
      <div className="exp-inner">

        {/* Company Header */}
        <div className="exp-company-header">
          <div className="exp-company-meta">
            <div className="exp-company-badge">INTERNSHIP</div>
            <h3 className="exp-company-name">Tech Mahindra</h3>
            <p className="exp-company-role">AI / Agentic Systems Engineer</p>
            <div className="exp-company-period">
              <span className="exp-period-dot" />
              April 2025 — August 2025 · 5 months
            </div>
          </div>
          <div className="exp-company-logo-wrap" aria-hidden="true">
            <span className="exp-logo-text">TM</span>
          </div>
        </div>

        {/* Timeline + Cards */}
        <div className="exp-timeline">
          <div className="exp-timeline-line" />

          {INTERN_PROJECTS.map((proj, i) => (
            <div key={proj.num} className="intern-card">
              <div className="intern-card-dot">
                <span>{proj.num}</span>
              </div>
              <div className="intern-card-body">
                <h4 className="intern-card-name">{proj.name}</h4>
                <p className="intern-card-desc">{proj.desc}</p>

                {/* Flow steps */}
                <div className="intern-flow">
                  {proj.flow.map((step, si) => (
                    <div key={si} className="intern-flow-step">
                      <span className="intern-flow-n">{String(si + 1).padStart(2, '0')}</span>
                      <span className="intern-flow-label">{step}</span>
                      {si < proj.flow.length - 1 && (
                        <svg className="intern-flow-arrow" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="proj-tags" style={{ marginTop: '1rem' }}>
                  {proj.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SIH Achievement ── */}
        <div className="sih-card">
          <div className="sih-trophy-wrap">
            <div className="sih-trophy">🏆</div>
            <div className="sih-badge">NATIONAL WINNER</div>
          </div>

          <div className="sih-header">
            <div>
              <p className="sih-label">Smart India Hackathon 2024</p>
              <h3 className="sih-title">AICTE Application Automation</h3>
              <p className="sih-subtitle">National-level government tech challenge · Ministry of Education, India</p>
            </div>
          </div>

          <p className="sih-desc">
            Built an end-to-end AI-powered platform to modernise AICTE institution approval workflows.
            The system replaced manual document review with LLM-based validation, semantic search via RAG,
            and real-time stakeholder notifications — cutting approval latency dramatically.
          </p>

          {/* Features grid */}
          <div className="sih-features">
            {SIH_FEATURES.map(f => (
              <div key={f.label} className="sih-feat">
                <span className="sih-feat-icon">✦</span>
                <div>
                  <p className="sih-feat-label">{f.label}</p>
                  <p className="sih-feat-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stack + Role */}
          <div className="sih-bottom">
            <div className="sih-stack">
              <p className="sih-stack-head">Stack</p>
              <div className="proj-tags">
                {['React TS', 'TailwindCSS', 'Java Spring Boot', 'Flask', 'Hugging Face', 'Pinecone', 'MySQL', 'AWS S3', 'Amazon SNS'].map(t => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="sih-role-card">
              <p className="sih-role-head">My Role</p>
              <p className="sih-role-title">AI/LLM Integration &<br/>Knowledge Base Development</p>
              <p className="sih-role-sub">Llama 3 8B · Sentence Transformers · Semantic Search · RAG Pipeline</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
