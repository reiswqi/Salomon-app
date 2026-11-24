// Funnel « relance » : acheteurs qui ne sont jamais entrés dans l'app.
// 3 e-mails par jour pendant 5 jours (15 au total), aux heures de Paris adaptées à un public de 40 ans et plus :
// le café du matin, la pause du déjeuner, la soirée calme après le dîner. S'arrête dès que la personne entre dans l'app.
// Chaque e-mail parle d'une leçon précise et le bouton ouvre l'app directement sur cette leçon (lien ?e=… + #route).
const SLOTS = ['08:15', '12:30', '19:45'];             // heure de Paris
// {p} = prénom (ou rien), chaque étape : s = objet, pre = aperçu dans la boîte de réception, b = paragraphes, cta, go = route de l'app
const STEPS = [
 { s: '{p}votre espace royal est ouvert… il ne manque que vous', pre: 'Tout est prêt : un seul bouton à toucher.', go: '',
   b: ["Votre achat est bien confirmé et votre espace <b>Prière Sacrée du Roi Salomon</b> est ouvert depuis hier.", "Vos prières, vos programmes royaux et vos bonus vous attendent. Il ne manque plus qu'une chose : <b>vous</b>.", "En touchant le bouton, votre e-mail est déjà rempli. Choisissez simplement un mot de passe, et vous y êtes."], cta: 'Entrer dans mon espace' },
 { s: 'Une prière a été scellée pour vous ce matin', pre: "Elle ne s'ouvre qu'une fois par jour, et seulement pour vous.", go: 'message',
   b: ["Chaque matin, une prière inspirée de la sagesse du roi Salomon est choisie pour vous et placée sous un <b>sceau de cire</b>.", "Celle d'aujourd'hui vous attend encore. Personne d'autre ne reçoit la même que vous.", "Touchez le sceau, et découvrez aussi ce qu'elle signifie <b>pour votre journée</b>."], cta: 'Briser le sceau' },
 { s: '« Demande ce que tu veux que je te donne »', pre: "La nuit où Dieu a posé cette question à un jeune roi.", go: 'prog-sagesse-1',
   b: ["Une nuit, à Gabaon, Dieu est apparu en songe au jeune Salomon et lui a dit : <i>« Demande ce que tu veux que je te donne. »</i>", "Sa réponse a changé sa vie, et elle a fait de lui l'homme le plus sage et le plus riche de son temps.", "Dans la première leçon de <b>La Prière de Sagesse du Roi Salomon</b>, découvrez ce qu'il a demandé… et ce que vous pourriez demander, vous aussi."], cta: 'Lire la leçon 1' },
 { s: "{p}la Grande Prière du Roi vous attend", pre: 'En la lisant, de nouvelles leçons se débloquent.', go: 'grande-priere',
   b: ["Le jour où le Temple fut achevé, Salomon s'agenouilla devant tout le peuple, les mains levées vers le ciel.", "Sa <b>Grande Prière</b> est la porte d'entrée de votre espace. Lisez-la une fois en entier…", "…et un cadeau se débloque : <b>Les Secrets de la Prospérité du Roi Salomon</b>."], cta: 'Lire la Grande Prière' },
 { s: "Le premier secret de l'homme le plus riche du monde", pre: "Ce n'est pas une technique. C'est une source.", go: 'prog-prosp-1',
   b: ["Salomon a possédé plus d'or que n'importe quel roi de son époque. Pourtant, quand il écrit sur la richesse, il ne commence pas par des techniques.", "Il commence par la source : <i>« C'est la bénédiction de l'Éternel qui enrichit, et il ne la fait suivre d'aucun chagrin. »</i>", "Le premier des <b>7 secrets</b> vous attend, avec sa prière."], cta: 'Découvrir le 1er secret' },
 { s: 'Un cœur qui écoute', pre: "La demande la plus précieuse de la Bible.", go: 'prog-sagesse-3',
   b: ["Salomon n'a pas demandé l'or, ni la victoire. Il a demandé <b>un cœur qui écoute</b>.", "En hébreu, c'est exactement le sens de sa prière : un cœur capable d'écouter Dieu, les autres et la vérité.", "Ce soir, prenez 5 minutes pour lire cette leçon. Elle peut changer vos décisions de demain."], cta: 'Lire « Un cœur qui écoute »' },
 { s: 'Le nom qui protège comme une tour forte', pre: 'Pour vous, votre maison et ceux que vous aimez.', go: 'prog-sceau-1',
   b: ["Au temps de Salomon, quand l'ennemi approchait, on courait se réfugier dans la tour forte de la ville.", "Il a écrit : <i>« Le nom de l'Éternel est une tour forte ; le juste s'y réfugie, et se trouve en sûreté. »</i>", "La première prière du <b>Sceau Sacré de Protection</b> est faite pour les moments de peur. Gardez-la près de vous."], cta: 'Recevoir la prière de protection' },
 { s: '{p}avez-vous oublié votre accès ?', pre: "Votre e-mail est déjà rempli. Il reste une seule étape.", go: '',
   b: ["Nous remarquons que vous n'êtes pas encore entré dans votre espace. Ce n'est pas grave : c'est très simple.", "1. Touchez le bouton ci-dessous.<br>2. Écrivez votre nom.<br>3. Choisissez un mot de passe et notez-le sur un papier.", "Un souci ? <b>Répondez simplement à cet e-mail</b>, une vraie personne vous aide."], cta: 'Entrer maintenant' },
 { s: 'Le secret des prémices', pre: 'Le principe qui remplit les greniers.', go: 'prog-prosp-2',
   b: ["<i>« Honore l'Éternel avec tes biens, et avec les prémices de tout ton revenu : alors tes greniers seront remplis d'abondance. »</i>", "C'est l'un des secrets les plus anciens de la prospérité selon Salomon : Dieu d'abord, le reste ensuite.", "Découvrez ce que sont les prémices aujourd'hui, et le geste simple à faire dès demain matin."], cta: 'Découvrir le 2e secret' },
 { s: "La prière de Salomon pour le pardon", pre: "Quand on a failli, Dieu écoute encore.", go: 'prog-temple-1',
   b: ["Le jour de la consécration du Temple, Salomon a prié pour toutes les situations de la vie.", "Sa première demande : <i>« Exauce et pardonne ! »</i> Il savait que nous tomberions, et qu'il nous faudrait un lieu pour revenir.", "La première des <b>7 Prières du Temple</b> vous attend. La porte reste ouverte."], cta: 'Lire la 1re prière du Temple' },
 { s: '{p}bénissez votre maison pièce par pièce', pre: 'Une pratique très ancienne, simple et puissante.', go: 'prog-sceau-3',
   b: ["<i>« Si l'Éternel ne bâtit la maison, ceux qui la bâtissent travaillent en vain. »</i>", "Salomon avait bâti le Temple et son palais. Il savait que les murs ne suffisent pas.", "Dans cette prière, vous allez confier à Dieu chaque pièce de votre maison : la cuisine, les chambres, le salon."], cta: 'Bénir ma maison' },
 { s: '21 jours pour marcher avec la sagesse du Roi', pre: "Un pas chaque jour. Le premier est aujourd'hui.", go: 'defi',
   b: ["Demander la sagesse. Bâtir sa maison. Récolter l'abondance.", "Le défi <b>21 Jours de Sagesse</b> vous propose un petit pas chaque jour : un verset de Salomon, une prière, un geste sacré.", "À la fin, un <b>certificat</b> à votre nom vous attend. Le Jour 1 est déjà ouvert."], cta: 'Commencer le Jour 1' },
 { s: "Quand l'hiver est passé…", pre: "Pour votre couple, votre famille, et l'amour que vous attendez.", go: 'prog-cantique-1',
   b: ["<i>« Car voici, l'hiver est passé ; la pluie a cessé. Les fleurs paraissent sur la terre. »</i>", "Le Cantique de Salomon est le plus beau poème d'amour de la Bible. Il annonce que l'hiver du cœur ne dure pas toujours.", "Découvrez la première prière du <b>Cantique de l'Amour Fidèle</b>, pour vous ou pour quelqu'un que vous aimez."], cta: "Lire la prière de l'amour" },
 { s: 'La main qui arrose', pre: 'Le paradoxe de la générosité selon Salomon.', go: 'prog-prosp-5',
   b: ["Dans la logique du monde, donner nous appauvrit. Dans celle de Dieu, donner nous ouvre.", "<i>« Celui qui arrose sera lui-même arrosé. »</i>", "Le 5e secret de la prospérité du Roi Salomon vous libère de la peur de manquer."], cta: 'Découvrir le 5e secret' },
 { s: "{p}c'est mon dernier message", pre: 'Votre espace reste ouvert. Je ne vous écrirai plus.', go: '',
   b: ["Depuis 5 jours, je vous écris pour vous montrer ce qui vous attend : la prière de sagesse, les secrets de la prospérité, la protection et le défi des 21 jours.", "C'est mon dernier message. Votre espace reste ouvert, et tout y est gardé pour vous.", "Si quelque chose vous empêche d'entrer, <b>répondez à cet e-mail</b> : je vous aide personnellement. Et si vous êtes prêt, il suffit d'un geste."], cta: 'Entrer dans mon espace' },
];
const h = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = s => String(s).replace(/<br>/g, '\n').replace(/<[^>]+>/g, '');
function funnelEmail(n, email, name, appUrl, firstName) {
  const st = STEPS[n], p = firstName(name);
  const subject = st.s.replace('{p}', p ? p + ', ' : '').replace(/^./, c => c.toUpperCase());
  const link = appUrl.replace(/\/$/, '') + (/\.html?$/.test(appUrl) ? '' : '/') + '?e=' + encodeURIComponent(email) + (st.go ? '#' + st.go : '');
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${h(subject)}</title></head>
<body style="margin:0;padding:0;background:#f4efe4;font-family:Georgia,'Times New Roman',serif;color:#1c2540">
<div style="display:none;max-height:0;overflow:hidden">${h(st.pre)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe4"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #e3d6b8">
<tr><td style="padding:28px 26px 4px;text-align:center"><div style="font-size:15px;letter-spacing:3px;color:#8a6a1e;font-family:Arial,sans-serif;font-weight:bold">✦ PRIÈRE SACRÉE ✦</div>
 <h1 style="margin:16px 0 0;font-size:28px;line-height:1.25;font-weight:normal;color:#1c2540">${p ? 'Bonjour ' + h(p) + ',' : 'Bonjour,'}</h1></td></tr>
<tr><td style="padding:10px 28px 0;font-size:20px;line-height:1.6">${st.b.map(x => `<p style="margin:14px 0 0">${x}</p>`).join('')}</td></tr>
<tr><td align="center" style="padding:26px 26px 4px"><a href="${h(link)}" style="display:inline-block;background:#b98f3c;background-image:linear-gradient(90deg,#d9b866,#b98f3c);color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:20px;font-weight:bold;letter-spacing:1px;padding:19px 30px;border-radius:12px">${h(st.cta.toUpperCase())}</a></td></tr>
<tr><td style="padding:14px 28px 0;text-align:center;font-family:Arial,sans-serif;font-size:15px;color:#6b6b6b">Votre e-mail d'accès : <b style="color:#1c2540">${h(email)}</b><br>(il est déjà rempli quand vous touchez le bouton)</td></tr>
<tr><td style="padding:24px 26px 28px;font-size:19px;line-height:1.5;text-align:center;font-style:italic;color:#5b4a22">Que la paix vous accompagne,<br><span style="font-style:normal;font-weight:bold">L'équipe Prière Sacrée du Roi Salomon</span></td></tr>
</table>
<p style="max-width:560px;font-family:Arial,sans-serif;font-size:13px;line-height:1.5;color:#7a7a7a;margin:16px auto 0;text-align:center">
 Si le bouton ne fonctionne pas : <a href="${h(link)}" style="color:#8a6a1e;word-break:break-all">${h(link)}</a><br>
 Vous recevez cet e-mail car vous avez acheté Prière Sacrée du Roi Salomon avec l'adresse ${h(email)}. Ces rappels s'arrêtent dès votre première connexion.</p>
</td></tr></table></body></html>`;
  const text = `${p ? 'Bonjour ' + p + ',' : 'Bonjour,'}\n\n${st.b.map(strip).join('\n\n')}\n\n${st.cta} : ${link}\n\nVotre e-mail d'accès : ${email}\n\nQue la paix vous accompagne,\nL'équipe Prière Sacrée du Roi Salomon`;
  return { subject, html, text };
}
// heure de Paris (HH:MM) et date (AAAA-MM-JJ)
function parisNow(d = new Date()) {
  const f = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(d);
  const g = t => f.find(x => x.type === t).value;
  return { day: `${g('year')}-${g('month')}-${g('day')}`, min: +g('hour') * 60 + +g('minute') };
}
// créneau en cours (index) si on est dans les 90 minutes qui suivent un horaire, sinon -1
function currentSlot(d = process.env.FUNNEL_FAKE_NOW ? new Date(require('fs').readFileSync(process.env.FUNNEL_FAKE_NOW, 'utf8').trim()) : new Date()) {  // FUNNEL_FAKE_NOW : tests seulement
  const { day, min } = parisNow(d);
  for (let i = SLOTS.length - 1; i >= 0; i--) { const [hh, mm] = SLOTS[i].split(':').map(Number), t = hh * 60 + mm;
    if (min >= t && min < t + 90) return { key: day + ' ' + SLOTS[i], i }; }
  return null;
}
module.exports = { STEPS, SLOTS, funnelEmail, currentSlot, parisNow };
