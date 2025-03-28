document.addEventListener("DOMContentLoaded", function () {
  // const albumLinksContainer = document.getElementById("albumLinksContainer");
  const albumCoverContainer = document.getElementById("albumCoverContainer");

  chrome.storage.session.get(["albumLinks"], function (result) {
    const albumLinks = result.albumLinks;

    if (albumLinks && albumLinks.length > 0) {
      // 遍历 URL 列表，并创建列表项
      // albumLinks.forEach((link) => {
      //   const listItem = document.createElement("li");
      //   listItem.textContent = link;
      //   albumLinksContainer.appendChild(listItem);
      // });

      // 异步函数，用于延迟
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      // 异步函数，用于提取图片
      async function extractImage(url) {
        try {
          const response = await fetch(url);
          const html = await response.text();
          const parser = new DOMParser();
          const coverElement = parser
            .parseFromString(html, "text/html")
            .querySelector(".cover img");

          if (coverElement) {
            const img = document.createElement("img");
            img.src = coverElement.src;
            img.classList.add("cover");
            img.addEventListener("click", function () {
              this.style.display = "none";
            });
            albumCoverContainer.appendChild(img);
          }
        } catch (error) {
          console.error("获取链接内容时出错:", error);
        }
      }

      // 串行提取图片
      async function makeCollage() {
        for (const link of albumLinks) {
          const randomDelay = Math.random() * 1000 + 500; // 1 到 2 秒
          await delay(randomDelay); // 延迟
          await extractImage(link); // 提取图片
        }
      }

      makeCollage(); // 开始处理 URL
    }
  });
});
