// ============================================
// 1 — APPARITION AU SCROLL
// ============================================

const elementsAnimes = document.querySelectorAll(
	'.projet-row, .contact-carte'
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
