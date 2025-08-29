
    // ——— Settings ———
    const TARGET_MONTH = 3; // April (0-indexed)
    const TARGET_DAY = 14;  // 14th April

    // Theme functionality
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get theme from localStorage or use system preference
    let currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';

    // Toggle theme function
    function toggleTheme() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    }
    
    // Event listener for theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Compute April 14 of NEXT year by default
    const now = new Date();
    let targetYear = now.getFullYear() + 1;
    let forceThisYear = false;

    const dEl = document.getElementById('d');
    const hEl = document.getElementById('h');
    const mEl = document.getElementById('m');
    const sEl = document.getElementById('s');
    const note = document.getElementById('note');
    const sky = document.getElementById('sky');
    const toggleBtn = document.getElementById('toggleYear');

    function targetDate(){
      const y = forceThisYear ? now.getFullYear() : targetYear;
      return new Date(y, TARGET_MONTH, TARGET_DAY, 0, 0, 0, 0);
    }

    function pad(n){ return n.toString().padStart(2,'0'); }

    function renderFireworks(){
      // lightweight DIY confetti
      for(let i=0;i<80;i++){
        const b = document.createElement('div');
        b.className = 'boom';
        const angle = (Math.random()*360)|0;
        const dist = 200 + Math.random()*320;
        const x1 = Math.cos(angle*Math.PI/180)*dist;
        const y1 = Math.sin(angle*Math.PI/180)*dist;
        b.style.setProperty('--x0', innerWidth/2 + 'px');
        b.style.setProperty('--y0', innerHeight/2 + 'px');
        b.style.setProperty('--x1', innerWidth/2 + x1 + 'px');
        b.style.setProperty('--y1', innerHeight/2 + y1 + 'px');
        b.style.left = '0';
        b.style.top = '0';
        // Use theme-aware colors for fireworks
        const hue = (i * 9) % 360;
        b.style.background = currentTheme === 'dark' 
          ? `hsl(${hue}, 90%, 60%)` 
          : `hsl(${hue}, 90%, 50%)`;
        sky.appendChild(b);
        setTimeout(()=> b.remove(), 1300);
      }
    }

    function tick(){
      const t = targetDate();
      const diff = t - new Date();

      if(diff <= 0){
        dEl.textContent = '00';
        hEl.textContent = '00';
        mEl.textContent = '00';
        sEl.textContent = '00';
        note.innerHTML = 'សួស្តីឆ្នាំថ្មី! Happy Khmer New Year!';
        renderFireworks();
        return; // stop updating; optional: keep fireworks once
      }

      const secs = Math.floor(diff/1000);
      const days = Math.floor(secs / 86400);
      const hrs  = Math.floor((secs % 86400) / 3600);
      const mins = Math.floor((secs % 3600) / 60);
      const s    = secs % 60;

      dEl.textContent = days;
      hEl.textContent = pad(hrs);
      mEl.textContent = pad(mins);
      sEl.textContent = pad(s);

      const y = forceThisYear ? now.getFullYear() : targetYear;
      note.textContent = `Counting to ${t.toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'})}.`;
    }

    // Controls
    toggleBtn.addEventListener('click', () =>{
      forceThisYear = !forceThisYear;
      toggleBtn.textContent = forceThisYear ? 'Switch to next year' : 'Switch to this year';
      tick();
    });

    // Start
    tick();
    setInterval(tick, 1000);
  

