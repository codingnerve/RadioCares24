/** Custom hero illustration: a friendly car-radio unit sending out signal waves. Decorative. */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-float ${className}`} aria-hidden="true">
      <svg viewBox="0 0 520 440" className="h-auto w-full" focusable="false">
        <path
          d="M120 60C200 10 360 0 440 80C510 150 500 300 420 360C340 420 190 430 110 370C30 310 40 110 120 60Z"
          fill="#f2e9d8"
        />
        <circle cx="436" cy="84" r="44" fill="#dff0e0" />
        <circle cx="74" cy="338" r="30" fill="#fbefc6" />
        <circle cx="462" cy="338" r="22" fill="#fbdcd6" />
        <circle cx="96" cy="120" r="14" fill="#dcecf8" />

        {/* signal waves */}
        <g fill="none" stroke="#ff6a4d" strokeWidth="10" strokeLinecap="round">
          <path d="M214 130a58 58 0 0 1 92 0" className="animate-wave" style={{ animationDelay: "0s" }} />
          <path d="M184 98a100 100 0 0 1 152 0" className="animate-wave" style={{ animationDelay: "0.45s" }} />
          <path d="M154 66a142 142 0 0 1 212 0" className="animate-wave" style={{ animationDelay: "0.9s" }} />
        </g>

        {/* radio unit */}
        <rect x="104" y="158" width="312" height="196" rx="40" fill="#083f3d" />
        <rect x="104" y="158" width="312" height="196" rx="40" fill="none" stroke="#0e5a57" strokeWidth="6" />
        <rect x="132" y="184" width="256" height="106" rx="24" fill="#fbf6ec" />
        {/* signal bars */}
        <g fill="#0e5a57">
          <rect x="158" y="250" width="12" height="16" rx="4" />
          <rect x="178" y="238" width="12" height="28" rx="4" />
          <rect x="198" y="224" width="12" height="42" rx="4" />
          <rect x="218" y="208" width="12" height="58" rx="4" fill="#ff6a4d" />
        </g>
        {/* wave line */}
        <path
          d="M252 238c10-26 20-26 30 0s20 26 30 0 20-26 30 0"
          fill="none"
          stroke="#0e5a57"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* buttons and knob */}
        <g fill="#1b7370" stroke="#fbf6ec" strokeWidth="3">
          <circle cx="156" cy="322" r="14" />
          <circle cx="202" cy="322" r="14" />
          <circle cx="248" cy="322" r="14" />
        </g>
        <circle cx="352" cy="322" r="24" fill="#ff6a4d" />
        <circle cx="352" cy="322" r="8" fill="#083f3d" />

        {/* friendly sticker */}
        <g transform="rotate(8 396 150)">
          <rect x="350" y="128" width="96" height="44" rx="22" fill="#fff" stroke="#e3d9c5" />
          <circle cx="376" cy="150" r="12" fill="#dff0e0" />
          <path
            d="m370 150 4 4 8-9"
            fill="none"
            stroke="#1f6b3a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="396" y="144" width="38" height="6" rx="3" fill="#0e5a57" opacity=".7" />
          <rect x="396" y="154" width="26" height="6" rx="3" fill="#0e5a57" opacity=".35" />
        </g>
      </svg>
    </div>
  );
}
