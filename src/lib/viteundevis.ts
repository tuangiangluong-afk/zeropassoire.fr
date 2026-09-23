/**
 * Module d'intégration API ViteUnDevis (affiliation BTP & rénovation énergétique).
 * 
 * SÉCURITÉ ANTI-SPAM STRICTE :
 * - N'envoie JAMAIS à l'API externe si VITEUNDEVIS_ENABLED !== "true"
 * - N'envoie JAMAIS si VITEUNDEVIS_TEST_MODE === "true" ou si l'email est un email de test
 * - Permet de tester les formulaires en toute sécurité sans polluer les partenaires.
 */

export interface ViteUnDevisLead {
  email: string;
  phone?: string | null;
  postalCode: string;
  typeLogement: "maison" | "appartement";
  statut: "occupant" | "bailleur";
  surface: number;
  classeDpe: "E" | "F" | "G";
  leadId?: string | number;
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
  const endpoint = process.env.VITEUNDEVIS_ENDPOINT || "https://affil.viteundevis.com/api/lead.php";

  // Garde-fou 1 : Désactivé ou clé manquante
  if (!isEnabled || !apiKey) {
    return {
      sent: false,
      skipped: "disabled_or_missing_api_key",
    };
  }

  // Garde-fou 2 : Téléphone absent (les régies refusent les leads sans numéro)
  if (!lead.phone) {
    return {
      sent: false,
      skipped: "phone_required_by_partner",
    };
  }

  // Garde-fou 3 : Mode test actif ou lead de test détecté -> Ne jamais spammer l'API externe
  if (isTestMode || isTestLead(lead.email, lead.phone)) {
    console.log("[zeropassoire][ViteUnDevis][TEST_MODE_GUARD] Lead intercepté sans envoi API:", {
      email: lead.email,
      phone: lead.phone,
      cp: lead.postalCode,
      classe: lead.classeDpe,
    });
    return {
      sent: false,
      skipped: "test_mode_intercepted_no_network_call",
    };
  }

  // Mapping des catégories travaux selon la classe et le type de bien
  const categorieTravaux =
    lead.typeLogement === "maison"
      ? "pompe_a_chaleur_isolation"
      : "renovation_appartement_isolation";

  const payload = {
    api_key: apiKey,
    affiliate_id: process.env.VITEUNDEVIS_AFFILIATE_ID || "zeropassoire",
    lead_id: String(lead.leadId || Date.now()),
    email: lead.email,
    tel: lead.phone,
    code_postal: lead.postalCode,
    type_bien: lead.typeLogement === "maison" ? "Maison" : "Appartement",
    statut_occupant: lead.statut === "bailleur" ? "Proprietaire Non Occupant" : "Proprietaire",
    surface_m2: lead.surface,
    classe_actuelle: lead.classeDpe,
    categorie: categorieTravaux,
    provenance: "zeropassoire.fr",
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("[zeropassoire][ViteUnDevis][API_ERROR]", res.status, data);
      return { sent: true, success: false, error: `HTTP_${res.status}`, partnerResponse: data };
    }

    return { sent: true, success: true, partnerResponse: data };
  } catch (err) {
    console.error("[zeropassoire][ViteUnDevis][FETCH_ERROR]", err);
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
}
