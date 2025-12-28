import type { VercelRequest, VercelResponse } from '@vercel/node';

// JSON 파일 대신 여기에 데이터를 직접 정의합니다. (가장 확실한 방법)
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
  try {
    // 2. 보안: 정답(flag)은 빼고 목록만 전송
    const safeChallenges = challenges.map(({ flag, ...rest }: any) => rest);

    // 3. CORS 설정 (혹시 모를 연결 차단 방지)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json(safeChallenges);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load challenges' });
  }
}