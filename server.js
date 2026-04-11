const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';
const BASE_SEGMENT = 'Yamamonogatari';
const BASE_PATH = `/${BASE_SEGMENT}`;
const PUBLIC_ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

const normalizeBasePath = (pathname) => {
  const escapedBaseSegment = BASE_SEGMENT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const repeatedBasePattern = new RegExp(`(?:/${escapedBaseSegment})+/?`, 'i');

  if (!repeatedBasePattern.test(pathname)) {
    return null;
  }

  const normalized = pathname.replace(repeatedBasePattern, `${BASE_PATH}/`);
  return normalized;
};

const resolveLocalPath = (pathname) => {
  if (pathname === '/' || pathname === '') {
    return null;
  }

  if (!pathname.toLowerCase().startsWith(BASE_PATH.toLowerCase())) {
    return null;
  }

  const pathWithoutBase = pathname.slice(BASE_PATH.length) || '/';
  const decodedPath = decodeURIComponent(pathWithoutBase);
  const requestPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const sanitizedPath = path.normalize(requestPath).replace(/^([.][.][/\\])+/, '');

  return path.join(PUBLIC_ROOT, sanitizedPath);
};

const sendRedirect = (res, location) => {
  res.writeHead(302, { Location: location });
  res.end();
};

const sendError = (res, statusCode, message) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(message);
};

const server = http.createServer((req, res) => {
  const host = req.headers.host || 'localhost';
  const url = new URL(req.url || '/', `http://${host}`);
  const pathname = url.pathname;

  const normalizedPath = normalizeBasePath(pathname);
  if (normalizedPath && normalizedPath !== pathname) {
    const redirectUrl = `${normalizedPath}${url.search}`;
    sendRedirect(res, redirectUrl);
    return;
  }

  if (pathname === '/' || pathname === '') {
    sendRedirect(res, `${BASE_PATH}/`);
    return;
  }

  const localPath = resolveLocalPath(pathname);
  if (!localPath) {
    sendError(res, 404, 'Not Found');
    return;
  }

  if (!localPath.startsWith(PUBLIC_ROOT)) {
    sendError(res, 403, 'Forbidden');
    return;
  }

  fs.stat(localPath, (statError, stats) => {
    if (statError) {
      sendError(res, 404, 'Not Found');
      return;
    }

    const finalPath = stats.isDirectory() ? path.join(localPath, 'index.html') : localPath;
    const extension = path.extname(finalPath).toLowerCase();
    const contentType = MIME_TYPES[extension] || 'application/octet-stream';

    fs.readFile(finalPath, (readError, fileBuffer) => {
      if (readError) {
        sendError(res, 404, 'Not Found');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fileBuffer);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}${BASE_PATH}/`);
});
