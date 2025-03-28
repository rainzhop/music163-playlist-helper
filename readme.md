# 网易云音乐歌单导出助手（Chrome插件）

## 引言

这是一个Chrome扩展程序，旨在帮助用户从网易云音乐导出歌单，并提供下载歌单封面原图和制作歌单中曲目专辑封面拼图等额外功能。

## 功能特点

- **导出歌单曲目列表**：轻松导出任何网易云音乐歌单的曲目列表。请注意，导出功能受到网易云音乐的一些限制：
  - 自己创建的歌单：可抓取曲目最多1000首
  - 他人创建的歌单：可抓取曲目最多20首（当然，你可以将这些歌单收藏到自己的歌单中进行导出）
- **下载歌单封面**：下载歌单封面的原始图片。
- **制作专辑封面拼图**：为歌单中的曲目生成专辑封面拼图。就像这样：
  ![专辑封面拼图](collage_example.jpg)

## 安装指南

1. 克隆仓库：
```bash
git clone https://github.com/rainzhop/music163-playlist-helper.git
```

2. 打开Chrome浏览器，访问`chrome://extensions/`。
3. 在右上角启用“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择你克隆仓库的目录。
5. 扩展程序现在应该已经安装完毕。

## 使用方法

1. 打开网易云音乐网页版，并进入到你想要导出的歌单。
2. 点击Chrome扩展程序图标。
3. 点击“👇获取歌单信息”。
4. 选择所需操作：
   - **导出歌单曲目列表**：曲目列表将以csv文件形式导出。请留意上述导出限制。
   - **下载歌单封面原图**：封面图片将下载到你的设备。
   - **制作专辑封面拼图**：将生成专辑封面拼图并显示。请留意，我在专辑封面图片的加载中加了点延迟，因此拼图制作较慢。

---

如果你发现这个扩展不可用了，烦请提个小issue～

顺便推荐一个我超喜欢的纯音歌单：[纯音魔法/沉浸式学习/云端图书馆](https://music.163.com/playlist?id=10050208776)