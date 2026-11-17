const $ = (id) => document.getElementById(id);

if (new URLSearchParams(location.search).get("embed") === "1") {
  document.body.classList.add("embedded");
}

let settings = cloneDefaults();
let dirty = false;

function setDirty(value) {
  dirty = value;
  const status = $("save-status");
  const button = $("save-settings");
  if (status) {
    status.textContent = value ? "Есть изменения" : "Сохранено";
    status.classList.toggle("unsaved", value);
    status.classList.add("visible");
  }
  if (button) button.disabled = !value;
}

function saveSettings() {
  chrome.storage.local.set(Object.assign({}, settings, { bgHistory }));
  setDirty(false);
}

function update(patch) {
  Object.assign(settings, patch);
  setDirty(true);
}

window.startspaceSettings = {
  isDirty: () => dirty,
  save: saveSettings
};

let bgHistory = [];

function addBgHistory(dataUrl) {
  bgHistory = [dataUrl, ...bgHistory.filter((item) => item !== dataUrl)].slice(0, 8);
  setDirty(true);
  renderBgHistory();
}

const RECOMMENDED_WALLPAPERS = [
  "media/recommended/bg1.jpg",
  "media/recommended/bg2.jpg",
  "media/recommended/bg3.jpg"
];

function renderRecommended() {
  const wrap = $("recommended-bg");
  if (!wrap) return;
  wrap.textContent = "";

  for (const url of RECOMMENDED_WALLPAPERS) {
    const thumb = document.createElement("div");
    thumb.className = "bg-thumb" + (settings.imageUrl === url ? " active" : "");
    thumb.style.backgroundImage = `url(${JSON.stringify(url)})`;
    thumb.title = "Применить фон";
    thumb.addEventListener("click", () => {
      update({ imageUrl: url, imageType: "image", backgroundType: "image" });
      render();
    });
    wrap.appendChild(thumb);
  }
}

function renderBgHistory() {
  const wrap = $("bg-history");
  if (!wrap) return;
  wrap.textContent = "";

  if (bgHistory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Пока нет загруженных фонов.";
    wrap.appendChild(empty);
    return;
  }

  bgHistory.forEach((url, index) => {
    const thumb = document.createElement("div");
    thumb.className = "bg-thumb" + (settings.imageUrl === url ? " active" : "");
    thumb.style.backgroundImage = `url(${JSON.stringify(url)})`;
    thumb.title = "Применить фон";
    thumb.addEventListener("click", () => {
      update({ imageUrl: url, imageType: "image", backgroundType: "image" });
      render();
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "bg-thumb-remove";
    remove.textContent = "✕";
    remove.title = "Удалить из истории";
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      bgHistory.splice(index, 1);
      setDirty(true);
      renderBgHistory();
    });

    thumb.appendChild(remove);
    wrap.appendChild(thumb);
  });
}

function titleFromUrl(value) {
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : "https://" + value);
    return siteNameFor(url.hostname);
  } catch {
    return "";
  }
}

function renderLinks() {
  const list = $("links-list");
  list.textContent = "";

  $("links-count").textContent =
    "Использовано " + settings.links.length + " из " + MAX_LINKS;
  $("add-link").disabled = settings.links.length >= MAX_LINKS;

  settings.links.forEach((link, index) => {
    const row = document.createElement("div");
    row.className = "link-row";

    const title = document.createElement("input");
    title.type = "text";
    title.placeholder = "Название";
    title.value = link.title || "";
    title.addEventListener("input", () => {
      settings.links[index].title = title.value;
      update({ links: settings.links });
    });

    const url = document.createElement("input");
    url.type = "text";
    url.placeholder = "example.com";
    url.value = link.url || "";
    url.addEventListener("input", () => {
      settings.links[index].url = url.value;
      update({ links: settings.links });
    });
    url.addEventListener("change", () => {
      if (title.value.trim()) return;
      const auto = titleFromUrl(url.value.trim());
      if (!auto) return;
      title.value = auto;
      settings.links[index].title = auto;
      update({ links: settings.links });
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn ghost small";
    remove.textContent = "✕";
    remove.title = "Удалить ссылку";
    remove.addEventListener("click", () => {
      settings.links.splice(index, 1);
      update({ links: settings.links });
      renderLinks();
    });

    const iconBtn = document.createElement("button");
    iconBtn.type = "button";
    iconBtn.className = "btn ghost small icon-btn" + (link.icon ? " has-icon" : "");
    iconBtn.title = link.icon ? "Заменить иконку" : "Добавить иконку";
    if (link.icon) {
      iconBtn.style.backgroundImage = `url(${JSON.stringify(link.icon)})`;
    } else {
      iconBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="9.5" r="1.6"/><path d="m5 17.5 4.5-4.5 3.5 3.5 2-2 4 3.5"/></svg>';
    }

    const iconFile = document.createElement("input");
    iconFile.type = "file";
    iconFile.accept = "image/*";
    iconFile.className = "hidden";
    iconFile.addEventListener("change", () => {
      const file = iconFile.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Выберите файл изображения.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл больше 5 МБ — выберите картинку поменьше.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        settings.links[index].icon = reader.result;
        update({ links: settings.links });
        renderLinks();
      };
      reader.readAsDataURL(file);
      iconFile.value = "";
    });
    iconBtn.addEventListener("click", () => iconFile.click());

    row.append(title, url, iconBtn, iconFile);

    if (link.icon) {
      const resetIcon = document.createElement("button");
      resetIcon.type = "button";
      resetIcon.className = "btn ghost small";
      resetIcon.textContent = "↺";
      resetIcon.title = "Сбросить иконку";
      resetIcon.addEventListener("click", () => {
        delete settings.links[index].icon;
        update({ links: settings.links });
        renderLinks();
      });
      row.append(resetIcon);
    }

    row.append(remove);
    list.appendChild(row);
  });
}

function hexToRgb(hex) {
  let value = hex.replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const r = parseInt(value.slice(0, 2), 16) || 0;
  const g = parseInt(value.slice(2, 4), 16) || 0;
  const b = parseInt(value.slice(4, 6), 16) || 0;
  return [r, g, b];
}

function shadeColor(hex, amount) {
  const adjust = (channel) => Math.max(0, Math.min(255, Math.round(channel + amount)));
  return (
    "#" +
    hexToRgb(hex)
      .map((channel) => adjust(channel).toString(16).padStart(2, "0"))
      .join("")
  );
}

function applyAccent() {
  const base = settings.accentColor || "#4f46e5";
  const [r, g, b] = hexToRgb(base);

  document.documentElement.style.setProperty("--accent", base);
  document.documentElement.style.setProperty("--accent-hover", shadeColor(base, -18));
  document.documentElement.style.setProperty("--accent-soft", `rgba(${r}, ${g}, ${b}, 0.16)`);

  $("accent-color").value = base;
  $("accent-swatch").style.background = base;
}

function applyTextColor() {
  const base = settings.uiTextColor || "#e6e9ef";
  document.documentElement.style.setProperty("--ui-text", base);
  $("text-color").value = base;
  $("text-swatch").style.background = base;
}

function fillIconSelect(select, value) {
  const current = normalizePanelIcon(value, "grid");
  select.textContent = "";
  for (const icon of PANEL_ICONS) {
    const option = document.createElement("option");
    option.value = icon.id;
    option.textContent = icon.name;
    select.appendChild(option);
  }
  select.value = current;
}

function setIconPreview(preview, id) {
  if (!preview) return;
  preview.textContent = "";
  const node = panelIconNode(id, "grid");
  if (node) preview.appendChild(node);
}

function renderCustomPanelsEditor() {
  const wrap = $("custom-panels-editor");
  if (!wrap) return;
  wrap.textContent = "";

  settings.customPanels.forEach((panel, index) => {
    const row = document.createElement("div");
    row.className = "custom-panel-row";

    const select = document.createElement("select");
    fillIconSelect(select, panel.icon || "grid");
    const preview = document.createElement("span");
    preview.className = "panel-icon-preview";
    setIconPreview(preview, panel.icon || "grid");
    select.addEventListener("change", () => {
      panel.icon = select.value;
      setIconPreview(preview, select.value);
      update({ customPanels: settings.customPanels });
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "btn ghost small";
    remove.textContent = "✕";
    remove.title = "Удалить панель";
    remove.addEventListener("click", () => {
      settings.customPanels.splice(index, 1);
      update({ customPanels: settings.customPanels });
      renderCustomPanelsEditor();
    });

    row.append(select, preview, remove);
    wrap.appendChild(row);
  });
}

function render() {
  $("show-clock").checked = settings.showClock;
  $("clock-24h").checked = settings.clock24h;
  $("show-seconds").checked = settings.showSeconds;
  $("show-date").checked = settings.showDate;

  $("show-search").checked = settings.showSearch;
  $("voice-search").checked = settings.voiceSearch;
  $("show-ai-mode").checked = settings.showAiMode !== false;
  $("site-background").checked = Boolean(settings.siteBackground);
  $("search-engine").value = settings.searchEngine;
  fillIconSelect($("ai-panel-icon"), settings.aiPanelIcon);
  fillIconSelect($("fun-panel-icon"), settings.funPanelIcon);
  setIconPreview($("ai-panel-icon-preview"), $("ai-panel-icon").value);
  setIconPreview($("fun-panel-icon-preview"), $("fun-panel-icon").value);
  $("ai-panel-remove").textContent = settings.aiPanelHidden ? "↺" : "✕";
  $("ai-panel-remove").title = settings.aiPanelHidden ? "Вернуть панель" : "Убрать панель";
  $("fun-panel-remove").textContent = settings.funPanelHidden ? "↺" : "✕";
  $("fun-panel-remove").title = settings.funPanelHidden ? "Вернуть панель" : "Убрать панель";
  $("ai-panel-field").classList.toggle("panel-field-disabled", Boolean(settings.aiPanelHidden));
  $("fun-panel-field").classList.toggle("panel-field-disabled", Boolean(settings.funPanelHidden));
  $("hover-open-panels").checked = Boolean(settings.hoverOpenPanels);

  $("show-links").checked = settings.showLinks;
  document.querySelectorAll("#link-shape button").forEach((button) => {
    button.classList.toggle("active", button.dataset.value === settings.linkShape);
  });

  $("show-weather").checked = settings.showWeather;
  $("weather-city").value = settings.weatherCity;
  $("show-currency").checked = settings.showCurrency;
  $("widget-transparency").value = settings.widgetTransparency;
  $("widget-transparency-value").textContent = settings.widgetTransparency + "%";

  applyAccent();

  $("media-controls").classList.toggle("hidden", !settings.imageUrl);
  $("remove-image").classList.toggle("hidden", !settings.imageUrl);

  $("image-dim").value = settings.imageDim;
  $("image-blur").value = settings.imageBlur;
  $("image-dim-value").textContent = settings.imageDim + "%";
  $("image-blur-value").textContent = settings.imageBlur + "px";
  $("show-recommended").checked = settings.showRecommended;
  $("recommended-field").classList.toggle("hidden", !settings.showRecommended);
  $("clock-opacity").value = settings.clockOpacity;
  $("clock-opacity-value").textContent = settings.clockOpacity + "%";
  $("clock-weight").value = settings.clockWeight;
  $("clock-weight-value").textContent = String(settings.clockWeight);

  renderLinks();
  renderBgHistory();
  renderRecommended();
  renderCustomPanelsEditor();
}

async function findCity() {
  const query = $("weather-city").value.trim();
  const result = $("weather-result");

  if (!query) {
    result.textContent = "Введите название города.";
    return;
  }

  result.textContent = "Ищем город…";

  try {
    const params = new URLSearchParams({
      name: query,
      count: "1",
      language: "ru",
      format: "json"
    });
    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?" + params);
    if (!response.ok) throw new Error("geocoding failed");
    const data = await response.json();
    const place = data.results && data.results[0];

    if (!place) {
      result.textContent = "Город не найден, попробуйте другое написание.";
      return;
    }

    const label = [place.name, place.country].filter(Boolean).join(", ");
    $("weather-city").value = label;
    update({ weatherCity: label, weatherLat: place.latitude, weatherLon: place.longitude });
    result.textContent = "Погода будет показываться для: " + label;
  } catch {
    result.textContent = "Не удалось выполнить поиск. Проверьте подключение к интернету.";
  }
}

const SETTINGS_TAB_KEY = "newtabSettingsTab";

function activateTab(tab) {
  document.querySelectorAll("#tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll("main .card[data-tab]").forEach((card) => {
    card.classList.toggle("active", card.dataset.tab === tab);
  });
  try {
    localStorage.setItem(SETTINGS_TAB_KEY, tab);
  } catch {}
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function optimizeImage(file) {
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    return readFileAsDataUrl(file);
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxSide = 2560;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));

    if (scale >= 1 && file.size <= 1.5 * 1024 * 1024) {
      if (bitmap.close) bitmap.close();
      return readFileAsDataUrl(file);
    }

    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
    if (bitmap.close) bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch {
    return readFileAsDataUrl(file);
  }
}

function bind() {
  document.querySelectorAll("#tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      activateTab(button.dataset.tab);
      window.scrollTo(0, 0);
    });
  });

  for (const label of document.querySelectorAll("label.toggle")) {
    label.addEventListener("click", (event) => {
      if (event.target.closest(".switch") || event.target.matches('input[type="checkbox"]')) return;
      event.preventDefault();
    });
  }

  $("save-settings").addEventListener("click", saveSettings);

  $("add-panel").addEventListener("click", () => {
    if (settings.customPanels.length >= 5) return;
    settings.customPanels.push({
      id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      name: "Панель " + (settings.customPanels.length + 1),
      icon: "grid",
      sites: []
    });
    update({ customPanels: settings.customPanels });
    renderCustomPanelsEditor();
    const selects = $("custom-panels-editor").querySelectorAll("select");
    if (selects.length) selects[selects.length - 1].focus();
  });

  $("ai-panel-icon").addEventListener("change", () => {
    setIconPreview($("ai-panel-icon-preview"), $("ai-panel-icon").value);
    update({ aiPanelIcon: $("ai-panel-icon").value });
  });

  $("fun-panel-icon").addEventListener("change", () => {
    setIconPreview($("fun-panel-icon-preview"), $("fun-panel-icon").value);
    update({ funPanelIcon: $("fun-panel-icon").value });
  });

  $("ai-panel-remove").addEventListener("click", () => {
    update({ aiPanelHidden: !settings.aiPanelHidden });
    render();
  });

  $("fun-panel-remove").addEventListener("click", () => {
    update({ funPanelHidden: !settings.funPanelHidden });
    render();
  });

  document.querySelectorAll("#link-shape button").forEach((button) => {
    button.addEventListener("click", () => {
      update({ linkShape: button.dataset.value });
      document.querySelectorAll("#link-shape button").forEach((item) => {
        item.classList.toggle("active", item.dataset.value === settings.linkShape);
      });
    });
  });

  $("pick-accent").addEventListener("click", () => $("accent-color").click());

  $("accent-color").addEventListener("input", () => {
    update({ accentColor: $("accent-color").value });
    applyAccent();
  });

  $("pick-text-color").addEventListener("click", () => $("text-color").click());

  $("text-color").addEventListener("input", () => {
    update({ uiTextColor: $("text-color").value });
    applyTextColor();
  });

  $("image-file").addEventListener("change", async () => {
    const file = $("image-file").files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Выберите фото или видео.");
      return;
    }
    if (file.size > 60 * 1024 * 1024) {
      alert("Файл больше 60 МБ — выберите файл поменьше.");
      return;
    }

    $("image-file").value = "";

    if (!isImage) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        update({ imageUrl: dataUrl, imageType: "video", backgroundType: "image" });
        render();
      } catch {
        alert("Не удалось прочитать видео.");
      }
      return;
    }

    try {
      const dataUrl = await optimizeImage(file);
      addBgHistory(dataUrl);
      update({ imageUrl: dataUrl, imageType: "image", backgroundType: "image" });
      render();
    } catch {
      alert("Не удалось обработать изображение.");
    }
  });

  $("pick-media").addEventListener("click", () => $("image-file").click());

  $("image-dim").addEventListener("input", () => {
    $("image-dim-value").textContent = $("image-dim").value + "%";
    update({ imageDim: Number($("image-dim").value) });
  });

  $("image-blur").addEventListener("input", () => {
    $("image-blur-value").textContent = $("image-blur").value + "px";
    update({ imageBlur: Number($("image-blur").value) });
  });

  $("clock-opacity").addEventListener("input", () => {
    $("clock-opacity-value").textContent = $("clock-opacity").value + "%";
    update({ clockOpacity: Number($("clock-opacity").value) });
  });

  $("clock-weight").addEventListener("input", () => {
    $("clock-weight-value").textContent = $("clock-weight").value;
    update({ clockWeight: Number($("clock-weight").value) });
  });

  $("remove-image").addEventListener("click", () => {
    const patch = { imageUrl: "", imageType: "image" };
    if (settings.backgroundType === "image") {
      patch.backgroundType = "system";
    }
    update(patch);
    render();
  });

  const toggles = [
    ["show-clock", "showClock"],
    ["clock-24h", "clock24h"],
    ["show-seconds", "showSeconds"],
    ["show-date", "showDate"],
    ["show-search", "showSearch"],
    ["voice-search", "voiceSearch"],
    ["show-ai-mode", "showAiMode"],
    ["site-background", "siteBackground"],
    ["hover-open-panels", "hoverOpenPanels"],
    ["show-links", "showLinks"],
    ["show-weather", "showWeather"],
    ["show-currency", "showCurrency"],
    ["show-recommended", "showRecommended"]
  ];

  for (const [id, key] of toggles) {
    $(id).addEventListener("change", () => update({ [key]: $(id).checked }));
  }

  $("show-recommended").addEventListener("change", render);

  $("widget-transparency").addEventListener("input", () => {
    $("widget-transparency-value").textContent = $("widget-transparency").value + "%";
    update({ widgetTransparency: Number($("widget-transparency").value) });
  });

  $("search-engine").addEventListener("change", () => {
    update({ searchEngine: $("search-engine").value });
  });

  $("weather-find").addEventListener("click", findCity);

  $("weather-city").addEventListener("change", () => {
    if (!$("weather-city").value.trim()) {
      $("weather-result").textContent = "";
      update({ weatherCity: "", weatherLat: null, weatherLon: null });
    }
  });

  $("add-link").addEventListener("click", () => {
    if (settings.links.length >= MAX_LINKS) return;
    settings.links.push({ title: "", url: "" });
    update({ links: settings.links });
    renderLinks();

    const rows = $("links-list").querySelectorAll(".link-row");
    const lastRow = rows[rows.length - 1];
    if (lastRow) {
      const input = lastRow.querySelector("input");
      if (input) input.focus();
    }
  });

  $("reset").addEventListener("click", () => {
    if (!confirm("Сбросить все настройки? Это действие нельзя отменить.")) return;
    settings = cloneDefaults();
    $("weather-result").textContent = "";
    setDirty(true);
    render();
  });
}

loadSettings((items) => {
  settings = items;
  if (settings.links.length > MAX_LINKS) {
    settings.links = settings.links.slice(0, MAX_LINKS);
    chrome.storage.local.set({ links: settings.links });
  }

  const allowedBackgrounds = ["system", "color", "image", "gradient"];
  if (!allowedBackgrounds.includes(settings.backgroundType)) {
    settings.backgroundType = "image";
    chrome.storage.local.set({ backgroundType: "image" });
  }

  bind();
  render();

  chrome.storage.local.get({ bgHistory: [] }, (store) => {
    bgHistory = Array.isArray(store.bgHistory) ? store.bgHistory : [];
    renderBgHistory();
  });

  let initialTab = "appearance";
  try {
    const wantedTab = new URLSearchParams(location.search).get("tab");
    initialTab = wantedTab || localStorage.getItem(SETTINGS_TAB_KEY) || "appearance";
  } catch {}
  if (!document.querySelector('#tabs button[data-tab="' + initialTab + '"]')) {
    initialTab = "appearance";
  }
  activateTab(initialTab);
});
