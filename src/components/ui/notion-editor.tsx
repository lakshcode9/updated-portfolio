"use client";

import React from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

interface NotionEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

export function NotionEditor({ initialContent, onChange, editable = true }: NotionEditorProps) {
  // Safely parse initial content - handle both JSON and plain text
  const parseInitialContent = () => {
    if (!initialContent) return undefined;
    
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(initialContent);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return undefined;
    } catch {
      // If not valid JSON, treat as plain text and convert to blocks
      // Return undefined to let BlockNote create default content
      // The plain text will be shown as-is when the editor loads
      return undefined;
    }
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: parseInitialContent(),
  });

  return (
    <div className="notion-editor-wrapper rounded-xl overflow-hidden border border-border/40 bg-card/50">
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
          if (onChange) {
            onChange(JSON.stringify(editor.document));
          }
        }}
        theme="dark"
      />
      <style jsx global>{`
        .bn-editor {
          min-height: 150px;
          padding: 1rem;
        }
        .bn-block-outer {
          margin: 0.25rem 0;
        }
        .bn-inline-content {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}

// Helper to convert BlockNote JSON content to plain text for display
export function blocksToText(jsonContent: string): string {
  if (!jsonContent) return "";
  
  try {
    const blocks = JSON.parse(jsonContent);
    if (!Array.isArray(blocks)) return "";
    
    return blocks
      .map((block: { content?: Array<{ text?: string } | string> }) => {
        if (block.content && Array.isArray(block.content)) {
          return block.content
            .map((item) => {
              if (typeof item === "string") return item;
              if (typeof item === "object" && item.text) return item.text;
              return "";
            })
            .join("");
        }
        return "";
      })
      .join("\n");
  } catch {
    return jsonContent; // Return as-is if not valid JSON
  }
}
