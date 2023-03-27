import { createProxyMiddleware } from 'http-proxy-middleware';

const API_PROXY_TARGET = 'https://deliorder-api.onrender.com';

const apiProxy = createProxyMiddleware('/api', {
  target: API_PROXY_TARGET,
  changeOrigin: true
});

export default apiProxy;
