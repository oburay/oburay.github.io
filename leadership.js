// Enhanced Leadership UI functionality
document.addEventListener('DOMContentLoaded', () => {
  // Leadership filters and "more roles" with new card design
  (function leadershipUI(){
    const section = document.getElementById('leadership');
    if (!section) return;

    const chips = Array.from(section.querySelectorAll('.lead-chip'));
    const cards = Array.from(section.querySelectorAll('.leadership-card'));
    const moreBtn = document.getElementById('toggle-leadership');
    const extras = cards.filter(card => card.classList.contains('extra'));

    // Apply initial animation
    cards.forEach((card, index) => {
      if (!card.classList.contains('extra')) {
        setTimeout(() => {
          card.classList.add('reveal');
          setTimeout(() => card.classList.remove('reveal'), 500);
        }, index * 100);
      }
    });

    // Filter
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.toggle('is-active', c === chip));
        chips.forEach(c => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));

        const kind = chip.dataset.filter;
        const expanded = moreBtn && moreBtn.getAttribute('aria-expanded') === 'true';

        // First hide all cards for a clean animation
        cards.forEach(card => {
          card.hidden = true;
        });

        // Then show matching cards with animation
        setTimeout(() => {
          cards.forEach((card, index) => {
            const matches = kind === 'all' || card.dataset.kind === kind;
            // Respect "Show more roles" state
            card.hidden = (!matches) || (!expanded && card.classList.contains('extra'));
            
            // Add reveal animation for filtered cards
            if (matches && !card.hidden) {
              setTimeout(() => {
                card.classList.add('reveal');
                setTimeout(() => card.classList.remove('reveal'), 500);
              }, index * 80); // Staggered animation
            }
          });
        }, 50);
      });
    });

    // Show more roles
    if (moreBtn) {
      const setState = (expanded) => {
        moreBtn.setAttribute('aria-expanded', String(expanded));
        moreBtn.textContent = expanded ? 'Show fewer roles' : 'Show more roles';
        
        // Get active filter
        const activeKind = section.querySelector('.lead-chip.is-active')?.dataset.filter || 'all';
        
        extras.forEach((card, index) => {
          const matchesFilter = activeKind === 'all' || card.dataset.kind === activeKind;
          
          if (expanded && matchesFilter) {
            card.hidden = false;
            setTimeout(() => {
              card.classList.add('reveal');
              setTimeout(() => card.classList.remove('reveal'), 500);
            }, index * 100);
          } else {
            card.hidden = true;
            card.classList.remove('reveal');
          }
        });
      };
      
      moreBtn.addEventListener('click', () => {
        const expanded = moreBtn.getAttribute('aria-expanded') === 'true';
        setState(!expanded);
      });
    }
  })();
});
