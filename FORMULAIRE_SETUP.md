# 📧 Guide de Configuration du Formulaire de Contact

## ✅ Ce qui a été fait

1. ✨ **Endpoint API créé** (`/api/contact`) pour traiter les soumissions du formulaire
2. 📨 **Nodemailer installé** pour gérer l'envoi d'emails via Gmail SMTP
3. 🔧 **Astro configuré en mode hybrid** pour accepter les requêtes POST
4. 🎨 **Formulaire modifié** pour envoyer les données à l'API
5. 📝 **Messages de confirmation** - l'utilisateur reçoit un email après chaque soumission

---

## 🚀 Comment configurer et tester

### Étape 1️⃣ : Générer le mot de passe d'application Gmail

Pour **remivint@gmail.com**:
1. Va sur: https://myaccount.google.com/apppasswords
2. Connecte-toi avec remivint@gmail.com
3. Sélectionne:
   - **App**: Mail
   - **Device**: Windows Computer (ou autre)
4. Clique sur "Generate"
5. Copie le mot de passe généré (16 caractères)
6. **IMPORTANT**: Sauvegarde ce mot de passe quelque part!

### Étape 2️⃣ : Ajouter le mot de passe au fichier `.env`

Le fichier `.env` se trouve à la racine du projet (`carrepair/.env`):

```env
EMAIL_USER=remivint@gmail.com
EMAIL_PASSWORD=COLLE_LE_MOT_DE_PASSE_ICI
EMAIL_SERVICE=gmail
CONTACT_EMAIL=remivint@gmail.com
```

### Étape 3️⃣ : Démarrer le serveur de développement

```bash
npm run dev
```

Puis ouvre: http://localhost:3000/contact

### Étape 4️⃣ : Tester avec le premier formulaire

1. Remplis le formulaire de contact
2. Clique sur "Envoyer ma demande"
3. Tu devrais recevoir 2 emails:
   - ✉️ Un email de **demande de devis** sur remivint@gmail.com
   - ✉️ Un email de **confirmation** à l'adresse fournie dans le formulaire

---

## 🔄 Test avec la deuxième adresse Gmail

Une fois que ça fonctionne avec `remivint@gmail.com`:

1. Génère un mot de passe d'application pour **mbosseubradbruel@gmail.com**
2. Modifie le fichier `.env`:

```env
EMAIL_USER=mbosseubradbruel@gmail.com
EMAIL_PASSWORD=LE_NOUVEAU_MOT_DE_PASSE
EMAIL_SERVICE=gmail
CONTACT_EMAIL=mbosseubradbruel@gmail.com
```

3. Relance le serveur: `npm run dev`
4. Teste à nouveau le formulaire

---

## ✅ Passer à la configuration PRODUCTION

Une fois que les tests fonctionnent avec tes deux adresses Gmail, il faut:

1. **Configurer une vraie adresse email** pour le client (info@car-repair.fr)
   - Ou utiliser un service professionnel comme SendGrid, Mailgun, etc.
   - Ou utiliser le serveur SMTP du domaine car-repair.fr

2. **Changer le `.env`** pour:

```env
EMAIL_USER=info@car-repair.fr
EMAIL_PASSWORD=MOT_DE_PASSE_OU_APP_PASSWORD
EMAIL_SERVICE=gmail  # ou autre service si nécessaire
CONTACT_EMAIL=info@car-repair.fr
```

---

## 🆘 Troubleshooting

### ❌ "Email/password is incorrect"
- Vérifier que tu utilises un **mot de passe d'application** (pas le mot de passe principal)
- Vérifier que le compte a **l'authentification à deux facteurs** activée

### ❌ "Timeout ou connexion refusée"
- Vérifier la connexion Internet
- Vérifier que les ports SMTP de Gmail (587) ne sont pas bloqués

### ❌ Aucun email reçu
- Vérifier les spams/courrier indésirable
- Vérifier les logs du serveur Astro pour les erreurs

---

## 📱 Variables d'environnement récapitulatif

| Variable | Description | Exemple |
|----------|-------------|---------|
| `EMAIL_USER` | Email d'envoi Gmail | remivint@gmail.com |
| `EMAIL_PASSWORD` | Mot de passe d'application | xyznopqrstabcdef |
| `EMAIL_SERVICE` | Service SMTP | gmail |
| `CONTACT_EMAIL` | Email de réception (destinataire) | remivint@gmail.com |

---

## 🎯 Résumé des étapes

```
1. Générer mot de passe app Gmail (remivint@gmail.com)
   ↓
2. Remplir le fichier .env
   ↓
3. npm run dev
   ↓
4. Tester le formulaire
   ↓
5. Générer mot de passe app Gmail (mbosseubradbruel@gmail.com)
   ↓
6. Modifier .env et retester
   ↓
7. Quand tout OK → Utiliser info@car-repair.fr
```

---

**C'est bon! Commence par générer le premier mot de passe d'application pour remivint@gmail.com, puis je t'aiderai avec les tests!** 🚀
