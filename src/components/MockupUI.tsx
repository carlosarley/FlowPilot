// MockupUI — decorative product interface preview rendered inside the Hero.
//
// Intentionally marked aria-hidden because it is purely illustrative;
// screen readers should not attempt to navigate the simulated kanban board.
//
// The component is a Server Component (no "use client" needed) because it
// has no interactivity — it never changes after the initial render.

// ── Types ─────────────────────────────────────────────────────────────────────

interface IdeaCard {
  title: string;
  tag: string;
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

/** Sample idea cards — represent the "capture" pillar of FlowPilot */
const IDEAS: IdeaCard[] = [
  {
    title: "Rediseño del onboarding",
    tag: "Idea",
    tagColor: "bg-violet-100 text-violet-700",
    avatars: ["A", "M"],
    priority: "Alta",
  },
  {
    title: "Integración con Slack",
    tag: "Idea",
    tagColor: "bg-violet-100 text-violet-700",
    avatars: ["C"],
    priority: "Media",
  },
];

/** Sample task cards — represent the "execute" pillar */
const TASKS: TaskCard[] = [
  {
    title: "Revisar métricas Q2",
    tag: "En progreso",
    tagColor: "bg-amber-100 text-amber-700",
    avatars: ["A"],
    due: "Hoy",
  },
  {
    title: "Preparar demo para stakeholders",
    tag: "En progreso",
    tagColor: "bg-amber-100 text-amber-700",
    avatars: ["M", "C"],
    due: "Mañana",
  },
  {
    title: "Actualizar roadmap Q3",
    tag: "Pendiente",
    tagColor: "bg-slate-100 text-slate-600",
    avatars: ["A"],
    due: "Viernes",
  },
];

/** Sample decision cards — represent the "decide" pillar */
const DECISIONS: DecisionCard[] = [
  {
    title: "Adoptar FlowPilot como workspace oficial",
    tag: "Aprobado",
    tagColor: "bg-teal-100 text-teal-700",
    avatars: ["A", "M", "C"],
    icon: "✓",
  },
  {
    title: "Migrar documentación a Notion",
    tag: "En revisión",
    tagColor: "bg-blue-100 text-blue-700",
    avatars: ["M"],
    icon: "○",
  },
];

/** Team member initials and associated avatar colors (matches the app's color scheme) */
const TEAM_MEMBERS = [
  { initial: "A", color: "bg-teal-500" },
  { initial: "M", color: "bg-violet-500" },
  { initial: "C", color: "bg-orange-500" },
];

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Decorative product UI mockup.
 *
 * Renders a browser chrome wrapper around a simulated kanban workspace
 * with three columns (Ideas, Tareas, Decisiones) mirroring FlowPilot's
 * three core pillars.
 */
export default function MockupUI() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[580px] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/80 border border-slate-200 bg-white select-none"
    >
      {/* ── Browser chrome bar ──────────────────────────────────────── */}
      <div className="bg-slate-50 px-4 py-3 flex items-center gap-3 border-b border-slate-200">
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        {/* Fake address bar */}
        <div className="flex-1 bg-white rounded-md border border-slate-200 text-xs text-slate-400 px-3 py-1 text-center">
          app.flowpilot.io/workspace/q2-lanzamiento
        </div>
      </div>

      {/* ── App top bar ─────────────────────────────────────────────── */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100">
        {/* Logo + breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">⚡</span>
          </div>
          <span className="font-heading font-semibold text-slate-800 text-sm">
            FlowPilot
          </span>
          <span className="text-slate-300 text-xs">/</span>
          <span className="text-slate-500 text-xs font-medium">Q2 Lanzamiento</span>
        </div>

        {/* Stacked team avatars + invite button */}
        <div className="flex items-center gap-1">
          {TEAM_MEMBERS.map(({ initial, color }, i) => (
            <div
              key={initial}
              className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white ${color} ${
                i > 0 ? "-ml-1" : ""
              }`}
            >
              {initial}
            </div>
          ))}
          <button className="ml-2 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center font-bold">
            +
          </button>
        </div>
      </div>

      {/* ── Kanban board ────────────────────────────────────────────── */}
      <div className="bg-slate-50/50 p-3 grid grid-cols-3 gap-2">
        {/* Ideas column */}
        <KanbanColumn title="💡 Ideas" count={IDEAS.length} color="text-violet-600">
          {IDEAS.map((card, i) => (
            <KanbanCard key={i}>
              <StatusBadge label={card.tag} className={card.tagColor} />
              <p className="text-xs font-medium text-slate-700 leading-tight mt-1.5">
                {card.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <AvatarStack initials={card.avatars} />
                <span className="text-[9px] text-slate-400">{card.priority}</span>
              </div>
            </KanbanCard>
          ))}
        </KanbanColumn>

        {/* Tasks column */}
        <KanbanColumn title="✓ Tareas" count={TASKS.length} color="text-amber-600">
          {TASKS.map((card, i) => (
            <KanbanCard key={i}>
              <StatusBadge label={card.tag} className={card.tagColor} />
              <p className="text-xs font-medium text-slate-700 leading-tight mt-1.5">
                {card.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <AvatarStack initials={card.avatars} />
                <span className="text-[9px] text-slate-400">{card.due}</span>
              </div>
            </KanbanCard>
          ))}
        </KanbanColumn>

        {/* Decisions column */}
        <KanbanColumn title="◎ Decisiones" count={DECISIONS.length} color="text-teal-600">
          {DECISIONS.map((card, i) => (
            <KanbanCard key={i}>
              <StatusBadge label={`${card.icon} ${card.tag}`} className={card.tagColor} />
              <p className="text-xs font-medium text-slate-700 leading-tight mt-1.5">
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
      <div className="bg-white px-4 py-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] text-slate-400">7 elementos · 3 activos</span>
        <span className="text-[10px] text-teal-600 font-medium">
          ● En vivo · 3 colaboradores
        </span>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

/** Kanban column wrapper with a header showing the column title and card count */
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
        <span className={`text-[10px] font-bold uppercase tracking-wide ${color}`}>
          {title}
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-100 rounded-full w-4 h-4 flex items-center justify-center font-semibold">
          {count}
        </span>
      </div>
      {children}
    </div>
  );
}

/** White card container with hover elevation */
function KanbanCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-slate-100 p-2 shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer">
      {children}
    </div>
  );
}

/** Pill-shaped status badge */
function StatusBadge({ label, className }: { label: string; className: string }) {
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}

/**
 * Stacked avatar row.
 * Colors cycle through a fixed palette — index 0 = teal, 1 = violet, 2 = orange, 3 = blue.
 */
function AvatarStack({ initials }: { initials: string[] }) {
  const COLORS = ["bg-teal-500", "bg-violet-500", "bg-orange-500", "bg-blue-500"];

  return (
    <div className="flex items-center gap-0.5">
      {initials.map((initial, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full ${COLORS[i % COLORS.length]} flex items-center justify-center text-[8px] font-bold text-white border border-white`}
        >
          {initial}
        </div>
      ))}
    </div>
  );
}
