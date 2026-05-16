/**
 * AIR Platform — Navigation Configuration
 *
 * ★ Pages with `isHidden: true` are excluded from:
 *   - Header / Footer / Mobile Nav
 *   - sitemap.xml
 *   - Internal linking
 *
 * To re-enable a page:
 *   1. Move its folder from `app/_hidden/<page>` → `app/<page>`
 *   2. Set `isHidden: false` below
 *   3. Add its URL to `sitemap.ts`
 */

export interface NavItem {
  /** Display label (Arabic) */
  label: string;
  /** Route path */
  href: string;
  /** Whether this page is hidden from navigation */
  isHidden: boolean;
  /** Optional description for tooltips / mega-menu */
  description?: string;
  /** Optional icon identifier */
  icon?: string;
}

export const navItems: NavItem[] = [
  {
    label: "الرئيسية",
    href: "/",
    isHidden: false,
  },
  {
    label: "المدونة",
    href: "/blog",
    isHidden: false,
    description: "مقالات ودروس في الذكاء الاصطناعي",
  },
  {
    label: "الأدوات",
    href: "/tools",
    isHidden: false,
    description: "دليل أدوات الذكاء الاصطناعي مع مراجعات",
  },
  {
    label: "المتجر",
    href: "/store",
    isHidden: false,
    description: "منتجات رقمية وقوالب جاهزة",
  },
  {
    label: "العضوية",
    href: "/membership",
    isHidden: false,
    description: "اشتراك Pro للمحتوى الحصري",
  },

  // ── الصفحات المخفية مؤقتاً (فارغة / قيد التطوير) ──
  {
    label: "من نحن",
    href: "/about",
    isHidden: true,
  },
  {
    label: "الأنظمة",
    href: "/systems",
    isHidden: true,
  },
  {
    label: "العروض التجريبية",
    href: "/demos",
    isHidden: true,
  },
  {
    label: "الاستشارات",
    href: "/consultancy",
    isHidden: true,
  },
];

/** Returns only visible navigation items */
export function getVisibleNavItems(): NavItem[] {
  return navItems.filter((item) => !item.isHidden);
}

/** Returns only hidden navigation items */
export function getHiddenNavItems(): NavItem[] {
  return navItems.filter((item) => item.isHidden);
}
