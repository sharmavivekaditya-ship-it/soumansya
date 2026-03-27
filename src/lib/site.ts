export const siteConfig = {
  name: "Soumanasya Clinic",
  legalName: "Soumanasya Psychiatry Clinic and Counselling Centre",
  domain: "https://navimumbaipsychiatryclinic.com",
  phoneDisplay: "+91 70215 53187",
  phoneRaw: "+917021553187",
  email: "drchetanvispute@gmail.com",
  city: "Navi Mumbai",
  region: "Maharashtra",
  foundedYear: 2014,
  primaryKeyword: "Psychiatrist in Navi Mumbai",
  heroTitle:
    "Quiet authority. Deep listening. Psychiatry care designed for modern Indian families.",
  heroCopy:
    "Consultant-led psychiatry, psychology, psychometric testing, child guidance, deaddiction support, home visits, and structured follow-up from clinics in Vashi and Ulwe.",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export const faqEntries = [
  {
    question: "What conditions does Soumanasya Clinic commonly support?",
    answer:
      "The clinic website highlights depression, anxiety, panic, bipolar disorder, schizophrenia, ADHD, autism-related concerns, addiction, sleep problems, behavioural issues, trauma, and relationship difficulties.",
  },
  {
    question: "Does the clinic offer care for children and adolescents?",
    answer:
      "Yes. Child psychiatry is one of the clinic's published specialties, including ADHD, developmental concerns, and emotional or behavioural difficulties in younger patients.",
  },
  {
    question: "Are appointments available at more than one location?",
    answer:
      "Yes. The clinic currently lists a Vashi branch and an Ulwe branch, each with separate consultation hours.",
  },
  {
    question: "Can I request a home visit?",
    answer:
      "Yes. Home visit psychiatry is listed as one of the clinic's core services and is useful for patients who cannot easily travel to the clinic.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can call the clinic directly, send an email, or submit the enquiry form on the website to request an appointment or second opinion.",
  },
];

export const clinicMedia = {
  logo: "/clinic/soumanasya-logo.webp",
  team: {
    "dr-chetan-vispute": "/clinic/chetan-vispute.webp",
    "eaishwarya-natekar": "/clinic/eaishwarya-natekar.webp",
    "aparna-sengupta": "/clinic/aparna-sengupta.webp",
  },
  gallery: [
    {
      src: "/clinic/group-therapy.webp",
      alt: "Group therapy session visual from the clinic website",
      title: "Group therapy",
      copy: "Published by the clinic as one of its service visuals.",
    },
    {
      src: "/clinic/home-visit.webp",
      alt: "Home visit psychiatry visual from the clinic website",
      title: "Home visit psychiatry",
      copy: "Used on the clinic website for its outreach and access services.",
    },
  ],
} as const;
