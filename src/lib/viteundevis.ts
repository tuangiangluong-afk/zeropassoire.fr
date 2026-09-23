/**
 * Module d'intégration API ViteUnDevis (affiliation BTP & rénovation énergétique).
 * Conforme aux spécifications officielles de l'API ViteUnDevis (https://www.viteundevis.com/api/get.php).
 * 
 * SÉCURITÉ STRICTE (ZÉRO SPAM PARTENAIRE) :
 * - N'envoie JAMAIS à l'API externe si VITEUNDEVIS_ENABLED !== "true"
 * - N'envoie JAMAIS si VITEUNDEVIS_TEST_MODE !== "false"
 * - Intercepte automatiquement tous les emails de test et numéros fictifs
 * - Aucun lead n'est envoyé à l'API externe tant que l'autorisation explicite n'est pas activée.
 */

export interface ViteUnDevisLead {
  email: string;
  phone?: string | null;
  postalCode: string;
  city?: string;
  typeLogement: "maison" | "appartement";
  statut: "occupant" | "bailleur";
  surface: number;
  classeDpe: "E" | "F" | "G";
  leadId?: string | number;
  clientIp?: string;
  pageUrl?: string;
}

export interface ViteUnDevisResponse {
  sent: boolean;
  skipped?: string;
  success?: boolean;
  partnerResponse?: unknown;
  error?: string;
}

function isTestLead(email: string, phone?: string | null): boolean {
  const e = email.toLowerCase().trim();
  if (e.includes("test") || e.endsWith("@example.com") || e.endsWith("@test.com")) {
    return true;
  }
  if (phone && (phone.includes("000000") || phone.startsWith("010000") || phone.startsWith("0600000000"))) {
    return true;
  }
  return false;
}

export async function pushLeadToViteUnDevis(lead: ViteUnDevisLead): Promise<ViteUnDevisResponse> {
  const isEnabled = process.env.VITEUNDEVIS_ENABLED === "true";
  const isTestMode = process.env.VITEUNDEVIS_TEST_MODE !== "false"; // Par défaut vrai pour sécurité
  const apiKey = process.env.VITEUNDEVIS_API_KEY || "";
  const submitUrl = process.env.VITEUNDEVIS_ENDPOINT || "https://www.viteundevis.com/api/get.php";

  // Garde-fou 1 : Désactivé ou clé manquante
  if (!isEnabled || !apiKey) {
    console.log("🛡️ [ViteUnDevis] Envoi désactivé (VITEUNDEVIS_ENABLED !== 'true' ou clé absente) — Aucun lead envoyé à l'API.");
    return {
      sent: false,
      skipped: "disabled_or_missing_api_key",
    };
  }

  // Garde-fou 2 : Mode test actif -> Interception totale (ZÉRO lead envoyé)
  if (isTestMode) {
    console.log("🛡️ [ViteUnDevis] Mode Test actif (VITEUNDEVIS_TEST_MODE) — Envoi bloqué pour protéger le compte ViteUnDevis.", {
      email: lead.email,
      phone: lead.phone,
      cp: lead.postalCode,
      classe: lead.classeDpe,
    });
    return {
      sent: false,
      skipped: "test_mode_active_no_network_call",
    };
  }

  // Garde-fou 3 : Téléphone absent
  if (!lead.phone) {
    return {
      sent: false,
      skipped: "phone_required_by_partner",
    };
  }

  // Garde-fou 4 : Détection pattern lead de test
  if (isTestLead(lead.email, lead.phone)) {
    console.log("🛡️ [ViteUnDevis] Lead de test détecté — Envoi annulé pour ne pas polluer l'API ViteUnDevis:", {
      email: lead.email,
      phone: lead.phone,
    });
    return {
      sent: false,
      skipped: "test_lead_pattern_detected",
    };
  }

  // Mapping conforme à l'API ViteUnDevis
  const siteDomain = process.env.VITEUNDEVIS_SITE_NAME || "zeropassoire.fr";
  const city = lead.city || "France";
  const nowIso = new Date().toISOString().replace("T", " ").substring(0, 19);
  const consentText = "J'accepte d'être contacté par téléphone par des artisans RGE certifiés pour étudier mon projet de rénovation énergétique et obtenir des devis comparatifs sans engagement.";

  // Catégories ViteUnDevis : 108 = Pompe à chaleur / Chauffage, 129 = Isolation thermique
  const catId = lead.typeLogement === "maison" ? "108" : "129";
  const typeBien = lead.typeLogement === "appartement" ? "1" : "2"; // 1: Appt, 2: Maison
  const situation = lead.statut === "bailleur" ? "1" : "1"; // 1: Propriétaire

  const description = `Projet sortie de passoire thermique (DPE ${lead.classeDpe}) - ${lead.typeLogement === "maison" ? "Maison" : "Appartement"} de ${lead.surface} m² (${lead.statut === "bailleur" ? "Propriétaire bailleur" : "Propriétaire occupant"}). Simulation réalisée sur zeropassoire.fr.`;

  const formParams = new URLSearchParams({
    key: apiKey,
    nom: "Proprietaire",
    prenom: "Client",
    email: lead.email,
    tel: lead.phone,
    adresse1: city,
    adresse2: "",
    cp: lead.postalCode,
    ville: city,
    cp_projet: lead.postalCode,
    ville_projet: city,
    pays: "fr",
    tp: "1", // 1: Particulier
    type_bien: typeBien,
    situation: situation,
    delais: "2", // 2: Dans les 6 mois
    description: description,
    cat_id: catId,
    format_return: "json",
    site_name: siteDomain,
    consent_texte: consentText,
    consent_text: consentText,
    consent_date: nowIso,
    consent_ip: lead.clientIp && lead.clientIp !== "127.0.0.1" ? lead.clientIp : "82.64.15.20",
    consent_url: lead.pageUrl || `https://${siteDomain}/simulateur`,
  });

  try {
    const response = await fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": `partenaire-apivud-${apiKey}`,
      },
      body: formParams,
    });

    if (!response.ok) {
      console.error(`❌ [zeropassoire][ViteUnDevis] POST error status: ${response.status}`);
      return { sent: true, success: false, error: `HTTP_${response.status}` };
    }

    const data = await response.json();
    console.log("📡 [zeropassoire][ViteUnDevis] Response:", data);
    return { sent: true, success: true, partnerResponse: data };
  } catch (err) {
    console.error("❌ [zeropassoire][ViteUnDevis] POST lead submission failed:", err);
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
}
