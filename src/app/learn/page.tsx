"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, SprintLog } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { NotionEditor, blocksToText } from "@/components/ui/notion-editor";
import { 
  Plus, Trash2, Eye, EyeOff, Save, X, LogOut, Calendar, Tag, 
  Flame, Target, BookOpen, TrendingUp, Search, Download, Filter,
  Sparkles, BrainCircuit, RefreshCw, Terminal, Cpu, Activity
} from "lucide-react";
import { generateAISprintInsight } from "./actions";
import ReactMarkdown from "react-markdown";

export default function LearnDashboard() {
  const [logs, setLogs] = useState<SprintLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPhase, setFilterPhase] = useState<number | null>(null);
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPhase, setEditPhase] = useState(1);
  const [editIsPublic, setEditIsPublic] = useState(false);
  const [editDailyGoal, setEditDailyGoal] = useState("");
  
  // New log state
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newPhase, setNewPhase] = useState(1);
  const [newIsPublic, setNewIsPublic] = useState(false);
  const [newDailyGoal, setNewDailyGoal] = useState("");

  // AI Insight State
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Simple password auth
  const ADMIN_PASSWORD = "laksh180";

  useEffect(() => {
    const auth = sessionStorage.getItem("learn_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchLogs();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("learn_auth", "true");
      setIsAuthenticated(true);
      fetchLogs();
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("learn_auth");
    setIsAuthenticated(false);
  };

  const fetchLogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("sprint_logs")
      .select("*")
      .order("date", { ascending: false });
    
    if (error) {
      console.error("Error fetching logs:", error);
    } else {
      setLogs(data || []);
    }
    setIsLoading(false);
  };

  const createLog = async () => {
    if (!newTitle.trim()) return;
    
    const contentText = blocksToText(newContent);
    
    const { error } = await supabase.from("sprint_logs").insert([{
      title: newTitle,
      content: contentText,
      status: newStatus,
      phase: newPhase,
      daily_goal: newDailyGoal,
      is_public: newIsPublic,
      date: new Date().toISOString().split("T")[0],
    }]);

    if (!error) {
      setNewTitle("");
      setNewContent("");
      setNewStatus("");
      setNewPhase(1);
      setNewDailyGoal("");
      setNewIsPublic(false);
      setShowNewForm(false);
      fetchLogs();
    } else {
      console.error("Error creating log:", error);
    }
  };

  const updateLog = async (id: string) => {
    const contentText = blocksToText(editContent);
    
    const { error } = await supabase
      .from("sprint_logs")
      .update({
        title: editTitle,
        content: contentText,
        status: editStatus,
        phase: editPhase,
        daily_goal: editDailyGoal,
        is_public: editIsPublic,
      })
      .eq("id", id);

    if (!error) {
      setEditingId(null);
      fetchLogs();
    }
  };

  const deleteLog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this log?")) return;
    
    const { error } = await supabase.from("sprint_logs").delete().eq("id", id);
    if (!error) fetchLogs();
  };

  const togglePublic = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from("sprint_logs")
      .update({ is_public: !currentState })
      .eq("id", id);
    
    if (!error) fetchLogs();
  };

  const startEdit = (log: SprintLog) => {
    setEditingId(log.id);
    setEditTitle(log.title);
    setEditContent(log.content);
    setEditStatus(log.status);
    setEditPhase(log.phase);
    setEditDailyGoal(log.daily_goal || "");
    setEditIsPublic(log.is_public);
  };

  const handleGenerateInsight = async () => {
    setIsGeneratingAI(true);
    try {
      const insight = await generateAISprintInsight();
      setAiInsight(insight);
    } catch (e) {
      console.error(e);
      setAiInsight("Failed to summon the AI Architect. Check your connection or API key.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Compute stats
  const stats = useMemo(() => {
    if (logs.length === 0) return { totalLogs: 0, streak: 0, daysInSprint: 0, currentPhase: 1 };
    
    const totalLogs = logs.length;
    const currentPhase = Math.max(...logs.map(l => l.phase));
    
    // Calculate days since first log
    const dates = logs.map(l => new Date(l.date).getTime());
    const firstLogDate = new Date(Math.min(...dates));
    const today = new Date();
    const daysInSprint = Math.floor((today.getTime() - firstLogDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Calculate streak (consecutive days with logs)
    const sortedDates = [...new Set(logs.map(l => l.date))].sort().reverse();
    let streak = 0;
    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split("T")[0];
    
    // Check if logged today or yesterday to start counting
    if (sortedDates[0] === todayStr || sortedDates[0] === yesterdayStr) {
      streak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i - 1]);
        const currDate = new Date(sortedDates[i]);
        const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
    }
    
    return { totalLogs, streak, daysInSprint, currentPhase };
  }, [logs]);

  // Filter and search logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = searchQuery === "" || 
        log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPhase = filterPhase === null || log.phase === filterPhase;
      return matchesSearch && matchesPhase;
    });
  }, [logs, searchQuery, filterPhase]);

  // Export logs to Markdown
  const exportToMarkdown = () => {
    const markdown = logs.map((log) => {
      return `## ${log.title}
**Date:** ${new Date(log.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
**Phase:** ${log.phase}
**Status:** ${log.status || "N/A"}

${log.content}

---
`;
    }).join("\n");

    const blob = new Blob([`# 180-Day AI Engineer Sprint Logs\n\nTotal Entries: ${logs.length}\n\n---\n\n${markdown}`], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sprint-logs-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden mesh-gradient">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-aurora" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-aurora" style={{ animationDelay: '2s' }} />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm z-20"
        >
          <div className="gemini-glass gemini-border rounded-[2rem] p-10 relative overflow-hidden">
            <div className="scanline" />
            
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-coral-500/20 flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-sm" />
                <Sparkles className="w-8 h-8 text-white relative z-10" />
              </div>
              <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Welcome Back</h1>
              <p className="text-sm text-white/40 font-light text-center">Enter your access key to enter the repository.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5 relative z-20">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Key"
                className="w-full px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 focus:outline-none focus:border-white/20 text-white text-center tracking-[0.4em] placeholder:tracking-normal placeholder:text-white/10 transition-all font-light"
              />
              {error && (
                <p className="text-red-400 text-xs text-center font-light mt-1">
                  The access key provided is incorrect.
                </p>
              )}
              <Button type="submit" className="w-full rounded-2xl h-14 bg-white text-black hover:bg-white/90 font-medium text-sm transition-all active:scale-[0.98] shadow-2xl shadow-white/5">
                Authentication
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-[#080808]/40 backdrop-blur-3xl border-r border-white-[0.03] p-8 pt-32 flex flex-col z-10">
        <div className="mb-12 px-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] text-white/30 font-medium uppercase">Protocol 180</span>
          </div>
          <h1 className="text-4xl font-light tracking-tighter text-white leading-none">V A U L T</h1>
          <p className="text-[10px] text-white/20 font-light mt-4 uppercase tracking-[0.2em] leading-relaxed">Engineering Archive</p>
        </div>
        
        <Button onClick={() => setShowNewForm(true)} className="w-full rounded-full bg-white/5 border border-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all mb-10 h-14 group">
          <Plus className="w-4 h-4 mr-2 opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="text-xs font-light tracking-widest uppercase">New Entry</span>
        </Button>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-3">
              <Flame className={`w-4 h-4 ${stats.streak > 0 ? "text-orange-400" : "text-white/20"}`} />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">Cycle Streak</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-light tracking-tighter text-white">{stats.streak}</span>
              <span className="text-xs text-white/20 uppercase tracking-widest font-light">Days</span>
            </div>
          </div>
          <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">Total Volume</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-light tracking-tighter text-white">{stats.totalLogs}</span>
              <span className="text-xs text-white/20 uppercase tracking-widest font-light">Logs</span>
            </div>
          </div>
        </div>

        {/* Streak Reminder Alert */}
        {logs[0]?.date !== new Date().toISOString().split("T")[0] && (
          <div className="mb-10 p-8 rounded-[2rem] bg-orange-500/[0.03] border border-white/5 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-medium text-orange-400 uppercase tracking-[0.3em]">Cycle Inactive</span>
              </div>
              <p className="text-[11px] text-white/30 font-light leading-relaxed uppercase tracking-wider">No output synchronized for current rotation.</p>
              <Button 
                size="sm" 
                onClick={() => setShowNewForm(true)}
                className="w-full mt-6 h-10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5 rounded-full text-[10px] tracking-widest uppercase transition-all"
              >
                Log Sync
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <div className="text-[9px] text-white/10 font-medium uppercase tracking-[0.4em] mb-6">Archive Index</div>
          <div className="flex flex-col gap-3">
            {logs.slice(0, 10).map((log) => (
              <button
                key={log.id}
                onClick={() => startEdit(log)}
                className={`text-left px-4 py-3 rounded-2xl text-[11px] font-light transition-all ${
                  editingId === log.id 
                    ? "bg-white/5 text-white" 
                    : "text-white/20 hover:text-white/60 hover:bg-white/[0.02]"
                }`}
              >
                {log.title}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5">
          <button 
            onClick={handleLogout} 
            className="w-full text-center text-[10px] text-white/20 hover:text-red-400/60 uppercase tracking-[0.4em] transition-colors py-2"
          >
            Terminal.End
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen p-8 pt-24">
        {/* New Log Form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1100] flex items-center justify-center p-4"
              onClick={() => setShowNewForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-3xl bg-card rounded-2xl p-6 max-h-[90vh] overflow-y-auto border border-border/40 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-medium">New Log Entry</h2>
                  <button onClick={() => setShowNewForm(false)}>
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-6">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Untitled"
                    className="text-3xl font-medium bg-transparent border-none focus:outline-none placeholder:text-muted-foreground/50"
                  />
                  
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <select
                        value={newPhase}
                        onChange={(e) => setNewPhase(parseInt(e.target.value))}
                        className="text-sm bg-transparent border-none focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((p) => (
                          <option key={p} value={p}>Phase {p}</option>
                        ))}
                      </select>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newIsPublic}
                        onChange={(e) => setNewIsPublic(e.target.checked)}
                        className="rounded"
                      />
                      Public
                    </label>
                  </div>
                  
                  <div className="border-t border-border/40 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Today&apos;s Goal</p>
                    </div>
                    <input
                      type="text"
                      value={newDailyGoal}
                      onChange={(e) => setNewDailyGoal(e.target.value)}
                      placeholder="e.g., Master NumPy vectorization / Finish Project 1 CLI"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border/40 text-sm italic"
                    />
                  </div>
                  
                  <div className="border-t border-border/40 pt-4">
                    <p className="text-xs text-muted-foreground mb-2">Content (use / for commands)</p>
                    <NotionEditor
                      onChange={setNewContent}
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    placeholder="Status: Learned: ... / Fixed: ... / Built: ..."
                    className="px-4 py-3 rounded-xl bg-background border border-border/40 text-sm"
                  />
                  
                  <Button onClick={createLog} className="w-full rounded-xl h-12">
                    <Save className="w-4 h-4 mr-2" />
                    Save Entry
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit View */}
        {editingId ? (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setEditingId(null)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to list
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublic(editingId, editIsPublic)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title={editIsPublic ? "Make Private" : "Make Public"}
                >
                  {editIsPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => deleteLog(editingId)}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Untitled"
              className="text-4xl font-medium bg-transparent border-none focus:outline-none w-full mb-4 placeholder:text-muted-foreground/50"
            />
            
            <div className="flex gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <select
                  value={editPhase}
                  onChange={(e) => setEditPhase(parseInt(e.target.value))}
                  className="text-sm bg-transparent border-none focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((p) => (
                    <option key={p} value={p}>Phase {p}</option>
                  ))}
                </select>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${editIsPublic ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                {editIsPublic ? "Public" : "Private"}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-400" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Today&apos;s Goal</p>
              </div>
              <input
                type="text"
                value={editDailyGoal}
                onChange={(e) => setEditDailyGoal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border/40 text-sm italic mb-4"
              />
              <NotionEditor
                initialContent={editContent}
                onChange={setEditContent}
              />
            </div>
            
            <input
              type="text"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              placeholder="Status: Learned: ... / Fixed: ... / Built: ..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border/40 text-sm mb-6"
            />
            
            <Button onClick={() => updateLog(editingId)} className="rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        ) : (
          <>
            {/* Gemini Overhaul */}
            <div className="mb-16 relative">
              <div className="gemini-glass gemini-border rounded-[2.5rem] p-1 overflow-hidden">
                <div className="absolute inset-0 mesh-gradient opacity-30" />
                <div className="relative z-10 flex flex-col p-10">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-coral-500/10 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                        <BrainCircuit className="w-7 h-7 text-white/70 relative z-10" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-medium tracking-tight text-white mb-0.5">Strategist</h2>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
                          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-light">Neural Core 1.5</p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleGenerateInsight}
                      disabled={isGeneratingAI}
                      className="rounded-full px-8 bg-white/5 border border-white/5 hover:bg-white/10 text-white/80 transition-all h-12"
                    >
                      {isGeneratingAI ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin opacity-40" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2 opacity-40" />
                      )}
                      <span className="text-xs font-light tracking-widest uppercase">Consult</span>
                    </Button>
                  </div>

                  <AnimatePresence mode="wait">
                    {isGeneratingAI ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-16 flex flex-col items-center justify-center gap-6"
                      >
                         <div className="relative w-20 h-20">
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-0 rounded-[2rem] border border-white/10"
                            />
                            <motion.div 
                              animate={{ scale: [1.2, 1, 1.2], rotate: [180, 0, -180], opacity: [0.1, 0.3, 0.1] }}
                              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute inset-[-10px] rounded-[2.5rem] border border-white/5"
                            />
                            <Sparkles className="w-8 h-8 text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                         </div>
                         <p className="text-xs font-light text-white/30 tracking-[0.5em] uppercase animate-pulse">Synthesizing</p>
                      </motion.div>
                    ) : aiInsight ? (
                      <motion.div
                        key="insight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-invert prose-sm max-w-none"
                      >
                        <div className="text-[13px] text-white/70 leading-[1.8] font-light space-y-6">
                          <ReactMarkdown 
                            components={{
                              h1: ({...props}) => <h3 className="text-lg font-medium text-white mt-10 mb-4 first:mt-0" {...props} />,
                              h2: ({...props}) => <h4 className="text-md font-medium text-white/90 mt-8 mb-3" {...props} />,
                              ul: ({...props}) => <ul className="space-y-4 mb-6 list-none pl-0" {...props} />,
                              li: ({...props}) => (
                                <li className="flex gap-4 group" {...props}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-blue-400/50 transition-colors mt-[7px] shrink-0" />
                                  <span>{props.children}</span>
                                </li>
                              ),
                              p: ({...props}) => <p className="mb-6" {...props} />,
                              strong: ({...props}) => <strong className="text-white font-medium" {...props} />,
                              code: ({...props}) => <code className="bg-white/5 rounded-lg px-2 py-1 font-mono text-blue-300 text-[11px] border border-white/5" {...props} />
                            }}
                          >
                            {aiInsight}
                          </ReactMarkdown>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="py-20 flex flex-col items-center justify-center text-center">
                        <p className="text-sm font-light text-white/30 tracking-widest max-w-xs leading-loose">
                          Neural patterns idle. Awaiting engineering logs for strategic synchronization.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* List View */}
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h1 className="text-4xl font-light tracking-tighter text-white uppercase italic">Archive</h1>
                  <p className="text-[10px] text-white/20 font-light mt-3 uppercase tracking-[0.4em]">{filteredLogs.length} Records Index</p>
                </div>
                <Button variant="outline" onClick={exportToMarkdown} className="rounded-full border-white/5 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all h-10 px-8 text-xs font-light tracking-widest uppercase">
                  Export
                </Button>
              </div>
              
              {/* Search and Filter Bar */}
              <div className="flex gap-4 mb-16">
                <div className="flex-1 relative group">
                  <Search className="w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search logs..."
                    className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/[0.02] border border-white/5 text-sm font-light focus:outline-none focus:border-white/10 transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="relative">
                  <select
                    value={filterPhase ?? ""}
                    onChange={(e) => setFilterPhase(e.target.value ? parseInt(e.target.value) : null)}
                    className="pl-8 pr-12 py-4 rounded-3xl bg-white/[0.02] border border-white/5 text-sm font-light focus:outline-none focus:border-white/10 appearance-none cursor-pointer text-white/40 hover:text-white/80 transition-all"
                  >
                    <option value="">All Phases</option>
                    {[1, 2, 3, 4, 5, 6].map((p) => (
                      <option key={p} value={p}>Phase 0{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : logs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No entries yet. Start your journey!</p>
                  <Button onClick={() => setShowNewForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Entry
                  </Button>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No entries match your search.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {filteredLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      whileHover={{ y: -4 }}
                      onClick={() => startEdit(log)}
                      className="gemini-glass p-8 rounded-[2.5rem] border border-white/5 cursor-pointer hover:border-white/10 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-[10px] text-white/10 font-light tracking-[0.3em]">RECORD_{String(filteredLogs.length - index).padStart(3, '0')}</span>
                            <div className="h-px bg-white/5 flex-1" />
                            <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 text-white/40 font-light tracking-widest border border-white/5">
                              PHASE 0{log.phase}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-light text-white group-hover:text-blue-200 transition-colors tracking-tight mb-4">{log.title}</h3>
                          
                          <p className="text-sm text-white/40 line-clamp-2 leading-relaxed font-light italic pr-12">
                            {log.content}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-6 ml-6 min-w-fit mt-1">
                           <span className="text-[10px] text-white/20 font-light uppercase tracking-[0.2em]">
                            {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
                          </span>
                          
                          {log.is_public ? (
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
                              <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                              <span className="text-[8px] font-medium text-white/50 uppercase tracking-[0.2em]">Live</span>
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center">
                              <EyeOff className="w-3.5 h-3.5 text-white/10" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
