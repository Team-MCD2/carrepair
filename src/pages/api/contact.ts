import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// Configuration du transporteur email
const getTransporter = () => {
  const emailUser = import.meta.env.EMAIL_USER;
  const emailPassword = import.meta.env.EMAIL_PASSWORD;
  const emailService = import.meta.env.EMAIL_SERVICE || 'gmail';

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

export const POST: APIRoute = async ({ request }) => {
  // Vérifier que c'est une requête POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await request.formData();

    // Récupérer les données du formulaire
    const lastname = formData.get('lastname');
    const firstname = formData.get('firstname');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');

    // Valider les champs obligatoires
    if (!lastname || !firstname || !email || !phone || !service || !message) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs obligatoires doivent être remplis' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Récupérer l'adresse email cible (depuis variables d'environnement)
    const recipientEmail = import.meta.env.CONTACT_EMAIL || 'remivint@gmail.com';

    // Créer le transporteur
    const transporter = getTransporter();

    // Formater le service
    const serviceLabels: Record<string, string> = {
      mecanique: 'Mécanique Générale',
      carrosserie: 'Carrosserie & Peinture',
      pneumatique: 'Pneumatique & Parallélisme',
      'achat-vente': 'Achat / Vente de véhicule',
      autre: 'Autre demande',
    };

    const serviceLabel = serviceLabels[service as string] || service;

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
      from: import.meta.env.EMAIL_USER,
      to: recipientEmail,
      replyTo: email as string,
      subject: `[Devis] ${firstname} ${lastname} - ${serviceLabel}`,
      text: textContent,
      html: htmlContent,
    });

    // Optionnel: Envoyer une confirmation au client
    await transporter.sendMail({
      from: import.meta.env.EMAIL_USER,
      to: email as string,
      subject: 'Confirmation de votre demande de devis - Car Repair',
      html: `
        <h2>Merci pour votre demande ${firstname} !</h2>
        <p>Nous avons bien reçu votre demande de devis pour <strong>${serviceLabel}</strong>.</p>
        <p>Notre équipe vous répondra sous <strong>24 heures ouvrées</strong> au numéro <strong>${phone}</strong> ou par email.</p>
        <p>À bientôt !</p>
        <hr>
        <p><strong>Car Repair</strong><br>
        34 Rue Adolphe Coll<br>
        31300 Toulouse<br>
        Tél : 05 62 83 74 29</p>
      `,
      text: `Merci pour votre demande ${firstname}!\n\nNous avons bien reçu votre demande de devis pour ${serviceLabel}.\n\nNotre équipe vous répondra sous 24 heures ouvrées au numéro ${phone} ou par email.\n\nÀ bientôt!`,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Votre demande a été envoyée avec succès!',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);

    return new Response(
      JSON.stringify({
        error: 'Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
