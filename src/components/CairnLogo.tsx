interface CairnLogoProps {
  className?: string;
}

export function CairnLogo({ className = "w-6 h-6" }: CairnLogoProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
      {/* Cairn pyramid - 4, 3, 2, 1 rocks */}
      {/* Bottom row - 4 rocks */}
      <ellipse cx="4.5" cy="18.5" rx="2.5" ry="2" />
      <ellipse cx="9.5" cy="18.5" rx="2.5" ry="2" />
      <ellipse cx="14.5" cy="18.5" rx="2.5" ry="2" />
      <ellipse cx="19.5" cy="18.5" rx="2.5" ry="2" />
      {/* Second row - 3 rocks */}
      <ellipse cx="7" cy="14" rx="2.5" ry="2" />
      <ellipse cx="12" cy="14" rx="2.5" ry="2" />
      <ellipse cx="17" cy="14" rx="2.5" ry="2" />
      {/* Third row - 2 rocks */}
      <ellipse cx="9.5" cy="9.5" rx="2.5" ry="2" />
      <ellipse cx="14.5" cy="9.5" rx="2.5" ry="2" />
      {/* Top - 1 rock */}
      <ellipse cx="12" cy="5" rx="2.5" ry="2" />
    </svg>
  );
}
