console.log("ZeroHedge Ad Blocker content script loaded.");

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM content loaded, starting ad filtering...");
  filterAds();
});

function filterAds() {
  const adSelectors = [
    'section[class^="Sidebar"]',
    'section[class^="sidebar"]',
    'section[class^="PromoButton_promoButton"]',
    'section[class^="DebateButton_promoButton"]',
    'a[class^="ListFrontPage_storePromo"]',
    'div[class^="Feature"]',
    'div[class^="pack"]',
    'div[class^="leaderboard-tablet-container"]',
    'div[class^="PromoBanner"]',
    'div[class^="native"]',
    'div[class^="banner"]',
    'div[class^="Advert"]',
    'div[class^="bottom-banner-container"]',
    'div[class^="MidArticle"]',
    'div[class^="Sponsor"]',
    'div[class^="Article_stickyContainer"]',
    'h3[class^="Sponsor"]',
    'div[class^="BlockComments"]',
    'footer[class^="ArticleFull"]',
    'footer[class^="Footer_containe"]',
    'ins[class^="adsby"]',
    'div[class^="PremiumOverlay"]'
  ];

  adSelectors.forEach(selector => {
    const adElements = document.querySelectorAll(selector);
    if (adElements.length > 0) {
      console.log(`Found ${adElements.length} ad elements with selector: ${selector}`);
      adElements.forEach(element => {
        element.remove(); // 删除匹配的元素
        console.log("Removed ad element:", element);
      });
    } else {
      console.log(`No ad elements found with selector: ${selector}`);
    }
  });

  console.log("Ad filtering completed (initial pass).");
}

// ------------------------------------------------------------------
//  !!! 可选增强 - 使用 MutationObserver 监听 DOM 变化 !!!
//  如果网站使用 JavaScript 动态加载广告，
//  DOMContentLoaded 事件后出现的广告可能无法被立即过滤。
//  可以使用 MutationObserver 监听 DOM 变化，并在有新节点添加时
//  再次运行 filterAds() 进行过滤。
// ------------------------------------------------------------------
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      console.log("DOM mutation detected (childList added), re-filtering ads...");
      filterAds(); // 再次运行广告过滤
    }
  });
});

observer.observe(document.body, { // 监听 body 元素及其子元素的变动
  childList: true, // 监听子节点的添加和删除
  subtree: true    // 监听所有后代节点
});
// ------------------------------------------------------------------