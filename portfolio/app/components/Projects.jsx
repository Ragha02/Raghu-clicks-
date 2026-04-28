"use client";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const PROJECTS = [
  {
    num: '01', name: 'MA-XAI', tagline: 'Multiagent Explainable AI',
    desc: 'A 5-agent ML pipeline for agricultural yield prediction across 246K Indian farm records. Chains prediction → causal inference → SHAP/LIME → actionable advisory. Every decision is traceable.',
    tags: ['Python', 'XGBoost', 'SHAP', 'DoWhy', 'FastAPI', 'Next.js'],
    url: 'https://github.com/Ragha02/Multiagent-Explainable-AI', featured: true, bigNum: '05',
  },
  {
    num: '02', name: 'CardioSense', tagline: 'Real-Time Heart Risk Engine',
    desc: 'Cloud-native serverless ML pipeline on AWS — SageMaker → Lambda → DynamoDB → SNS alerts. Predicts heart disease risk in real time with full SHAP explainability baked in.',
    tags: ['AWS SageMaker', 'Lambda', 'XGBoost', 'DynamoDB', 'SHAP'],
    url: 'https://github.com/Ragha02/CardioSense',
  },
  {
    num: '03', name: 'Deep Research Gemini', tagline: 'Multi-Agent MCP Researcher',
    desc: 'MCP-powered multi-agent researcher using CrewAI + Gemini LLM + Linkup search. Live on Streamlit — search anything, get a deep, cited report in minutes.',
    tags: ['CrewAI', 'Gemini', 'MCP', 'Streamlit', 'Linkup'],
    url: 'https://github.com/Ragha02/Deep_rsrch_Gemini',
  },
  {
    num: '04', name: 'Career Assist', tagline: 'Agentic Resume Optimizer',
    desc: 'Multi-agent system with MCP server that reads JDs, rewrites resumes, and surfaces career paths. Researcher, Writer, and Editor agents working in sequence.',
    tags: ['Python', 'Agentic AI', 'MCP', 'LLM'],
    url: 'https://github.com/Ragha02/carrer_assist_1',
  },
  {
    num: '05', name: 'MCP Video RAG', tagline: 'Video Retrieval via MCP',
    desc: 'Video-based RAG through Model Context Protocol. Uses Ragie for video ingestion and semantic retrieval, exposed as MCP tools directly inside Cursor IDE.',
    tags: ['Ragie', 'MCP', 'Python', 'Video RAG', 'Cursor'],
    url: 'https://github.com/Ragha02/mcp-video-rag',
  },
  {
    num: '06', name: 'Agentic AI', tagline: 'Multi-Agent Content Crew',
    desc: 'Researcher · Writer · Editor — three CrewAI agents running on Ollama/LLaMA3 that autonomously research, draft, and publish polished Markdown articles.',
    tags: ['CrewAI', 'Ollama', 'LLaMA3', 'Python'],
    url: 'https://github.com/Ragha02/Agentic_Ai',
  },
]

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

function ProjectCard({ proj }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' })
  }

  if (proj.featured) {
    return (
      <div className="proj-card featured" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div>
          <p className="proj-num">{proj.num} / {proj.tagline}</p>
          <h3 className="proj-name">{proj.name}</h3>
          <p className="proj-desc">{proj.desc}</p>
          <div className="proj-tags">{proj.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
          <a href={proj.url} target="_blank" rel="noreferrer" className="proj-link">
            View on GitHub <ArrowIcon />
          </a>
        </div>
        <div className="proj-big-num" aria-hidden="true">{proj.bigNum}</div>
      </div>
    )
  }
  return (
    <div className="proj-card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <p className="proj-num">{proj.num} / {proj.tagline}</p>
      <h3 className="proj-name">{proj.name}</h3>
      <p className="proj-desc">{proj.desc}</p>
      <div className="proj-tags">{proj.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
      <a href={proj.url} target="_blank" rel="noreferrer" className="proj-link">
        GitHub <ArrowIcon />
      </a>
    </div>
  )
}

export default function Projects() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Chapter header slides up
    gsap.from('.chapter-header', {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    // Cards stagger in with ScrollTrigger.batch
    ScrollTrigger.batch('.proj-card', {
      onEnter: els => gsap.fromTo(els,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 }
      ),
      onLeaveBack: els => gsap.to(els, { y: 50, opacity: 0, duration: 0.4 }),
      start: 'top 88%',
    })
  }, { scope: containerRef })

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
      <div className="chapter-header">
        <div className="chapter-ghost" aria-hidden="true">BUILD</div>
        <p className="chapter-num">03 / BUILD</p>
        <h2 className="chapter-title">Things I <em>Made</em></h2>
        <div className="chapter-divider" />
      </div>
      <div className="bento-grid">
        {PROJECTS.map(p => <ProjectCard key={p.num} proj={p} />)}
      </div>
    </section>
  )
}
