/* ============ Hot Dog Hustle — SVG Art Module ============ */
"use strict";

const OUT = "#1c1c1c";

/* ---------- color helpers ---------- */
function lighterShade(hex, pct) {
  pct = pct === undefined ? 0.3 : pct;
  const n = parseInt(hex.replace('#',''), 16);
  const lerp = function(c){ return Math.min(255, Math.round(c + (255 - c) * pct)); };
  const r = lerp(n >> 16), g = lerp((n >> 8) & 255), b = lerp(n & 255);
  return '#' + [r, g, b].map(function(x){ return x.toString(16).padStart(2,'0'); }).join('');
}
function darkerShade(hex, pct) {
  pct = pct === undefined ? 0.25 : pct;
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.round((n >> 16) * (1-pct)), g = Math.round(((n>>8)&255)*(1-pct)), b = Math.round((n&255)*(1-pct));
  return '#' + [r, g, b].map(function(x){ return x.toString(16).padStart(2,'0'); }).join('');
}

/* ---------- customer variants ---------- */
const CUSTOMER_VARIANTS = [
  { skin: "#f0c08c", shirt: "#f5e642", hair: "blackSide" },
  { skin: "#ffd9a8", shirt: "#3f7de0", hair: "spikyBlond" },
  { skin: "#e8b078", shirt: "#cc2b2b", hair: "curlyBrown" },
  { skin: "#d99c66", shirt: "#2e9e4f", hair: "greenCap" },
  { skin: "#f3c9a0", shirt: "#9b3fd6", hair: "womanCurls" },
  { skin: "#e0a877", shirt: "#e07820", hair: "baldMustache" },
];

/* ---------- gradient defs ---------- */
function customerGradDefs() {
  const customerGrads = CUSTOMER_VARIANTS.map(function(v, i){
    const sl = lighterShade(v.skin, 0.34), sd = darkerShade(v.skin, 0.14);
    const shtl = lighterShade(v.shirt, 0.38), shtd = darkerShade(v.shirt, 0.24);
    return `
    <radialGradient id="sk${i}" cx="0.42" cy="0.34" r="0.72" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${sl}"/>
      <stop offset="52%" stop-color="${v.skin}"/>
      <stop offset="100%" stop-color="${sd}"/>
    </radialGradient>
    <linearGradient id="sh${i}" x1="0.22" y1="0" x2="0.78" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${shtl}"/>
      <stop offset="100%" stop-color="${shtd}"/>
    </linearGradient>`;
  }).join('');

  return customerGrads + `
    <linearGradient id="eyeW" x1="0.3" y1="0.2" x2="0.8" y2="0.9" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eee8e2"/>
    </linearGradient>
    <radialGradient id="handGrad" cx="0.38" cy="0.3" r="0.72" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#f4b87e"/>
      <stop offset="60%" stop-color="#e8a86c"/>
      <stop offset="100%" stop-color="#c88848"/>
    </radialGradient>
    <linearGradient id="bunTopGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#f8d078"/>
      <stop offset="45%" stop-color="#e8b258"/>
      <stop offset="100%" stop-color="#c07828"/>
    </linearGradient>
    <linearGradient id="bunBotGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#f0c468"/>
      <stop offset="100%" stop-color="#c88838"/>
    </linearGradient>
    <linearGradient id="pretzelTopGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#c8882a"/>
      <stop offset="45%" stop-color="#a06020"/>
      <stop offset="100%" stop-color="#784010"/>
    </linearGradient>
    <linearGradient id="pretzelBotGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#b87828"/>
      <stop offset="100%" stop-color="#8a5018"/>
    </linearGradient>
    <linearGradient id="sausGrad" x1="0" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#6a2410"/>
      <stop offset="28%" stop-color="#c05030"/>
      <stop offset="50%" stop-color="#d87040"/>
      <stop offset="72%" stop-color="#c05030"/>
      <stop offset="100%" stop-color="#6a2410"/>
    </linearGradient>
    <linearGradient id="veganSausGrad" x1="0" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#3a6a20"/>
      <stop offset="28%" stop-color="#78a848"/>
      <stop offset="50%" stop-color="#90c060"/>
      <stop offset="72%" stop-color="#78a848"/>
      <stop offset="100%" stop-color="#3a6a20"/>
    </linearGradient>
    <linearGradient id="mustGrad" x1="0" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#c89000"/>
      <stop offset="35%" stop-color="#f8d020"/>
      <stop offset="100%" stop-color="#b88000"/>
    </linearGradient>
    <linearGradient id="ketchGrad" x1="0" y1="0.5" x2="1" y2="0.5" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#a01e18"/>
      <stop offset="35%" stop-color="#e84030"/>
      <stop offset="100%" stop-color="#901818"/>
    </linearGradient>
    <linearGradient id="krautGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#f4f0c4"/>
      <stop offset="100%" stop-color="#d0cc7a"/>
    </linearGradient>
    <linearGradient id="grillGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#3a3a3a"/>
      <stop offset="100%" stop-color="#181818"/>
    </linearGradient>
    <linearGradient id="counterGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#c8c8c0"/>
      <stop offset="100%" stop-color="#a0a098"/>
    </linearGradient>
    <linearGradient id="woodGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#b87c44"/>
      <stop offset="100%" stop-color="#7a4c22"/>
    </linearGradient>
    <radialGradient id="vendorSkin" cx="0.42" cy="0.35" r="0.72" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#f4c490"/>
      <stop offset="55%" stop-color="#d8a273"/>
      <stop offset="100%" stop-color="#b8824e"/>
    </radialGradient>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#5ba8e8"/>
      <stop offset="100%" stop-color="#a8d8f8"/>
    </linearGradient>
    <linearGradient id="toasterGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#e8e8e8"/>
      <stop offset="100%" stop-color="#a8a8a8"/>
    </linearGradient>
    <linearGradient id="friesGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#f8e060"/>
      <stop offset="100%" stop-color="#d8a020"/>
    </linearGradient>
    <linearGradient id="sodaFridgeGrad" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#6090d8"/>
      <stop offset="100%" stop-color="#2850a8"/>
    </linearGradient>`;
}

/* ---------- hair art ---------- */
function hairArt(style, skin) {
  switch (style) {
    case "blackSide":
      return `
        <path d="M40 78 Q34 22 100 18 Q166 22 160 78 L150 60 Q140 34 100 36 Q70 36 58 52 L52 84 Z" fill="#181818" stroke="${OUT}" stroke-width="3"/>
        <path d="M86 24 L96 40" stroke="#d0d0d0" stroke-width="4" stroke-linecap="round"/>
        <path d="M58 50 Q78 28 114 26" stroke="rgba(70,70,70,0.7)" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M60 48 Q80 27 112 26" stroke="rgba(255,255,255,0.2)" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    case "spikyBlond":
      return `
        <path d="M42 78 Q38 34 100 30 Q162 34 158 78 L150 64 Q140 42 100 44 Q60 42 50 64 Z" fill="#f2d030" stroke="${OUT}" stroke-width="3"/>
        <path d="M52 46 L46 28 L64 38 L66 18 L82 34 L92 12 L104 32 L118 14 L126 34 L142 22 L144 42 L156 36 L152 56 Q126 38 100 40 Q72 38 50 58 Z" fill="#f2d030" stroke="${OUT}" stroke-width="3"/>
        <path d="M88 14 L92 30 M104 30 L100 14 M118 16 L115 32 M68 22 L65 36" stroke="rgba(255,255,200,0.65)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M68 44 Q90 36 118 40" stroke="rgba(255,255,160,0.45)" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    case "curlyBrown":
      return `
        <g stroke="${OUT}" stroke-width="3" fill="#6b3f1d">
          <circle cx="58" cy="56" r="18"/><circle cx="82" cy="40" r="20"/>
          <circle cx="110" cy="34" r="20"/><circle cx="138" cy="44" r="18"/>
          <circle cx="154" cy="64" r="14"/><circle cx="44" cy="78" r="13"/>
        </g>
        <g fill="rgba(150,84,28,0.6)" stroke="none">
          <circle cx="62" cy="50" r="9"/><circle cx="86" cy="34" r="10"/>
          <circle cx="112" cy="28" r="9"/><circle cx="140" cy="38" r="8"/>
        </g>`;
    case "greenCap":
      return `
        <path d="M42 70 Q40 26 100 24 Q160 26 158 70 L158 78 Q100 60 42 78 Z" fill="#2c8c3c" stroke="${OUT}" stroke-width="3"/>
        <path d="M36 76 Q100 56 164 76 L160 88 Q100 70 40 88 Z" fill="#1f6b2c" stroke="${OUT}" stroke-width="3"/>
        <path d="M50 58 Q80 46 132 50" stroke="rgba(255,255,255,0.22)" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    case "womanCurls":
      return `
        <g stroke="${OUT}" stroke-width="3" fill="#7a3a10">
          <circle cx="46" cy="70" r="17"/><circle cx="40" cy="100" r="15"/><circle cx="44" cy="128" r="14"/>
          <circle cx="154" cy="70" r="17"/><circle cx="160" cy="100" r="15"/><circle cx="156" cy="128" r="14"/>
          <circle cx="64" cy="44" r="19"/><circle cx="96" cy="32" r="21"/><circle cx="130" cy="40" r="19"/>
        </g>
        <g fill="rgba(165,74,22,0.55)" stroke="none">
          <circle cx="50" cy="65" r="8"/><circle cx="68" cy="38" r="10"/>
          <circle cx="98" cy="26" r="10"/><circle cx="133" cy="34" r="8"/>
        </g>`;
    case "baldMustache":
      return `
        <path d="M44 64 Q48 30 100 28 Q152 30 156 64 Q128 46 100 46 Q72 46 44 64Z" fill="${skin}" stroke="${OUT}" stroke-width="3"/>
        <ellipse cx="100" cy="30" rx="28" ry="8" fill="rgba(255,255,255,0.28)"/>`;
    default: return "";
  }
}

/* ---------- customerArt ---------- */
function customerArt(variantIdx, expr) {
  const v = CUSTOMER_VARIANTS[variantIdx];
  const angry = expr === "angry" || expr === "angryblink";
  const blink = expr === "blink" || expr === "angryblink";
  const happy = expr === "happy";
  const i = variantIdx;
  const sd = darkerShade(v.skin, 0.16);
  const sd2 = darkerShade(v.skin, 0.1);

  let eyes;
  if (blink) {
    eyes = `<path d="M62 96 q12 ${angry ? 8 : 4} 24 0 M114 96 q12 ${angry ? 8 : 4} 24 0"
            stroke="${OUT}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  } else {
    const ry = angry ? 7 : 10;
    const lx = angry ? 78 : 74, rx2 = angry ? 122 : 126;
    const irs = angry ? 6 : 8.5;
    eyes = `
      <ellipse cx="74" cy="96" rx="13" ry="${ry}" fill="url(#eyeW)" stroke="${OUT}" stroke-width="2.6"/>
      <circle cx="${lx}" cy="97" r="${irs}" fill="#4a280c"/>
      <circle cx="${lx}" cy="97" r="${angry ? 3.5 : 5.5}" fill="#0a0806"/>
      <ellipse cx="${lx - 2.5}" cy="93.5" rx="2.6" ry="1.8" fill="rgba(255,255,255,0.92)"/>
      <ellipse cx="126" cy="96" rx="13" ry="${ry}" fill="url(#eyeW)" stroke="${OUT}" stroke-width="2.6"/>
      <circle cx="${rx2}" cy="97" r="${irs}" fill="#4a280c"/>
      <circle cx="${rx2}" cy="97" r="${angry ? 3.5 : 5.5}" fill="#0a0806"/>
      <ellipse cx="${rx2 - 2.5}" cy="93.5" rx="2.6" ry="1.8" fill="rgba(255,255,255,0.92)"/>`;
  }

  const brows = angry
    ? `<path d="M56 80 L92 92 M144 80 L108 92" stroke="${OUT}" stroke-width="7.5" stroke-linecap="round"/>
       <path d="M57 81 L90 92 M143 81 L110 92" stroke="#2c1c10" stroke-width="4" stroke-linecap="round"/>`
    : `<path d="M58 80 q16 -10 32 -2 M110 78 q16 -8 32 2" stroke="${OUT}" stroke-width="6.5" fill="none" stroke-linecap="round"/>
       <path d="M59 81 q15 -9 30 -2 M111 79.5 q15 -7.5 30 1.5" stroke="#2c1c10" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;

  let mouth;
  if (happy)
    mouth = `
      <path d="M68 138 Q100 172 132 138 Q100 157 68 138Z" fill="#c23428" stroke="${OUT}" stroke-width="3.5"/>
      <path d="M74 142 Q100 157 126 142 L123 150 Q100 163 77 150Z" fill="#e8e8e0"/>
      <path d="M70 140 Q100 162 130 140" stroke="#e05050" stroke-width="1.8" fill="none"/>`;
  else if (angry)
    mouth = `
      <path d="M70 150 Q100 132 130 150 Q100 144 70 150Z" fill="#c23428" stroke="${OUT}" stroke-width="3.5"/>
      <path d="M78 144 L122 144 L120 149 L80 149Z" fill="#e8e8e0"/>
      <path d="M72 148 Q100 135 128 148" stroke="#d04848" stroke-width="1.6" fill="none"/>`;
  else
    mouth = `
      <path d="M80 146 Q100 155 120 146" stroke="${OUT}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M81 147.5 Q100 154 119 147.5" stroke="#d08888" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;

  const angryMarks = angry
    ? `<g stroke="#cc1f10" stroke-width="5" stroke-linecap="round">
         <path d="M34 50 l14 14 M48 46 l6 18 M28 68 l18 8"/>
         <path d="M166 50 l-14 14 M152 46 l-6 18 M172 68 l-18 8"/>
       </g>
       <path d="M158 108 q6 12 -2 16 q-8 -2 -4 -14z" fill="#7fd4f0" stroke="${OUT}" stroke-width="2"/>`
    : "";

  const cheeks = `
    <circle cx="56" cy="118" r="15" fill="${angry ? '#e04030' : '#ffb8a8'}" opacity="${angry ? .62 : .32}"/>
    <circle cx="144" cy="118" r="15" fill="${angry ? '#e04030' : '#ffb8a8'}" opacity="${angry ? .62 : .32}"/>`;

  const mustache = v.hair === "baldMustache"
    ? `<path d="M66 132 Q100 116 134 132 Q118 140 100 134 Q82 140 66 132Z" fill="#4a300e" stroke="${OUT}" stroke-width="3"/>
       <path d="M76 127 Q100 120 124 127" stroke="rgba(100,60,10,0.45)" stroke-width="2.5" fill="none"/>`
    : "";

  const nose = `
    <path d="M94 108 q-4 16 2 20 q6 4 12 0" fill="none" stroke="${sd}" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="90" cy="128" rx="5.5" ry="3.2" fill="${sd2}" opacity=".45"/>
    <ellipse cx="110" cy="128" rx="5.5" ry="3.2" fill="${sd2}" opacity=".45"/>`;

  const forehead = `<ellipse cx="100" cy="59" rx="40" ry="26" fill="rgba(255,255,255,0.16)" transform="rotate(-4 100 59)"/>`;
  const jawShadow = `<path d="M68 166 Q100 183 132 166 Q100 190 68 166Z" fill="${sd}" opacity=".22"/>`;

  return `<g>
    <path d="M14 240 Q20 184 62 176 L138 176 Q180 184 186 240 Z" fill="url(#sh${i})" stroke="${OUT}" stroke-width="4"/>
    <path d="M84 158 h32 v26 q-16 8 -32 0 Z" fill="url(#sk${i})" stroke="${OUT}" stroke-width="3"/>
    <ellipse cx="42" cy="104" rx="11" ry="14" fill="url(#sk${i})" stroke="${OUT}" stroke-width="3"/>
    <ellipse cx="158" cy="104" rx="11" ry="14" fill="url(#sk${i})" stroke="${OUT}" stroke-width="3"/>
    <path d="M44 96 Q40 30 100 28 Q160 30 156 96 Q158 150 132 166 Q100 180 68 166 Q42 150 44 96Z"
          fill="url(#sk${i})" stroke="${OUT}" stroke-width="4"/>
    ${jawShadow}${cheeks}${nose}${forehead}
    ${eyes}${brows}${mouth}${mustache}
    ${hairArt(v.hair, v.skin)}
    ${angryMarks}
  </g>`;
}

/* ---------- typeBadgeArt ---------- */
function typeBadgeArt(emoji) {
  return `<g>
    <circle cx="20" cy="20" r="22" fill="rgba(0,0,0,0.18)"/>
    <circle cx="20" cy="19" r="22" fill="#fffdf0" stroke="${OUT}" stroke-width="2.5"/>
    <text x="20" y="30" font-size="22" text-anchor="middle">${emoji}</text>
  </g>`;
}

/* ---------- sceneArt ---------- */
function sceneArt() {
  // buildings
  const bcolors = ["#d9c9a8", "#c9b4d4", "#b8cfd9", "#d9b8a8", "#c8d9b4"];
  let buildings = "";
  for (let i = 0; i < 5; i++) {
    const x = i * 200;
    const h = 100 + (i % 3) * 30;
    buildings += `<rect x="${x}" y="${180 - h}" width="195" height="${h}" fill="${bcolors[i]}" stroke="${OUT}" stroke-width="2"/>`;
    for (let w = 0; w < 3; w++) {
      for (let fl = 0; fl < 2; fl++) {
        buildings += `<rect x="${x + 20 + w * 60}" y="${180 - h + 16 + fl * 34}" width="36" height="24" fill="#7fa8c9" stroke="${OUT}" stroke-width="1.5"/>`;
      }
    }
  }

  return `
  <defs>
    ${customerGradDefs()}
    <clipPath id="golanPhotoClip"><rect x="0" y="0" width="76" height="74"/></clipPath>
  </defs>

  <!-- sky -->
  <rect x="0" y="0" width="1000" height="180" fill="url(#skyGrad)"/>
  <!-- sun -->
  <circle cx="920" cy="40" r="34" fill="#ffd030" opacity="0.85"/>
  <circle cx="920" cy="40" r="28" fill="#ffe860"/>
  <!-- buildings -->
  ${buildings}
  <!-- road -->
  <rect x="0" y="150" width="1000" height="32" fill="#888"/>
  <g stroke="#f0f0b0" stroke-width="3" stroke-dasharray="28 20">
    <line x1="0" y1="166" x2="1000" y2="166"/>
  </g>
  <!-- sidewalk -->
  <rect x="0" y="178" width="1000" height="6" fill="#bbb" stroke="${OUT}" stroke-width="2"/>

  <!-- ===== GOLAN PHOTO (left wall) ===== -->
  <g transform="translate(18 14)">
    <rect x="-6" y="-2" width="96" height="90" rx="6" fill="#6e4525" stroke="${OUT}" stroke-width="3.5"/>
    <rect x="2" y="4" width="80" height="78" fill="#fff" stroke="#c8a040" stroke-width="3"/>
    <image href="img/golan.png" x="4" y="6" width="76" height="74" preserveAspectRatio="xMidYMid slice" clip-path="url(#golanPhotoClip)"/>
    <circle cx="-2" cy="2" r="3" fill="#d8b860"/>
    <circle cx="88" cy="2" r="3" fill="#d8b860"/>
    <circle cx="-2" cy="86" r="3" fill="#d8b860"/>
    <circle cx="88" cy="86" r="3" fill="#d8b860"/>
    <text x="42" y="106" font-size="11" text-anchor="middle" fill="#5a3500" font-weight="bold" font-family="Arial">גולן</text>
  </g>

  <!-- ===== GOLAN SIGN ===== -->
  <g id="golanSign">
    <!-- poles -->
    <line x1="460" y1="0" x2="460" y2="60" stroke="#666" stroke-width="6"/>
    <line x1="760" y1="0" x2="760" y2="60" stroke="#666" stroke-width="6"/>
    <!-- main board wood frame -->
    <rect x="418" y="8" width="388" height="164" rx="12" fill="#8a5a33" stroke="${OUT}" stroke-width="5"/>
    <!-- inner yellow board -->
    <rect x="428" y="16" width="368" height="148" rx="8" fill="#f2b21d" stroke="#9c7100" stroke-width="3"/>
    <!-- wood grain lines -->
    <path d="M435 24 Q620 20 790 26" stroke="rgba(150,90,20,0.28)" stroke-width="2.5" fill="none"/>
    <path d="M435 40 Q620 36 790 42" stroke="rgba(150,90,20,0.18)" stroke-width="2" fill="none"/>
    <!-- main Hebrew title -->
    <text x="612" y="90" font-size="38" text-anchor="middle" fill="#b02418" font-weight="bold"
          style="paint-order:stroke" stroke="#fff" stroke-width="2.5" font-family="Arial">הבאסטה של גולן</text>
    <!-- English subtitle -->
    <text x="612" y="138" font-size="20" text-anchor="middle" fill="#7a4010" font-style="italic"
          font-family="Arial">Hot Dog Hustle</text>
    <!-- hotdog emoji decoration -->
    <text x="762" y="78" font-size="28" text-anchor="middle">🌭</text>
    <text x="762" y="115" font-size="28" text-anchor="middle">👑</text>
    <text x="450" y="78" font-size="28" text-anchor="middle">🌭</text>
    <text x="450" y="115" font-size="28" text-anchor="middle">⭐</text>
  </g>

  <!-- customer area background (180-420) -->
  <rect x="0" y="182" width="1000" height="238" fill="#7a9a6a" opacity="0.35"/>
  <!-- pavement -->
  <rect x="0" y="182" width="1000" height="238" fill="#a0b890" opacity="0.3"/>

  <!-- ===== COUNTER FRONT (420-700) ===== -->
  <!-- counter top ledge -->
  <rect x="0" y="418" width="1000" height="22" fill="url(#counterGrad)" stroke="${OUT}" stroke-width="3"/>
  <!-- counter face -->
  <rect x="0" y="436" width="1000" height="264" fill="url(#woodGrad)" stroke="${OUT}" stroke-width="3"/>
  <!-- wood grain lines on counter -->
  <g stroke="rgba(180,120,50,0.25)" stroke-width="2" fill="none">
    <line x1="0" y1="460" x2="1000" y2="460"/>
    <line x1="0" y1="490" x2="1000" y2="490"/>
    <line x1="0" y1="520" x2="1000" y2="520"/>
    <line x1="0" y1="560" x2="1000" y2="560"/>
    <line x1="0" y1="600" x2="1000" y2="600"/>
    <line x1="0" y1="640" x2="1000" y2="640"/>
  </g>

  <!-- ===== VENDOR behind counter ===== -->
  <g id="vendorFig" transform="translate(500 385)">
    <ellipse cx="0" cy="0" rx="62" ry="62" fill="#7a9870" stroke="${OUT}" stroke-width="4"/>
    <image href="img/img_vendor.png" x="-52" y="-58" width="104" height="116" preserveAspectRatio="xMidYMin meet"/>
  </g>

  <!-- ===== GRILL STATION ===== -->
  <g id="st_grill" style="cursor:pointer">
    <!-- grill body -->
    <rect x="36" y="432" width="224" height="96" rx="10" fill="#282828" stroke="${OUT}" stroke-width="4"/>
    <!-- grill top surface -->
    <rect x="44" y="436" width="208" height="68" rx="6" fill="#1e1e1e" stroke="#444" stroke-width="2"/>
    <!-- grill bars (4 slots) -->
    <line x1="44" y1="452" x2="252" y2="452" stroke="#555" stroke-width="3.5"/>
    <line x1="44" y1="463" x2="252" y2="463" stroke="#555" stroke-width="3.5"/>
    <line x1="44" y1="474" x2="252" y2="474" stroke="#555" stroke-width="3.5"/>
    <line x1="44" y1="485" x2="252" y2="485" stroke="#555" stroke-width="3.5"/>
    <line x1="44" y1="496" x2="252" y2="496" stroke="#555" stroke-width="3.5"/>
    <!-- grill heat glow -->
    <rect x="44" y="436" width="208" height="68" rx="6" fill="rgba(255,100,0,0.08)"/>
    <!-- heat shimmer lines -->
    <path d="M80 432 q3 -10 0 -20 M120 432 q3 -10 0 -20 M160 432 q3 -10 0 -20 M200 432 q3 -10 0 -20"
          stroke="#aaa" stroke-width="2.5" fill="none" opacity="0.55"/>
    <!-- grill label -->
    <text x="148" y="545" font-size="13" text-anchor="middle" fill="#ddd" font-weight="bold" font-family="Arial">גריל</text>
    <!-- cooking items container (ui.js populates this) -->
    <g id="grill-items"></g>
  </g>

  <!-- ===== RAW SAUSAGES BOX ===== -->
  <g id="st_rawSausages" style="cursor:pointer" transform="translate(40 545)">
    <!-- box -->
    <rect x="0" y="0" width="110" height="70" rx="6" fill="#c8946a" stroke="${OUT}" stroke-width="3"/>
    <rect x="4" y="4" width="102" height="46" rx="4" fill="#e8a878" stroke="#a06040" stroke-width="2"/>
    <!-- raw sausages inside box -->
    <path d="M12 32 Q30 16 50 28" stroke="${OUT}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M12 32 Q30 16 50 28" stroke="#e89090" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M22 36 Q42 18 62 30" stroke="${OUT}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M22 36 Q42 18 62 30" stroke="#f0a0a0" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M36 40 Q56 20 76 34" stroke="${OUT}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M36 40 Q56 20 76 34" stroke="#e89090" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M56 38 Q76 20 96 34" stroke="${OUT}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M56 38 Q76 20 96 34" stroke="#f0a0a0" stroke-width="7" fill="none" stroke-linecap="round"/>
    <!-- label -->
    <text x="55" y="62" font-size="12" text-anchor="middle" fill="#3a1a08" font-weight="bold" font-family="Arial">נקניקיות</text>
    <text id="stock-sausages" x="95" y="20" font-size="13" text-anchor="middle" fill="#cc2020" font-weight="bold" font-family="Arial"></text>
  </g>

  <!-- ===== TOASTER STATION ===== -->
  <g id="st_toaster" style="cursor:pointer" transform="translate(278 452)">
    <!-- toaster body -->
    <rect x="0" y="0" width="118" height="66" rx="8" fill="url(#toasterGrad)" stroke="${OUT}" stroke-width="3.5"/>
    <!-- shine -->
    <path d="M8 6 Q59 2 110 8" stroke="rgba(255,255,255,0.5)" stroke-width="4" fill="none"/>
    <!-- slots -->
    <rect x="14" y="8" width="36" height="38" rx="4" fill="#2a2a2a" stroke="#666" stroke-width="2"/>
    <rect x="66" y="8" width="36" height="38" rx="4" fill="#2a2a2a" stroke="#666" stroke-width="2"/>
    <!-- slot shine -->
    <path d="M16 10 L18 42" stroke="rgba(255,150,50,0.3)" stroke-width="3" stroke-linecap="round"/>
    <path d="M68 10 L70 42" stroke="rgba(255,150,50,0.3)" stroke-width="3" stroke-linecap="round"/>
    <!-- lever left -->
    <rect x="22" y="44" width="8" height="18" rx="3" fill="#888" stroke="${OUT}" stroke-width="2"/>
    <circle cx="26" cy="60" r="5" fill="#aaa" stroke="${OUT}" stroke-width="2"/>
    <!-- lever right -->
    <rect x="74" y="44" width="8" height="18" rx="3" fill="#888" stroke="${OUT}" stroke-width="2"/>
    <circle cx="78" cy="60" r="5" fill="#aaa" stroke="${OUT}" stroke-width="2"/>
    <!-- label -->
    <text x="59" y="82" font-size="12" text-anchor="middle" fill="#5a3a10" font-weight="bold" font-family="Arial">טוסטר</text>
    <!-- toasting item container (ui.js) -->
    <g id="toaster-item"></g>
  </g>

  <!-- ===== BUNS STACK ===== -->
  <g id="st_buns" style="cursor:pointer" transform="translate(278 530)">
    <!-- bun stack (3 buns) -->
    <!-- bottom bun shadow -->
    <ellipse cx="60" cy="76" rx="54" ry="8" fill="rgba(0,0,0,0.18)"/>
    <!-- bun 3 (bottom) -->
    <path d="M10 70 Q60 58 110 70 Q60 82 10 70Z" fill="url(#bunBotGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <path d="M10 55 Q14 38 60 34 Q106 38 110 55 Q60 46 10 55Z" fill="url(#bunTopGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <!-- seeds on top bun 3 -->
    <ellipse cx="40" cy="44" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8" transform="rotate(-12 40 44)"/>
    <ellipse cx="60" cy="38" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8"/>
    <ellipse cx="80" cy="43" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8" transform="rotate(10 80 43)"/>
    <!-- bun 2 (middle) -->
    <path d="M14 56 Q60 44 106 56 Q60 68 14 56Z" fill="url(#bunBotGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <path d="M14 41 Q18 24 60 20 Q102 24 106 41 Q60 32 14 41Z" fill="url(#bunTopGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <ellipse cx="42" cy="30" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8" transform="rotate(-10 42 30)"/>
    <ellipse cx="62" cy="24" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8"/>
    <ellipse cx="82" cy="30" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8" transform="rotate(12 82 30)"/>
    <!-- bun 1 (top) -->
    <path d="M18 42 Q60 30 102 42 Q60 54 18 42Z" fill="url(#bunBotGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <path d="M18 27 Q22 10 60 6 Q98 10 102 27 Q60 18 18 27Z" fill="url(#bunTopGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <ellipse cx="44" cy="16" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8" transform="rotate(-8 44 16)"/>
    <ellipse cx="62" cy="10" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8"/>
    <ellipse cx="80" cy="16" rx="5" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8" transform="rotate(10 80 16)"/>
    <!-- label -->
    <text x="60" y="92" font-size="12" text-anchor="middle" fill="#8a5a00" font-weight="bold" font-family="Arial">לחמניות</text>
    <text id="stock-buns" x="100" y="14" font-size="13" text-anchor="middle" fill="#cc2020" font-weight="bold" font-family="Arial"></text>
  </g>

  <!-- ===== PRETZEL BUNS STACK ===== -->
  <g id="st_pretzelBuns" style="cursor:pointer" transform="translate(410 540)">
    <!-- shadow -->
    <ellipse cx="50" cy="72" rx="44" ry="7" fill="rgba(0,0,0,0.2)"/>
    <!-- bun 2 (bottom) -->
    <path d="M8 66 Q50 54 92 66 Q50 78 8 66Z" fill="url(#pretzelBotGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <path d="M8 51 Q12 34 50 30 Q88 34 92 51 Q50 42 8 51Z" fill="url(#pretzelTopGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <!-- pretzel cross-hatch marks -->
    <path d="M26 42 l8 -8 M38 36 l8 -8 M50 38 l8 -8 M62 40 l6 -6" stroke="rgba(100,50,10,0.5)" stroke-width="2" fill="none"/>
    <!-- bun 1 (top) -->
    <path d="M12 52 Q50 40 88 52 Q50 64 12 52Z" fill="url(#pretzelBotGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <path d="M12 37 Q16 20 50 16 Q84 20 88 37 Q50 28 12 37Z" fill="url(#pretzelTopGrad)" stroke="${OUT}" stroke-width="2.5"/>
    <path d="M28 28 l8 -8 M40 22 l8 -8 M52 24 l8 -8 M64 26 l6 -6" stroke="rgba(100,50,10,0.5)" stroke-width="2" fill="none"/>
    <!-- salt dots -->
    <circle cx="36" cy="24" r="2.5" fill="rgba(255,255,255,0.7)"/>
    <circle cx="52" cy="20" r="2.5" fill="rgba(255,255,255,0.7)"/>
    <circle cx="68" cy="24" r="2.5" fill="rgba(255,255,255,0.7)"/>
    <!-- label -->
    <text x="50" y="88" font-size="12" text-anchor="middle" fill="#5a2e08" font-weight="bold" font-family="Arial">בייגלה</text>
  </g>

  <!-- ===== VEGAN SAUSAGES BOX ===== -->
  <g id="st_veganSausages" style="cursor:pointer" transform="translate(560 545)">
    <rect x="0" y="0" width="100" height="68" rx="6" fill="#4a7a38" stroke="${OUT}" stroke-width="3"/>
    <rect x="4" y="4" width="92" height="42" rx="4" fill="#5a9848" stroke="#2a5a20" stroke-width="2"/>
    <!-- vegan sausages -->
    <path d="M10 30 Q28 14 46 26" stroke="${OUT}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M10 30 Q28 14 46 26" stroke="#90c060" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M26 34 Q44 16 62 28" stroke="${OUT}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M26 34 Q44 16 62 28" stroke="#a0d070" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M46 36 Q64 18 82 30" stroke="${OUT}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M46 36 Q64 18 82 30" stroke="#90c060" stroke-width="6" fill="none" stroke-linecap="round"/>
    <!-- vegan leaf icon -->
    <text x="82" y="20" font-size="14">🌿</text>
    <text x="50" y="60" font-size="11" text-anchor="middle" fill="#e8f8e0" font-weight="bold" font-family="Arial">טבעוני</text>
  </g>

  <!-- ===== KETCHUP BOTTLE ===== -->
  <g id="st_ketchup" style="cursor:pointer" transform="translate(680 435)">
    <!-- bottle body -->
    <path d="M18 90 Q4 90 4 76 L4 36 Q4 22 12 18 L12 8 Q12 2 18 2 L38 2 Q44 2 44 8 L44 18 Q52 22 52 36 L52 76 Q52 90 38 90 Z"
          fill="url(#ketchGrad)" stroke="${OUT}" stroke-width="3"/>
    <!-- bottle cap -->
    <rect x="14" y="0" width="28" height="10" rx="4" fill="#cc2020" stroke="${OUT}" stroke-width="2"/>
    <!-- label -->
    <rect x="8" y="42" width="40" height="28" rx="3" fill="rgba(255,255,255,0.28)"/>
    <text x="28" y="62" font-size="10" text-anchor="middle" fill="#fff" font-weight="bold" font-family="Arial">KETCHUP</text>
    <!-- shine -->
    <path d="M8 26 Q10 16 18 14" stroke="rgba(255,180,180,0.55)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- floor label -->
    <text x="28" y="108" font-size="12" text-anchor="middle" fill="#8a0000" font-weight="bold" font-family="Arial">קטשופ</text>
  </g>

  <!-- ===== MUSTARD BOTTLE ===== -->
  <g id="st_mustard" style="cursor:pointer" transform="translate(754 435)">
    <path d="M18 90 Q4 90 4 76 L4 36 Q4 22 12 18 L12 8 Q12 2 18 2 L38 2 Q44 2 44 8 L44 18 Q52 22 52 36 L52 76 Q52 90 38 90 Z"
          fill="url(#mustGrad)" stroke="${OUT}" stroke-width="3"/>
    <rect x="14" y="0" width="28" height="10" rx="4" fill="#e8c000" stroke="${OUT}" stroke-width="2"/>
    <rect x="8" y="42" width="40" height="28" rx="3" fill="rgba(255,255,255,0.28)"/>
    <text x="28" y="62" font-size="10" text-anchor="middle" fill="#7a5800" font-weight="bold" font-family="Arial">MUSTARD</text>
    <path d="M8 26 Q10 16 18 14" stroke="rgba(255,255,200,0.55)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <text x="28" y="108" font-size="12" text-anchor="middle" fill="#8a6800" font-weight="bold" font-family="Arial">חרדל</text>
  </g>

  <!-- ===== ONIONS PAN ===== -->
  <g id="st_onions" style="cursor:pointer" transform="translate(560 450)">
    <!-- pan body -->
    <ellipse cx="55" cy="62" rx="52" ry="14" fill="#2a2a2a" stroke="${OUT}" stroke-width="3"/>
    <rect x="4" y="40" width="102" height="24" rx="4" fill="#3a3a3a" stroke="${OUT}" stroke-width="3"/>
    <ellipse cx="55" cy="40" rx="50" ry="12" fill="#444" stroke="${OUT}" stroke-width="2.5"/>
    <!-- fried onion bits (golden squares/rounded) -->
    <g fill="#e8c040" stroke="#b08820" stroke-width="1">
      <rect x="18" y="32" width="14" height="10" rx="3"/>
      <rect x="36" y="30" width="16" height="10" rx="3"/>
      <rect x="56" y="32" width="14" height="10" rx="3"/>
      <rect x="74" y="30" width="16" height="10" rx="3"/>
      <rect x="28" y="36" width="12" height="8" rx="2"/>
      <rect x="48" y="36" width="14" height="8" rx="2"/>
      <rect x="66" y="35" width="12" height="8" rx="2"/>
    </g>
    <!-- pan handle -->
    <rect x="105" y="48" width="36" height="10" rx="5" fill="#666" stroke="${OUT}" stroke-width="2"/>
    <!-- label -->
    <text x="55" y="86" font-size="12" text-anchor="middle" fill="#8a6800" font-weight="bold" font-family="Arial">בצל</text>
  </g>

  <!-- ===== KRAUT BOWL ===== -->
  <g id="st_kraut" style="cursor:pointer" transform="translate(425 450)">
    <!-- clay bowl -->
    <ellipse cx="65" cy="82" rx="60" ry="12" fill="rgba(0,0,0,0.2)"/>
    <path d="M8 56 Q8 82 65 84 Q122 82 122 56 L118 42 Q65 30 12 42 Z"
          fill="#b87050" stroke="${OUT}" stroke-width="3"/>
    <ellipse cx="65" cy="42" rx="53" ry="14" fill="#d08060" stroke="${OUT}" stroke-width="2.5"/>
    <!-- kraut zigzags -->
    <path d="M18 38 q9 -12 18 0 t18 0 t18 0 t18 0 t14 0" stroke="#b0b040" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M15 42 q10 -10 20 0 t18 0 t18 0 t18 0 t12 0" stroke="#d0cc60" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M18 38 q9 -10 18 0 t18 0 t18 0 t18 0 t12 0" stroke="#e8e888" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>
    <!-- bowl rim highlight -->
    <path d="M20 44 Q65 34 110 44" stroke="rgba(255,200,160,0.4)" stroke-width="4" fill="none"/>
    <!-- label -->
    <text x="65" y="100" font-size="12" text-anchor="middle" fill="#4a2a08" font-weight="bold" font-family="Arial">כרוב</text>
  </g>

  <!-- ===== FRIES TRAY ===== -->
  <g id="st_fries" style="cursor:pointer" transform="translate(850 445)">
    <!-- metal tray -->
    <rect x="0" y="28" width="116" height="44" rx="5" fill="#c8c8c0" stroke="${OUT}" stroke-width="3"/>
    <rect x="4" y="32" width="108" height="36" rx="3" fill="#b8b8b0" stroke="#888" stroke-width="1.5"/>
    <!-- fries (vertical rectangles) -->
    <g fill="url(#friesGrad)" stroke="#b08020" stroke-width="1.2">
      <rect x="10" y="8" width="10" height="32" rx="3"/>
      <rect x="24" y="4" width="10" height="36" rx="3"/>
      <rect x="38" y="10" width="10" height="30" rx="3"/>
      <rect x="52" y="6" width="10" height="34" rx="3"/>
      <rect x="66" y="8" width="10" height="32" rx="3"/>
      <rect x="80" y="4" width="10" height="36" rx="3"/>
      <rect x="94" y="10" width="10" height="30" rx="3"/>
      <!-- second layer peek -->
      <rect x="17" y="12" width="8" height="24" rx="2" opacity="0.7"/>
      <rect x="45" y="14" width="8" height="22" rx="2" opacity="0.7"/>
      <rect x="73" y="12" width="8" height="24" rx="2" opacity="0.7"/>
    </g>
    <!-- tray label -->
    <text x="58" y="88" font-size="13" text-anchor="middle" fill="#6a4400" font-weight="bold" font-family="Arial">ציפס</text>
  </g>

  <!-- ===== SODA FRIDGE ===== -->
  <g id="st_soda" style="cursor:pointer" transform="translate(690 545)">
    <!-- fridge body -->
    <rect x="0" y="0" width="80" height="112" rx="10" fill="url(#sodaFridgeGrad)" stroke="${OUT}" stroke-width="3.5"/>
    <!-- fridge shine -->
    <path d="M6 8 Q40 4 74 10" stroke="rgba(160,210,255,0.4)" stroke-width="5" fill="none"/>
    <!-- window -->
    <rect x="8" y="14" width="64" height="66" rx="5" fill="#bfe3f2" stroke="${OUT}" stroke-width="2"/>
    <!-- red can inside -->
    <rect x="24" y="20" width="28" height="54" rx="5" fill="#c8102e" stroke="${OUT}" stroke-width="2.5"/>
    <ellipse cx="38" cy="21" rx="14" ry="4" fill="#e0e0e0" stroke="${OUT}" stroke-width="1.5"/>
    <path d="M28 26 L28 68" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-linecap="round"/>
    <text x="38" y="54" font-size="9" text-anchor="middle" fill="#fff" font-weight="bold" font-family="Arial">קולה</text>
    <!-- handle -->
    <rect x="32" y="84" width="16" height="22" rx="8" fill="#888" stroke="${OUT}" stroke-width="2"/>
    <!-- label -->
    <text x="40" y="126" font-size="12" text-anchor="middle" fill="#fff" font-weight="bold" font-family="Arial">שתייה</text>
  </g>

  <!-- ===== RESTOCK VENDOR (appears during restocking) ===== -->
  <g id="restock-vendor" transform="translate(150 390)" display="none">
    <!-- body shadow -->
    <ellipse cx="45" cy="95" rx="30" ry="8" fill="rgba(0,0,0,0.18)"/>
    <!-- legs -->
    <rect x="28" y="72" width="12" height="26" rx="5" fill="#3a5a8a"/>
    <rect x="50" y="72" width="12" height="26" rx="5" fill="#3a5a8a"/>
    <!-- torso -->
    <rect x="18" y="38" width="54" height="40" rx="10" fill="#e84040"/>
    <!-- arm left (reaching into crate) -->
    <rect x="2" y="48" width="18" height="10" rx="5" fill="#e8b870" transform="rotate(30 10 53)"/>
    <!-- arm right -->
    <rect x="70" y="48" width="18" height="10" rx="5" fill="#e8b870" transform="rotate(-20 79 53)"/>
    <!-- head -->
    <circle cx="45" cy="26" r="22" fill="url(#vendorSkin)"/>
    <!-- hair -->
    <ellipse cx="45" cy="8" rx="21" ry="10" fill="#3a2010"/>
    <!-- eyes -->
    <circle cx="38" cy="24" r="3.5" fill="#fff"/>
    <circle cx="52" cy="24" r="3.5" fill="#fff"/>
    <circle cx="39" cy="25" r="2" fill="#2a1a08"/>
    <circle cx="53" cy="25" r="2" fill="#2a1a08"/>
    <!-- effort expression - furrowed brow -->
    <path d="M34 19 Q38 17 42 19" stroke="#3a2010" stroke-width="2" fill="none"/>
    <path d="M48 19 Q52 17 56 19" stroke="#3a2010" stroke-width="2" fill="none"/>
    <!-- open mouth -->
    <path d="M39 33 Q45 38 51 33" stroke="#3a2010" stroke-width="2" fill="#c85060"/>
    <!-- sweat drop -->
    <ellipse cx="62" cy="14" rx="4" ry="6" fill="#a0d0f0" opacity="0.85"/>
    <path d="M62 8 l3 -6 l3 6" fill="#a0d0f0" opacity="0.85"/>
    <!-- caption -->
    <text x="45" y="110" font-size="12" text-anchor="middle" fill="#3a1a08" font-weight="bold" font-family="Arial">ממלא מלאי...</text>
  </g>

  <!-- ===== RESTOCK CRATE ===== -->
  <g id="st_restock" style="cursor:pointer" transform="translate(150 545)">
    <!-- crate body -->
    <rect x="0" y="0" width="90" height="68" rx="6" fill="#c89050" stroke="${OUT}" stroke-width="3"/>
    <!-- crate slats -->
    <line x1="30" y1="0" x2="30" y2="68" stroke="${OUT}" stroke-width="2" opacity="0.6"/>
    <line x1="60" y1="0" x2="60" y2="68" stroke="${OUT}" stroke-width="2" opacity="0.6"/>
    <line x1="0" y1="24" x2="90" y2="24" stroke="${OUT}" stroke-width="2" opacity="0.6"/>
    <line x1="0" y1="48" x2="90" y2="48" stroke="${OUT}" stroke-width="2" opacity="0.6"/>
    <!-- crate shadow inner -->
    <rect x="4" y="4" width="82" height="60" rx="4" fill="rgba(0,0,0,0.08)"/>
    <!-- label -->
    <text x="45" y="40" font-size="14" text-anchor="middle" fill="#3a1a08" font-weight="bold" font-family="Arial">מלאי</text>
    <text x="45" y="56" font-size="16" text-anchor="middle">📦</text>
  </g>

  <!-- ===== TRASH CAN ===== -->
  <g id="st_trash" style="cursor:pointer" transform="translate(810 545)">
    <!-- lid -->
    <rect x="-4" y="-14" width="58" height="12" rx="4" fill="#666" stroke="${OUT}" stroke-width="2.5"/>
    <path d="M12 -26 h22 l2 12 h-26z" fill="#666" stroke="${OUT}" stroke-width="2.2"/>
    <!-- body -->
    <path d="M0 -2 l4 70 a6 6 0 0 0 6 6 h24 a6 6 0 0 0 6 -6 l4 -70z"
          fill="#cc3333" stroke="${OUT}" stroke-width="3"/>
    <!-- stripes -->
    <line x1="14" y1="2" x2="12" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
    <line x1="25" y1="2" x2="25" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
    <line x1="36" y1="2" x2="38" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
    <!-- label -->
    <text x="25" y="42" font-size="11" text-anchor="middle" fill="#ffcccc" font-weight="bold" font-family="Arial">זרוק</text>
    <text x="25" y="90" font-size="11" text-anchor="middle" fill="#cc3333" font-weight="bold" font-family="Arial" stroke="#fff" stroke-width="1" paint-order="stroke">🗑️</text>
  </g>

  <!-- dynamic layers -->
  <g id="custLayer"></g>
  <g id="handLayer"></g>
  <g id="fxLayer"></g>
  `;
}

/* ---------- grillSausageArt ---------- */
function grillSausageArt(type, t) {
  // color interpolation: pink -> brown -> black
  function lerp(a, b, f) { return Math.round(a + (b - a) * f); }
  function lerpColor(c1, c2, f) {
    return 'rgb(' + lerp(c1[0], c2[0], f) + ',' + lerp(c1[1], c2[1], f) + ',' + lerp(c1[2], c2[2], f) + ')';
  }

  let baseColor, midColor;
  if (type === 'vegan') {
    baseColor = [200, 160, 130]; // greenish pink raw
    midColor = [100, 140, 60];   // cooked green-brown
  } else {
    baseColor = [232, 144, 144]; // raw pink
    midColor = [168, 84, 44];    // juicy brown
  }
  const blackColor = [42, 26, 16];

  let col;
  if (t < 0.55) {
    col = lerpColor(baseColor, midColor, t / 0.55);
  } else if (t < 0.75) {
    col = lerpColor(midColor, midColor, 0); // perfect brown, keep
    col = 'rgb(' + midColor[0] + ',' + midColor[1] + ',' + midColor[2] + ')';
  } else {
    col = lerpColor(midColor, blackColor, (t - 0.75) / 0.25);
  }

  const hilightOpacity = t < 0.6 ? 0.5 : 0.15;
  const sausageHighlight = type === 'vegan' ? '#c8e890' : '#f0b8a0';

  // timing bar (60x8) with green zone at 55-75%
  const barW = 60, barH = 8;
  const greenStart = Math.round(0.55 * barW);
  const greenEnd = Math.round(0.75 * barW);
  const indicatorX = Math.round(t * barW);
  const indicatorColor = (t >= 0.55 && t <= 0.75) ? '#00dd00' : (t > 0.75 ? '#ff3333' : '#ffcc00');

  const timingBar = `
    <rect x="-30" y="-28" width="${barW}" height="${barH}" rx="3" fill="#333" stroke="#666" stroke-width="1"/>
    <rect x="${-30 + greenStart}" y="-28" width="${greenEnd - greenStart}" height="${barH}" rx="0" fill="#00aa00" opacity="0.7"/>
    <rect x="${-30 + indicatorX - 2}" y="-30" width="4" height="${barH + 4}" rx="2" fill="${indicatorColor}" stroke="#fff" stroke-width="1"/>`;

  return `<g>
    ${timingBar}
    <!-- sausage outline -->
    <path d="M-46 0 Q0 -18 46 0" stroke="${OUT}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <!-- sausage fill -->
    <path d="M-46 0 Q0 -18 46 0" stroke="${col}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <!-- sausage highlight -->
    <path d="M-38 -2 Q0 -18 38 -2" stroke="${sausageHighlight}" stroke-width="4" fill="none" stroke-linecap="round" opacity="${hilightOpacity}"/>
    <!-- grill marks -->
    <path d="M-30 2 Q-26 -14 -22 2" stroke="#2a1a10" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="${t > 0.3 ? 0.8 : 0.2}"/>
    <path d="M-6 0 Q-2 -16 2 0" stroke="#2a1a10" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="${t > 0.3 ? 0.8 : 0.2}"/>
    <path d="M18 -2 Q22 -16 26 -2" stroke="#2a1a10" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="${t > 0.3 ? 0.8 : 0.2}"/>
    <!-- end caps -->
    <circle cx="-46" cy="0" r="6" fill="${col}" stroke="${OUT}" stroke-width="2"/>
    <circle cx="46" cy="0" r="6" fill="${col}" stroke="${OUT}" stroke-width="2"/>
  </g>`;
}

/* ---------- toastingBunArt ---------- */
function toastingBunArt(bun, t) {
  function lerp(a, b, f) { return Math.round(a + (b - a) * f); }
  function lerpColor(c1, c2, f) {
    return 'rgb(' + lerp(c1[0], c2[0], f) + ',' + lerp(c1[1], c2[1], f) + ',' + lerp(c1[2], c2[2], f) + ')';
  }

  const goldenColor = [248, 208, 120];
  const toastedColor = [180, 100, 30];
  const burntColor = [40, 24, 10];

  let col;
  if (t < 0.55) {
    col = lerpColor(goldenColor, toastedColor, t / 0.55);
  } else if (t < 0.75) {
    col = 'rgb(' + toastedColor[0] + ',' + toastedColor[1] + ',' + toastedColor[2] + ')';
  } else {
    col = lerpColor(toastedColor, burntColor, (t - 0.75) / 0.25);
  }

  const isPretzel = bun === 'pretzel';
  const baseColorStr = isPretzel ? '#a06020' : col;

  const barW = 60, barH = 8;
  const greenStart = Math.round(0.55 * barW);
  const greenEnd = Math.round(0.75 * barW);
  const indicatorX = Math.round(t * barW);
  const indicatorColor = (t >= 0.55 && t <= 0.75) ? '#00dd00' : (t > 0.75 ? '#ff3333' : '#ffcc00');

  const timingBar = `
    <rect x="-30" y="-38" width="${barW}" height="${barH}" rx="3" fill="#333" stroke="#666" stroke-width="1"/>
    <rect x="${-30 + greenStart}" y="-38" width="${greenEnd - greenStart}" height="${barH}" rx="0" fill="#00aa00" opacity="0.7"/>
    <rect x="${-30 + indicatorX - 2}" y="-40" width="4" height="${barH + 4}" rx="2" fill="${indicatorColor}" stroke="#fff" stroke-width="1"/>`;

  const seeds = isPretzel ? `
    <circle cx="-12" cy="-8" r="2" fill="rgba(255,255,255,0.6)"/>
    <circle cx="4" cy="-12" r="2" fill="rgba(255,255,255,0.6)"/>
    <circle cx="18" cy="-8" r="2" fill="rgba(255,255,255,0.6)"/>
    <path d="M-20 -6 l8 -8 M-4 -10 l8 -8 M12 -8 l8 -8" stroke="rgba(80,30,5,0.5)" stroke-width="1.5" fill="none"/>` :
    `<ellipse cx="-20" cy="-12" rx="4" ry="1.8" fill="#c8a050" stroke="#9a7028" stroke-width="0.7" transform="rotate(-10 -20 -12)"/>
     <ellipse cx="0" cy="-16" rx="4" ry="1.8" fill="#c8a050" stroke="#9a7028" stroke-width="0.7"/>
     <ellipse cx="20" cy="-12" rx="4" ry="1.8" fill="#c8a050" stroke="#9a7028" stroke-width="0.7" transform="rotate(10 20 -12)"/>`;

  return `<g>
    ${timingBar}
    <!-- bottom bun half -->
    <path d="M-32 4 Q0 12 32 4 Q0 18 -32 4Z" fill="${col}" stroke="${OUT}" stroke-width="2"/>
    <!-- top bun half (domed) -->
    <path d="M-32 4 Q-36 -18 0 -22 Q36 -18 32 4 Q0 -8 -32 4Z" fill="${baseColorStr}" stroke="${OUT}" stroke-width="2.5"/>
    ${seeds}
    <!-- toast lines on sides if toasted -->
    ${t > 0.4 ? `<path d="M-28 0 Q0 -20 28 0" stroke="rgba(80,30,5,0.4)" stroke-width="3" fill="none"/>` : ''}
    <!-- shine -->
    <path d="M-20 -18 Q0 -22 20 -18" stroke="rgba(255,240,180,0.4)" stroke-width="2.5" fill="none"/>
  </g>`;
}

/* ---------- heldArt ---------- */
function heldArt(held) {
  if (!held) return '';

  const bun = held.bun || 'regular';
  const isPretzel = bun === 'pretzel';
  const toasted = held.toasted || 0; // 0=raw, 1=toasted, 2=burnt

  const bunTopColor = toasted === 2 ? '#3a2010' : toasted === 1 ? '#c07828' : (isPretzel ? '#a06020' : '#f8d078');
  const bunTopMid = toasted === 2 ? '#2a1a08' : toasted === 1 ? '#a05e18' : (isPretzel ? '#784010' : '#e8b258');
  const bunBotColor = isPretzel ? '#904e18' : '#e8b258';

  // sausage color based on doneness
  const doneness = held.sausage_doneness !== undefined ? held.sausage_doneness : 1; // 0=raw,1=perfect,2=burnt
  const sausColor = doneness === 2 ? '#2a1a10' : doneness === 0 ? '#e89090' : '#a8542c';
  const sausHighlight = doneness === 0 ? '#f0b8b0' : '#d07040';
  const isVegan = held.sausage_type === 'vegan';
  const veganColor = doneness === 2 ? '#2a2a18' : doneness === 0 ? '#a0d060' : '#6a9830';

  const activeSausColor = isVegan ? veganColor : sausColor;
  const activeSausHighlight = isVegan ? '#c0e880' : sausHighlight;

  const seeds = isPretzel ?
    `<circle cx="-22" cy="-76" r="3" fill="rgba(255,255,255,0.65)"/>
     <circle cx="0" cy="-80" r="3" fill="rgba(255,255,255,0.65)"/>
     <circle cx="22" cy="-76" r="3" fill="rgba(255,255,255,0.65)"/>
     <path d="M-30 -74 l8 -8 M-8 -78 l8 -8 M14 -74 l8 -8" stroke="rgba(80,30,5,0.45)" stroke-width="2" fill="none"/>` :
    [[-75,-32],[-52,-40],[-25,-44],[0,-46],[25,-44],[52,-40],[75,-32],
     [-38,-38],[18,-45],[48,-39],[-12,-43]].map(function(p){
      const sx = p[0], sy = p[1];
      return `<ellipse cx="${sx}" cy="${sy}" rx="4.8" ry="2.3" fill="#c8a050" stroke="#9a7028" stroke-width="0.8"
       transform="rotate(${sx > 30 ? 14 : sx < -30 ? -14 : 5} ${sx} ${sy})"/>`;
    }).join('');

  // toast lines if toasted
  const toastLines = toasted >= 1
    ? `<path d="M-60 -56 Q0 -70 60 -56" stroke="rgba(100,50,5,0.4)" stroke-width="3" fill="none"/>
       <path d="M-40 -62 Q0 -72 40 -62" stroke="rgba(100,50,5,0.25)" stroke-width="2" fill="none"/>`
    : '';

  // toppings
  let toppings = '';
  if (held.sausage) {
    toppings += `
      <path d="M-82 -8 Q0 -30 82 -8" stroke="${OUT}" stroke-width="26" fill="none" stroke-linecap="round"/>
      <path d="M-82 -8 Q0 -30 82 -8" stroke="${activeSausColor}" stroke-width="22" fill="none" stroke-linecap="round"/>
      <path d="M-78 -9 Q0 -30 78 -9" stroke="${activeSausHighlight}" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.35"/>
      <path d="M-50 -4 Q-44 -22 -38 -4" stroke="#2a1a10" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.65"/>
      <path d="M-10 -4 Q-4 -22 2 -4" stroke="#2a1a10" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.65"/>
      <path d="M30 -4 Q36 -22 42 -4" stroke="#2a1a10" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.65"/>`;
  }

  if (held.kraut) {
    const kz = [[-58,-24],[-30,-32],[0,-34],[30,-32],[58,-24]];
    kz.forEach(function(p){
      const kx = p[0], ky = p[1];
      toppings += `
        <path d="M${kx-16} ${ky} q8 -12 16 0 t16 0 t12 0" stroke="#b0b040" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M${kx-14} ${ky+5} q7 -10 14 0 t14 0 t12 0" stroke="#d8d860" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    });
  }

  if (held.onions) {
    for (let o = 0; o < 6; o++) {
      const ox = -60 + o * 24, oy = -36 - (o % 2) * 8;
      toppings += `<rect x="${ox}" y="${oy}" width="16" height="10" rx="3" fill="#e8c040" stroke="#b08020" stroke-width="1.2"/>`;
    }
  }

  if (held.mustard) {
    toppings += `<path d="M-78 -22 q12 -16 24 0 t24 0 t24 0 t24 0" stroke="#f0c419" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M-76 -24 q12 -13 22 0 t22 0 t22 0 t22 0" stroke="#fde648" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>`;
  }

  if (held.ketchup) {
    toppings += `<path d="M-78 -14 q12 -16 24 0 t24 0 t24 0 t24 0" stroke="#d63b2f" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M-76 -16 q12 -13 22 0 t22 0 t22 0 t22 0" stroke="#f25040" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>`;
  }

  // top bun (rises as layers added)
  const layerCount = (held.sausage ? 1 : 0) + (held.kraut ? 1 : 0) + (held.onions ? 1 : 0) +
                     (held.mustard ? 1 : 0) + (held.ketchup ? 1 : 0);
  const topBunY = -46 - layerCount * 8;

  const topBun = `
    <path d="M-100 ${topBunY + 14} Q-108 ${topBunY - 24} -50 ${topBunY - 48} Q0 ${topBunY - 60} 50 ${topBunY - 48} Q108 ${topBunY - 24} 100 ${topBunY + 14} Q50 ${topBunY + 2} 0 ${topBunY + 2} Q-50 ${topBunY + 2} -100 ${topBunY + 14}Z"
          fill="${bunTopColor}" stroke="${OUT}" stroke-width="4"/>
    <path d="M-68 ${topBunY - 44} Q0 ${topBunY - 58} 68 ${topBunY - 44}" stroke="${bunTopMid}" stroke-width="3" fill="none" opacity="0.55"/>
    <path d="M-42 ${topBunY - 52} Q0 ${topBunY - 62} 42 ${topBunY - 52}" stroke="rgba(255,240,180,0.4)" stroke-width="3" fill="none"/>
    ${toastLines.replace(/-56/g, String(topBunY - 10)).replace(/-62/g, String(topBunY - 16))}
    ${seeds}`;

  // hand
  const hand = `
    <path d="M50 140 L130 300 L-120 300 L-30 140 Z" fill="url(#handGrad)" stroke="${OUT}" stroke-width="4"/>
    <g>
      <path d="M20 16 q10 -34 28 -12 q4 18 -6 28z" fill="url(#handGrad)" stroke="${OUT}" stroke-width="3.5"/>
      <path d="M50 14 q12 -32 28 -10 q2 16 -8 26z" fill="url(#handGrad)" stroke="${OUT}" stroke-width="3.5"/>
      <path d="M80 10 q14 -28 26 -8 q0 14 -10 24z" fill="url(#handGrad)" stroke="${OUT}" stroke-width="3.5"/>
      <ellipse cx="36" cy="10" rx="7" ry="5" fill="#f6d9b8" opacity=".7"/>
    </g>`;

  // bottom bun
  const botBun = `
    <path d="M-100 14 Q-108 -18 -80 -24 L80 -24 Q108 -18 100 14 Q50 26 0 26 Q-50 26 -100 14Z"
          fill="${bunBotColor}" stroke="${OUT}" stroke-width="4"/>
    <path d="M-90 -16 Q0 -34 90 -16" stroke="rgba(255,220,130,0.42)" stroke-width="3.5" fill="none"/>`;

  // extras: fries and soda
  let extras = '';
  if (held.fries) {
    extras += `<g transform="translate(120 -20)">
      <rect x="-18" y="-40" width="36" height="48" rx="4" fill="#e84020" stroke="${OUT}" stroke-width="2"/>
      <g fill="url(#friesGrad)" stroke="#b08020" stroke-width="1">
        <rect x="-14" y="-56" width="7" height="28" rx="2"/>
        <rect x="-5" y="-60" width="7" height="32" rx="2"/>
        <rect x="4" y="-54" width="7" height="26" rx="2"/>
      </g>
    </g>`;
  }
  if (held.soda) {
    extras += `<g transform="translate(-130 -10)">
      <rect x="-16" y="-52" width="32" height="60" rx="5" fill="#c8102e" stroke="${OUT}" stroke-width="2.5"/>
      <ellipse cx="0" cy="-53" rx="16" ry="4" fill="#e0e0e0" stroke="${OUT}" stroke-width="1.5"/>
      <path d="M-12 -46 L-12 4" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-linecap="round"/>
    </g>`;
  }

  return `<g>
    ${hand}
    ${botBun}
    ${toppings}
    ${topBun}
    ${extras}
  </g>`;
}

/* ---------- bubbleOrderText ---------- */
function bubbleOrderText(order) {
  if (!order) return '';

  const lines = [];
  if (order.bun) {
    const bunName = order.bun === 'pretzel' ? 'בייגלה' : 'לחמנייה';
    const toastSuffix = order.wantsToast ? ' קלויה' : '';
    lines.push(bunName + toastSuffix);
  }
  if (order.sausage) {
    lines.push(order.sausage === 'vegan' ? '🌿 טבעוני' : '🌭 נקניקייה');
  }
  const tp = order.toppings || {};
  if (tp.kraut)   lines.push('✓ כרוב כבוש');
  if (tp.onions)  lines.push('✓ בצל מטוגן');
  if (tp.mustard) lines.push('✓ חרדל');
  if (tp.ketchup) lines.push('✓ קטשופ');
  if (order.fries)   lines.push('🍟 ציפס');
  if (order.soda)    lines.push('🥤 שתייה');

  const lineH = 18;
  const h = 34 + lines.length * lineH + 8;
  const w = 175;

  const lineItems = lines.map(function(line, idx){
    return `<text x="${w / 2}" y="${44 + idx * lineH}" font-size="13" text-anchor="middle" fill="#2a1a08"
            font-family="Arial" font-weight="${idx === 0 ? 'bold' : 'normal'}">${line}</text>`;
  }).join('');

  return `<g>
    <!-- shadow -->
    <rect x="3" y="3" width="${w}" height="${h}" rx="10" fill="rgba(0,0,0,0.18)"/>
    <!-- bubble body -->
    <rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="#fffdf0" stroke="#c8b870" stroke-width="2.5"/>
    <!-- pointer triangle -->
    <path d="M${Math.round(w * 0.7)} ${h} l10 18 l-20 0Z" fill="#fffdf0" stroke="#c8b870" stroke-width="2"/>
    <path d="M${Math.round(w * 0.7) - 2} ${h} l10 16 l-16 0Z" fill="#fffdf0" stroke="none"/>
    <!-- header band -->
    <rect x="0" y="0" width="${w}" height="22" rx="10" fill="#f2b21d"/>
    <rect x="0" y="14" width="${w}" height="8" fill="#f2b21d"/>
    <text x="${w / 2}" y="16" font-size="12" text-anchor="middle" fill="#5a3500" font-weight="bold" font-family="Arial">ההזמנה שלי</text>
    <!-- divider -->
    <line x1="8" y1="24" x2="${w - 8}" y2="24" stroke="#c8b870" stroke-width="1" stroke-dasharray="3 2"/>
    ${lineItems}
  </g>`;
}

/* ---------- splashVendorArt ---------- */
function splashVendorArt() {
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="spBunTop" cx="0.45" cy="0.35" r="0.7" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#fce090"/>
      <stop offset="55%" stop-color="#e8b040"/>
      <stop offset="100%" stop-color="#c07020"/>
    </radialGradient>
    <radialGradient id="spBunBot" cx="0.45" cy="0.4" r="0.7" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#f0c460"/>
      <stop offset="100%" stop-color="#b87820"/>
    </radialGradient>
    <radialGradient id="spSaus" cx="0.3" cy="0.3" r="0.8" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#d87850"/>
      <stop offset="55%" stop-color="#a84c28"/>
      <stop offset="100%" stop-color="#6a2010"/>
    </radialGradient>
    <radialGradient id="spFace" cx="0.4" cy="0.35" r="0.72" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="#fce0b0"/>
      <stop offset="55%" stop-color="#e8b870"/>
      <stop offset="100%" stop-color="#c88840"/>
    </radialGradient>
  </defs>

  <!-- background circle -->
  <circle cx="150" cy="150" r="140" fill="#f8f0d0" stroke="#c8a030" stroke-width="6"/>
  <circle cx="150" cy="150" r="134" fill="none" stroke="#e8b030" stroke-width="3" stroke-dasharray="12 8"/>

  <!-- HOT DOG: bottom bun -->
  <path d="M50 180 Q50 214 150 216 Q250 214 250 180 Q150 170 50 180Z"
        fill="url(#spBunBot)" stroke="#1c1c1c" stroke-width="3.5"/>

  <!-- sausage -->
  <path d="M58 168 Q150 142 242 168" stroke="#1c1c1c" stroke-width="28" fill="none" stroke-linecap="round"/>
  <path d="M58 168 Q150 142 242 168" stroke="url(#spSaus)" stroke-width="23" fill="none" stroke-linecap="round"/>
  <path d="M70 162 Q150 140 230 162" stroke="#d08858" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.45"/>
  <!-- grill marks -->
  <path d="M90 168 Q96 148 102 168" stroke="#2a1a10" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M130 163 Q136 143 142 163" stroke="#2a1a10" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M170 162 Q176 142 182 162" stroke="#2a1a10" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- ketchup squiggle -->
  <path d="M70 156 q10 -12 20 0 t20 0 t20 0 t20 0 t20 0 t20 0" stroke="#d63b2f" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M72 158 q10 -10 18 0 t18 0 t18 0 t18 0 t18 0 t18 0" stroke="#f25040" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.5"/>

  <!-- top bun -->
  <path d="M50 180 Q46 130 150 118 Q254 130 250 180 Q150 168 50 180Z"
        fill="url(#spBunTop)" stroke="#1c1c1c" stroke-width="3.5"/>
  <!-- seeds -->
  <ellipse cx="100" cy="138" rx="7" ry="3.2" fill="#c8a050" stroke="#9a7028" stroke-width="1" transform="rotate(-14 100 138)"/>
  <ellipse cx="130" cy="128" rx="7" ry="3.2" fill="#c8a050" stroke="#9a7028" stroke-width="1"/>
  <ellipse cx="162" cy="126" rx="7" ry="3.2" fill="#c8a050" stroke="#9a7028" stroke-width="1" transform="rotate(8 162 126)"/>
  <ellipse cx="195" cy="134" rx="7" ry="3.2" fill="#c8a050" stroke="#9a7028" stroke-width="1" transform="rotate(14 195 134)"/>
  <!-- bun highlight -->
  <path d="M80 132 Q150 120 220 132" stroke="rgba(255,250,200,0.55)" stroke-width="6" fill="none" stroke-linecap="round"/>

  <!-- crown / chef hat on the hot dog -->
  <g transform="translate(150 105)">
    <!-- hat body -->
    <rect x="-34" y="-50" width="68" height="54" rx="8" fill="#f0f0e8" stroke="#1c1c1c" stroke-width="3"/>
    <!-- hat brim -->
    <rect x="-44" y="2" width="88" height="14" rx="5" fill="#e8e8e0" stroke="#1c1c1c" stroke-width="3"/>
    <!-- hat vertical line -->
    <line x1="0" y1="-50" x2="0" y2="4" stroke="#ddd" stroke-width="2" opacity="0.5"/>
    <!-- stripe -->
    <path d="M-34 -20 Q0 -24 34 -20" stroke="#d63b2f" stroke-width="5" fill="none" opacity="0.7"/>
    <!-- star on hat -->
    <text x="0" y="-16" font-size="22" text-anchor="middle">⭐</text>
  </g>

  <!-- cartoon face on the hot dog middle -->
  <ellipse cx="148" cy="165" rx="26" ry="22" fill="url(#spFace)" stroke="#1c1c1c" stroke-width="2.5"/>
  <!-- eyes -->
  <ellipse cx="138" cy="160" rx="6" ry="7" fill="white" stroke="#1c1c1c" stroke-width="1.5"/>
  <circle cx="139" cy="161" r="4" fill="#2a1808"/>
  <circle cx="139" cy="161" r="2.5" fill="#080604"/>
  <ellipse cx="137.5" cy="158.5" rx="1.5" ry="1" fill="rgba(255,255,255,0.9)"/>
  <ellipse cx="158" cy="160" rx="6" ry="7" fill="white" stroke="#1c1c1c" stroke-width="1.5"/>
  <circle cx="159" cy="161" r="4" fill="#2a1808"/>
  <circle cx="159" cy="161" r="2.5" fill="#080604"/>
  <ellipse cx="157.5" cy="158.5" rx="1.5" ry="1" fill="rgba(255,255,255,0.9)"/>
  <!-- smile -->
  <path d="M138 170 Q148 180 158 170" stroke="#1c1c1c" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- cheeks -->
  <circle cx="130" cy="168" r="8" fill="#ffb8a8" opacity="0.45"/>
  <circle cx="166" cy="168" r="8" fill="#ffb8a8" opacity="0.45"/>

  <!-- title text -->
  <text x="150" y="248" font-size="22" text-anchor="middle" fill="#8a2010" font-weight="bold"
        font-family="Arial" stroke="#fff" stroke-width="1.5" paint-order="stroke">הבאסטה של גולן</text>
  <text x="150" y="270" font-size="14" text-anchor="middle" fill="#5a3a10" font-style="italic" font-family="Arial">Hot Dog Hustle</text>
</svg>`;
}
