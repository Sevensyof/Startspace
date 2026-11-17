(() => {
  const LAYER_ID = "startspace-site-background";
  const STYLE_ID = "startspace-site-background-style";

  function removeLayer() {
    const layer = document.getElementById(LAYER_ID);
    if (layer) layer.remove();
    const style = document.getElementById(STYLE_ID);
    if (style) style.remove();
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
      const blur = Math.max(0, Number(settings.imageBlur) || 0);
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

    const lightText = bodyHasLightText();
    document.documentElement.style.setProperty(
      "--startspace-site-scrim",
      lightText ? "rgba(8, 11, 17, 0.58)" : "rgba(248, 250, 252, 0.7)"
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
      #secondary {
        background: transparent !important;
      }
      ytd-masthead {
        background-color: rgba(15, 17, 23, 0.84) !important;
        backdrop-filter: blur(14px);
      }
    `;
  }

  function load() {
    chrome.storage.local.get(
      {
        siteBackground: false,
        backgroundType: "image",
        imageUrl: "",
        imageType: "image",
        imageDim: 35,
        imageBlur: 7,
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
