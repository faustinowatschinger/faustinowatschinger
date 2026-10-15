// Genera ../100-codigos-chatgpt.pdf a partir de codigos.json.
// Uso: NODE_PATH="$(npm root -g)" node generar.cjs
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const AQUI = __dirname;
const SALIDA = path.join(AQUI, '..', '100-codigos-chatgpt.pdf');
const POR_PAGINA = 5;

const categorias = JSON.parse(fs.readFileSync(path.join(AQUI, 'codigos.json'), 'utf8'));
const nombresDeCodigos = new Set(categorias.flatMap((c) => c.codigos.map((x) => x.codigo)));

const total = categorias.reduce((n, c) => n + c.codigos.length, 0);
if (total !== 100) throw new Error(`Hay ${total} códigos, tienen que ser 100.`);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dosDigitos = (n) => String(n).padStart(2, '0');

// Resalta los códigos dentro del ejemplo y apaga lo que va entre corchetes.
function ejemploHtml(texto) {
  return texto
    .split(/(\[[^\]]+\])/)
    .map((parte) => {
      if (parte.startsWith('[')) return `<span class="relleno">${esc(parte)}</span>`;
      return parte
        .split(/(\s+)/)
        .map((t) => (nombresDeCodigos.has(t) ? `<b>${esc(t)}</b>` : esc(t)))
        .join('');
    })
    .join('');
}

// Numeración de páginas: portada, cómo se usan, índice, 2 por categoría, cierre.
const PRIMERA_DE_CATEGORIA = 4;
const paginaDeCategoria = (i) => PRIMERA_DE_CATEGORIA + i * Math.ceil(10 / POR_PAGINA);
const TOTAL_PAGINAS = 3 + categorias.reduce((n, c) => n + Math.ceil(c.codigos.length / POR_PAGINA), 0) + 1;

const pie = (n) => `
  <footer class="pie"><span>100 códigos de ChatGPT</span><span>${n} / ${TOTAL_PAGINAS}</span></footer>`;

const chip = (codigo) => `<span class="chip">${esc(codigo)}</span>`;

const portada = `
<section class="pagina oscura portada">
  <div class="etiqueta">GUÍA GRATIS</div>
  <div class="cien">100</div>
  <h1>códigos de ChatGPT</h1>
  <p class="bajada">para aprender, trabajar y resolver cualquier cosa</p>
  <div class="muestra">
    <div class="muestra-chat">${chip('TOMAME-EXAMEN')} la Revolución Francesa</div>
    <p>Escribís el código, después tu tema, y listo.</p>
  </div>
  <p class="guardalo">Guardalo: lo vas a usar todos los días.</p>
</section>`;

const comoSeUsan = `
<section class="pagina como">
  <h2>Cómo se usan</h2>
  <ol class="pasos">
    <li>
      <h3>Escribí el código y después lo que necesitás</h3>
      <div class="ejemplo"><b>TOMAME-EXAMEN</b> la Revolución Francesa</div>
    </li>
    <li>
      <h3>Combinalos</h3>
      <div class="ejemplo"><b>COMO-SI-TUVIERA-5</b> + <b>TOMAME-EXAMEN</b> el sistema solar</div>
    </li>
    <li>
      <h3>Dale contexto</h3>
      <p>Pegá tus apuntes o el texto, o contale tu situación. Cuanto más le das, mejor te responde.</p>
    </li>
    <li>
      <h3>No te preocupes por cómo lo escribís</h3>
      <p>Con o sin tilde, en mayúscula o en minúscula: funciona igual.</p>
    </li>
    <li>
      <h3>Los que dicen <span class="insignia">IMAGEN</span> te hacen un dibujo</h3>
      <p>En el plan gratis de ChatGPT hay un límite de imágenes por día.</p>
    </li>
  </ol>
  <div class="caja">
    <h3>¿Por qué funcionan?</h3>
    <p>Cada código nombra una técnica o un formato que la IA ya conoce. Por eso no hace falta explicarle nada más. También funcionan en Gemini, Claude y otras IA de chat.</p>
  </div>
  <div class="caja aviso">
    <h3>Ojo</h3>
    <p>La IA se puede equivocar. Chequeá lo importante, sobre todo si es de salud, plata o temas legales.</p>
  </div>
  ${pie(2)}
</section>`;

const indice = `
<section class="pagina indice">
  <h2>Qué vas a encontrar</h2>
  <ul>
    ${categorias
      .map((c, i) => {
        const desde = i * 10 + 1;
        return `
    <li><a href="#cat-${i + 1}">
      <span class="emoji">${c.emoji}</span>
      <span class="nombre"><strong>${esc(c.titulo)}</strong><small>Códigos ${desde} al ${desde + c.codigos.length - 1}</small></span>
      <span class="pag">pág. ${paginaDeCategoria(i)}</span>
    </a></li>`;
      })
      .join('')}
  </ul>
  ${pie(3)}
</section>`;

let numero = 0;
const paginasDeCategorias = categorias
  .map((c, i) => {
    const partes = [];
    for (let k = 0; k < c.codigos.length; k += POR_PAGINA) partes.push(c.codigos.slice(k, k + POR_PAGINA));
    return partes
      .map((codigos, p) => {
        const pagina = paginaDeCategoria(i) + p;
        const tarjetas = codigos
          .map((x) => {
            numero += 1;
            return `
    <article class="tarjeta">
      <div class="titulo-codigo"><span class="num">${dosDigitos(numero)}</span>${chip(x.codigo)}${x.imagen ? '<span class="insignia">IMAGEN</span>' : ''}</div>
      <p class="que">${esc(x.que)}</p>
      <div class="ejemplo">${ejemploHtml(x.ejemplo)}</div>
    </article>`;
          })
          .join('');
        return `
<section class="pagina categoria"${p === 0 ? ` id="cat-${i + 1}"` : ''}>
  <header class="cabecera">
    <div class="sobre"><span class="emoji">${c.emoji}</span>Categoría ${dosDigitos(i + 1)} · ${p + 1} de ${partes.length}</div>
    <h2>${esc(c.titulo)}</h2>
    <p>${esc(c.subtitulo)}</p>
  </header>
  <div class="tarjetas">${tarjetas}
  </div>
  ${pie(pagina)}
</section>`;
      })
      .join('');
  })
  .join('');

const cierre = `
<section class="pagina oscura cierre">
  <div class="cien chico">¿Te sirvió?</div>
  <p class="grande">Mandáselo a alguien que esté estudiando 📲</p>
  <p class="bajada">Y seguime para más códigos como estos.</p>
  <div class="muestra">
    <p>Para empezar ya, probá este:</p>
    <div class="muestra-chat">${chip('COMO-SI-TUVIERA-5')} lo que estés estudiando hoy</div>
  </div>
</section>`;

const css = `
@page { size: 1080px 1920px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --tinta: #14141A; --papel: #FAF8F4; --gris: #6B6B76; --linea: #E4DED3;
  --amarillo: #FFD23F; --caja: #F0ECE4; --rojo: #C2410C;
}
html, body { background: var(--papel); }
body { font-family: 'Inter', sans-serif; color: var(--tinta); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.pagina { width: 1080px; height: 1920px; padding: 120px 84px 80px; position: relative; overflow: hidden; display: flex; flex-direction: column; break-after: page; }
.pagina:last-child { break-after: auto; }
.oscura { background: var(--tinta); color: #fff; }
.pie { position: absolute; left: 84px; right: 84px; bottom: 56px; display: flex; justify-content: space-between; font-size: 24px; font-weight: 600; color: var(--gris); }
.chip { display: inline-block; background: var(--tinta); color: var(--amarillo); font-family: 'DejaVu Sans Mono', monospace; font-weight: 700; font-size: 36px; line-height: 1; padding: 14px 22px; border-radius: 14px; letter-spacing: -0.5px; }
.insignia { display: inline-block; border: 3px solid var(--tinta); background: var(--amarillo); color: var(--tinta); font-size: 20px; font-weight: 800; letter-spacing: 2px; padding: 6px 12px; border-radius: 10px; vertical-align: middle; }

/* Portada y cierre */
.portada, .cierre { justify-content: center; padding-top: 140px; }
.etiqueta { align-self: flex-start; border: 3px solid var(--amarillo); color: var(--amarillo); font-weight: 800; letter-spacing: 6px; font-size: 28px; padding: 12px 24px; border-radius: 999px; }
.cien { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 900; color: var(--amarillo); font-size: 500px; line-height: 0.9; letter-spacing: -24px; margin: 60px 0 10px -20px; }
.cien.chico { font-size: 150px; letter-spacing: -4px; margin: 0 0 40px; line-height: 1; }
.portada h1 { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 900; font-size: 116px; line-height: 1; letter-spacing: -3px; }
.bajada { font-size: 46px; font-weight: 500; color: #C9C9D1; margin-top: 28px; line-height: 1.25; }
.grande { font-family: 'Inter Display', 'Inter', sans-serif; font-size: 76px; font-weight: 800; line-height: 1.1; letter-spacing: -1px; }
.muestra { margin-top: auto; margin-bottom: 120px; }
.muestra-chat { background: #24242D; border-radius: 28px; padding: 30px 32px; font-family: 'DejaVu Sans Mono', monospace; font-size: 32px; color: #fff; line-height: 1.5; }
.muestra-chat .chip { background: var(--amarillo); color: var(--tinta); font-size: 32px; margin-right: 8px; }
.muestra p { font-size: 34px; color: #C9C9D1; margin-top: 22px; font-weight: 500; }
.cierre .muestra { margin: 160px 0 0; }
.cierre .muestra p { margin: 0 0 22px; }
.guardalo { position: absolute; left: 84px; bottom: 64px; font-size: 30px; font-weight: 700; color: var(--amarillo); }

/* Cómo se usan */
h2 { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 900; font-size: 92px; line-height: 1; letter-spacing: -2px; }
.como h2, .indice h2 { margin-bottom: 56px; }
.pasos { list-style: none; counter-reset: paso; display: flex; flex-direction: column; gap: 34px; }
.pasos li { counter-increment: paso; position: relative; padding-left: 92px; }
.pasos li::before { content: counter(paso); position: absolute; left: 0; top: -4px; width: 64px; height: 64px; border-radius: 50%; background: var(--amarillo); font-weight: 900; font-size: 36px; display: flex; align-items: center; justify-content: center; }
.pasos h3 { font-size: 40px; font-weight: 800; line-height: 1.2; margin-bottom: 14px; }
.pasos p { font-size: 34px; line-height: 1.35; color: #33333C; }
.caja { background: var(--caja); border-radius: 28px; padding: 30px 36px; margin-top: 34px; }
.caja h3 { font-size: 36px; font-weight: 800; margin-bottom: 10px; }
.caja p { font-size: 32px; line-height: 1.4; color: #33333C; }
.caja.aviso { background: #FFF1E6; }
.caja.aviso h3 { color: var(--rojo); }

/* Índice */
.indice ul { list-style: none; display: flex; flex-direction: column; }
.indice a { display: flex; align-items: center; gap: 28px; padding: 27px 0; border-bottom: 3px solid var(--linea); color: inherit; text-decoration: none; }
.indice .emoji { font-size: 56px; width: 72px; text-align: center; }
.indice .nombre { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.indice strong { font-size: 42px; font-weight: 800; line-height: 1.15; }
.indice small { font-size: 28px; color: var(--gris); font-weight: 600; }
.indice .pag { font-size: 30px; font-weight: 800; background: var(--amarillo); padding: 10px 18px; border-radius: 12px; white-space: nowrap; }

/* Categorías */
.categoria { padding-top: 96px; }
.cabecera { margin-bottom: 30px; }
.cabecera .sobre { display: flex; align-items: center; gap: 14px; font-size: 26px; font-weight: 700; color: var(--gris); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 14px; }
.cabecera .emoji { font-size: 40px; letter-spacing: 0; }
.cabecera h2 { font-size: 76px; }
.cabecera p { font-size: 32px; color: var(--gris); font-weight: 600; margin-top: 10px; }
.tarjetas { display: flex; flex-direction: column; gap: 22px; }
.tarjeta { padding-bottom: 22px; border-bottom: 3px solid var(--linea); }
.tarjeta:last-child { border-bottom: none; padding-bottom: 0; }
.num { font-family: 'Inter Display', 'Inter', sans-serif; font-weight: 900; font-size: 36px; color: #BDB6A8; margin-right: 4px; }
.titulo-codigo { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 12px; }
.que { font-size: 32px; line-height: 1.3; font-weight: 500; color: #26262E; margin-bottom: 12px; }
.ejemplo { background: var(--caja); border-radius: 16px; padding: 14px 22px; font-family: 'DejaVu Sans Mono', monospace; font-size: 26px; line-height: 1.45; color: #33333C; }
.ejemplo b { color: var(--tinta); }
.relleno { color: var(--gris); font-style: italic; }
`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>100 códigos de ChatGPT</title><style>${css}</style></head>
<body>${portada}${comoSeUsan}${indice}${paginasDeCategorias}${cierre}</body></html>`;

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1080, height: 1920 } });
  await pagina.setContent(html, { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);

  // Nada puede quedar cortado: cada página tiene que entrar en 1920 px.
  const desbordes = await pagina.evaluate(() =>
    [...document.querySelectorAll('.pagina')]
      .map((el, i) => {
        const pie = el.querySelector('.pie');
        const limite = pie ? pie.getBoundingClientRect().top - 16 : el.getBoundingClientRect().bottom;
        const ultimo = [...el.querySelectorAll('.tarjeta, .caja, .indice li, .pasos li, .muestra')].pop();
        const fondo = ultimo ? ultimo.getBoundingClientRect().bottom : 0;
        return { pagina: i + 1, sobra: Math.round(limite - fondo), alto: el.scrollHeight };
      })
      .filter((p) => p.sobra < 0 || p.alto > 1920)
  );
  if (desbordes.length) {
    console.error('Páginas que no entran:', desbordes);
    process.exitCode = 1;
  }

  await pagina.pdf({ path: SALIDA, width: '1080px', height: '1920px', printBackground: true, preferCSSPageSize: true });
  await navegador.close();
  console.log(`Listo: ${SALIDA}`);
})();
