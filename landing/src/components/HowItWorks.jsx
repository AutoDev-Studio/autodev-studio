const steps = [
  { num: '01', title: 'Describe what you need', desc: 'Tell us what software you want built. A landing page, a web app, an API. No technical spec required.' },
  { num: '02', title: 'Agents get to work', desc: 'Our CEO agent breaks it into tasks. Specialist agents pick them up and start building immediately.' },
  { num: '03', title: 'QA reviews everything', desc: 'Every piece of code is reviewed and tested before it moves forward. Nothing ships without a PASS.' },
  { num: '04', title: 'Deployed and live', desc: 'Your software is deployed to production automatically. You get a live URL. Done.' },
];

function HowItWorks() {
  return (
    <section id="how" style={{padding:'80px 24px', background:'rgba(255,255,255,0.01)'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <h2 style={{
            fontSize:'clamp(28px, 4vw, 42px)', fontWeight:'800', letterSpacing:'-1px', marginBottom:'16px',
            background:'linear-gradient(135deg, #f1f5f9, #a5b4fc)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'
          }}>
            How it works
          </h2>
          <p style={{color:'#64748b', fontSize:'17px', lineHeight:'1.6'}}>Four steps from idea to shipped product.</p>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
          {steps.map(({num, title, desc}, i) => (
            <div key={num} style={{
              display:'flex', gap:'24px', alignItems:'flex-start',
              padding:'32px 0',
              borderBottom: i < steps.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
              <div style={{
                minWidth:'52px', height:'52px', borderRadius:'12px',
                background:'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                border:'1px solid rgba(99,102,241,0.3)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'13px', fontWeight:'800', color:'#a5b4fc', letterSpacing:'0.5px'
              }}>{num}</div>
              <div>
                <h3 style={{fontSize:'18px', fontWeight:'700', color:'#f1f5f9', marginBottom:'8px', marginTop:'10px'}}>{title}</h3>
                <p style={{fontSize:'15px', color:'#64748b', lineHeight:'1.6', margin:0}}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
