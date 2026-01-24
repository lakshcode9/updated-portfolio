"use client";

import React from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

interface NotionEditorProps {
  initialContent?: PartialBlock[];
  onChange?: (content: PartialBlock[]) => void;
  editable?: boolean;
}

export function NotionEditor({ initialContent, onChange, editable = true }: NotionEditorProps) {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent || [
      {
        type: "paragraph",
        content: [],
      },
    ],
  });

  return (
    <div className="notion-editor-wrapper rounded-xl overflow-hidden border border-border/40 bg-background">
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
          if (onChange) {
            onChange(editor.document);
          }
        }}
        theme="dark"
      />
    </div>
  );
}

// Helper to convert BlockNote content to plain text for display
export function blocksToText(blocks: PartialBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  
  return blocks
    .map((block) => {
      if (block.content && Array.isArray(block.content)) {
        return block.content
          .map((item: { text?: string }) => item.text || "")
          .join("");
      }
      return "";
    })
    .join("\n");
}

// Helper to create initial content from plain text
export function textToBlocks(text: string): PartialBlock[] {
  if (!text) return [{ type: "paragraph", content: [] }];
  
  return text.split("\n").map((line) => ({
    type: "paragraph" as const,
    content: [{ type: "text" as const, text: line }],
  }));
}
