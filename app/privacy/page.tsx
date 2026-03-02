import Navbar from "@/components/layout/Navbar";

export default function PrivacyPolicyPage() {
  const privacyHighlights = [
    {
      title: "Data Transparency",
      desc: "We clearly explain what information is collected, why it is needed, and how it supports investor and property workflows.",
    },
    {
      title: "Secure Handling",
      desc: "Personal, investment, and transaction data is processed using controlled access and platform-level safeguards.",
    },
    {
      title: "Limited Sharing",
      desc: "We do not sell personal data. Information is shared only where required for operations, compliance, or approved services.",
    },
  ];

  const serviceDataUse = [
    {
      title: "Consulting",
      image: "consulting.jpg",
      points: [
        "We use contact and profile details to provide investment and property advisory support.",
        "Consultation records help us improve response quality and investor guidance.",
      ],
    },
    {
      title: "Renovation",
      image: "renovation.jpg",
      points: [
        "Project progress data is used to update timelines, costs, and investor visibility.",
        "Renovation-related updates may trigger notifications for relevant stakeholders.",
      ],
    },
    {
      title: "Construction",
      image: "construction.jpg",
      points: [
        "Investment and property development records are used for project management and reporting.",
        "Construction milestones are tracked to ensure transparent status and profit calculations.",
      ],
    },
    {
      title: "Restoration",
      image: "restoration.jpg",
      points: [
        "Restoration scope and property condition records are maintained for compliance and audit trails.",
        "Historical restoration data is used for quality checks and long-term asset documentation.",
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
              style={{ backgroundImage: 'url("privacy-policy.jpg")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          </div>

          <div className="relative z-20 px-6 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-white/85 max-w-2xl mx-auto text-base sm:text-lg">
              Hive Construction Ventures Advisor System
            </p>
            <p className="text-white/70 text-sm mt-3">Effective Date: March 2, 2026</p>
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 bg-secondary/10 text-center">
          <h2 className="text-3xl font-bold mb-12">Privacy Principles</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {privacyHighlights.map((item) => (
              <div key={item.title} className="p-6 bg-card rounded-xl shadow-md">
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How Data Is Used Across Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {serviceDataUse.map((service) => (
              <div key={service.title} className="bg-card rounded-xl shadow-md overflow-hidden text-left">
                <div
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url("${service.image}")` }}
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 md:px-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-card rounded-xl shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Privacy Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may request correction of account information, update profile details, and ask for
              clarification about how your data is processed. Continued use of this platform indicates
              acceptance of this Privacy Policy and any future updates.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
