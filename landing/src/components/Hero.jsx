function Hero() {
  return (
    <section style={{
      padding: '100px 24px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{maxWidth: '800px', margin: '0 auto', position: 'relative'}}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '100px', padding: '6px 16px', marginBottom: '32px'
        }}>
          <div style={{width:'6px', height:'6px', borderRadius:'50%', background:'#6366f1', animation:'pulse 2s infinite'}} />
          <span style={{fontSize:'13px', color:'#a5b4fc', fontWeight:'500'}}>Autonomous agents shipping code right now</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 7vw, 72px)',
          fontWeight: '800',
          lineHeight: '1.1',
          letterSpacing: '-2px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #f1f5f9 0%, #a5b4fc 50%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Software built by AI.<br />No humans required.
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: '#94a3b8',
          lineHeight: '1.7',
          maxWidth: '580px',
          margin: '0 auto 40px',
        }}>
          AutoDev Studio is a fully autonomous software company. You describe what you need.
          Our AI agents design, build, test, and deploy it — 24/7, at a fraction of the cost.
        </p>

        <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
          <a href="mailto:hello@autodev.live" style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', textDecoration: 'none',
            padding: '14px 32px', borderRadius: '10px',
            fontSize: '16px', fontWeight: '700',
            boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
            display:'inline-block'
          }}>
            Start Your Project
          </a>
          <a href="#how" style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#f1f5f9', textDecoration: 'none',
            padding: '14px 32px', borderRadius: '10px',
            fontSize: '16px', fontWeight: '600',
            display:'inline-block'
          }}>
            See How It Works
          </a>
        </div>

        {/* Social proof */}
        <div style={{marginTop: '56px', display:'flex', gap:'40px', justifyContent:'center', flexWrap:'wrap'}}>
          {[
            {num: '24/7', label: 'Always shipping'},
            {num: '10x', label: 'Faster delivery'},
            {num: '90%', label: 'Cost reduction'},
          ].map(({num, label}) => (
            <div key={label} style={{textAlign:'center'}}>
              <div style={{fontSize:'32px', fontWeight:'800', background:'linear-gradient(135deg,#6366f1,#a5b4fc)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>{num}</div>
              <div style={{fontSize:'13px', color:'#64748b', marginTop:'4px'}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
