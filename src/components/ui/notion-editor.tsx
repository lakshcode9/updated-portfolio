"use client";

import React, { useMemo } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { supabase } from "@/lib/supabase";
import "@blocknote/mantine/style.css";

interface NotionEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}

// Convert plain text to BlockNote blocks format
function textToBlocks(text: string): PartialBlock[] {
  if (!text || text.trim() === "") {
    return [{ type: "paragraph" }];
  }
  
  return text.split("\n").map((line) => ({
    type: "paragraph" as const,
    content: line ? [{ type: "text" as const, text: line, styles: {} }] : [],
  }));
}

// Check if content is valid BlockNote JSON
function isValidBlockNoteJSON(content: string): boolean {
  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) && parsed.length > 0 && parsed[0].type;
  } catch {
    return false;
  }
}

export function NotionEditor({ initialContent, onChange, editable = true }: NotionEditorProps) {
  // Custom image upload handler for Supabase
  const uploadFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `log-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('sprint-images')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('sprint-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  // Parse initial content - handle both JSON and plain text
  const parsedContent = useMemo(() => {
    if (!initialContent) return undefined;
    
    // If it's valid BlockNote JSON, use it directly
    if (isValidBlockNoteJSON(initialContent)) {
      try {
        return JSON.parse(initialContent);
      } catch {
        return undefined;
      }
    }
    
    // Otherwise, convert plain text to blocks
    return textToBlocks(initialContent);
  }, [initialContent]);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: parsedContent,
    uploadFile, // Register the custom upload handler
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

// Helper to convert BlockNote JSON content to plain text for display/storage
export function blocksToText(jsonContent: string): string {
  if (!jsonContent) return "";
  
  // If it's already plain text (not JSON), return as-is
  if (!isValidBlockNoteJSON(jsonContent)) {
    return jsonContent;
  }
  
  try {
    const blocks = JSON.parse(jsonContent);
    if (!Array.isArray(blocks)) return jsonContent;
    
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
    return jsonContent;
  }
}
