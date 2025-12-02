// Configuration for GitHub OAuth and API endpoints
export const config = {
  // GitHub OAuth
  githubOAuth: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID || "Ov23li5Z72hxOKCRSAAS",
    redirectUri:
      process.env.REACT_APP_REDIRECT_URI ||
      "https://WargameBandits.github.io/WargameBandits/callback",
    scope: "read:user user:email",
  },

  // GitHub API
  github: {
    apiUrl: "https://api.github.com",
    organization: "WargameBandits",
    repos: {
      main: "WargameBandits",
      db: "wargame-db",
      challenges: "wargame-challenges",
    },
  },

  // Serverless API (Vercel Functions)
  api: {
    baseUrl:
      process.env.REACT_APP_API_URL || "https://your-vercel-app.vercel.app/api",
  },

  // Local Storage Keys
  storage: {
    authToken: "wargame_auth_token",
    user: "wargame_user",
    theme: "wargame_theme",
  },
};

// GitHub DB URLs (for fetching JSON data)
export const dbUrls = {
  users: `https://raw.githubusercontent.com/${config.github.organization}/${config.github.repos.db}/main/users.json`,
  challenges: `https://raw.githubusercontent.com/${config.github.organization}/${config.github.repos.db}/main/challenges.json`,
  leaderboard: `https://raw.githubusercontent.com/${config.github.organization}/${config.github.repos.db}/main/leaderboard.json`,
};
