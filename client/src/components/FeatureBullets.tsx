import React from "react";

const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
);
const Lock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 11V7a5 5 0 0110 0v4"
    />
  </svg>
);
const Zap = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
    />
  </svg>
);

const Item: React.FC<{
  icon: React.ReactNode;
  text: string;
  className?: string;
}> = ({ icon, text, className }) => (
  <div className={`flex items-start gap-3 ${className || ""}`}>
    <div className="mt-0.5">{icon}</div>
    <p className="text-[var(--text-muted)]">{text}</p>
  </div>
);

export const FeatureBullets: React.FC = () => {
  return (
    <div className="mt-6 space-y-3">
      <Item
        icon={<Check className="w-5 h-5 text-green-400" />}
        text="Summarize videos instantly with AI"
      />
      <Item
        icon={<Check className="w-5 h-5 text-green-400" />}
        text="Save hours by skipping to the key insights"
      />
      <Item
        icon={<Check className="w-5 h-5 text-green-400" />}
        text="Supports long videos with ease"
      />
      <Item
        icon={<Lock className="w-5 h-5 text-[var(--accent)]" />}
        text="Keep full privacy, nothing stored or tracked"
      />
      <Item
        icon={<Zap className="w-5 h-5 text-[var(--accent)]" />}
        text="Lightning-fast processing"
      />
    </div>
  );
};

export default FeatureBullets;
