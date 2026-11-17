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
      return `linear-gradient(${angle}deg, ${start}, ${end})`;
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
      return `linear-gradient(rgba(8, 11, 17, 0.32), rgba(8, 11, 17, 0.32)), url(${JSON.stringify(url)})`;
    }

    return null;
  }

  function apply(settings) {
    const background = backgroundFor(settings);
    if (!background) {
      removeLayer();
      return;
    }

    let layer = document.getElementById(LAYER_ID);
    if (!layer) {
      layer = document.createElement("div");
      layer.id = LAYER_ID;
      document.documentElement.appendChild(layer);
    }
    layer.style.backgroundImage = background;

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
        background-color: transparent !important;
        background-image: none !important;
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

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    const keys = Object.keys(changes);
    if (keys.some((key) => ["siteBackground", "backgroundType", "imageUrl", "imageType", "gradientStart", "gradientEnd", "gradientAngle"].includes(key))) {
      load();
    }
  });
})();
