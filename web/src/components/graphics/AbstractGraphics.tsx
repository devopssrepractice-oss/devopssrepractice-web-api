'use client';

import { motion } from 'framer-motion';

// Abstract geometric shapes for decorative backgrounds
export function AbstractCircuitGraphic({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circuit-like paths */}
      <motion.path
        d="M40 100H80L100 60L120 100H160"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M60 140H90L110 160H150"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
      />
      {/* Nodes */}
      <motion.circle cx="80" cy="100" r="4" fill="currentColor" fillOpacity="0.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
      <motion.circle cx="120" cy="100" r="4" fill="currentColor" fillOpacity="0.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
      <motion.circle cx="100" cy="60" r="6" fill="currentColor" fillOpacity="0.3"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
      {/* Pulsing ring */}
      <motion.circle cx="100" cy="60" r="12" stroke="currentColor" strokeWidth="1" fill="none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export function AbstractGridGraphic({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid dots */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <motion.circle
            key={`${row}-${col}`}
            cx={30 + col * 36}
            cy={30 + row * 36}
            r="2"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ delay: (row + col) * 0.05, duration: 0.3 }}
          />
        ))
      )}
      {/* Highlight some connections */}
      <motion.line x1="66" y1="66" x2="102" y2="66" stroke="currentColor" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.25 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
      <motion.line x1="102" y1="66" x2="102" y2="102" stroke="currentColor" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.25 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      />
      <motion.line x1="102" y1="102" x2="138" y2="102" stroke="currentColor" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.25 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      />
      {/* Active nodes */}
      <motion.circle cx="66" cy="66" r="5" fill="currentColor" fillOpacity="0.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
      <motion.circle cx="102" cy="102" r="5" fill="currentColor" fillOpacity="0.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} />
      <motion.circle cx="138" cy="102" r="5" fill="currentColor" fillOpacity="0.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }} />
    </svg>
  );
}

export function AbstractWaveGraphic({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M0 50 Q75 10 150 50 Q225 90 300 50"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 60 Q75 20 150 60 Q225 100 300 60"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.15 }}
        transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// Decorative floating geometric shapes
export function GeoShape({
  shape,
  size = 40,
  className = '',
}: {
  shape: 'hexagon' | 'triangle' | 'diamond' | 'cross' | 'ring';
  size?: number;
  className?: string;
}) {
  const shapes = {
    hexagon: (
      <polygon
        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),
    triangle: (
      <polygon
        points="50,10 90,85 10,85"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),
    diamond: (
      <polygon
        points="50,5 95,50 50,95 5,50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    ),
    cross: (
      <>
        <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    ring: (
      <>
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {shapes[shape]}
    </svg>
  );
}

// Pipeline/flow visualization
export function PipelineGraphic({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pipeline stages */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <motion.rect
            x={10 + i * 100}
            y="35"
            width="70"
            height="50"
            rx="12"
            fill="currentColor"
            fillOpacity="0.06"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          />
          {/* Connector arrows */}
          {i < 3 && (
            <motion.path
              d={`M${80 + i * 100} 60 L${110 + i * 100} 60`}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
            />
          )}
          {/* Stage icon placeholder */}
          <motion.circle
            cx={45 + i * 100}
            cy="60"
            r="8"
            fill="currentColor"
            fillOpacity="0.15"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
          />
        </g>
      ))}
      {/* Progress pulse traveling through pipeline */}
      <motion.circle
        r="4"
        fill="currentColor"
        fillOpacity="0.5"
        animate={{
          cx: [45, 145, 245, 345, 345],
          cy: [60, 60, 60, 60, 60],
          opacity: [0.6, 0.6, 0.6, 0.6, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="currentColor" fillOpacity="0.3" />
        </marker>
      </defs>
    </svg>
  );
}

// ── Animated Data-Shield (privacy / security) ──────────────────
export function DataShieldGraphic({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield outline */}
      <motion.path
        d="M130 20 L230 70 L230 160 C230 220 180 270 130 290 C80 270 30 220 30 160 L30 70 Z"
        stroke="currentColor" strokeWidth="2" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      {/* Inner shield */}
      <motion.path
        d="M130 50 L205 88 L205 155 C205 205 165 245 130 260 C95 245 55 205 55 155 L55 88 Z"
        stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" fill="currentColor" fillOpacity="0.03"
        initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} transition={{ delay: 1, duration: 1 }}
      />
      {/* Lock body */}
      <motion.rect x="108" y="140" width="44" height="36" rx="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.08"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.4 }} transition={{ delay: 1.6, duration: 0.5 }}
      />
      {/* Lock shackle */}
      <motion.path d="M116 140 V126 C116 116 124 108 130 108 C136 108 144 116 144 126 V140"
        stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 0.6 }}
      />
      {/* Keyhole */}
      <motion.circle cx="130" cy="155" r="4" fill="currentColor" fillOpacity="0.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 }} />
      {/* Pulsing secure ring */}
      <motion.circle cx="130" cy="155" r="14" stroke="currentColor" strokeWidth="1" fill="none"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 2.5 }}
      />
      {/* Data stream lines flowing into shield */}
      {[
        { d: 'M10 100 Q70 90 100 120', delay: 0.4 },
        { d: 'M5 180 Q60 170 85 160', delay: 0.7 },
        { d: 'M250 90 Q190 85 165 115', delay: 0.5 },
        { d: 'M255 175 Q200 170 175 158', delay: 0.8 },
        { d: 'M130 5 L130 45', delay: 0.3 },
      ].map((s, i) => (
        <motion.path key={i} d={s.d} stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ delay: s.delay, duration: 1.5, ease: 'easeInOut' }}
        />
      ))}
      {/* Floating binary bits */}
      {[
        { x: 18, y: 92, t: '01' }, { x: 240, y: 84, t: '10' },
        { x: 14, y: 174, t: '11' }, { x: 244, y: 170, t: '00' },
      ].map((b, i) => (
        <motion.text key={i} x={b.x} y={b.y} fontSize="9" fontFamily="monospace" fill="currentColor"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.25, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
        >{b.t}</motion.text>
      ))}
    </svg>
  );
}

// ── SRE Metrics Ring Gauge ──────────────────────────────────
export function UptimeRingGraphic({ className = '' }: { className?: string }) {
  const circumference = 2 * Math.PI * 70;
  const uptimePct = 0.9999;
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background ring */}
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="8" strokeOpacity="0.08" />
      {/* Uptime arc */}
      <motion.circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circumference} fill="none"
        style={{ rotate: '-90deg', transformOrigin: 'center' }}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - uptimePct), opacity: 0.55 }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }}
      />
      {/* Inner ring */}
      <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3 5" />
      {/* Center text */}
      <motion.text x="100" y="96" textAnchor="middle" fontSize="22" fontWeight="800" fill="currentColor" fillOpacity="0.6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      >99.99%</motion.text>
      <motion.text x="100" y="116" textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.35"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}
      >UPTIME</motion.text>
      {/* Tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 82 * Math.cos(rad);
        const y1 = 100 + 82 * Math.sin(rad);
        const x2 = 100 + (i % 6 === 0 ? 88 : 85) * Math.cos(rad);
        const y2 = 100 + (i % 6 === 0 ? 88 : 85) * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={i % 6 === 0 ? 1.5 : 0.8} strokeOpacity="0.15" />;
      })}
      {/* Pulse at 12-o'clock */}
      <motion.circle cx="100" cy="30" r="3" fill="currentColor" fillOpacity="0.5"
        animate={{ r: [3, 6, 3], fillOpacity: [0.5, 0.1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

// ── Animated MTTR / Deployment Frequency Chart ──────────────
export function MetricsChartGraphic({ className = '' }: { className?: string }) {
  const bars = [35, 52, 44, 68, 58, 82, 72, 90, 65, 88, 78, 94];
  return (
    <svg className={className} viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <motion.line x1="30" y1="130" x2="270" y2="130" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
      <motion.line x1="30" y1="130" x2="30" y2="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
      {/* Grid lines */}
      {[35, 60, 85, 110].map((y, i) => (
        <motion.line key={i} x1="30" y1={y} x2="270" y2={y} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }} />
      ))}
      {/* Bars */}
      {bars.map((h, i) => (
        <motion.rect key={i} x={38 + i * 19.5} width="14" rx="3"
          y={130} height={0} fill="currentColor" fillOpacity="0.2"
          animate={{ y: 130 - (h * 1.2), height: h * 1.2 }}
          transition={{ delay: 1 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {/* Trend line */}
      <motion.polyline
        points={bars.map((h, i) => `${45 + i * 19.5},${130 - h * 1.2}`).join(' ')}
        stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" fill="none" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
      />
      {/* Trend dots */}
      {bars.map((h, i) => (
        <motion.circle key={i} cx={45 + i * 19.5} cy={130 - h * 1.2} r="2.5"
          fill="currentColor" fillOpacity="0.5"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 2.2 + i * 0.08 }}
        />
      ))}
      {/* Labels */}
      <motion.text x="150" y="152" textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity="0.3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
      >Deployment Frequency</motion.text>
    </svg>
  );
}

// ── Incident Response Timeline ──────────────────────────────
export function IncidentTimelineGraphic({ className = '' }: { className?: string }) {
  const stages = [
    { x: 30, label: 'Detect', color: 'fillOpacity="0.5"' },
    { x: 105, label: 'Triage', color: 'fillOpacity="0.4"' },
    { x: 180, label: 'Mitigate', color: 'fillOpacity="0.35"' },
    { x: 255, label: 'Resolve', color: 'fillOpacity="0.55"' },
  ];
  return (
    <svg className={className} viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Timeline bar */}
      <motion.line x1="30" y1="55" x2="290" y2="55" stroke="currentColor" strokeWidth="2" strokeOpacity="0.15"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }}
      />
      {/* Stages */}
      {stages.map((s, i) => (
        <g key={i}>
          <motion.circle cx={s.x + 20} cy={55} r="14" fill="currentColor" fillOpacity={0.08 + i * 0.02}
            stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.3, duration: 0.4 }}
          />
          <motion.circle cx={s.x + 20} cy={55} r="5" fill="currentColor" fillOpacity={0.15 + i * 0.1}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + i * 0.3 }}
          />
          <motion.text x={s.x + 20} y={85} textAnchor="middle" fontSize="8" fontWeight="600" fill="currentColor" fillOpacity="0.4"
            initial={{ opacity: 0, y: 90 }} animate={{ opacity: 1, y: 85 }} transition={{ delay: 0.8 + i * 0.3 }}
          >{s.label}</motion.text>
          {/* Connector */}
          {i < 3 && (
            <motion.line x1={s.x + 34} y1={55} x2={stages[i + 1].x + 6} y2={55}
              stroke="currentColor" strokeWidth="2" strokeOpacity="0.3"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.9 + i * 0.3, duration: 0.4 }}
            />
          )}
        </g>
      ))}
      {/* Traveling pulse */}
      <motion.circle r="4" fill="currentColor" fillOpacity="0.5"
        animate={{ cx: [50, 125, 200, 275], cy: [55, 55, 55, 55], opacity: [0.6, 0.6, 0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
      />
      {/* Time label */}
      <motion.text x="160" y="108" textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.25"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
      >MTTR &lt; 5 min</motion.text>
    </svg>
  );
}

// ── Network Topology / Microservices Map ────────────────────
export function NetworkTopologyGraphic({ className = '' }: { className?: string }) {
  const nodes = [
    { cx: 100, cy: 40 }, { cx: 50, cy: 100 }, { cx: 150, cy: 100 },
    { cx: 30, cy: 165 }, { cx: 100, cy: 165 }, { cx: 170, cy: 165 },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5],
  ];
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle cx={n.cx} cy={n.cy} r={i === 0 ? 14 : 10}
            fill="currentColor" fillOpacity={i === 0 ? 0.12 : 0.06}
            stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.12, type: 'spring' }}
          />
          <motion.circle cx={n.cx} cy={n.cy} r={i === 0 ? 5 : 3.5}
            fill="currentColor" fillOpacity="0.3"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.12 }}
          />
        </g>
      ))}
      {/* Ping travelling edge 0→1→3 */}
      <motion.circle r="3" fill="currentColor" fillOpacity="0.55"
        animate={{
          cx: [100, 50, 30, 30],
          cy: [40, 100, 165, 165],
          opacity: [0.6, 0.6, 0.6, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
      />
      {/* Ping travelling edge 0→2→5 */}
      <motion.circle r="2.5" fill="currentColor" fillOpacity="0.4"
        animate={{
          cx: [100, 150, 170, 170],
          cy: [40, 100, 165, 165],
          opacity: [0.5, 0.5, 0.5, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5, repeatDelay: 2 }}
      />
    </svg>
  );
}

// ── Compliance / Checklist animated graphic ─────────────────
export function ComplianceCheckGraphic({ className = '' }: { className?: string }) {
  const items = ['Encryption', 'Access Ctrl', 'Audit Logs', 'Backups', 'MFA'];
  return (
    <svg className={className} viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Card bg */}
      <rect x="10" y="10" width="200" height="180" rx="14" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
      {/* Header line */}
      <motion.line x1="25" y1="42" x2="195" y2="42" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
      />
      <motion.text x="110" y="33" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor" fillOpacity="0.4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
      >Compliance</motion.text>
      {/* Checklist items */}
      {items.map((item, i) => (
        <g key={i}>
          {/* Check box */}
          <motion.rect x="30" y={55 + i * 28} width="16" height="16" rx="4"
            stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" fill="currentColor" fillOpacity="0.04"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.2 }}
          />
          {/* Checkmark */}
          <motion.path d={`M33 ${63 + i * 28} L36 ${66 + i * 28} L43 ${59 + i * 28}`}
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ delay: 1 + i * 0.25, duration: 0.3 }}
          />
          {/* Label */}
          <motion.text x="56" y={67 + i * 28} fontSize="10" fill="currentColor" fillOpacity="0.35"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 56 }} transition={{ delay: 0.7 + i * 0.2 }}
          >{item}</motion.text>
          {/* Progress bar */}
          <motion.rect x="130" y={58 + i * 28} width="55" height="6" rx="3"
            fill="currentColor" fillOpacity="0.06" />
          <motion.rect x="130" y={58 + i * 28} rx="3"
            width={0} height="6" fill="currentColor" fillOpacity="0.2"
            animate={{ width: 40 + Math.random() * 15 }}
            transition={{ delay: 1.2 + i * 0.2, duration: 0.6, ease: 'easeOut' }}
          />
        </g>
      ))}
    </svg>
  );
}

// Orbiting dots decoration
export function OrbitGraphic({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Orbit rings */}
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
      {/* Center */}
      <circle cx="100" cy="100" r="6" fill="currentColor" fillOpacity="0.2" />
      {/* Orbiting dots */}
      <motion.circle
        r="4"
        fill="currentColor"
        fillOpacity="0.4"
        animate={{
          cx: [160, 100, 40, 100, 160],
          cy: [100, 40, 100, 160, 100],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.circle
        r="3"
        fill="currentColor"
        fillOpacity="0.3"
        animate={{
          cx: [100, 140, 100, 60, 100],
          cy: [140, 100, 60, 100, 140],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}
