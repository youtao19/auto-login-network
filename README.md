# Auto login Chrome Extension

在你访问苏州城市学院校园网认证界面时，此插件将自动填写用户名和密码，并点击登录按钮，帮助你快速完成认证过程。

## 使用方法
1. 你可以下载插件的压缩包，并解压到本地。   
2. 打开 Chrome 浏览器，进入 `chrome://extensions/` 页面，启用开发者模式。
3. 点击“加载已解压的扩展程序”，选择解压后的文件夹
4. 插件将自动安装并启用,初次使用你需要点击插件图标进行配置。
5. 在弹出的配置界面中，输入你的校园网用户名和密码，并保存。
6. 之后每次访问校园网认证界面时，插件将自动填写你的用户名和密码，并点击登录按钮，帮助你快速完成认证过程。

## Features

- Vue 3 with `<script setup>` syntax
- TypeScript support
- Vite build tool
- CRXJS Vite plugin integration
- Chrome extension manifest configuration

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open Chrome and navigate to `chrome://extensions/`, enable "Developer mode", and load the unpacked extension from the `dist` directory.

4. Build for production:

```bash
npm run build
```

## Project Structure

- `src/popup/` - Extension popup UI
- `src/content/` - Content scripts
- `manifest.config.ts` - Chrome extension manifest configuration

## Documentation

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [CRXJS Documentation](https://crxjs.dev/vite-plugin)

## Chrome Extension Development Notes

- Use `manifest.config.ts` to configure your extension
- The CRXJS plugin automatically handles manifest generation
- Content scripts should be placed in `src/content/`
- Popup UI should be placed in `src/popup/`
