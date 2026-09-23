import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const schema = {
    openapi: "3.1.0",
    info: {
      title: "Zéro Passoire API",
      version: "1.0.0",
      description:
        "Spécification OpenAPI officielle pour simulateurs, calculateurs d'aides et agents d'IA spécialisés dans la rénovation énergétique (MaPrimeRénov', CEE, DPE 2026).",
      contact: {
        name: "Équipe Zéro Passoire",
        email: "contact@zeropassoire.fr",
        url: "https://www.zeropassoire.fr",
      },
    },
    servers: [
      {
        url: "https://www.zeropassoire.fr",
        description: "Serveur de production",
      },
    ],
    paths: {
      "/api/leads": {
        post: {
          summary: "Enregistrer une simulation de sortie de passoire thermique",
          operationId: "submitRenovationLead",
          description:
            "Transmet les paramètres d'un logement (surface, classe DPE actuelle, énergie de chauffage, niveau de revenus) et déclenche le plan de sortie chiffré.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string", format: "email", description: "Email du propriétaire" },
                    dpe: { type: "string", enum: ["E", "F", "G"], description: "Étiquette DPE actuelle" },
                    surface: { type: "number", description: "Surface habitable en m²" },
                    typeBien: { type: "string", enum: ["maison", "appartement"], description: "Typologie du bien" },
                    energie: { type: "string", description: "Énergie principale de chauffage actuelle" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Simulation enregistrée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      ok: { type: "boolean", example: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(schema, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
    },
  });
}
