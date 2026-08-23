import React from 'react';

interface ClubLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'full' | 'shield-only' | 'horizontal';
  withText?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  withText = false,
}) => {
  // Dimensions map
  const sizeMap = {
    sm: { shield: 'w-7 h-8', text: 'text-xs', textGap: 'gap-1' },
    md: { shield: 'w-10 h-11', text: 'text-sm', textGap: 'gap-1.5' },
    lg: { shield: 'w-16 h-18', text: 'text-lg', textGap: 'gap-2' },
    xl: { shield: 'w-24 h-28', text: 'text-2xl', textGap: 'gap-2.5' },
    '2xl': { shield: 'w-36 h-40', text: 'text-3xl', textGap: 'gap-3' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Exact vector reproduction of the shield logo with circuit tree and IT typography
  const ShieldSvg = ({ svgClass = '' }: { svgClass?: string }) => (
    <svg
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${svgClass} drop-shadow-sm select-none`}
    >
      <defs>
        {/* Outer Shield Gradient */}
        <linearGradient id="shieldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#0077b6" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        {/* Deep Shield Background Gradient */}
        <linearGradient id="shieldBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a192f" />
          <stop offset="50%" stopColor="#071426" />
          <stop offset="100%" stopColor="#050e1a" />
        </linearGradient>

        {/* Circuit Nodes Glow Filter */}
        <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Circuit Green Gradient */}
        <linearGradient id="circuitGreenGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {/* Outer Shield Outline */}
      <path
        d="M120 12 C165 24 212 18 222 28 C224 88 226 150 186 210 C158 252 124 270 120 272 C116 270 82 252 54 210 C14 150 16 88 18 28 C28 18 75 24 120 12 Z"
        fill="url(#shieldBorderGrad)"
      />

      {/* Inner Shield Body */}
      <path
        d="M120 26 C160 36 200 32 208 40 C210 92 211 146 176 198 C150 236 123 252 120 254 C117 252 90 236 64 198 C29 146 30 92 32 40 C40 32 80 36 120 26 Z"
        fill="url(#shieldBgGrad)"
      />

      {/* Stylized "I" letter */}
      <path
        d="M62 60 H98 V118 H62 Z"
        fill="#f8fafc"
        rx="2"
      />

      {/* Stylized "T" letter */}
      <path
        d="M108 60 H182 V78 H154 V118 H136 V78 H108 Z"
        fill="#f8fafc"
        rx="2"
      />

      {/* Circuit Tree - Main Central Trunks & Lines (Green) */}
      <g stroke="url(#circuitGreenGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Central Trunk from bottom point */}
        <path d="M120 242 V140" />

        {/* Inner Left and Right Trunk Channels */}
        <path d="M112 230 V160" strokeWidth="4.5" />
        <path d="M128 230 V160" strokeWidth="4.5" />

        {/* Branch 1 - Center Left Up into 'I' & 'T' gap */}
        <path d="M120 156 L96 130 V102" />
        {/* Branch 2 - Center Right Up into 'T' stem */}
        <path d="M120 156 L144 130 V102" />

        {/* Branch 3 - Far Left Upper */}
        <path d="M112 185 L80 158 H60 L44 140" />
        <path d="M80 158 V132 H72" />

        {/* Branch 4 - Far Right Upper */}
        <path d="M128 185 L160 158 H178 L196 140" />
        <path d="M160 158 V132 H168" />

        {/* Branch 5 - Mid Right Upward */}
        <path d="M144 130 L166 112 V96" />

        {/* Branch 6 - Mid Left Upward */}
        <path d="M96 130 L74 112 V96" />

        {/* Small diagonal accent traces */}
        <path d="M120 185 L102 170" strokeWidth="4" />
        <path d="M120 185 L138 170" strokeWidth="4" />
      </g>

      {/* Circuit Node Terminals / Solder Pads (Green filled circles with dark centers) */}
      <g fill="#10b981">
        {/* Upper Left Nodes */}
        <circle cx="96" cy="94" r="8" filter="url(#circuitGlow)" />
        <circle cx="96" cy="94" r="3.5" fill="#071426" />

        <circle cx="72" cy="92" r="7" filter="url(#circuitGlow)" />
        <circle cx="72" cy="92" r="3" fill="#071426" />

        <circle cx="44" cy="136" r="8" filter="url(#circuitGlow)" />
        <circle cx="44" cy="136" r="3.5" fill="#071426" />

        {/* Upper Right Nodes */}
        <circle cx="144" cy="94" r="8" filter="url(#circuitGlow)" />
        <circle cx="144" cy="94" r="3.5" fill="#071426" />

        <circle cx="168" cy="92" r="7" filter="url(#circuitGlow)" />
        <circle cx="168" cy="92" r="3" fill="#071426" />

        <circle cx="196" cy="136" r="8" filter="url(#circuitGlow)" />
        <circle cx="196" cy="136" r="3.5" fill="#071426" />

        {/* Center Branch Nodes */}
        <circle cx="130" cy="142" r="7.5" filter="url(#circuitGlow)" />
        <circle cx="130" cy="142" r="3" fill="#071426" />

        <circle cx="106" cy="148" r="6" filter="url(#circuitGlow)" />
        <circle cx="106" cy="148" r="2.5" fill="#071426" />

        {/* Lateral Nodes */}
        <circle cx="68" cy="132" r="6.5" filter="url(#circuitGlow)" />
        <circle cx="68" cy="132" r="2.5" fill="#071426" />

        <circle cx="172" cy="132" r="6.5" filter="url(#circuitGlow)" />
        <circle cx="172" cy="132" r="2.5" fill="#071426" />
      </g>
    </svg>
  );

  if (variant === 'shield-only') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <ShieldSvg svgClass={currentSize.shield} />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
        <ShieldSvg svgClass={currentSize.shield} />
        <div className="flex items-center gap-1.5 select-none leading-none">
          <span className="font-extrabold tracking-tight text-sky-500 font-sans text-lg sm:text-xl">
            IT
          </span>
          <span className="font-extrabold tracking-tight text-emerald-400 font-sans text-lg sm:text-xl">
            CLUB
          </span>
        </div>
      </div>
    );
  }

  // Full stacked lockup (Shield + IT CLUB wordmark beneath)
  return (
    <div className={`inline-flex flex-col items-center shrink-0 ${currentSize.textGap} ${className}`}>
      <ShieldSvg svgClass={currentSize.shield} />
      {(withText || variant === 'full') && (
        <div className="flex items-center gap-1.5 select-none leading-none tracking-tight font-black">
          <span className="text-sky-500 font-extrabold tracking-wider text-sm sm:text-base font-sans">
            IT
          </span>
          <span className="text-emerald-400 font-extrabold tracking-wider text-sm sm:text-base font-sans">
            CLUB
          </span>
        </div>
      )}
    </div>
  );
};
