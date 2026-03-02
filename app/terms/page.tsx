import Navbar from "@/components/layout/Navbar";

export default function TermsPage() {
  const highlights = [
    {
      title: "Transparent Investment Model",
      desc: "Investors can contribute any amount and track property status, contribution share, and returns in real-time.",
    },
    {
      title: "Guaranteed Principal Protection",
      desc: "In case of loss, investors still receive their original investment in full through Hive's security mechanism.",
    },
    {
      title: "Defined Profit Sharing",
      desc: "On successful sale, profits are distributed at 25% to Hive Construction Ventures and 75% to investors.",
    },
  ];

  const termsCards = [
    {
      title: "Account Access & Verification",
      points: [
        "Investor registration requires system verification and approval.",
        "Login credentials are provided only after successful verification.",
        "Users are responsible for maintaining account credential confidentiality.",
      ],
    },
    {
      title: "Investment & Exit Policy",
      points: [
        "If home is sold before one year, profit is distributed immediately (25% Hive, 75% investors).",
        "If not sold within one year, investors receive principal plus share based on market value.",
        "If withdrawal happens before one year or before sale, only original investment is returned.",
      ],
    },
    {
      title: "Loss Handling & Security",
      points: [
        "If property sells below cost, investor principal remains protected.",
        "Hive Construction Ventures bears project loss where applicable.",
        "Admin maintains cheque-based security records for investment protection.",
      ],
    },
    {
      title: "Admin Platform Rights",
      points: [
        "Admin can manage property listings, investment records, and reports.",
        "Admin controls profit calculations and investor activity tracking.",
        "Hive may update terms as business/legal requirements evolve.",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-transparent z-10" />
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: 'url("terms-and-conditions.jpg")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          </div>

          <div className="relative z-20 px-6 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-white/85 max-w-2xl mx-auto text-base sm:text-lg">
              Hive Construction Ventures Advisor System
            </p>
            <p className="text-white/70 text-sm mt-3">Effective Date: March 2, 2026</p>
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 bg-secondary/10 text-center">
          <h2 className="text-3xl font-bold mb-12">Key Principles</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {highlights.map((item) => (
              <div key={item.title} className="p-6 bg-card rounded-xl shadow-md">
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Detailed Terms</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {termsCards.map((card) => (
              <div key={card.title} className="p-6 bg-card rounded-xl shadow-md text-left">
                <h3 className="font-semibold text-xl mb-3">{card.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using this platform, you confirm that you have read and accepted these Terms &amp;
              Conditions. Hive Construction Ventures reserves the right to update these terms at any
              time. Continued use of the system means acceptance of the latest version.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
