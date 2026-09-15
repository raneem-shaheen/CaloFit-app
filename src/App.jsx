import { useState } from 'react'
import './App.css'

function App() {
  const [activeItem, setActiveItem] = useState('Overview')
  const navigationItems = ['Overview', 'Members', 'Plans', 'Reports']
  const stats = [
    ['Active members', '1,284', '+12.8%', 'lime'],
    ['Weekly check-ins', '864', '+8.4%', 'blue'],
    ['Monthly revenue', '$48.2k', '+15.2%', 'orange'],
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span className="brand-symbol">C</span><span>calofit</span></div>
        <p className="sidebar-label">Workspace</p>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigationItems.map((item, index) => <button className={activeItem === item ? 'nav-item active' : 'nav-item'} key={item} onClick={() => setActiveItem(item)} type="button"><span className="nav-icon">0{index + 1}</span>{item}</button>)}
        </nav>
        <div className="sidebar-footer"><p>Good morning, Alex</p><span>Studio manager</span></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div><p className="eyebrow">Tuesday, September 15, 2026</p><h1>Good morning, Alex.</h1></div><button className="profile-button" type="button"><span className="avatar">AM</span><span className="profile-name">Alex Morgan</span><span>⌄</span></button></header>
        <section className="welcome-banner"><div><p className="eyebrow">Your studio at a glance</p><h2>Small habits. Stronger members.</h2><p>Keep your community moving with a clear view of today&apos;s rhythm.</p></div><div className="banner-orbit" aria-hidden="true">✦</div></section>
        <section className="stats-grid" aria-label="Studio statistics">{stats.map(([label, value, change, tone]) => <article className={`stat-card ${tone}`} key={label}><p>{label}</p><div className="stat-value-row"><strong>{value}</strong><span>{change}</span></div><div className="sparkline"><i /><i /><i /><i /><i /><i /></div></article>)}</section>
        <section className="content-grid">
          <article className="panel"><div className="panel-heading"><div><p className="eyebrow">This week</p><h2>Member activity</h2></div><button className="text-button" type="button">View report ↗</button></div><div className="activity-chart"><div className="chart-y-axis"><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span></div><div className="chart-area"><div className="chart-grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 600 180" role="img" aria-label="Activity trending upward"><path d="M0 148 C50 132 72 144 110 116 S180 128 218 98 S282 112 325 76 S390 92 430 58 S490 72 540 35 S575 44 600 18" /><circle cx="600" cy="18" r="5" /></svg><div className="chart-x-axis"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div></article>
          <article className="panel"><div className="panel-heading"><div><p className="eyebrow">Up next</p><h2>Today&apos;s classes</h2></div><button className="icon-button" type="button">+</button></div><div className="class-list"><div className="class-row"><span>08:00</span><b className="class-dot lime" /><div><strong>Morning flow</strong><small>12 members · Maya</small></div></div><div className="class-row"><span>12:30</span><b className="class-dot blue" /><div><strong>Strength basics</strong><small>8 members · Jordan</small></div></div><div className="class-row"><span>18:00</span><b className="class-dot orange" /><div><strong>Evening ride</strong><small>16 members · Sam</small></div></div></div></article>
        </section>
      </main>
    </div>
  )
}

export default App
