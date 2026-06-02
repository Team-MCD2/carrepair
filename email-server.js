import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5555; // Port unique pour éviter les conflits

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration du transporteur email
const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const emailService = process.env.EMAIL_SERVICE || 'gmail';

  if (!emailUser || !emailPassword) {
    throw new Error('EMAIL_USER et EMAIL_PASSWORD ne sont pas configurés');
  }

  return nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
};

// Route POST pour le formulaire
app.post('/api/contact', async (req, res) => {
  try {
    const { lastname, firstname, email, phone, service, message } = req.body;

    // Valider les champs obligatoires
    if (!lastname || !firstname || !email || !phone || !service || !message) {
      return res.status(400).json({
        error: 'Tous les champs obligatoires doivent être remplis',
      });
    }

    // Récupérer l'adresse email cible
    const recipientEmail = process.env.CONTACT_EMAIL || 'remivint@gmail.com';

    // Créer le transporteur
    const transporter = getTransporter();

    // Formater le service
    const serviceLabels = {
      mecanique: 'Mécanique Générale',
      carrosserie: 'Carrosserie & Peinture',
      pneumatique: 'Pneumatique & Parallélisme',
      'achat-vente': 'Achat / Vente de véhicule',
      autre: 'Autre demande',
    };

    const serviceLabel = serviceLabels[service] || service;

    // Créer le contenu HTML de l'email
    const htmlContent = `
      <h2>Nouvelle demande de devis - Car Repair</h2>
      <p><strong>Informations client :</strong></p>
      <ul>
        <li><strong>Nom :</strong> ${lastname}</li>
        <li><strong>Prénom :</strong> ${firstname}</li>
        <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
        <li><strong>Téléphone :</strong> <a href="tel:${phone}">${phone}</a></li>
      </ul>

      <p><strong>Détails de la demande :</strong></p>
      <ul>
        <li><strong>Type de prestation :</strong> ${serviceLabel}</li>
      </ul>

      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>

      <hr>
      <p style="color: #999; font-size: 12px;">
        Message automatique envoyé depuis le formulaire de contact du site car-repair-france.fr
      </p>
    `;

    // Contenu texte simple
    const textContent = `
Nouvelle demande de devis - Car Repair

INFORMATIONS CLIENT:
Nom: ${lastname}
Prénom: ${firstname}
Email: ${email}
Téléphone: ${phone}

DÉTAILS DE LA DEMANDE:
Type de prestation: ${serviceLabel}

MESSAGE:
${message}

---
Message automatique envoyé depuis le formulaire de contact du site car-repair-france.fr
    `;

    // Envoyer l'email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: email,
      subject: `[Devis] ${firstname} ${lastname} - ${serviceLabel}`,
      text: textContent,
      html: htmlContent,
    });

    // Envoyer une confirmation au client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de votre demande de devis - Car Repair',
      html: `
        <h2>Bonjour ${firstname},</h2>
        <p>Nous vous remercions pour votre confiance. Votre demande de devis concernant la prestation <strong>${serviceLabel}</strong> a bien été enregistrée.</p>
        <p>Un conseiller technique Car Repair prendra contact avec vous dans un délai de <strong>24 à 48 heures ouvrées</strong> au <strong>${phone}</strong> ou par retour d'e-mail.</p>
        <p>Cordialement,</p>
        <hr>
        <p><strong>L'équipe Car Repair</strong><br>
        34 Rue Adolphe Coll<br>
        31300 Toulouse<br>
        Tél : 05 62 83 74 29</p>
      `,
      text: `Bonjour ${firstname},\n\nNous vous remercions pour votre confiance. Votre demande de devis concernant la prestation ${serviceLabel} a bien été enregistrée.\n\nUn conseiller technique Car Repair prendra contact avec vous dans un délai de 24 à 48 heures ouvrées au ${phone} ou par retour d'e-mail.\n\nCordialement,\n\nL'équipe Car Repair\n34 Rue Adolphe Coll\n31300 Toulouse\nTél : 05 62 83 74 29`,
    });

    return res.status(200).json({
      success: true,
      message: 'Votre demande de devis a bien été prise en compte. Notre équipe vous recontactera dans les plus brefs délais.',
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);

    return res.status(500).json({
      error: 'Une erreur est survenue lors de la transmission de votre demande. Veuillez réessayer ou nous contacter directement par téléphone.',
    });
  }
});

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur d\'emails en ligne' });
});

// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`✅ Serveur d'emails en écoute sur http://localhost:${PORT}`);
  console.log(`📧 Endpoint de contact: POST http://localhost:${PORT}/api/contact`);
});

// Gérer les erreurs du serveur
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Le port ${PORT} est déjà utilisé. Impossible de démarrer.`);
    process.exit(1);
  }
  throw err;
});
