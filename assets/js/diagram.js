/* Click-to-expand for inline SVG diagrams.

   The diagrams are static SVG in the post source and take their colours from CSS
   custom properties, so there is nothing to render and nothing to redraw when the
   theme changes. All this file adds is the lightbox. */

document.addEventListener("DOMContentLoaded", () => {
  const diagrams = document.querySelectorAll(".diagram");

  if (!diagrams.length) {
    return;
  }

  let activeOverlay = null;
  let lastFocused = null;

  function closeOverlay() {
    if (!activeOverlay) {
      return;
    }

    document.body.classList.remove("diagram-lightbox-open");
    activeOverlay.remove();
    activeOverlay = null;

    // Send focus back where it came from, so keyboard users are not dropped at
    // the top of the document after closing.
    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  }

  function openOverlay(sourceDiagram) {
    closeOverlay();

    const svg = sourceDiagram.querySelector("svg");

    if (!svg) {
      return;
    }

    lastFocused = sourceDiagram;

    const overlay = document.createElement("div");
    overlay.className = "diagram-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Expanded diagram view");

    const panel = document.createElement("div");
    panel.className = "diagram-lightbox__panel";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "diagram-lightbox__close";
    closeButton.setAttribute("aria-label", "Close expanded diagram");

    const content = document.createElement("div");
    content.className = "diagram-lightbox__content";
    const stage = document.createElement("div");
    stage.className = "diagram-lightbox__stage";

    // Clone rather than move, so the original stays in the page. The clone keeps
    // its class hooks, so it themes exactly like the original.
    const clone = svg.cloneNode(true);
    clone.removeAttribute("id");
    stage.appendChild(clone);
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
    document.body.classList.add("diagram-lightbox-open");

    activeOverlay = overlay;
    closeButton.focus();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
    }
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
});
