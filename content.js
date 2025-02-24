// 广告过滤脚本
(function() {
  // 根据网站定义不同的广告选择器
  const adSelectorsByHost = {
      'x.com': [
          'div[data-testid="placementTracking"]',  // X.com 广告容器
          'article div[aria-label*="Promoted"]',    // X.com 推广内容
          'div[class*="ad-"]',                     // 类名包含 "ad-"
          'div[role="presentation"] a[href*="/i/"]' // 广告链接特征
      ],
      'zerohedge.com': [
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
      ]
  };

  // 获取当前网站的 hostname
  const hostname = window.location.hostname;
  let adSelectors = [];

  // 根据 hostname 选择对应的 adSelectors
  for (const host in adSelectorsByHost) {
      if (hostname.includes(host)) {
          adSelectors = adSelectorsByHost[host];
          break;
      }
  }

  // 如果没有匹配到网站，退出
  if (adSelectors.length === 0) {
      console.log('No ad selectors defined for this site.');
      return;
  }

  // 创建 MutationObserver 监控 DOM 变化
  const observer = new MutationObserver((mutations) => {
      removeAds();
  });

  // 开始观察整个文档的变化
  observer.observe(document.body, {
      childList: true,
      subtree: true
  });

  // 移除广告的函数
  function removeAds() {
      adSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
              if (el && el.parentNode) {
                  el.parentNode.removeChild(el);
                  console.log(`Removed ad element: ${selector} on ${hostname}`);
              }
          });
      });
  }

  // 页面加载时立即执行一次
  removeAds();
})();
