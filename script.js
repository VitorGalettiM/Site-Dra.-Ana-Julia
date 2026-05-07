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


  /* ─── 11. BOTÃO VOLTAR AO TOPO ─── */
  const backBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  console.log('✅ Site Dra. Ana Julia carregado com sucesso!');
});