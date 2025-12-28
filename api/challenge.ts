import type { VercelRequest, VercelResponse } from '@vercel/node';

// 데이터 정의 (위와 동일)
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
  const { id } = req.query;

  // 해당 ID의 문제 찾기
  const challenge = challenges.find((c: any) => c.id === id);

  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  // 보안: Flag 제거 후 전송
  const { flag, ...publicData } = challenge;

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json(publicData);
}