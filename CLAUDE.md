# Prière Sacrée du Roi Salomon — contexte du projet (à lire d'abord)

Lucas (Brésil, parle portugais avec Claude, ton chaleureux, réponses courtes, sans jargon) vend en France l'app **« Prière Sacrée du Roi Salomon »**. C'est le 2e app de Lucas, distinct du 1er (« Temps d'Abondance » / Prière Sacrée, dépôt `reiswqi/app`) : autre dépôt, autre domaine, autre base de données. **Toute l'interface est en français** ; l'admin est en portugais.

## Ce que Lucas veut (25/11/2026) : **le même app que le 1er, à l'identique**
Copie exacte de `reiswqi/app` (src.html, prieres.json, images, vidéos, programmes vturb, thème du mois, défi 21 Jours de Renouveau, Père Michel, couleurs bleues, mot « Temps d'Abondance » en haut). **Seule différence : les prières de Saint Antoine sont remplacées par les « Prières du Roi Salomon »** (`SA` : Grande Prière du Roi Salomon + protection, maison/famille, prospérité, guérison ; couvertures `img/sa1–sa5.jpg` = images envoyées par Lucas le 25/11/2026 (titre intégré, 480×720) ; route `#grande-priere`, alias `#saint-antoine`). Une première version « tout Salomon » (autres programmes, autre visuel) a été abandonnée à la demande de Lucas : ne pas la refaire. Quand le 1er app change, reporter la même modification ici (sauf les prières de saint Antoine).
- `src.html` → `python3 build.py` → `temps-abondance.html` (servi sur `/`). Stockage local `rs1`, `rs_q`, `rs_dev`. `API_URL`/`SUPPORT` = app-cheminsalomon.com.
- E-mails (server/mail.js, funnel.js) et admin : nom du produit « Prière Sacrée du Roi Salomon » ; étape 4 du funnel = Grande Prière du Roi Salomon.
- Cross-sells Kiwify identiques au 1er app (Lucas les garde).

## Railway (même projet que le 1er app : b3535745-fd55-4e04-8d19-ee3ddc94b731, env production d6a17d8b-453e-42c8-b9ec-c48b2d6e297f ; jeton de projet injecté par le proxy)
- Service **salomon** (a1d7ad23-69fe-4011-87e9-459db375e4bd), source `reiswqi/salomon-app` branche main, domaine https://salomon-production.up.railway.app (port 8080) ; variables : `DATABASE_URL=${{Postgres-Salomon.DATABASE_URL}}`, `PORT=8080`, `ACCESS_MODE=open` (passer à `buyers` quand les ventes commencent).
- Service **Postgres-Salomon** (bd3149d0-a3d5-4768-9bca-c5e216f7faab), image postgres-ssl:18, volume postgres-salomon-volume, mot de passe généré par Railway (`secret(32)`). Base séparée du 1er app.
- Domaine définitif **app-cheminsalomon.com** (acheté par Lucas dans Railway le 25/11/2026, DNS Railway/name.com, certificat OK) : `API_URL`, `ADMIN_URL`, `SUPPORT`, `APP_URL` par défaut y pointent. L'admin : https://app-cheminsalomon.com/admin.
- Un push sur main devrait redéployer ; sinon `serviceInstanceDeployV2(commitSha)`.

## Fait le 25/11/2026
- Redirection e-mail contact@app-cheminsalomon.com → Gmail de Lucas (Railway).
- Webhook KashPay du produit Salomon → https://app-cheminsalomon.com/api/webhooks/kashpay, `KASHPAY_WEBHOOK_SECRET` posé par Lucas, événement de test `order.paid` reçu (signature valide). Un webhook par admin (Lucas) : `KASHPAY_PRODUCT` (filtre par produit, « !mot » = exclure) existe dans les deux serveurs mais reste **non défini**.
- Brevo : même compte que le 1er app ; domaine app-cheminsalomon.com authentifié (brevo-code, DKIM brevo1/brevo2, DMARC, marque `mail`) ; variables `BREVO_API_KEY=${{app.BREVO_API_KEY}}` (référence, la clé n'est jamais copiée), `BREVO_SENDER=contact@app-cheminsalomon.com`, `BREVO_SENDER_NAME=Prière Sacrée du Roi Salomon`. Limite gratuite de 300/jour partagée entre les deux apps.

## À configurer (en attente de Lucas)
- `ACCESS_MODE=buyers` quand Lucas commence à vendre ; liste des acheteurs → « Liberar acesso » puis e-mails d'accès ; funnel (désactivé par défaut).

## Règles de travail
- Garder `<meta charset="utf-8">` et le viewport ; `html,body{margin:0}` ; tester iPhone 13 (Playwright) avant de publier ; vérifier les accents.
- Contenu toujours original (ne jamais copier d'autres apps). Jamais de token ni de données client dans le dépôt (public).
