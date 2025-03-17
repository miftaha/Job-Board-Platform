// import type { NextApiRequest, NextApiResponse } from 'next'
// import httpProxyMiddleware from 'http-proxy-middleware'

// export const config = {
//   api: {
//     externalResolver: true,
//     bodyParser: false,
//   },
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const proxy = httpProxyMiddleware.createProxyMiddleware({
//     target: 'https://alx-project-nexus-pvjg.onrender.com',
//     changeOrigin: true,
//     secure: true,
//     logLevel: 'debug',
//     pathRewrite: {
//       '^/api/auth/me': '/api/auth/me/',
//     },
//   })

//   return proxy(req, res)
// }
