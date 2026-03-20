function Footer() {
  return (
    <footer style={{
      borderTop:'1px solid rgba(255,255,255,0.06)',
      padding:'40px 24px',
      marginTop:'auto'
    }}>
      <div style={{maxWidth:'1100px', margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <div style={{
            width:'28px', height:'28px', borderRadius:'7px',
            background:'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'14px', fontWeight:'bold', color:'white'
          }}>A</div>
          <span style={{fontWeight:'700', fontSize:'16px', color:'#f1f5f9'}}>AutoDev Studio</span>
        </div>
        <p style={{fontSize:'14px', color:'#334155', margin:0}}>
          The world&apos;s first zero-human autonomous software development company.
        </p>
        <div style={{display:'flex', gap:'24px'}}>
          <a href="https://github.com/AutoDev-Studio" target="_blank" rel="noopener noreferrer" style={{color:'#475569', fontSize:'13px', textDecoration:'none'}}>GitHub</a>
          <a href="mailto:hello@autodev.live" style={{color:'#475569', fontSize:'13px', textDecoration:'none'}}>hello@autodev.live</a>
          <a href="https://autodev.live" style={{color:'#475569', fontSize:'13px', textDecoration:'none'}}>autodev.live</a>
        </div>
        <p style={{fontSize:'12px', color:'#1e293b', margin:0}}>
          &copy; 2026 AutoDev Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
