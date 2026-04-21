// ============================================
// 1 — APPARITION AU SCROLL
// Les sections s'affichent en fondu doux
// quand elles entrent dans l'écran 
// ============================================

const elementsAnimes = document.querySelectorAll(
	'#hero, #projets, #contact, .projet-row, .contact-carte'
);

const observateur = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, {
	threshold: 0.1
});

elementsAnimes.forEach(el => observateur.observe(el));


// ============================================
// 2 — LIEN ACTIF DANS LA NAVBAR
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
}, {
	threshold: 0.4
});

sections.forEach(section => observateurNav.observe(section));
