"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

function WashedDenimCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number, t = 0, last = 0;
    function resize() { if (!canvas) return; canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
    function draw(time: number) {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = "#0d1117"; ctx.fillRect(0, 0, W, H);
      const tw = 12, cols = Math.ceil(W/tw)+2, rows = Math.ceil(H/tw)+2;
      const sx = (time*0.6)%tw, sy = (time*0.25)%tw;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c*tw-sx, y = r*tw-sy;
          const twill = (c + r*2 + Math.floor(time*0.04)) % 4;
          const fade = 0.55 + 0.25*Math.sin(c*0.3+r*0.15+time*0.02);
          const washed = 0.7 + 0.3*Math.sin(c*0.7+time*0.015);
          if (twill !== 0) {
            const base = Math.floor(20+25*fade*washed);
            const blue = Math.floor(50+60*fade*washed);
            ctx.fillStyle = `rgb(${base},${base+8},${blue})`;
          } else {
            const wb = Math.floor(100+50*fade);
            ctx.fillStyle = `rgb(${wb},${wb},${wb+8})`;
          }
          ctx.fillRect(x, y, tw-1, tw-1);
        }
      }
      for (let i = 0; i < 5; i++) {
        const px = ((i*200+time*0.5)%(W+300))-150;
        const py = H*(0.2+(i%3)*0.3);
        const g = ctx.createRadialGradient(px,py,0,px,py,100+i*30);
        g.addColorStop(0,"rgba(196,98,45,0.07)"); g.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
      }
      ctx.strokeStyle="rgba(196,98,45,0.05)"; ctx.lineWidth=1.5;
      for (let i = -20; i < (W+H)/20; i++) {
        const off = (time*0.4)%24;
        ctx.beginPath(); ctx.moveTo(i*24-H+off,0); ctx.lineTo(i*24+off,H); ctx.stroke();
      }
      const vig = ctx.createRadialGradient(W/2,H/2,H*0.1,W/2,H/2,H*0.9);
      vig.addColorStop(0,"rgba(0,0,0,0)"); vig.addColorStop(1,"rgba(0,0,0,0.75)");
      ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);
    }
    function loop(ts: number) { const dt=ts-last; last=ts; t+=dt*0.01; draw(t); animId=requestAnimationFrame(loop); }
    resize(); window.addEventListener("resize",resize); animId=requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block" }} />;
}

function SkillWheel({ icon, value, label, sub, pct }: { icon: string; value: string; label: string; sub: string; pct: number }) {
  const size = 90, stroke = 8;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.6rem" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#333" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#C4622D" strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ/4} strokeLinecap="round" />
        <text x={size/2} y={size/2-4} textAnchor="middle" fill="#F0EDE8" fontSize={13} fontFamily="sans-serif">{icon}</text>
        <text x={size/2} y={size/2+10} textAnchor="middle" fill="#C4622D" fontSize={10} fontFamily="sans-serif" fontWeight="500">{value}</text>
      </svg>
      <span style={{ fontSize:"0.8rem", color:"#C4622D", textAlign:"center", fontWeight:500 }}>{label}</span>
      <span style={{ fontSize:"0.75rem", color:"#A0A0A0", textAlign:"center", lineHeight:1.4 }}>{sub}</span>
    </div>
  );
}
export default function Home() {
  const achievements = [
    { icon: "💧", value: "10%", label: "Water Reduced", sub: "Pacific Jeans", pct: 70 },
    { icon: "🧪", value: "5 yrs", label: "Industry Experience", sub: "Wet Processing", pct: 100 },
    { icon: "👕", value: "10+", label: "Global Brands Served", sub: "Uniqlo, Zara & more", pct: 100 },
    { icon: "⚗️", value: "3", label: "Effectiveness of Bleaching Agents", sub: "Research Paper", pct: 60 },
    { icon: "♻️", value: "R&D", label: "Sustainability Focus", sub: "ETP Based and Eco Auxiliaries", pct: 70 },
    { icon: "🔬", value: "Wash Tech", label: "Optimised Process", sub: "Enzyme, Stone, Bleach, Garment-Dyeing", pct: 90 },
  ];

  const clients = [
    "uniqlo", "calvinklein", "gu", "mustang",
    "riverisland", "kontoor", "zara", "canda", "jcrew", "tesco",
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ position:"relative", minHeight:"90vh", display:"flex", alignItems:"center", overflow:"hidden" }}>
        <div style={{
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/denim-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.45)",
}} />
        <div style={{ position:"relative", zIndex:1, maxWidth:1100, margin:"0 auto", padding:"5rem 2rem" }}>
          <p style={{ fontSize:"0.8125rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#C4622D", marginBottom:"1.5rem", fontWeight:500 }}>
            Textile Chemical Engineer
          </p>
          <h1 style={{ fontSize:"clamp(3rem, 7vw, 5rem)", lineHeight:1.05, color:"#F0EDE8", marginBottom:"2rem", maxWidth:800, textShadow:"0 2px 30px rgba(0,0,0,0.5)" }}>
            Meet an Expert in Wash Technology
          </h1>
          <p style={{ fontSize:"1.125rem", color:"rgba(240,237,232,0.7)", maxWidth:520, marginBottom:"3rem", lineHeight:1.8 }}>
            Specializing in wash technology, process optimization &amp; sustainable textile solutions at Pacific Jeans.
          </p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <Link href="/projects" style={{ background:"#C4622D", color:"white", padding:"0.875rem 2rem", fontSize:"0.9rem", display:"inline-block" }}>
              View Projects →
            </Link>
            <Link href="/contact" style={{ border:"1px solid rgba(196,98,45,0.4)", color:"rgba(240,237,232,0.85)", padding:"0.875rem 2rem", fontSize:"0.9rem", display:"inline-block" }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Achievement Dashboard */}
      <section style={{ background:"#111820", padding:"4rem 2rem", borderTop:"1px solid rgba(196,98,45,0.15)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#666", marginBottom:"2.5rem" }}>
            Career Achievements
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:"2rem" }}>
            {achievements.map((a) => (
              <SkillWheel key={a.label} {...a} />
            ))}
          </div>
        </div>
      </section>

{/* Client Logos */}
      <section style={{ background:"#1A1A1A", padding:"3rem 2rem", borderTop:"1px solid rgba(196,98,45,0.15)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#ffffff", marginBottom:"2rem", textAlign:"center" }}>
            Brands I&apos;ve Served
          </p>
          <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap", alignItems:"center", justifyContent:"center" }}>
           {clients.map((client) => (
              <div key={client} style={{ background:"#ffff", border:"1px solid #E2DDD7(255,255,255,0.08)", padding:"0.75rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"center", minWidth:110, minHeight:55 }}>
                <img
                  src={`/logos/${client}.png`}
                  alt={client}
                  style={{ maxHeight:32, maxWidth:90, objectFit:"contain", filter:"grayscale(100%)" }}
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    if (t.parentElement) t.parentElement.innerHTML = `<span style="color:#555;font-size:0.7rem;font-family:sans-serif;letter-spacing:0.06em;text-transform:uppercase">${client}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section style={{ background:"#2B2B2B", padding:"4rem 2rem", borderTop:"1px solid rgba(196,98,45,0.1)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#666", marginBottom:"2rem" }}>
            What I Do
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"2rem" }}>
            {[
              { title:"Wash Technology", desc:"Enzyme, stone, bleach & normal wash — parameters, chemistry and troubleshooting.", link:"/wash" },
              { title:"Garment Dyeing & Bio-Wash", desc:"Reactive, Direct, Pigment & Dischargable dye systems. Colour fastness optimization & Reduce Variation." },
              { title:"Sustainability R&D", desc:"Effluent control, water reduction and eco-friendly auxiliary research." },
              { title:"Process Analysis", desc:"Data-driven optimization of washing and dyeing line parameters." },
            ].map((s: { title: string; desc: string; link?: string }) => (
              <div
                key={s.title}
                onClick={() => s.link && (window.location.href = s.link)}
                style={{ borderTop:"2px solid #C4622D", paddingTop:"1.25rem", cursor: s.link ? "pointer" : "default" }}
              >
                <h3 style={{ fontSize:"1rem", marginBottom:"0.5rem", color:"#E8E3DC" }}>{s.title}</h3>
                <p style={{ fontSize:"0.875rem", color:"#A0A0A0", lineHeight:1.6 }}>{s.desc}</p>
                {s.link && <p style={{ marginTop:"0.5rem", fontSize:"0.75rem", color:"#C4622D", letterSpacing:"0.04em" }}>Learn more →</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ background:"#111820", padding:"4rem 2rem", borderTop:"1px solid rgba(196,98,45,0.1)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#666", marginBottom:"2rem" }}>
            Services & Tools
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"1.25rem" }}>
            {[
              { title:"R&D Consultation", desc:"Lab-backed research into new chemical processes and auxiliaries.", icon:"⬡", link:null },
              { title:"Chemical Cost Reduction", desc:"Systematic audit of chemical usage — identifying overdosing and substitution.", icon:"◈", link:null },
              { title:"Process Optimization", desc:"End-to-end analysis of washing and dyeing lines to reduce time, water and rework.", icon:"◎", link:null },
              { title:"Textile Calculator", desc:"Interactive washing parameter tool — fabric type, GSM, process, enzyme dosage.", icon:"◇", link:"/calculator" },
            ].map((s) => (
              <div
                key={s.title}
                style={{ background:"rgba(196,98,45,0.05)", border:"1px solid rgba(196,98,45,0.15)", padding:"1.75rem", cursor:s.link ? "pointer" : "default" }}
                onClick={() => s.link && (window.location.href = s.link)}
              >
                <span style={{ fontSize:"1.4rem", display:"block", marginBottom:"1rem", color:"#C4622D" }}>{s.icon}</span>
                <h3 style={{ fontSize:"1rem", color:"#F0EDE8", marginBottom:"0.75rem", fontFamily:"Georgia,serif" }}>{s.title}</h3>
                <p style={{ fontSize:"0.85rem", color:"rgba(220,215,205,0.6)", lineHeight:1.7 }}>{s.desc}</p>
                {s.link && <p style={{ marginTop:"1rem", fontSize:"0.8rem", color:"#C4622D" }}>Try it →</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}