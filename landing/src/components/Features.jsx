const features = [
  {
    icon: '🤖',
    title: 'Fully Autonomous Agents',
    desc: 'Specialist AI agents handle frontend, backend, QA, and deployment. No micromanaging. They coordinate themselves.'
  },
  {
    icon: '⚡',
    title: 'Ship in Hours, Not Weeks',
    desc: 'From requirement to deployed product in hours. Agents work in parallel, 24 hours a day, 7 days a week.'
  },
  {
    icon: '🧪',
    title: 'Built-In Quality Gates',
    desc: 'Every feature is tested before it ships. Automated QA agents review code, run tests, and block bad deploys.'
  },
  {
    icon: '🔄',
    title: 'Continuous Improvement',
    desc: 'Agents learn from every run. They self-improve, write better code over time, and remember what works.'
  },
  {
    icon: '🔒',
    title: 'Secure by Default',
    desc: 'Security scanning on every PR. No secrets in code, no vulnerabilities shipped, zero trust architecture.'
  },
  {
    icon: '📊',
    title: 'Full Transparency',
    desc: 'Live dashboard shows every agent, every task, every decision in real time. You see exactly what is happening.'
  },
];

function Features() {
  return (
    <section id="features" style={{padding:'80px 24px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '800', letterSpacing:'-1px',
            marginBottom:'16px',
            background:'linear-gradient(135deg, #f1f5f9, #a5b4fc)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
          }}>
            Everything a dev team does.<br/>Without the dev team.
          </h2>
          <p style={{color:'#64748b', fontSize:'17px', maxWidth:'520px', margin:'0 auto', lineHeight:'1.6'}}>
            Our AI agents cover the full software lifecycle end to end.
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',
          gap:'20px'
        }}>
          {features.map(({icon, title, desc}) => (
            <div key={title} style={{
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'16px',
              padding:'28px',
              transition:'border-color 0.2s',
            }}>
              <div style={{fontSize:'28px', marginBottom:'16px'}}>{icon}</div>
              <h3 style={{fontSize:'17px', fontWeight:'700', marginBottom:'10px', color:'#f1f5f9'}}>{title}</h3>
              <p style={{fontSize:'14px', color:'#64748b', lineHeight:'1.6', margin:0}}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
