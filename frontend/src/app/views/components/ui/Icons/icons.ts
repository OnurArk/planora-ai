export type IconDefinition = {
  body: string;
  viewBox?: string;
  width?: number;
  height?: number;
};

export const iconRegistry = {
  brand: {
    viewBox: "0 0 240 240",
    body: `
      <defs>
        <linearGradient id="deepPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2E1065" />
          <stop offset="100%" stop-color="#9333EA" />
        </linearGradient>
      </defs>
      <path d="M110 40 L130 40 Q140 40 140 50 L140 85 Q140 95 130 100 L110 100 Q100 95 100 85 L100 50 Q100 40 110 40 Z" fill="url(#deepPurple)" />
      <path d="M110 200 L130 200 Q140 200 140 190 L140 155 Q140 145 130 140 L110 140 Q100 145 100 155 L100 190 Q100 200 110 200 Z" fill="url(#deepPurple)" />
      <path d="M40 110 L40 130 Q40 140 50 140 L85 140 Q95 140 100 130 L100 110 Q95 100 85 100 L50 100 Q40 100 40 110 Z" fill="url(#deepPurple)" />
      <path d="M200 110 L200 130 Q200 140 190 140 L155 140 Q145 140 140 130 L140 110 Q145 100 155 100 L190 100 Q200 100 200 110 Z" fill="url(#deepPurple)" />
    `,
  },
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof iconRegistry | (string & {});
