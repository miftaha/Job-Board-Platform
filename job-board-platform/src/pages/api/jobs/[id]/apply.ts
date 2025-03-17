/* eslint-disable @typescript-eslint/no-unused-vars */

import { createProxyMiddleware } from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { API_BASE_URL } from '@/constants/api'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const proxy = createProxyMiddleware({
  target: API_BASE_URL, // https://alx-project-nexus-pvjg.onrender.com/api
  changeOrigin: true,
  pathRewrite: {
    '^/api/jobs/([0-9]+)/apply/': '/jobs/$1/apply/',
  },
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log('Proxying request:', req.method, req.url, 'to', proxyReq.path)
    },
    error: (err, req, res) => {
      console.error('Proxy error:', err)
      ;(res as NextApiResponse)
        .status(500)
        .json({ detail: 'Proxy error occurred' })
    },
  },
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ detail: 'Method Not Allowed' })
  }
  return proxy(req, res)
}
