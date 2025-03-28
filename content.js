chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPlaylistInfo") {
    const iframe = document.getElementById("g_iframe");
    const mInfoElements =
      iframe.contentWindow.document.querySelectorAll(".m-info");
    const mInfo = mInfoElements[0];

    let playlistInfo = {
      ok: false,
      title: null,
      cover: null,
    };

    if (mInfo) {
      const titleElements = mInfo.querySelectorAll("h2"); // 歌单名称
      const coverElements = mInfo.querySelectorAll(".cover img"); // 歌单封面

      if ((titleElements.length > 0) & (coverElements.length > 0)) {
        playlistInfo.ok = true;
        playlistInfo.title = titleElements[0].innerText;
        playlistInfo.cover = coverElements[0].src;
      }
    }

    sendResponse({ playlistInfo: playlistInfo });
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "exportPlaylistAsTxt") {
    const iframe = document.getElementById("g_iframe");
    const mTableElements =
      iframe.contentWindow.document.querySelectorAll(".m-table");
    const mTable = mTableElements[0];

    if (!mTable) {
        sendResponse({ playlistTxt: null });
        return false;
    }

    if (mTable.rows.length == 0) {
        sendResponse({ playlistTxt: null });
        return false;
    }

    let playlistTxt = ",歌曲标题,时长,歌手,专辑\n";
    for (let i = 0; i < mTable.rows.length; i++) {
      if (i == 0) continue;
      const row = mTable.rows[i];
      let rowString = "";
      for (let j = 0; j < row.cells.length; j++) {
        const cell = row.cells[j];

        // 克隆单元格，以便修改而不影响原始表格
        const cellClone = cell.cloneNode(true);

        // 移除所有 class 为 "soil" 的元素
        const soilElements = cellClone.querySelectorAll(".soil");
        soilElements.forEach((element) => {
          element.remove();
        });

        // 移除所有 class 为 "icn" 的元素
        const icnshareElements = cellClone.querySelectorAll(".icn");
        icnshareElements.forEach((element) => {
          element.remove();
        });

        let cellText = cellClone.textContent.trim(); // 获取单元格文本内容并去除首尾空格

        // CSV 转义特殊字符 (如果需要更复杂的转义，可以扩展这个部分)
        cellText = cellText.replace(/"/g, '""'); // 将双引号替换为两个双引号
        if (
          cellText.includes(",") ||
          cellText.includes("\n") ||
          cellText.includes("\t") ||
          cellText.includes('"')
        ) {
          cellText = `"${cellText}"`; // 如果包含逗号、换行符、制表符或双引号，则用双引号包裹
        }

        rowString += cellText;

        // 添加制表符分隔符，除了行末尾的最后一个单元格
        if (j < row.cells.length - 1) {
          rowString += ",";
        }
      }

      playlistTxt += rowString + "\n"; // 添加换行符
    }

    sendResponse({ playlistTxt: playlistTxt });
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPlaylistAlbumIds") {
      const iframe = document.getElementById("g_iframe");
      const mTableElements =
        iframe.contentWindow.document.querySelectorAll(".m-table");
      const mTable = mTableElements[0];
  
      if (!mTable) {
          sendResponse({ playlistTxt: null });
          return false;
      }
  
      if (mTable.rows.length == 0) {
          sendResponse({ playlistTxt: null });
          return false;
      }
  
      let albumLinks = [];
      for (let i = 0; i < mTable.rows.length; i++) {
        if (i == 0) continue;
        const row = mTable.rows[i];
        const cell = row.cells[row.cells.length-1];
        const albumLink = cell.querySelectorAll("a")[0].href;
        albumLinks.push(albumLink);
      }
      albumLinks = [...new Set(albumLinks)]
      console.log(albumLinks);
      sendResponse({ albumLinks: albumLinks });
    }
    return true;
  });
  