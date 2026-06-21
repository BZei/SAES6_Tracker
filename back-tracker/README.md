# SAE Backend API

Backend REST en Node.js / Express / MySQL.

## Structure

```
sae-backend/
├── config/
│   ├── db.js           # Connexion MySQL
│   └── schema.sql      # Script de création des tables
├── middleware/
│   └── auth.js         # Vérification JWT
├── routes/
│   ├── admin.js        # Login / Logout / Liste
│   ├── sae.js          # CRUD SAE
│   ├── ue.js           # CRUD UE + valider
│   ├── domaine.js      # CRUD Domaine
│   └── ac.js           # CRUD AC + valider
├── .env.example
├── package.json
└── server.js           # Point d'entrée
```

## Installation

```bash
npm install
cp .env.example .env
# Edite .env avec tes infos MySQL et ton secret JWT
```

## Base de données

```bash
mysql -u root -p < config/schema.sql
```

## Lancer le serveur

```bash
# Production
npm start

# Développement (avec rechargement auto)
npm run dev
```

## Endpoints API

### Auth
| Méthode | Route                  | Description         | Auth |
|---------|------------------------|---------------------|------|
| POST    | /api/admin/register    | Créer un admin      | Non  |
| POST    | /api/admin/login       | Connexion           | Non  |
| POST    | /api/admin/logout      | Déconnexion         | Oui  |
| GET     | /api/admin/liste       | Liste des admins    | Oui  |

### SAE
| Méthode | Route          | Description      | Auth |
|---------|----------------|------------------|------|
| GET     | /api/sae       | Liste des SAE    | Oui  |
| GET     | /api/sae/:id   | Détail SAE       | Oui  |
| POST    | /api/sae       | Créer SAE        | Oui  |
| PUT     | /api/sae/:id   | Modifier SAE     | Oui  |
| DELETE  | /api/sae/:id   | Supprimer SAE    | Oui  |

### UE
| Méthode | Route                  | Description      | Auth |
|---------|------------------------|------------------|------|
| GET     | /api/ue                | Liste des UE     | Oui  |
| GET     | /api/ue/:id            | Détail UE        | Oui  |
| POST    | /api/ue                | Créer UE         | Oui  |
| PUT     | /api/ue/:id            | Modifier UE      | Oui  |
| DELETE  | /api/ue/:id            | Supprimer UE     | Oui  |
| PATCH   | /api/ue/:id/valider    | Toggle valide    | Oui  |

### Domaine
| Méthode | Route              | Description         | Auth |
|---------|--------------------|---------------------|------|
| GET     | /api/domaine       | Liste des domaines  | Oui  |
| POST    | /api/domaine       | Créer domaine       | Oui  |
| PUT     | /api/domaine/:id   | Modifier domaine    | Oui  |
| DELETE  | /api/domaine/:id   | Supprimer domaine   | Oui  |

### AC (Apprentissage Critique)
| Méthode | Route                  | Description      | Auth |
|---------|------------------------|------------------|------|
| GET     | /api/ac                | Liste des AC     | Oui  |
| POST    | /api/ac                | Créer AC         | Oui  |
| PUT     | /api/ac/:id            | Modifier AC      | Oui  |
| DELETE  | /api/ac/:id            | Supprimer AC     | Oui  |
| PATCH   | /api/ac/:id/valider    | Toggle valide    | Oui  |

## Authentification

Toutes les routes protégées nécessitent le header :
```
Authorization: Bearer <token>
```
Le token est retourné lors du login.
