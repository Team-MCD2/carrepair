import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// Configuration du transporteur email
const getTransporter = () => {
  const emailUser = 'bbobou95@gmail.com';
  const emailPassword = 'tpnh jswj pumh tpaz';
  const emailService = 'gmail';

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
    const data = await request.json();

    // Récupérer les données du formulaire
    const lastname = data.lastname;
    const firstname = data.firstname;
    const email = data.email;
    const phone = data.phone;
    const service = data.service;
    const message = data.message;

    // Valider les champs obligatoires
    if (!lastname || !firstname || !email || !phone || !service || !message) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs obligatoires doivent être remplis' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Récupérer l'adresse email cible
    const recipientEmail = 'mwcrea.agency@gmail.com';

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
      from: 'bbobou95@gmail.com',
      to: recipientEmail,
      replyTo: email as string,
      subject: `[Devis] ${firstname} ${lastname} - ${serviceLabel}`,
      text: textContent,
      html: htmlContent,
    });

    // Optionnel: Envoyer une confirmation au client
    await transporter.sendMail({
      from: 'bbobou95@gmail.com',
      to: email as string,
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

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Votre demande de devis a bien été prise en compte. Notre équipe vous recontactera dans les plus brefs délais.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);

    return new Response(
      JSON.stringify({
        error: 'Une erreur est survenue lors de la transmission de votre demande. Veuillez réessayer ou nous contacter directement par téléphone.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
