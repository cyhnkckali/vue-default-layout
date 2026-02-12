function getHighestZindex(el: HTMLElement) {
  let bufferNode: Node | null = el as Node;
  let buffer = el;
  while (bufferNode && bufferNode !== document) {
    // Ignore z-index if position is set to a value where z-index is ignored by the browser
    // This makes behavior of this function consistent across browsers
    // WebKit always returns auto if the element is positioned
    const position = buffer.style.getPropertyValue("position");
    if (position === "absolute" || position === "relative" || position === "fixed") {
      // IE returns 0 when zIndex is not specified
      // other browsers return a string
      // we ignore the case of nested elements with an explicit value of 0
      // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
      const value = parseInt(buffer.style.getPropertyValue("z-index"));
      if (!isNaN(value) && value !== 0) {
        return value;
      }
    }

    bufferNode = bufferNode.parentNode;
    buffer = bufferNode as HTMLElement;
  }
  return null;
}

function getViewPort(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function asideOpenOrClose() {
  const aside = document.querySelector("aside");

  if (aside?.getAttribute("data-aside-open") == "false") {
    aside.setAttribute("data-aside-open", "true");
  } else {
    aside?.setAttribute("data-aside-open", "false");
  }
}

function isUserUsingMobile() {
  // User agent string method
  let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  // Screen resolution method
  if (!isMobile) {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    isMobile = screenWidth < 768 || screenHeight < 768;
  }

  // Touch events method
  if (!isMobile) {
    isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  // CSS media queries method
  if (!isMobile) {
    const bodyElement = document.getElementsByTagName("body")[0];

    if (bodyElement) {
      isMobile =
        window.getComputedStyle(bodyElement).getPropertyValue("content").indexOf("mobile") !== -1;
    }
  }

  return isMobile;
}

function setToThemeMetaTag(theme: "light" | "dark") {
  const themeMetaTag = document.querySelector("#meta-theme-color");

  if (theme == "light") {
    themeMetaTag?.setAttribute("content", "#ffffff");
  } else {
    themeMetaTag?.setAttribute("content", "#020617"); // Dark mode color
  }
}

function getAssetPath(path: string): string {
  return import.meta.env.BASE_URL + path;
}

export {
  getHighestZindex,
  getViewPort,
  asideOpenOrClose,
  isUserUsingMobile,
  setToThemeMetaTag,
  getAssetPath,
};
