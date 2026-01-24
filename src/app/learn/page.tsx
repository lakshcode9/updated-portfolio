"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, SprintLog } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, Eye, EyeOff, Save, X, LogOut } from "lucide-react";

export default function LearnDashboard() {
  const [logs, setLogs] = useState<SprintLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", content: "", status: "", phase: 1, is_public: false });
  
  // New log state
  const [showNewForm, setShowNewForm] = useState(false);
  const [newLog, setNewLog] = useState({ title: "", content: "", status: "", phase: 1, is_public: false });

  // Simple password auth (for demo - you can replace with Supabase Auth later)
  const ADMIN_PASSWORD = "laksh180"; // Change this!

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
    const { error } = await supabase.from("sprint_logs").insert([{
      title: newLog.title,
      content: newLog.content,
      status: newLog.status,
      phase: newLog.phase,
      is_public: newLog.is_public,
      date: new Date().toISOString().split("T")[0],
    }]);

    if (!error) {
      setNewLog({ title: "", content: "", status: "", phase: 1, is_public: false });
      setShowNewForm(false);
      fetchLogs();
    }
  };

  const updateLog = async (id: string) => {
    const { error } = await supabase
      .from("sprint_logs")
      .update({
        title: editForm.title,
        content: editForm.content,
        status: editForm.status,
        phase: editForm.phase,
        is_public: editForm.is_public,
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
    setEditForm({
      title: log.title,
      content: log.content,
      status: log.status,
      phase: log.phase,
      is_public: log.is_public,
    });
  };

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
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Sprint Dashboard</h1>
            <p className="text-muted-foreground">Manage your 180-day engineering logs</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowNewForm(true)} className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              New Log
            </Button>
            <Button variant="outline" onClick={handleLogout} className="rounded-full">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* New Log Form */}
        <AnimatePresence>
          {showNewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="p-6 rounded-2xl bg-card border border-border/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">New Log Entry</h3>
                  <button onClick={() => setShowNewForm(false)}>
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={newLog.title}
                    onChange={(e) => setNewLog({ ...newLog, title: e.target.value })}
                    placeholder="Title"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border/40"
                  />
                  <textarea
                    value={newLog.content}
                    onChange={(e) => setNewLog({ ...newLog, content: e.target.value })}
                    placeholder="What did you learn today?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border/40 resize-none"
                  />
                  <input
                    type="text"
                    value={newLog.status}
                    onChange={(e) => setNewLog({ ...newLog, status: e.target.value })}
                    placeholder="Status (e.g., Learned: ..., Fixed: ...)"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border/40"
                  />
                  <div className="flex gap-4">
                    <select
                      value={newLog.phase}
                      onChange={(e) => setNewLog({ ...newLog, phase: parseInt(e.target.value) })}
                      className="px-4 py-3 rounded-xl bg-background border border-border/40"
                    >
                      {[1, 2, 3, 4, 5, 6].map((p) => (
                        <option key={p} value={p}>Phase {p}</option>
                      ))}
                    </select>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={newLog.is_public}
                        onChange={(e) => setNewLog({ ...newLog, is_public: e.target.checked })}
                      />
                      Make Public
                    </label>
                  </div>
                  <Button onClick={createLog} className="w-full rounded-xl">
                    <Save className="w-4 h-4 mr-2" />
                    Save Log
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logs List */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No logs yet. Start your journey!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                layout
                className="p-6 rounded-2xl bg-card border border-border/40"
              >
                {editingId === log.id ? (
                  // Edit Mode
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border/40"
                    />
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border/40 resize-none"
                    />
                    <input
                      type="text"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border/40"
                    />
                    <div className="flex gap-3">
                      <Button size="sm" onClick={() => updateLog(log.id)}>
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            Phase {log.phase}
                          </span>
                          {log.is_public ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                              Public
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">
                              Private
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-medium">{log.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePublic(log.id, log.is_public)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title={log.is_public ? "Make Private" : "Make Public"}
                        >
                          {log.is_public ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => startEdit(log)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLog(log.id)}
                          className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {log.content}
                    </p>
                    {log.status && (
                      <div className="px-4 py-2 rounded-lg bg-background/50 border border-border/20">
                        <p className="text-xs font-mono text-foreground/80">{log.status}</p>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
