import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'http-proxy-middleware'

export const config = {
  api: {
    externalResolver: true, // Required for proxy
    bodyParser: false, // Pass raw body to proxy
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const proxy = httpProxyMiddleware.createProxyMiddleware({
    target: 'https://alx-project-nexus-pvjg.onrender.com',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/auth/register': '/api/auth/register/', // Ensure correct path
    },
  })

  return proxy(req, res)
}
