declare global {
  interface Window {
    LencoPay: any;
  }
}

export function loadLencoScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.LencoPay) return resolve();

    const script = document.createElement("script");
    script.src = "https://pay.sandbox.lenco.co/js/v1/inline.js";
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Lenco script"));

    document.body.appendChild(script);
  });
}
