import type { VercelRequest, VercelResponse } from '@vercel/node';

// 데이터 정의 (다른 파일들과 동일하게 유지)
const challenges = [
  {
    "id": "web-01",
    "title": "Welcome to Bandit",
    "description": "워게임 사이트에 오신 것을 환영합니다. 규칙을 잘 읽고 플래그를 찾아보세요!",
    "category": "Web",
    "points": 100,
    "difficulty": "Easy",
    "flag": "FLAG{welcome_to_wargame_bandits}",
    "solvedBy": 0
  },
  {
    "id": "pwn-01",
    "title": "Buffer Overflow Basic",
    "description": "간단한 버퍼 오버플로우 문제입니다. nc 접속 후 쉘을 따보세요.",
    "category": "Pwnable",
    "points": 200,
    "difficulty": "Medium",
    "flag": "FLAG{simple_bof_success}",
    "solvedBy": 0
  },
  {
    "id": "rev-01",
    "title": "Strings",
    "description": "바이너리 파일 안에 숨겨진 문자열을 찾아보세요.",
    "category": "Reversing",
    "points": 150,
    "difficulty": "Easy",
    "flag": "FLAG{strings_command_is_useful}",
    "solvedBy": 0
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 설정 (프론트엔드와 연결하기 위해 필수)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONS 요청 처리 (브라우저가 미리 보내는 연결 확인 요청)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { challengeId, flag } = req.body;

    // 1. 해당 ID의 문제 찾기
    const challenge = challenges.find((c: any) => c.id === challengeId);

    if (!challenge) {
      return res.status(404).json({ success: false, message: '존재하지 않는 문제입니다.' });
    }

    // 2. 플래그 비교 (앞뒤 공백 제거 후 비교)
    if (challenge.flag.trim() === flag.trim()) {
      return res.status(200).json({ success: true, message: 'Correct Flag! 🎉' });
    } else {
      return res.status(200).json({ success: false, message: 'Wrong Flag 😢' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}