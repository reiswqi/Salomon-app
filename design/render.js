// Rendu des couvertures : node design/render.js  (écrit dans img/)
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.join(__dirname, 'cover.html');
const J = [ // [fichier, icône, teinte1, teinte2, largeur, hauteur, sur-titre, titre]
 ['sagesse', 'crown', 272, 286, 600, 900, 'ROI SALOMON', 'La Prière de Sagesse'],
 ['prosp', 'key', 38, 280, 600, 900, 'ROI SALOMON', 'Les Secrets de la Prospérité'],
 ['sceau', 'seal', 228, 262, 600, 900, 'ROI SALOMON', 'Le Sceau de Protection'],
 ['temple', 'temple', 258, 290, 600, 900, 'ROI SALOMON', 'Les 7 Prières du Temple'],
 ['cantique', 'heart', 332, 290, 600, 900, 'ROI SALOMON', "Le Cantique de l'Amour"],
 ['temps', 'hourglass', 190, 270, 600, 900, 'ROI SALOMON', 'Un Temps pour Chaque Chose'],
 ['proverbes', 'book', 30, 300, 600, 900, 'ROI SALOMON', "Les Proverbes de l'Abondance"],
 ['sa1', 'crown', 44, 285, 600, 900, 'PRIÈRE ROYALE', 'La Grande Prière du Roi'],
 ['sa2', 'seal', 230, 268, 600, 900, 'PRIÈRE ROYALE', 'Protection'],
 ['sa3', 'cedar', 150, 280, 600, 900, 'PRIÈRE ROYALE', 'Famille'],
 ['sa4', 'key', 40, 300, 600, 900, 'PRIÈRE ROYALE', 'Prospérité'],
 ['sa5', 'lamp', 300, 270, 600, 900, 'PRIÈRE ROYALE', 'Guérison'],
 ['pere', 'user', 276, 290, 600, 600, '', ''],
 ['defi', 'sun', 40, 280, 600, 900, '21 JOURS', 'Le Chemin de la Sagesse'],
];
const W = [['sagesse','crown',272,286],['prosp','key',38,280],['sceau','seal',228,262],['temple','temple',258,290],['cantique','heart',332,290],['temps','hourglass',190,270],['sa1','crown',44,285]];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const shot = async (name, icon, h1, h2, w, h, eb, t) => {
    await p.setViewportSize({ width: w, height: h });
    await p.goto(`${F}?icon=${icon}&h1=${h1}&h2=${h2}&w=${w}&h=${h}&seed=${name.length * 13}&eb=${encodeURIComponent(eb)}&t=${encodeURIComponent(t)}`);
    await p.waitForFunction(() => document.title === 'ready'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(__dirname, '..', 'img', name + '.jpg'), type: 'jpeg', quality: 84 });
  };
  for (const j of J) await shot(...j);
  for (const [n, i, a, c] of W) await shot(n + '-hero', i, a, c, 1200, 675, '', '');
  await b.close(); console.log('ok', J.length + W.length);
})();
