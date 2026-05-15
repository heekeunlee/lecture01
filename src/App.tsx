import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileText,
  Image,
  Navigation,
  Quote,
  Sparkles,
  Target,
  Terminal,
  Wrench,
  Zap,
} from 'lucide-react';

const fieldScenarios = [
  {
    icon: BarChart3,
    title: '수율 로그 자동 요약',
    before: '라인별 Excel 파일을 하나씩 열어 수율 하락 구간을 눈으로 찾음',
    intent: '최근 7일간 라인/공정/모델별 수율을 비교하고 전일 대비 3% 이상 하락한 항목만 빨간색으로 표시해줘.',
    output: '수율 이상 구간 TOP5와 원인 후보 요약',
  },
  {
    icon: Image,
    title: 'AOI 불량 이미지 분류',
    before: '이미지 폴더를 넘기며 Scratch, Particle, Mura 여부를 수작업 기록',
    intent: 'AOI 이미지 샘플을 불량 유형별로 분류하고, 대표 이미지를 포함한 리뷰용 대시보드를 만들어줘.',
    output: '불량 유형별 갤러리와 검토 우선순위',
  },
  {
    icon: Activity,
    title: '설비 센서 OOC 감지',
    before: '온도/압력/유량 로그에서 관리 한계 초과 여부를 수동 필터링',
    intent: '설비 센서 데이터에 이동평균과 UCL/LCL을 적용해서 OOC 발생 시점과 전조 패턴을 표시해줘.',
    output: '관리도 기반 알림 화면과 조치 메모',
  },
];

const impactExamples = [
  {
    title: '반복 보고서',
    before: 'Excel 파일을 열고 필터, 피벗, 캡처를 수작업으로 반복',
    after: '데이터 범위와 기준을 지시하면 표, 그래프, 요약 초안을 자동 생성',
  },
  {
    title: '이상 감지',
    before: '관리 한계 초과 구간을 사람이 직접 찾고 원인을 메모',
    after: 'OOC 시점, 관련 센서, 확인 질문을 한 화면에서 검토',
  },
  {
    title: '회의 준비',
    before: '불량 이미지와 수율 로그를 따로 모아 발표 자료를 구성',
    after: '대표 이미지, 우선순위, 조치 후보가 포함된 리뷰 자료 초안 생성',
  },
];

const intentChecklist = [
  '문제 배경: 어떤 공정/장비/데이터에서 발생한 문제인가?',
  '입력 데이터: 파일 형식, 주요 컬럼, 단위, 기간을 설명했는가?',
  '판정 기준: 정상/이상, 목표값, spec, 관리 한계를 적었는가?',
  '출력 형식: 표, 그래프, 대시보드, 보고서 중 무엇을 원하는가?',
  '검증 조건: 엔지니어가 다시 확인해야 할 리스크를 남겼는가?',
];

const practiceSteps = [
  {
    step: '1',
    title: '현장 문제를 한 문장으로 쓰기',
    body: '예: CVD 이후 막두께 산포가 특정 Lot에서 커졌고, 원인이 장비인지 레시피인지 빠르게 보고 싶다.',
  },
  {
    step: '2',
    title: '데이터와 기준을 붙이기',
    body: '예: 컬럼은 Lot ID, 설비 ID, Recipe, Temp, Pressure, Thickness이며 목표 막두께는 120nm +/- 5nm이다.',
  },
  {
    step: '3',
    title: 'AI에게 맡길 결과물을 지정하기',
    body: '예: 설비별 산포 box plot, 이상 Lot 목록, 원인 후보 3개, 엔지니어 확인 질문을 포함한 HTML 리포트를 만들어줘.',
  },
];

const lessonFlow = [
  { time: '3분', label: '목표 확인' },
  { time: '7분', label: '개념·비유' },
  { time: '8분', label: '실무 사례' },
  { time: '17분', label: '지시문·실습' },
  { time: '5분', label: '검증·정리' },
];

const roleFlow = [
  { owner: '엔지니어', task: '문제·데이터·기준 정의' },
  { owner: 'AI', task: '코드·차트·보고서 초안 생성' },
  { owner: '엔지니어', task: '현장 기준으로 검증·수정 지시' },
];

const learningGoals = [
  {
    step: '학습목표 1',
    title: '바이브 코딩의 뜻을 한 문장으로 설명',
    body: '코드를 직접 치는 방식이 아니라, 원하는 결과를 말로 설명해 AI가 초안을 만들게 하는 방식임을 이해합니다.',
    type: 'definition'
  },
  {
    step: '학습목표 2',
    title: '좋은 작업지시서의 요소 구분',
    body: '문제, 데이터, 기준, 산출물, 검증조건이 들어가야 AI가 현장 기준에 맞는 결과를 만들 수 있습니다.',
    type: 'elements'
  },
  {
    step: '학습목표 3',
    title: '현장 사례와 연결',
    body: '수율, AOI, 설비 센서 같은 반복 업무를 AI 작업지시서로 바꾸는 흐름을 설명할 수 있습니다.',
    type: 'field'
  },
];

const tradVibeSteps = [
  { label: '입력', traditional: '문법, 라이브러리, 에러 메시지', vibe: '문제, 데이터, 기준, 결과물' },
  { label: '초점', traditional: '어떻게 코드를 만들까', vibe: '무엇을 해결할까' },
  { label: '결과', traditional: '직접 작성한 코드와 수정 흔적', vibe: '대시보드, 차트, 보고서 초안' },
];

const yieldTrend = [
  { day: 'D-6', value: 94 },
  { day: 'D-5', value: 95 },
  { day: 'D-4', value: 93 },
  { day: 'D-3', value: 92 },
  { day: 'D-2', value: 88 },
  { day: 'D-1', value: 86 },
  { day: 'D', value: 89 },
];

const excelFiles = [
  { name: 'LINE_A_ARRAY_yield.xlsx', rows: '1,248 rows', status: '전일 대비 -4.2%' },
  { name: 'LINE_B_ARRAY_yield.xlsx', rows: '1,176 rows', status: '전일 대비 -0.8%' },
  { name: 'LINE_C_CELL_yield.xlsx', rows: '1,332 rows', status: '전일 대비 -3.7%' },
  { name: 'LINE_D_MODULE_yield.xlsx', rows: '964 rows', status: '전일 대비 +0.4%' },
  { name: 'LINE_E_ARRAY_yield.xlsx', rows: '1,106 rows', status: '전일 대비 -2.1%' },
  { name: 'LINE_F_CELL_yield.xlsx', rows: '1,284 rows', status: '전일 대비 -3.4%' },
  { name: 'LINE_G_MODULE_yield.xlsx', rows: '1,019 rows', status: '전일 대비 +0.2%' },
  { name: 'LINE_H_ARRAY_yield.xlsx', rows: '1,411 rows', status: '전일 대비 -1.6%' },
];

const excelPreviewColumns = ['Date', 'Line', 'Proc', 'Model', 'D-1', 'D', 'Diff', 'Judge'];

const excelPreviewRows = [
  ['04-21', 'A', 'Array', 'OLED-14', '94.1', '93.8', '-0.3', 'OK'],
  ['04-22', 'A', 'Array', 'OLED-14', '93.8', '92.4', '-1.4', 'OK'],
  ['04-23', 'A', 'Array', 'OLED-14', '92.4', '88.2', '-4.2', 'Check'],
  ['04-23', 'C', 'Cell', 'OLED-17', '91.6', '87.9', '-3.7', 'Check'],
  ['04-24', 'B', 'Array', 'OLED-14', '95.2', '94.4', '-0.8', 'OK'],
  ['04-24', 'F', 'Cell', 'OLED-14', '93.5', '90.1', '-3.4', 'Check'],
  ['04-25', 'D', 'Module', 'OLED-17', '96.1', '96.5', '+0.4', 'OK'],
  ['04-25', 'H', 'Array', 'OLED-17', '94.8', '93.2', '-1.6', 'OK'],
];

const manualWorkSteps = [
  '라인별 Excel 파일 열기',
  '날짜/공정/모델 필터 적용',
  '전일 수율과 금일 수율을 눈으로 비교',
  '3% 이상 하락한 셀을 직접 표시',
  '스크린샷을 보고서에 붙이고 원인 후보 작성',
];

const yieldLogRows = [
  { date: '2026-04-22', line: 'A', process: 'Array', model: 'OLED-14', yesterday: 94.1, today: 93.8, diff: -0.3 },
  { date: '2026-04-23', line: 'A', process: 'Array', model: 'OLED-14', yesterday: 93.8, today: 92.4, diff: -1.4 },
  { date: '2026-04-24', line: 'A', process: 'Array', model: 'OLED-14', yesterday: 92.4, today: 88.2, diff: -4.2 },
  { date: '2026-04-24', line: 'C', process: 'Cell', model: 'OLED-17', yesterday: 91.6, today: 87.9, diff: -3.7 },
  { date: '2026-04-25', line: 'B', process: 'Array', model: 'OLED-14', yesterday: 95.2, today: 94.4, diff: -0.8 },
  { date: '2026-04-25', line: 'D', process: 'Module', model: 'OLED-17', yesterday: 96.1, today: 96.5, diff: 0.4 },
];

const detectedDrops = yieldLogRows.filter((item) => item.diff <= -3);

const aiReportFindings = [
  {
    title: '우선 확인 1순위',
    body: 'A Line / Array / OLED-14에서 2026-04-24 수율이 전일 대비 4.2% 하락했습니다.',
  },
  {
    title: '우선 확인 2순위',
    body: 'C Line / Cell / OLED-17에서 2026-04-24 수율이 전일 대비 3.7% 하락했습니다.',
  },
  {
    title: '추가 확인 질문',
    body: '해당 Lot의 Recipe 변경, 장비 PM 이력, 검사 불량률 증가 여부를 함께 확인해야 합니다.',
  },
];

const aoiFolders = [
  { name: 'AOI_LINE_A_0424', count: 186 },
  { name: 'AOI_LINE_B_0424', count: 214 },
  { name: 'AOI_LINE_C_0424', count: 172 },
  { name: 'AOI_RECHECK_SET', count: 96 },
];

const aoiManualSteps = [
  '폴더별 이미지를 하나씩 열어 확대/축소',
  'Scratch, Particle, Mura 여부를 육안 판단',
  '파일명을 Excel에 복사하고 불량 유형을 직접 기록',
  '대표 이미지를 따로 골라 리뷰 자료에 붙임',
  '우선 검토할 Lot과 설비를 회의 전에 다시 정리',
];

const aoiSamples = [
  { id: 'A-0142', type: 'Scratch', confidence: 94, priority: 'High' },
  { id: 'A-0187', type: 'Particle', confidence: 91, priority: 'High' },
  { id: 'B-0203', type: 'Mura', confidence: 87, priority: 'Medium' },
  { id: 'C-0108', type: 'Particle', confidence: 89, priority: 'Medium' },
  { id: 'C-0149', type: 'Scratch', confidence: 83, priority: 'Medium' },
  { id: 'R-0041', type: 'Mura', confidence: 78, priority: 'Low' },
];

const aoiImageWall = Array.from({ length: 72 }, (_, index) => {
  const types = ['Scratch', 'Particle', 'Mura'];
  const type = types[(index * 7 + 2) % types.length];
  return {
    id: `IMG-${String(index + 1).padStart(3, '0')}`,
    type,
    flagged: index % 5 === 0 || index % 11 === 0,
  };
});

const defectMix = [
  { type: 'Particle', count: 38 },
  { type: 'Scratch', count: 24 },
  { type: 'Mura', count: 18 },
  { type: 'Open', count: 11 },
];

const aoiSummary = [
  { type: 'Particle', count: 38, action: '먼지/이물 유입 경로 확인' },
  { type: 'Scratch', count: 24, action: '이송/접촉 장비 구간 확인' },
  { type: 'Mura', count: 18, action: '증착/균일도 조건 확인' },
];

const sensorReadings = [
  { label: '08:00', value: 72 },
  { label: '09:00', value: 75 },
  { label: '10:00', value: 77 },
  { label: '11:00', value: 82 },
  { label: '12:00', value: 88 },
  { label: '13:00', value: 91 },
  { label: '14:00', value: 84 },
];

const sensorFiles = [
  { name: 'EQP-17_TEMP_1min.csv', rows: '1,440 rows', target: 'Temp' },
  { name: 'EQP-17_PRESS_1min.csv', rows: '1,440 rows', target: 'Pressure' },
  { name: 'EQP-17_FLOW_1min.csv', rows: '1,440 rows', target: 'Flow' },
  { name: 'EQP-22_TEMP_1min.csv', rows: '1,440 rows', target: 'Temp' },
  { name: 'EQP-22_PRESS_1min.csv', rows: '1,440 rows', target: 'Pressure' },
  { name: 'EQP-22_FLOW_1min.csv', rows: '1,440 rows', target: 'Flow' },
];

const sensorManualSteps = [
  '설비별 CSV 파일을 열고 시간 범위를 맞춤',
  '온도, 압력, 유량 컬럼마다 필터와 조건부 서식을 적용',
  '이동평균을 직접 계산하고 UCL/LCL 초과 시점을 표시',
  '초과 직전 30분의 상승/하락 패턴을 눈으로 확인',
  '알림 캡처와 조치 메모를 회의 자료에 따로 붙임',
];

const sensorLogRows = [
  { time: '09:20', temp: 74.8, pressure: 2.12, flow: 118, ma: 75.1, judge: 'OK' },
  { time: '09:30', temp: 76.4, pressure: 2.15, flow: 116, ma: 75.8, judge: 'OK' },
  { time: '09:40', temp: 78.9, pressure: 2.21, flow: 113, ma: 76.7, judge: 'Watch' },
  { time: '09:50', temp: 81.6, pressure: 2.27, flow: 109, ma: 78.4, judge: 'Watch' },
  { time: '10:00', temp: 84.2, pressure: 2.35, flow: 105, ma: 80.5, judge: 'Pre-OOC' },
  { time: '10:10', temp: 88.7, pressure: 2.48, flow: 101, ma: 83.9, judge: 'OOC' },
  { time: '10:20', temp: 90.4, pressure: 2.55, flow: 98, ma: 86.1, judge: 'OOC' },
  { time: '10:30', temp: 85.1, pressure: 2.36, flow: 104, ma: 86.1, judge: 'Recover' },
];

const sensorAlertRows = [
  { time: '10:10', sensor: 'Temp', value: '88.7°C', limit: 'UCL 87°C', memo: 'Chiller 공급 온도와 Recipe step 4 확인' },
  { time: '10:20', sensor: 'Pressure', value: '2.55 bar', limit: 'UCL 2.50 bar', memo: 'Regulator drift 및 valve 응답 지연 확인' },
  { time: '10:20', sensor: 'Flow', value: '98 slm', limit: 'LCL 100 slm', memo: 'MFC 편차와 필터 막힘 가능성 점검' },
];

const promptParts = [
  { label: '문제', text: '어떤 현상을 확인할 것인가?' },
  { label: '데이터', text: '파일·컬럼·기간·단위는 무엇인가?' },
  { label: '기준', text: '정상/이상 판정 기준은 무엇인가?' },
  { label: '산출물', text: '표·그래프·대시보드 중 무엇인가?' },
  { label: '검증', text: '사람이 다시 볼 리스크는 무엇인가?' },
];

const promptExampleRows = [
  { part: '문제', weak: '수율 분석', strong: 'Array 공정 A/B/C 라인의 OLED-14 수율 하락 원인 후보 확인' },
  { part: '데이터', weak: '엑셀 파일', strong: '최근 14일 yield_log.xlsx, 컬럼: Date, Line, Model, Yield, Temp, Pressure, AOI Defect' },
  { part: '기준', weak: '이상한 것', strong: '전일 대비 -3% 이상 또는 3일 이동평균 90% 미만이면 위험 표시' },
  { part: '산출물', weak: '보기 좋게', strong: '라인별 추이 그래프, 위험 TOP5 표, 원인 후보, 확인 질문이 있는 HTML 대시보드' },
  { part: '검증', weak: '알아서', strong: '데이터 누락, Lot 수 부족, Recipe 변경 여부는 검증 필요 항목으로 분리' },
];

const promptScoreCards = [
  { label: '데이터 명확도', score: 92 },
  { label: '판정 기준', score: 88 },
  { label: '산출물 구체성', score: 95 },
  { label: '검증 가능성', score: 82 },
];

const workshopExamples = [
  {
    title: '수율 로그형',
    context: '최근 7일 라인별 수율',
    prompt: '전일 대비 3% 이상 하락한 라인/공정/모델만 빨간색으로 표시하고 TOP5 원인 후보를 정리해줘.',
  },
  {
    title: 'AOI 이미지형',
    context: 'Scratch, Particle, Mura 이미지 폴더',
    prompt: '불량 유형별 대표 이미지를 묶고 리뷰 우선순위와 재검토 후보를 대시보드로 만들어줘.',
  },
  {
    title: '설비 센서형',
    context: '온도/압력/유량 1분 로그',
    prompt: '이동평균과 UCL/LCL을 적용해 OOC 시점, 전조 30분 패턴, 조치 메모를 표시해줘.',
  },
];

const navigationLinks = [
  { label: '커리큘럼으로 돌아가기', href: 'https://heekeunlee.github.io/lecture_assist001/' },
  { label: '2강 프롬프트 기획 예고', href: 'https://heekeunlee.github.io/lecture_assist001/' },
];

// ── AI 대화 비교 데이터 ─────────────────────────────────────────
const aiDialogueData = [
  {
    id: 'bad',
    label: '일반 프롬프트',
    prompt: '수율 분석해줘.',
    response: 'AI: 수율 하락의 일반적인 원인은 장비 유지보수 지연, 원자재 오염,\n공정 파라미터 이탈 등이 있습니다.\n어떤 라인의 데이터인가요? 기간은 얼마나 되나요?\n데이터를 업로드해 주시면 도움이 됩니다.',
    resultTag: '역질문 → 대화 반복',
    score: 12,
    scoreColor: '#ef4444',
    bg: '#fff7f7',
    border: '#fecaca',
    tagColor: '#991b1b',
    responseBg: '#fff1f2',
  },
  {
    id: 'good',
    label: '엔지니어 작업지시서',
    prompt: '최근 7일간 A/B/C 라인 OLED-14 수율을 비교하고,\n전일 대비 3% 이상 하락한 항목만 빨간색으로 표시해줘.\n하락 폭 TOP5, 원인 후보, 엔지니어 확인 질문을\nHTML 보고서 형태로 만들어줘.',
    response: 'AI: 수율 분석 대시보드를 생성합니다.\n\n① yield_log.xlsx → A/B/C 라인 × OLED-14 필터\n② 전일 대비 diff 계산, -3% 이하 행 red highlight\n③ 하락폭 TOP5 + 원인 후보(Recipe/PM/AOI) 추출\n④ 엔지니어 확인 질문 3개 자동 생성\n\n→ dashboard.html 생성 완료',
    resultTag: '즉시 코드 + HTML 리포트 생성',
    score: 94,
    scoreColor: '#0071e3',
    bg: '#f0f7ff',
    border: 'rgba(0,113,227,0.28)',
    tagColor: '#075985',
    responseBg: '#f0fdf4',
  },
];

// ── 검증 체크포인트 ────────────────────────────────────────────
const yieldVerifyPoints = [
  'AI가 찾은 하락 구간이 실제 원시 데이터와 일치하는가?',
  '해당 Lot의 Recipe 변경 또는 PM 이력이 있는가?',
  '동일 모델이 다른 라인에서도 동시에 하락했는가?',
];

const aoiVerifyPoints = [
  'AI의 불량 분류 결과를 대표 이미지로 샘플 검증했는가?',
  '재검토 후보로 분류된 이미지를 엔지니어가 직접 확인했는가?',
  '이번 Lot의 불량 분포가 전주 대비 유의미하게 다른가?',
];

const sensorVerifyPoints = [
  'OOC 시점에 실제 공정 이상이 발생했는지 이력과 대조했는가?',
  'AI가 표시한 전조 패턴이 기존 알람 이력과 일치하는가?',
  '조치 메모의 점검 항목을 실제 설비 담당자에게 전달했는가?',
];

// ── 첫 실행 가이드 ─────────────────────────────────────────────
const firstRunSteps = [
  {
    step: '01',
    title: 'Claude.ai 접속',
    body: '브라우저에서 claude.ai 를 열고 무료 계정으로 로그인합니다. 별도 설치 없이 웹에서 바로 사용합니다.',
  },
  {
    step: '02',
    title: '작업지시서 붙여넣기',
    body: '아래 [Claude에 복사하기] 버튼으로 클립보드에 복사한 뒤, 채팅창에 붙여넣고 Enter를 누릅니다.',
  },
  {
    step: '03',
    title: 'AI 초안 검증',
    body: 'AI가 생성한 코드·보고서·차트를 현장 기준으로 검토합니다. 수정이 필요하면 추가 지시를 입력하세요.',
  },
];

// ── 2강 예고 ──────────────────────────────────────────────────
const tcreiItems = [
  { label: 'T', name: 'Task', text: '무엇을 만들 것인가' },
  { label: 'C', name: 'Context', text: '어떤 상황·데이터인가' },
  { label: 'R', name: 'Role', text: 'AI에게 맡길 역할' },
  { label: 'E', name: 'Example', text: '기대 출력 형식·예시' },
  { label: 'I', name: 'Instruction', text: '제약조건·검증 기준' },
];

function ComplexCodeVisual() {
  return (
    <div className="visual-container traditional-code">
      <div className="code-window">
        <div className="code-header">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <div className="code-body">
          <div className="code-line typing-1"><span>import</span> pandas <span>as</span> pd</div>
          <div className="code-line typing-2"><span>import</span> matplotlib.pyplot <span>as</span> plt</div>
          <div className="code-line typing-3">df = pd.read_csv('sensor_log.csv')</div>
          <div className="code-line typing-4">df['MA'] = df['value'].rolling(window=5).mean()</div>
          <div className="code-line typing-5">plt.plot(df['timestamp'], df['MA'], color='red')</div>
          <div className="code-line error">Error: ModuleNotFoundError: No module named 'matplotlib'</div>
          <div className="code-line typing-6">pip install matplotlib --user</div>
          <div className="code-line typing-7"><span>def</span> analyze_yield(data, threshold=0.95):</div>
          <div className="code-line typing-8">    <span>return</span> [x <span>for</span> x <span>in</span> data <span>if</span> x {'<'} threshold]</div>
        </div>
      </div>
    </div>
  );
}

function VibeIntentVisual() {
  return (
    <div className="visual-container antigravity-sim">
      <div className="antigravity-window">
        <div className="ag-header">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
          <div className="ag-logo">Antigravity Analysis</div>
          <div className="ag-status">분석 중...</div>
        </div>
        <div className="ag-content">
          <div className="ag-prompt-section">
            <div className="ag-prompt-box">
              <div className="typing-container">
                <span className="typing-prompt">
                  1000개의 공정 데이터 중에서 이상점이 발생한 부분을 진단하고 그것을 시각화해줘.
                  기술적인 근거와 이유에 대해서도 간략히 정리해.
                </span>
              </div>
            </div>
          </div>
          
          <div className="ag-ai-processing">
            <div className="ag-code-gen">
              <div className="code-line"><span>통계적 진단 실행 중...</span></div>
            </div>
          </div>

          <div className="ag-results">
            <div className="ag-charts-row">
              <div className="ag-chart density">
                <div className="chart-axis y"><span>밀도</span></div>
                <div className="chart-axis x"><span>측정값</span></div>
                <div className="gaussian-curve-v2">
                  <div className="six-sigma-outlier"></div>
                </div>
                <div className="scatter-points-v2">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="point" style={{ 
                      left: `${15 + Math.random() * 70}%`, 
                      bottom: `${10 + Math.random() * 40}%` 
                    }}></div>
                  ))}
                  <div className="point outlier-v2" style={{ left: '92%', bottom: '5%' }}></div>
                </div>
                <span className="chart-title">밀도 분포 (Gaussian)</span>
              </div>
              <div className="ag-chart boxplot">
                <div className="chart-axis y"><span>통계</span></div>
                <div className="chart-axis x"><span>그룹</span></div>
                <div className="box-elements-v2">
                  <div className="whisker-top-v2"></div>
                  <div className="box-body-v2">
                    <div className="median-line-v2"></div>
                  </div>
                  <div className="whisker-bottom-v2"></div>
                  <div className="outliers-group-v2">
                    <div className="dot-outlier-v2" style={{ top: '-15px' }}></div>
                    <div className="dot-outlier-v2" style={{ top: '-25px' }}></div>
                  </div>
                </div>
                <span className="chart-title">상세 박스플랏</span>
              </div>
            </div>
            <div className="ag-summary-wide">
              <strong>분석 결과 요약</strong>
              <div className="summary-grid">
                <div className="sum-item">
                  <span>탐지된 이상치</span>
                  <strong>Lot #742 Outlier</strong>
                </div>
                <div className="sum-item">
                  <span>통계적 근거</span>
                  <strong>3.2σ 편차 (임계치 초과)</strong>
                </div>
                <div className="sum-item">
                  <span>권고 조치</span>
                  <strong>가스 유량 센서 점검</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalVisual({ type }: { type: string }) {
  if (type === 'definition') {
    return (
      <div className="goal-visual definition">
        <div className="visual-item person">
          <Navigation size={18} />
          <span>의도</span>
        </div>
        <ArrowRight size={14} className="visual-arrow" />
        <div className="visual-item ai">
          <Bot size={18} />
          <span>결과</span>
        </div>
      </div>
    );
  }
  if (type === 'elements') {
    return (
      <div className="goal-visual elements">
        <div className="element-tag">문제</div>
        <div className="element-tag">데이터</div>
        <div className="element-tag">기준</div>
        <div className="element-tag">산출물</div>
        <div className="element-tag">검증</div>
      </div>
    );
  }
  if (type === 'field') {
    return (
      <div className="goal-visual field">
        <div className="field-icons">
          <div className="f-icon"><BarChart3 size={18} /></div>
          <div className="f-icon"><Image size={18} /></div>
          <div className="f-icon"><Activity size={18} /></div>
        </div>
        <div className="success-indicator">
          <CheckCircle2 size={12} />
          <span>현장 적용 완료</span>
        </div>
      </div>
    );
  }
  return null;
}

function YieldTrendChart() {
  const max = 96;
  const min = 84;
  const points = yieldTrend
    .map((item, index) => {
      const x = 28 + index * 48;
      const y = 150 - ((item.value - min) / (max - min)) * 110;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="visual-card chart-card">
      <div className="visual-header">
        <span>Sample Yield Trend</span>
        <strong>Line A / Array</strong>
      </div>
      <svg viewBox="0 0 340 190" role="img" aria-label="7일 수율 추이 샘플 그래프">
        <line x1="24" y1="42" x2="316" y2="42" className="limit-line" />
        <line x1="24" y1="150" x2="316" y2="150" className="axis-line" />
        <polyline points={points} className="trend-line" />
        {yieldTrend.map((item, index) => {
          const x = 28 + index * 48;
          const y = 150 - ((item.value - min) / (max - min)) * 110;
          return (
            <g key={item.day}>
              <circle cx={x} cy={y} r="5" className={item.value < 90 ? 'alert-dot' : 'normal-dot'} />
              <text x={x} y="174" textAnchor="middle">{item.day}</text>
              {item.value < 90 && <text x={x} y={y - 12} textAnchor="middle" className="alert-label">{item.value}%</text>}
            </g>
          );
        })}
      </svg>
      <p>AI가 먼저 하락 구간을 표시하고, 엔지니어가 원인 후보를 검증합니다.</p>
    </div>
  );
}

function DefectParetoChart() {
  const max = Math.max(...defectMix.map((item) => item.count));

  return (
    <div className="visual-card">
      <div className="visual-header">
        <span>AOI Defect Pareto</span>
        <strong>Top 4</strong>
      </div>
      <div className="bar-chart" role="img" aria-label="AOI 불량 유형별 빈도 막대 그래프">
        {defectMix.map((item) => (
          <div className="bar-row" key={item.type}>
            <span>{item.type}</span>
            <div>
              <i style={{ width: `${(item.count / max) * 100}%` }} />
            </div>
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
      <p>불량 유형별 우선순위를 시각화하면 리뷰 순서를 빠르게 정할 수 있습니다.</p>
    </div>
  );
}

function SensorControlChart() {
  return (
    <div className="visual-card chart-card">
      <div className="visual-header">
        <span>Sensor OOC Check</span>
        <strong>Temp Sensor</strong>
      </div>
      <svg viewBox="0 0 340 190" role="img" aria-label="설비 센서 관리 한계 초과 샘플 그래프">
        <line x1="24" y1="55" x2="316" y2="55" className="ucl-line" />
        <line x1="24" y1="150" x2="316" y2="150" className="axis-line" />
        <text x="28" y="48" className="alert-label">UCL</text>
        <polyline
          points={sensorReadings.map((item, index) => `${28 + index * 48},${160 - item.value}`).join(' ')}
          className="trend-line"
        />
        {sensorReadings.map((item, index) => {
          const x = 28 + index * 48;
          const y = 160 - item.value;
          return (
            <g key={item.label}>
              <circle cx={x} cy={y} r="5" className={item.value >= 88 ? 'alert-dot' : 'normal-dot'} />
              <text x={x} y="174" textAnchor="middle">{item.label}</text>
            </g>
          );
        })}
      </svg>
      <p>관리 한계를 함께 지시해야 AI가 “이상”을 현장 기준으로 표시합니다.</p>
    </div>
  );
}

function SensorDeepChart() {
  const values = sensorLogRows.map((item) => item.temp);
  const max = 92;
  const min = 72;
  const toPoint = (value: number, index: number) => {
    const x = 34 + index * 42;
    const y = 160 - ((value - min) / (max - min)) * 112;
    return `${x},${y}`;
  };

  return (
    <div className="sensor-chart-card">
      <div className="visual-header">
        <span>Control Chart</span>
        <strong>EQP-17 Temp / Moving Avg</strong>
      </div>
      <svg viewBox="0 0 360 210" role="img" aria-label="UCL LCL 이동평균이 표시된 설비 센서 관리도">
        <line x1="28" y1="45" x2="332" y2="45" className="ucl-line" />
        <line x1="28" y1="160" x2="332" y2="160" className="lcl-line" />
        <line x1="28" y1="102" x2="332" y2="102" className="center-line" />
        <text x="32" y="38" className="alert-label">UCL 87°C</text>
        <text x="32" y="176" className="muted-label">LCL 73°C</text>
        <text x="248" y="96" className="muted-label">Center</text>
        <polyline points={values.map((value, index) => toPoint(value, index)).join(' ')} className="trend-line" />
        <polyline points={sensorLogRows.map((item, index) => toPoint(item.ma, index)).join(' ')} className="moving-average-line" />
        {sensorLogRows.map((item, index) => {
          const [x, y] = toPoint(item.temp, index).split(',').map(Number);
          const isOoc = item.judge === 'OOC';
          const isWatch = item.judge === 'Watch' || item.judge === 'Pre-OOC';
          return (
            <g key={item.time}>
              <circle cx={x} cy={y} r={isOoc ? 6 : 4.5} className={isOoc ? 'alert-dot' : isWatch ? 'watch-dot' : 'normal-dot'} />
              <text x={x} y="194" textAnchor="middle">{item.time}</text>
            </g>
          );
        })}
      </svg>
      <div className="chart-legend">
        <span><i className="legend-raw" />Raw sensor</span>
        <span><i className="legend-ma" />Moving avg</span>
        <span><i className="legend-ooc" />OOC</span>
      </div>
    </div>
  );
}

function SensorCaseDeepDive() {
  return (
    <div className="deep-dive sensor-deep-dive">
      <div className="deep-dive-heading">
        <span>Case 03 Deep Dive</span>
        <h3>설비 센서 OOC 감지: 로그 필터링에서 관리도 기반 알림 화면으로</h3>
        <p>
          OOC(Out of Control)는 센서 값이 단순히 높거나 낮다는 뜻이 아니라, 공정 관리 한계(UCL/LCL)를 벗어나
          통계적으로 관리 상태가 깨졌다는 신호입니다. 현장에서는 온도, 압력, 유량 로그를 따로 열어 초과 시점과
          직전 전조 패턴을 사람이 찾아야 하는 경우가 많습니다.
        </p>
      </div>

      <div className="yield-case-compare vertical-case-flow" aria-label="설비 센서 OOC 감지 Before Prompt After 비교">
        <article className="yield-case-panel manual-panel sensor-manual-panel">
          <span>Before: 기존 수동 필터링</span>
          <h4>온도·압력·유량 CSV를 각각 열고, 관리 한계 초과 시점을 손으로 찾습니다</h4>
          <div className="sensor-file-grid">
            {sensorFiles.map((file) => (
              <div className="sensor-file-card" key={file.name}>
                <strong>{file.name}</strong>
                <span>{file.rows} · {file.target}</span>
                <div className="sensor-mini-bars">
                  {Array.from({ length: 18 }, (_, index) => (
                    <i className={index > 12 && (file.target === 'Temp' || file.target === 'Pressure') ? 'hot' : index < 4 && file.target === 'Flow' ? 'low' : ''} key={`${file.name}-${index}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="data-table-card compact-table sensor-log-table">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Temp</th>
                  <th>Pressure</th>
                  <th>Flow</th>
                  <th>MA</th>
                  <th>Judge</th>
                </tr>
              </thead>
              <tbody>
                {sensorLogRows.map((row) => (
                  <tr key={row.time} className={row.judge === 'OOC' ? 'danger-row' : row.judge.includes('Watch') || row.judge === 'Pre-OOC' ? 'warning-row' : ''}>
                    <td>{row.time}</td>
                    <td>{row.temp}</td>
                    <td>{row.pressure}</td>
                    <td>{row.flow}</td>
                    <td>{row.ma}</td>
                    <td>{row.judge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul>
            {sensorManualSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="pain-metrics">
            <div><strong>6개</strong><span>로그 파일 비교</span></div>
            <div><strong>3센서</strong><span>각각 한계 확인</span></div>
            <div><strong>30분+</strong><span>전조 패턴 추적</span></div>
          </div>
        </article>

        <article className="yield-case-panel prompt-panel">
          <span>Prompt: 바이브 코딩 지시</span>
          <h4>데이터, 계산 방식, 판정 기준, 알림 화면까지 한 번에 지시합니다</h4>
          <p>
            “설비 센서 데이터에 이동평균과 UCL/LCL을 적용해서 OOC 발생 시점과 전조 패턴을 표시해줘.
            온도, 압력, 유량을 같은 시간축으로 정렬하고, UCL/LCL 초과 구간은 빨간색으로 표시해줘.
            초과 30분 전부터의 상승/하락 패턴을 별도로 요약하고, 엔지니어가 바로 확인할 조치 메모 칸을 포함한
            관리도 기반 알림 화면을 만들어줘.”
          </p>
          <div className="aoi-rule-grid sensor-rule-grid">
            <div><strong>계산</strong><span>5-point 이동평균, UCL/LCL, Center line</span></div>
            <div><strong>판정</strong><span>한계 초과, 연속 상승, LCL 접근 패턴</span></div>
            <div><strong>산출물</strong><span>관리도, 알림 목록, 조치 메모</span></div>
          </div>
        </article>

        <article className="yield-case-panel result-panel">
          <span>After: AI 산출물</span>
          <h4>OOC 시점과 전조 패턴이 관리도와 알림 화면에 자동 정리됩니다</h4>
          <div className="sensor-dashboard">
            <SensorDeepChart />
            <div className="sensor-alert-panel">
              <div className="visual-header">
                <span>OOC Alert</span>
                <strong>Action memo</strong>
              </div>
              {sensorAlertRows.map((row) => (
                <div className="sensor-alert-card" key={`${row.time}-${row.sensor}`}>
                  <strong>{row.time} · {row.sensor}</strong>
                  <span>{row.value} / {row.limit}</span>
                  <p>{row.memo}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="aoi-impact-strip sensor-impact-strip">
            <div><strong>전체 로그</strong><span>같은 시간축으로 자동 정렬</span></div>
            <div><strong>전조 30분</strong><span>상승/하락 패턴 자동 표시</span></div>
            <div><strong>조치 메모</strong><span>점검 후보를 회의 자료로 바로 사용</span></div>
          </div>
        </article>
      </div>

      <p className="case-takeaway">
        핵심은 AI가 설비 원인을 단정하는 것이 아니라, 사람이 필터와 조건부 서식으로 찾던 OOC 후보를
        관리도와 조치 메모 형태로 먼저 정리해 엔지니어의 판단 시간을 줄여주는 것입니다.
      </p>
      <VerifyChecklist points={sensorVerifyPoints} />
    </div>
  );
}

function YieldCaseDeepDive() {
  return (
    <div className="deep-dive">
      <div className="deep-dive-heading">
        <span>Case 01 Deep Dive</span>
        <h3>수율 로그 자동 요약: Excel 노가다에서 AI 보고서 초안으로</h3>
        <p>
          강의에서는 아래 박스를 위에서 아래로 스크롤하며 설명하면 됩니다. 먼저 Excel 파일을 여러 개 열어
          눈으로 찾는 방식의 부담을 보여주고, 그 다음 같은 업무를 프롬프트 한 문장과 AI 산출물로 압축합니다.
        </p>
      </div>

      <div className="yield-case-compare vertical-case-flow" aria-label="수율 로그 자동 요약 Before Prompt After 비교">
        <article className="yield-case-panel manual-panel">
          <span>Before: 기존 Excel 방식</span>
          <h4>파일을 열고, 필터를 걸고, 하락 구간을 눈으로 찾습니다</h4>
          <div className="excel-stack">
            {excelFiles.map((file) => (
              <div className="mini-excel dense-excel" key={file.name}>
                <strong>{file.name}</strong>
                <div className="excel-sheet-grid">
                  {excelPreviewColumns.map((column) => (
                    <b key={column}>{column}</b>
                  ))}
                  {excelPreviewRows.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                      const isAlert = cell === 'Check' || cell.startsWith('-3') || cell.startsWith('-4');
                      const lineAdjustedCell = cellIndex === 1 ? file.name.slice(5, 6) : cell;
                      return (
                        <span
                          className={isAlert ? 'excel-alert' : ''}
                          key={`${file.name}-${rowIndex}-${cellIndex}`}
                        >
                          {lineAdjustedCell}
                        </span>
                      );
                    })
                  )}
                </div>
                <em>{file.rows} · 날짜/라인/공정/모델 필터를 반복 적용</em>
              </div>
            ))}
          </div>
          <ul>
            {manualWorkSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="pain-metrics">
            <div><strong>4개</strong><span>라인별 파일</span></div>
            <div><strong>4,720+</strong><span>검토 행</span></div>
            <div><strong>30-50분</strong><span>반복 필터·캡처</span></div>
          </div>
        </article>

        <article className="yield-case-panel prompt-panel">
          <span>Prompt: 바이브 코딩 지시</span>
          <h4>기준과 결과물까지 한 번에 말합니다</h4>
          <p>
            최근 7일간 라인/공정/모델별 수율을 비교하고 전일 대비 3% 이상 하락한 항목만 빨간색으로 표시해줘.
            하락 폭 TOP5와 원인 후보, 엔지니어 확인 질문을 포함한 HTML 보고서 형태로 만들어줘.
          </p>
          <div className="data-table-card compact-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Line</th>
                  <th>Process</th>
                  <th>Model</th>
                  <th>Diff</th>
                </tr>
              </thead>
              <tbody>
                {yieldLogRows.slice(0, 5).map((row) => (
                  <tr key={`${row.date}-${row.line}-${row.process}`} className={row.diff <= -3 ? 'danger-row' : ''}>
                    <td>{row.date.slice(5)}</td>
                    <td>{row.line}</td>
                    <td>{row.process}</td>
                    <td>{row.model}</td>
                    <td>{row.diff.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="yield-case-panel result-panel">
          <span>After: AI 산출물</span>
          <h4>빨간 표시, 추이 그래프, 보고서 초안이 한 화면에 나옵니다</h4>
          <YieldTrendChart />
          <div className="ai-report-card">
            <div className="visual-header">
              <span>Auto Report</span>
              <strong>Yield Drop Summary</strong>
            </div>
            {aiReportFindings.map((item) => (
              <div className="finding-card" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="detected-list compact-detected">
            {detectedDrops.map((item) => (
              <div key={`${item.line}-${item.process}-${item.model}`}>
                <strong>{item.line} Line · {item.process}</strong>
                <span>{item.model} / {item.diff.toFixed(1)}%p 하락</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <p className="case-takeaway">
        핵심은 AI가 최종 판단을 대신하는 것이 아닙니다. AI가 먼저 봐야 할 이상 후보를 정리하고,
        엔지니어가 공정·설비·검사 이력으로 검증하는 구조를 만드는 것입니다.
      </p>
      <VerifyChecklist points={yieldVerifyPoints} />
    </div>
  );
}

function AoiTile({ sample }: { sample: typeof aoiSamples[number] }) {
  return (
    <div className={`aoi-tile ${sample.type.toLowerCase()}`}>
      <div className="aoi-image">
        <span />
        <i />
      </div>
      <strong>{sample.id}</strong>
      <em>{sample.type}</em>
    </div>
  );
}

function AoiMicroTile({ item }: { item: typeof aoiImageWall[number] }) {
  return (
    <div className={`aoi-micro-tile ${item.type.toLowerCase()} ${item.flagged ? 'flagged' : ''}`}>
      <span />
    </div>
  );
}

function AoiCaseDeepDive() {
  return (
    <div className="deep-dive aoi-deep-dive">
      <div className="deep-dive-heading">
        <span>Case 02 Deep Dive</span>
        <h3>AOI 불량 이미지 분류: 폴더 넘기기에서 리뷰용 대시보드로</h3>
        <p>
          AOI(Automated Optical Inspection)는 카메라와 조명으로 패널 표면을 촬영해 Scratch, Particle, Mura 같은
          외관 불량 후보를 찾아내는 자동 광학 검사입니다. 장비가 이미지를 찍어주더라도 최종 리뷰에서는 사람이
          수백 장의 이미지를 넘기며 유형을 기록하고 우선순위를 정해야 하는 경우가 많습니다.
        </p>
        <div className="aoi-definition-grid">
          <div><strong>Scratch</strong><span>이송/접촉 과정에서 생긴 선형 흠집 후보</span></div>
          <div><strong>Particle</strong><span>먼지, 이물, 국부 점 결함 후보</span></div>
          <div><strong>Mura</strong><span>얼룩, 휘도 불균일, 면 형태 결함 후보</span></div>
        </div>
      </div>

      <div className="yield-case-compare vertical-case-flow" aria-label="AOI 불량 이미지 분류 Before Prompt After 비교">
        <article className="yield-case-panel manual-panel aoi-manual-panel">
          <span>Before: 기존 이미지 폴더 수작업</span>
          <h4>이미지를 넘기며 Scratch, Particle, Mura를 사람이 직접 기록합니다</h4>
          <div className="folder-chaos">
            {aoiFolders.map((folder) => (
              <div className="folder-card" key={folder.name}>
                <div className="folder-tab" />
                <strong>{folder.name}</strong>
                <span>{folder.count} images</span>
                <div className="folder-thumbs">
                  {aoiImageWall.slice(0, 18).map((sample) => (
                    <i className={sample.type.toLowerCase()} key={`${folder.name}-${sample.id}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="aoi-image-wall" aria-label="수작업 검토 대상 AOI 이미지 다량 예시">
            {aoiImageWall.map((item) => (
              <AoiMicroTile item={item} key={item.id} />
            ))}
          </div>
          <ul>
            {aoiManualSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="pain-metrics">
            <div><strong>668장</strong><span>이미지 후보</span></div>
            <div><strong>3유형</strong><span>육안 분류</span></div>
            <div><strong>1-2시간</strong><span>확대·기록 반복</span></div>
          </div>
        </article>

        <article className="yield-case-panel prompt-panel">
          <span>Prompt: 바이브 코딩 지시</span>
          <h4>분류 기준과 리뷰 화면을 함께 요청합니다</h4>
          <p>
            AOI 이미지 샘플을 Scratch, Particle, Mura 유형별로 분류하고, 유형별 대표 이미지와 신뢰도,
            검토 우선순위를 포함한 리뷰용 대시보드를 만들어줘. 파일명, Lot, Line 정보를 함께 표시하고
            엔지니어가 재검토해야 할 애매한 이미지는 별도 그룹으로 묶어줘.
          </p>
          <div className="aoi-rule-grid">
            <div><strong>Scratch</strong><span>길고 얇은 선형 결함</span></div>
            <div><strong>Particle</strong><span>점 형태의 국부 결함</span></div>
            <div><strong>Mura</strong><span>면 형태의 얼룩/휘도 불균일</span></div>
          </div>
          <div className="aoi-ai-promise">
            <strong>바이브 코딩으로 바뀌는 점</strong>
            <span>폴더 구조와 분류 기준을 설명하면 AI가 이미지 묶음, 대표 이미지, 재검토 후보, 우선순위 표를 한 번에 구성합니다.</span>
          </div>
        </article>

        <article className="yield-case-panel result-panel">
          <span>After: AI 산출물</span>
          <h4>유형별 갤러리와 검토 우선순위가 한 화면에 정리됩니다</h4>
          <div className="aoi-dashboard">
            <div className="aoi-gallery">
              {aoiSamples.map((sample) => (
                <AoiTile sample={sample} key={sample.id} />
              ))}
            </div>
            <div className="aoi-summary-list">
              {aoiSummary.map((item) => (
                <div key={item.type}>
                  <strong>{item.type}</strong>
                  <span>{item.count}건 · {item.action}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="data-table-card compact-table aoi-result-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Conf.</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {aoiSamples.slice(0, 5).map((sample) => (
                  <tr key={sample.id} className={sample.priority === 'High' ? 'danger-row' : ''}>
                    <td>{sample.id}</td>
                    <td>{sample.type}</td>
                    <td>{sample.confidence}%</td>
                    <td>{sample.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="aoi-impact-strip">
            <div><strong>668 → 24</strong><span>우선 검토 후보 축소</span></div>
            <div><strong>3개 갤러리</strong><span>유형별 자동 분류</span></div>
            <div><strong>TOP 우선순위</strong><span>회의용 리뷰 순서 생성</span></div>
          </div>
          <div className="aoi-chart-wrap">
            <DefectParetoChart />
          </div>
        </article>
      </div>

      <p className="case-takeaway">
        핵심은 AI가 불량 원인을 확정하는 것이 아니라, 수백 장의 이미지를 유형별로 먼저 묶어
        엔지니어가 우선 검토할 대상을 빠르게 좁혀주는 것입니다.
      </p>
      <VerifyChecklist points={aoiVerifyPoints} />
    </div>
  );
}

// ── 검증 체크포인트 컴포넌트 ─────────────────────────────────
function VerifyChecklist({ points }: { points: string[] }) {
  return (
    <div className="verify-checklist">
      <span>엔지니어 검증 포인트</span>
      {points.map((point) => (
        <div className="verify-item" key={point}>
          <CheckCircle2 size={15} />
          <p>{point}</p>
        </div>
      ))}
    </div>
  );
}

// ── AI 대화 비교 컴포넌트 ─────────────────────────────────────
function AIDialogueDemo() {
  return (
    <div className="ai-dialogue-section">
      <div className="ai-dialogue-heading">
        <span>AI 응답 비교</span>
        <h3>같은 의도라도 지시 방식에 따라 AI 반응이 완전히 달라집니다</h3>
        <p>아래 두 프롬프트는 모두 "수율 문제를 분석해달라"는 의도를 담고 있습니다. 무엇이 다른지 확인하세요.</p>
      </div>
      <div className="ai-dialogue-grid">
        {aiDialogueData.map((item) => (
          <div
            key={item.id}
            className="ai-dialogue-card"
            style={{ background: item.bg, borderColor: item.border }}
          >
            <span className="dialogue-type-label" style={{ color: item.tagColor }}>
              {item.id === 'bad' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
              {item.label}
            </span>
            <div className="dialogue-prompt-box">
              <strong>입력한 프롬프트</strong>
              <pre>{item.prompt}</pre>
            </div>
            <div className="dialogue-response-box" style={{ background: item.responseBg }}>
              <strong>AI의 반응</strong>
              <pre>{item.response}</pre>
            </div>
            <div className="dialogue-score-row">
              <span>즉각 실행성</span>
              <div className="dialogue-score-track">
                <i style={{ width: `${item.score}%`, background: item.scoreColor }} />
              </div>
              <strong style={{ color: item.scoreColor }}>{item.score}%</strong>
            </div>
            <div className="dialogue-result-tag" style={{ color: item.tagColor, borderColor: item.border }}>
              {item.resultTag}
            </div>
          </div>
        ))}
      </div>
      <p className="dialogue-takeaway">
        핵심: 5요소(문제·데이터·기준·산출물·검증)를 갖춘 지시는 AI가 역질문 없이 즉시 분석 도구를 만들어냅니다.
      </p>
    </div>
  );
}

// ── 인터랙티브 워크숍 ─────────────────────────────────────────
function InteractiveWorkshop() {
  const [fields, setFields] = useState({
    process: '',
    problem: '',
    data: '',
    criteria: '',
    output: '',
  });
  const [copied, setCopied] = useState(false);

  const hasContent = Object.values(fields).some(Boolean);

  const generated = hasContent
    ? `나는 ${fields.process || '[공정/장비/데이터]'}에서 ${fields.problem || '[문제 현상]'}을 확인하고 싶다. 입력 데이터는 ${fields.data || '[컬럼/단위/기간]'}으로 구성되어 있다. 정상 기준은 ${fields.criteria || '[spec/관리 한계]'}이며, 결과물은 ${fields.output || '[표/그래프/대시보드/보고서]'} 형태로 만들어야 한다. 마지막에는 엔지니어가 확인해야 할 리스크와 추가 질문을 정리해줘.`
    : '';

  const handleCopy = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const inputRows: { key: keyof typeof fields; label: string; placeholder: string }[] = [
    { key: 'process', label: '공정/장비/데이터', placeholder: '예: CVD 설비 EQP-17, 온도 센서 1분 로그' },
    { key: 'problem', label: '문제 현상', placeholder: '예: 특정 Lot 이후 막두께 산포가 커지고 목표값 초과' },
    { key: 'data', label: '데이터 컬럼·기간', placeholder: '예: Lot ID, 설비 ID, Recipe, Temp, Pressure (최근 14일)' },
    { key: 'criteria', label: '판정 기준', placeholder: '예: 목표 120nm ± 5nm, UCL/LCL 초과 시 이상' },
    { key: 'output', label: '원하는 산출물', placeholder: '예: 설비별 box plot, 이상 Lot 목록, 원인 후보 3개, HTML 리포트' },
  ];

  return (
    <div className="interactive-workshop">
      <div className="iw-header">
        <FileText size={22} color="var(--accent)" />
        <strong>5요소 직접 입력하기</strong>
        <p>빈칸을 채우면 작업지시서가 자동으로 완성됩니다.</p>
      </div>
      <div className="iw-body">
        <div className="iw-inputs">
          {inputRows.map((row) => (
            <div className="iw-field" key={row.key}>
              <label htmlFor={`iw-${row.key}`}>{row.label}</label>
              <input
                id={`iw-${row.key}`}
                type="text"
                placeholder={row.placeholder}
                value={fields[row.key]}
                onChange={(e) => setFields((prev) => ({ ...prev, [row.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <div className="iw-output">
          <div className="iw-output-header">
            <Bot size={18} color="var(--accent)" />
            <strong>완성된 작업지시서</strong>
          </div>
          <div className={`iw-generated-text ${hasContent ? 'active' : ''}`}>
            {generated || '위 5요소를 하나씩 입력하면\n작업지시서가 완성됩니다.'}
          </div>
          <button
            className={`iw-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            disabled={!hasContent}
          >
            {copied
              ? <><Check size={15} />복사됨!</>
              : <><Copy size={15} />Claude에 복사하기</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 첫 실행 가이드 ─────────────────────────────────────────────
function FirstRunGuide() {
  return (
    <div className="first-run-guide">
      <div className="frg-title">
        <ExternalLink size={18} color="var(--accent)" />
        <strong>지금 바로 해보기 — Claude에서 첫 번째 실행</strong>
      </div>
      <div className="frg-steps">
        {firstRunSteps.map((item) => (
          <div className="frg-step" key={item.step}>
            <span className="frg-num">{item.step}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 2강 예고 컴포넌트 ─────────────────────────────────────────
function NextLecturePreview() {
  return (
    <div className="next-lecture-card">
      <div className="nlc-header">
        <span>2강 미리보기</span>
        <h3>의도를 결과로 바꾸는 프롬프트 설계: TCREI 프레임워크</h3>
        <p>오늘 만든 5요소 작업지시서를 구조화하면 AI가 더 정밀하게 반응합니다. 2강에서는 TCREI 프레임워크로 작업지시서를 업그레이드합니다.</p>
      </div>
      <div className="tcrei-grid">
        {tcreiItems.map((item) => (
          <div className="tcrei-item" key={item.label}>
            <span className="tcrei-letter">{item.label}</span>
            <strong>{item.name}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-top">
          <motion.div 
            className="logo-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img 
              src="/lecture01/logo.png" 
              alt="LettUin Edu" 
              className="header-logo"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </motion.div>
          
          <motion.div 
            className="header-tag-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="header-tag">AI를 지휘하는 스마트한 엔지니어의 시작</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Ch.1 엔지니어를 위한 바이브 코딩 첫걸음</h1>
          <p className="subtitle">코알못도 첨단 공정 현장의 반복 분석·보고서·이상감지를 AI에게 작업지시서로 맡기는 첫걸음</p>
          <div className="lesson-meta" aria-label="lesson summary">
            <span>40분</span>
            <span>마인드셋</span>
            <span>실습 포함</span>
            <span>결과물: 첫 AI 작업지시서</span>
          </div>
        </motion.div>
      </header>

      <main>
        <section className="overview-section">
          <span className="section-label">01. 오프닝 및 학습목표</span>
          <h2>오늘 여러분은 “코딩 문법”이 아니라 “AI 작업지시서”로 반도체, 디스플레이, 2차 전지 등 엔지니어의 업무를 이해할 수 있습니다</h2>
          <p className="section-intro">
            이 강의는 개발자가 되기 위한 문법 수업이 아닙니다. 코드를 몰라도 시작할 수 있도록
            “무엇을 만들지, 어떤 데이터를 쓸지, 어떤 기준으로 판단할지”를 AI에게 정확히 설명하는 법을 배우는 첫 시간입니다.
          </p>
          <div className="learning-goals-grid" aria-label="학습목표">
            {learningGoals.map((item) => (
              <div className="learning-goal-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="goal-visual-wrapper">
                  <GoalVisual type={item.type} />
                </div>
              </div>
            ))}
          </div>
          <div className="lesson-timeline" aria-label="40분 강의 진행표">
            {lessonFlow.map((item) => (
              <div className="timeline-step" key={item.label}>
                <strong>{item.time}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="definition-section">
          <span className="section-label">02. 바이브 코딩이란?</span>
          <h2>바이브 코딩은 “코드를 치는 일”보다 “AI가 일할 수 있게 주문서를 쓰는 일”에 가깝습니다</h2>
          <p className="section-intro">
            요리사가 칼질과 조리를 맡더라도 주문서가 부정확하면 원하는 음식이 나오지 않습니다.
            바이브 코딩도 마찬가지입니다. 사람은 문제, 데이터, 판단 기준, 원하는 결과물을 설명하고,
            AI는 코드, 차트, 대시보드, 보고서 초안을 만듭니다.
          </p>
          <div className="one-line-definition inline-definition">
            <span>한 문장 정의</span>
            <strong>바이브 코딩은 코드를 직접 짜는 것이 아니라, 내가 만들고 싶은 결과를 말로 설명하면 AI가 코드를 대신 만들어주는 방식입니다.</strong>
          </div>
          <div className="plain-definition-grid" aria-label="코알못을 위한 바이브 코딩 핵심 설명">
            <div>
              <span>기존 코딩</span>
              <strong>사람이 문법을 외우고 코드를 직접 작성</strong>
            </div>
            <div>
              <span>바이브 코딩</span>
              <strong>사람이 작업지시서를 쓰고 AI가 초안을 구현</strong>
            </div>
            <div>
              <span>사람의 역할</span>
              <strong>문제 정의, 기준 제시, 결과 검증</strong>
            </div>
          </div>
          <div className="role-flow" aria-label="바이브 코딩 역할 분리 흐름도">
            {roleFlow.map((item, index) => (
              <div className="role-step" key={`${item.owner}-${item.task}`}>
                <span>{item.owner}</span>
                <strong>{item.task}</strong>
                {index < roleFlow.length - 1 && <ArrowRight size={22} />}
              </div>
            ))}
          </div>
          <div className="coding-compare-grid">
            <motion.article
              className="coding-compare-card traditional"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img src="/lecture01/traditional-coding.png" alt="전통적인 코딩 방식" />
              <div className="compare-content">
                <span className="compare-kicker">Traditional Coding</span>
                <h3>사람이 코드와 오류를 직접 다룹니다</h3>
                <p>
                  문법, 라이브러리, 디버깅, 화면 구성까지 사람이 직접 챙겨야 합니다. 처음 배우는 수강생은
                  “무엇을 만들지”보다 “왜 에러가 나는지”에 시간을 많이 씁니다.
                </p>
                <ul>
                  <li>문법과 구현 순서를 먼저 배워야 함</li>
                  <li>작은 오타와 설정 오류가 진행을 막음</li>
                  <li>현장 문제보다 코드 수정에 집중하기 쉬움</li>
                </ul>
              </div>
            </motion.article>

            <motion.article
              className="coding-compare-card vibe"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
            >
              <img src="/lecture01/vibe-coding.png" alt="바이브 코딩 방식" />
              <div className="compare-content">
                <span className="compare-kicker">Vibe Coding</span>
                <h3>엔지니어가 의도를 말하면 AI가 도구를 만듭니다</h3>
                <p>
                  “어떤 데이터로 무엇을 판단할지”를 명확히 말하면 AI가 코드, 차트, 대시보드, 보고서 초안을 빠르게
                  만듭니다. 엔지니어는 결과의 타당성과 현장 적용성을 판단합니다.
                </p>
                <ul>
                  <li>한국어와 전공 용어로 바로 시작 가능</li>
                  <li>몇 시간 걸리던 초안을 몇 분 안에 확인</li>
                  <li>수율, 불량, 설비 문제 해결에 집중</li>
                </ul>
              </div>
            </motion.article>
          </div>

          <div className="innovation-callout">
            <Zap size={26} />
            <div>
              <h3>혁신의 핵심</h3>
              <p>
                코딩 실력의 출발점이 “문법 암기”에서 “문제 정의 능력”으로 이동합니다.
                그래서 첨단 공정기술 엔지니어에게 필요한 것은 개발자가 되는 것이 아니라,
                AI가 일할 수 있을 만큼 정확하게 공정 문제를 설명하는 능력입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section>
          <span className="section-label">03. 핵심 비유</span>
          <h2>
            "바이브 코딩은 엔진 조립이 아니라 목적지를 말하는 일입니다"
          </h2>
          <div className="highlight-box">
            <p className="quote">"자동차 운전을 할 때 엔진 오일의 점도나 피스톤의 회전 속도를 일일이 계산하며 타시나요?"</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-secondary)', marginTop: '1.5rem', lineHeight: '1.6' }}>
              운전자는 엔진을 직접 조립하지 않아도 목적지, 속도, 안전 기준을 정합니다.<br/>
              바이브 코딩에서도 구현은 AI가 돕고, 엔지니어는 문제 정의와 검증 기준을 책임집니다.
            </p>
          </div>
          <div className="navigation-visual" aria-label="목적지 지시 예시">
            <div className="nav-card">
              <span>목적지</span>
              <strong>Array 수율 하락 원인 후보</strong>
            </div>
            <ArrowRight size={24} />
            <div className="nav-card">
              <span>조건</span>
              <strong>최근 7일, 3% 이상 하락</strong>
            </div>
            <ArrowRight size={24} />
            <div className="nav-card active">
              <span>도착 결과</span>
              <strong>차트 + TOP5 + 확인 질문</strong>
            </div>
          </div>
          <motion.div 
            className="comic-grid-horizontal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="comic-item">
              <img src="/lecture01/panel1.png" alt="복잡한 원리" />
              <span>복잡한 엔진 원리 몰라도...</span>
            </div>
            <div className="comic-item">
              <img src="/lecture01/panel2.png" alt="단순한 시작" />
              <span>그냥 시동 걸고 출발!</span>
            </div>
            <div className="comic-item">
              <img src="/lecture01/panel3.png" alt="목적지 설정" />
              <span>목적지만 정하세요</span>
            </div>
            <div className="comic-item">
              <img src="/lecture01/panel4.png" alt="여행 성공" />
              <span>즐거운 여행 성공!</span>
            </div>
          </motion.div>
          <p style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginTop: '2rem', textAlign: 'center', fontWeight: 800, wordBreak: 'keep-all' }}>
            복잡한 구현(코딩)은 AI가, 최종 목적지(의도) 결정은 엔지니어가 합니다.
          </p>

          <motion.div 
            className="important-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ marginTop: '4rem', padding: '2.5rem', background: '#fff9e6', borderRadius: '24px', border: '1px solid #ffeeba' }}
          >
            <h3 style={{ color: '#856404', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} /> 꼭 기억하세요!
            </h3>
            <p style={{ fontSize: '1.2rem', color: '#533f03', fontWeight: 600, lineHeight: 1.5 }}>
              "여러분, 삼성이든 SK하이닉스든 현장에서 원하는 엔지니어는 '코드를 잘 치는 사람'이 아닙니다.<br/>
              '데이터를 보고 어떤 로직이 필요한지 설계할 수 있는 사람'입니다."
            </p>
          </motion.div>
        </section>

        {/* Section 2 */}
        <section className="trad-vibe-section">
          <span className="section-label">04. 전통 코딩 vs 바이브 코딩</span>
          <h2>'설명서'를 쓰는 사람 vs '목적지'를 말하는 사람</h2>
          <p className="section-intro">
            코알못에게는 “기술이 다르다”보다 “생각 순서가 다르다”가 더 중요합니다.
            아래 그림은 사람이 직접 구현을 붙잡는 방식과, AI에게 해결 과정을 맡기는 방식을 나란히 보여줍니다.
          </p>
          <div className="trad-vibe-board" aria-label="전통 코딩과 바이브 코딩 시각 비교">
            <motion.div className="trad-vibe-column traditional" whileHover={{ y: -4 }}>
              <div className="trad-vibe-head">
                <Terminal size={28} />
                <div>
                  <span>Traditional Coding</span>
                  <strong>설명서를 직접 조립하는 방식</strong>
                </div>
              </div>
              <ComplexCodeVisual />
              <div className="trad-vibe-stepline">
                <div><span>1</span><p>문법을 외운다</p></div>
                <ArrowRight size={18} />
                <div><span>2</span><p>코드를 한 줄씩 쓴다</p></div>
                <ArrowRight size={18} />
                <div><span>3</span><p>오류를 찾고 수정한다</p></div>
              </div>
              <div className="trad-vibe-summary">
                <strong>무엇이 어려운가?</strong>
                <p>문법과 설정이 먼저라서, 현장 문제보다 구현 세부에 시간을 많이 씁니다.</p>
              </div>
            </motion.div>

            <motion.div className="trad-vibe-column vibe" whileHover={{ y: -4 }}>
              <div className="trad-vibe-head">
                <Navigation size={28} />
                <div>
                  <span>Vibe Coding</span>
                  <strong>목적지를 먼저 말하는 방식</strong>
                </div>
              </div>
              <VibeIntentVisual />
              <div className="trad-vibe-stepline">
                <div><span>1</span><p>문제와 기준을 말한다</p></div>
                <ArrowRight size={18} />
                <div><span>2</span><p>AI가 초안을 만든다</p></div>
                <ArrowRight size={18} />
                <div><span>3</span><p>사람이 결과를 검증한다</p></div>
              </div>
              <div className="trad-vibe-summary">
                <strong>무엇이 쉬워지는가?</strong>
                <p>라인, 공정, 기준, 산출물을 먼저 말하므로 결과를 빨리 보고 수정 방향도 쉽게 잡습니다.</p>
              </div>
            </motion.div>
          </div>
          <div className="trad-vibe-table" aria-label="전통 코딩과 바이브 코딩 비교표">
            {tradVibeSteps.map((item) => (
              <div className="trad-vibe-row" key={item.label}>
                <span className="row-label">{item.label}</span>
                <div className="row-col">
                  <strong>전통</strong>
                  <p>{item.traditional}</p>
                </div>
                <div className="row-col vibe-col">
                  <strong>바이브</strong>
                  <p>{item.vibe}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <span className="section-label">05. 왜 중요한가?</span>
          <h2>왜 첨단 공정기술 엔지니어에게 중요한가?</h2>
          <p className="section-intro">
            AI는 공정 지식을 대신하지 않습니다. 대신 반복되는 데이터 정리, 초안 작성, 이상 구간 탐색을 빠르게 처리해
            엔지니어가 원인 판단과 의사결정에 더 많은 시간을 쓰게 만듭니다.
          </p>
          <div className="impact-grid">
            {impactExamples.map((item) => (
              <div className="impact-card" key={item.title}>
                <h3>{item.title}</h3>
                <div>
                  <span>Before</span>
                  <p>{item.before}</p>
                </div>
                <div>
                  <span>After AI</span>
                  <p>{item.after}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="highlight-box" style={{ background: '#f5f5f7', borderLeftColor: '#333' }}>
            <p style={{ fontWeight: 700 }}>Target Point:</p>
            <p>"기업은 단순 문법 암기자가 아니라, AI를 활용해 공정 데이터 분석·보고서·이상감지를 빠르게 자동화하는 첨단 공정기술 엔지니어를 원합니다."</p>
          </div>
          <div className="mini-dashboard" aria-label="AI 자동화 결과물 샘플 대시보드">
            <YieldTrendChart />
            <div className="report-preview">
              <div className="visual-header">
                <span>AI Report Draft</span>
                <strong>1-page summary</strong>
              </div>
              <ul>
                <li><b>이상 구간</b> D-2, D-1 수율 90% 미만</li>
                <li><b>원인 후보</b> 설비 A 온도 상승, 검사 불량률 증가</li>
                <li><b>확인 질문</b> Recipe 변경 이력과 PM 기록 확인 필요</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <span className="section-label">06. 첨단 공정기술 사례</span>
          <h2>이 강의는 일반 코딩 수업이 아니라, 반도체·디스플레이·이차전지 등 첨단 공정기술 엔지니어의 업무 자동화 수업입니다</h2>
          <p className="section-intro">
            바이브 코딩의 출발점은 문법이 아니라 현장 문제입니다. 수율, AOI, 센서 로그처럼 이미 여러분이 알고 있는
            업무 언어를 AI가 실행 가능한 지시로 바꾸는 것이 핵심입니다.
          </p>
          <div className="scenario-grid">
            {fieldScenarios.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  className="scenario-card"
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="scenario-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{item.title}</h3>
                  <p className="scenario-before">{item.before}</p>
                  <div className="intent-box">
                    <span>의도 지시문</span>
                    <p>{item.intent}</p>
                  </div>
                  <p className="scenario-output">{item.output}</p>
                </motion.div>
              );
            })}
          </div>
          <YieldCaseDeepDive />
          <AoiCaseDeepDive />
          <SensorCaseDeepDive />
          <div className="case-visual-grid">
            <SensorControlChart />
          </div>
        </section>

        <section className="intent-section teaching-section">
          <span className="section-label">07. 의도 설계</span>
          <h2>좋은 의도는 <mark>“해줘”</mark>가 아니라, 판단 기준과 결과물까지 포함합니다</h2>
          <p className="section-intro">
            코알못에게 가장 중요한 실력은 코드를 외우는 것이 아니라, AI가 헷갈리지 않도록
            <span className="highlight-pen"> 문제·데이터·기준·산출물·검증조건</span>을 순서대로 적는 것입니다.
          </p>
          <div className="speech-note">
            <Sparkles size={20} />
            <p>강의 멘트: “AI에게 일을 맡길 때는 부탁이 아니라 작업지시서를 써야 합니다.”</p>
          </div>
          <div className="comparison-panel">
            <div className="bad-prompt">
              <h3>부족한 지시</h3>
              <p><span className="wavy-wrong">수율 분석해줘.</span></p>
              <span>문제: 데이터 범위, 기준, 출력물, 검증 조건이 없습니다.</span>
            </div>
            <ArrowRight className="comparison-arrow" size={32} />
            <div className="good-prompt">
              <h3>엔지니어형 지시</h3>
              <p>
                최근 2주간 Array 공정의 라인/모델/설비별 수율을 비교하고, 전일 대비 3% 이상 하락한 구간을 표시해줘.
                원인 후보는 온도, 압력, 검사 불량률과 함께 우선순위로 정리하고 HTML 대시보드로 보여줘.
              </p>
              <span>핵심: 데이터, 기준, 분석 관점, 산출물이 한 번에 정의됩니다.</span>
            </div>
          </div>
          <AIDialogueDemo />
          <div className="prompt-table-card" aria-label="부족한 표현과 좋은 표현 비교표">
            <div className="visual-header">
              <span>Prompt Upgrade Table</span>
              <strong>모호한 말에서 작업지시서로</strong>
            </div>
            <table>
              <thead>
                <tr>
                  <th>구성</th>
                  <th>모호한 표현</th>
                  <th>좋은 표현</th>
                </tr>
              </thead>
              <tbody>
                {promptExampleRows.map((row) => (
                  <tr key={row.part}>
                    <td><b>{row.part}</b></td>
                    <td className="weak-cell">{row.weak}</td>
                    <td>{row.strong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="prompt-anatomy" aria-label="좋은 작업지시서 구성 요소">
            {promptParts.map((item) => (
              <div className="prompt-part" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="intent-visual-lab" aria-label="좋은 작업지시서를 입력했을 때 기대할 수 있는 산출물 예시">
            <div className="score-dashboard">
              <div className="visual-header">
                <span>Prompt Quality</span>
                <strong>작업지시서 점검</strong>
              </div>
              {promptScoreCards.map((item) => (
                <div className="score-row" key={item.label}>
                  <span>{item.label}</span>
                  <div><i style={{ width: `${item.score}%` }} /></div>
                  <strong>{item.score}</strong>
                </div>
              ))}
            </div>
            <div className="mock-output-board">
              <div className="visual-header">
                <span>AI Output Preview</span>
                <strong>예상 산출물</strong>
              </div>
              <div className="mock-chart">
                <i style={{ height: '46%' }} />
                <i style={{ height: '62%' }} />
                <i className="danger" style={{ height: '88%' }} />
                <i style={{ height: '54%' }} />
                <i className="danger" style={{ height: '78%' }} />
              </div>
              <ul>
                <li><b>위험 TOP5</b> 기준 초과 항목만 정렬</li>
                <li><b>원인 후보</b> 센서·AOI·Recipe와 연결</li>
                <li><b>검증 질문</b> 사람이 확인할 리스크 분리</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="workshop-section teaching-section">
          <span className="section-label">08. 미니 워크숍</span>
          <h2>실습: 나의 첫 <mark>AI 작업지시서</mark> 만들기</h2>
          <p className="section-intro">
            아래 3단계를 채우면 다음 강의에서 바로 프롬프트로 발전시킬 수 있는 개인용 작업지시서가 됩니다.
            빈칸을 완벽하게 채우는 것보다, <span className="highlight-pen">현장 문제를 AI가 이해할 수 있는 구조로 바꾸는 연습</span>이 목표입니다.
          </p>
          <div className="workshop-flow" aria-label="8분 미니 워크숍 진행 흐름">
            <div><strong>2분</strong><span>내 업무 문제 고르기</span></div>
            <div><strong>3분</strong><span>데이터·기준 채우기</span></div>
            <div><strong>2분</strong><span>원하는 산출물 정하기</span></div>
            <div><strong>1분</strong><span>검증 질문 추가</span></div>
          </div>
          <div className="practice-board">
            {practiceSteps.map((item) => (
              <div className="practice-step" key={item.step}>
                <span className="step-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="workshop-example-grid" aria-label="실습 주제별 작업지시서 예시">
            {workshopExamples.map((item) => (
              <div className="workshop-example-card" key={item.title}>
                <span>{item.title}</span>
                <strong>{item.context}</strong>
                <p>{item.prompt}</p>
              </div>
            ))}
          </div>
          <InteractiveWorkshop />
          <FirstRunGuide />
        </section>

        <section>
          <span className="section-label">09. 품질 점검 및 정리</span>
          <h2>AI에게 보내기 전, 이 5가지만 확인하세요</h2>
          <div className="checklist">
            {intentChecklist.map((item) => (
              <div className="check-item" key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="wrap-message">
            <Quote size={36} color="var(--accent)" />
            <h3>"코드를 외우기 전에, 먼저 업무 의도를 정확히 정의하세요."</h3>
            <p>다음 강의: 그 의도를 어떻게 AI에게 전달할까요? (프롬프트 기획)</p>
          </div>
          <NextLecturePreview />
          <div className="lesson-actions">
            {navigationLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
                <ArrowRight size={16} />
              </a>
            ))}
          </div>
        </section>

        <section className="professional-point">
          <div className="highlight-box" style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '24px' }}>
            <h3>Advanced Process Engineering Point</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem', fontSize: '1.1rem' }}>
              "바이브 코딩은 개발자 흉내가 아니라, 공정 데이터를 분석하고 보고서와 이상감지 초안을 자동화하는 실무형 문제 해결 방식입니다."<br/>
              AI가 만든 결과는 초안이며, 최종 판단은 공정과 장비를 이해하는 엔지니어가 검증합니다.
            </p>
            <div className="point-strip">
              <span><Wrench size={16} /> 도구는 AI가 만듭니다</span>
              <span><Target size={16} /> 문제는 엔지니어가 정의합니다</span>
              <span><CheckCircle2 size={16} /> 판단은 사람이 검증합니다</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Vibe Coding for Fine Tech Engineering | LettUin Edu</p>
      </footer>
    </div>
  )
}
