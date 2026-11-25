# Prière Sacrée du Roi Salomon — contexte du projet (à lire d'abord)

Lucas (Brésil, parle portugais avec Claude, ton chaleureux, réponses courtes, sans jargon) vend en France l'app **« Prière Sacrée du Roi Salomon »**. C'est le 2e app de Lucas, distinct du 1er (« Temps d'Abondance » / Prière Sacrée, dépôt `reiswqi/app`) : autre dépôt, autre domaine, autre base de données. **Toute l'interface est en français** ; l'admin est en portugais.

## Origine
Copie du code de `reiswqi/app` (novembre 2026) : même architecture (SPA un seul fichier, serveur Node + Postgres sur Railway, admin anti-chargeback, comptes avec mot de passe, mot de passe oublié par e-mail, KashPay, Brevo, funnel de relance, remboursement, prière du jour scellée, défi 21 jours, Nombres Puissants, Focus du Jour). Les corrections faites dans un app peuvent souvent être reprises dans l'autre.

## Fichiers
- `src.html` = source ; `python3 build.py` injecte `prieres.json` (104 prières originales inspirées de Salomon) et écrit `index.html`. Toujours commit src.html + index.html.
- `content/` = sources des textes (prieres1–4.json → prieres.json, progs.js, defi.js) ; déjà copiés dans src.html (ensuite, modifier src.html directement).
- `img/` = couvertures générées par `design/cover.html` + `design/render.js` (`NODE_PATH=$(npm root -g) node design/render.js`) : fond pourpre/or, icône dorée (crown, key, seal, temple, heart, hourglass, book, cedar, lamp, sun, user). Pas de photos.
- `server/` (index.js, mail.js, funnel.js, schema.sql), `admin.html`, `package.json`, `railway.json` : identiques au 1er app sauf textes ; le serveur sert `index.html` sur `/`.

## Contenu (original, écrit par Claude ; versets Louis Segond 1910 **à vérifier**)
- Programmes `P` (leçons **écrites** `tx` : p = paragraphes, v/r = verset, pr = prière, g = geste sacré ; `lread()` les affiche dans le design de `vProgVt`) : `sagesse` (Prière de Sagesse, 5), `prosp` (7 Secrets de la Prospérité, `gift:1` = débloqué par la Grande Prière), `sceau` (Sceau Sacré de Protection, 4), `temple` (7 Prières du Temple, 1 Rois 8), `cantique` (Cantique de l'Amour Fidèle, 4), `temps` (Un Temps pour Chaque Chose, 4). Vidéos vturb plus tard : `vt:[…]` (le lecteur remplace le texte pour ces leçons). `SOON` = Les Proverbes de l'Abondance (31 jours, Bientôt).
- `SA` = 5 « Prières royales » (Grande Prière du Roi Salomon + protection, maison, prospérité, guérison) ; route `#grande-priere` (alias `#saint-antoine`).
- Défi « 21 Jours de Sagesse » (👑 Demander la sagesse / 🏛️ Bâtir sa maison / 🌾 Récolter l'abondance), certificat avec Proverbes 4:18.
- Assistant : `PERE='Frère Nathan'` (onglet « Frère Nathan », réponses de secours).
- Thème du mois (Bonus) : vide (`THEME_PAGE`) tant que Lucas n'envoie pas de leçons.
- `OFFERS`/`LOCKS` : mêmes cross-sells Kiwify que le 1er app (ange gardien → reiswqi.github.io/a/, Prière Secrète, Code du Royaume) : Lucas les garde (25/11/2026).
- Funnel : 15 e-mails réécrits pour les leçons de Salomon.

## Identité visuelle
Fond #120a1f (pourpre très sombre), cartes #2b1a42, or #dcc084, ciel étoilé violet. Polices Cormorant Garamond + Lato. Stockage local : `rs1`, `rs_q`, `rs_dev` (différents du 1er app).

## Railway (même projet que le 1er app : b3535745-fd55-4e04-8d19-ee3ddc94b731, env production d6a17d8b-453e-42c8-b9ec-c48b2d6e297f ; jeton de projet injecté par le proxy)
- Service **salomon** (a1d7ad23-69fe-4011-87e9-459db375e4bd), source `reiswqi/salomon-app` branche main, domaine https://salomon-production.up.railway.app (port 8080) ; variables : `DATABASE_URL=${{Postgres-Salomon.DATABASE_URL}}`, `PORT=8080`, `ACCESS_MODE=open` (passer à `buyers` quand les ventes commencent).
- Service **Postgres-Salomon** (bd3149d0-a3d5-4768-9bca-c5e216f7faab), image postgres-ssl:18, volume postgres-salomon-volume, mot de passe généré par Railway (`secret(32)`). Base séparée du 1er app.
- Domaine définitif **app-cheminsalomon.com** (acheté par Lucas dans Railway le 25/11/2026, DNS Railway/name.com, certificat OK) : `API_URL`, `ADMIN_URL`, `SUPPORT`, `APP_URL` par défaut y pointent. L'admin : https://app-cheminsalomon.com/admin.
- Un push sur main devrait redéployer ; sinon `serviceInstanceDeployV2(commitSha)`.

## À configurer (en attente de Lucas)
- Dépôt GitHub (Lucas le crée), redirection e-mail contact@app-cheminsalomon.com (Lucas, Railway → domaine → e-mail), `BREVO_*` + DNS Brevo du nouveau domaine, `KASHPAY_WEBHOOK_SECRET` + webhook du nouveau produit, `ACCESS_MODE`.

## Règles de travail
- Garder `<meta charset="utf-8">` et le viewport ; `html,body{margin:0}` ; tester iPhone 13 (Playwright) avant de publier ; vérifier les accents.
- Contenu toujours original (ne jamais copier d'autres apps). Jamais de token ni de données client dans le dépôt (public).
