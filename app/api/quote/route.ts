import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

type NeedKey = "purchase" | "rental" | "quality" | "cleaning" | "mix";

type QuotePayload = {
  // pré-remplis depuis l’URL
  product?: string; // slug
  pb?: string;
  size?: string;

  needs: NeedKey[];
  quantity?: number;
  notes?: string;
  address?: string;
  deadline?: string;

  company: string;
  contact: string;
  email: string;
  phone?: string;

  // bonus (facultatif) si tu veux passer le titre direct depuis le front
  productTitle?: string;
};

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function needsLabel(needs: NeedKey[]) {
  const map: Record<NeedKey, string> = {
    purchase: "Achat",
    rental: "Location",
    quality: "Contrôle & blindage",
    cleaning: "Nettoyage",
    mix: "Mix",
  };
  return (needs || []).map((n) => map[n]).join(", ") || "—";
}

function renderQuoteEmailAdmin(data: QuotePayload) {
  const product = data.productTitle || data.product || "—";
  const pb = data.pb || "—";
  const size = data.size || "—";

  const rows: Array<[string, string]> = [
    ["Produit", product],
    ["Équivalence Pb", pb],
    ["Taille", size],
    ["Besoin", needsLabel(data.needs)],
    ["Quantité", data.quantity ? String(data.quantity) : "—"],
    ["Délai", data.deadline || "—"],
    ["Établissement", data.company || "—"],
    ["Contact", data.contact || "—"],
    ["Email", data.email || "—"],
    ["Téléphone", data.phone || "—"],
    ["Adresse", data.address || "—"],
  ];

  const notes = data.notes?.trim() ? escapeHtml(data.notes.trim()) : "—";

  return `<!doctype html>
<html>
  <body style="margin:0;background:#F7F9FC;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:720px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid rgba(17,45,77,0.12);border-radius:20px;overflow:hidden;">
        <div style="padding:18px 20px;background:linear-gradient(180deg,#fff,#F7F9FC);">
          <div style="font-size:12px;letter-spacing:.22em;font-weight:800;color:rgba(17,45,77,.55);">
            NOUVELLE DEMANDE DE DEVIS
          </div>
          <div style="margin-top:8px;font-size:18px;font-weight:800;color:#112D4D;">
            Devis en ligne
          </div>
          <div style="margin-top:10px;height:2px;width:140px;border-radius:999px;background:#C9B37E;"></div>
        </div>

        <div style="padding:18px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows
              .map(
                ([k, v], idx) => `
              <tr>
                <td style="padding:10px 0;font-weight:800;color:#112D4D;font-size:13px;white-space:nowrap;">${escapeHtml(
                  k
                )}</td>
                <td style="padding:10px 0;color:#4B5563;font-size:13px;text-align:right;">${escapeHtml(
                  v
                )}</td>
              </tr>
              ${
                idx !== rows.length - 1
                  ? `<tr><td colspan="2"><div style="height:1px;width:75%;margin-left:auto;background:rgba(201,179,126,.45);"></div></td></tr>`
                  : ""
              }
            `
              )
              .join("")}
          </table>

          <div style="margin-top:18px;">
            <div style="font-size:12px;letter-spacing:.18em;font-weight:800;color:rgba(17,45,77,.55);">
              COMMENTAIRE
            </div>
            <div style="margin-top:8px;padding:12px 14px;border-radius:16px;background:#F7F9FC;border:1px solid rgba(17,45,77,0.10);color:#4B5563;font-size:13px;line-height:1.55;">
              ${notes.replaceAll("\n", "<br/>")}
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:12px;color:rgba(17,45,77,.55);font-size:12px;">
        Email généré automatiquement depuis le formulaire de devis.
      </div>
    </div>
  </body>
</html>`;
}

function renderQuoteEmailClient(data: QuotePayload) {
  const product = data.productTitle || data.product || "—";
  const pb = data.pb || "—";
  const size = data.size || "—";

  return `<!doctype html>
<html>
  <body style="margin:0;background:#F7F9FC;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:720px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid rgba(17,45,77,0.12);border-radius:20px;overflow:hidden;">
        <div style="padding:18px 20px;background:linear-gradient(180deg,#fff,#F7F9FC);">
          <div style="font-size:12px;letter-spacing:.22em;font-weight:800;color:rgba(17,45,77,.55);">
            CONFIRMATION
          </div>
          <div style="margin-top:8px;font-size:18px;font-weight:800;color:#112D4D;">
            Nous avons bien reçu votre demande
          </div>
          <div style="margin-top:10px;height:2px;width:140px;border-radius:999px;background:#C9B37E;"></div>
        </div>

        <div style="padding:18px 20px;color:#4B5563;font-size:13px;line-height:1.6;">
          <p style="margin:0 0 10px 0;">
            Bonjour ${escapeHtml(data.contact || "")},<br/>
            Merci pour votre demande. Notre équipe revient vers vous au plus vite.
          </p>

          <div style="margin-top:14px;padding:12px 14px;border-radius:16px;background:#F7F9FC;border:1px solid rgba(17,45,77,0.10);">
            <div style="font-weight:800;color:#112D4D;">Récapitulatif</div>
            <div style="margin-top:8px;">
              <div><strong>Produit :</strong> ${escapeHtml(product)}</div>
              <div><strong>Équivalence Pb :</strong> ${escapeHtml(pb)}</div>
              <div><strong>Taille :</strong> ${escapeHtml(size)}</div>
              <div><strong>Besoin :</strong> ${escapeHtml(needsLabel(data.needs))}</div>
            </div>
          </div>

          <p style="margin:14px 0 0 0;">
            Cordialement,<br/>
            L’équipe
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as QuotePayload;

    // validation minimale (tu as déjà zod côté client)
    if (!data.email || !data.company || !data.contact || !data.needs?.length) {
      return NextResponse.json(
        { ok: false, error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MJ_APIKEY_PUBLIC;
    const apiSecret = process.env.MJ_APIKEY_PRIVATE;
    const fromEmail = process.env.MJ_FROM_EMAIL || "j.dhersin@hotmail.fr";
    const fromName = process.env.MJ_FROM_NAME || "Devis";
    const adminToEmail = process.env.MJ_ADMIN_EMAIL || "j.dhersin@hotmail.fr";

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { ok: false, error: "Mailjet non configuré (MJ_APIKEY_PUBLIC/PRIVATE)." },
        { status: 500 }
      );
    }

    const mailjet = Mailjet.apiConnect(apiKey, apiSecret);

    // Mailjet Send API v3.1 : .post('send', { version: 'v3.1' }).request({ Messages: [...] })
    // :contentReference[oaicite:1]{index=1}
    const subjectAdmin = `Nouveau devis — ${data.company}`;
    const subjectClient = `Confirmation de votre demande de devis`;

    const result = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          // 1) Email interne
          {
            From: { Email: fromEmail, Name: fromName },
            To: [{ Email: adminToEmail, Name: "Admin" }],
            ReplyTo: { Email: data.email, Name: data.contact },
            Subject: subjectAdmin,
            TextPart:
              `Nouveau devis\n\n` +
              `Produit: ${data.productTitle || data.product || "—"}\n` +
              `Pb: ${data.pb || "—"}\n` +
              `Taille: ${data.size || "—"}\n` +
              `Besoin: ${needsLabel(data.needs)}\n` +
              `Quantité: ${data.quantity ?? "—"}\n` +
              `Délai: ${data.deadline || "—"}\n` +
              `Entreprise: ${data.company}\n` +
              `Contact: ${data.contact}\n` +
              `Email: ${data.email}\n` +
              `Téléphone: ${data.phone || "—"}\n` +
              `Adresse: ${data.address || "—"}\n\n` +
              `Notes:\n${data.notes || "—"}`,
            HTMLPart: renderQuoteEmailAdmin(data),
            CustomID: `quote-admin-${Date.now()}`,
          },

          // 2) Email client
          {
            From: { Email: fromEmail, Name: fromName },
            To: [{ Email: data.email, Name: data.contact }],
            Subject: subjectClient,
            TextPart:
              `Bonjour ${data.contact},\n\n` +
              `Nous avons bien reçu votre demande de devis.\n` +
              `Produit: ${data.productTitle || data.product || "—"}\n` +
              `Pb: ${data.pb || "—"}\n` +
              `Taille: ${data.size || "—"}\n` +
              `Besoin: ${needsLabel(data.needs)}\n\n` +
              `Cordialement,\nL’équipe`,
            HTMLPart: renderQuoteEmailClient(data),
            CustomID: `quote-client-${Date.now()}`,
          },
        ],
      });

    return NextResponse.json({ ok: true, result: result?.body });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Erreur lors de l’envoi Mailjet." },
      { status: 500 }
    );
  }
}
