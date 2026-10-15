# Edición: "Qué es un agente de IA, explicado para mi vieja"

Instrucciones para la IA que edita el video. Guion: [guion.md](guion.md)

Recibís un solo video crudo: una persona en plano frontal diciendo el guion entero. Tu trabajo es limpiarlo y armar el reel: por momentos se ve solo la cara, y cuando habla de cada cosa aparecen animaciones simples que la muestran.

**Cómo leer este archivo:** los segmentos (sección 7) no tienen tiempos fijos, porque dependen del crudo. Cada uno arranca con una frase y cada animación se dispara con una palabra (*"En «palabra»"*). Ubicá esas palabras en la transcripción y sincronizá ahí.

---

## 1. Qué entregás

- `final.mp4`: 1080×1920, 30 fps, H.264, audio AAC 48 kHz. Entre 45 y 60 s.
- `subtitulos.srt`: los subtítulos con los textos corregidos (sección 5).
- `portada.jpg`: 1080×1920, sacada del segmento 1 (ver ahí).
- `informe.md`: qué toma usaste de cada frase, en qué segundo arranca cada segmento y cualquier problema (frases que faltan, palabras que no encontraste).

---

## 2. Limpieza del crudo

1. **Transcribí** con tiempos por palabra.
2. **Ubicá cada frase** del guion en la transcripción. Buscala por sentido, no palabra por palabra: puede haber cambiado alguna.
3. **Si una frase está más de una vez,** quedate con la última que esté completa y sin errores.
4. **Sacá:** silencios de más de 0,25 s (dejá 0,1 s de aire), muletillas sueltas ("eh", "este", "o sea"), respiraciones fuertes, y todo lo que haya antes de la primera palabra y después de la última.
5. **Nunca cortes en medio de una palabra.**
6. **Si el crudo es horizontal,** recortalo a 9:16 centrado en la cara.
7. **Color:** solo corrección suave (balance de blancos neutro, un poco de contraste). Sin filtros.
8. **Si falta una frase, no la inventes** ni la generes con voz artificial: avisá en el informe.

---

## 3. Audio

- **Voz:** reducción de ruido suave, cortá lo que esté debajo de 80 Hz, compresión leve. Normalizá a -14 LUFS integrados, con picos de -1 dBTP como máximo.
- **Música:** instrumental, sin letra, alegre y tranquila (lo-fi o pop suave, 95–110 BPM). Unos -26 dB debajo de la voz: tiene que escucharse, pero nunca taparla. Arranca con la primera palabra, sin fade-in, y se corta limpia al final.
- **Efectos de sonido:** siempre más bajos que la voz. En los segmentos aparecen con estos nombres:

| Nombre | Sonido | Cuándo |
|---|---|---|
| `pop` | Pop corto y suave | Aparece un texto o una tarjeta |
| `whoosh` | Barrido de aire | Entra o sale una animación de pantalla completa |
| `tecleo` | Teclado rápido | Un texto que se escribe solo |
| `enviado` | El "fiu" de un mensaje enviado | Se manda el mail |
| `ding` | Campanita positiva | Aparece un ✅ |
| `error` | Buzzer corto y grave | Aparece un ❌ |
| `caja` | Caja registradora | Precio de Dots |

---

## 4. Estilo visual

### Colores

| Uso | Color |
|---|---|
| Fondo de las animaciones | `#0E1116` |
| Texto | `#FFFFFF` |
| Acento principal (celeste de la bandera) | `#74ACDF` |
| Resaltado (amarillo del sol de la bandera) | `#F6B40E` |
| Sí / recomendado | `#22C55E` |
| No / error | `#EF4444` |
| Tarjeta de Muse | `#C4B5FD` (lavanda), texto negro |
| Tarjeta de Dots | Degradé `#6D28D9` → `#DB2777`, texto blanco |
| Tarjeta de Grok Bot | `#000000` con borde `#FFFFFF` de 4 px, texto blanco |
| Burbujas de chat | `#2FB67C` |

### Tipografía e íconos

- **Títulos y subtítulos:** Montserrat ExtraBold.
- **Texto chico dentro de las animaciones:** Inter SemiBold.
- **Íconos:** emojis (Apple o Noto Color Emoji).
- **Logos:** no uses logos oficiales. Cada sistema es una **tarjeta con nombre**: un rectángulo redondeado (radio 32 px) en el color de la tabla, con el nombre grande y debajo, más chico, "de Meta" o "de ChatGPT".
- **No uses el logo ni la interfaz de WhatsApp.** Cuando se nombra, alcanza con un chat genérico con burbujas verdes.

### Movimiento

- **Entradas:** 8–12 frames, con un rebote leve al final.
- **Salidas:** 6 frames.
- **Transiciones:** cortes secos entre tomas de la cara. Para entrar o salir de una animación de pantalla completa, deslizamiento rápido con `whoosh`. Nada de fundidos largos.
- **Si una animación tarda más que la frase, acortala.** Nunca puede quedar atrasada respecto de la voz.

### Zonas seguras de Instagram

Arriba, abajo y a la derecha, la interfaz de Instagram tapa el video. Ningún texto, tarjeta ni animación importante puede ir:

- arriba de y = 220,
- debajo de y = 1480,
- a la derecha de x = 920.

---

## 5. Subtítulos

- **Siempre visibles,** también sobre las animaciones. Mucha gente mira sin sonido.
- **De a 1 a 3 palabras,** apareciendo junto con la voz.
- **Formato:** Montserrat ExtraBold de 72 px, en blanco con borde negro de 6 px, en minúscula normal (no todo en mayúscula).
- **Posición:** centrados, con la línea en y ≈ 1380. Nunca tapan la boca ni el texto de una animación. Si chocan, subilos o bajalos un poco dentro de la zona segura.
- **Palabras clave en celeste `#74ACDF`:** agente, por vos, secretario, PDF, mails, enviar, todos los lunes, una hora, WhatsApp, te pregunta, Argentina, Muse, Dots, Grok Bot, celular, tu vieja.
- **Precios en amarillo `#F6B40E`:** 100 dólares, 30 dólares.
- **Números en cifras:** "cien dólares" se escribe "100 dólares" y "treinta dólares" se escribe "30 dólares".

### Cómo se escriben los nombres

La transcripción automática los va a escribir mal. Corregilos siempre:

| Se escribe | La transcripción puede poner |
|---|---|
| ChatGPT | Chat GPT, chat yipití |
| Muse | Mius, Miuz, Mews, News |
| Dots | Dats, Dos, Dox |
| Grok Bot | Grokbot, Grock Bot, Rock Bot, Groc Bot |
| PDF | pe de efe |
| WhatsApp | wasap, guasap |

---

## 6. Modos de pantalla

| Modo | Qué se ve |
|---|---|
| `CARA` | La cara a pantalla completa. |
| `CARA+TEXTO` | La cara a pantalla completa con un texto grande en el tercio de arriba (entre y = 260 e y = 640). |
| `DIVIDIDA` | Arriba, la animación (1080×960, de y = 0 a y = 960). Abajo, la cara (1080×960, recortada para que los ojos queden en y ≈ 1180). El contenido de la mitad de arriba igual empieza debajo de y = 220. |
| `ANIMACIÓN` | La animación a pantalla completa. La voz sigue. |

**Reglas para la cara:**

- **Encuadres:** alterná entre *normal* (100 %) y *cerrado* (118 %, centrado en los ojos) cada vez que cambia la frase. Eso esconde los cortes.
- **Ningún plano igual más de 3 s seguidos.** Si un tramo dura más, cambiá el encuadre.
- **Zoom de énfasis:** 100 % → 110 % en 4 frames, en las palabras que se indican abajo.

---

## 7. Segmentos

Van en este orden. Las frases están tal como figuran en el guion.

### S1 · Gancho

> "Te explico qué es un agente de inteligencia artificial como se lo explicaría a mi vieja."

- **Modo:** `CARA+TEXTO`, encuadre normal.
- **Desde el primer frame,** sin animación de entrada: "¿Qué es un agente de IA?" en blanco, con "agente de IA" en celeste. El primer frame ya tiene que tener texto, porque es lo que frena a la gente que está pasando videos.
- **En «mi vieja»:** debajo del título aparece un cartel tipo sticker, amarillo `#F6B40E` con texto negro, girado -4°: "explicado para mi vieja 👵". Zoom de énfasis. `pop`.
- **Portada:** un frame de este segmento con los dos textos visibles y la cara bien (ojos abiertos, boca cerrada o sonriendo).

### S2 · Qué es un agente

> "ChatGPT te dice cómo hacer las cosas. Un agente las hace por vos. Es como tener un secretario en el celular."

**Parte A**, desde "ChatGPT te dice…" hasta "…las hace por vos.": modo `DIVIDIDA`.

- Arriba, sobre fondo `#0E1116`, van dos celulares simples lado a lado: rectángulos redondeados de 380×720 con borde gris `#3A3F4B`.
- **En «ChatGPT»:** entra el celular de la izquierda, con la etiqueta "ChatGPT" arriba.
  - Adentro, una burbuja del usuario: "Mandale un mail a mi jefe".
  - Después, una respuesta larga que se escribe sola: "1. Abrí tu mail / 2. Tocá Redactar / 3. Escribí esto: … / 4. Copiá y pegá / 5. Apretá enviar". `tecleo`.
  - Debajo del celular: "TE DICE CÓMO", en blanco.
- **En «agente»:** entra el celular de la derecha, con la etiqueta "AGENTE" en celeste.
  - Adentro, la misma burbuja del usuario: "Mandale un mail a mi jefe".
  - La respuesta es corta: "✉️ Listo, ya lo escribí. ¿Lo mando?". `ding`.
  - Debajo del celular: "LO HACE POR VOS", en celeste.
  - El celular de la izquierda baja al 40 % de opacidad.

**Parte B**, "Es como tener un secretario en el celular.": modo `CARA+TEXTO`, encuadre cerrado.

- **En «secretario»:** texto arriba: "= un secretario en tu celular 📱", con "secretario" en amarillo. `pop`.

### S3 · Para qué sirve

> "Le pasás ese PDF eterno del banco y te dice lo importante. Te escribe los mails, y vos solo apretás enviar. Y si le pedís algo para todos los lunes, lo hace solo."

- **Modo:** `ANIMACIÓN`. Son tres escenas seguidas, una por frase.
- **Entrada y pases:** entra desde la cara con `whoosh`, y cada escena nueva entra deslizándose desde la derecha.
- **Etiqueta fija:** arriba de todo, en y ≈ 300, va la etiqueta de la escena actual.

**Escena 1**, "Le pasás ese PDF eterno del banco y te dice lo importante.":

- **Etiqueta:** "📄 TE RESUME".
- **En «PDF»:** aparece una hoja blanca con un ícono rojo de PDF y renglones grises.
- **En «eterno»:** la hoja se estira hacia abajo y pasan muchas páginas rápido. Arriba, un contador sube rápido hasta "pág. 47 de 47". Es el chiste visual de lo largo que es.
- **En «lo importante»:** la hoja se comprime (`whoosh`) en una tarjeta blanca con tres renglones que aparecen de a uno (`pop` cada uno):
  - "📅 Cuándo vence"
  - "💸 Cuánto pagás"
  - "⚠️ La letra chica"

**Escena 2**, "Te escribe los mails, y vos solo apretás enviar.":

- **Etiqueta:** "✉️ TE ESCRIBE".
- **En «escribe»:** aparece una ventana de mail con "Para: Jefe". El cuerpo se escribe solo: "Hola, mañana llego un poco más tarde porque tengo turno con el médico. ¡Gracias!". `tecleo`.
- **En «apretás enviar»:** un dedo 👆 toca el botón celeste "Enviar", el botón se hunde y aparece "Enviado ✓" en verde. `enviado`.

**Escena 3**, "Y si le pedís algo para todos los lunes, lo hace solo.":

- **Etiqueta:** "🔁 LO REPITE SOLO".
- **En «todos los lunes»:** aparece el calendario de un mes, con la columna de los lunes resaltada en celeste.
- **En «lo hace solo»:** aparece un ✅ verde en cada lunes, uno atrás del otro y rápido, de arriba hacia abajo. Va un `ding` en cada uno, cada vez un poco más agudo.

### S4 · Te ahorra tiempo

> "Lo que a vos te lleva una hora, lo hace mientras vos hacés otra cosa."

- **Modo:** `CARA+TEXTO`, encuadre normal.
- **En «una hora»:** arriba aparece "⏱️ 1 hora", en blanco. Zoom de énfasis. `pop`.
- **En «otra cosa»:** una línea roja tacha "1 hora", y debajo aparece "🧉 y vos, tomando mate", en amarillo. `pop`.

### S5 · Es fácil

> "¿Es difícil? Para nada. Le escribís o le hablás, como en WhatsApp. Y antes de mandar o pagar algo, te pregunta."

**Parte A**, "¿Es difícil? Para nada.": modo `CARA+TEXTO`.

- **En «difícil»:** texto "¿Es difícil? 🤔".
- **En «Para nada»:** el texto cambia a "PARA NADA", en verde. Zoom de énfasis fuerte (100 % → 120 %) y una sacudida corta de 3 frames. `pop`.

**Parte B**, "Le escribís o le hablás, como en WhatsApp.": modo `DIVIDIDA`.

- Arriba va una pantalla de chat genérica: fondo oscuro, burbujas verdes `#2FB67C` del lado derecho. Tiene que parecer un chat, no ser WhatsApp.
- **En «escribís»:** aparece una burbuja de texto: "Resumime este PDF 🙏". `tecleo` corto.
- **En «hablás»:** debajo aparece una burbuja de audio, con la onda de sonido y "0:04". `pop`.

**Parte C**, "Y antes de mandar o pagar algo, te pregunta.": sigue en `DIVIDIDA`.

- **En «mandar»:** sobre el chat aparece una ventana de confirmación centrada: "¿Mando el mail?", con dos botones, "Sí" en verde y "No" en gris.
- **En «te pregunta»:** encima de la ventana aparece "🛑 Siempre te pregunta primero", en amarillo. `ding`.

### S6 · ¿Cuál uso en Argentina?

> "¿Y cuál uso en Argentina? Muse, el de Meta, todavía no llegó. El de ChatGPT se llama Dots, pero necesitás el plan de cien dólares por mes. El que más te conviene es Grok Bot: treinta dólares por mes, y lo usás desde el celular."

**Parte A**, "¿Y cuál uso en Argentina?": modo `CARA+TEXTO`, encuadre cerrado.

- **En «Argentina»:** texto "¿Cuál uso en Argentina? 🇦🇷", con "Argentina" en celeste. Debajo, una franja fina celeste, blanca y celeste. `pop`.

**Parte B**, "Muse, el de Meta, todavía no llegó.": modo `ANIMACIÓN`, entra con `whoosh`.

- **En «Muse»:** entra arriba la tarjeta de Muse, en lavanda, con "Muse" y debajo "de Meta". `pop`.
- **Debajo, el mapa:** un mapa simple de América, solo siluetas en gris oscuro `#2A2F3A`. Estados Unidos y Canadá se iluminan en lavanda, con la etiqueta "Solo acá".
- **En «todavía no llegó»:** una línea punteada sale de Estados Unidos hacia el sur y se corta a mitad de camino. Argentina titila en rojo, con "❌ Todavía no llegó". `error`.
- **Si no podés hacer el mapa:** dejá solo la tarjeta de Muse con un sello rojo encima, girado: "NO ESTÁ EN ARGENTINA".

**Parte C**, "El de ChatGPT se llama Dots, pero necesitás el plan de cien dólares por mes.": sigue en `ANIMACIÓN`.

- **Al empezar la frase:** la tarjeta de Muse se achica y se va arriba a la izquierda, al 50 % de opacidad y con un ❌ chico.
- **En «Dots»:** entra la tarjeta de Dots (degradé violeta a magenta), con "Dots" y debajo "de ChatGPT". `pop`.
- **En «cien dólares»:** cae una etiqueta de precio con un contador que va rápido de 0 a "USD 100 / mes", y vuelan billetes 💸. Debajo, en chico y gris: "solo con el plan Pro". `caja`.

**Parte D**, "El que más te conviene es Grok Bot: treinta dólares por mes, y lo usás desde el celular.": modo `DIVIDIDA`.

La recomendación tiene que salir con la cara a la vista, porque eso le da confianza.

- **Arriba:** las tres tarjetas en fila. Muse (con ❌) y Dots (con 💸) van chicas y al 40 % de opacidad, y Grok Bot va más grande, en el centro.
- **En «Grok Bot»:** la tarjeta de Grok Bot crece al 110 %, con un borde verde que brilla y un ✅. `ding`.
- **En «treinta dólares»:** debajo de la tarjeta aparece "USD 30 / mes" en verde y, más chico y en gris, "+ impuestos". Al lado, dos barras horizontales comparan precios: Dots, larga y violeta, con "100"; Grok Bot, corta y verde, con "30". `pop`.
- **En «celular»:** al lado del precio rebota un 📱.

### S7 · Cierre

> "Mandáselo a tu vieja, o a alguien que todavía hace todo a mano."

- **Modo:** `CARA+TEXTO`, encuadre cerrado.
- **En «Mandáselo»:**
  - Texto "Mandáselo a tu vieja 📲", con "tu vieja" en amarillo. `pop`.
  - Una flecha blanca animada sale de x ≈ 760, y ≈ 1300 y apunta abajo a la derecha, hacia el botón de compartir de Instagram.
- **En «a mano»:** debajo aparece, más chico: "o a quien todavía hace todo a mano ✍️".
- **Final:** cortá en seco 0,3 s después de la última palabra. No pongas pantalla final ni logo: así el video vuelve a empezar solo y mucha gente lo ve dos veces.

---

## 8. Control antes de entregar

- [ ] Dura entre 45 y 60 s.
- [ ] El primer frame ya tiene texto.
- [ ] Están todas las frases del guion, en orden y sin repetir.
- [ ] Los nombres están bien escritos: ChatGPT, Muse, Dots, Grok Bot.
- [ ] Cada animación aparece con su palabra, con no más de 0,2 s de diferencia.
- [ ] Ningún plano queda igual más de 3 s.
- [ ] No hay nada importante fuera de la zona segura.
- [ ] Los subtítulos no tapan la boca ni el texto de las animaciones.
- [ ] La música nunca tapa la voz.
- [ ] Los precios dicen "USD 100 / mes" (Dots) y "USD 30 / mes + impuestos" (Grok Bot).
- [ ] No aparece ningún logo oficial ni la interfaz de WhatsApp.
