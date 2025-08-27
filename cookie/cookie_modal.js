function initCookieModal() {
    function saveConsent(consentObj) {
      localStorage.setItem("cookieConsent", JSON.stringify(consentObj));
      applyConsent(consentObj); // <-- применяем сразу
    }
  
    function getConsent() {
      const data = localStorage.getItem("cookieConsent");
      if (!data) return null;
      try {
        return JSON.parse(data);
      } catch(e) {
        if (data === "accepted") return {functional:true, analytics:true, marketing:true};
        if (data === "declined") return {functional:true, analytics:false, marketing:false};
        return null;
      }
    }
  
    function showModal() {
      const overlay = document.getElementById("cc-overlay");
      const modal = document.getElementById("cc-modal");
      overlay.style.display = "flex";
      setTimeout(() => modal.classList.add("show"), 50);
    }
  
    function hideModal() {
      const overlay = document.getElementById("cc-overlay");
      const modal = document.getElementById("cc-modal");
      modal.classList.remove("show");
      setTimeout(() => overlay.style.display = "none", 400);
    }
  
    const consent = getConsent();
    const prefs = document.getElementById("cc-preferences");
  
    if (!consent) showModal();
    else applyConsent(consent); // <-- применяем сразу при загрузке
  
    document.getElementById("cc-accept").addEventListener("click", function(){
      saveConsent({functional:true, analytics:true, marketing:true});
      hideModal();
    });
  
    document.getElementById("cc-decline").addEventListener("click", function(){
      saveConsent({functional:true, analytics:false, marketing:false});
      hideModal();
    });
  
    document.getElementById("cc-manage").addEventListener("click", function(){
      prefs.style.display = prefs.style.display === "block" ? "none" : "block";
    });
  
    document.getElementById("cc-save").addEventListener("click", function(){
      const analytics = document.getElementById("cc-analytics").checked;
      const marketing = document.getElementById("cc-marketing").checked;
      saveConsent({functional:true, analytics, marketing});
      hideModal();
    });
  
    // -------------------- Новая функция --------------------
    function applyConsent(consentObj) {
      // Google Analytics
      if (!consentObj.analytics) {
        window['ga-disable-G-B6FFWRDQWC'] = true; // замените на свой ID GA
        const gaScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag"]');
        gaScripts.forEach(s => s.remove());
      }
  
      // Google Maps
      if (!consentObj.marketing) {
        const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
        mapIframes.forEach(iframe => {
          iframe.style.display = "none"; // можно просто скрыть карту
        });
      }
    }
  }
  