export default function Projects() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "5rem 2rem" }}>
      <p style={{ color: "#C4622D", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
        Projects
      </p>
      <h1 style={{ fontSize: "2.5rem", lineHeight: 1.1, marginBottom: "3rem" }}>
        Work that makes a measurable difference.
      </h1>

      {[
        { id: "01", title: "Washing Process Water Reduction", category: "Process Optimization", result: "Reduced water consumption by 18% through process parameter optimization." },
        { id: "02", title: "Sludge Utilization Concept", category: "Sustainability R&D", result: "Developed concept for reusing textile dyeing sludge, reducing landfill dependency." },
        { id: "03", title: "Enzyme Washing Optimization", category: "Chemical Process", result: "Cut enzyme cost by 22% while improving bio-wash consistency." },
      ].map((project) => (
        <div key={project.id} style={{ borderTop: "1px solid #444", padding: "2.5rem 0", display: "grid", gridTemplateColumns: "60px 1fr", gap: "2rem" }}>
          <span style={{ fontSize: "2rem", color: "#444" }}>{project.id}</span>
          <div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <h2 style={{ fontSize: "1.3rem" }}>{project.title}</h2>
              <span style={{ background: "#3a2020", color: "#C4622D", padding: "0.2rem 0.75rem", fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                {project.category}
              </span>
            </div>
            <p style={{ color: "#A0A0A0", fontSize: "0.95rem", lineHeight: 1.7 }}>{project.result}</p>
          </div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid #444" }} />
    </div>
  );
}
