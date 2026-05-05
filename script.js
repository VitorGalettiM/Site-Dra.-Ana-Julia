/* ===================================================
   SCRIPT.JS — Dra. Ana Julia Barraqui
   Interações & Animações
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. PROGRESS BAR ─── */
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrolled / max * 100) + '%';
  }, { passive: true });


  /* ─── 2. NAVBAR: shrink ao rolar + link ativo ─── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.snav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // shrink
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // link ativo
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });


  /* ─── 3. MENU HAMBURGER (MOBILE) ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ─── 4. REVEAL AO ROLAR ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObs.observe(el));


  /* ─── 5. CONTADOR ANIMADO (STATS) ─── */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = prefix + current;
        if (current >= target) clearInterval(timer);
      }, 20);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(el => countObs.observe(el));


  /* ─── 6. MODAL DE SERVIÇOS ─── */
  const modalData = {
    limpeza: {
      icon: '🪥',
      title: 'Limpeza',
      body: 'A limpeza profissional (profilaxia) remove tártaro e placa bacteriana acumulados em locais de difícil acesso para a escova. Realizada com instrumentos ultrassônicos e pasta profilática, deixa os dentes limpos, polidos e protegidos. Recomendada a cada 6 meses para manter a saúde bucal em dia e prevenir cáries e doenças periodontais.'
    },
    restauracao: {
      icon: '💎',
      title: 'Restauração',
      body: 'A restauração recupera dentes danificados por cáries, fraturas ou desgaste, devolvendo forma, função e estética. Utilizamos resinas compostas de última geração que imitam perfeitamente a cor e a translucidez dos dentes naturais. O procedimento é rápido, indolor e pode ser concluído em uma única consulta na maioria dos casos.'
    },
    clareamento: {
      icon: '🌟',
      title: 'Clareamento',
      body: 'O clareamento dental pode ser realizado em consultório (com resultados visíveis em poucas sessões) ou com moldeiras personalizadas para uso caseiro. Utilizamos géis clareadores seguros e eficazes que garantem até 8 tons de clareamento, com mínima sensibilidade e total segurança para o esmalte.'
    },
    protese: {
      icon: '🦷',
      title: 'Prótese',
      body: 'A prótese dentária restaura a função mastigatória, a estética e a fonética de pacientes que perderam parte ou todos os dentes. Trabalhamos com próteses fixas (coroas e pontes), removíveis (totais e parciais) e próteses sobre implantes, sempre com materiais de alta qualidade e resultado extremamente natural.'
    },
    plaquinha: {
      icon: '😴',
      title: 'Plaquinha Miorrelaxante',
      body: 'A plaquinha miorrelaxante é indicada para pacientes com bruxismo (ranger ou apertar os dentes) e disfunções na articulação temporomandibular (ATM). Confeccionada sob medida a partir de moldagem personalizada, é usada durante o sono e protege os dentes do desgaste, alivia tensão muscular e reduz dores de cabeça e no pescoço.'
    },
    extracao: {
      icon: '🩺',
      title: 'Extração Simples',
      body: 'A extração simples é realizada quando o dente não pode ser recuperado por outros tratamentos. Todo o procedimento é feito com anestesia local adequada para garantir o máximo de conforto ao paciente. Após a extração, orientamos sobre os cuidados pós-operatórios e, quando necessário, planejamos a reabilitação do espaço com implante ou prótese.'
    }
  };

  const overlay = document.getElementById('modal-overlay');
  const mIcon = document.getElementById('modal-icon');
  const mTitle = document.getElementById('modal-title');
  const mBody = document.getElementById('modal-body');
  const mCta = document.getElementById('modal-cta');

  document.querySelectorAll('.scard[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const d = modalData[card.dataset.modal];
      if (!d) return;
      mIcon.textContent = d.icon;
      mTitle.textContent = d.title;
      mBody.textContent = d.body;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.getElementById('modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // CTA do modal fecha o modal e vai para contato
  mCta.addEventListener('click', () => closeModal());


  /* ─── 7. GALERIA — clique leva ao contato ─── */
  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
    });
  });


  /* ─── 8. MÁSCARA DE TELEFONE ─── */
  const phoneInput = document.getElementById('input-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let v = phoneInput.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      phoneInput.value = v;
    });
  }


  /* ─── 9. CONTADOR DE CARACTERES (TEXTAREA) ─── */
  const msgArea = document.getElementById('input-msg');
  const charCounter = document.getElementById('char-counter');
  if (msgArea && charCounter) {
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      charCounter.textContent = `${len}/300`;
      charCounter.style.color = len > 270 ? 'var(--rosa)' : 'var(--texto-light)';
    });
  }


  /* ─── 10. VALIDAÇÃO DE FORMULÁRIO ─── */
  function validateField(input) {
    const group = input.closest('.fg');
    if (!group) return true;
    let valid = input.value.trim() !== '';
    if (input.type === 'email' && valid)
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

    const msg = group.querySelector('.field-msg');
    group.classList.remove('valid-group', 'invalid-group', 'show-msg');
    input.classList.remove('valid', 'invalid');

    if (input.value.trim()) {
      group.classList.add(valid ? 'valid-group' : 'invalid-group', 'show-msg');
      input.classList.add(valid ? 'valid' : 'invalid');
      if (msg) msg.textContent = valid ? '✓ Preenchido corretamente' : '✗ Por favor, verifique este campo';
    }
    return valid;
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('blur', () => validateField(el));
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const required = form.querySelectorAll('input[required], select[required]');
      let allValid = true;
      required.forEach(inp => { if (!validateField(inp)) allValid = false; });
      if (!allValid) return;

      const btn = document.getElementById('submit-btn');
      btn.disabled = true;
      btn.textContent = '⏳ Enviando...';

      // Simulação de envio (substituir por fetch real)
      setTimeout(() => {
        btn.textContent = '✓ Mensagem enviada!';
        btn.style.background = 'var(--green)';
        btn.style.boxShadow = '0 8px 24px rgba(76,175,125,.35)';
        form.querySelectorAll('input, select, textarea').forEach(el => {
          el.value = '';
          el.classList.remove('valid', 'invalid');
          const g = el.closest('.fg');
          if (g) g.classList.remove('valid-group', 'invalid-group', 'show-msg');
        });
        if (charCounter) charCounter.textContent = '0/300';

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'Enviar Mensagem';
          btn.style.background = '';
          btn.style.boxShadow = '';
        }, 4000);
      }, 1800);
    });
  }


  /* ─── 11. BOTÃO VOLTAR AO TOPO ─── */
  const backBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  console.log('✅ Site Dra. Ana Julia carregado com sucesso!');
});