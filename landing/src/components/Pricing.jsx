const plans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/mo',
    desc: 'Perfect for small projects and prototypes.',
    features: ['Up to 3 active projects', '50 agent-hours/month', 'Frontend + Backend', 'Automated testing', 'Netlify deployment', 'Email support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$799',
    period: '/mo',
    desc: 'For teams that need to ship fast and often.',
    features: ['Unlimited projects', '200 agent-hours/month', 'Full-stack development', 'CI/CD pipeline', 'Custom domain deploy', 'Priority support', 'Slack integration'],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For companies replacing entire engineering teams.',
    features: ['Unlimited everything', 'Dedicated agents', 'Custom integrations', 'SLA guarantee', 'On-premise option', 'Dedicated account manager'],
    cta: 'Contact Us',
    highlighted: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" style={{padding:'80px 24px'}}>
      <div style={{maxWidth:'1100px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <h2 style={{
            fontSize:'clamp(28px, 4vw, 42px)', fontWeight:'800', letterSpacing:'-1px', marginBottom:'16px',
            background:'linear-gradient(135deg, #f1f5f9, #a5b4fc)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
          }}>Simple pricing</h2>
          <p style={{color:'#64748b', fontSize:'17px', lineHeight:'1.6'}}>Cancel anytime. No per-seat fees. No surprise invoices.</p>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'20px', alignItems:'start'}}>
          {plans.map(({name, price, period, desc, features, cta, highlighted, badge}) => (
            <div key={name} style={{
              background: highlighted ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.03)',
              border: highlighted ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.07)',
              borderRadius:'20px',
              padding:'32px',
              position:'relative',
              transform: highlighted ? 'scale(1.02)' : 'none',
            }}>
              {badge && (
                <div style={{
                  position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)',
                  background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color:'white', fontSize:'11px', fontWeight:'700', letterSpacing:'0.5px',
                  padding:'4px 14px', borderRadius:'100px'
                }}>{badge}</div>
              )}
              <div style={{fontSize:'14px', color:'#94a3b8', fontWeight:'600', marginBottom:'8px'}}>{name}</div>
              <div style={{display:'flex', alignItems:'baseline', gap:'2px', marginBottom:'12px'}}>
                <span style={{fontSize:'40px', fontWeight:'800', color:'#f1f5f9'}}>{price}</span>
                <span style={{fontSize:'16px', color:'#64748b'}}>{period}</span>
              </div>
              <p style={{fontSize:'14px', color:'#64748b', lineHeight:'1.5', marginBottom:'24px'}}>{desc}</p>
              <a href="mailto:hello@autodev.live" style={{
                display:'block', textAlign:'center',
                background: highlighted ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.06)',
                border: highlighted ? 'none' : '1px solid rgba(255,255,255,0.1)',
                color:'white', textDecoration:'none',
                padding:'12px', borderRadius:'10px',
                fontSize:'14px', fontWeight:'700', marginBottom:'24px',
                boxShadow: highlighted ? '0 4px 20px rgba(99,102,241,0.35)' : 'none',
              }}>{cta}</a>
              <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px'}}>
                {features.map(f => (
                  <li key={f} style={{fontSize:'14px', color:'#94a3b8', display:'flex', alignItems:'center', gap:'10px'}}>
                    <span style={{color:'#6366f1', fontWeight:'700'}}>+</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
