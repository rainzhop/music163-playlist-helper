document
  .getElementById("getPlaylistInfoButton")
  .addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getPlaylistInfo" },
        (response) => {
          if (chrome.runtime.lastError) {
            document.getElementById("msg").textContent =
              "歌单信息获取失败，请刷新歌单页面重试...";
            return;
          }

          if (response && response.playlistInfo && response.playlistInfo.ok) {
            document.getElementById("title").textContent =
              response.playlistInfo.title;
            document.getElementById("cover").src = response.playlistInfo.cover;
            document.getElementById("msg").textContent = "";
            document.getElementById("playlistInfo").style.display = "block";
          } else {
            document.getElementById("msg").textContent = "歌单信息获取失败...";
          }
        }
      );
    });
  });

document.getElementById("exportPlaylistAsTxt").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "exportPlaylistAsTxt" },
      (response) => {
        if (chrome.runtime.lastError) {
          document.getElementById("msg").textContent =
            "歌单信息获取失败，请刷新歌单页面重试...";
          return;
        }

        if (response && response.playlistTxt) {
          //  将 CSV 数据下载为文件
          function downloadCSV(csv, filename) {
            const csvFile = new Blob([csv], { type: "text/csv" });
            const downloadLink = document.createElement("a");

            downloadLink.download = filename;
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }

          downloadCSV(response.playlistTxt, "playlist.csv");
        } else {
          document.getElementById("msg").textContent = "歌单信息获取失败...";
        }
      }
    );
  });
});

document
  .getElementById("downloadPlaylistCover")
  .addEventListener("click", () => {
    const coverImage = document.getElementById("cover");

    if (coverImage && coverImage.tagName === "IMG") {
      const imageUrl = coverImage.src.replace(/\?param=200y200$/, ""); // 获取图片 URL
      const imageName = "playlist_cover.jpg"; // 你可以自定义文件名

      // 使用 fetch 获取图片数据
      fetch(imageUrl)
        .then((response) => response.blob()) // 将响应转换为 Blob 对象
        .then((blob) => {
          // 创建一个指向 Blob 对象的 URL
          const blobUrl = URL.createObjectURL(blob);

          // 创建一个临时的 <a> 元素进行下载
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = imageName;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // 释放 URL 对象
          URL.revokeObjectURL(blobUrl);
        });
    }
  });

document
  .getElementById("OpenAlbumCoverCollage")
  .addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getPlaylistAlbumIds" },
        (response) => {
          if (chrome.runtime.lastError) {
            document.getElementById("msg").textContent =
              "歌单信息获取失败，请刷新歌单页面重试...";
            return;
          }

          if (response && response.albumLinks) {
            chrome.storage.session.set({ albumLinks: response.albumLinks }, function () {
                chrome.tabs.create({ url: "collage.html" });
              });
          } else {
            document.getElementById("msg").textContent =
              "专辑封面拼图制作失败...";
          } 
        }
      );
    });
  });
