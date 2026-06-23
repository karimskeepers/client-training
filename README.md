# client-training

Espace de formation client — site statique de démonstration aux couleurs de **Skeepers**.

## Pages

| Page | Fichier | Description |
|------|---------|-------------|
| Accueil | [`index.html`](index.html) | Page d'index qui référence les trois pages de démo |
| Parcours d'achat | [`purchase.html`](purchase.html) | Fiche produit avec options, étapes d'achat et avis vérifiés |
| Centre d'aide | [`help-center.html`](help-center.html) | Article de support avec sommaire et encart de feedback |
| Panier | [`cart.html`](cart.html) | Panier interactif (quantités, code promo, récapitulatif) |

Code promo de démo sur le panier : `SKEEPERS10` (−10 %).

## Structure

```
.
├── index.html
├── purchase.html
├── help-center.html
├── cart.html
└── assets/
    ├── css/style.css
    └── js/main.js
```

## Aperçu en local

Aucune dépendance. Ouvrez `index.html` dans un navigateur, ou servez le dossier :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement (GitHub Pages)

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publie le site à
chaque `push` sur `main`.

**À faire une seule fois** dans le repo GitHub :
`Settings` → `Pages` → *Build and deployment* → **Source : GitHub Actions**.

Le site sera ensuite disponible sur `https://<utilisateur>.github.io/client-training/`.
