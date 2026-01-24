"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, SprintLog } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { NotionEditor, blocksToText } from "@/components/ui/notion-editor";
import { Plus, Trash2, Eye, EyeOff, Save, X, LogOut, Calendar, Tag, Flame, Target, BookOpen, TrendingUp } from "lucide-react";

export default function LearnDashboard() {
  const [logs, setLogs] = useState<SprintLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPhase, setEditPhase] = useState(1);
  const [editIsPublic, setEditIsPublic] = useState(false);
  
  // New log state
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newPhase, setNewPhase] = useState(1);
  const [newIsPublic, setNewIsPublic] = useState(false);

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
      is_public: newIsPublic,
      date: new Date().toISOString().split("T")[0],
    }]);

    if (!error) {
      setNewTitle("");
      setNewContent("");
      setNewStatus("");
      setNewPhase(1);
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
    setEditIsPublic(log.is_public);
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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium tracking-tight">Sprint Dashboard</h1>
            <p className="text-muted-foreground mt-2">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full rounded-xl h-12">
              Enter Dashboard
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border/40 p-4 flex flex-col z-10">
        <div className="mb-8">
          <h1 className="text-xl font-medium tracking-tight">Sprint Logs</h1>
          <p className="text-xs text-muted-foreground mt-1">180-Day AI Engineer Journey</p>
        </div>
        
        <Button onClick={() => setShowNewForm(true)} className="w-full rounded-xl mb-4">
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-3 rounded-xl bg-background/50 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Streak</span>
            </div>
            <span className="text-2xl font-bold">{stats.streak}</span>
            <span className="text-xs text-muted-foreground ml-1">days</span>
          </div>
          <div className="p-3 rounded-xl bg-background/50 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Logs</span>
            </div>
            <span className="text-2xl font-bold">{stats.totalLogs}</span>
            <span className="text-xs text-muted-foreground ml-1">total</span>
          </div>
          <div className="p-3 rounded-xl bg-background/50 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Day</span>
            </div>
            <span className="text-2xl font-bold">{stats.daysInSprint}</span>
            <span className="text-xs text-muted-foreground ml-1">/180</span>
          </div>
          <div className="p-3 rounded-xl bg-background/50 border border-border/20">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Phase</span>
            </div>
            <span className="text-2xl font-bold">{stats.currentPhase}</span>
            <span className="text-xs text-muted-foreground ml-1">/6</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Recent Logs</div>
          <div className="flex flex-col gap-1">
            {logs.slice(0, 10).map((log) => (
              <button
                key={log.id}
                onClick={() => startEdit(log)}
                className={`text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                  editingId === log.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
              >
                {log.title}
              </button>
            ))}
          </div>
        </div>
        
        <Button variant="ghost" onClick={handleLogout} className="w-full rounded-xl mt-4">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen p-8">
        {/* New Log Form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
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
          /* List View */
          <div className="max-w-3xl">
            <h1 className="text-3xl font-medium mb-2">All Entries</h1>
            <p className="text-muted-foreground mb-8">Click an entry to edit</p>
            
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
            ) : (
              <div className="flex flex-col gap-3">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    whileHover={{ x: 4 }}
                    onClick={() => startEdit(log)}
                    className="p-4 rounded-xl bg-card border border-border/40 cursor-pointer hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{log.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{log.content}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        {log.is_public ? (
                          <Eye className="w-3 h-3 text-green-400" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
