import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'http-proxy-middleware'
import { API_BASE_URL } from '@/constants/api'

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false, // For multipart/form-data
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('Proxy received method:', req.method)
  console.log('Proxy received headers:', req.headers)

  const proxy = httpProxyMiddleware.createProxyMiddleware({
    target: API_BASE_URL,
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/applications': '/applications/',
    },
    onProxyReq: (proxyReq, req, res) => {
      Object.keys(req.headers).forEach((key) => {
        if (req.headers[key]) {
          proxyReq.setHeader(key, req.headers[key]!)
        }
      })
      console.log('Proxy forwarding headers:', proxyReq.getHeaders())
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err)
      res.status(500).json({ error: 'Proxy error occurred' })
    },
  })

  return proxy(req, res)
}
