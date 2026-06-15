// ============================================
// 1 — APPARITION AU SCROLL
// ============================================

const elementsAnimes = document.querySelectorAll(
	'.projet-row, .contact-carte, .apropos-citation, .apropos-bloc, .traj-etape'
);

// état invisible au départ
elementsAnimes.forEach(el => {
	el.style.opacity = '0';
	el.style.transform = 'translateY(24px)';
	el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observateur = new IntersectionObserver((entries) => {
	entries.forEach((entry, i) => {
		if (entry.isIntersecting) {
			// délai progressif pour chaque élément
			setTimeout(() => {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}, i * 100);
			observateur.unobserve(entry.target);
		}
	});
}, { threshold: 0.15 });

elementsAnimes.forEach(el => observateur.observe(el));


// ============================================
// 2 — LIEN ACTIF NAVBAR
// ============================================

const sections = document.querySelectorAll('section');
const liensNav = document.querySelectorAll('nav ul a');

const observateurNav = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			liensNav.forEach(lien => lien.classList.remove('active'));
			const lienActif = document.querySelector(
				`nav ul a[href="#${entry.target.id}"]`
			);
			if (lienActif) lienActif.classList.add('active');
		}
	});
}, { threshold: 0.4 });

sections.forEach(section => observateurNav.observe(section));


// ============================================
// 3 — TERMINAL ANIMÉ (HERO)
// ============================================

const terminalCorps = document.getElementById('terminal-corps');

if (terminalCorps) {
  const prompt = 'alison:~$ ';
  const sequence = [
    { type: 'cmd',    texte: 'whoami' },
    { type: 'sortie', texte: 'alison_amblard' },
    { type: 'vide' },
    { type: 'cmd',    texte: 'cat parcours.txt' },
    { type: 'sortie', texte: 'cuisine → dev web → cybersécurité' },
    { type: 'vide' },
    { type: 'cmd',    texte: './objectif.sh' },
    { type: 'ok',     texte: '[OK] alternance cyber · sept. 2026' },
  ];

  const pause = (ms) => new Promise(r => setTimeout(r, ms));
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  async function taperLigne(item) {
    const ligne = document.createElement('div');
    ligne.className = 'terminal-ligne';
    terminalCorps.appendChild(ligne);

    if (item.type === 'vide') {
      ligne.innerHTML = '&nbsp;';
      return;
    }

    if (item.type === 'cmd') {
      const p = document.createElement('span');
      p.className = 'terminal-prompt';
      p.textContent = prompt;
      ligne.appendChild(p);
    }

    const span = document.createElement('span');
    if (item.type === 'cmd') span.className = 'terminal-cmd';
    if (item.type === 'ok')  span.className = 'terminal-ok';
    ligne.appendChild(span);

    if (reduit) {
      span.textContent = item.texte;
      return;
    }

    for (const c of item.texte) {
      span.textContent += c;
      await pause(38);
    }
  }

  async function lancer() {
    for (const item of sequence) {
      await taperLigne(item);
      await pause(reduit ? 0 : 300);
    }
    const finale = document.createElement('div');
    finale.className = 'terminal-ligne';
    const p = document.createElement('span');
    p.className = 'terminal-prompt';
    p.textContent = prompt;
    const cur = document.createElement('span');
    cur.className = 'curseur';
    finale.appendChild(p);
    finale.appendChild(cur);
    terminalCorps.appendChild(finale);
  }

  lancer();
}
