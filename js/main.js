/* ============================================
   ESCUELA PRIMARIA "MARIPOSAS LIBRES"
   Archivo: main.js
   ============================================ */


/* ── 1. MENÚ HAMBURGUESA (móvil) ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Cierra el menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ── 2. ENLACE ACTIVO EN LA BARRA DE NAVEGACIÓN ── */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);


/* ── 3. ANIMACIÓN DE ENTRADA AL HACER SCROLL ── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


/* ── 4. PESTAÑAS DE INSTALACIONES ── */
function switchTab(event, panelId) {
  document.querySelectorAll('.inst-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.inst-panel').forEach(p => p.classList.remove('active'));
  event.currentTarget.classList.add('active');
  document.getElementById(panelId).classList.add('active');
}


/* ── 5. FORMULARIO DE INSCRIPCIÓN ── */
function submitForm() {
  // Campos requeridos (con asterisco en la etiqueta)
  const inputs = document.querySelectorAll(
    '#formContent input, #formContent select, #formContent textarea'
  );

  let allValid = true;

  inputs.forEach(input => {
    const label = input.closest('.form-group')?.querySelector('label');
    const isRequired = label?.textContent.includes('*');

    // Validar solo campos requeridos que no sean email ni textarea
    if (isRequired && input.type !== 'email' && input.tagName !== 'TEXTAREA') {
      if (!input.value.trim()) {
        // Resaltar campo con error
        input.style.borderColor = '#EF4444';
        input.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.15)';
        allValid = false;

        // Quitar el error después de 2.5 segundos
        setTimeout(() => {
          input.style.borderColor = '';
          input.style.boxShadow   = '';
        }, 2500);
      }
    }
  });

  if (!allValid) return; // Detener si hay errores

  // Mostrar mensaje de éxito
  document.getElementById('formContent').style.display = 'none';
  document.getElementById('successMsg').style.display  = 'block';
}