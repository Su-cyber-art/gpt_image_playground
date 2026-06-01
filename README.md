<div align="center">

# 🎨 CHATGPT IMAGE GENERATOR

[![GitHub Repo stars](https://img.shields.io/github/stars/Su-cyber-art/gpt_image_playground?style=flat-square&color=eab308)](https://github.com/Su-cyber-art/gpt_image_playground/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Su-cyber-art/gpt_image_playground?style=flat-square&color=3b82f6)](https://github.com/Su-cyber-art/gpt_image_playground/network/members)
[![License](https://img.shields.io/badge/license-MIT-10b981?style=flat-square)](https://github.com/Su-cyber-art/gpt_image_playground/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)

**基于 OpenAI / OpenAI 兼容接口的图片生成、编辑与 Agent 多轮创作工具。**

本仓库是基于 [CookSleep/gpt_image_playground](https://github.com/CookSleep/gpt_image_playground) 的二次开发版本，项目入口与展示名称已调整为 **CHATGPT IMAGE GENERATOR**。

</div>

---

## 项目简介

CHATGPT IMAGE GENERATOR 是一个纯前端为主的图片生成工作台，适合接入 OpenAI 官方 API、OpenAI 兼容中转、fal.ai 以及可导入的自定义 HTTP 服务商。

主要能力：

- 文本生图、参考图生图、遮罩编辑。
- 支持 Images API 与 Responses API。
- Agent 多轮对话生成，支持上下文图片引用与分支重新生成。
- 多 API 配置管理，可保存多个服务商、模型、Key 与代理选项。
- 历史记录、画廊、批量操作、收藏、导出 ZIP。
- 所有任务记录与图片默认保存在浏览器 IndexedDB，本项目自身不保存用户 API Key 或图片数据。
- Docker / Vercel / Cloudflare Workers / GitHub Pages / 本地静态服务器均可部署。

> 提醒：如果你要调用非 HTTPS 的内网或本地 HTTP API，建议使用自部署版本、GitHub Pages 或 Docker 同源代理；Vercel 绑定的 HTTPS 域名通常会受浏览器安全策略限制。

---

## 技术栈

### 前端核心

- **React 19**：应用 UI 与交互组件。
- **TypeScript 5**：类型约束与工程可维护性。
- **Vite 6**：开发服务器、构建与静态资源打包。
- **Tailwind CSS 3**：样式系统与响应式布局。
- **Zustand 5**：轻量级前端状态管理。

### 内容与交互

- **react-markdown + remark-gfm**：渲染 Agent 对话中的 Markdown / GFM 内容。
- **streamdown**：流式 Markdown 内容展示。
- **fflate**：浏览器端 ZIP 导出与压缩。
- **IndexedDB**：本地保存任务历史、图片与配置。
- **Web Crypto SHA-256**：图片去重与内容哈希。

### 构建与部署

- **Node.js 20+ / npm**：依赖安装与构建环境。
- **Nginx Alpine**：Docker 生产镜像中的静态资源服务与同源 API 代理。
- **Wrangler 4**：Cloudflare Workers 静态资源部署。
- **GitHub Actions**：GitHub Pages 与 Docker 镜像发布工作流。
- **Vercel**：静态站点部署，可通过环境变量设置默认 API 地址。

---

## 快速开始：本地运行

### 1. 准备环境

建议使用：

- Node.js **20 或更高版本**
- npm **10 或更高版本**

```bash
git clone https://github.com/Su-cyber-art/gpt_image_playground.git
cd gpt_image_playground
npm install
```

### 2. 可选：配置默认 API 地址

在项目根目录创建 `.env.local`：

```bash
VITE_DEFAULT_API_URL=https://api.openai.com/v1
```

`VITE_DEFAULT_API_URL` 也可以填写：

- 普通 OpenAI 兼容 API 地址，例如 `https://api.example.com/v1`
- `.json` 自定义服务商配置 URL
- 带 `settings` 参数的配置分享 URL

### 3. 启动开发服务器

```bash
npm run dev
```

默认访问：

```text
http://localhost:5173
```

### 4. 构建生产静态文件

```bash
npm run build
```

构建产物会输出到：

```text
dist/
```

你可以把 `dist/` 上传到任意静态站点服务，例如 Nginx、Apache、宝塔静态站点、Netlify、Cloudflare Pages 等。

---

## 部署方法

下面是这一版推荐的几种部署方式。若只是自己使用，优先推荐 **Docker** 或 **Vercel**；如果要隐藏真实 API 上游地址，推荐 **Docker + 同源代理**。

---

### 方式一：Docker 部署（推荐，可开启同源 API 代理）

Docker 版本会使用 Nginx 托管静态文件，并可通过环境变量开启 `/api-proxy/` 同源代理，用于绕过浏览器 CORS 限制或隐藏真实 API 地址。

#### 1. 直接运行

```bash
docker run -d \
  --name chatgpt-image-generator \
  -p 8080:80 \
  -e DEFAULT_API_URL=https://api.openai.com/v1 \
  ghcr.io/su-cyber-art/gpt_image_playground:latest
```

访问：

```text
http://服务器IP:8080
```

#### 2. 开启同源代理

```bash
docker run -d \
  --name chatgpt-image-generator \
  -p 8080:80 \
  -e DEFAULT_API_URL=https://api.openai.com/v1 \
  -e ENABLE_API_PROXY=true \
  -e API_PROXY_URL=https://api.openai.com/v1 \
  ghcr.io/su-cyber-art/gpt_image_playground:latest
```

开启后，前端可以请求同源路径 `/api-proxy/...`，再由容器内 Nginx 转发到 `API_PROXY_URL`。

#### 3. 锁定代理并隐藏真实 API 地址

如果不希望用户在前端看到真实 API 上游，可以把 `DEFAULT_API_URL` 留空或写占位地址，并锁定代理：

```bash
docker run -d \
  --name chatgpt-image-generator \
  -p 8080:80 \
  -e DEFAULT_API_URL= \
  -e ENABLE_API_PROXY=true \
  -e LOCK_API_PROXY=true \
  -e API_PROXY_URL=https://real-api.example.com/v1 \
  ghcr.io/su-cyber-art/gpt_image_playground:latest
```

> 注意：开启代理后，请务必做好访问控制。否则公网用户可能把你的服务当作 API 转发代理使用。

#### 4. Docker Compose 示例

```yaml
services:
  chatgpt-image-generator:
    image: ghcr.io/su-cyber-art/gpt_image_playground:latest
    container_name: chatgpt-image-generator
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      DEFAULT_API_URL: "https://api.openai.com/v1"
      ENABLE_API_PROXY: "true"
      API_PROXY_URL: "https://api.openai.com/v1"
      # LOCK_API_PROXY: "true"
```

启动：

```bash
docker compose up -d
```

更新：

```bash
docker compose pull
docker compose up -d
```

#### Docker 环境变量说明

| 变量 | 作用 |
| --- | --- |
| `DEFAULT_API_URL` | 页面默认 API 地址；可填写普通 API 地址、`.json` 配置 URL 或配置分享 URL。 |
| `ENABLE_API_PROXY` | 设为 `true` 时启用同源 `/api-proxy/` 代理。 |
| `API_PROXY_URL` | 代理真实转发目标，OpenAI 兼容接口通常要写到 `/v1`。 |
| `LOCK_API_PROXY` | 设为 `true` 后强制前端始终走代理，用户不能关闭。 |
| `HOST` | 容器内 Nginx 监听地址，默认 `0.0.0.0`。 |
| `PORT` | 容器内 Nginx 监听端口，默认 `80`。 |

---

### 方式二：Vercel 部署

适合快速部署公开 HTTPS 静态站点。

#### 1. 导入仓库

在 Vercel 新建项目，选择：

```text
https://github.com/Su-cyber-art/gpt_image_playground
```

默认构建参数通常保持 Vercel 自动识别即可：

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 2. 设置默认 API 地址

在 Vercel 项目后台添加环境变量：

```text
VITE_DEFAULT_API_URL=https://api.openai.com/v1
```

然后重新部署。

#### 3. 关于自动部署

仓库中的 `vercel.json` 默认关闭了 Git 触发自动部署：

```json
{
  "git": {
    "deploymentEnabled": false
  }
}
```

如果你希望每次 push 后 Vercel 自动部署，可以删除这段配置，或在 Vercel 项目设置中自行调整 Git 部署策略。

---

### 方式三：Cloudflare Workers 部署

项目内置 `wrangler.jsonc`，可将 Vite 构建产物作为 Workers 静态资源部署。

#### 1. 登录 Cloudflare

```bash
npx wrangler login
```

#### 2. 部署

```bash
npm run deploy:cf
```

这个命令会执行：

```bash
npm run build && wrangler deploy
```

#### 3. 设置默认 API 地址

Cloudflare Workers 环境变量不会自动改写已经构建好的前端静态文件。如果需要预设默认 API 地址，请在构建前设置：

```bash
VITE_DEFAULT_API_URL=https://api.openai.com/v1 npm run deploy:cf
```

PowerShell：

```powershell
$env:VITE_DEFAULT_API_URL="https://api.openai.com/v1"; npm run deploy:cf
```

---

### 方式四：GitHub Pages 部署

仓库已带 GitHub Pages 工作流 `.github/workflows/deploy.yml`，默认在推送 `v*` 标签或手动触发时构建并发布。

#### 1. 开启 Pages

进入 GitHub 仓库：

```text
Settings -> Pages
```

Source 选择：

```text
GitHub Actions
```

#### 2. 手动触发部署

进入：

```text
Actions -> Deploy to GitHub Pages -> Run workflow
```

#### 3. 通过 tag 触发部署

```bash
git tag v0.5.3-custom.1
git push origin v0.5.3-custom.1
```

部署完成后访问 GitHub Pages 给出的地址。

---

### 方式五：普通静态服务器 / Nginx 部署

如果你已经有自己的服务器，可以直接部署构建后的 `dist/`。

```bash
npm install
npm run build
```

复制 `dist/` 到服务器站点目录，例如：

```bash
/var/www/chatgpt-image-generator
```

Nginx 示例：

```nginx
server {
    listen 80;
    server_name your-domain.example.com;

    root /var/www/chatgpt-image-generator;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

如果需要 HTTPS，建议再配合 Caddy、Nginx + Certbot、宝塔 SSL 或 CDN 证书。

---

## 本地开发代理

开发环境遇到 CORS 时，可以使用 Vite 本地代理。

### 1. 创建代理配置

```bash
cp dev-proxy.config.example.json dev-proxy.config.json
```

### 2. 修改 `dev-proxy.config.json`

将 `target` 改为你的真实 API 地址，例如：

```json
{
  "enabled": true,
  "prefix": "/api-proxy",
  "target": "https://api.openai.com/v1",
  "changeOrigin": true,
  "secure": true
}
```

### 3. 重启开发服务器

```bash
npm run dev
```

然后在页面设置中开启 **API 代理**。

> 本地开发代理只在 `npm run dev` 时生效，不会进入生产构建产物。

---

## URL 参数快速填充

可以通过 URL 参数快速带入 API 配置，适合做书签或与第三方系统集成。

### 标准 OpenAI 兼容接口

```text
?apiUrl=https://api.example.com/v1&apiKey=sk-xxxx&model=gpt-image-2&apiMode=images
```

常用参数：

| 参数 | 说明 |
| --- | --- |
| `apiUrl` | API Base URL。 |
| `apiKey` | API Key。 |
| `model` | 模型名。 |
| `apiMode` | `images` 或 `responses`。 |
| `codexCli` | `true` 时开启 Codex CLI 兼容模式。 |

### 自定义服务商配置

如果服务商不是标准 OpenAI 格式，可以使用 `settings` 参数导入完整 JSON 配置：

```text
?settings={URL编码后的JSON}
```

推荐先在页面内通过：

```text
设置 -> API 配置 -> 服务商类型 -> 创建自定义服务商 -> AI 一键生成与导入
```

生成配置后，再复制可分享链接。

---

## 常用脚本

```bash
npm run dev        # 启动 Vite 开发服务器
npm run build      # TypeScript 检查并构建生产文件
npm run preview    # 本地预览 dist 构建产物
npm run deploy:cf  # 构建并部署到 Cloudflare Workers
npm run mock:api   # 启动本地故障模拟 API
npm run test       # 运行测试
```

---

## 安全说明

- API Key 默认保存在浏览器本地配置中，请不要在公开环境预填真实 Key。
- 如果使用 Docker 代理，请给站点增加访问控制，例如反向代理鉴权、IP 白名单、Cloudflare Access 等。
- `API_PROXY_URL` 是服务端转发目标，不会直接写入前端页面；但只要站点公开可访问，就仍可能被滥用为代理入口。
- 分享带 `apiKey` 的 URL 前请确认接收方可信；更推荐分享不包含 Key 的配置链接。

---

## 许可证与致谢

本项目基于 [MIT License](LICENSE) 开源。

- 原项目：[CookSleep/gpt_image_playground](https://github.com/CookSleep/gpt_image_playground)
- 当前二开仓库：[Su-cyber-art/gpt_image_playground](https://github.com/Su-cyber-art/gpt_image_playground)

感谢原作者与开源社区提供的基础能力。
