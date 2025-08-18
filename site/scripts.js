// scripts.js — interactions: menu, reveals, skill anim, blog filter, year

document.addEventListener('DOMContentLoaded', () => {
  // Ensure correct active state on the blog page without affecting index scroll-highlighting
  (function setBlogActive(){
    const isBlog = /blog(\.html)?$/.test(location.pathname);
    if (!isBlog) return;
    const nav = document.getElementById('nav-list');
    if (!nav) return;
    nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    const blogLink = nav.querySelector('a[href$="blog.html"]');
    if (blogLink){
      blogLink.classList.add('active');
      blogLink.setAttribute('aria-current','page');
    }
  })();

  document.documentElement.classList.remove('no-js');

  // fill year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // nav toggle for small screens
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navList.style.display = open ? 'none' : 'flex';
    });
    // close nav on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) navList.style.display = 'flex';
      else navList.style.display = 'none';
    });
    if (window.innerWidth <= 980) navList.style.display = 'none';
  }

  // Reveal panels sequentially (respect reduced motion)
  const panels = document.querySelectorAll('.panel, .hero');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    panels.forEach((p, i) => setTimeout(() => p.classList.add('revealed'), 120 * i));
  } else {
    panels.forEach(p => p.classList.add('revealed'));
  }

  // Skill bar intersection animation
  const bars = document.querySelectorAll('.skill .bar span, .skill .bar span');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const span = e.target;
        // read width from inline style or data attribute
        const w = span.getAttribute('style') || span.dataset.width || '80%';
        // Extract width like "width:86%" or "86%"
        const match = w.match(/(\d+%)/);
        const value = match ? match[1] : w;
        span.style.width = value;
        barObserver.unobserve(span);
      }
    });
  }, {threshold: 0.3});
  document.querySelectorAll('.bar span').forEach(s => barObserver.observe(s));

  // Blog filtering (on blog.html)
  const tagButtons = document.querySelectorAll('.tag-filter button');
  if (tagButtons.length) {
    const posts = document.querySelectorAll('.post-card');
    tagButtons.forEach(btn => btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag;
      posts.forEach(p => {
        if (tag === 'all') p.style.display = '';
        else {
          const tags = p.dataset.tags ? p.dataset.tags.split(',') : [];
          p.style.display = tags.includes(tag) ? '' : 'none';
        }
      });
    }));
    // search
    const search = document.getElementById('search');
    if (search) {
      search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        posts.forEach(p => {
          const text = p.textContent.toLowerCase();
          p.style.display = q ? (text.includes(q) ? '' : 'none') : '';
        });
      });
    }
  }

  // Contact form simple client validation
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const invalid = form.querySelector(':invalid');
      if (invalid) { invalid.focus(); return; }
      // Hook up your backend here. For demo:
      alert('Thanks! Form submission demo — connect to backend to send messages.');
    });
  }

  // Enhance internal post links to pass id query param -> could load content dynamically
  // (Left minimal for static hosting; you can implement fetch for dynamic content)

  // Scroll spy for primary nav (index.html)
  const sections = document.querySelectorAll('section[id], footer#contact');
  const navAnchors = document.querySelectorAll('.primary-nav a[href^="#"]');
  if (sections.length && navAnchors.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.isIntersecting && id) {
          navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
        }
      });
    }, { threshold: 0.6 });
    sections.forEach(s => spy.observe(s));
  }

  // Reading progress bar (post.html)
  const progressEl = document.getElementById('reading-progress');
  const article = document.getElementById('article');
  if (progressEl && article) {
    const setProgress = () => {
      const rect = article.getBoundingClientRect();
      const top = Math.max(0, -rect.top);
      const total = Math.max(1, article.scrollHeight - window.innerHeight);
      const pct = Math.min(1, top / total);
      progressEl.style.width = `${pct * 100}%`;
    };
    document.addEventListener('scroll', setProgress, { passive: true });
    window.addEventListener('resize', setProgress);
    setProgress();
  }

  // 1) Intro Gate — professional security animation
  (function introGate(){
    const gate = document.getElementById('intro-gate');
    if (!gate) return;

    // Respect reduced motion or if user revisits within session
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('introSeen') === '1';
    if (reduced || seen) { gate.classList.add('hidden'); return; }

    const linesEl = gate.querySelector('.intro-lines');
    const bar = gate.querySelector('.intro-progress span');
    const skipBtn = gate.querySelector('.intro-skip');

    const lines = [
      '[INIT] starting secure session...',
      '[TLS] negotiating cipher suite: TLS_AES_256_GCM_SHA384',
      '[HSTS] preload active — downgrade attacks mitigated',
      '[PKI] loading public keys... <ok>',
      '[SECCOMP] sandbox profile applied',
      '[WAF] signatures updated (anomaly threshold: 0.82)',
      '[TELEMETRY] privacy-preserving sampling enabled',
      '[ATTEST] integrity check passed',
      '[ACCESS] grant level: analyst',
    ];

    let i = 0, col = 0, frame = 0;
    let written = '';
    const writeNext = () => {
      if (i >= lines.length) return finish();
      const line = lines[i];
      written += line.slice(0, col + 1);
      linesEl.textContent = written + '\n';
      col++;
      bar.style.width = `${Math.min(100, Math.floor(((i + col / line.length) / lines.length) * 100))}%`;

      if (col >= line.length) { written += '\n'; i++; col = 0; frame += 300; setTimeout(writeNext, 220); }
      else setTimeout(writeNext, 24); // type speed
    };

    const finish = () => {
      // Small pause, then hide
      setTimeout(() => {
        gate.classList.add('hidden');
        setTimeout(() => gate.remove(), 650);
        sessionStorage.setItem('introSeen','1');
      }, 450);
    };

    const skip = () => { gate.classList.add('hidden'); setTimeout(()=> gate.remove(), 350); sessionStorage.setItem('introSeen','1'); };
    skipBtn?.addEventListener('click', skip);
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); skip(); }
    });

    writeNext();
  })();

  // 2) Arrow-key section navigation and wheel snap assist
  (function sectionNavigation(){
    const sections = Array.from(document.querySelectorAll('main section.panel, main section.hero, footer.footer'));
    if (!sections.length) return;

    const goto = (idx) => sections[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const currentIndex = () => {
      // Choose section whose top is closest but not greater than 140px
      const tops = sections.map(s => Math.abs(s.getBoundingClientRect().top - 140));
      return tops.indexOf(Math.min(...tops));
    };

    document.addEventListener('keydown', (e)=>{
      if (['ArrowDown','PageDown',' '].includes(e.key) && !e.altKey && !e.metaKey){
        e.preventDefault();
        const i = currentIndex();
        goto(Math.min(sections.length - 1, i + 1));
      }
      if (['ArrowUp','PageUp'].includes(e.key) && !e.altKey && !e.metaKey){
        e.preventDefault();
        const i = currentIndex();
        goto(Math.max(0, i - 1));
      }
    });
  })();

  // 3) Collapsible experience
  (function collapsibleExperience(){
    document.querySelectorAll('.exp-toggle').forEach(btn=>{
      const panel = btn.parentElement?.querySelector('.exp-panel');
      if (!panel) return;
      const open = (yes) => {
        btn.setAttribute('aria-expanded', String(yes));
        panel.hidden = !yes;
        // animate via max-height
        if (yes) {
          panel.classList.add('open');
          panel.style.setProperty('--h', panel.scrollHeight + 'px');
        } else {
          panel.style.setProperty('--h', panel.scrollHeight + 'px'); // set current height
          requestAnimationFrame(()=>{
            panel.classList.remove('open');
            panel.style.setProperty('--h', '0px');
          });
        }
      };
      btn.addEventListener('click', ()=> open(btn.getAttribute('aria-expanded') !== 'true'));
      // security-themed subtle click sound effect could be added here (kept silent for professionalism)
    });
  })();

  // 4) Extra microinteraction: small “verify” ripple on primary buttons
  document.querySelectorAll('.btn.primary').forEach(btn=>{
    btn.addEventListener('mouseenter', ()=>{
      btn.style.boxShadow = '0 0 0 2px rgba(0,255,179,.15), 0 10px 30px rgba(0,255,179,.20)';
    });
    btn.addEventListener('mouseleave', ()=>{
      btn.style.boxShadow = '0 8px 30px rgba(0,255,179,0.06)';
    });
  });

  // Landing terminal animation (personalized, replayable)
  (function landingTerminal(){
    const landing = document.getElementById('landing');        // FIX: define landing
    if (!landing) return;

    const term = document.getElementById('landing-terminal');
    const bar = landing.querySelector('.term-progress span');
    const cue = landing.querySelector('.scroll-cue');
    const welcome = document.getElementById('welcome');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!term || !bar) return;

    // Random helpers (safe fallback if crypto unavailable)
    const rng = (n) => {
      try {
        const a = new Uint8Array(n); crypto.getRandomValues(a);
        return [...a].map(b=>b.toString(16).padStart(2,'0')).join('');
      } catch { return Array.from({length:n},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join(''); }
    };
    const groups = (str, g=4, sep=':') => (str.match(new RegExp(`.{1,${g}}`,'g')) || [str]).join(sep);
    const host = location.hostname || 'linux.sh';
    const user = 'user';

    let playing = false;
    let playId = 0;

    const buildLines = () => {
      const fp = rng(16).toUpperCase();
      const passkey = rng(8);
      const sess = rng(6);
      const ipv6 = groups(rng(16), 4, ':');
      const now = new Date();
      const ts = now.toISOString().replace('T',' ').split('.')[0] + ' GMT';
      return {
        meta: { fp, passkey, sess, ipv6, ts },
        lines: [
          `[INIT ${ts}] session ${sess} starting...`,
          `[SSH] ssh ${user.toLowerCase()}@${host} -p 2222`,
          `[DNS] resolved ${host} -> [${ipv6}]`,
          `[TLS] cipher: TLS_AES_256_GCM_SHA384; ALPN=h2`,
          `[WAF] signatures updated (heuristic=0.82)`,
          `[TELEMETRY] privacy-preserving sampling enabled`,
          `[ACCESS] grant level: analyst — Welcome, ${user}`,
        ]
      };
    };

    const finish = (id, meta) => {
      if (id !== playId) return;
      setTimeout(() => {
        cue?.classList.add('show');
        if (welcome) {
          welcome.hidden = false;
          welcome.innerHTML = `
            <span class="badge">ACCESS GRANTED</span>
            <span class="hello">Welcome, ${user}</span>
            <span class="context mono">Session ${meta.sess} • ${host} • ${meta.ts}</span>
          `;
          requestAnimationFrame(()=> welcome.classList.add('show'));
        }
        playing = false;
      }, 120);
    };

    const play = () => {
      if (playing) return;
      playing = true;
      const id = ++playId;

      term.textContent = '';
      bar.style.width = '0%';
      cue?.classList.remove('show');
      if (welcome) { welcome.hidden = true; welcome.classList.remove('show'); }

      const { lines, meta } = buildLines();

      if (reduce) {
        term.textContent = lines.join('\n');
        bar.style.width = '100%';
        finish(id, meta);
        return;
      }

      let i = 0, col = 0, written = '';
      const tick = () => {
        if (id !== playId) return;
        if (i >= lines.length) return finish(id, meta);

        const line = lines[i];
        const typed = line.substring(0, col + 1);
        term.textContent = written + typed;
        col++;

        const pct = Math.min(100, Math.floor(((i + col / line.length) / lines.length) * 100));
        bar.style.width = pct + '%';

        if (col >= line.length) {
          written += line + '\n';
          col = 0; i++;
          setTimeout(tick, 130);
        } else {
          setTimeout(tick, 16);
        }
      };
      tick();
    };

    // Start now and replay when landing re-enters view
    play();
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if (en.isIntersecting && en.intersectionRatio > 0.75) play(); });
    }, { threshold:[0.25,0.5,0.75,0.9] });
    io.observe(landing);
  })();

  // If you still have an Intro Gate IIFE from earlier, keep this guard so it never runs without the element:
  (function introGate(){
    const gate = document.getElementById('intro-gate');
    if (!gate) return; // nothing to do if overlay is not present
  })();

  // Experience vertical tabs (accessible)
  (function expTabs(){
    const nav = document.querySelector('.exp-nav');
    const tabs = nav ? Array.from(nav.querySelectorAll('.exp-tab')) : [];
    const panels = Array.from(document.querySelectorAll('.exp-panel'));
    if (!tabs.length || !panels.length) return;

    const activate = (idx) => {
      // First update tab states
      tabs.forEach((t,i) => {
        const selected = i === idx;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      
      // Then update panel visibility and add animation
      panels.forEach((p,i) => {
        if (i === idx) {
          // Show and animate selected panel
          p.hidden = false;
          p.classList.add('active');
          // Brief delay before animation to ensure display:block takes effect
          requestAnimationFrame(() => {
            p.classList.add('animating');
            setTimeout(() => p.classList.remove('animating'), 650);
          });
          p.tabIndex = 0;
        } else {
          // Hide other panels
          p.hidden = true;
          p.classList.remove('active', 'animating');
          p.tabIndex = -1;
        }
      });
    };

    // Add click and keyboard handlers
    tabs.forEach((t,i) => {
      t.addEventListener('click', () => activate(i));
      t.addEventListener('keydown', (e) => {
        const current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
        
        // Handle arrow navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const next = Math.min(tabs.length - 1, current + 1);
          tabs[next].focus();
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = Math.max(0, current - 1);
          tabs[prev].focus();
        }
        
        // Activate on Enter/Space
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(tabs.indexOf(e.target));
        }
      });
    });

    // Initialize to first tab or currently selected
    const initial = Math.max(0, tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'));
    activate(initial);
  })();

  // Show more / fewer projects
  (function moreProjects(){
    const btn = document.getElementById('toggle-projects');
    const grid = document.getElementById('projects-grid');
    if (!btn || !grid) return;

    const extras = Array.from(grid.querySelectorAll('.project-card.extra'));
    const setState = (expanded) => {
      btn.setAttribute('aria-expanded', String(expanded));
      btn.textContent = expanded ? 'Show fewer projects' : 'Show more projects';
      extras.forEach(card => {
        if (expanded) {
          card.hidden = false;
          // trigger animation
          requestAnimationFrame(() => card.classList.add('reveal'));
          setTimeout(() => card.classList.remove('reveal'), 400);
        } else {
          card.hidden = true;
          card.classList.remove('reveal');
        }
      });
    };

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      setState(!expanded);
    });
  })();

  // Leadership filters, expand/collapse, and "more roles"
  (function leadershipUI(){
    const section = document.getElementById('leadership');
    if (!section) return;

    const chips = Array.from(section.querySelectorAll('.lead-chip'));
    const items = Array.from(section.querySelectorAll('.lead-item'));
    const toggles = Array.from(section.querySelectorAll('.lead-toggle'));
    const moreBtn = document.getElementById('toggle-leadership');
    const extras = items.filter(li => li.classList.contains('extra'));

    // Filter
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.toggle('is-active', c === chip));
        chips.forEach(c => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));

        const kind = chip.dataset.filter;
        const moreBtn = document.getElementById('toggle-leadership');
        const expanded = moreBtn && moreBtn.getAttribute('aria-expanded') === 'true';

        items.forEach(li => {
          const matches = kind === 'all' || li.dataset.kind === kind;
          // Respect “Show more roles” state
          li.hidden = (!matches) || (!expanded && li.classList.contains('extra'));
        });
      });
    });

    // Expand/collapse
    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.lead-card');
        const willOpen = card.classList.contains('is-collapsed'); // opening if currently collapsed
        card.classList.toggle('is-collapsed', !willOpen);
        e.currentTarget.setAttribute('aria-expanded', String(willOpen));
        e.currentTarget.setAttribute('aria-label', willOpen ? 'Hide details' : 'Show details');
      });
    });

    // Show more roles
    if (moreBtn) {
      const setState = (expanded) => {
        moreBtn.setAttribute('aria-expanded', String(expanded));
        moreBtn.textContent = expanded ? 'Show fewer roles' : 'Show more roles';
        extras.forEach(li => {
          if (expanded) {
            li.hidden = false;
            li.classList.add('reveal');
            setTimeout(()=> li.classList.remove('reveal'), 350);
          } else {
            li.hidden = true;
            li.classList.remove('reveal');
          }
        });
      };
      moreBtn.addEventListener('click', () => {
        const expanded = moreBtn.getAttribute('aria-expanded') === 'true';
        setState(!expanded);
      });
    }
  })();

  // Connect: copy email helper
  (function copyEmail(){
    const btn = document.querySelector('.copy-email');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email || 'you@example.com';
      try{
        await navigator.clipboard.writeText(email);
        const prev = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(()=> btn.textContent = prev, 1200);
      }catch(e){
        window.location.href = `mailto:${email}`;
      }
    });
  })();

  // Blog: search + chip filters + "/" focus
  (function blogUI(){
    const grid = document.getElementById('blog-grid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.post-card'));
    const chips = Array.from(document.querySelectorAll('.chip-row .chip'));
    const search = document.getElementById('blog-search');
    const empty = document.getElementById('no-results');

    const state = { tag: 'all', q: '' };

    function apply(){
      let visible = 0;
      cards.forEach(card => {
        const tags = (card.dataset.tags || '').toLowerCase().split(',');
        const title = (card.dataset.title || '').toLowerCase();
        const tagOk = state.tag === 'all' || tags.includes(state.tag);
        const qOk = !state.q || title.includes(state.q);
        const show = tagOk && qOk;
        card.hidden = !show;
        if (show) visible++;
      });
      if (empty) empty.hidden = visible !== 0;
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.toggle('is-active', c === chip));
        chips.forEach(c => c.setAttribute('aria-selected', c === chip ? 'true' : 'false'));
        state.tag = (chip.dataset.tag || 'all').toLowerCase();
        apply();
      });
    });

    if (search){
      search.addEventListener('input', () => { state.q = search.value.trim().toLowerCase(); apply(); });
      // "/" to focus
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== search){
          e.preventDefault(); search.focus();
        }
      });
    }

    apply();
  })();

  // About section: word-by-word typing, then reveal chips + popline
  (function aboutTyper(){
    const about = document.getElementById('about');
    if(!about) return;

    const lines = Array.from(about.querySelectorAll('.type-line'));
    if(!lines.length) return;

    const chips = about.querySelector('.strength-chips');
    const pop  = document.getElementById('strength-pop');
    const coreLabel = about.querySelector('.core-label'); // NEW

    let started = false;

    // Hide reveal targets only if JS runs
    [chips, pop, coreLabel].forEach(el => { if(el){ el.classList.add('is-waiting'); el.classList.remove('is-revealed'); } });

    const io = new IntersectionObserver((entries)=>{
      if(entries.some(e=>e.isIntersecting) && !started){
        started = true;
        io.disconnect();

        // Capture original text and clear to start typing
        const originals = lines.map(el => el.textContent.trim());
        lines.forEach((el,i)=>{
          el.setAttribute('aria-label', originals[i]); // keep accessible text
          el.textContent = '';                         // visual typing starts empty
        });

        const typeWords = (el, text, base=70) => new Promise(resolve=>{
          const words = text.split(/\s+/);
          let i = 0;
          const tick = () => {
            const typed = words.slice(0, i).join(' ');
            el.innerHTML = typed + (i < words.length ? ' <span class="caret" aria-hidden="true"></span>' : '');
            if(i++ < words.length){
              const w = words[i-1] || '';
              let delay = base;
              if(/[.,;:!?]$/.test(w)) delay += 180;
              if(w.length > 12) delay += 40;
              setTimeout(tick, delay);
            }else{
              setTimeout(()=>{ el.innerHTML = typed; resolve(); }, 120);
            }
          };
          tick();
        });

        (async ()=>{
          for(let i=0;i<lines.length;i++){
            await typeWords(lines[i], originals[i], 85);
          }
          [chips, pop, coreLabel].forEach(el => { if(el){ el.classList.remove('is-waiting'); el.classList.add('is-revealed'); } });
        })();
      }
    }, { threshold: 0.35 });

    io.observe(about);
  })();

  const popLine = document.getElementById('strength-pop');
  if(popLine){
    const chips = document.querySelectorAll('.strength-chip');
    let lastText = '';
    const setText = (txt) => {
      if(!txt || txt === lastText) return;
      popLine.textContent = txt;
      popLine.classList.add('show');
      lastText = txt;
      // retrigger scan anim
      popLine.classList.remove('scan-rerun');
      void popLine.offsetWidth;
      popLine.classList.add('scan-rerun');
    };
    chips.forEach(chip=>{
      const txt = chip.getAttribute('data-pop');
      chip.addEventListener('mouseenter', ()=> setText(txt));
      chip.addEventListener('focus', ()=> setText(txt));
      // optional: clear on leave (comment out to keep last)
      chip.addEventListener('mouseleave', ()=> { /* keep last description */ });
      chip.addEventListener('blur', ()=> { /* keep last description */ });
    });
    // Initialize with first chip description
    if(chips[0]) setText(chips[0].getAttribute('data-pop'));
  }

  document.querySelectorAll('.strength-chip').forEach(chip=>{
    chip.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        chip.classList.toggle('is-locked');
      }
      if(e.key==='Escape'){ chip.classList.remove('is-locked'); chip.blur(); }
    });
  });
});

// Smooth scroll helper already handles anchors; ensure publications id is supported.
// No changes required.
