"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <nav style={{ borderBottom: "1px solid #444444", padding: "0 2rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#333333", position: "sticky", top: 0, zIndex: 100 }}>
      <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>Joyanta<span style={{ color: "#C4622D" }}>.</span></span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map(link => (
          <Link key={link.href} href={link.href} style={{ color: pathname === link.href ? "#C4622D" : "#6B6560", fontSize: "0.9rem", textDecoration: "none", borderBottom: pathname === link.href ? "1px solid #444444" : "none", paddingBottom: "2px" }}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}