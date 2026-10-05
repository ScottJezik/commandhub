import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const posts = [
  { date: 'Sep 10', title: 'The footwork detail nobody teaches', niche: 'Breakdancing', format: 'Tutorial', views: 49400, interactions: 296, retention: 72, color: 'pink', tag: 'Top reach' },
  { date: 'Sep 27', title: '30 days toward the handstand push-up', niche: 'Calisthenics', format: 'Progress video', views: 11100, interactions: 310, retention: 68, color: 'lime', tag: 'Top interaction' },
  { date: 'Sep 14', title: 'I built a camera slider from scrap parts', niche: 'Engineering', format: 'Build / reveal', views: 9300, interactions: 210, retention: 64, color: 'blue', tag: 'Strong signal' },
  { date: 'Oct 1', title: 'Why your freeze collapses at the last second', niche: 'Breakdancing', format: 'Talking head + demo', views: 3700, interactions: 151, retention: 61, color: 'pink', tag: 'High intent' },
  { date: 'Sep 15', title: 'One cue that fixed my false grip', niche: 'Calisthenics', format: 'Form fix', views: 3500, interactions: 157, retention: 59, color: 'lime', tag: 'Saveable' },
]

const formats = [
  { name: 'Progress / proof', score: 91, mix: 'Best growth bet', note: 'Transformation + stakes', color: 'lime' },
  { name: 'Tutorial / form fix', score: 87, mix: 'Reliable saves', note: 'One cue, one outcome', color: 'pink' },
  { name: 'Build / reveal', score: 84, mix: 'Discovery driver', note: 'Show the payoff first', color: 'blue' },
  { name: 'Talking head + demo', score: 76, mix: 'Trust builder', note: 'Keep it moving', color: 'orange' },
  { name: 'Challenge / battle', score: 73, mix: 'Test for spikes', note: 'Add a clear constraint', color: 'violet' },
]

const niches = [
  { name: 'Breakdancing', short: 'BD', share: 36, accent: 'pink', trend: '+ discovery', lead: 'Skill reveal in frame one', pattern: 'Battle energy, clean visual proof, and a specific correction beat generic “watch me dance” clips.', hook: '“Your freeze is failing for one tiny reason.”' },
  { name: 'Engineering', short: 'ENG', share: 34, accent: 'blue', trend: '+ curiosity', lead: 'Payoff before process', pattern: 'Creators show the surprising result first, then make the build feel simple, tactile, and relatable.', hook: '“I built the dumbest possible version—and it worked.”' },
  { name: 'Calisthenics', short: 'CAL', share: 30, accent: 'lime', trend: '+ intent', lead: 'Progress people can copy', pattern: 'Skill progression, form fixes, and road-to milestones give viewers a reason to save and return.', hook: '“If your handstand stalls here, change this.”' },
]

const experiments = [
  { day: 'MON', time: '12:00 PM', niche: 'Breakdancing', format: 'Tutorial Reel', hook: '“Stop drilling footwork like this.”', type: 'Regular', color: 'pink' },
  { day: 'TUE', time: '9:00 AM', niche: 'Calisthenics', format: 'Progress Reel', hook: '“Day 1 vs. day 30: the ugly middle.”', type: 'Trial', color: 'lime' },
  { day: 'WED', time: '6:00 PM', niche: 'Engineering', format: 'Build / reveal', hook: '“Can scrap metal solve this problem?”', type: 'Regular', color: 'blue' },
  { day: 'THU', time: '12:00 PM', niche: 'Breakdancing', format: 'Talking head + demo', hook: '“The cue I wish I heard earlier.”', type: 'Trial', color: 'pink' },
  { day: 'FRI', time: '6:00 PM', niche: 'Calisthenics', format: 'Form fix', hook: '“Try this 10-second shoulder test.”', type: 'Regular', color: 'lime' },
  { day: 'SAT', time: '9:00 AM', niche: 'Engineering', format: 'Satisfying process', hook: '“The tiny part that makes it work.”', type: 'Trial', color: 'blue' },
]

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    chart: <><path d="M4 19V5"/><path d="M4 19h17"/><path d="m7 15 4-5 3 2 5-7"/></>,
    play: <><path d="m8 5 10 7-10 7V5Z"/></>,
    spark: <><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const formatNumber = (num) => num >= 1000 ? `${(num / 1000).toFixed(num >= 10000 ? 1 : 1)}K` : num

function MetricCard({ label, value, sub, icon, accent }) {
  return <div className={`metric-card ${accent}`}>
    <div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon name={icon} size={16}/></span></div>
    <div className="metric-value">{value}</div>
    <div className="metric-sub">{sub}</div>
  </div>
}

function TrendChart() {
  const bars = [28, 35, 31, 44, 38, 57, 42, 67, 48, 82, 63, 100]
  const points = bars.map((n, i) => `${18 + i * 30},${128 - n}`).join(' ')
  return <div className="trend-chart">
    <div className="chart-y"><span>50K</span><span>25K</span><span>0</span></div>
    <svg viewBox="0 0 360 140" preserveAspectRatio="none" role="img" aria-label="Illustrative views trend">
      <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff5c9a" stopOpacity=".3"/><stop offset="1" stopColor="#ff5c9a" stopOpacity="0"/></linearGradient></defs>
      <polygon points={`18,128 ${points} 348,128`} fill="url(#area)"/>
      <polyline points={points} fill="none" stroke="#ff5c9a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="348" cy="28" r="4" fill="#0a0d12" stroke="#ff5c9a" strokeWidth="3"/>
    </svg>
    <div className="chart-x"><span>Sep 6</span><span>Sep 13</span><span>Sep 20</span><span>Sep 27</span><span>Oct 5</span></div>
  </div>
}

function Donut({ percent, color }) {
  return <div className="donut" style={{ '--p': `${percent * 3.6}deg`, '--accent': color }}><div><strong>{percent}%</strong><small>share</small></div></div>
}

function App() {
  const [active, setActive] = useState('overview')
  const [filter, setFilter] = useState('All')
  const [showModelNote, setShowModelNote] = useState(false)

  const filteredPosts = useMemo(() => filter === 'All' ? posts : posts.filter(p => p.niche === filter), [filter])

  const scrollTo = (id) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><span>command<span className="brand-accent">hub</span></span></div>
      <div className="workspace"><div className="avatar">SJ</div><div><strong>scottjezik</strong><small>Creator workspace</small></div><Icon name="more" size={16}/></div>
      <nav>
        <div className="nav-label">Workspace</div>
        <button className={active === 'overview' ? 'active' : ''} onClick={() => scrollTo('overview')}><Icon name="grid"/>Overview</button>
        <button className={active === 'content' ? 'active' : ''} onClick={() => scrollTo('content')}><Icon name="play"/>Content lab<span className="nav-badge">3</span></button>
        <button className={active === 'posts' ? 'active' : ''} onClick={() => scrollTo('posts')}><Icon name="chart"/>Post analytics</button>
        <button className={active === 'intelligence' ? 'active' : ''} onClick={() => scrollTo('intelligence')}><Icon name="spark"/>Niche intelligence</button>
        <button className={active === 'plan' ? 'active' : ''} onClick={() => scrollTo('plan')}><Icon name="target"/>Experiment plan</button>
        <div className="nav-label second">Account</div>
        <button><Icon name="users"/>Audience</button>
        <button><Icon name="clock"/>Saved reports</button>
      </nav>
      <div className="sidebar-bottom"><div className="insight-chip"><span className="pulse"></span><div><strong>Growth mode</strong><small>Reels are working</small></div></div><button className="help"><span>?</span>Need help?</button></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="crumb"><span>Creator intelligence</span><b>/</b><strong>Overview</strong></div><div className="top-actions"><button className="date-select"><span className="live-dot"></span>Last 30 days <span className="chevron">⌄</span></button><button className="icon-btn"><Icon name="more"/></button><button className="profile-btn"><span className="avatar small">SJ</span><span>Scott</span><span className="chevron">⌄</span></button></div></header>

      <div className="page-wrap">
        <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot"></span>INSTAGRAM / scottjezik</div><h1>Creator command center</h1><p>Find the formats, niches, and hooks most likely to compound your growth.</p></div><button className="model-btn" onClick={() => setShowModelNote(!showModelNote)}><Icon name="spark" size={15}/> How this is modeled</button></div>
        {showModelNote && <div className="model-note"><strong>Dataset note</strong><span>Performance cards use the Instagram Insights snapshot you shared. Niche and format scores are directional recommendations based on those metrics plus public creator-pattern research; connect a post export to replace estimates with measured history.</span></div>}

        <section id="overview" className="section-anchor">
          <div className="metric-grid">
            <MetricCard label="Total views" value="157.9K" sub="89.9% from non-followers" icon="chart" accent="pink"/>
            <MetricCard label="Unique viewers" value="86.8K" sub="1.8 views per viewer" icon="users" accent="blue"/>
            <MetricCard label="Interactions" value="3,978" sub="64.4% from non-followers" icon="spark" accent="lime"/>
            <MetricCard label="Profile visits" value="2,991" sub="3.5% of unique viewers" icon="target" accent="orange"/>
          </div>
          <div className="grid-two chart-row">
            <div className="panel trend-panel"><div className="panel-heading"><div><span className="panel-kicker">Reach momentum</span><h2>Views are expanding through Reels</h2></div><span className="trend-pill">Reels · 97.6%</span></div><div className="chart-meta"><strong>157.9K</strong><span>current snapshot</span><span className="meta-sep"></span><span>Illustrative daily shape</span></div><TrendChart/><div className="chart-foot"><span><i className="legend-dot pink"></i>Views</span><span><i className="legend-dot grey"></i>Snapshot seeded from Insights</span></div></div>
            <div className="panel signal-panel"><div className="panel-heading"><div><span className="panel-kicker">Growth signals</span><h2>What the data is saying</h2></div><Icon name="more"/></div><div className="signal-list"><div className="signal"><span className="signal-number">01</span><div><strong>Discovery is the engine</strong><p>Almost 9 in 10 views come from people who do not follow you yet.</p></div><span className="signal-tag positive">High</span></div><div className="signal"><span className="signal-number">02</span><div><strong>Reels own the funnel</strong><p>They generate nearly all views and 95.1% of interactions.</p></div><span className="signal-tag positive">Clear</span></div><div className="signal"><span className="signal-number">03</span><div><strong>Convert the curiosity</strong><p>Turn profile visits into follows with a pinned “start here” sequence.</p></div><span className="signal-tag action">Next</span></div></div><button className="text-link" onClick={() => scrollTo('plan')}>Open growth plan <Icon name="arrow" size={15}/></button></div>
          </div>
        </section>

        <section id="content" className="section-anchor section-block"><div className="section-title"><div><span className="panel-kicker">Content lab</span><h2>Make the winning mix repeatable</h2></div><span className="section-note">Estimated from current post signals</span></div><div className="content-grid"><div className="panel format-panel"><div className="panel-heading"><div><h3>Format performance forecast</h3><p>Prioritize proof, then teach the trick.</p></div><span className="mini-label">PREDICTED</span></div><div className="format-list">{formats.map((format) => <div className="format-row" key={format.name}><span className={`format-dot ${format.color}`}></span><div className="format-name"><strong>{format.name}</strong><small>{format.note}</small></div><div className="score-bar"><span style={{width: `${format.score}%`}}></span></div><strong className="score">{format.score}</strong><span className="format-mix">{format.mix}</span></div>)}</div></div><div className="panel niche-mix"><div className="panel-heading"><div><h3>Niche mix</h3><p>Keep the three worlds connected by your point of view.</p></div><Icon name="more"/></div><div className="niche-mix-body"><div className="donut-wrap"><div className="donut-chart"><div className="donut-ring"></div><div className="donut-center"><strong>3</strong><small>niches</small></div></div></div><div className="niche-legend">{niches.map(niche => <div key={niche.name}><span className={`legend-dot ${niche.accent}`}></span><span>{niche.name}</span><strong>{niche.share}%</strong></div>)}</div></div><div className="niche-callout"><Icon name="spark" size={15}/><span>Unifying angle: <strong>skill, systems, and progress in public.</strong></span></div></div></div></section>

        <section id="posts" className="section-anchor section-block"><div className="section-title"><div><span className="panel-kicker">Post analytics</span><h2>Individual posts worth studying</h2></div><div className="filter-row">{['All','Breakdancing','Engineering','Calisthenics'].map(item => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="panel table-panel"><div className="table-wrap"><table><thead><tr><th>POST</th><th>NICHE / FORMAT</th><th>VIEWS</th><th>INTERACTIONS</th><th>RETENTION</th><th></th></tr></thead><tbody>{filteredPosts.map(post => <tr key={post.date + post.title}><td><div className="post-cell"><div className={`post-thumb ${post.color}`}><Icon name="play" size={15}/></div><div><strong>{post.title}</strong><small>{post.date} · Reel</small></div></div></td><td><div className="tag-stack"><span className={`niche-tag ${post.color}`}>{post.niche}</span><small>{post.format}</small></div></td><td><strong>{formatNumber(post.views)}</strong><small className="positive-text">{post.tag}</small></td><td><strong>{post.interactions}</strong><small>{(post.interactions / post.views * 100).toFixed(1)}% rate</small></td><td><div className="retention"><div><span style={{width: `${post.retention}%`}}></span></div><strong>{post.retention}%</strong></div></td><td><button className="row-more"><Icon name="more" size={17}/></button></td></tr>)}</tbody></table></div><div className="table-footer"><span>Showing {filteredPosts.length} top posts from current snapshot</span><button className="text-link">View full archive <Icon name="arrow" size={15}/></button></div></div></section>

        <section id="intelligence" className="section-anchor section-block"><div className="section-title"><div><span className="panel-kicker">Niche intelligence</span><h2>What is working in your worlds</h2></div><span className="section-note">Pattern library · public creator research</span></div><div className="intelligence-grid">{niches.map(niche => <div className={`panel intel-card ${niche.accent}`} key={niche.name}><div className="intel-top"><div className={`niche-avatar ${niche.accent}`}>{niche.short}</div><div><h3>{niche.name}</h3><span>{niche.trend}</span></div><Icon name="arrow" size={17}/></div><div className="intel-lead">{niche.lead}</div><p>{niche.pattern}</p><div className="hook-box"><span>HOOK TO TEST</span><strong>{niche.hook}</strong></div><div className="intel-footer"><span>Signal strength</span><div className="signal-bars"><i></i><i></i><i></i><i></i><i></i></div><strong>{niche.share + 56}/100</strong></div></div>)}</div><div className="pattern-strip"><div className="pattern-item"><span className="pattern-icon pink"><Icon name="play" size={15}/></span><div><strong>Open with the result</strong><small>Start on the freeze, build payoff, or clean rep—then explain.</small></div></div><div className="pattern-item"><span className="pattern-icon lime"><Icon name="target" size={15}/></span><div><strong>Give the viewer a job</strong><small>“Spot the mistake,” “guess the outcome,” or “try this cue.”</small></div></div><div className="pattern-item"><span className="pattern-icon blue"><Icon name="clock" size={15}/></span><div><strong>Keep a recognizable series</strong><small>Same visual world, new challenge—so the next episode is obvious.</small></div></div></div></section>

        <section id="plan" className="section-anchor section-block"><div className="section-title"><div><span className="panel-kicker">Experiment plan</span><h2>Your next 7-day viral test loop</h2></div><button className="outline-btn"><Icon name="clock" size={15}/> Add to calendar</button></div><div className="plan-grid"><div className="panel schedule-panel"><div className="panel-heading"><div><h3>Posting cadence</h3><p>4 regular Reels + 3 trial Reels per week</p></div><span className="cadence-pill">Balanced</span></div><div className="schedule-list">{experiments.map(item => <div className="schedule-row" key={item.day + item.niche}><div className="day"><strong>{item.day}</strong><small>{item.time}</small></div><span className={`schedule-dot ${item.color}`}></span><div className="schedule-copy"><div><strong>{item.niche}</strong><span className={`post-type ${item.type.toLowerCase()}`}>{item.type}</span></div><small>{item.format}</small></div><div className="schedule-hook">{item.hook}</div><button className="row-more"><Icon name="more" size={16}/></button></div>)}</div></div><div className="panel prediction-panel"><div className="panel-heading"><div><span className="panel-kicker">Prediction</span><h3>Best bet for breakout growth</h3></div><span className="confidence">MEDIUM CONFIDENCE</span></div><div className="prediction-main"><div className="prediction-orb"><span>01</span><strong>Progress<br/>with proof</strong></div><div><p>Lead with a visible skill or build outcome, add one useful cue, and make the next episode part of the promise.</p><strong className="prediction-stat">Highest upside: <span>progress video + tutorial hybrid</span></strong></div></div><div className="prediction-split"><div><span>Regular Reels</span><strong>4 / week</strong><small>Polished, saveable, series-based</small></div><div><span>Trial Reels</span><strong>3 / week</strong><small>Fast hooks, low-edit, learn quickly</small></div></div><div className="prediction-footer"><span><Icon name="spark" size={14}/> Use the winner as your next regular Reel.</span><button className="text-link">See test matrix <Icon name="arrow" size={15}/></button></div></div></div></section>

        <footer className="footer"><span>CommandHub · Creator intelligence</span><span>Seeded from Instagram Insights · Last 30 days</span></footer>
      </div>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
