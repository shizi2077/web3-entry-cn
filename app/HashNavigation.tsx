const hashNavigationScript = String.raw`
(() => {
  if (window.__web3HashNavigationInstalled) return;
  window.__web3HashNavigationInstalled = true;

  const targetFor = (hash) => {
    if (!hash || hash === "#") return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return null;
    }
  };

  const scrollToHash = (hash) => {
    const target = targetFor(hash);
    if (!target) return false;

    const header = document.querySelector(".site-header");
    const offset = (header ? header.getBoundingClientRect().height : 0) + 8;
    const top = target.id === "top"
      ? 0
      : Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);

    window.scrollTo(0, top);
    return true;
  };

  const settleAt = (hash) => {
    scrollToHash(hash);
    window.requestAnimationFrame(() => scrollToHash(hash));
  };

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const origin = event.target instanceof Element ? event.target : null;
    const anchor = origin?.closest('a[href*="#"]');
    if (!anchor || anchor.hasAttribute("download")) return;
    if (anchor.target && anchor.target !== "_self") return;

    const destination = new URL(anchor.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      destination.pathname !== window.location.pathname ||
      destination.search !== window.location.search ||
      !destination.hash ||
      !targetFor(destination.hash)
    ) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    settleAt(destination.hash);
    window.history.replaceState(
      window.history.state,
      "",
      destination.pathname + destination.search,
    );
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, true);

  const restoreCurrentHash = () => {
    const hash = window.location.hash;
    if (!hash) return;
    settleAt(hash);
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.search,
    );
  };

  window.addEventListener("hashchange", restoreCurrentHash);
  window.addEventListener("popstate", restoreCurrentHash);
  window.addEventListener("pageshow", restoreCurrentHash);
  document.addEventListener("DOMContentLoaded", restoreCurrentHash, { once: true });
})();
`;

export function HashNavigation() {
  return (
    <script
      id="hash-navigation"
      dangerouslySetInnerHTML={{ __html: hashNavigationScript }}
    />
  );
}
