let settings = cloneDefaults();

const bgEl = document.getElementById("bg");
const bgVideo = document.getElementById("bg-video");
const overlayEl = document.getElementById("overlay");
const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date");
const searchForm = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const voiceBtn = document.getElementById("voice-btn");
const aiModeBtn = document.getElementById("ai-mode-btn");
const searchActions = document.querySelector(".search-actions");
const voiceStatus = document.getElementById("voice-status");
const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
let voiceRecognition = null;
let voiceListening = false;
let voiceStatusTimer = null;
const linksEl = document.getElementById("links");
const weatherEl = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon");
const weatherTemp = document.getElementById("weather-temp");
const weatherDesc = document.getElementById("weather-desc");
const weatherDetails = document.getElementById("weather-details");
const weatherWeek = document.getElementById("weather-week");
const currencyEl = document.getElementById("currency");
const currencyList = document.getElementById("currency-list");
const settingsBtn = document.getElementById("settings-btn");
const bookmarksBtn = document.getElementById("bookmarks-btn");
const bookmarksPanel = document.getElementById("bookmarks-panel");
const bookmarksList = document.getElementById("bookmarks-list");
const drawerEl = document.getElementById("drawer");
const drawerBackdrop = document.getElementById("drawer-backdrop");
const drawerClose = document.getElementById("drawer-close");
const drawerFrame = document.getElementById("drawer-frame");
const saveConfirm = document.getElementById("save-confirm");
const saveConfirmYes = document.getElementById("save-confirm-yes");
const saveConfirmNo = document.getElementById("save-confirm-no");
const aiPanel = document.getElementById("ai-panel");
const aiList = document.getElementById("ai-list");
const funPanel = document.getElementById("fun-panel");
const funList = document.getElementById("fun-list");
const aiHandle = document.getElementById("ai-handle");
const funHandle = document.getElementById("fun-handle");
const tabRail = document.getElementById("tab-rail");
const customPanelViews = [];
const customPanelEditing = new Map();

let drawerOpen = false;
let drawerCloseTimer = null;
let panelCloseTimer = null;

const SOCIAL_SITES = [
  {
    name: "Telegram",
    url: "https://web.telegram.org",
    bg: "#229ED9",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'
  },
  {
    name: "Discord",
    url: "https://discord.com/app",
    bg: "#5865F2",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>'
  },
  {
    name: "Roblox",
    url: "https://www.roblox.com",
    bg: "linear-gradient(135deg, #2b3440, #0b0f16)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M18.926 23.998 0 18.892 5.075.002 24 5.108ZM15.348 10.09l-5.282-1.453-1.414 5.273 5.282 1.453z"/></svg>'
  },
  {
    name: "Steam",
    url: "https://store.steampowered.com",
    bg: "linear-gradient(135deg, #2a475e, #171a21)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>'
  },
  {
    name: "Twitch",
    url: "https://www.twitch.tv",
    bg: "#9146FF",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>'
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com",
    bg: "linear-gradient(135deg, #1f1f1f, #000000)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>'
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com",
    bg: "#1DB954",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>'
  },
  {
    name: "VK",
    url: "https://vk.com",
    bg: "#0077FF",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="m9.489.004.729-.003h3.564l.73.003.914.01.433.007.418.011.403.014.388.016.374.021.36.025.345.03.333.033c1.74.196 2.933.616 3.833 1.516.9.9 1.32 2.092 1.516 3.833l.034.333.029.346.025.36.02.373.025.588.012.41.013.644.009.915.004.98-.001 3.313-.003.73-.01.914-.007.433-.011.418-.014.403-.016.388-.021.374-.025.36-.03.345-.033.333c-.196 1.74-.616 2.933-1.516 3.833-.9.9-2.092 1.32-3.833 1.516l-.333.034-.346.029-.36.025-.373.02-.588.025-.41.012-.644.013-.915.009-.98.004-3.313-.001-.73-.003-.914-.01-.433-.007-.418-.011-.403-.014-.388-.016-.374-.021-.36-.025-.345-.03-.333-.033c-1.74-.196-2.933-.616-3.833-1.516-.9-.9-1.32-2.092-1.516-3.833l-.034-.333-.029-.346-.025-.36-.02-.373-.025-.588-.012-.41-.013-.644-.009-.915-.004-.98.001-3.313.003-.73.01-.914.007-.433.011-.418.014-.403.016-.388.021-.374.025-.36.03-.345.033-.333c.196-1.74.616-2.933 1.516-3.833.9-.9 2.092-1.32 3.833-1.516l.333-.034.346-.029.36-.025.373-.02.588-.025.41-.012.644-.013.915-.009ZM6.79 7.3H4.05c.13 6.24 3.25 9.99 8.72 9.99h.31v-3.57c2.01.2 3.53 1.67 4.14 3.57h2.84c-.78-2.84-2.83-4.41-4.11-5.01 1.28-.74 3.08-2.54 3.51-4.98h-2.58c-.56 1.98-2.22 3.78-3.8 3.95V7.3H10.5v6.92c-1.6-.4-3.62-2.34-3.71-6.92Z"/></svg>'
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com",
    bg: "linear-gradient(135deg, #f58529, #dd2a7b 55%, #8134af)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>'
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com",
    bg: "#FF0000",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
  }
];

const AI_SITES = [
  {
    name: "ChatGPT",
    url: "https://chatgpt.com",
    bg: "linear-gradient(135deg, #19c37d, #0d8f62)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>'
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    bg: "linear-gradient(135deg, #e8977a, #d97757)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></svg>'
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com",
    bg: "linear-gradient(135deg, #4285f4, #9b72cb 55%, #d96570)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>'
  },
  {
    name: "DeepSeek",
    url: "https://chat.deepseek.com",
    bg: "linear-gradient(135deg, #5b7cfa, #3b54e8)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45"/></svg>'
  },
  {
    name: "Grok",
    url: "https://grok.com",
    bg: "linear-gradient(135deg, #16181c, #000000)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18"><path fill="#fff" d="M13.7242 18.696L20.3732 13.8332C20.6992 13.5948 21.1651 13.6878 21.3204 14.0581C22.1379 16.011 21.7727 18.3579 20.1463 19.9692C18.5198 21.5806 16.2569 21.934 14.1884 21.1292L11.9288 22.1657C15.1697 24.3604 19.1052 23.8176 21.5645 21.3794C23.5152 19.4468 24.1193 16.8124 23.5544 14.4368L23.5595 14.4419C22.7403 10.952 23.7609 9.55704 25.8516 6.70459C25.901 6.63696 25.9506 6.56932 26 6.5L23.2489 9.22563V9.21719L13.7225 18.6977"/><path fill="#fff" d="M12.3521 19.8779C10.0259 17.6765 10.427 14.2694 12.4118 12.3047C13.8795 10.8505 16.2842 10.2571 18.3833 11.1295L20.6378 10.0981C20.2316 9.8073 19.7111 9.49448 19.1138 9.27468C16.4139 8.17393 13.1815 8.72176 10.9868 10.8945C8.87566 12.9861 8.2118 16.202 9.35182 18.9463C10.2034 20.9973 8.8074 22.448 7.40114 23.9123C6.90281 24.4314 6.40277 24.9505 6 25.5L12.3504 19.8796"/></svg>'
  },
  {
    name: "Copilot",
    url: "https://copilot.microsoft.com",
    bg: "#ffffff",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18" fill="none"><path fill="url(#cp-a)" d="M21.533 6.829A2.53 2.53 0 0 0 19.109 5h-.737a2.53 2.53 0 0 0-2.483 2.087l-1.263 6.937.314-1.08a2.53 2.53 0 0 1 2.423-1.833h4.285l1.796.706 1.731-.706h-.505a2.53 2.53 0 0 1-2.423-1.829z"/><path fill="url(#cp-b)" d="M10.726 25.16A2.53 2.53 0 0 0 13.15 27h1.566c1.37 0 2.49-1.1 2.525-2.48l.17-6.69-.357 1.228a2.53 2.53 0 0 1-2.422 1.83h-4.32l-1.54-.842-1.667.843h.497a2.53 2.53 0 0 1 2.425 1.84z"/><path fill="url(#cp-c)" d="M19 5h-8.748c-2.5 0-4 3.331-5 6.662-1.184 3.947-2.734 9.225 1.75 9.225h3.778c1.13 0 2.12-.753 2.43-1.847.656-2.317 1.808-6.359 2.712-9.436.46-1.563.843-2.906 1.43-3.742A1.97 1.97 0 0 1 19 5"/><path fill="url(#cp-d)" d="M19 5h-8.748c-2.5 0-4 3.331-5 6.662-1.184 3.947-2.734 9.225 1.75 9.225h3.778c1.13 0 2.12-.753 2.43-1.847.656-2.317 1.808-6.359 2.712-9.436.46-1.563.843-2.906 1.43-3.742A1.97 1.97 0 0 1 19 5"/><path fill="url(#cp-e)" d="M13 27h8.749c2.5 0 4-3.333 5-6.664 1.183-3.948 2.733-9.227-1.75-9.227h-3.78a2.53 2.53 0 0 0-2.43 1.848q-1.335 4.725-2.713 9.437c-.46 1.564-.841 2.907-1.43 3.743A1.97 1.97 0 0 1 13 27"/><path fill="url(#cp-f)" d="M13 27h8.749c2.5 0 4-3.333 5-6.664 1.183-3.948 2.733-9.227-1.75-9.227h-3.78a2.53 2.53 0 0 0-2.43 1.848q-1.335 4.725-2.713 9.437c-.46 1.564-.841 2.907-1.43 3.743A1.97 1.97 0 0 1 13 27"/><defs><radialGradient id="cp-a" cx="0" cy="0" r="1" gradientTransform="matrix(-5.97848 -8.60938 6.2985 -5.97887 .09 -13.668)" gradientUnits="userSpaceOnUse"><stop offset=".096" stop-color="#00AEFF"/><stop offset=".773" stop-color="#2253CE"/><stop offset="1" stop-color="#0736C4"/></radialGradient><radialGradient id="cp-b" cx="0" cy="0" r="1" gradientTransform="matrix(5.3896 7.77287 -6.15265 5.38952 -4.088 18.651)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB657"/><stop offset=".634" stop-color="#FF5F3D"/><stop offset=".923" stop-color="#C02B3C"/></radialGradient><radialGradient id="cp-e" cx="0" cy="0" r="1" gradientTransform="matrix(-6.91187 18.8148 -21.1111 -6.91263 -6.321 21.852)" gradientUnits="userSpaceOnUse"><stop offset=".066" stop-color="#8C48FF"/><stop offset=".5" stop-color="#F2598A"/><stop offset=".896" stop-color="#FFB152"/></radialGradient><linearGradient id="cp-c" x1="9.92" x2="11.167" y1="6.925" y2="21.475" gradientUnits="userSpaceOnUse"><stop offset=".156" stop-color="#0D91E1"/><stop offset=".487" stop-color="#52B471"/><stop offset=".652" stop-color="#98BD42"/><stop offset=".937" stop-color="#FFC800"/></linearGradient><linearGradient id="cp-d" x1="10.892" x2="11.574" y1="5" y2="20.884" gradientUnits="userSpaceOnUse"><stop stop-color="#3DCBFF"/><stop offset=".247" stop-color="#0588F7" stop-opacity="0"/></linearGradient><linearGradient id="cp-f" x1="25.526" x2="25.517" y1="10.139" y2="14.466" gradientUnits="userSpaceOnUse"><stop offset=".058" stop-color="#F8ADFA"/><stop offset=".708" stop-color="#A86EDD" stop-opacity="0"/></linearGradient></defs></svg>'
  },
  {
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    bg: "linear-gradient(135deg, #2dd4bf, #0e7490)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/></svg>'
  },
  {
    name: "Qwen",
    url: "https://chat.qwen.ai",
    bg: "linear-gradient(135deg, #8b5cf6, #4f46e5)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M23.919 14.545 20.817 9.17l1.47-2.544a.56.56 0 0 0 0-.566l-1.633-2.83a.57.57 0 0 0-.49-.283h-6.207L12.487.402a.57.57 0 0 0-.49-.284H8.732a.56.56 0 0 0-.49.284L5.139 5.775h-2.94a.56.56 0 0 0-.49.284L.077 8.887a.56.56 0 0 0 0 .567L3.18 14.83l-1.47 2.545a.56.56 0 0 0 0 .566l1.634 2.83a.57.57 0 0 0 .49.283h6.205l1.47 2.545a.57.57 0 0 0 .49.284h3.266a.57.57 0 0 0 .49-.284l3.104-5.375h2.94a.57.57 0 0 0 .49-.283l1.634-2.828a.55.55 0 0 0-.004-.568M8.733.686l1.634 2.828-1.634 2.828H21.8L20.164 9.17H7.425L5.63 6.06Zm1.306 19.801-6.205-.002 1.634-2.83h3.265L2.201 6.344h3.267q3.182 5.517 6.367 11.032zm10.124-5.66L18.53 12l-6.532 11.315-1.634-2.83c2.129-3.673 4.25-7.351 6.373-11.028h3.592l3.102 5.374z"/></svg>'
  },
  {
    name: "Mistral",
    url: "https://chat.mistral.ai",
    bg: "linear-gradient(135deg, #ffb02e, #f97316 60%, #ea580c)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M17.143 3.429v3.428h-3.429v3.429h-3.428V6.857H6.857V3.43H3.43v13.714H0v3.428h10.286v-3.428H6.857v-3.429h3.429v3.429h3.429v-3.429h3.428v3.429h-3.428v3.428H24v-3.428h-3.43V3.429z"/></svg>'
  },
  {
    name: "GigaChat",
    url: "https://giga.chat",
    bg: "linear-gradient(135deg, #1a1c22, #000000)",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18"><path fill="#fff" fill-rule="evenodd" d="M16 5c6.075 0 11 4.924 11 11s-4.925 11-11 11S5 22.075 5 16 9.925 5 16 5m9.058 8.334c-.279 1.928-1.259 3.519-2.076 4.554-1.262 1.555-2.953 2.9-4.893 3.895-1.919.984-3.994 1.581-6.002 1.728q-.51.03-.951.03c-.352 0-.677-.015-.985-.042a9.44 9.44 0 0 0 5.842 2.013l-.001-.002c5.237 0 9.484-4.246 9.484-9.483 0-.91-.128-1.788-.367-2.62q-.025-.037-.052-.073m-7.709-7.33c-3.24 0-6.185 1.335-7.878 3.572l-.011.013c-.732.892-1.219 1.87-1.406 2.83-.107.583-.087 1.12.06 1.587v-.002c.348 1.045 1.194 1.883 2.154 2.13.4.1.784.14 1.14.124l.095-.008c2.428-.196 4.593-1.726 6.39-3.197 1.125-.941 2.2-2.187 2.27-2.992-1.568.76-3.187 1.75-5.054 3.088a.466.466 0 0 1-.643-.094 50 50 0 0 0-2.542-3.065.47.47 0 0 1 .066-.688c2.475-1.856 4.937-2.908 7.325-3.13a11.4 11.4 0 0 0-1.966-.169" clip-rule="evenodd"/></svg>'
  }
];

const WEATHER_CODES = [
  [[0, 0], "☀️", "Ясно"],
  [[1, 1], "🌤️", "В основном ясно"],
  [[2, 2], "⛅", "Переменная облачность"],
  [[3, 3], "☁️", "Пасмурно"],
  [[45, 48], "🌫️", "Туман"],
  [[51, 57], "🌦️", "Морось"],
  [[61, 67], "🌧️", "Дождь"],
  [[71, 77], "🌨️", "Снег"],
  [[80, 82], "🌧️", "Ливень"],
  [[85, 86], "🌨️", "Снегопад"],
  [[95, 95], "⛈️", "Гроза"],
  [[96, 99], "⛈️", "Гроза с градом"]
];

function weatherInfo(code) {
  for (const [range, emoji, label] of WEATHER_CODES) {
    if (code >= range[0] && code <= range[1]) return { emoji, label };
  }
  return { emoji: "🌡️", label: "Погода" };
}

function hexLuma(hex) {
  let value = hex.replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (value.length !== 6) return null;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function looksLightBackground(value) {
  const colors = String(value).match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi);
  if (!colors) return false;

  let sum = 0;
  let count = 0;
  for (const color of colors) {
    const luma = hexLuma(color);
    if (luma != null) {
      sum += luma;
      count++;
    }
  }
  return count > 0 && sum / count > 170;
}

const imageBrightnessCache = new Map();

function detectLightImage(url) {
  if (imageBrightnessCache.has(url)) return Promise.resolve(imageBrightnessCache.get(url));

  return new Promise((resolve) => {
    const img = new Image();
    img.onerror = () => resolve(false);
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, 32, 32);
        const data = context.getImageData(0, 0, 32, 32).data;

        let sum = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 64) continue;
          sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          count += 1;
        }

        const light = count > 0 && sum / count > 170;
        imageBrightnessCache.set(url, light);
        resolve(light);
      } catch {
        resolve(false);
      }
    };
    img.src = url;
  });
}

function applyBackground() {
  const { backgroundType, color, imageUrl, imageType, imageDim, imageBlur } = settings;

  if (backgroundType === "image" && imageUrl) {
    document.body.classList.remove("light-theme");
    document.body.classList.remove("light-bg");
    bgEl.classList.toggle("video", imageType === "video");

    if (imageType === "video") {
      bgEl.style.backgroundImage = "none";
      bgEl.style.backgroundColor = "#000";
      bgEl.style.filter = "none";
      bgVideo.style.filter = imageBlur > 0 ? `blur(${imageBlur}px)` : "none";

      if (bgVideo.getAttribute("src") !== imageUrl) {
        bgVideo.src = imageUrl;
      }

      bgVideo.play().catch(() => {});
      overlayEl.style.opacity = imageDim / 100;
      return;
    }

    bgVideo.pause();
    bgVideo.style.filter = "none";

    const url = imageUrl;
    detectLightImage(url).then((light) => {
      if (settings.backgroundType === "image" && settings.imageUrl === url) {
        document.body.classList.toggle("light-bg", light);
      }
    });

    bgEl.style.backgroundImage = `url(${JSON.stringify(imageUrl)})`;
    bgEl.style.backgroundColor = "#000";
    bgEl.style.filter = imageBlur > 0 ? `blur(${imageBlur}px)` : "none";
    overlayEl.style.opacity = imageDim / 100;
    return;
  }

  bgEl.classList.remove("video");
  bgVideo.pause();
  bgVideo.style.filter = "none";
  bgEl.style.filter = "none";

  if (backgroundType === "gradient") {
    const angle = Number(settings.gradientAngle) || 135;
    const start = settings.gradientStart || "#10141f";
    const end = settings.gradientEnd || "#2a3040";
    document.body.classList.remove("light-theme");
    document.body.classList.toggle("light-bg", false);
    bgEl.style.backgroundImage = `linear-gradient(${angle}deg, ${start}, ${end})`;
    bgEl.style.backgroundColor = "#000";
    overlayEl.style.opacity = 0;
    return;
  }

  if (backgroundType === "color") {
    document.body.classList.remove("light-theme");
    document.body.classList.toggle("light-bg", looksLightBackground(color));
    bgEl.style.backgroundImage = "none";
    bgEl.style.backgroundColor = color;
    overlayEl.style.opacity = 0.15;
    return;
  }

  const light = !window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.body.classList.toggle("light-theme", light);
  document.body.classList.remove("light-bg");
  bgEl.style.backgroundColor = "transparent";
  bgEl.style.backgroundImage = light
    ? "linear-gradient(135deg, #e6eef9 0%, #f7fafd 100%)"
    : "linear-gradient(135deg, #0b1e3a 0%, #12345f 55%, #1b4b82 100%)";
  overlayEl.style.opacity = light ? 0 : 0.12;
}

function renderClock() {
  const now = new Date();
  let hours = now.getHours();
  let suffix = "";

  if (!settings.clock24h) {
    suffix = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  const hh = settings.clock24h ? String(hours).padStart(2, "0") : String(hours);
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const text = hh + ":" + mm + (settings.showSeconds ? ":" + ss : "") + suffix;

  if (clockEl.textContent !== text) clockEl.textContent = text;
  clockEl.classList.toggle("hidden", !settings.showClock);

  if (settings.showDate) {
    const formatted = new Intl.DateTimeFormat("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(now);
    dateEl.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  dateEl.classList.toggle("invisible", !settings.showDate);
}

function renderSearch() {
  searchForm.classList.toggle("hidden", !settings.showSearch);
  const engine = SEARCH_ENGINES[settings.searchEngine] || SEARCH_ENGINES.google;
  searchInput.placeholder = "Поиск в " + engine.name;

  const showAi = settings.showAiMode !== false;
  const showVoice = Boolean(settings.voiceSearch && SpeechRecognitionApi);
  aiModeBtn.classList.toggle("hidden", !showAi);
  searchActions.classList.toggle("hidden", !showAi);
  voiceBtn.classList.toggle("hidden", !showVoice);
  searchForm.classList.toggle("has-voice", showVoice);
  searchForm.classList.toggle("has-ai", showAi);
  if (!showVoice) {
    voiceBtn.classList.remove("listening");
    hideVoiceStatus();
    if (voiceRecognition) voiceRecognition.abort();
  }
}

function focusSearch() {
  if (settings.showSearch) searchInput.focus();
}

function normalizeUrl(url) {
  return /^[a-z][a-z0-9+.-]*:/i.test(url) ? url : "https://" + url;
}

function linkTitle(link) {
  const title = (link.title || "").trim();
  let host = "";
  try {
    host = new URL(normalizeUrl(link.url)).hostname;
  } catch {}

  if (title) {
    if (host) {
      const normalized = title.toLowerCase();
      const bareHost = host.replace(/^www\./, "").toLowerCase();
      if (normalized === bareHost || normalized === host.toLowerCase()) {
        return siteNameFor(host);
      }
    }
    return title;
  }

  if (host) return siteNameFor(host);
  return link.url;
}

const FALLBACK_ICON = "media/kitty.jpg";
const faviconCache = new Map();
const processedFaviconCache = new Map();

function detectFaviconBackground(source) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onerror = () => resolve({ src: source, color: null });
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);

        const data = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = data.data;
        const width = canvas.width;
        const height = canvas.height;

        const samples = [
          [0.24, 0.24],
          [0.76, 0.24],
          [0.24, 0.76],
          [0.76, 0.76]
        ];

        let red = 0;
        let green = 0;
        let blue = 0;
        let count = 0;

        for (const [fx, fy] of samples) {
          const sx = Math.min(width - 1, Math.max(0, Math.floor(width * fx)));
          const sy = Math.min(height - 1, Math.max(0, Math.floor(height * fy)));
          const offset = (sy * width + sx) * 4;
          if (pixels[offset + 3] > 200) {
            red += pixels[offset];
            green += pixels[offset + 1];
            blue += pixels[offset + 2];
            count += 1;
          }
        }

        const color =
          count >= 2
            ? "rgb(" +
              Math.round(red / count) +
              ", " +
              Math.round(green / count) +
              ", " +
              Math.round(blue / count) +
              ")"
            : null;

        let fill = color;
        if (!fill) {
          let luminance = 0;
          let opaque = 0;

          for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] > 64) {
              luminance +=
                0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
              opaque += 1;
            }
          }

          fill = opaque > 0 && luminance / opaque > 160 ? "#161a22" : "#e8ecf4";
          if (opaque === 0) fill = "#1b202a";
        }

        const visited = new Uint8Array(width * height);
        const stack = [];

        for (let x = 0; x < width; x++) stack.push(x, 0, x, height - 1);
        for (let y = 0; y < height; y++) stack.push(0, y, width - 1, y);

        while (stack.length) {
          const y = stack.pop();
          const x = stack.pop();
          if (x < 0 || y < 0 || x >= width || y >= height) continue;

          const index = y * width + x;
          if (visited[index]) continue;
          visited[index] = 1;

          const offset = index * 4;
          const light =
            pixels[offset] >= 185 && pixels[offset + 1] >= 185 && pixels[offset + 2] >= 185;
          if (!light || pixels[offset + 3] === 0) continue;

          pixels[offset + 3] = 0;
          stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
        }

        context.putImageData(data, 0, 0);
        resolve({ src: canvas.toDataURL("image/png"), color: fill });
      } catch {
        resolve({ src: source, color: null });
      }
    };
    img.src = source;
  });
}

const FAVICON_STORE_KEY = "newtabFaviconStore";
const FAVICON_STORE_TTL = 7 * 24 * 60 * 60 * 1000;
let faviconStore = null;

function getFaviconStore() {
  if (!faviconStore) {
    const stored = readCache(FAVICON_STORE_KEY);
    faviconStore = stored && typeof stored === "object" ? stored : {};
  }
  return faviconStore;
}

function getStoredFavicon(host) {
  const store = getFaviconStore();
  const entry = store[host];
  if (entry && entry.at && Date.now() - entry.at < FAVICON_STORE_TTL) return entry.data;
  return null;
}

function storeFavicon(host, data) {
  const store = getFaviconStore();
  store[host] = { at: Date.now(), data };
  writeCache(FAVICON_STORE_KEY, store);
}

function fetchGlassFavicon(host) {
  if (processedFaviconCache.has(host)) return processedFaviconCache.get(host);

  const stored = getStoredFavicon(host);
  if (stored) {
    const cachedPromise = Promise.resolve(stored);
    processedFaviconCache.set(host, cachedPromise);
    return cachedPromise;
  }

  const promise = fetchFavicon(host).then((url) => {
    if (!url) return null;
    return detectFaviconBackground(url).then((result) => {
      if (result) storeFavicon(host, result);
      return result;
    });
  });

  processedFaviconCache.set(host, promise);
  return promise;
}

function fetchFavicon(host) {
  if (faviconCache.has(host)) return faviconCache.get(host);

  const promise = (async () => {
    try {
      const faviconUrl =
        "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=64&url=" +
        encodeURIComponent("https://" + host);
      const response = await fetch(faviconUrl);
      if (!response.ok) throw new Error("no favicon");
      const blob = await response.blob();
      if (!blob.type.startsWith("image/")) throw new Error("not an image");
      return URL.createObjectURL(blob);
    } catch {
      faviconCache.delete(host);
      return null;
    }
  })();

  faviconCache.set(host, promise);
  return promise;
}

function hasRealHost(host) {
  const parts = host.split(".");
  return parts.length >= 2 && parts[parts.length - 1].length >= 2;
}

function fillLinkIcon(icon, link) {
  const showFallback = () => {
    const img = document.createElement("img");
    img.alt = "";
    img.className = "fallback";
    img.src = FALLBACK_ICON;
    img.addEventListener(
      "error",
      () => {
        img.remove();
        icon.classList.add("letter");
        icon.textContent = linkTitle(link).trim().charAt(0).toUpperCase();
      },
      { once: true }
    );
    icon.appendChild(img);
  };

  const custom = (link.icon || "").trim();
  if (custom) {
    const img = document.createElement("img");
    img.alt = "";
    img.className = "custom";
    img.src = custom;
    img.addEventListener(
      "error",
      () => {
        img.remove();
        showFallback();
      },
      { once: true }
    );
    icon.appendChild(img);
    return;
  }

  let host = "";
  try {
    host = new URL(normalizeUrl(link.url)).hostname;
  } catch {}

  if (!host || !hasRealHost(host)) {
    showFallback();
    return;
  }

  const loader = fetchGlassFavicon;
  loader(host).then((result) => {
    if (!result) {
      showFallback();
      return;
    }

    let src = result;
    if (typeof result === "object") {
      src = result.src;
      if (result.color) icon.style.background = result.color;
    }

    if (!src) {
      showFallback();
      return;
    }

    const img = document.createElement("img");
    img.alt = "";
    img.src = src;
    icon.appendChild(img);
  });
}

function renderLinks() {
  linksEl.textContent = "";
  linksEl.classList.toggle("hidden", !settings.showLinks);
  if (!settings.showLinks) return;

  const items = settings.links
    .filter((link) => link && link.url && link.url.trim())
    .slice(0, MAX_LINKS);

  for (const link of items) {
    let href;
    try {
      href = new URL(normalizeUrl(link.url.trim()));
    } catch {
      continue;
    }

    const tile = document.createElement("a");
    tile.className = "link-tile";
    tile.href = href.toString();
    tile.title = linkTitle(link);

    const icon = document.createElement("div");
    icon.className = "link-icon";
    fillLinkIcon(icon, link);

    const label = document.createElement("span");
    label.className = "link-title";
    label.textContent = linkTitle(link);

    tile.append(icon, label);
    linksEl.appendChild(tile);
  }
}

async function fetchOpenMeteo() {
  const params = new URLSearchParams({
    latitude: settings.weatherLat,
    longitude: settings.weatherLon,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    forecast_days: 7,
    wind_speed_unit: "ms",
    timezone: "auto"
  });
  const response = await fetchWithTimeout(
    "https://api.open-meteo.com/v1/forecast?" + params,
    8000
  );
  if (!response.ok) throw new Error("open-meteo failed");
  const data = await response.json();
  const current = data.current;
  const info = weatherInfo(current.weather_code);

  let week = [];
  const daily = data.daily;
  if (daily && Array.isArray(daily.time)) {
    week = daily.time.map((date, index) => {
      const dayInfo = weatherInfo(daily.weather_code[index]);
      return {
        date,
        emoji: dayInfo.emoji,
        max: daily.temperature_2m_max[index],
        min: daily.temperature_2m_min[index]
      };
    });
  }

  return {
    emoji: info.emoji,
    description: info.label,
    temperature: current.temperature_2m,
    apparent: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m,
    dayMax: data.daily && Array.isArray(data.daily.temperature_2m_max) ? data.daily.temperature_2m_max[0] : null,
    dayMin: data.daily && Array.isArray(data.daily.temperature_2m_min) ? data.daily.temperature_2m_min[0] : null,
    week
  };
}

const MET_SYMBOLS = {
  clearsky: ["☀️", "Ясно"],
  fair: ["🌤️", "В основном ясно"],
  partlycloudy: ["⛅", "Переменная облачность"],
  cloudy: ["☁️", "Пасмурно"],
  fog: ["🌫️", "Туман"],
  lightrainshowers: ["🌦️", "Небольшой дождь"],
  rainshowers: ["🌧️", "Ливень"],
  heavyrainshowers: ["🌧️", "Сильный ливень"],
  lightrain: ["🌦️", "Небольшой дождь"],
  rain: ["🌧️", "Дождь"],
  heavyrain: ["🌧️", "Сильный дождь"],
  lightsnowshowers: ["🌨️", "Небольшой снег"],
  snowshowers: ["🌨️", "Снегопад"],
  heavysnowshowers: ["🌨️", "Сильный снегопад"],
  lightsnow: ["🌨️", "Небольшой снег"],
  snow: ["🌨️", "Снег"],
  heavysnow: ["🌨️", "Сильный снег"],
  sleet: ["🌨️", "Мокрый снег"],
  rainandthunder: ["⛈️", "Гроза"],
  rainandthundershowers: ["⛈️", "Гроза"],
  snowandthunder: ["⛈️", "Гроза со снегом"]
};

async function fetchMetNo() {
  const params = new URLSearchParams({
    lat: String(settings.weatherLat),
    lon: String(settings.weatherLon)
  });
  const response = await fetchWithTimeout(
    "https://api.met.no/weatherapi/locationforecast/2.0/compact?" + params,
    8000
  );
  if (!response.ok) throw new Error("met.no failed");
  const data = await response.json();
  const series = data.properties && data.properties.timeseries;
  if (!Array.isArray(series) || series.length === 0) throw new Error("met.no empty");

  const current = series[0].data;
  const details = current.instant.details;
  const symbol =
    (current.next_1_hours && current.next_1_hours.summary && current.next_1_hours.summary.symbol_code) ||
    (current.next_6_hours && current.next_6_hours.summary && current.next_6_hours.summary.symbol_code) ||
    "";
  const info = MET_SYMBOLS[symbol.split("_")[0]] || ["🌡️", "Погода"];

  const temps = series
    .slice(0, 24)
    .map((entry) => entry.data.instant.details.air_temperature)
    .filter((temp) => typeof temp === "number");

  const byDate = new Map();
  for (const entry of series) {
    const date = entry.time.slice(0, 10);
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date).push(entry);
  }

  const week = [...byDate.entries()].slice(0, 7).map(([date, entries]) => {
    const dayTemps = entries
      .map((entry) => entry.data.instant.details.air_temperature)
      .filter((temp) => typeof temp === "number");
    const mid =
      entries.find((entry) => entry.time.slice(11, 13) === "12") ||
      entries[Math.floor(entries.length / 2)];
    const midData = mid.data;
    const midSymbol =
      (midData.next_6_hours && midData.next_6_hours.summary && midData.next_6_hours.summary.symbol_code) ||
      (midData.next_1_hours && midData.next_1_hours.summary && midData.next_1_hours.summary.symbol_code) ||
      "";
    const midInfo = MET_SYMBOLS[midSymbol.split("_")[0]] || ["🌡️", ""];

    return {
      date,
      emoji: midInfo[0],
      max: dayTemps.length ? Math.max(...dayTemps) : null,
      min: dayTemps.length ? Math.min(...dayTemps) : null
    };
  });

  return {
    emoji: info[0],
    description: info[1],
    temperature: details.air_temperature,
    apparent: null,
    humidity: details.relative_humidity,
    wind: details.wind_speed,
    dayMax: temps.length ? Math.max(...temps) : null,
    dayMin: temps.length ? Math.min(...temps) : null,
    week
  };
}

let bookmarksCachedAt = 0;
let bookmarksCache = [];

const WEATHER_TTL = 10 * 60 * 1000;
const CURRENCY_TTL = 30 * 60 * 1000;
const BOOKMARKS_TTL = 60 * 1000;
const WEATHER_CACHE_KEY = "newtabWeatherCache";
const CURRENCY_CACHE_KEY = "newtabCurrencyCache";

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

function alignWidgets() {
  const bothVisible =
    !weatherEl.classList.contains("hidden") && !currencyEl.classList.contains("hidden");
  const anyExpanded =
    weatherEl.classList.contains("expanded") || currencyEl.classList.contains("expanded");

  if (!bothVisible || anyExpanded) return;

  const height = Math.max(weatherEl.offsetHeight, currencyEl.offsetHeight);
  weatherEl.style.minHeight = height + "px";
  currencyEl.style.minHeight = height + "px";
}

let alignTimer = null;

function scheduleAlignWidgets(delay) {
  clearTimeout(alignTimer);
  alignTimer = setTimeout(alignWidgets, delay || 380);
}

function applyWeather(info) {
  weatherIcon.textContent = info.emoji;
  weatherTemp.textContent = Math.round(info.temperature) + "°";
  weatherDesc.textContent = info.description;

  const parts = [];
  if (typeof info.apparent === "number") parts.push("Ощущается " + Math.round(info.apparent) + "°");
  if (typeof info.wind === "number") parts.push("Ветер " + Math.round(info.wind) + " м/с");
  if (typeof info.humidity === "number") parts.push("Влажность " + Math.round(info.humidity) + "%");
  if (typeof info.dayMax === "number" && typeof info.dayMin === "number") {
    parts.push("Днём " + Math.round(info.dayMax) + "°, ночью " + Math.round(info.dayMin) + "°");
  }

  weatherDetails.textContent = parts.join(" · ");
  renderWeatherWeek(info.week);
  weatherEl.dataset.loaded = "1";
  weatherEl.classList.remove("hidden");
  requestAnimationFrame(alignWidgets);
}

function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout || 8000);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function loadWeather() {
  if (!settings.showWeather || settings.weatherLat == null || settings.weatherLon == null) {
    weatherEl.classList.add("hidden");
    return;
  }

  const cached = readCache(WEATHER_CACHE_KEY);
  if (cached && cached.info) {
    applyWeather(cached.info);
    if (Date.now() - cached.at < WEATHER_TTL) return;
  }

  let info = null;
  try {
    info = await fetchMetNo();
  } catch {
    try {
      info = await fetchOpenMeteo();
    } catch {
      info = null;
    }
  }

  if (!info) {
    if (!cached) weatherEl.classList.add("hidden");
    return;
  }

  applyWeather(info);
  writeCache(WEATHER_CACHE_KEY, { at: Date.now(), info });
}

function formatWeekday(dateString) {
  try {
    const date = new Date(dateString + "T12:00:00");
    const label = new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date);
    return label.charAt(0).toUpperCase() + label.slice(1);
  } catch {
    return dateString;
  }
}

function renderWeatherWeek(week) {
  weatherWeek.textContent = "";
  if (!Array.isArray(week)) return;

  week.forEach((day, index) => {
    if (typeof day.max !== "number" || typeof day.min !== "number") return;

    const row = document.createElement("div");
    row.className = "weather-day";

    const name = document.createElement("span");
    name.className = "weather-day-name";
    name.textContent = index === 0 ? "Сегодня" : formatWeekday(day.date);

    const emoji = document.createElement("span");
    emoji.textContent = day.emoji;

    const temp = document.createElement("span");
    temp.className = "weather-day-temp";
    temp.textContent = Math.round(day.max) + "° / " + Math.round(day.min) + "°";

    row.append(name, emoji, temp);
    weatherWeek.appendChild(row);
  });
}

const CURRENCY_CODES = ["USD", "EUR", "CNY"];

let currencyExpanded = false;
let currencyItems = [];
let selectedCurrency = null;
let currencyChartToken = 0;

const CURRENCY_HISTORY_KEY = "newtabCurrencyHistory";
const CURRENCY_HISTORY_TTL = 12 * 60 * 60 * 1000;

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

async function fetchCurrencyArchive(iso) {
  try {
    const parts = iso.split("-");
    const response = await fetchWithTimeout(
      "https://www.cbr-xml-daily.ru/archive/" + parts[0] + "/" + parts[1] + "/" + parts[2] + "/daily_json.js",
      6000
    );
    if (!response.ok) return null;
    const data = await response.json();
    const rates = {};
    for (const code of CURRENCY_CODES) {
      const valute = data.Valute && data.Valute[code];
      if (valute) rates[code] = valute.Value / (valute.Nominal || 1);
    }
    return Object.keys(rates).length ? rates : null;
  } catch {
    return null;
  }
}

let currencyHistoryPromise = null;

function loadCurrencyHistory() {
  const cached = readCache(CURRENCY_HISTORY_KEY);
  if (cached && cached.days && Date.now() - cached.at < CURRENCY_HISTORY_TTL) {
    return Promise.resolve(cached.days);
  }

  if (currencyHistoryPromise) return currencyHistoryPromise;

  currencyHistoryPromise = (async () => {
    const days = {};
    const today = new Date();
    const tasks = [];

    for (let offset = 0; offset < 9; offset++) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      const iso = isoDate(date);
      tasks.push(
        fetchCurrencyArchive(iso).then((rates) => {
          if (rates) days[iso] = rates;
        })
      );
    }

    await Promise.all(tasks);
    writeCache(CURRENCY_HISTORY_KEY, { at: Date.now(), days });
    currencyHistoryPromise = null;
    return days;
  })();

  return currencyHistoryPromise;
}

function createCurrencyChart(series) {
  const width = 240;
  const height = 64;
  const pad = 6;
  const values = series.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = (width - pad * 2) / Math.max(1, series.length - 1);

  const points = series.map((point, index) => [
    pad + index * step,
    pad + (1 - (point.value - min) / span) * (height - pad * 2)
  ]);

  const line = points
    .map(([x, y], index) => (index === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1))
    .join(" ");
  const lastX = points[points.length - 1][0].toFixed(1);
  const firstX = points[0][0].toFixed(1);
  const area = line + " L " + lastX + " " + (height - pad) + " L " + firstX + " " + (height - pad) + " Z";
  const up = values[values.length - 1] >= values[0];
  const color = up ? "#4ade80" : "#f87171";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "currency-chart");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "none");

  const areaPath = document.createElementNS(svgNS, "path");
  areaPath.setAttribute("d", area);
  areaPath.setAttribute("fill", color);
  areaPath.setAttribute("opacity", "0.15");

  const linePath = document.createElementNS(svgNS, "path");
  linePath.setAttribute("d", line);
  linePath.setAttribute("fill", "none");
  linePath.setAttribute("stroke", color);
  linePath.setAttribute("stroke-width", "2");
  linePath.setAttribute("stroke-linejoin", "round");
  linePath.setAttribute("stroke-linecap", "round");

  svg.append(areaPath, linePath);
  return svg;
}

async function renderCurrencyDetail() {
  const detail = document.getElementById("currency-detail");
  if (!detail) return;

  const token = ++currencyChartToken;
  detail.textContent = "";

  if (!currencyExpanded) return;

  const item = currencyItems.find((entry) => entry.code === selectedCurrency);
  if (!item) return;

  let direction = "без изменений";
  if (item.diff > 0.005) direction = "растёт ▲";
  else if (item.diff < -0.005) direction = "падает ▼";

  const change =
    Math.abs(item.diff) >= 0.01 ? " (" + Math.abs(item.diff).toFixed(2) + " ₽ за день)" : "";

  const caption = document.createElement("div");
  caption.className = "currency-caption";
  caption.textContent = item.code + ": " + direction + change;
  detail.appendChild(caption);

  const days = await loadCurrencyHistory();
  if (token !== currencyChartToken || !currencyExpanded) return;

  const series = Object.keys(days)
    .sort()
    .map((iso) => ({ iso, value: days[iso][item.code] }))
    .filter((point) => typeof point.value === "number");

  const today = isoDate(new Date());
  const last = series[series.length - 1];
  if (!last || last.iso !== today) {
    series.push({ iso: today, value: item.value });
  } else {
    last.value = item.value;
  }

  if (series.length < 2) return;

  detail.appendChild(createCurrencyChart(series));

  const min = Math.min(...series.map((point) => point.value));
  const max = Math.max(...series.map((point) => point.value));
  const range = document.createElement("div");
  range.className = "currency-caption small";
  range.textContent = "мин " + min.toFixed(2) + " · макс " + max.toFixed(2);
  detail.appendChild(range);
}

function setCurrencyExpanded(value) {
  currencyExpanded = value;
  currencyEl.classList.toggle("expanded", value);
  renderCurrencyDetail();
  scheduleAlignWidgets();
}

function applyCurrency(items) {
  currencyItems = items;

  if (!selectedCurrency || !items.some((item) => item.code === selectedCurrency)) {
    selectedCurrency = items.length ? items[0].code : null;
  }

  currencyList.textContent = "";

  for (const item of items) {
    const row = document.createElement("div");
    row.className = "currency-row" + (item.code === selectedCurrency ? " selected" : "");

    const codeEl = document.createElement("span");
    codeEl.className = "currency-code";
    codeEl.textContent = item.code;

    const diffEl = document.createElement("span");
    diffEl.className = "currency-diff";
    if (Math.abs(item.diff) >= 0.01) {
      diffEl.textContent = (item.diff > 0 ? "▲ " : "▼ ") + Math.abs(item.diff).toFixed(2);
      diffEl.classList.add(item.diff > 0 ? "up" : "down");
    }

    const valueEl = document.createElement("span");
    valueEl.className = "currency-value";
    valueEl.textContent =
      item.value.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₽";

    row.append(codeEl, diffEl, valueEl);
    row.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedCurrency = item.code;
      setCurrencyExpanded(true);
      applyCurrency(currencyItems);
    });
    currencyList.appendChild(row);
  }

  currencyEl.classList.remove("hidden");
  renderCurrencyDetail();
  requestAnimationFrame(alignWidgets);
}

currencyEl.addEventListener("click", () => {
  setCurrencyExpanded(!currencyExpanded);
});

async function loadCurrency() {
  if (!settings.showCurrency) {
    currencyEl.classList.add("hidden");
    return;
  }

  const cached = readCache(CURRENCY_CACHE_KEY);
  if (cached && Array.isArray(cached.items)) {
    applyCurrency(cached.items);
    loadCurrencyHistory();
    if (Date.now() - cached.at < CURRENCY_TTL) return;
  }

  try {
    const response = await fetchWithTimeout("https://www.cbr-xml-daily.ru/daily_json.js", 8000);
    if (!response.ok) throw new Error("currency failed");
    const data = await response.json();

    const items = [];
    for (const code of CURRENCY_CODES) {
      const valute = data.Valute && data.Valute[code];
      if (!valute) continue;

      const nominal = valute.Nominal || 1;
      const value = valute.Value / nominal;
      const previous = valute.Previous / nominal;
      items.push({ code, value, diff: value - previous });
    }

    applyCurrency(items);
    writeCache(CURRENCY_CACHE_KEY, { at: Date.now(), items });
    loadCurrencyHistory();
  } catch {
    if (!cached) currencyEl.classList.add("hidden");
  }
}

function syncRail() {
  const hasOpen = Boolean(document.querySelector(".ai-panel.open, .fun-panel.open"));
  tabRail.classList.toggle("shifted", hasOpen);
  document.body.classList.toggle("panel-open", hasOpen);
}

function schedulePanelClose() {
  clearTimeout(panelCloseTimer);
  panelCloseTimer = setTimeout(closeAllPanels, 250);
}

function cancelPanelClose() {
  clearTimeout(panelCloseTimer);
}

function openPanel(panel) {
  const openPanels = Array.from(document.querySelectorAll(".ai-panel.open, .fun-panel.open")).filter(
    (item) => item !== panel
  );

  if (openPanels.length > 0) {
    panel.classList.add("no-transition");
    for (const other of openPanels) {
      other.classList.add("no-transition");
      other.classList.remove("open");
    }
    panel.classList.add("open");
    syncRail();
    void panel.offsetWidth;
    requestAnimationFrame(() => {
      panel.classList.remove("no-transition");
      for (const other of openPanels) other.classList.remove("no-transition");
    });
    return;
  }

  panel.classList.add("open");
  syncRail();
}

function closeAllPanels() {
  for (const panel of document.querySelectorAll(".ai-panel.open, .fun-panel.open")) {
    panel.classList.remove("open");
  }
  setAiEditing(false);
  setFunEditing(false);
  for (const view of customPanelViews) setCustomEditing(view, false);
  syncRail();
}

function handlePanelHover(panel) {
  cancelPanelClose();
  if (settings.hoverOpenPanels) openPanel(panel);
}

const SITE_ICON_MAP = new Map();

for (const site of [...AI_SITES, ...SOCIAL_SITES]) {
  try {
    SITE_ICON_MAP.set(new URL(site.url).hostname.replace(/^www\./, ""), site);
  } catch {}
}

function sitePresetIcon(url) {
  try {
    const host = new URL(normalizeUrl(url)).hostname.replace(/^www\./, "");
    return SITE_ICON_MAP.get(host) || null;
  } catch {
    return null;
  }
}

function fillPanelFavicon(icon, url) {
  let host = "";
  try {
    host = new URL(normalizeUrl(url)).hostname;
  } catch {}

  const fallback = () => {
    const img = document.createElement("img");
    img.alt = "";
    img.className = "fallback";
    img.src = FALLBACK_ICON;
    icon.appendChild(img);
  };

  if (!host || !hasRealHost(host)) {
    fallback();
    return;
  }

  fetchFavicon(host).then((url) => {
    if (!url) {
      fallback();
      return;
    }
    const img = document.createElement("img");
    img.alt = "";
    img.src = url;
    icon.appendChild(img);
  });
}

let aiEditing = false;
let funEditing = false;
const siteDrafts = {
  aiSites: { name: "", url: "" },
  funSites: { name: "", url: "" }
};

function createSiteIcon(site) {
  const icon = document.createElement("span");
  icon.className = "ai-icon";

  const preset = sitePresetIcon(site.url);
  if (preset) {
    icon.style.background = preset.bg;
    const parsed = new DOMParser().parseFromString(preset.svg, "image/svg+xml");
    const svg = parsed.documentElement;
    if (svg && svg.nodeName.toLowerCase() === "svg") {
      icon.appendChild(document.importNode(svg, true));
    }
  } else {
    icon.style.background = "#ffffff";
    fillPanelFavicon(icon, site.url);
  }

  return icon;
}

function savePanelSites(key) {
  chrome.storage.local.set({ [key]: settings[key] });
}

function saveCustomPanels() {
  chrome.storage.local.set({ customPanels: settings.customPanels });
}

function createPanelAddRow(listEl, sites, draftKey, editing, save) {
  if (!siteDrafts[draftKey]) {
    siteDrafts[draftKey] = { name: "", url: "" };
  }
  const draft = siteDrafts[draftKey];
  const row = document.createElement("div");
  row.className = "site-add-row";

  const name = document.createElement("input");
  name.type = "text";
  name.placeholder = "Название";
  name.value = draft.name;

  const url = document.createElement("input");
  url.type = "text";
  url.placeholder = "example.com";
  url.value = draft.url;

  name.addEventListener("input", () => {
    draft.name = name.value;
  });
  url.addEventListener("input", () => {
    draft.url = url.value;
  });

  const commit = () => {
    const value = draft.url.trim();
    if (!value) return;
    const title = draft.name.trim() || linkTitle({ url: value });
    sites.push({ name: title, url: value });
    siteDrafts[draftKey] = { name: "", url: "" };
    save();
    renderPanelList(listEl, sites, editing, draftKey, save);
  };

  const onKey = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (draft.url.trim()) commit();
    else url.focus();
  };
  name.addEventListener("keydown", onKey);
  url.addEventListener("keydown", onKey);

  row.addEventListener("focusout", (event) => {
    if (row.contains(event.relatedTarget)) return;
    if (draft.url.trim()) commit();
  });

  row.append(name, url);
  return row;
}

function renderPanelList(listEl, sites, editing, draftKey, save) {
  listEl.textContent = "";
  if (!Array.isArray(sites)) return;

  if (editing) {
    sites.forEach((site, index) => {
      const row = document.createElement("div");
      row.className = "site-edit-row";

      const label = document.createElement("span");
      label.className = "site-edit-name";
      label.textContent = site.name || linkTitle(site);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "site-remove";
      remove.textContent = "✕";
      remove.title = "Удалить";
      remove.addEventListener("click", (event) => {
        event.stopPropagation();
        sites.splice(index, 1);
        save();
        renderPanelList(listEl, sites, editing, draftKey, save);
      });

      row.append(createSiteIcon(site), label, remove);
      listEl.appendChild(row);
    });

    if (sites.length < MAX_PANEL_SITES) {
      listEl.appendChild(createPanelAddRow(listEl, sites, draftKey, editing, save));
    }
    return;
  }

  for (const site of sites) {
    const item = document.createElement("a");
    item.className = "ai-link";
    item.href = normalizeUrl(site.url);
    item.title = site.name || site.url;

    const label = document.createElement("span");
    label.textContent = site.name || linkTitle(site);

    item.append(createSiteIcon(site), label);
    listEl.appendChild(item);
  }
}

function renderAiLinks() {
  renderPanelList(aiList, settings.aiSites, aiEditing, "aiSites", () => savePanelSites("aiSites"));
}

function renderFunLinks() {
  renderPanelList(funList, settings.funSites, funEditing, "funSites", () => savePanelSites("funSites"));
}

function setAiEditing(value) {
  aiEditing = value;
  const button = document.getElementById("ai-edit");
  if (button) button.textContent = value ? "✓" : "✎";
  renderAiLinks();
}

function setFunEditing(value) {
  funEditing = value;
  const button = document.getElementById("fun-edit");
  if (button) button.textContent = value ? "✓" : "✎";
  renderFunLinks();
}

function setPanelIconNode(target, icon, fallback) {
  if (!target) return;
  target.textContent = "";
  const node = panelIconNode(icon, fallback);
  if (node) target.appendChild(node);
}

function renderPanelNames() {
  const aiName = settings.aiPanelName || "ИИ";
  const funName = settings.funPanelName || "•••";
  const aiIcon = aiHandle.querySelector(".ai-handle-icon");
  const funIcon = funHandle.querySelector(".ai-handle-icon");
  setPanelIconNode(aiIcon, settings.aiPanelIcon, "spark");
  setPanelIconNode(funIcon, settings.funPanelIcon, "game");
  aiHandle.title = aiName;
  funHandle.title = funName;
  aiPanel.setAttribute("aria-label", aiName);
  funPanel.setAttribute("aria-label", funName);
}

function renderCustomPanelView(view) {
  const editing = Boolean(customPanelEditing.get(view.config.id));
  view.editButton.textContent = editing ? "✓" : "✎";
  renderPanelList(
    view.list,
    view.config.sites,
    editing,
    "custom:" + view.config.id,
    saveCustomPanels
  );
}

function setCustomEditing(view, value) {
  customPanelEditing.set(view.config.id, value);
  renderCustomPanelView(view);
}

function renderCustomPanels() {
  const openIds = new Set(
    customPanelViews
      .filter((view) => view.panel.classList.contains("open"))
      .map((view) => view.config.id)
  );

  for (const view of customPanelViews) {
    view.panel.remove();
    view.handle.remove();
  }
  customPanelViews.length = 0;

  const configs = Array.isArray(settings.customPanels) ? settings.customPanels : [];
  for (const config of configs) {
    const panel = document.createElement("aside");
    panel.className = "ai-panel custom-panel";
    panel.id = "custom-panel-" + config.id;
    panel.setAttribute("aria-label", config.name || "Панель");

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "panel-edit";
    editButton.title = "Изменить список";

    const list = document.createElement("nav");
    list.className = "ai-list";
    panel.append(editButton, list);
    document.body.insertBefore(panel, tabRail);

    const handle = document.createElement("div");
    handle.className = "ai-handle custom-handle";
    handle.title = config.name || "Панель";
    const label = document.createElement("span");
    label.className = "ai-handle-icon";
    setPanelIconNode(label, config.icon, "grid");
    handle.appendChild(label);
    tabRail.appendChild(handle);

    const view = { config, panel, handle, list, editButton };
    customPanelViews.push(view);

    editButton.addEventListener("click", () => {
      setCustomEditing(view, !customPanelEditing.get(config.id));
    });

    handle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (panel.classList.contains("open")) closeAllPanels();
      else openPanel(panel);
    });

    handle.addEventListener("mouseenter", () => handlePanelHover(panel));
    handle.addEventListener("mouseleave", schedulePanelClose);
    panel.addEventListener("mouseenter", cancelPanelClose);
    panel.addEventListener("mouseleave", schedulePanelClose);

    if (openIds.has(config.id)) panel.classList.add("open");

    renderCustomPanelView(view);
  }

  syncRail();
}

function openDrawer(target, tab) {
  closeAllPanels();
  cancelDrawerClose();
  const src = "options.html?embed=1" + (tab ? "&tab=" + encodeURIComponent(tab) : "");
  if (tab || !drawerFrame.getAttribute("src")) {
    drawerFrame.dataset.loaded = "0";
    drawerFrame.src = src;
  }
  drawerOpen = true;
  drawerEl.classList.add("open");
  drawerBackdrop.classList.add("open");
  document.body.classList.add("drawer-open");
  bookmarksPanel.classList.remove("open");

  if (target) {
    const scrollToTarget = () => {
      try {
        const el = drawerFrame.contentWindow.document.getElementById(target);
        if (el) el.scrollIntoView({ block: "start" });
      } catch {}
    };
    if (drawerFrame.dataset.loaded === "1") scrollToTarget();
    else drawerFrame.addEventListener("load", scrollToTarget, { once: true });
  }
}

function settingsApi() {
  try {
    return drawerFrame.contentWindow.startspaceSettings || null;
  } catch {
    return null;
  }
}

function showSaveConfirm() {
  if (saveConfirm) saveConfirm.classList.remove("hidden");
}

function hideSaveConfirm() {
  if (saveConfirm) saveConfirm.classList.add("hidden");
}

function closeDrawer() {
  if (saveConfirm && !saveConfirm.classList.contains("hidden")) return;
  if (drawerOpen) {
    const api = settingsApi();
    if (api && typeof api.isDirty === "function" && api.isDirty()) {
      showSaveConfirm();
      return;
    }
  }
  forceCloseDrawer();
}

if (saveConfirmYes) saveConfirmYes.addEventListener("click", (event) => {
  event.stopPropagation();
  const api = settingsApi();
  if (api && typeof api.save === "function") api.save();
  hideSaveConfirm();
  forceCloseDrawer();
});

if (saveConfirmNo) saveConfirmNo.addEventListener("click", (event) => {
  event.stopPropagation();
  hideSaveConfirm();
  drawerFrame.dataset.loaded = "0";
  drawerFrame.removeAttribute("src");
  forceCloseDrawer();
});

function forceCloseDrawer() {
  clearTimeout(drawerCloseTimer);
  drawerOpen = false;
  drawerEl.classList.remove("open");
  drawerBackdrop.classList.remove("open");
  document.body.classList.remove("drawer-open");
}

function cancelDrawerClose() {
  clearTimeout(drawerCloseTimer);
}

function scheduleDrawerClose() {
  clearTimeout(drawerCloseTimer);
  drawerCloseTimer = setTimeout(() => {
    if (!drawerOpen) return;
    try {
      const active = drawerFrame.contentDocument && drawerFrame.contentDocument.activeElement;
      if (active && active.tagName === "SELECT") return;
    } catch {}
    closeDrawer();
  }, 500);
}

function attachDrawerHover() {
  try {
    const doc = drawerFrame.contentDocument;
    if (!doc) return;
    doc.documentElement.addEventListener("mouseenter", cancelDrawerClose);
    doc.documentElement.addEventListener("mousemove", cancelDrawerClose);
    doc.documentElement.addEventListener("pointermove", cancelDrawerClose);
    doc.documentElement.addEventListener("mouseleave", scheduleDrawerClose);
  } catch {}
}

drawerEl.addEventListener("mouseenter", cancelDrawerClose);
drawerEl.addEventListener("mousemove", cancelDrawerClose);
drawerEl.addEventListener("mouseleave", scheduleDrawerClose);
drawerFrame.addEventListener("mouseenter", cancelDrawerClose);
drawerFrame.addEventListener("mousemove", cancelDrawerClose);
drawerFrame.addEventListener("load", attachDrawerHover);

function hexToRgb(hex) {
  let value = String(hex || "#4f46e5").replace("#", "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return [
    Number.isNaN(r) ? 79 : r,
    Number.isNaN(g) ? 70 : g,
    Number.isNaN(b) ? 229 : b
  ];
}

function applyAccentColor() {
  const base = settings.accentColor || "#4f46e5";
  const [r, g, b] = hexToRgb(base);
  const tint = 0.35;
  const pr = Math.round(13 * (1 - tint) + r * tint);
  const pg = Math.round(17 * (1 - tint) + g * tint);
  const pb = Math.round(23 * (1 - tint) + b * tint);

  document.documentElement.style.setProperty("--accent", base);
  document.documentElement.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);
  document.documentElement.style.setProperty("--panel-rgb", `${pr}, ${pg}, ${pb}`);
}

function applyTextColor() {
  document.documentElement.style.setProperty("--ui-text", settings.uiTextColor || "#e6e9ef");
}

function bookmarkIcon(url, label) {
  const wrap = document.createElement("span");
  wrap.className = "bookmark-icon";

  const fallback = () => {
    wrap.classList.add("letter");
    wrap.textContent = (label || "?").trim().charAt(0).toUpperCase();
  };

  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {}

  if (!host || !hasRealHost(host)) {
    fallback();
    return wrap;
  }

  fetchFavicon(host).then((iconUrl) => {
    if (!iconUrl) {
      fallback();
      return;
    }
    const img = document.createElement("img");
    img.alt = "";
    img.src = iconUrl;
    wrap.appendChild(img);
  });

  return wrap;
}

function showBookmarksEmpty(text) {
  bookmarksList.textContent = "";
  const empty = document.createElement("div");
  empty.className = "bookmarks-empty";
  empty.textContent = text;
  bookmarksList.appendChild(empty);
}

function renderBookmarkItems(items) {
  bookmarksList.textContent = "";

  for (const item of items) {
    const link = document.createElement("a");
    link.className = "bookmark-item";
    link.href = item.url;
    link.title = item.title || item.url;

    const title = document.createElement("span");
    title.className = "bookmark-title";
    title.textContent = item.title || item.url;

    link.append(bookmarkIcon(item.url, item.title || item.url), title);
    bookmarksList.appendChild(link);
  }
}

function showBookmarksEmpty(text) {
  bookmarksList.textContent = "";
  const empty = document.createElement("div");
  empty.className = "bookmarks-empty";
  empty.textContent = text;
  bookmarksList.appendChild(empty);
}

function renderBookmarks() {
  if (!chrome.bookmarks) {
    showBookmarksEmpty("Закладки недоступны");
    return;
  }

  if (Date.now() - bookmarksCachedAt < BOOKMARKS_TTL && bookmarksCache.length > 0) {
    renderBookmarkItems(bookmarksCache);
    return;
  }

  chrome.bookmarks.getTree((tree) => {
    if (chrome.runtime.lastError) {
      showBookmarksEmpty("Закладки недоступны");
      return;
    }

    const items = [];
    const walk = (nodes) => {
      for (const node of nodes) {
        if (node.url) items.push(node);
        else if (node.children) walk(node.children);
      }
    };
    walk(tree);

    const seen = new Set();
    const unique = items
      .filter((item) => {
        if (seen.has(item.url)) return false;
        seen.add(item.url);
        return true;
      })
      .slice(0, 50);

    bookmarksCachedAt = Date.now();
    bookmarksCache = unique;

    if (unique.length === 0) {
      showBookmarksEmpty("Пока нет закладок");
      return;
    }

    renderBookmarkItems(unique);
  });
}

function applyClockStyle() {
  const opacity = typeof settings.clockOpacity === "number" ? settings.clockOpacity : 100;
  const weight = typeof settings.clockWeight === "number" ? settings.clockWeight : 200;
  clockEl.style.opacity = String(opacity / 100);
  clockEl.style.fontWeight = String(weight);
}

function applyLinkShape() {
  document.body.dataset.linkShape = settings.linkShape || "oval";
  document.body.classList.add("link-icons-glass");
}

function applyWidgetStyle() {
  const transparency = Math.min(
    100,
    Math.max(0, Number(settings.widgetTransparency) || 0)
  );
  const factor = 1 - transparency / 100;

  document.documentElement.style.setProperty("--widget-alpha", String(0.12 * factor));
  document.documentElement.style.setProperty("--widget-alpha-dark", String(0.55 * factor));
}

function applyAll() {
  applyAccentColor();
  applyTextColor();
  applyClockStyle();
  applyLinkShape();
  applyWidgetStyle();
  applyBackground();
  renderClock();
  renderSearch();
  renderLinks();
  loadWeather();
  loadCurrency();
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  const engine = SEARCH_ENGINES[settings.searchEngine] || SEARCH_ENGINES.google;
  location.href = engine.url + encodeURIComponent(query);
});

aiModeBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  const params = new URLSearchParams({ udm: "50" });
  if (query) params.set("q", query);
  location.href = "https://www.google.com/search?" + params;
});

function setVoiceListening(value) {
  voiceListening = value;
  voiceBtn.classList.toggle("listening", value);
  voiceBtn.title = value ? "Остановить голосовой ввод" : "Голосовой поиск";
}

function showVoiceStatus(text, duration = 2600) {
  if (!voiceStatus) return;
  voiceStatus.textContent = text;
  voiceStatus.classList.add("visible");
  clearTimeout(voiceStatusTimer);
  if (duration > 0) {
    voiceStatusTimer = setTimeout(hideVoiceStatus, duration);
  }
}

function hideVoiceStatus() {
  if (!voiceStatus) return;
  clearTimeout(voiceStatusTimer);
  voiceStatusTimer = null;
  voiceStatus.classList.remove("visible");
}

async function toggleVoiceSearch() {
  if (!SpeechRecognitionApi) return;

  if (voiceRecognition) {
    try {
      voiceRecognition.stop();
    } catch {}
    voiceRecognition = null;
    setVoiceListening(false);
    hideVoiceStatus();
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showVoiceStatus("Микрофон недоступен в этом браузере.");
    return;
  }

  showVoiceStatus("Запрашиваю доступ к микрофону…", 0);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
  } catch {
    showVoiceStatus("Разрешите доступ к микрофону в настройках браузера.");
    return;
  }

  const recognition = new SpeechRecognitionApi();
  recognition.lang = "ru-RU";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    setVoiceListening(true);
    showVoiceStatus("Слушаю…", 0);
  };

  recognition.onresult = (event) => {
    const result = event.results && event.results[0] && event.results[0][0];
    const text = result ? result.transcript.trim() : "";
    if (!text) {
      showVoiceStatus("Речь не распознана. Попробуйте ещё раз.");
      return;
    }
    hideVoiceStatus();
    searchInput.value = text;
    if (typeof searchForm.requestSubmit === "function") {
      searchForm.requestSubmit();
    } else {
      searchForm.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  recognition.onerror = (event) => {
    setVoiceListening(false);
    voiceRecognition = null;
    const code = event && event.error;
    if (code === "not-allowed" || code === "service-not-allowed") {
      showVoiceStatus("Нет доступа к микрофону.");
    } else if (code === "no-speech") {
      showVoiceStatus("Речь не распознана. Попробуйте ещё раз.");
    } else if (code === "audio-capture") {
      showVoiceStatus("Микрофон не найден.");
    } else if (code === "network") {
      showVoiceStatus("Сервис распознавания недоступен в этом браузере.");
    } else if (code !== "aborted") {
      showVoiceStatus("Не удалось распознать речь.");
    }
  };

  recognition.onend = () => {
    setVoiceListening(false);
    voiceRecognition = null;
    if (voiceStatus && voiceStatus.classList.contains("visible") && voiceStatus.textContent === "Слушаю…") {
      hideVoiceStatus();
    }
  };

  voiceRecognition = recognition;
  try {
    recognition.start();
  } catch {
    voiceRecognition = null;
    setVoiceListening(false);
    showVoiceStatus("Не удалось запустить микрофон.");
  }
}

voiceBtn.addEventListener("click", toggleVoiceSearch);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (saveConfirm && !saveConfirm.classList.contains("hidden")) {
      hideSaveConfirm();
      return;
    }
    if (drawerOpen) {
      closeDrawer();
      return;
    }
    if (bookmarksPanel.classList.contains("open")) {
      bookmarksPanel.classList.remove("open");
      return;
    }
    if (document.querySelector(".ai-panel.open")) {
      closeAllPanels();
      return;
    }
    if (document.activeElement === searchInput) {
      searchInput.blur();
      return;
    }
  }
  if (drawerOpen) return;
  if (!settings.showSearch) return;
  if (event.ctrlKey || event.altKey || event.metaKey || event.isComposing) return;
  if (event.key.length !== 1) return;
  const active = document.activeElement;
  if (
    active &&
    (active.tagName === "INPUT" ||
      active.tagName === "TEXTAREA" ||
      active.tagName === "SELECT" ||
      active.isContentEditable)
  ) {
    return;
  }
  searchInput.focus();
});

settingsBtn.addEventListener("click", () => {
  if (drawerOpen) closeDrawer();
  else openDrawer();
});

settingsBtn.addEventListener("mouseenter", () => {
  cancelDrawerClose();
  if (settings.hoverOpenPanels && !drawerOpen) openDrawer();
});

settingsBtn.addEventListener("mouseleave", () => {
  if (settings.hoverOpenPanels) scheduleDrawerClose();
});

function toggleWeather() {
  const expanded = weatherEl.classList.toggle("expanded");
  weatherEl.setAttribute("aria-expanded", expanded ? "true" : "false");
  scheduleAlignWidgets();
}

weatherEl.addEventListener("click", toggleWeather);
weatherEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    event.stopPropagation();
    toggleWeather();
  }
});
aiHandle.addEventListener("click", (event) => {
  event.stopPropagation();
  if (aiPanel.classList.contains("open")) closeAllPanels();
  else openPanel(aiPanel);
});

funHandle.addEventListener("click", (event) => {
  event.stopPropagation();
  if (funPanel.classList.contains("open")) closeAllPanels();
  else openPanel(funPanel);
});

aiHandle.addEventListener("mouseenter", () => handlePanelHover(aiPanel));
funHandle.addEventListener("mouseenter", () => handlePanelHover(funPanel));

for (const el of [aiPanel, funPanel, tabRail]) {
  el.addEventListener("mouseenter", cancelPanelClose);
  el.addEventListener("mouseleave", schedulePanelClose);
}

document.addEventListener("click", (event) => {
  const path = typeof event.composedPath === "function" ? event.composedPath() : [];

  const insidePanel = path.some(
    (node) =>
      node &&
      (node.id === "tab-rail" ||
        (node.classList &&
          (node.classList.contains("ai-panel") ||
            node.classList.contains("fun-panel") ||
            node.classList.contains("ai-handle") ||
            node.classList.contains("fun-handle"))))
  );
  if (!insidePanel) {
    closeAllPanels();
  }

  const insideBookmarks = path.some((node) => node && node.id === "bookmarks");
  if (!insideBookmarks) {
    bookmarksPanel.classList.remove("open");
  }
});

document.getElementById("side-backdrop").addEventListener("click", () => {
  closeAllPanels();
});

bookmarksBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  const willOpen = !bookmarksPanel.classList.contains("open");
  bookmarksPanel.classList.toggle("open", willOpen);
  if (willOpen) renderBookmarks();
});

if (chrome.bookmarks) {
  const invalidateBookmarks = () => {
    bookmarksCachedAt = 0;
    bookmarksCache = [];
    if (bookmarksPanel.classList.contains("open")) renderBookmarks();
  };
  chrome.bookmarks.onCreated.addListener(invalidateBookmarks);
  chrome.bookmarks.onRemoved.addListener(invalidateBookmarks);
  chrome.bookmarks.onChanged.addListener(invalidateBookmarks);
  chrome.bookmarks.onMoved.addListener(invalidateBookmarks);
}

document.getElementById("ai-edit").addEventListener("click", () => {
  setAiEditing(!aiEditing);
});

document.getElementById("fun-edit").addEventListener("click", () => {
  setFunEditing(!funEditing);
});

if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);

drawerFrame.addEventListener("load", () => {
  if (drawerFrame.getAttribute("src")) drawerFrame.dataset.loaded = "1";
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;

  const keys = Object.keys(changes);
  for (const key of keys) {
    settings[key] = changes[key].newValue;
  }

  if (keys.some((key) => ["backgroundType", "gradient", "gradientStart", "gradientEnd", "gradientAngle", "color", "imageUrl", "imageDim", "imageBlur"].includes(key))) {
    applyBackground();
  }
  if (keys.some((key) => ["showClock", "clock24h", "showSeconds", "showDate", "clockOpacity", "clockWeight"].includes(key))) {
    applyClockStyle();
    renderClock();
  }
  if (keys.some((key) => ["showSearch", "voiceSearch", "showAiMode"].includes(key))) {
    renderSearch();
  }
  if (keys.some((key) => ["links", "showLinks"].includes(key))) {
    renderLinks();
  }
  if (keys.includes("linkShape")) {
    applyLinkShape();
  }
  if (keys.includes("aiSites")) {
    renderAiLinks();
  }
  if (keys.includes("funSites")) {
    renderFunLinks();
  }
  if (keys.some((key) => ["aiPanelName", "funPanelName", "aiPanelIcon", "funPanelIcon"].includes(key))) {
    renderPanelNames();
  }
  if (keys.includes("customPanels")) {
    renderCustomPanels();
  }
  if (keys.includes("accentColor")) {
    applyAccentColor();
  }
  if (keys.includes("uiTextColor")) {
    applyTextColor();
  }
  if (keys.some((key) => ["showWeather", "weatherLat", "weatherLon", "weatherCity"].includes(key))) {
    try {
      localStorage.removeItem(WEATHER_CACHE_KEY);
    } catch {}
    loadWeather();
  }
  if (keys.includes("showCurrency")) {
    loadCurrency();
  }
  if (keys.includes("widgetTransparency")) {
    applyWidgetStyle();
  }
});

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
systemTheme.addEventListener("change", () => {
  if (settings.backgroundType === "system") applyBackground();
});

window.addEventListener("resize", () => requestAnimationFrame(alignWidgets));

document.addEventListener("visibilitychange", () => {
  if (settings.backgroundType !== "image" || settings.imageType !== "video" || !settings.imageUrl) {
    return;
  }
  if (document.hidden) {
    bgVideo.pause();
  } else {
    bgVideo.play().catch(() => {});
  }
});

loadSettings((items) => {
  settings = items;
  applyAll();
  focusSearch();
  renderAiLinks();
  renderFunLinks();
  renderPanelNames();
  renderCustomPanels();
});

function scheduleFocusSearch() {
  focusSearch();
  for (const delay of [80, 200, 400]) {
    setTimeout(focusSearch, delay);
  }
}

window.addEventListener("load", scheduleFocusSearch);

setInterval(() => {
  if (!document.hidden) renderClock();
}, 1000);

setInterval(() => {
  if (!document.hidden) loadWeather();
}, 30 * 60 * 1000);

setInterval(() => {
  if (!document.hidden) loadCurrency();
}, 60 * 60 * 1000);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) return;
  renderClock();
  loadWeather();
  loadCurrency();
});
