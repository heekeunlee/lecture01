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
  Layers,
  Navigation,
  Quote,
  Sparkles,
  Target,
  Terminal,
  Truck,
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

const navigationLinks = [
  { label: '커리큘럼으로 돌아가기', href: 'https://heekeunlee.github.io/lecture_assist001/' },
  { label: '2강 프롬프트 기획 예고', href: 'https://heekeunlee.github.io/lecture_assist001/' },
];

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
          <p className="subtitle">AI와 함께 기술의 한계를 넘어서는 미래 엔지니어로의 도약</p>
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
          <span className="section-label">00. Learning Goal</span>
          <h2>오늘의 목표: 코드를 배우기 전에, AI가 실행할 의도를 설계합니다</h2>
          <div className="outcome-grid">
            <div className="outcome-card">
              <Target size={28} color="var(--accent)" />
              <h3>문제 정의</h3>
              <p>현장 문제를 AI가 이해할 수 있는 작업 단위로 바꿉니다.</p>
            </div>
            <div className="outcome-card">
              <Factory size={28} color="var(--accent)" />
              <h3>도메인 언어</h3>
              <p>공정명, 장비명, spec, 수율 같은 엔지니어링 언어를 프롬프트의 중심에 둡니다.</p>
            </div>
            <div className="outcome-card">
              <ClipboardCheck size={28} color="var(--accent)" />
              <h3>산출물 기준</h3>
              <p>표, 차트, 대시보드, 보고서처럼 AI가 끝내야 할 결과물을 먼저 정합니다.</p>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section>
          <span className="section-label">01. Opening (5분)</span>
          <h2 style={{ fontSize: '3rem', color: 'var(--accent)', fontWeight: 900, marginBottom: '2rem' }}>
            "우리는 이미 바이브 코딩을 하고 있습니다"
          </h2>
          <div className="highlight-box">
            <p className="quote">"자동차 운전을 할 때 엔진 오일의 점도나 피스톤의 회전 속도를 일일이 계산하며 타시나요?"</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--text-secondary)', marginTop: '1.5rem', lineHeight: '1.6' }}>
              자동차의 동작원리를 몰라도 운전해서 여행을 떠나는데는 문제가 없습니다.<br/>
              복잡한 코딩은 AI에게 맡기고 우리는 기획과 설계를해서 원하는 결과물만 정확하게 얻으면 됩니다.
            </p>
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
          <span className="section-label">02. 핵심 비유 I (10분)</span>
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
              <p>"탕정 7라인 수율 대시보드 그려줘"라고 입력만 하세요. 구현은 AI가 하고, 엔지니어는 결과의 안전성만 결정합니다.</p>
            </motion.div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <span className="section-label">03. 핵심 비유 II (10분)</span>
          <h2>"밀키트 요리" vs "배달 앱 요청사항"</h2>
          <div className="card-grid">
            <motion.div className="card" whileHover={{ y: -5 }}>
              <Layers size={32} color="#888" style={{ marginBottom: '1rem' }} />
              <h3>전통적 코딩 (밀키트 제작)</h3>
              <p>양파를 몇 cm로 썰지, 불은 몇 분간 켤지 내가 다 챙겨야 합니다. 순서가 틀리면 맛이 어긋납니다.</p>
            </motion.div>
            <motion.div className="card" whileHover={{ y: -5 }} style={{ borderColor: 'var(--accent)' }}>
              <Truck size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3>바이브 코딩 (배달 앱 요청)</h3>
              <p>"최대한 맵게, 리뷰 이벤트 참여요." 의도(Vibe)만 정확히 적으세요. 요리는 전문가(AI)가 해서 집 앞까지 배달해줍니다.</p>
            </motion.div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <span className="section-label">04. 왜 혁명인가? (10분)</span>
          <h2>엔지니어링의 본질로 돌아가는 시간</h2>
          <div className="card-grid">
            <div className="card">
              <Zap size={24} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3>언어의 장벽 붕괴</h3>
              <p>Python을 몰라도 됩니다. 우리가 평생 써온 전공 용어와 한국어가 곧 코딩 언어가 됩니다.</p>
            </div>
            <div className="card">
              <Sparkles size={24} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <h3>생산성의 비약</h3>
              <p>8시간 걸리던 엑셀 노가다를 한 마디 의도(Vibe)로 15분 만에 끝내는 실전적 경험.</p>
            </div>
          </div>
          <div className="highlight-box" style={{ background: '#f5f5f7', borderLeftColor: '#333' }}>
            <p style={{ fontWeight: 700 }}>Target Point:</p>
            <p>"기업은 파이썬 문법 암기자가 아니라, AI를 써서 10배 빠르게 문제를 해결하는 영리한 엔지니어를 원합니다."</p>
          </div>
        </section>

        <section>
          <span className="section-label">05. Display Engineering Case (8분)</span>
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
        </section>

        <section>
          <span className="section-label">06. Intent Engineering (7분)</span>
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
        </section>

        <section>
          <span className="section-label">07. Mini Workshop (7분)</span>
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
        </section>

        <section>
          <span className="section-label">08. Quality Gate (3분)</span>
          <h2>AI에게 보내기 전, 이 5가지를 확인하세요</h2>
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
        </section>

        {/* Section 5 */}
        <section style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ margin: '0 auto 1rem auto' }}>09. Wrap-up & Bridge (5분)</span>
          <Quote size={48} color="var(--accent)" style={{ margin: '2rem auto' }} />
          <h2 style={{ fontSize: '2.5rem' }}>"코드를 외우지 마세요.<br/>여러분의 의도(Vibe)를 정의하세요."</h2>
          <p className="subtitle" style={{ marginTop: '2rem' }}>
            다음 강의: 그 의도를 어떻게 AI에게 전달할까요? (프롬프트 기획)
          </p>
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
            <h3>Professional Engineering Point</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem', fontSize: '1.1rem' }}>
              "전통적 코딩이 <strong>어셈블리(Assembly)</strong>라면, 바이브 코딩은 <strong>시스템 아키텍처(Architecture)</strong>입니다."<br/>
              단순한 스킬이 아닌, 고차원적 엔지니어링 설계를 현실로 만드는 가장 스마트한 툴 체인을 경험하세요.
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
