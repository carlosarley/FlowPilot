// MockupUI — decorative product interface preview shown in the Hero on desktop.
//
// This is a Server Component (no "use client") because it has zero interactivity
// and never changes after the initial render — no useState, useEffect, or event
// handlers. This means it contributes zero bytes to the client JS bundle.
//
// aria-hidden="true" on the root div: the kanban content is purely illustrative.
// Screen readers skip it entirely — the copy in Hero.tsx communicates the same
// product information in accessible prose.

// ── Types ─────────────────────────────────────────────────────────────────────

interface IdeaCard {
  title: string;
  tag: string;
  // Full Tailwind class string for the status badge.
  // Includes dark: variants because the tagColor is embedded in data so we
  // can't add dark: classes in JSX separately — they must live here.
  tagColor: string;
  avatars: string[];
  priority: string;
}

interface TaskCard {
  title: string;
  tag: string;
  tagColor: string;
  avatars: string[];
  due: string;
}

interface DecisionCard {
  title: string;
  tag: string;
  tagColor: string;
  avatars: string[];
  icon: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

/*
 * Sample idea cards — represent the "capture" pillar of FlowPilot.
 *
 * Dark mode tag colors:
 *   Light: bg-*-100 text-*-700  (pastel bg + dark text — works on white cards)
 *   Dark:  bg-*-900/50 text-*-400 (deep tinted bg + lighter text — works on slate-800 cards)
 */
const IDEAS: IdeaCard[] = [
  {
    title: "Rediseño del onboarding",
    tag: "Idea",
    tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400",
    avatars: ["A", "M"],
    priority: "Alta",
  },
  {
    title: "Integración con Slack",
    tag: "Idea",
    tagColor: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400",
    avatars: ["C"],
    priority: "Media",
  },
];

// Sample task cards — represent the "execute" pillar.
const TASKS: TaskCard[] = [
  {
    title: "Revisar métricas Q2",
    tag: "En progreso",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    avatars: ["A"],
    due: "Hoy",
  },
  {
    title: "Preparar demo para stakeholders",
    tag: "En progreso",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    avatars: ["M", "C"],
    due: "Mañana",
  },
  {
    title: "Actualizar roadmap Q3",
    tag: "Pendiente",
    // Neutral grey for "pending" — no colour urgency signal
    tagColor: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
    avatars: ["A"],
    due: "Viernes",
  },
];

// Sample decision cards — represent the "decide" pillar.
const DECISIONS: DecisionCard[] = [
  {
    title: "Adoptar FlowPilot como workspace oficial",
    tag: "Aprobado",
    tagColor: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-400",
    avatars: ["A", "M", "C"],
    icon: "✓",
  },
  {
    title: "Migrar documentación a Notion",
    tag: "En revisión",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
    avatars: ["M"],
    icon: "○",
  },
];

// Team member initials rendered as stacked avatars in the top bar.
// Colors match the avatar palette used in Hero and SocialProof for consistency.
const TEAM_MEMBERS = [
  { initial: "A", color: "bg-teal-500" },
  { initial: "M", color: "bg-violet-500" },
  { initial: "C", color: "bg-orange-500" },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * MockupUI
 *
 * A static illustration of FlowPilot's workspace, rendered inside a fake
 * browser chrome (traffic-light dots + address bar). Shows a three-column
 * kanban board with sample Ideas, Tasks, and Decisions cards.
 *
 * Max width 580px — matches the Hero right column on a 1280px viewport.
 *
 * Dark mode:
 *   Outer wrapper:  white bg → slate-800, slate-200 border → slate-700
 *   Browser chrome: slate-50 → slate-900, borders lighten proportionally
 *   App bar:        white → slate-800
 *   Board bg:       slate-50/50 → slate-900/50 (semi-transparent on dark)
 *   Cards:          white → slate-800, border slate-100 → slate-700
 *   All text:       slate-700/500/400 → slate-200/400/500 (steps up contrast)
 *   Badge ring:     border-white → border-slate-800 (prevents ghost ring)
 */
export default function MockupUI() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[580px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/80 dark:shadow-slate-900/80 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 select-none"
    >
      {/* ── Browser chrome bar ──────────────────────────────────────── */}
      <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 flex items-center gap-3 border-b border-slate-200 dark:border-slate-700">
        {/* macOS-style traffic-light dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        {/* Fake URL bar — shows a plausible in-product workspace URL */}
        <div className="flex-1 bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 text-xs text-slate-400 dark:text-slate-500 px-3 py-1 text-center">
          app.flowpilot.io/workspace/q2-lanzamiento
        </div>
      </div>

      {/* ── App top bar ─────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
        {/* Logo + breadcrumb navigation path */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">⚡</span>
          </div>
          <span className="font-heading font-semibold text-slate-800 dark:text-slate-100 text-sm">
            FlowPilot
          </span>
          {/* Breadcrumb separator */}
          <span className="text-slate-300 dark:text-slate-600 text-xs">/</span>
          <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">Q2 Lanzamiento</span>
        </div>

        {/* Stacked team avatars + invite button */}
        <div className="flex items-center gap-1">
          {TEAM_MEMBERS.map(({ initial, color }, i) => (
            <div
              key={initial}
              className={`w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-white ${color} ${
                i > 0 ? "-ml-1" : "" // negative margin creates the stacking overlap
              }`}
            >
              {initial}
            </div>
          ))}
          {/* Invite (+) button — visual detail, non-interactive in this mockup */}
          <button className="ml-2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs flex items-center justify-center font-bold">
            +
          </button>
        </div>
      </div>

      {/* ── Kanban board ────────────────────────────────────────────── */}
      {/* Three equal columns — Ideas / Tasks / Decisions */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 p-3 grid grid-cols-3 gap-2">

        {/* Ideas column — violet accent */}
        <KanbanColumn title="💡 Ideas" count={IDEAS.length} color="text-violet-600 dark:text-violet-400">
          {IDEAS.map((card, i) => (
            <KanbanCard key={i}>
              <StatusBadge label={card.tag} className={card.tagColor} />
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-tight mt-1.5">
                {card.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <AvatarStack initials={card.avatars} />
                <span className="text-[9px] text-slate-400 dark:text-slate-500">{card.priority}</span>
              </div>
            </KanbanCard>
          ))}
        </KanbanColumn>

        {/* Tasks column — amber accent */}
        <KanbanColumn title="✓ Tareas" count={TASKS.length} color="text-amber-600 dark:text-amber-400">
          {TASKS.map((card, i) => (
            <KanbanCard key={i}>
              <StatusBadge label={card.tag} className={card.tagColor} />
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-tight mt-1.5">
                {card.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <AvatarStack initials={card.avatars} />
                <span className="text-[9px] text-slate-400 dark:text-slate-500">{card.due}</span>
              </div>
            </KanbanCard>
          ))}
        </KanbanColumn>

        {/* Decisions column — teal accent */}
        <KanbanColumn title="◎ Decisiones" count={DECISIONS.length} color="text-teal-600 dark:text-teal-400">
          {DECISIONS.map((card, i) => (
            <KanbanCard key={i}>
              {/* `icon` prefix visually encodes the decision status (✓ / ○) */}
              <StatusBadge label={`${card.icon} ${card.tag}`} className={card.tagColor} />
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-tight mt-1.5">
                {card.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <AvatarStack initials={card.avatars} />
              </div>
            </KanbanCard>
          ))}
        </KanbanColumn>
      </div>

      {/* ── Status bar ──────────────────────────────────────────────── */}
      {/* Live indicator — the pulsing dot (●) communicates real-time collaboration */}
      <div className="bg-white dark:bg-slate-800 px-4 py-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 dark:text-slate-500">7 elementos · 3 activos</span>
        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
          ● En vivo · 3 colaboradores
        </span>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

/**
 * KanbanColumn
 *
 * Wrapper for a single board column. Renders the column title in accent color
 * and a count badge showing how many cards are in the column.
 */
function KanbanColumn({
  title,
  count,
  color,
  children,
}: {
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-1 mb-0.5">
        {/* Column header in accent color — uppercase + wide tracking = section tag style */}
        <span className={`text-[10px] font-bold uppercase tracking-wide ${color}`}>
          {title}
        </span>
        {/* Circular count badge — slate background so it doesn't compete with accent */}
        <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center font-semibold">
          {count}
        </span>
      </div>
      {children}
    </div>
  );
}

/**
 * KanbanCard
 *
 * White card wrapper with subtle shadow and hover elevation.
 * `cursor-pointer` signals interactivity even though this is a static mockup.
 *
 * Dark mode: bg white → slate-800, border slate-100 → slate-700,
 * hover border slate-200 → slate-600 (slightly lighter = lifted feel).
 */
function KanbanCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 p-2 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-600 transition-all cursor-pointer">
      {children}
    </div>
  );
}

/**
 * StatusBadge
 *
 * Pill-shaped label for card status (e.g. "Idea", "En progreso", "Aprobado").
 * `className` carries both the light and dark color classes from the data array
 * because dynamic class names can't be constructed at runtime in Tailwind —
 * all class strings must appear literally in the source for the JIT compiler
 * to generate the corresponding CSS.
 */
function StatusBadge({ label, className }: { label: string; className: string }) {
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}

/**
 * AvatarStack
 *
 * Renders a row of small circular avatars showing which team members are
 * associated with a card. Colors cycle through a fixed 4-color palette
 * matching the team member colors defined throughout the site.
 *
 * `border-white dark:border-slate-800` creates a halo ring that visually
 * separates avatars when they overlap on different background colors.
 */
function AvatarStack({ initials }: { initials: string[] }) {
  // Fixed palette — index wraps around if there are more than 4 avatars
  const COLORS = ["bg-teal-500", "bg-violet-500", "bg-orange-500", "bg-blue-500"];

  return (
    <div className="flex items-center gap-0.5">
      {initials.map((initial, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full ${COLORS[i % COLORS.length]} flex items-center justify-center text-[8px] font-bold text-white border border-white dark:border-slate-800`}
        >
          {initial}
        </div>
      ))}
    </div>
  );
}
