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
  imageBlur: 7,
  gradientStart: "#10141f",
  gradientEnd: "#2a3040",
  gradientAngle: 135,
  siteBackground: false,
  hoverOpenPanels: false,
  showRecommended: true,
  showSearch: true,
  showAiMode: true,
  voiceSearch: true,
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
  aiPanelIcon: "✨",
  funPanelName: "•••",
  funPanelIcon: "🎮",
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
      { aiDefaultsRestored: false, weatherLocationCleared: false, legacyStorageCleaned: false },
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
          icon: String(panel && panel.icon ? panel.icon : "📌"),
          sites: Array.isArray(panel && panel.sites) ? panel.sites : []
        }));
      if (typeof items.aiPanelName !== "string" || !items.aiPanelName.trim()) items.aiPanelName = "ИИ";
      if (typeof items.funPanelName !== "string" || !items.funPanelName.trim()) items.funPanelName = "•••";

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
      callback(items);
    }
  );
}

