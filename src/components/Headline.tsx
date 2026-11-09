/** Renders text with *one word* underlined in Signal Orange, like the reel headers. */
export function Headline({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="mark">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function plain(text: string) {
  return text.replace(/\*/g, "");
}
