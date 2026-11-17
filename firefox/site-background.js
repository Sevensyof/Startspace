(() => {
  const LAYER_ID = "startspace-site-background";
  const STYLE_ID = "startspace-site-background-style";
  const GLASS_CLASS = "startspace-glass-card";
  let glassTimer = null;
  let siteBackgroundActive = false;

  function isGooglePage() {
    return location.hostname.replace(/^www\./, "").toLowerCase().includes("google.");
  }

  function isYouTubePage() {
    const host = location.hostname.replace(/^www\./, "").toLowerCase();
    return host === "youtube.com" || host.endsWith(".youtube.com");
  }

  function isYouTubeDark() {
    const root = document.documentElement;
    if (root.hasAttribute("dark") || root.getAttribute("dark") === "true") return true;
    return bodyHasLightText();
  }

  function removeGlassCards() {
    for (const element of document.querySelectorAll("." + GLASS_CLASS)) {
      element.classList.remove(GLASS_CLASS);
    }
    if (glassTimer) {
      clearInterval(glassTimer);
      glassTimer = null;
    }
  }

  function applyGlassCards() {
    if (!siteBackgroundActive || !isGooglePage() || !document.body) return;

    const inputs = document.querySelectorAll("input, textarea");
    for (const input of inputs) {
      const label = `${input.getAttribute("placeholder") || ""} ${input.getAttribute("aria-label") || ""}`.toLowerCase();
      if (!/задайте вопрос|ask a question|ask anything|ask follow-up|спросите/.test(label)) continue;

      let element = input.parentElement;
      for (let depth = 0; element && depth < 8; depth += 1, element = element.parentElement) {
        const rect = element.getBoundingClientRect();
        if (rect.width < 220 || rect.height < 55 || rect.height > 380) continue;
        const style = getComputedStyle(element);
        const hasFill = style.backgroundColor !== "rgba(0, 0, 0, 0)" || style.backgroundImage !== "none";
        if (!hasFill) continue;
        element.classList.add(GLASS_CLASS);
        break;
      }
    }
  }

  function ensureGlassCards() {
    if (!siteBackgroundActive || !isGooglePage()) {
      removeGlassCards();
      return;
    }
    applyGlassCards();
    if (!glassTimer) {
      glassTimer = setInterval(applyGlassCards, 1500);
    }
  }

  function removeLayer() {
    const layer = document.getElementById(LAYER_ID);
    if (layer) layer.remove();
    const style = document.getElementById(STYLE_ID);
    if (style) style.remove();
    siteBackgroundActive = false;
    removeGlassCards();
  }

  function backgroundFor(settings) {
    if (!settings.siteBackground) return null;

    if (settings.backgroundType === "gradient") {
      const angle = Number(settings.gradientAngle) || 135;
      const start = settings.gradientStart || "#10141f";
      const end = settings.gradientEnd || "#2a3040";
      return { image: `linear-gradient(${angle}deg, ${start}, ${end})`, dim: 0, blur: 0 };
    }

    if (settings.backgroundType === "image" && settings.imageUrl && settings.imageType !== "video") {
      let url = settings.imageUrl;
      if (!/^(data:|blob:|https?:)/i.test(url)) {
        try {
          url = chrome.runtime.getURL(url);
        } catch {
          return null;
        }
      }
      const dim = Math.min(0.85, Math.max(0, Number(settings.imageDim) / 100 || 0));
      const blur = Math.min(20, Math.max(0, Number(settings.imageBlur) || 0) / 5);
      return {
        image: `linear-gradient(rgba(0, 0, 0, ${dim}), rgba(0, 0, 0, ${dim})), url(${JSON.stringify(url)})`,
        dim,
        blur
      };
    }

    return null;
  }

  function bodyHasLightText() {
    try {
      const color = getComputedStyle(document.body).color;
      const match = color.match(/rgba?\(([^)]+)\)/);
      if (!match) return true;
      const channels = match[1].split(",").map((value) => Number(value.trim()));
      if (channels.length < 3 || channels.some((value) => Number.isNaN(value))) return true;
      const luma = 0.299 * channels[0] + 0.587 * channels[1] + 0.114 * channels[2];
      return luma > 150;
    } catch {
      return true;
    }
  }

  function apply(settings) {
    const background = backgroundFor(settings);
    if (!background) {
      removeLayer();
      return;
    }

    const youtube = isYouTubePage();
    const darkSurface = youtube ? isYouTubeDark() : bodyHasLightText();
    const darkScrim = youtube ? 0.78 : 0.58;
    siteBackgroundActive = true;
    document.documentElement.style.setProperty(
      "--startspace-site-scrim",
      darkSurface ? `rgba(8, 11, 17, ${darkScrim})` : "rgba(248, 250, 252, 0.7)"
    );
    document.documentElement.style.setProperty(
      "--startspace-glass-bg",
      darkSurface ? "rgba(15, 18, 26, 0.58)" : "rgba(255, 255, 255, 0.62)"
    );
    document.documentElement.style.setProperty(
      "--startspace-glass-border",
      darkSurface ? "rgba(255, 255, 255, 0.14)" : "rgba(15, 20, 28, 0.12)"
    );

    let layer = document.getElementById(LAYER_ID);
    if (!layer) {
      layer = document.createElement("div");
      layer.id = LAYER_ID;
      document.documentElement.appendChild(layer);
    }
    layer.style.backgroundImage = background.image;
    layer.style.filter = background.blur > 0 ? `blur(${background.blur}px)` : "none";
    layer.style.transform = background.blur > 0 ? "scale(1.06)" : "none";

    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.documentElement.appendChild(style);
    }
    style.textContent = `
      #${LAYER_ID} {
        position: fixed;
        inset: 0;
        z-index: -2147483647;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        pointer-events: none;
      }
      html, body {
        background-image: none !important;
      }
      html {
        background-color: transparent !important;
      }
      body {
        min-height: 100vh;
        background-color: var(--startspace-site-scrim, rgba(8, 11, 17, 0.46)) !important;
      }
      ytd-app,
      ytd-page-manager,
      #page-manager,
      #columns,
      #primary,
      #secondary,
      ytd-browse,
      ytd-rich-grid-renderer,
      ytd-rich-section-renderer,
      ytd-rich-shelf-renderer,
      ytd-reel-shelf-renderer,
      ytd-two-column-browse-results-renderer,
      ytd-section-list-renderer,
      ytd-item-section-renderer,
      ytd-rich-grid-row,
      ytd-rich-item-renderer,
      ytd-rich-grid-media,
      ytd-rich-section-renderer #content,
      ytd-rich-section-renderer #contents,
      ytd-rich-shelf-renderer #content,
      ytd-rich-shelf-renderer #contents,
      ytd-reel-shelf-renderer #content,
      ytd-reel-shelf-renderer #contents,
      ytd-horizontal-card-list-renderer,
      ytd-feed-filter-chip-bar-renderer,
      #chips,
      #chips-wrapper,
      ytd-browse #contents,
      ytd-rich-grid-renderer #contents {
        background: transparent !important;
      }
      ytd-masthead {
        background-color: rgba(15, 17, 23, 0.92) !important;
        backdrop-filter: blur(14px);
      }
      .${GLASS_CLASS} {
        background-color: var(--startspace-glass-bg) !important;
        background-image: none !important;
        backdrop-filter: blur(18px) saturate(120%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(120%) !important;
        border: 1px solid var(--startspace-glass-border) !important;
        border-radius: 18px !important;
        box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22) !important;
      }
    `;

    ensureGlassCards();
  }

  function load() {
    chrome.storage.local.get(
      {
        siteBackground: false,
        backgroundType: "image",
        imageUrl: "",
        imageType: "image",
        imageDim: 35,
        imageBlur: 35,
        gradientStart: "#10141f",
        gradientEnd: "#2a3040",
        gradientAngle: 135
      },
      apply
    );
  }

  load();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load, { once: true });
  }
  window.addEventListener("load", load, { once: true });
  setTimeout(load, 1500);

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    const keys = Object.keys(changes);
    if (keys.some((key) => ["siteBackground", "backgroundType", "imageUrl", "imageType", "imageDim", "imageBlur", "gradientStart", "gradientEnd", "gradientAngle"].includes(key))) {
      load();
    }
  });
})();
