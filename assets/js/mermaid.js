document.addEventListener("DOMContentLoaded", async () => {
  const diagrams = document.querySelectorAll(".mermaid");

  if (!diagrams.length) {
    return;
  }

  let activeOverlay = null;

  function closeOverlay() {
    if (!activeOverlay) {
      return;
    }

    document.body.classList.remove("mermaid-lightbox-open");
    activeOverlay.remove();
    activeOverlay = null;
  }

  function openOverlay(sourceDiagram) {
    closeOverlay();

    const svg = sourceDiagram.querySelector("svg");

    if (!svg) {
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "mermaid-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Expanded diagram view");

    const panel = document.createElement("div");
    panel.className = "mermaid-lightbox__panel";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "mermaid-lightbox__close";
    closeButton.setAttribute("aria-label", "Close expanded diagram");
    closeButton.innerHTML = '<span class="sr-only">Close expanded diagram</span>';

    const content = document.createElement("div");
    content.className = "mermaid-lightbox__content";
    content.innerHTML = svg.outerHTML;

    closeButton.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeOverlay();
      }
    });

    panel.appendChild(closeButton);
    panel.appendChild(content);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    document.body.classList.add("mermaid-lightbox-open");

    activeOverlay = overlay;
    closeButton.focus();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
    }
  });

  try {
    const { default: mermaid } = await import(
      "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
    );

    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: false,
      },
      themeVariables: {
        background: "#ffffff",
        primaryColor: "#f7f7f5",
        primaryTextColor: "#111827",
        primaryBorderColor: "#4b5563",
        lineColor: "#6b7280",
        secondaryColor: "#ecfeff",
        tertiaryColor: "#fff7ed",
        fontFamily: "Inter, sans-serif",
      },
    });

    await mermaid.run({
      nodes: diagrams,
    });

    diagrams.forEach((diagram) => {
      diagram.setAttribute("tabindex", "0");
      diagram.setAttribute("role", "button");
      diagram.setAttribute("aria-label", "Open diagram in a larger view");

      diagram.addEventListener("click", () => openOverlay(diagram));
      diagram.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openOverlay(diagram);
        }
      });
    });
  } catch (error) {
    console.error("Failed to initialize Mermaid diagrams.", error);
  }
});
