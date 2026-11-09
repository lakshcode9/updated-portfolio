import { Children } from "react";

/**
 * Swipeable row of cards on phones (snaps card by card, next card peeks in),
 * a normal grid from the `sm` breakpoint up.
 */
export function CardRail({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <ul
      aria-label={label}
      className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-x-6"
    >
      {Children.map(children, (child) => (
        <li className="w-[46%] shrink-0 snap-start sm:w-auto">{child}</li>
      ))}
    </ul>
  );
}
