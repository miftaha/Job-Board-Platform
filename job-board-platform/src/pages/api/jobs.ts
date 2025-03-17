/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const proxyMiddleware = createProxyMiddleware({
    target: 'https://alx-project-nexus-pvjg.onrender.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/api/jobs': '/api/jobs/',
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(
          'Proxying request:',
          req.method,
          req.url,
          'to',
          proxyReq.path
        )
      },
      error: (err, req, res) => {
        console.error('Proxy error:', err)
        ;(res as NextApiResponse)
          .status(500)
          .json({ detail: 'Proxy error occurred' })
      },
    },
  })

  return proxyMiddleware(req, res)
}
