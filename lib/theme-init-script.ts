/** Runs before hydration to set theme data-attrs from the URL (avoids FOUC). */
export const themeInitScript = `
(function () {
  try {
    var p = window.location.pathname || "/";
    var theme = "dark", display = "sans", accent = "cobalt";
    if (p.indexOf("/product") !== -1) { theme = "light"; accent = "oxblood"; display = "sans"; }
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.display = display;
    root.dataset.accent = accent;
  } catch (e) {}
})();
`;
