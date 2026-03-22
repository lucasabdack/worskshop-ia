// Service icons — 2D line-art, 36×36, primary-pure stroke (#321CB2)
// Seguir este padrão para todos os ícones de serviço do app.

const C = "#321CB2"; // primary-pure

// ─── Elétrica ────────────────────────────────────────────────────────────────

export const OutletIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="4" y="4" width="28" height="28" rx="6" stroke={C} strokeWidth="1.8" />
    <circle cx="13" cy="16" r="2" stroke={C} strokeWidth="1.6" />
    <circle cx="23" cy="16" r="2" stroke={C} strokeWidth="1.6" />
    <path d="M15 22h6" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M20 8l-4 4h3l-4 4" stroke={C} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BulbIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M18 6a9 9 0 016 15.7V24a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2.3A9 9 0 0118 6z" stroke={C} strokeWidth="1.8" />
    <path d="M14 28h8M15 31h6" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const CircuitBreakerIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="8" y="4" width="20" height="28" rx="3" stroke={C} strokeWidth="1.8" />
    <rect x="12" y="8" width="12" height="6" rx="1.5" stroke={C} strokeWidth="1.6" />
    <path d="M12 20h12M12 24h8" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="24" cy="24" r="1.5" fill={C} />
  </svg>
);

export const WifiIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M6 16a18 18 0 0124 0" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 20.5a12 12 0 0116 0" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 25a6 6 0 018 0" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="18" cy="30" r="2" fill={C} />
  </svg>
);

export const ComputerIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="4" y="6" width="28" height="18" rx="2" stroke={C} strokeWidth="1.8" />
    <path d="M12 30h12M18 24v6" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M9 12h10M9 16h6" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const CameraIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M4 13a2 2 0 012-2h4l2-3h8l2 3h4a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V13z" stroke={C} strokeWidth="1.8" />
    <circle cx="18" cy="20" r="5" stroke={C} strokeWidth="1.6" />
    <circle cx="28" cy="15" r="1.5" fill={C} />
  </svg>
);

// ─── Hidráulica ───────────────────────────────────────────────────────────────

export const FaucetIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M6 16h8" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 12v8" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 16h8a4 4 0 014 4v2" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M24 23v4" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M22 30c0 1.1.9 2 2 2s2-.9 2-2c0-1.5-2-3.5-2-3.5S22 28.5 22 30z" stroke={C} strokeWidth="1.5" />
    <rect x="10" y="6" width="8" height="6" rx="1.5" stroke={C} strokeWidth="1.6" />
  </svg>
);

export const ShowerIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M8 12c0-5.5 4.5-8 9-8s9 2.5 9 8" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 12h20" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10 16v2M14 16v2M18 16v2M22 16v2M26 16v2M10 22v2M14 22v2M18 22v2M22 22v2M26 22v2" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const DrainIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="12" stroke={C} strokeWidth="1.8" />
    <circle cx="18" cy="18" r="5" stroke={C} strokeWidth="1.6" />
    <path d="M18 6v6M18 24v6M6 18h6M24 18h6" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M16 20l2 2 2-2" stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Reforma / Manutenção ─────────────────────────────────────────────────────

export const AcIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="4" y="9" width="28" height="14" rx="3" stroke={C} strokeWidth="1.8" />
    <path d="M4 15h28" stroke={C} strokeWidth="1.6" />
    <path d="M12 23v4M18 23v4M24 23v4" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="26" cy="12" r="2" fill={C} />
  </svg>
);

export const WrenchIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M10 26l12-12M22 8a5 5 0 100 10 5 5 0 000-10z" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 28l4-4" stroke={C} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const PaintRollerIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="8" y="8" width="20" height="10" rx="2" stroke={C} strokeWidth="1.8" />
    <rect x="10" y="10" width="16" height="6" rx="1" stroke={C} strokeWidth="1.2" />
    <path d="M22 13h4" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M18 18v5h-2v7a2 2 0 004 0v-7h-2v-5" stroke={C} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AssemblyIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="5" y="12" width="26" height="18" rx="2" stroke={C} strokeWidth="1.8" />
    <path d="M5 18h26" stroke={C} strokeWidth="1.6" />
    <path d="M13 12V8a2 2 0 014 0v4M19 12V8a2 2 0 014 0v4" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10 23h16M10 27h10" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ─── Limpeza ──────────────────────────────────────────────────────────────────

export const BroomIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M10 6l16 16" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M26 22l-6 8H14l-2-4 4-4 10 0z" stroke={C} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M16 26l2-4M19 27l3-5" stroke={C} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const SparkleIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M18 4l2.5 9.5L30 16l-9.5 2.5L18 28l-2.5-9.5L6 16l9.5-2.5L18 4z" stroke={C} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M28 6l1 3.5L32 11l-3.5 1L28 16l-1-3.5L23.5 11l3.5-1L28 6z" stroke={C} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

export const BoxIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M4 12l14-7 14 7v16l-14 7L4 28V12z" stroke={C} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M4 12l14 7M18 19l14-7M18 19v16" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M11 8.5l14 7" stroke={C} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
  </svg>
);

export const SofaIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="6" y="16" width="24" height="12" rx="3" stroke={C} strokeWidth="1.8" />
    <rect x="10" y="12" width="16" height="8" rx="2" stroke={C} strokeWidth="1.6" />
    <path d="M6 22H4a2 2 0 01-2-2v-2a2 2 0 012-2h2M30 22h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2" stroke={C} strokeWidth="1.6" />
    <path d="M10 28v3M26 28v3" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const SprayIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M12 30V16a4 4 0 014-4h4" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <rect x="10" y="24" width="8" height="8" rx="2" stroke={C} strokeWidth="1.6" />
    <path d="M20 12h6a2 2 0 012 2v2H20v-4z" stroke={C} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M28 14h2M26 10l2-3M30 18l2 2" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const ShovelIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M18 4v18" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 16a6 6 0 006 10 6 6 0 006-10" stroke={C} strokeWidth="1.8" />
    <path d="M18 26l-4 6h8l-4-6z" stroke={C} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

// ─── Jardinagem ───────────────────────────────────────────────────────────────

export const TreeIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M18 4l8 10H23l6 9h-7v13h-8V23H7l6-9H10L18 4z" stroke={C} strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const ScissorsIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <circle cx="10" cy="26" r="4" stroke={C} strokeWidth="1.8" />
    <circle cx="10" cy="10" r="4" stroke={C} strokeWidth="1.8" />
    <path d="M14 8l18 18M14 28L28 14" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const FlowerIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <circle cx="18" cy="16" r="3.5" stroke={C} strokeWidth="1.6" />
    <ellipse cx="18" cy="10" rx="3" ry="4" stroke={C} strokeWidth="1.5" />
    <ellipse cx="18" cy="22" rx="3" ry="4" stroke={C} strokeWidth="1.5" />
    <ellipse cx="12" cy="16" rx="4" ry="3" stroke={C} strokeWidth="1.5" />
    <ellipse cx="24" cy="16" rx="4" ry="3" stroke={C} strokeWidth="1.5" />
    <path d="M18 19.5V30" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M18 26c2-1 4-1 4-1" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const LandscapeIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <rect x="4" y="22" width="28" height="10" rx="2" stroke={C} strokeWidth="1.8" />
    <path d="M8 22c0-6 4-12 10-14 6 2 10 8 10 14" stroke={C} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M13 22c0-4 2-7 5-8 3 1 5 4 5 8" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const WaterDropIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M18 6S8 18 8 24a10 10 0 0020 0C28 18 18 6 18 6z" stroke={C} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M13 25a6 6 0 006-6" stroke={C} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const SeedlingIcon = () => (
  <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
    <path d="M18 28V18" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M18 22c-2-3-6-4-9-3 1 4 4 6 9 6" stroke={C} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 18c2-4 6-6 10-5-1 4-5 7-10 7" stroke={C} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 30h16" stroke={C} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
