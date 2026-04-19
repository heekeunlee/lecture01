import { motion } from 'framer-motion';
import { Sparkles, Navigation, Truck, Zap, Terminal, Layers, Quote } from 'lucide-react';

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
        </motion.div>
      </header>

      <main>
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
              <span>복잡한 엔진 원리...</span>
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
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1.5rem', textAlign: 'center', fontWeight: 500 }}>
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

        {/* Section 5 */}
        <section style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ margin: '0 auto 1rem auto' }}>05. Wrap-up & Bridge (5분)</span>
          <Quote size={48} color="var(--accent)" style={{ margin: '2rem auto' }} />
          <h2 style={{ fontSize: '2.5rem' }}>"코드를 외우지 마세요.<br/>여러분의 의도(Vibe)를 정의하세요."</h2>
          <p className="subtitle" style={{ marginTop: '2rem' }}>
            다음 강의: 그 의도를 어떻게 AI에게 전달할까요? (프롬프트 기획)
          </p>
        </section>

        <section className="professional-point">
          <div className="highlight-box" style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '24px' }}>
            <h3>Professional Engineering Point</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem', fontSize: '1.1rem' }}>
              "전통적 코딩이 <strong>어셈블리(Assembly)</strong>라면, 바이브 코딩은 <strong>시스템 아키텍처(Architecture)</strong>입니다."<br/>
              단순한 스킬이 아닌, 고차원적 엔지니어링 설계를 현실로 만드는 가장 스마트한 툴 체인을 경험하세요.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 Vibe Coding for Fine Tech Engineering | LettUin Edu</p>
      </footer>
    </div>
  )
}
