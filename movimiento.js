/* ==========================================================
   MOVIMIENTO DE ROIC & COMPANY (estilos en movimiento.css)
   Se carga al final de cada página, después de sus propios scripts.
   1. Aparición al desplazarse, con entrada escalonada.
   2. Portada: título palabra por palabra y leve desplazamiento del texto.
   3. Encabezado que se esconde al bajar y vuelve al subir.
   4. Línea de pestañas que se desliza y barra de progreso de lectura.
   5. Contadores de cifras.
   6. Organigrama que se dibuja.
   7. Nombre que viaja de la tarjeta al perfil al cambiar de página.
   ========================================================== */
(function () {
  'use strict';
  var html = document.documentElement;
  // Con «reducir movimiento» las apariciones se hacen solo con fundido (clase rv-suave).
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var animar = html.classList.contains('rv') && 'IntersectionObserver' in window;
  var mover = animar && !reducir;
  html.classList.add('rv-js');
  if (!animar) html.classList.remove('rv');
  var $$ = function (s, raiz) { return [].slice.call((raiz || document).querySelectorAll(s)); };

  // Mantener igual a las listas de movimiento.css.
  var REVELAR = '.intro p, .label, .feat > div:last-child, .cards .card, .cifras .cifra, .pgrid .person, ' +
    '.wk-txt > *, .acard, .story, .fcard, ' +
    '.im-txt > *, .im-intro > *, .im-cap, .im-cols article, .im-feat > div:last-child, .im-banner p, ' +
    '.sec-head, .cap, .icard, .model, .team .person, .step, .sector, .rule, .qgroup, ' +
    '.pf-txt > :not(h1), .pf-foto, .pf-body article > *, .pf-side, .pub, .mp';
  var IMAGENES = '.feat .media, .cards .media, .amedia, .fmedia, .im-wide, .pub-art';

  /* ---------- 1. Aparición al desplazarse ---------- */
  function revelar(el, demora) {
    if (el.classList.contains('rv-in') || el.classList.contains('rv-ok')) return;
    el.style.setProperty('--rv-d', demora + 'ms');
    el.classList.add('rv-in');
    $$(IMAGENES, el).forEach(function (m) { revelar(m, demora); });
    // Al terminar, el elemento vuelve a su estilo normal (y a sus efectos al pasar el ratón).
    setTimeout(function () {
      el.classList.remove('rv-in');
      el.classList.add('rv-ok');
      el.style.removeProperty('--rv-d');
    }, demora + 1500);
  }
  if (animar) {
    var vistos = new IntersectionObserver(function (entradas) {
      var nuevos = entradas.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
      nuevos.sort(function (a, b) {
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return (ra.top - rb.top) || (ra.left - rb.left);
      });
      nuevos.forEach(function (el, i) { vistos.unobserve(el); revelar(el, Math.min(i * 70, 490)); });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    $$(REVELAR).concat($$(IMAGENES).filter(function (m) { return !m.parentElement.closest(REVELAR); }))
      .forEach(function (el) { vistos.observe(el); });
  } else {
    $$(REVELAR + ', ' + IMAGENES).forEach(function (el) { el.classList.add('rv-ok'); });
  }

  /* ---------- 2. Portada ---------- */
  var heroTxt = document.querySelector('.hero-txt');
  var titulo = heroTxt && heroTxt.querySelector('h1');
  if (titulo && mover) {
    var texto = titulo.textContent;
    var palabras = texto.split(/\s+/).filter(Boolean);
    titulo.textContent = '';
    palabras.forEach(function (p, i) {
      var caja = document.createElement('span'), interior = document.createElement('span');
      caja.className = 'm-pal';
      interior.textContent = p;
      interior.style.setProperty('--wd', (120 + i * 70) + 'ms');
      caja.appendChild(interior);
      titulo.appendChild(caja);
      if (i < palabras.length - 1) titulo.appendChild(document.createTextNode(' '));
    });
    titulo.classList.add('m-partido');
    requestAnimationFrame(function () { requestAnimationFrame(function () { heroTxt.classList.add('m-listo'); }); });
    // Terminada la entrada, el título vuelve a ser texto simple (con su sombra completa).
    setTimeout(function () { titulo.textContent = texto; }, 120 + palabras.length * 70 + 1100);
  } else if (heroTxt) {
    heroTxt.classList.add('m-listo');
    if (titulo) titulo.classList.add('m-partido');
  }
  var hero = document.querySelector('.hero');
  function desplazarHero(y) {
    if (!hero || !heroTxt || !mover) return;
    var alto = hero.offsetHeight;
    if (y > alto) return;
    heroTxt.style.transform = 'translate3d(0,' + (-y * 0.18).toFixed(1) + 'px,0)';
    heroTxt.style.opacity = Math.max(0, 1 - y / (alto * 0.75)).toFixed(3);
  }

  /* ---------- 3 y 4. Encabezado, pestañas y progreso ---------- */
  var hdr = document.querySelector('.hdr, .mk-hdr');
  var barra = document.createElement('div');
  barra.className = 'm-progreso';
  barra.setAttribute('aria-hidden', 'true');
  document.body.appendChild(barra);
  var ultimo = window.scrollY, pendiente = false, quieto = 0;
  // Al saltar a una sección (enlace interno), el encabezado se queda visible.
  var anclar = function () { quieto = Date.now() + 1400; html.classList.remove('m-oculto'); };
  document.addEventListener('click', function (e) { var a = e.target.closest('a[href*="#"]'); if (a && a.pathname === location.pathname) anclar(); });
  window.addEventListener('hashchange', anclar);
  function alDesplazar() {
    pendiente = false;
    var y = window.scrollY;
    html.classList.toggle('m-bajo', y > 8);
    if (hdr && !reducir) {
      var alto = hdr.offsetHeight;
      var ocupado = hdr.contains(document.activeElement) || document.querySelector('dialog[open], #side:not([hidden]), #srch:not([hidden])');
      if (!ocupado && Date.now() > quieto && y > alto * 3 && y > ultimo + 6) html.classList.add('m-oculto');
      else if (y < ultimo - 6 || y <= alto) html.classList.remove('m-oculto');
    }
    ultimo = y;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.transform = 'scaleX(' + (total > 0 ? Math.min(1, y / total) : 0).toFixed(4) + ')';
    desplazarHero(y);
  }
  window.addEventListener('scroll', function () {
    if (!pendiente) { pendiente = true; requestAnimationFrame(alDesplazar); }
  }, { passive: true });
  if (hdr) hdr.addEventListener('focusin', function () { html.classList.remove('m-oculto'); });
  alDesplazar();

  var lista = document.querySelector('.tabs, .mk-tabs');
  if (lista && lista.parentElement) {
    var nav = lista.parentElement;
    var ind = document.createElement('span');
    ind.className = 'm-ind';
    ind.setAttribute('aria-hidden', 'true');
    if (getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
    nav.appendChild(ind);
    var actual = lista.querySelector('a[aria-current="page"]');
    var llevar = function (a, instantaneo) {
      if (!a || !a.offsetWidth) { ind.classList.remove('m-vis'); return; }
      var rn = nav.getBoundingClientRect(), ra = a.getBoundingClientRect();
      if (instantaneo) ind.style.transition = 'none';
      ind.style.transform = 'translate3d(' + (ra.left - rn.left + 4) + 'px,0,0) scaleX(' + Math.max(0, ra.width - 8) + ')';
      ind.style.top = (ra.bottom - rn.top - 4) + 'px';
      ind.style.bottom = 'auto';
      ind.classList.add('m-vis');
      if (instantaneo) { ind.offsetWidth; ind.style.transition = ''; }
    };
    if (actual) { nav.classList.add('con-ind'); html.classList.add('con-ind'); }
    var volver = function () { if (actual) llevar(actual); else ind.classList.remove('m-vis'); };
    $$('a, button', lista).forEach(function (a) {
      a.addEventListener('mouseenter', function () { llevar(a); });
      a.addEventListener('focus', function () { llevar(a); });
    });
    lista.addEventListener('mouseleave', volver);
    lista.addEventListener('focusout', function (e) { if (!lista.contains(e.relatedTarget)) volver(); });
    var colocar = function () { if (actual) llevar(actual, true); };
    colocar();
    window.addEventListener('resize', colocar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(colocar);
  }

  /* ---------- 5. Contadores ---------- */
  function contar(el) {
    var meta = parseFloat(el.getAttribute('data-cuenta'));
    if (!mover || isNaN(meta)) { el.textContent = el.getAttribute('data-cuenta'); return; }
    var inicio = null, dur = 1600;
    var paso = function (t) {
      if (inicio === null) inicio = t;
      var x = Math.min(1, (t - inicio) / dur);
      var e = 1 - Math.pow(1 - x, 4);
      el.textContent = Math.round(meta * e).toLocaleString('es-PE');
      if (x < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }
  var cuentas = $$('[data-cuenta]');
  if (cuentas.length) {
    if (mover) {
      cuentas.forEach(function (el) { el.textContent = '0'; });
      var vigia = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          vigia.unobserve(e.target);
          setTimeout(function () { contar(e.target); }, 200);
        });
      }, { threshold: 0.6 });
      cuentas.forEach(function (el) { vigia.observe(el); });
    } else cuentas.forEach(contar);
  }

  /* ---------- 6. Organigrama ---------- */
  var org = document.querySelector('.org');
  if (org && animar) {
    var t = 0;
    var cajas = $$('.org-top', org);
    cajas.forEach(function (top) {
      top.querySelector('.org-box').style.setProperty('--od', t + 'ms');
      top.style.setProperty('--ld', (t + 260) + 'ms');
      t += 420;
    });
    $$('.org-area', org).forEach(function (area, i) {
      area.style.setProperty('--ld', (t - 60) + 'ms');
      var base = t + 200 + i * 110;
      area.querySelector('.org-ah').style.setProperty('--od', base + 'ms');
      var ps = area.querySelector('.org-ps');
      if (ps) ps.style.setProperty('--ld', (base + 280) + 'ms');
      $$('.org-p', area).forEach(function (p, k) {
        p.style.setProperty('--od', (base + 420 + k * 140) + 'ms');
        var li = p.parentElement;
        if (li && li.closest('.org-team')) li.style.setProperty('--ld', (base + 360 + k * 140) + 'ms');
      });
    });
    var vigiaOrg = new IntersectionObserver(function (entradas) {
      if (!entradas.some(function (e) { return e.isIntersecting; })) return;
      vigiaOrg.disconnect();
      org.classList.add('org-in');
      setTimeout(function () { $$('.org-box, .org-ah, .org-p', org).forEach(function (el) { el.classList.add('rv-ok'); }); }, 4200);
    }, { rootMargin: '0px 0px -15% 0px' });
    vigiaOrg.observe(org);
  }

  /* ---------- 7. Paso entre páginas ---------- */
  // Al llegar con transición, lo que ya está en pantalla entra con la
  // transición misma (sin una segunda animación encima).
  window.addEventListener('pagereveal', function (e) {
    if (!e.viewTransition || !animar) return;
    var alto = window.innerHeight;
    $$(REVELAR + ', ' + IMAGENES).forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < alto && r.bottom > 0) { el.classList.add('rv-ok'); el.classList.remove('rv-in'); }
    });
  });
  // Al salir, el encabezado vuelve a su sitio para que no se mueva entre páginas.
  window.addEventListener('pageswap', function () {
    if (!hdr) return;
    hdr.style.transition = 'none';
    html.classList.remove('m-oculto');
  });
  window.addEventListener('pageshow', function () { if (hdr) hdr.style.transition = ''; });

  // El nombre viaja de la tarjeta al perfil.
  if (!reducir) {
    var propio = document.getElementById('pf-nombre');
    if (propio) propio.style.viewTransitionName = 'nombre';
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="persona.html?p="]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      // El nombre de la persona: el del enlace, o el de su tarjeta si el enlace dice «Ver perfil».
      var tarjeta = a.classList.contains('p-link') && a.closest('article');
      var nombre = a.querySelector('b') || (tarjeta && tarjeta.querySelector('h3 a')) || a;
      if (propio && propio !== nombre) propio.style.viewTransitionName = '';
      nombre.style.viewTransitionName = 'nombre';
    });
    // Al volver con «atrás», ningún nombre debe quedar marcado dos veces.
    window.addEventListener('pageshow', function () {
      $$('[style*="view-transition-name"]').forEach(function (el) { if (el !== propio) el.style.viewTransitionName = ''; });
      if (propio) propio.style.viewTransitionName = 'nombre';
    });
  }
})();
