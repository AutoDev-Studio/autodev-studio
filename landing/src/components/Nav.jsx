function Nav() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 24px',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'16px', fontWeight:'bold'
        }}>A</div>
        <span style={{fontWeight:'700', fontSize:'18px', letterSpacing:'-0.3px'}}>AutoDev Studio</span>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:'32px'}}>
        <a href="#features" style={{color:'#94a3b8', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>Features</a>
        <a href="#how" style={{color:'#94a3b8', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>How It Works</a>
        <a href="#pricing" style={{color:'#94a3b8', textDecoration:'none', fontSize:'14px', fontWeight:'500'}}>Pricing</a>
        <a href="mailto:hello@autodev.live" style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white', textDecoration:'none', fontSize:'14px', fontWeight:'600',
          padding: '8px 20px', borderRadius: '8px'
        }}>Get Early Access</a>
      </div>
    </nav>
  );
}

export default Nav;
