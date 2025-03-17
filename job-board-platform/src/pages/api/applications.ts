/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { API_BASE_URL } from '@/constants/api'

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('Proxy received method:', req.method)
  console.log('Proxy received headers:', req.headers)

  const proxyMiddleware = createProxyMiddleware({
    target: API_BASE_URL,
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/api/applications': '/applications/',
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        Object.keys(req.headers).forEach((key) => {
          if (req.headers[key]) {
            proxyReq.setHeader(key, req.headers[key]!)
          }
        })
        console.log('Proxy forwarding headers:', proxyReq.getHeaders())
      },
      error: (err, req, res) => {
        console.error('Proxy error:', err)
        ;(res as NextApiResponse)
          .status(500)
          .json({ error: 'Proxy error occurred' })
      },
    },
  })

  return proxyMiddleware(req, res)
}
