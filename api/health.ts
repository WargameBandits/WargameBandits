import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const hasDb = !!process.env.DATABASE_URL;
    const dbUrlPrefix = process.env.DATABASE_URL?.substring(0, 20);

    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: {
        hasDatabaseUrl: hasDb,
        databaseUrlPrefix: dbUrlPrefix,
        hasGithubClientId: !!process.env.GITHUB_CLIENT_ID,
        hasGithubClientSecret: !!process.env.GITHUB_CLIENT_SECRET,
        hasJwtSecret: !!process.env.JWT_SECRET,
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
