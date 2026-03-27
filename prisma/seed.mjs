import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  {
    slug: "depression-treatment",
    title: "Depression Treatment",
    category: "Adult Psychiatry",
    eyebrow: "Mood care",
    summary:
      "Evaluation and treatment plans for clinical depression, dysthymia, burnout, grief-related low mood, and postpartum emotional distress.",
    description:
      "Soumanasya Clinic positions depression care as more than symptom control. The current clinic website highlights custom-tailored recovery plans for clinical depression, postpartum depression, and dysthymia, delivered through a biopsychosocial approach.\n\nThis service is suited to people experiencing persistent sadness, exhaustion, loss of interest, reduced concentration, hopelessness, or emotional shutdown. Treatment may combine psychiatric assessment, medication planning where needed, counselling, and ongoing follow-up.",
    focusAreas:
      "Clinical depression\nPostpartum depression\nDysthymia\nFatigue and low motivation\nGrief-linked mood changes",
    careIncludes:
      "Detailed psychiatric consultation\nRisk and symptom severity review\nMedication planning when appropriate\nTherapy and counselling integration\nRelapse-prevention follow-up",
    bestFor:
      "Adults with prolonged sadness\nPeople struggling to function at work or home\nPatients seeking a second opinion on antidepressant care",
    seoTitle:
      "Depression Treatment in Navi Mumbai | Soumanasya Clinic",
    seoDescription:
      "Evidence-based depression treatment in Navi Mumbai for clinical depression, postpartum depression, and related mood concerns.",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "anxiety-stress-management",
    title: "Anxiety and Stress Management",
    category: "Adult Psychiatry",
    eyebrow: "Anxiety care",
    summary:
      "Care plans for generalised anxiety, panic attacks, social anxiety, stress overload, and associated sleep or behavioural symptoms.",
    description:
      "The clinic's published services explicitly include anxiety and stress management, with focused care for generalised anxiety disorder, panic attacks, and social anxiety. Consultations are designed to identify the pattern behind physical tension, racing thoughts, irritability, avoidance, and exhaustion.\n\nCare may include psychiatric review, counselling, behavioural guidance, and medication management where clinically indicated. The goal is not only short-term calm but reliable day-to-day functioning.",
    focusAreas:
      "Generalised anxiety disorder\nPanic attacks\nSocial anxiety\nStress overload\nPhysical symptoms of anxiety",
    careIncludes:
      "Clinical evaluation and diagnosis\nTrigger mapping and symptom monitoring\nStructured counselling support\nMedication review when needed\nSleep and routine guidance",
    bestFor:
      "Adults with constant worry\nPeople dealing with panic episodes\nPatients avoiding work, travel, or social settings because of anxiety",
    seoTitle:
      "Anxiety Treatment in Navi Mumbai | Panic and Stress Support",
    seoDescription:
      "Specialised support for anxiety, panic attacks, social anxiety, and stress-related symptoms at Soumanasya Clinic.",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "bipolar-schizophrenia-care",
    title: "Bipolar and Serious Mental Illness Care",
    category: "Adult Psychiatry",
    eyebrow: "Complex psychiatry",
    summary:
      "Comprehensive management for bipolar disorder, schizophrenia, mood instability, and other severe psychiatric conditions.",
    description:
      "The clinic's website lists bipolar disorder, schizophrenia, and mood swings among its core specialisations. This service focuses on accurate diagnosis, medication planning, relapse prevention, and family-informed care for complex psychiatric presentations.\n\nConsultations aim to stabilise acute concerns, maintain continuity of treatment, and support long-term functioning while respecting privacy and dignity.",
    focusAreas:
      "Bipolar disorder\nSchizophrenia\nMood swings\nPsychotic symptoms\nRelapse prevention",
    careIncludes:
      "Diagnostic clarification\nMedication monitoring and optimisation\nFamily education and support\nRoutine follow-up planning\nFunctional recovery focus",
    bestFor:
      "Patients needing ongoing psychiatric monitoring\nFamilies seeking structured care plans\nIndividuals needing second opinions for complex diagnoses",
    seoTitle:
      "Bipolar and Schizophrenia Treatment in Navi Mumbai",
    seoDescription:
      "Structured psychiatric care for bipolar disorder, schizophrenia, and severe mood symptoms in Navi Mumbai.",
    featured: false,
    sortOrder: 3,
  },
  {
    slug: "child-adolescent-psychiatry",
    title: "Child and Adolescent Psychiatry",
    category: "Child and Family",
    eyebrow: "Young minds",
    summary:
      "Specialised support for ADHD, autism-related concerns, emotional regulation issues, and childhood developmental challenges.",
    description:
      "Soumanasya Clinic identifies child psychiatry as a major service line, including ADHD, autism, and childhood developmental issues. The goal is early, thoughtful assessment that considers behaviour, learning, family context, and developmental history.\n\nCare can include psychiatric consultation, behavioural guidance, parental counselling, and coordination with psychological assessments when needed.",
    focusAreas:
      "ADHD\nAutism-related concerns\nDevelopmental issues\nBehavioural difficulties\nAdolescent emotional challenges",
    careIncludes:
      "Development-focused consultation\nParent guidance\nSchool and routine concerns review\nBehavioural management planning\nReferral for testing when indicated",
    bestFor:
      "Children with attention or behavioural concerns\nAdolescents needing emotional support\nFamilies looking for structured developmental guidance",
    seoTitle:
      "Child Psychiatrist in Navi Mumbai | ADHD and Development Support",
    seoDescription:
      "Child and adolescent psychiatry services for ADHD, developmental concerns, behaviour issues, and family guidance.",
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "deaddiction-support",
    title: "Deaddiction and Substance Use Support",
    category: "Specialised Care",
    eyebrow: "Recovery care",
    summary:
      "Integrated psychiatric support for alcohol and drug addiction with medical, psychological, and family-aware planning.",
    description:
      "The clinic's About page specifically mentions addiction medicine and treatment for alcohol and drug addiction. This service is designed for people who need structured psychiatric oversight during early recovery, relapse prevention, and stabilisation.\n\nTreatment planning can involve psychiatric consultation, craving and withdrawal monitoring, counselling support, and family involvement where helpful.",
    focusAreas:
      "Alcohol dependence\nDrug addiction\nCraving management\nRelapse prevention\nFamily support during recovery",
    careIncludes:
      "Substance use history assessment\nMental health review alongside addiction concerns\nMedication planning where appropriate\nCounselling referral and follow-up\nRecovery-support check-ins",
    bestFor:
      "Adults seeking a confidential start to treatment\nFamilies managing ongoing relapse cycles\nPatients needing psychiatric support alongside counselling",
    seoTitle:
      "Deaddiction Treatment in Navi Mumbai | Alcohol and Drug Support",
    seoDescription:
      "Comprehensive psychiatric support for alcohol and drug addiction treatment at Soumanasya Clinic in Navi Mumbai.",
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "neuropsychiatry-consultation",
    title: "Neuropsychiatry Consultation",
    category: "Specialised Care",
    eyebrow: "Brain and behaviour",
    summary:
      "Consultation for psychiatric symptoms that overlap with neurological, behavioural, or cognitive concerns.",
    description:
      "Soumanasya Clinic presents itself as a neuropsychiatry centre and highlights comprehensive neuropsychiatric care under one roof. This service is appropriate when emotional, behavioural, and cognitive symptoms need a broader clinical lens.\n\nThe consultation focuses on history, symptoms, functioning, and coordinated care planning so patients receive clear direction on next steps.",
    focusAreas:
      "Behavioural changes\nCognitive concerns\nMood symptoms with neuropsychiatric overlap\nComplex diagnostic review\nWhole-person assessment",
    careIncludes:
      "Comprehensive consultation\nClinical history review\nFunctional assessment\nGuidance on treatment sequencing\nReferral coordination when needed",
    bestFor:
      "Patients with mixed emotional and behavioural symptoms\nFamilies seeking clearer diagnostic direction\nPeople who want a wider neuropsychiatric review",
    seoTitle:
      "Neuropsychiatry Consultation in Navi Mumbai | Soumanasya Clinic",
    seoDescription:
      "Comprehensive neuropsychiatric consultation for complex emotional, behavioural, and cognitive concerns.",
    featured: false,
    sortOrder: 6,
  },
  {
    slug: "psychometric-testing",
    title: "Psychometric Testing",
    category: "Assessment",
    eyebrow: "Diagnostics",
    summary:
      "Structured psychological assessments for IQ, behavioural patterns, developmental concerns, personality, and functional abilities.",
    description:
      "Psychometric testing is one of the clinic's prominently listed services. The current website names IQ assessment, autism evaluation, ADHD assessment, Vineland testing, personality assessment, Rorschach testing, and apperception-based evaluations among the tools used by the team.\n\nThis service helps convert vague concerns into measurable findings that can guide diagnosis, school recommendations, therapy planning, or longer-term treatment decisions.",
    focusAreas:
      "IQ assessment\nAutism evaluation\nADHD assessment\nPersonality assessment\nFunctional and developmental testing",
    careIncludes:
      "Case history and testing plan\nStandardised assessments\nInterpretation and reporting\nFeedback session with recommendations\nUse in therapy or psychiatry planning",
    bestFor:
      "Children needing developmental assessment\nAdults needing diagnostic clarity\nFamilies or schools seeking structured evaluation feedback",
    seoTitle:
      "Psychometric Testing in Navi Mumbai | Soumanasya Clinic",
    seoDescription:
      "Psychometric testing for ADHD, autism-related concerns, IQ, personality, and behavioural assessment in Navi Mumbai.",
    featured: true,
    sortOrder: 7,
  },
  {
    slug: "group-therapy-sessions",
    title: "Group Therapy Sessions",
    category: "Therapy",
    eyebrow: "Shared healing",
    summary:
      "Therapist-led group work designed to build emotional insight, social support, and healthier coping in a guided setting.",
    description:
      "Group therapy sessions are listed by the clinic as a dedicated service and align closely with the counselling team's experience in group interventions. These sessions are intended to create a structured space where participants can learn, reflect, and build resilience together.\n\nThe exact format can vary by cohort and concern, but the emphasis remains on facilitated, respectful, goal-oriented group work.",
    focusAreas:
      "Shared emotional support\nGuided group reflection\nInterpersonal learning\nCoping skill development\nStructured psychological support",
    careIncludes:
      "Therapist-facilitated sessions\nGroup process guidance\nEmotional skill building\nSupportive peer environment\nFollow-up recommendations",
    bestFor:
      "People who benefit from shared therapeutic settings\nPatients looking for ongoing emotional support\nClients open to learning with peers in a guided format",
    seoTitle:
      "Group Therapy Sessions in Navi Mumbai | Soumanasya Clinic",
    seoDescription:
      "Therapist-led group therapy sessions focused on emotional support, resilience, and guided psychological care.",
    featured: true,
    sortOrder: 8,
  },
  {
    slug: "home-visit-psychiatry",
    title: "Home Visit Psychiatry",
    category: "Access and Outreach",
    eyebrow: "At-home care",
    summary:
      "Psychiatric consultation at home for patients who need in-person evaluation but cannot easily visit the clinic.",
    description:
      "Home visits are listed as a core service on the clinic website. This option is valuable for patients whose symptoms, age, mobility, or family circumstances make travel difficult.\n\nThe service is designed to improve access to psychiatric evaluation while keeping care clinically grounded and family-aware. Home visits can support assessment, medication review, and practical planning for ongoing treatment.",
    focusAreas:
      "Reduced mobility or travel difficulty\nHome-based psychiatric assessment\nFamily-supported consultation\nContinuity for high-need patients\nPractical access to care",
    careIncludes:
      "In-person evaluation at residence\nCurrent symptom review\nMedication and history review\nFamily input when relevant\nFollow-up plan for ongoing care",
    bestFor:
      "Older adults or high-dependency patients\nFamilies needing a first consultation at home\nPatients unable to attend clinic easily",
    seoTitle:
      "Psychiatric Home Visit in Navi Mumbai | Soumanasya Clinic",
    seoDescription:
      "Home visit psychiatry services in Navi Mumbai for patients who need accessible, family-aware psychiatric consultation.",
    featured: true,
    sortOrder: 9,
  },
  {
    slug: "relationship-family-therapy",
    title: "Relationship and Family Therapy",
    category: "Child and Family",
    eyebrow: "Family systems",
    summary:
      "Support for marital strain, couple conflict, family communication issues, and emotionally difficult home environments.",
    description:
      "The clinic explicitly mentions couples counselling, individual and family therapy, relationship therapy, family therapy, and marital difficulties. This service addresses patterns that affect wellbeing at home, not just individual symptoms.\n\nCare focuses on safer communication, practical problem solving, emotional understanding, and alignment around next steps.",
    focusAreas:
      "Marital difficulties\nCouple conflict\nFamily stress\nCommunication breakdowns\nSupportive counselling around relationships",
    careIncludes:
      "Therapeutic assessment of relationship concerns\nJoint or family sessions where appropriate\nConflict pattern review\nActionable communication work\nReferral coordination when needed",
    bestFor:
      "Couples under chronic strain\nFamilies affected by mental health stress\nPatients whose recovery depends on home-system support",
    seoTitle:
      "Relationship and Family Therapy in Navi Mumbai",
    seoDescription:
      "Couples counselling, family therapy, and support for relationship difficulties at Soumanasya Clinic.",
    featured: false,
    sortOrder: 10,
  },
  {
    slug: "sleep-behavioural-disorders",
    title: "Sleep and Behavioural Disorders Care",
    category: "Specialised Care",
    eyebrow: "Daily functioning",
    summary:
      "Assessment of sleep-related problems and behavioural concerns that interfere with emotional stability and routine functioning.",
    description:
      "The clinic's website references sleep disorders and behavioural issues among the problems it helps assess and manage. Sleep disruption often overlaps with anxiety, depression, stress, and mood instability, so this service takes a broader clinical view instead of treating sleep in isolation.\n\nCare planning focuses on symptom patterns, habits, psychiatric overlap, and a realistic treatment path.",
    focusAreas:
      "Sleep disturbance\nBehavioural issues\nRoutine disruption\nStress-linked sleep concerns\nPsychiatric overlap with poor sleep",
    careIncludes:
      "Sleep and behaviour history review\nPsychiatric evaluation\nPattern identification\nTreatment planning\nFollow-up for routine stabilisation",
    bestFor:
      "Adults with persistent sleep disruption\nParents managing behavioural difficulties\nPatients whose mood worsens with poor sleep",
    seoTitle:
      "Sleep and Behavioural Disorder Treatment in Navi Mumbai",
    seoDescription:
      "Clinical support for sleep disorders, behavioural issues, and routine disruption at Soumanasya Clinic.",
    featured: false,
    sortOrder: 11,
  },
  {
    slug: "trauma-ptsd-support",
    title: "Trauma and PTSD Support",
    category: "Therapy",
    eyebrow: "Trauma care",
    summary:
      "Trauma-informed psychological support for distress linked to painful life events, chronic overwhelm, or post-traumatic symptoms.",
    description:
      "Trauma and PTSD are listed in the clinic's service overview, and the counselling team highlights trauma-focused work, somatic techniques, mindfulness, self-compassion, and evidence-based approaches. This service supports patients who feel stuck in survival mode, fear, avoidance, or emotional shutdown.\n\nTreatment plans are built to feel safe, paced, and clinically thoughtful rather than rushed.",
    focusAreas:
      "Trauma recovery\nPTSD symptoms\nHypervigilance and avoidance\nBody-based distress\nEmotional overwhelm",
    careIncludes:
      "Trauma-informed assessment\nCounselling support\nMindfulness and grounding strategies\nPaced recovery planning\nIntegrated referral with psychiatry when needed",
    bestFor:
      "Patients affected by past traumatic experiences\nPeople with ongoing fear, shutdown, or flashback-like symptoms\nClients looking for a safer therapeutic pace",
    seoTitle:
      "Trauma Therapy and PTSD Support in Navi Mumbai",
    seoDescription:
      "Trauma-informed therapy and psychiatric support for PTSD symptoms and emotional overwhelm in Navi Mumbai.",
    featured: false,
    sortOrder: 12,
  },
  {
    slug: "sexual-health-counselling",
    title: "Sexual Health Counselling",
    category: "Adult Psychiatry",
    eyebrow: "Private guidance",
    summary:
      "Confidential support for sexual health concerns in a respectful psychiatric and counselling setting.",
    description:
      "The clinic specifically states that patients can seek professional sexual health guidance and describes Dr. Chetan Vispute as a sexologist in Navi Mumbai. This service is designed to support people who need a private clinical conversation around sexual wellbeing, distress, confidence, or relationship-linked concerns.\n\nConsultations are intended to be respectful, confidential, and tailored to the person's concerns.",
    focusAreas:
      "Confidential sexual health concerns\nRelationship-linked distress\nEmotional impact of sexual difficulties\nPsychiatric review where relevant\nSensitive guidance in a clinical setting",
    careIncludes:
      "Private consultation\nContext and symptom review\nGuidance tailored to the concern\nReferral or therapy planning when indicated\nConfidential follow-up",
    bestFor:
      "Adults seeking discreet clinical support\nCouples affected by sexual health concerns\nPatients wanting a psychiatric perspective with privacy",
    seoTitle:
      "Sexologist in Navi Mumbai | Sexual Health Counselling",
    seoDescription:
      "Confidential sexual health counselling and psychiatric guidance at Soumanasya Clinic in Navi Mumbai.",
    featured: false,
    sortOrder: 13,
  },
];

const teamMembers = [
  {
    slug: "dr-chetan-vispute",
    name: "Dr. Chetan Vispute",
    role: "Consultant Psychiatrist and Counsellor",
    credentials: "MD, DNB, MNAMS, Psychiatry",
    bio:
      "Dr. Chetan Vispute leads Soumanasya Clinic with a biopsychosocial approach to psychiatric care. The clinic's About page notes his training at Seth GS Medical College and KEM Hospital in Mumbai, his DNB in Psychiatry, and his work across adult psychiatry, addiction treatment, and child and adolescent mental health. He is also listed as a consultant neuropsychiatrist at the Institute of Psychological Health, Thane, and an assistant professor at Dr. D. Y. Patil Medical College, Navi Mumbai.",
    specialties:
      "Adult psychiatry\nAddiction treatment\nChild and adolescent psychiatry\nNeuropsychiatry\nSecond-opinion consultations",
    sortOrder: 1,
  },
  {
    slug: "eaishwarya-natekar",
    name: "Eaishwarya Natekar",
    role: "Psychologist",
    credentials: "Masters in Applied Psychology (Clinical)",
    bio:
      "Eaishwarya Natekar is presented on the clinic website as a psychologist with over 13 years of experience across different age groups. Her work includes psychological assessment, diagnosis support, therapy, and group interventions, with a strong emphasis on evidence-based practice and personalised care.",
    specialties:
      "Psychological assessments\nDiagnosis support\nIndividual therapy\nGroup interventions\nMulti-age counselling",
    sortOrder: 2,
  },
  {
    slug: "aparna-sengupta",
    name: "Aparna Sengupta",
    role: "Clinical and Counselling Psychologist",
    credentials: "MA, MPhil, RCI Licensed Clinical and Counselling Psychologist",
    bio:
      "Aparna Sengupta is described by the clinic as a Mumbai-based clinical psychologist who builds safe therapeutic spaces for growth and healing. Her approach blends trauma-focused work, cognitive behavioural therapy, somatic techniques, mindfulness, breathing practices, acceptance, self-compassion, and art-based methods depending on the client's needs.",
    specialties:
      "Trauma-focused therapy\nCBT\nMindfulness and breathing work\nSomatic techniques\nArt-based interventions",
    sortOrder: 3,
  },
];

const locations = [
  {
    slug: "vashi-clinic",
    name: "Vashi Clinic",
    address:
      "Shop No 6, Seba CHS, Plot 5A, Sector 16A, Swami Samarth Marg, Vashi, Navi Mumbai 400703",
    email: "drchetanvispute@gmail.com",
    phoneDisplay: "+91 70215 53187",
    phoneRaw: "+917021553187",
    hours: "1 PM to 4 PM, Monday to Saturday",
    neighbourhoods: "Vashi\nSanpada\nCBD Belapur\nNerul",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Shop+No+6+Seba+CHS+Plot+5A+Sector+16A+Swami+Samarth+Marg+Vashi+Navi+Mumbai+400703",
    sortOrder: 1,
  },
  {
    slug: "ulwe-clinic",
    name: "Ulwe Clinic",
    address:
      "Morya Netralaya, 1st Floor, Morya CHS, Plot 166, Sector 20, Ulwe, Navi Mumbai",
    email: "drchetanvispute@gmail.com",
    phoneDisplay: "+91 70215 53187",
    phoneRaw: "+917021553187",
    hours: "7 PM to 9 PM, Monday to Saturday",
    neighbourhoods: "Ulwe\nSeawoods\nPanvel access belt\nSouth Navi Mumbai",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Morya+Netralaya+1st+Floor+Morya+CHS+Plot+166+Sector+20+Ulwe+Navi+Mumbai",
    sortOrder: 2,
  },
];

const testimonials = [
  {
    slug: "testimonial-polite-care",
    authorLabel: "Patient review",
    quote:
      "Patients describe the clinic as polite, patient, and strongly focused on listening before advising.",
    sortOrder: 1,
  },
  {
    slug: "testimonial-medication-approach",
    authorLabel: "Patient review",
    quote:
      "One review specifically praises the clinic for a measured medication approach and a non-commercial attitude.",
    sortOrder: 2,
  },
  {
    slug: "testimonial-counselling-response",
    authorLabel: "Patient review",
    quote:
      "Several testimonials note positive counselling support and a sense of being treated with dignity throughout care.",
    sortOrder: 3,
  },
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { slug: member.slug },
      update: member,
      create: member,
    });
  }

  for (const location of locations) {
    await prisma.location.upsert({
      where: { slug: location.slug },
      update: location,
      create: location,
    });
  }

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { slug: testimonial.slug },
      update: testimonial,
      create: testimonial,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
