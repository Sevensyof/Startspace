const MAX_LINKS = 30;
const MAX_PANEL_SITES = 25;

const DEFAULT_AI_SITES = [
  { name: "ChatGPT", url: "https://chatgpt.com" },
  { name: "Claude", url: "https://claude.ai" },
  { name: "Gemini", url: "https://gemini.google.com" },
  { name: "DeepSeek", url: "https://chat.deepseek.com" },
  { name: "Grok", url: "https://grok.com" },
  { name: "Copilot", url: "https://copilot.microsoft.com" },
  { name: "Perplexity", url: "https://www.perplexity.ai" },
  { name: "Qwen", url: "https://chat.qwen.ai" },
  { name: "Mistral", url: "https://chat.mistral.ai" },
  { name: "GigaChat", url: "https://giga.chat" }
];

const DEFAULT_FUN_SITES = [
  { name: "Twitch", url: "https://www.twitch.tv" },
  { name: "TikTok", url: "https://www.tiktok.com" },
  { name: "VK", url: "https://vk.com" },
  { name: "Instagram", url: "https://www.instagram.com" },
  { name: "YouTube", url: "https://www.youtube.com" }
];

const PANEL_ICONS = [
  { id: "spark", name: "ИИ", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2l1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-1.8z"/></svg>' },
  { id: "robot", name: "Робот", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="6" width="16" height="13" rx="3"/><path d="M12 6V3M8 11h.01M16 11h.01M8 15h8"/></svg>' },
  { id: "chat", name: "Чат", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4z"/></svg>' },
  { id: "mail", name: "Почта", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>' },
  { id: "globe", name: "Интернет", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="3.4" ry="8"/><path d="M4 12h16"/></svg>' },
  { id: "search", name: "Поиск", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>' },
  { id: "bookmark", name: "Закладка", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>' },
  { id: "star", name: "Избранное", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/></svg>' },
  { id: "game", name: "Игры", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2.5" y="7.5" width="19" height="9" rx="4.5"/><path d="M7 10v4M5 12h4M16 11h.01M18.5 13h.01"/></svg>' },
  { id: "music", name: "Музыка", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>' },
  { id: "video", name: "Видео", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/></svg>' },
  { id: "book", name: "Книги", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v18H5.5A2.5 2.5 0 0 1 3 18.5z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v18h5.5a2.5 2.5 0 0 0 2.5-2.5z"/></svg>' },
  { id: "news", name: "Новости", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>' },
  { id: "code", name: "Код", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16"/></svg>' },
  { id: "tools", name: "Инструменты", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l3-3 3 3-2 2 2 2 2-2 3 3-3 3-3-3-7 7a2 2 0 0 1-3-3l7-7-2-2z"/></svg>' },
  { id: "grid", name: "Сетка", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><rect x="14" y="14" width="6" height="6" rx="1.2"/></svg>' },
  { id: "shopping", name: "Покупки", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M5 8h14l1 12H4z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' },
  { id: "home", name: "Дом", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>' },
  { id: "work", name: "Работа", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/></svg>' },
  { id: "calendar", name: "Календарь", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>' },
  { id: "notes", name: "Заметки", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M9 12h6M9 16h6"/></svg>' },
  { id: "folder", name: "Файлы", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' },
  { id: "cloud", name: "Облако", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.6 1.5A3.5 3.5 0 0 1 18 18z"/></svg>' },
  { id: "download", name: "Загрузки", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v11M8 11l4 4 4-4M5 20h14"/></svg>' },
  { id: "link", name: "Ссылка", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10 13a4 4 0 0 0 5.7.3l2.3-2.3a4 4 0 0 0-5.7-5.7L11 6.6"/><path d="M14 11a4 4 0 0 0-5.7-.3L6 13a4 4 0 0 0 5.7 5.7l1.3-1.3"/></svg>' },
  { id: "map", name: "Карта", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' },
  { id: "card", name: "Финансы", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/></svg>' },
  { id: "users", name: "Люди", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.5M18 14.5a6 6 0 0 1 3.5 5.5"/></svg>' },
  { id: "camera", name: "Фото", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="2.5" y="6.5" width="19" height="13" rx="2"/><path d="M8 6.5l1.5-2.5h5L16 6.5"/><circle cx="12" cy="13" r="4"/></svg>' },
  { id: "education", name: "Учёба", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M2.5 9L12 4l9.5 5L12 14z"/><path d="M6 11v5c0 1.5 2.7 2.5 6 2.5s6-1 6-2.5v-5"/><path d="M21.5 9v6"/></svg>' },
  { id: "health", name: "Здоровье", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-5 3 10 2-5h7"/></svg>' },
  { id: "travel", name: "Поездки", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M8 12v4M16 12v4"/></svg>' },
  { id: "settings", name: "Настройки", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h6M14 6h6M4 12h10M18 12h2M4 18h3M11 18h9"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="9" cy="18" r="2"/></svg>' }
];

const PANEL_ICON_ALIASES = {
  "✨": "spark",
  "🤖": "robot",
  "💬": "chat",
  "🌐": "globe",
  "🔎": "search",
  "🎮": "game",
  "🎵": "music",
  "📺": "video",
  "📚": "book",
  "⭐": "star",
  "📌": "bookmark",
  "🚀": "spark",
  "🛠": "tools"
};

function normalizePanelIcon(value, fallback) {
  const key = PANEL_ICON_ALIASES[value] || value;
  return PANEL_ICONS.some((icon) => icon.id === key) ? key : fallback || "spark";
}

function panelIconSvg(id, fallback) {
  const key = normalizePanelIcon(id, fallback);
  const icon = PANEL_ICONS.find((item) => item.id === key) || PANEL_ICONS[0];
  return icon.svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
}

function panelIconNode(id, fallback) {
  const parsed = new DOMParser().parseFromString(panelIconSvg(id, fallback), "image/svg+xml");
  const svg = parsed.documentElement;
  return svg && svg.nodeName.toLowerCase() === "svg" ? document.importNode(svg, true) : null;
}
const DEFAULT_SETTINGS = {
  showClock: true,
  clock24h: true,
  showSeconds: true,
  showDate: true,
  clockOpacity: 100,
  clockWeight: 300,
  backgroundType: "image",
  color: "#383838",
  accentColor: "#080808",
  uiTextColor: "#e6e9ef",
  imageUrl: "media/default-bg.jpg",
  imageType: "image",
  imageDim: 35,
  imageBlur: 35,
  gradientStart: "#10141f",
  gradientEnd: "#2a3040",
  gradientAngle: 135,
  siteBackground: false,
  saveBgHistory: true,
  hoverOpenPanels: false,
  showRecommended: true,
  showSearch: true,
  showAiMode: false,
  voiceSearch: false,
  searchEngine: "google",
  showLinks: true,
  linkShape: "square",
  links: [],
  showWeather: false,
  weatherCity: "",
  weatherLat: null,
  weatherLon: null,
  showCurrency: false,
  widgetTransparency: 0,
  aiPanelName: "ИИ",
  aiPanelIcon: "spark",
  aiPanelHidden: false,
  funPanelName: "•••",
  funPanelIcon: "game",
  funPanelHidden: false,
  customPanels: [],
  aiSites: DEFAULT_AI_SITES,
  funSites: DEFAULT_FUN_SITES
};

const SEARCH_ENGINES = {
  google: { name: "Google", url: "https://www.google.com/search?q=" },
  yandex: { name: "Яндекс", url: "https://yandex.ru/search/?text=" },
  duckduckgo: { name: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
  bing: { name: "Bing", url: "https://www.bing.com/search?q=" }
};

const SITE_NAMES = {
  "google.com": "Google",
  "youtube.com": "YouTube",
  "music.youtube.com": "YouTube Music",
  "youtu.be": "YouTube",
  "gmail.com": "Gmail",
  "mail.google.com": "Gmail",
  "drive.google.com": "Google Drive",
  "gemini.google.com": "Gemini",
  "yandex.ru": "Яндекс",
  "ya.ru": "Яндекс",
  "mail.yandex.ru": "Яндекс Почта",
  "disk.yandex.ru": "Яндекс Диск",
  "market.yandex.ru": "Яндекс Маркет",
  "vk.com": "ВКонтакте",
  "ok.ru": "Одноклассники",
  "mail.ru": "Mail.ru",
  "avito.ru": "Авито",
  "ozon.ru": "Ozon",
  "wildberries.ru": "Wildberries",
  "sberbank.ru": "СберБанк",
  "online.sberbank.ru": "СберБанк Онлайн",
  "tbank.ru": "Т-Банк",
  "tinkoff.ru": "Т-Банк",
  "gosuslugi.ru": "Госуслуги",
  "kinopoisk.ru": "Кинопоиск",
  "rutube.ru": "RUTUBE",
  "dzen.ru": "Дзен",
  "habr.com": "Хабр",
  "pikabu.ru": "Пикабу",
  "pinterest.com": "Pinterest",
  "t.me": "Telegram",
  "telegram.org": "Telegram",
  "web.telegram.org": "Telegram Web",
  "discord.com": "Discord",
  "whatsapp.com": "WhatsApp",
  "instagram.com": "Instagram",
  "facebook.com": "Facebook",
  "x.com": "X",
  "twitter.com": "X",
  "tiktok.com": "TikTok",
  "twitch.tv": "Twitch",
  "netflix.com": "Netflix",
  "spotify.com": "Spotify",
  "wikipedia.org": "Википедия",
  "github.com": "GitHub",
  "gitlab.com": "GitLab",
  "stackoverflow.com": "Stack Overflow",
  "reddit.com": "Reddit",
  "linkedin.com": "LinkedIn",
  "chatgpt.com": "ChatGPT",
  "openai.com": "OpenAI",
  "claude.ai": "Claude",
  "deepseek.com": "DeepSeek",
  "chat.deepseek.com": "DeepSeek",
  "perplexity.ai": "Perplexity",
  "copilot.microsoft.com": "Copilot",
  "microsoft.com": "Microsoft",
  "apple.com": "Apple",
  "amazon.com": "Amazon",
  "ebay.com": "eBay",
  "aliexpress.ru": "AliExpress",
  "aliexpress.com": "AliExpress",
  "steampowered.com": "Steam",
  "store.steampowered.com": "Steam",
  "epicgames.com": "Epic Games",
  "adobe.com": "Adobe",
  "figma.com": "Figma",
  "notion.so": "Notion",
  "grok.com": "Grok",
  "giga.chat": "GigaChat",
  "qwen.ai": "Qwen",
  "chat.qwen.ai": "Qwen",
  "mistral.ai": "Mistral",
  "chat.mistral.ai": "Mistral",
  "paypal.com": "PayPal",
  "zoom.us": "Zoom"
};

function siteNameFor(hostname) {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  let match = "";
  for (const domain of Object.keys(SITE_NAMES)) {
    if ((host === domain || host.endsWith("." + domain)) && domain.length > match.length) {
      match = domain;
    }
  }
  if (match) return SITE_NAMES[match];

  const labels = host.split(".").filter(Boolean);
  if (labels.length <= 1) {
    return host.charAt(0).toUpperCase() + host.slice(1);
  }

  let index = labels.length - 2;
  const tld = labels[labels.length - 1];
  if (
    labels.length >= 3 &&
    tld.length === 2 &&
    ["co", "com", "net", "org", "ac", "gov"].includes(labels[index])
  ) {
    index -= 1;
  }

  const name = labels[Math.max(0, index)];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function cloneDefaults() {
  return {
    ...DEFAULT_SETTINGS,
    links: DEFAULT_SETTINGS.links.map((item) => ({ ...item })),
    customPanels: DEFAULT_SETTINGS.customPanels.map((panel) => ({
      ...panel,
      sites: Array.isArray(panel.sites) ? panel.sites.map((site) => ({ ...site })) : []
    })),
    aiSites: DEFAULT_AI_SITES.map((site) => ({ ...site })),
    funSites: DEFAULT_FUN_SITES.map((site) => ({ ...site }))
  };
}

function loadSettings(callback) {
  chrome.storage.local.get(
    Object.assign(
      { aiDefaultsRestored: false, weatherLocationCleared: false, legacyStorageCleaned: false, backgroundBlurPercentMigrated: false },
      DEFAULT_SETTINGS
    ),
    (items) => {
      if (!Array.isArray(items.links)) items.links = [];
      if (Object.prototype.hasOwnProperty.call(items, "favorites")) {
        chrome.storage.local.remove("favorites");
        delete items.favorites;
      }
      if (!Array.isArray(items.aiSites)) items.aiSites = [];
      if (!Array.isArray(items.funSites)) items.funSites = DEFAULT_FUN_SITES.map((site) => ({ ...site }));
      if (!Array.isArray(items.customPanels)) items.customPanels = [];
      items.customPanels = items.customPanels
        .slice(0, 5)
        .map((panel, index) => ({
          id: String(panel && panel.id ? panel.id : "panel" + (index + 1)),
          name: String(panel && panel.name ? panel.name : "Панель"),
          icon: normalizePanelIcon(panel.icon, "grid"),
          sites: Array.isArray(panel && panel.sites) ? panel.sites : []
        }));
      items.aiPanelIcon = normalizePanelIcon(items.aiPanelIcon, "spark");
      items.funPanelIcon = normalizePanelIcon(items.funPanelIcon, "game");
      if (typeof items.aiPanelName !== "string" || !items.aiPanelName.trim()) items.aiPanelName = "ИИ";
      if (typeof items.funPanelName !== "string" || !items.funPanelName.trim()) items.funPanelName = "•••";

      if (!items.backgroundBlurPercentMigrated) {
        const previousBlur = Number(items.imageBlur);
        if (Number.isFinite(previousBlur) && previousBlur <= 20) {
          items.imageBlur = Math.min(100, Math.round(previousBlur * 5));
        }
        items.backgroundBlurPercentMigrated = true;
        chrome.storage.local.set({
          imageBlur: items.imageBlur,
          backgroundBlurPercentMigrated: true
        });
      }

      if (!items.legacyStorageCleaned) {
        const legacyKeys = [
          "profiles",
          "activeProfile",
          "accentMode",
          "showGreeting",
          "linkIconStyle",
          "linkIconTint",
          "linkIconTransparency",
          "gradient"
        ];
        chrome.storage.local.remove(legacyKeys);
        chrome.storage.local.set({ legacyStorageCleaned: true });
        for (const key of legacyKeys) delete items[key];
      }

      if (!items.weatherLocationCleared) {
        if (items.weatherCity === "Ярославль, Россия") {
          items.weatherCity = "";
          items.weatherLat = null;
          items.weatherLon = null;
          items.showWeather = false;
          chrome.storage.local.set({
            weatherCity: "",
            weatherLat: null,
            weatherLon: null,
            showWeather: false
          });
        }
        chrome.storage.local.set({ weatherLocationCleared: true });
      }

      if (!items.aiDefaultsRestored) {
        const normalized = (value) => String(value || "").trim().toLowerCase().replace(/\/+$/, "");
        const restoredSites = DEFAULT_AI_SITES.map((site) => ({ ...site }));
        const seen = new Set(restoredSites.map((site) => normalized(site.url)));

        for (const site of items.aiSites) {
          if (!site || !site.url) continue;
          const key = normalized(site.url);
          if (seen.has(key)) continue;
          seen.add(key);
          restoredSites.push({ name: site.name || site.url, url: site.url });
        }

        items.aiSites = restoredSites.slice(0, MAX_PANEL_SITES);
        items.aiDefaultsRestored = true;
        chrome.storage.local.set({ aiSites: items.aiSites, aiDefaultsRestored: true });
      }

      delete items.aiDefaultsRestored;
      delete items.weatherLocationCleared;
      delete items.legacyStorageCleaned;
      delete items.backgroundBlurPercentMigrated;
      callback(items);
    }
  );
}

