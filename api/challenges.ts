import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 설정 - 허용된 도메인만 접근 가능
  const allowedOrigins = [
    'https://wargamebandits.github.io',
    'https://wargame-server-gamma.vercel.app', // Vercel 배포 환경
    'http://localhost:5173', // 개발 환경
    'http://localhost:3000'  // CRA 개발 환경
  ];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // OPTIONS 요청 처리 (Preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // DB에서 활성화된 문제 목록 조회
    const challenges = await prisma.challenge.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        points: true,
        createdAt: true,
        updatedAt: true,
        creatorId: true,
        submission: {
          select: {
            id: true,
            isCorrect: true,
          },
        },
        first_blood: {
          select: {
            userId: true,
            achievedAt: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 클라이언트에 전송할 데이터 포맷팅
    const formattedChallenges = challenges.map((challenge) => ({
      id: String(challenge.id),
      title: challenge.title,
      description: challenge.description,
      category: challenge.category,
      points: challenge.points,
      solvedBy: challenge.submission.filter((s) => s.isCorrect).length,
      firstBlood: challenge.first_blood
        ? {
            username: challenge.first_blood.user?.username,
            achievedAt: challenge.first_blood.achievedAt,
          }
        : null,
      createdAt: challenge.createdAt,
    }));

    return res.status(200).json(formattedChallenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return res.status(500).json({ error: 'Failed to load challenges' });
  } finally {
    await prisma.$disconnect();
  }
}