// One-shot OG image renderer (CommonJS for sharp resolution).
// node scripts/og-render.cjs

const sharp = require('C:/Users/rayt7/Documents/phonerepairman/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp');

(async () => {
  const wordmark = await sharp('apps/web/public/wordmark.svg')
    .resize({ width: 720 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const wordmarkTop = 240 - Math.round(wordmark.info.height / 2);

  const baseSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#fafaf7"/>
  <rect x="1080" y="0" width="120" height="630" fill="#0b70ff"/>
  <rect x="80" y="90" width="80" height="2" fill="#0b70ff"/>
  <text x="80" y="128" font-family="JetBrains Mono, monospace" font-size="22" letter-spacing="3" fill="#4b5563">PHONE REPAIRMAN  ·  EST. 2015</text>
  <text x="80" y="400" font-family="Inter, Helvetica Neue, sans-serif" font-weight="800" font-size="80" letter-spacing="-3" fill="#111827">Authorised device repair,</text>
  <text x="80" y="490" font-family="Inter, Helvetica Neue, sans-serif" font-weight="800" font-size="80" letter-spacing="-3" fill="#0b70ff">in your town.</text>
  <rect x="80" y="540" width="44" height="2" fill="#111827"/>
  <text x="80" y="580" font-family="JetBrains Mono, monospace" font-size="22" letter-spacing="2" fill="#111827">MUSWELLBROOK  ·  UPPER HUNTER NSW</text>
  <text x="80" y="610" font-family="JetBrains Mono, monospace" font-size="16" letter-spacing="3" fill="#4b5563">AUTHORISED AGENT  ·  HP  ACER  LEXMARK  EPSON</text>
</svg>`);

  await sharp(baseSvg)
    .composite([{ input: wordmark.data, left: 80, top: wordmarkTop }])
    .png({ compressionLevel: 9 })
    .toFile('apps/web/public/og-default.png');

  const buf = await sharp('apps/web/public/og-default.png').toBuffer();
  const meta = await sharp('apps/web/public/og-default.png').metadata();
  console.log(`OK og-default.png ${meta.width}x${meta.height} ${(buf.length / 1024).toFixed(0)} KB`);
})().catch(e => { console.error(e); process.exit(1); });
