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
    const stage = document.createElement("div");
    stage.className = "mermaid-lightbox__stage";
    stage.innerHTML = svg.outerHTML;
    content.appendChild(stage);

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

  // Light / dark theme variables — mermaid bakes colors into the SVG at render
  // time, so switching theme means re-rendering (see the themechange handler).
  function themeVariables(theme) {
    if (theme === "dark") {
      return {
        background: "#161619",
        fontSize: "14px",
        primaryColor: "#1f2027",
        primaryTextColor: "#ededed",
        primaryBorderColor: "#8b8d94",
        secondaryColor: "#26262b",
        secondaryBorderColor: "#6b7280",
        tertiaryColor: "#1a1a1e",
        tertiaryBorderColor: "#6b7280",
        lineColor: "#8b8d94",
        edgeLabelBackground: "#161619",
        fontFamily: "Inter, sans-serif",
      };
    }
    return {
      background: "#ffffff",
      fontSize: "14px",
      primaryColor: "#ffffff",
      primaryTextColor: "#111827",
      primaryBorderColor: "#475569",
      secondaryColor: "#f8fafc",
      secondaryBorderColor: "#94a3b8",
      tertiaryColor: "#f8fafc",
      tertiaryBorderColor: "#94a3b8",
      lineColor: "#64748b",
      edgeLabelBackground: "#ffffff",
      fontFamily: "Inter, sans-serif",
    };
  }

  function currentTheme() {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark" || attr === "light") return attr;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function wrapViewport(diagram) {
    const svg = diagram.querySelector("svg");
    if (svg && !diagram.querySelector(".mermaid__viewport")) {
      const viewport = document.createElement("div");
      viewport.className = "mermaid__viewport";
      diagram.insertBefore(viewport, svg);
      viewport.appendChild(svg);
    }
  }

  try {
    const { default: mermaid } = await import(
      "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
    );

    // Preserve each diagram's source so it can be re-rendered on theme change.
    const sources = new Map();
    diagrams.forEach((diagram) => sources.set(diagram, diagram.textContent));
    const nodes = Array.from(diagrams);

    async function renderAll(theme) {
      nodes.forEach((diagram) => {
        diagram.removeAttribute("data-processed");
        // Restore the raw source as text (not innerHTML): the source can contain
        // "<", ">" or "&" in labels, which HTML-parsing would corrupt.
        diagram.textContent = sources.get(diagram);
      });
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        htmlLabels: false,
        flowchart: { useMaxWidth: false, curve: "cardinal" },
        themeVariables: themeVariables(theme),
      });
      await mermaid.run({ nodes });
      nodes.forEach(wrapViewport);
    }

    const initialTheme = currentTheme();
    await renderAll(initialTheme);

    // Click / keyboard handlers live on the container, so they survive
    // re-renders (openOverlay reads the current SVG live at click time).
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

    // Re-render diagrams when the theme changes (site.js dispatches "themechange").
    // Coalesce to the latest requested theme and reconcile after each pass, so a
    // rapid toggle — or one that lands mid-render — can't strand the diagrams on a
    // stale theme (a dropped event would leave e.g. dark ink baked on a light box).
    let rendering = false;
    let pendingTheme = null;
    async function syncDiagrams() {
      if (rendering) return;
      rendering = true;
      try {
        while (pendingTheme !== null) {
          const next = pendingTheme;
          pendingTheme = null;
          closeOverlay(); // the lightbox holds a clone of the old-theme SVG
          await renderAll(next);
        }
      } catch (error) {
        console.error("Failed to re-render Mermaid diagrams.", error);
      } finally {
        rendering = false;
      }
    }

    window.addEventListener("themechange", (event) => {
      pendingTheme = (event.detail && event.detail.theme) || currentTheme();
      syncDiagrams();
    });

    // A toggle during the CDN import or the initial render fires before the
    // listener above exists; data-theme is authoritative, so catch up if the
    // active theme moved while we were still setting up.
    if (currentTheme() !== initialTheme) {
      pendingTheme = currentTheme();
      syncDiagrams();
    }
  } catch (error) {
    console.error("Failed to initialize Mermaid diagrams.", error);
  }
});
