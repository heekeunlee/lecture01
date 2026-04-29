import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileText,
  Gauge,
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

const promptParts = [
  { label: '문제', text: '어떤 현상을 확인할 것인가?' },
  { label: '데이터', text: '파일·컬럼·기간·단위는 무엇인가?' },
  { label: '기준', text: '정상/이상 판정 기준은 무엇인가?' },
  { label: '산출물', text: '표·그래프·대시보드 중 무엇인가?' },
  { label: '검증', text: '사람이 다시 볼 리스크는 무엇인가?' },
];

const navigationLinks = [
  { label: '커리큘럼으로 돌아가기', href: 'https://heekeunlee.github.io/lecture_assist001/' },
  { label: '2강 프롬프트 기획 예고', href: 'https://heekeunlee.github.io/lecture_assist001/' },
];

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
        </article>
      </div>

      <p className="case-takeaway">
        핵심은 AI가 불량 원인을 확정하는 것이 아니라, 수백 장의 이미지를 유형별로 먼저 묶어
        엔지니어가 우선 검토할 대상을 빠르게 좁혀주는 것입니다.
      </p>
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

          <motion.div 
            className="philosophy-tag"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span>엔지니어링의 본질은 코드가 아닌 해결입니다</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>1. 바이브 코딩: '코딩'의 시대에서 '의도'의 시대로</h1>
          <p className="subtitle">제조 현장의 반복 분석·보고서·이상감지를 AI로 자동화하는 첫걸음</p>
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
          <span className="section-label">00. Opening & Learning Goal (3분)</span>
          <h2>오늘 40분 뒤, 여러분은 AI에게 맡길 업무를 작업지시서로 설명할 수 있습니다</h2>
          <p className="section-intro">
            이 강의는 개발자가 되기 위한 문법 수업이 아닙니다. 제조/공정 엔지니어가 반복 분석, 보고서 작성,
            이상 감지 업무를 AI에게 정확히 지시하는 법을 배우는 첫 시간입니다.
          </p>
          <div className="outcome-grid">
            <div className="outcome-card">
              <Target size={28} color="var(--accent)" />
              <h3>개념 구분</h3>
              <p>전통 코딩과 바이브 코딩의 차이를 말할 수 있습니다.</p>
            </div>
            <div className="outcome-card">
              <Factory size={28} color="var(--accent)" />
              <h3>업무 연결</h3>
              <p>수율, 불량, 설비 로그 업무에 AI를 어떻게 붙일지 이해합니다.</p>
            </div>
            <div className="outcome-card">
              <ClipboardCheck size={28} color="var(--accent)" />
              <h3>실습 산출물</h3>
              <p>데이터, 기준, 결과물이 포함된 나의 첫 작업지시서를 완성합니다.</p>
            </div>
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
          <span className="section-label">01. What is Vibe Coding? (4분)</span>
          <h2>바이브 코딩은 “문법을 입력하는 일”이 아니라 “의도를 설계하고 AI를 지휘하는 일”입니다</h2>
          <p className="section-intro">
            바이브 코딩이란 코드 문법 대신 의도(Vibe)를 언어로 담아 AI가 구현을 만들도록 지시하는 방식입니다.
            엔지니어는 문제, 데이터, 판단 기준, 원하는 결과물을 정의하고, AI가 만든 결과가 현장 기준에 맞는지 검증합니다.
          </p>
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
                그래서 디스플레이 엔지니어에게 필요한 것은 개발자가 되는 것이 아니라,
                AI가 일할 수 있을 만큼 정확하게 공정 문제를 설명하는 능력입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section>
          <span className="section-label">02. Core Analogy (3분)</span>
          <h2 style={{ fontSize: '3rem', color: 'var(--accent)', fontWeight: 900, marginBottom: '2rem' }}>
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
        <section>
          <span className="section-label">03. Traditional vs Vibe (3분)</span>
          <h2>'설명서'를 쓰는 사람 vs '목적지'를 말하는 사람</h2>
          <div className="card-grid">
            <motion.div className="card" whileHover={{ y: -5 }}>
              <Terminal size={32} color="#888" style={{ marginBottom: '1rem' }} />
              <h3>전통적 코딩 (수동 운전)</h3>
              <p>1단을 넣고 클러치를 떼며 엑셀을 밟는 과정. 세미콜론 하나 틀리면 시동이 꺼집니다. 문법을 배우느라 본질을 놓칩니다.</p>
            </motion.div>
            <motion.div className="card" whileHover={{ y: -5 }} style={{ borderColor: 'var(--accent)' }}>
              <Navigation size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3>바이브 코딩 (자율 주행)</h3>
              <p>"최근 7일 수율 데이터를 라인별로 비교하고, 3% 이상 하락한 항목을 표시해줘"처럼 목적지와 판단 기준을 말합니다.</p>
            </motion.div>
          </div>
          <div className="prompt-pipeline" aria-label="전통 코딩과 바이브 코딩 절차 비교">
            <div>
              <span>전통 코딩</span>
              <p>문법 학습 → 코드 작성 → 에러 수정 → 차트 생성 → 보고서 정리</p>
            </div>
            <div>
              <span>바이브 코딩</span>
              <p>업무 의도 작성 → AI 초안 생성 → 기준 검증 → 수정 지시 → 현장 적용</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <span className="section-label">04. Why It Matters (4분)</span>
          <h2>왜 제조 엔지니어에게 중요한가?</h2>
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
            <p>"기업은 단순 문법 암기자가 아니라, AI를 활용해 공정 데이터 분석·보고서·이상감지를 빠르게 자동화하는 제조 엔지니어를 원합니다."</p>
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
          <span className="section-label">05. Display Engineering Case (4분)</span>
          <h2>이 강의는 일반 코딩 수업이 아니라, 디스플레이 엔지니어의 업무 자동화 수업입니다</h2>
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
          <div className="case-visual-grid">
            <YieldTrendChart />
            <DefectParetoChart />
            <SensorControlChart />
          </div>
        </section>

        <section>
          <span className="section-label">06. Intent Engineering (9분)</span>
          <h2>좋은 의도는 “해줘”가 아니라, 판단 기준과 결과물까지 포함합니다</h2>
          <div className="comparison-panel">
            <div className="bad-prompt">
              <h3>부족한 지시</h3>
              <p>수율 분석해줘.</p>
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
          <div className="prompt-anatomy" aria-label="좋은 작업지시서 구성 요소">
            {promptParts.map((item) => (
              <div className="prompt-part" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <span className="section-label">07. Mini Workshop (8분)</span>
          <h2>실습: 나의 첫 AI 작업지시서 만들기</h2>
          <p className="section-intro">
            아래 3단계를 채우면 다음 강의에서 바로 프롬프트로 발전시킬 수 있는 개인용 작업지시서가 됩니다.
          </p>
          <div className="practice-board">
            {practiceSteps.map((item) => (
              <div className="practice-step" key={item.step}>
                <span className="step-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="template-card">
            <div>
              <FileText size={28} color="var(--accent)" />
              <h3>작업지시서 템플릿</h3>
            </div>
            <p>
              나는 [공정/장비/데이터]에서 [문제 현상]을 확인하고 싶다. 입력 데이터는 [컬럼/단위/기간]으로 구성되어 있다.
              정상 기준은 [spec/관리 한계]이며, 결과물은 [표/그래프/대시보드/보고서] 형태로 만들어야 한다.
              마지막에는 엔지니어가 확인해야 할 리스크와 추가 질문을 정리해줘.
            </p>
          </div>
          <div className="worksheet-preview" aria-label="수강생 작업지시서 작성 예시">
            <div className="worksheet-row">
              <span>공정/장비/데이터</span>
              <p>CVD 막두께 측정 로그, Lot ID, 설비 ID, Recipe, Temp, Pressure</p>
            </div>
            <div className="worksheet-row">
              <span>문제 현상</span>
              <p>특정 Lot에서 막두께 산포가 커지고 목표값 120nm를 벗어남</p>
            </div>
            <div className="worksheet-row">
              <span>원하는 결과물</span>
              <p>설비별 box plot, 이상 Lot 목록, 원인 후보 3개, 확인 질문</p>
            </div>
          </div>
        </section>

        <section>
          <span className="section-label">08. Quality Gate & Wrap-up (2분)</span>
          <h2>AI에게 보내기 전, 이 5가지만 확인하세요</h2>
          <div className="checklist">
            {intentChecklist.map((item) => (
              <div className="check-item" key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="instructor-note">
            <Gauge size={24} />
            <p>
              강사의 진행 포인트: 수강생 답변을 “데이터-기준-산출물” 구조로 다시 써주면,
              2강의 프롬프트 설계로 자연스럽게 이어집니다.
            </p>
          </div>
          <div className="wrap-message">
            <Quote size={36} color="var(--accent)" />
            <h3>"코드를 외우기 전에, 먼저 업무 의도를 정확히 정의하세요."</h3>
            <p>다음 강의: 그 의도를 어떻게 AI에게 전달할까요? (프롬프트 기획)</p>
          </div>
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
            <h3>Manufacturing Engineering Point</h3>
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
