import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <section className="py-16 bg-white min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Mentions l&eacute;gales</h1>
        <div className="prose-zeropassoire max-w-none space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Éditeur</h2>
            <p className="text-stone-700">
              Le pr&eacute;sent site est &eacute;dité par la soci&eacute;t&eacute; exploitant la marque
              <strong> z&eacute;ropassoire.fr</strong>. Identifiant SIRET et adresse du si&egrave;ge
              social disponibles sur simple demande via la page Contact (conform&eacute;ment &agrave;
              l'article 6 de la loi n&deg; 2004-575 pour la confiance dans l'&eacute;conomie num&eacute;rique).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Directeur de la publication</h2>
            <p className="text-stone-700">Le repr&eacute;sentant l&eacute;gal de la soci&eacute;t&eacute; &eacute;ditrice.</p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">H&eacute;bergement</h2>
            <p className="text-stone-700">
              Site h&eacute;berg&eacute; par Vercel Inc., 440 N Barranca Ave #1565, Covina, CA 91723, &Eacute;tats-Unis.
              Donn&eacute;es personnelles stock&eacute;es au sein de l'Union europ&eacute;enne (Supabase, Francfort).
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Nature du service</h2>
            <p className="text-stone-700">
              Z&eacute;ro Passoire est un site &eacute;ditorial et un simulateur ind&eacute;pendant &agrave; usage
              informatif. Il ne constitue ni un devis, ni un conseil personnalis&eacute;, ni un
              engagement contractuel. Les montants affich&eacute;s sont des estimations bas&eacute;es sur
              des bar&egrave;mes publics &agrave; ±15&nbsp;% pr&egrave;s.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-stone-900 mb-2">Propri&eacute;t&eacute; intellectuelle</h2>
            <p className="text-stone-700">
              L'ensemble des contenus (textes, code source, design, logo SVG) est prot&eacute;g&eacute;.
              Toute reproduction int&eacute;grale ou partielle sans autorisation &eacute;crite est interdite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
