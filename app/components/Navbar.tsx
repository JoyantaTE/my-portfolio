"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/calculate", label: "Cost" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav style={{ borderBottom: "1px solid #444", background: "rgba(26,26,26,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", color: "#F0EDE8", letterSpacing: "-0.02em", textDecoration: "none" }}>
          Joyanta<span style={{ color: "#C4622D" }}>.</span>
        </Link>
        <div style={{ display: "flex", gap: "2rem" }}>
          {links.map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: "0.875rem", color: pathname === link.href ? "#C4622D" : "#A0A0A0", textDecoration: "none", borderBottom: pathname === link.href ? "1px solid #C4622D" : "1px solid transparent", paddingBottom: "2px", letterSpacing: "0.02em" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}