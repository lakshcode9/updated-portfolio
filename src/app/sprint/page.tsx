"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, BookOpen, Code, Cpu, Cloud, Brain, Rocket } from "lucide-react"

interface WeekItem {
  week: number;
  focus: string;
  tasks: string;
  content: string;
}

interface Phase {
  id: number;
  title: string;
  days: string;
  description: string;
  icon: React.ReactNode;
  resources: { name: string; url: string }[];
  weeks: WeekItem[];
}

const phases: Phase[] = [
  {
    id: 1,
    title: "Python & Engineering Excellence",
    days: "Days 1–30",
    description: "Move beyond \"scripting\" and master Python as a professional engineer. Clean code is the foundation of scalable AI systems.",
    icon: <Code className="w-5 h-5" />,
    resources: [
      { name: "CS50P - Harvard Intro to Python", url: "https://www.youtube.com/playlist?list=PLhQjrBD2T3817j24-GogXmWqO5Q5vYfhzW" },
      { name: "ArjanCodes - Better Python Code", url: "https://www.youtube.com/@ArjanCodes" },
    ],
    weeks: [
      { week: 1, focus: "Advanced Python", tasks: "Decorators, Generators, Context Managers, AsyncIO.", content: "\"Python features you didn't know you needed for AI.\"" },
      { week: 2, focus: "Data Foundations", tasks: "NumPy for vectorization, Pandas for complex manipulation.", content: "\"Stop using loops; use NumPy.\" (Visual comparison)" },
      { week: 3, focus: "Clean Code", tasks: "SOLID principles, Type Hinting, Pydantic for validation.", content: "\"Why your AI code looks like spaghetti (and how to fix it).\"" },
      { week: 4, focus: "Project 1", tasks: "Build a CLI tool that automates a part of your current agency workflow.", content: "\"Building a tool to save 10 hours/week.\"" },
    ],
  },
  {
    id: 2,
    title: "Machine Learning Foundations",
    days: "Days 31–60",
    description: "Understanding the \"why\" behind the models. We focus on the intuition and implementation of core algorithms.",
    icon: <BookOpen className="w-5 h-5" />,
    resources: [
      { name: "StatQuest with Josh Starmer", url: "https://www.youtube.com/@statquest" },
      { name: "Sentdex - ML with Python", url: "https://www.youtube.com/@sentdex" },
    ],
    weeks: [
      { week: 5, focus: "The Math", tasks: "Linear Algebra & Calculus intuition (not just formulas).", content: "\"The only math you actually need for AI.\"" },
      { week: 6, focus: "Scikit-Learn", tasks: "Regression, Classification, Clustering, Pipelines.", content: "\"Predicting [X] with 10 lines of code.\"" },
      { week: 7, focus: "Neural Networks", tasks: "Backpropagation, Activation functions, Loss functions.", content: "\"How a computer actually 'learns'.\" (Visual animation)" },
      { week: 8, focus: "Project 2", tasks: "Build a custom predictor for a niche dataset (e.g., lead conversion).", content: "\"I built a model to predict my best clients.\"" },
    ],
  },
  {
    id: 3,
    title: "Deep Learning & NLP",
    days: "Days 61–90",
    description: "Transitioning into the modern era of AI. This is where you learn the tech behind LLMs.",
    icon: <Brain className="w-5 h-5" />,
    resources: [
      { name: "Andrej Karpathy - Zero to Hero", url: "https://www.youtube.com/@AndrejKarpathy" },
      { name: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course/" },
    ],
    weeks: [
      { week: 9, focus: "PyTorch Basics", tasks: "Tensors, Autograd, Building a simple MLP.", content: "\"PyTorch vs. TensorFlow: Why I chose PyTorch.\"" },
      { week: 10, focus: "NLP Fundamentals", tasks: "Tokenization, Word Embeddings (Word2Vec, GloVe).", content: "\"How computers read text.\"" },
      { week: 11, focus: "Transformers", tasks: "Attention mechanism, Encoder-Decoder architecture.", content: "\"The paper that changed everything: Attention is All You Need.\"" },
      { week: 12, focus: "Hugging Face", tasks: "Using the Transformers library, Pipelines, Model Hub.", content: "\"Hugging Face is the GitHub of AI. Here's why.\"" },
    ],
  },
  {
    id: 4,
    title: "MLOps & Production AI",
    days: "Days 91–120",
    description: "A \"businessman who codes\" knows that a model in a notebook is worth zero. This month is about deployment.",
    icon: <Cloud className="w-5 h-5" />,
    resources: [
      { name: "Abhishek Veeramalla - MLOps Playlist", url: "https://www.youtube.com/@AbhishekVeeramalla" },
      { name: "DataTalksClub - MLOps Zoomcamp", url: "https://github.com/DataTalksClub/mlops-zoomcamp" },
    ],
    weeks: [
      { week: 13, focus: "API Development", tasks: "FastAPI, Pydantic, Asynchronous endpoints.", content: "\"FastAPI: The secret to production-grade AI APIs.\"" },
      { week: 14, focus: "Containerization", tasks: "Dockerizing AI models, Multi-stage builds.", content: "\"Why 'it works on my machine' is a lie.\"" },
      { week: 15, focus: "CI/CD & Tracking", tasks: "GitHub Actions, MLflow for experiment tracking.", content: "\"How I automate my AI deployments.\"" },
      { week: 16, focus: "Cloud Infra", tasks: "Deploying to AWS (Lambda/SageMaker) or GCP.", content: "\"My AI is now live on the cloud.\"" },
    ],
  },
  {
    id: 5,
    title: "RAG & Agentic Workflows",
    days: "Days 121–150",
    description: "This is the \"meta\" right now. Building systems that don't just talk, but act.",
    icon: <Cpu className="w-5 h-5" />,
    resources: [
      { name: "LangChain Official YouTube", url: "https://www.youtube.com/@LangChain" },
      { name: "DeepLearning.AI Short Courses", url: "https://www.deeplearning.ai/short-courses/" },
    ],
    weeks: [
      { week: 17, focus: "Vector Databases", tasks: "Pinecone, ChromaDB, Semantic Search.", content: "\"RAG > Fine-tuning. Here's the proof.\"" },
      { week: 18, focus: "LangChain/LangGraph", tasks: "Chains, Memory, State management.", content: "\"Building complex AI logic with LangGraph.\"" },
      { week: 19, focus: "AI Agents", tasks: "Tool use, Function calling, ReAct pattern.", content: "\"I built an agent that can browse the web and book meetings.\"" },
      { week: 20, focus: "Project 3", tasks: "Build an end-to-end RAG system for your agency's knowledge base.", content: "\"My agency now has a brain.\"" },
    ],
  },
  {
    id: 6,
    title: "AI System Design & Capstone",
    days: "Days 151–180",
    description: "The final stretch. Thinking like an Architect and building your \"Proof of Mastery.\"",
    icon: <Rocket className="w-5 h-5" />,
    resources: [
      { name: "Chip Huyen's Blog", url: "https://huyenchip.com/blog/" },
      { name: "Full Stack LLM Bootcamp", url: "https://fullstackdeeplearning.com/llm-bootcamp/" },
    ],
    weeks: [
      { week: 21, focus: "System Design", tasks: "Scalability, Latency, Cost optimization.", content: "\"How to design AI systems for 1 million users.\"" },
      { week: 22, focus: "Evaluation", tasks: "RAGAS, TruLens, LLM-as-a-judge.", content: "\"How do you know if your AI is actually good?\"" },
      { week: 23, focus: "Capstone Start", tasks: "Define a high-value problem and architect the solution.", content: "\"The Big One: Starting my final 180-day project.\"" },
      { week: 24, focus: "Capstone Delivery", tasks: "Full build, documentation, and public launch.", content: "\"180 days later: From dropout to AI Engineer.\"" },
    ],
  },
];

const logs = [
  { 
    date: "Jan 14, 2026", 
    title: "Sprint Start & Setup", 
    content: "Initialized the portfolio and defined the 6-month curriculum. Focused on setting up a high-signal environment for tracking engineering progress.",
    status: "Fixed: Initial environment boilerplate issues."
  },
  { 
    date: "Jan 13, 2026", 
    title: "Deep Dive: OpenAI Meta API Integration", 
    content: "Refined the WhatsApp Concierge logic. Managed to reduce latency by 40% using local caching.",
    status: "Learned: Meta Cloud API rate limits and JWT expiration handling."
  }
]

export default function SprintPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col gap-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 text-center items-center"
      >
        <span className="text-xs uppercase tracking-widest text-primary font-bold">The Core Asset</span>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">THE 180-DAY AI ENGINEER SPRINT</h1>
        <p className="text-muted-foreground max-w-2xl text-lg italic">
          From Builder to Architect. A high-agency founder&apos;s transition into deep AI engineering.
        </p>
        <a 
          href="/The_180-Day_AI_Engineer_Sprint_From_Builder_to_Architect.pdf" 
          target="_blank"
          className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Download Full PDF Roadmap
        </a>
      </motion.div>

      {/* Full Roadmap Section */}
      <section className="flex flex-col gap-12">
        <h2 className="text-2xl font-medium border-l-4 border-primary pl-4 uppercase tracking-tight">The Complete Roadmap</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {phases.map((phase, phaseIndex) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseIndex * 0.1 }}
              className="flex flex-col gap-6 p-6 rounded-2xl bg-card border border-border/40"
            >
              {/* Phase Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {phase.icon}
                  </div>
                  <div>
                    <Badge variant="outline" className="text-[10px] uppercase mb-1">{phase.days}</Badge>
                    <h3 className="text-lg font-medium tracking-tight">Phase {phase.id}: {phase.title}</h3>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground italic">{phase.description}</p>

              {/* Resources */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Free Resources</span>
                {phase.resources.map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {resource.name}
                  </a>
                ))}
              </div>

              {/* Weekly Breakdown */}
              <div className="flex flex-col gap-3 mt-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Weekly Breakdown</span>
                {phase.weeks.map((week) => (
                  <div key={week.week} className="p-3 rounded-lg bg-background/50 border border-border/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-primary">Week {week.week}</span>
                      <Badge className="text-[9px] bg-muted text-muted-foreground border-none">{week.focus}</Badge>
                    </div>
                    <p className="text-xs text-foreground/80 mb-1">{week.tasks}</p>
                    <p className="text-[10px] text-muted-foreground italic">{week.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Strategic Advice Section */}
      <section className="flex flex-col gap-8 p-8 rounded-2xl bg-card border border-border/40">
        <h2 className="text-2xl font-medium border-l-4 border-primary pl-4 uppercase tracking-tight">Strategic Advice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">1. The &quot;Buffer&quot; System</h3>
            <p className="text-sm text-muted-foreground">
              Use a &quot;Sprint &amp; Sync&quot; approach. Every 2 weeks, have a &quot;Sync Day&quot; where you don&apos;t learn anything new but catch up on missed tasks or refine what you&apos;ve built.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">2. Documentation as a Product</h3>
            <p className="text-sm text-muted-foreground">
              Every Instagram Reel you post is a marketing asset. Save your prompts, your &quot;Aha!&quot; moments, and your failures. The &quot;180-Day AI Engineer Vault&quot; could be a high-ticket resource.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">3. Technical Implementation</h3>
            <p className="text-sm text-muted-foreground">
              Consider using Obsidian with a Quartz or Docusaurus setup. It allows you to write in Markdown (fast) and deploy automatically to your subdomain.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">4. The &quot;Founder&quot; Edge</h3>
            <p className="text-sm text-muted-foreground">
              Don&apos;t just learn the tech. Always ask: &quot;How can I sell this?&quot; Every project in this roadmap should be a potential micro-SaaS or a service offering for your agency.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Log Section */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-medium border-l-4 border-primary pl-4 uppercase tracking-tight">Daily Engineering Log</h2>
        <ScrollArea className="h-[500px] border border-border/40 rounded-3xl p-8 bg-card/20">
          <div className="flex flex-col gap-12">
            {logs.map((log, i) => (
              <motion.div 
                key={log.date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l border-border/40 flex flex-col gap-4"
              >
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium tracking-tight text-muted-foreground">{log.date}</span>
                  <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase font-bold">LOGGED</Badge>
                </div>
                <h3 className="text-xl font-medium uppercase">{log.title}</h3>
                <p className="text-muted-foreground leading-relaxed italic text-sm">
                  {log.content}
                </p>
                <div className="bg-background/50 p-4 rounded-xl border border-border/40">
                  <p className="text-xs font-mono text-foreground/80">
                    {log.status}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="text-center py-8">
              <span className="text-xs text-muted-foreground uppercase tracking-widest italic">The journey is just beginning.</span>
            </div>
          </div>
        </ScrollArea>
      </section>
    </div>
  )
}
