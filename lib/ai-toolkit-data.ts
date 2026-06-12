// "The AI-Empowered Educator": a guided course on using Gemini, NotebookLM,
// and Google Classroom for CBC delivery. Content adapted into the app's data
// model; rendered by app/dashboard/ai-toolkit.

export type ToolName = 'Gemini' | 'NotebookLM' | 'Google Classroom'

export interface CompetencyDef {
  code: string
  name: string
}

export const AI_COMPETENCIES: CompetencyDef[] = [
  { code: 'CC',  name: 'Communication & Collaboration' },
  { code: 'CT',  name: 'Critical Thinking & Problem-Solving' },
  { code: 'CI',  name: 'Creativity & Imagination' },
  { code: 'DL',  name: 'Digital Literacy' },
  { code: 'L2L', name: 'Learning to Learn' },
  { code: 'SE',  name: 'Self-Efficacy' },
  { code: 'CZ',  name: 'Citizenship' },
]

export const KNEC_LEVELS = [
  { level: 'EE', name: 'Exceeding Expectations',   sub: 'EE1 (8 pts) · EE2 (7 pts)', tone: 'emerald' },
  { level: 'ME', name: 'Meeting Expectations',     sub: 'ME1 (6 pts) · ME2 (5 pts)', tone: 'sky'     },
  { level: 'AE', name: 'Approaching Expectations', sub: 'AE1 (4 pts) · AE2 (3 pts)', tone: 'amber'   },
  { level: 'BE', name: 'Below Expectations',       sub: 'BE1 (2 pts) · BE2 (1 pt)',  tone: 'rose'    },
] as const

export interface ToolSection {
  tool: ToolName
  title: string
  pathway?: string
  content: string
  tip: string
  promptTitle: string
  prompt: string
}

export interface Pathway {
  name: string
  icon: 'flask' | 'globe' | 'palette'
  tracks: string
  subjects: string
}

export interface AiModule {
  id: string
  number: string
  title: string
  subtitle: string
  duration: string
  hours: number
  level: string
  tag: string
  icon: 'layers' | 'sprout' | 'boxes' | 'compass' | 'clipboard'
  accent: string          // hex, used only as the module's identity accent
  competencies: string[]
  overview: string
  outcomes: string[]
  pathways?: Pathway[]
  sections: ToolSection[]
  deliverable: { title: string; items: string[] }
}

export const AI_MODULES: AiModule[] = [
  {
    id: 'M1',
    number: '01',
    title: 'Foundational Workflow Integration',
    subtitle: 'Configuring your digital ecosystem for CBC from Day One',
    duration: '3 Hours',
    hours: 3,
    level: 'All Levels',
    tag: 'Foundation',
    icon: 'layers',
    accent: '#0c9a7b',
    competencies: ['DL', 'L2L', 'CC'],
    overview: 'Before any AI tool can serve a Kenyan classroom, the ecosystem must be aligned to CBC logic, not the old 8-4-4 subject model. This module establishes the foundational infrastructure: a Google Classroom configured around CBC Learning Areas, a NotebookLM repository grounded in authentic KICD documents, and a Gemini workflow that produces lesson plans consistent with KNEC\'s assessment framework.',
    outcomes: [
      'Configure Google Classroom with CBC Learning Areas, Strands, and Sub-Strands as the organisational hierarchy, replacing the generic "Subject + Topic" model.',
      'Build a secure NotebookLM notebook using uploaded KICD Curriculum Design PDFs to prevent AI hallucination in lesson content.',
      'Generate a complete, CBA-aligned weekly lesson plan template using Gemini, with embedded rubric indicators at all four KNEC performance levels.',
      'Apply a consistent naming and filing convention across all three tools to support audit-readiness for School Quality Assurance (SQA) visits.',
    ],
    sections: [
      {
        tool: 'Google Classroom',
        title: 'Restructuring Classroom Around CBC Learning Areas',
        content: 'The default Google Classroom structure (Class, Assignment, Topic) maps naturally to 8-4-4 thinking. To align it to CBC, you must deliberately map the platform\'s architecture to KICD\'s hierarchy: Learning Area, Strand, Sub-Strand, Learning Outcome.\n\nAction Steps:\n1. Create one Google Classroom per Learning Area (not per subject). For a Grade 5 teacher: "Gr 5 Mathematics", "Gr 5 Integrated Science", "Gr 5 English", "Gr 5 Social Studies".\n2. Within each class, use Topics to represent Strands. Example in Mathematics: "Numbers", "Measurement", "Geometry", "Data Handling".\n3. Name every assignment using the format: [Grade]-[Sub-Strand]-[Week]-[Assessment Type]. Example: "Gr5-Fractions-W4-SBA".\n4. Enable Guardian Email Summaries for parental engagement, since CBC mandates home-school partnership.',
        tip: 'Resist the temptation to create one "Grade 5" classroom for all subjects. Strand-level organisation makes your Gradebook directly mappable to KNEC\'s CBA recording system, saving hours at report time.',
        promptTitle: 'Gemini: Generate a CBC Class Setup Plan',
        prompt: `Act as a CBC instructional designer. I teach [GRADE LEVEL] at a [urban/rural/peri-urban] school in Kenya.

Generate a complete Google Classroom setup plan for me. I need:
1. A list of all Learning Areas I should create as separate Classroom spaces, based on the KICD curriculum for [GRADE LEVEL].
2. For each Learning Area, list the Strands I should use as Google Classroom Topics.
3. Suggest a naming convention for assignments that reflects: Grade, Sub-Strand, Term, Week, and Assessment Type (Formative/Summative/SBA).
4. Draft a short welcome message I can post to the Stream for parents/guardians, explaining how to use Guardian Email Summaries.

Keep the language practical and grounded in Kenya's CBC framework. Mention KICD and KNEC where relevant.`,
      },
      {
        tool: 'NotebookLM',
        title: 'Building Your Anti-Hallucination KICD Repository',
        content: 'General AI tools, including Gemini when used without grounding, can generate plausible-sounding but factually incorrect curriculum information. The safeguard is NotebookLM: unlike any other AI tool, it is physically incapable of drawing on information outside the sources you upload. This makes it the single most reliable AI tool for curriculum work.\n\nSetup Protocol:\n1. Go to notebooklm.google.com and create a notebook titled "KICD Master, [Grade Level], [Year]".\n2. Upload sources in this order: (a) KICD Curriculum Design for each Learning Area, (b) KNEC School-Based Assessment guidelines, (c) Your school\'s Schemes of Work for the current term, (d) Any approved KICD textbook chapters.\n3. Once loaded, test the grounding: ask "What are the Learning Outcomes for Strand 3 of Grade 6 Integrated Science?" The answer must cite your document.\n4. Create a second notebook: "Learner Profiles & Differentiation". Upload anonymised learner performance data and ask NotebookLM to suggest grouping strategies.',
        tip: 'The 13% hallucination rate documented in late-2025 AI education research falls to near-zero in NotebookLM when your KICD documents are the only sources. Upload the official PDFs, not web summaries of them.',
        promptTitle: 'NotebookLM: KICD Document Interrogation Protocol',
        prompt: `[After uploading your KICD Curriculum Design PDF to NotebookLM, use these prompts in sequence:]

PROMPT 1 - Strand Mapping:
"List all the Strands and Sub-Strands in this curriculum design document in a structured table. For each Sub-Strand, note the number of suggested lessons."

PROMPT 2 - Assessment Alignment:
"What assessment tools does this document recommend for formative assessment in [LEARNING AREA]? List them with examples of how each should be used."

PROMPT 3 - Cross-Strand Connections:
"Identify three Sub-Strands in this document that naturally lend themselves to integration with [SECOND LEARNING AREA]. Suggest a joint activity for each connection."

PROMPT 4 - Generate Study Guide:
"Create a one-page Quick Reference Guide for a newly-posted teacher covering: (a) key vocabulary for Term [X], (b) suggested lesson sequence, (c) recommended assessment tools, (d) common learner misconceptions to watch for."`,
      },
      {
        tool: 'Gemini',
        title: 'The CBC-Aligned Weekly Lesson Plan Template',
        content: 'KICD\'s lesson plan format requires: Learning Area, Grade, Strand, Sub-Strand, Specific Learning Outcomes (SLOs), Key Inquiry Question, Learning Resources, Organisation of Learning (Introduction, Development, Conclusion), and Assessment. Gemini can generate a complete, properly structured CBC lesson plan, but only if your prompt contains the KICD-specific fields.\n\nDeliverable: After using the prompt below, you will have a reusable lesson plan template that you can fill in weekly in under 20 minutes.',
        tip: 'Add your school\'s county, term dates, and available resources (e.g., "no projector, has school garden, near a river") to every Gemini lesson plan prompt. Hyper-local context produces dramatically better, usable lesson plans.',
        promptTitle: 'Gemini: Full CBC Lesson Plan Generator',
        prompt: `You are a senior KICD-certified instructional designer. Generate a complete CBC-aligned lesson plan using this exact format.

CONTEXT:
- School Type: [Public Primary / Private Junior Secondary / etc.]
- County/Region: [e.g., Kisumu County, rural]
- Grade: [e.g., Grade 5]
- Learning Area: [e.g., Mathematics]
- Strand: [e.g., Numbers]
- Sub-Strand: [e.g., Fractions]
- Specific Learning Outcome: [Paste directly from KICD Curriculum Design]
- Available Resources: [e.g., Countable objects, no digital devices, school garden nearby]
- Class Size: [e.g., 52 learners]
- Duration: 40 minutes

OUTPUT FORMAT (use these exact headers):
1. KEY INQUIRY QUESTION
2. CORE COMPETENCIES ADDRESSED (list from CBC's 7 with brief justification for each)
3. VALUES INTEGRATED
4. LESSON INTRODUCTION (5 min) - include a hook using local Kenyan context
5. LESSON DEVELOPMENT (25 min) - with 3 distinct phases: Exploration, Explanation, Elaboration
6. LESSON CONCLUSION (10 min) - include exit ticket
7. ASSESSMENT - specify the KNEC tool type (observation schedule / rubric / checklist) and describe what BE, AE, ME, EE performance looks like for THIS specific outcome
8. DIFFERENTIATION - one adaptation each for learners needing support and learners who need extension
9. HOME-LEARNING LINK - one activity families can do without buying materials`,
      },
    ],
    deliverable: {
      title: 'Module 1 Deliverable: The CBC Digital Classroom Blueprint',
      items: [
        'Google Classroom fully configured with CBC Learning Areas, Strand-based Topics, and CBC-convention assignment naming',
        'NotebookLM "KICD Master Notebook" with all term\'s curriculum designs uploaded and tested',
        'One complete Gemini-generated weekly lesson plan, reviewed and customised by the teacher',
        'A shared parent communication template posted to the Classroom Stream',
      ],
    },
  },
  {
    id: 'M2',
    number: '02',
    title: 'Early Years & Lower Primary',
    subtitle: 'PP1 to Grade 3: Play, Language, and the Foundations of Competency',
    duration: '4 Hours',
    hours: 4,
    level: 'PP1 - Grade 3',
    tag: 'Early Years',
    icon: 'sprout',
    accent: '#d97706',
    competencies: ['CC', 'CI', 'SE', 'CZ'],
    overview: 'The foundational years of CBC demand a pedagogy radically different from anything the 8-4-4 era produced. KICD\'s design for PP1 through Grade 3 is built on experiential, play-based, and language-rich learning. AI tools are not for learners at this level, they are for the teacher: cutting the hours spent designing activities, writing parent communications, and creating differentiated materials. This module equips Early Years teachers to use Gemini, NotebookLM, and Google Classroom as backstage productivity engines.',
    outcomes: [
      'Use Gemini to generate culturally-grounded storytelling scripts, songs, and psychomotor activity guides rooted in Kenyan contexts and mother-tongue pedagogy.',
      'Build a NotebookLM notebook from KICD Early Years guidelines to instantly generate developmentally appropriate activity sequences.',
      'Configure Google Classroom as a parent-facing communication platform with Rubric-based home-learning evidence prompts.',
      'Design a complete Environmental Activities outdoor experiential lesson using AI-generated materials adapted to local resources.',
    ],
    sections: [
      {
        tool: 'Gemini',
        title: 'Localized Storytelling, Songs & Psychomotor Activities',
        content: 'The KICD PP and Lower Primary curriculum explicitly requires language learning embedded in cultural context, and psychomotor activities that develop fine and gross motor skills. Gemini\'s strength is generative breadth: it can produce dozens of story variants, songs in multiple languages, and activity sequences in minutes. Your role is curator and cultural editor.\n\nKey Use Cases:\n• Mother-tongue integrated story scripts for PP1 morning circle\n• Call-and-response songs linking numeracy concepts to daily Kenyan life\n• Outdoor activity guides using locally available materials (soil, leaves, stones, maize cobs)\n• Simple observation rubrics for psychomotor milestone tracking\n• Weekly parent update messages in English and Kiswahili',
        tip: 'Always name the local environment in your prompts: "a school near Lake Victoria", "a semi-arid school in Makueni", "an urban school in Kibera". Generic prompts produce generic activities. Local specificity produces materials teachers actually use.',
        promptTitle: 'Gemini: Environmental Activities Outdoor Game Generator',
        prompt: `PRACTICAL CASE - Module 2

You are a CBC Early Years curriculum specialist with deep knowledge of Kenya's Pre-Primary and Lower Primary learning environment.

Transform the following standard KICD Environmental Activities topic into an outdoor experiential game using ONLY locally available materials.

TOPIC: [e.g., "Living and Non-Living Things", Grade 2, Environmental Activities, Strand: Science and Technology, Sub-Strand: Living Things]
SCHOOL CONTEXT: [e.g., rural school in Nyandarua with a 1-acre school compound, access to a small river 200m away, no electricity]
CLASS SIZE: [e.g., 48 Grade 2 learners]
DURATION: 35 minutes
MATERIALS RESTRICTION: Only what can be found in the school compound or brought from home at no cost.

OUTPUT:
1. GAME NAME - culturally meaningful, something learners will remember
2. LEARNING OBJECTIVE - tied to the specific KICD Sub-Strand Learning Outcome
3. MATERIALS LIST - with Kenyan local names where applicable
4. SAFETY CONSIDERATIONS - relevant to the outdoor Kenyan school context
5. STEP-BY-STEP GAME INSTRUCTIONS - written so a pupil monitor could help facilitate
6. ASSESSMENT INTEGRATION - describe what the teacher observes to record BE/AE/ME/EE for this lesson
7. KISWAHILI VOCABULARY - 5 key terms to reinforce during the game
8. EXTENSION - one additional challenge for learners who finish early`,
      },
      {
        tool: 'Google Classroom',
        title: 'Parents as Assessment Partners',
        content: 'CBC\'s parental engagement expectation is not optional, it is built into the assessment framework. At PP and Lower Primary, parents and guardians are the primary evidence collectors outside school. Google Classroom\'s Guardian Summary emails and Stream posts create a structured, low-cost channel for this collaboration.\n\nSetup for Early Years:\n1. Create a "Parent Hub" Topic in your Classroom Stream.\n2. Post weekly "Home Learning Missions", simple activities with a rubric that parents can use to observe and document.\n3. Use Google Forms linked from Classroom to collect parent observations. The Form becomes a simple digital portfolio entry.\n4. Generate the weekly mission and the parent rubric using Gemini, then paste into Classroom.',
        tip: 'Most parents in Kenyan rural schools access Classroom via a basic Android smartphone. Keep posts short, use simple language, and always include a Kiswahili translation. Gemini can produce bilingual versions in seconds.',
        promptTitle: 'Gemini: Parent Home-Learning Mission with Observation Rubric',
        prompt: `Generate a CBC-aligned Home Learning Mission for parents/guardians of Grade [X] learners.

LEARNING AREA: [e.g., Language Activities]
SUB-STRAND: [e.g., Listening and Speaking, Oral Communication]
WEEK: [Term X, Week Y]

OUTPUT:
1. PARENT-FACING MISSION CARD (plain language, max 150 words, in BOTH English and Kiswahili):
   - What to do with your child this week
   - Materials needed (must be free or household items)
   - How long it takes (max 15 minutes)

2. OBSERVATION GUIDE FOR PARENTS (simple rubric language, not educational jargon):
   Below Expectations: [describe in plain parent language]
   Approaching Expectations: [describe in plain parent language]
   Meeting Expectations: [describe in plain parent language]
   Exceeding Expectations: [describe in plain parent language]

3. GOOGLE FORM QUESTION SET - 5 simple questions a parent can answer on their phone to submit their observation as a portfolio entry

Note: The language must be accessible to parents with Form 4 level education. Avoid all educational jargon.`,
      },
      {
        tool: 'NotebookLM',
        title: 'Your Always-Available PP Curriculum Specialist',
        content: 'Pre-Primary and Lower Primary teachers in Kenya frequently report feeling isolated from curriculum support. Many schools have no ECE specialist, and the KICD documents are dense. By uploading the KICD Pre-Primary Curriculum Design and the BECF (Basic Education Curriculum Framework) into NotebookLM, you create a queryable expert that never leaves your school.\n\nHigh-Value Queries for Early Years NotebookLM:\n• "What psychomotor milestones should PP2 learners demonstrate by end of Term 2?"\n• "List all suggested learning activities for the Strand: Creative Activities in Grade 1"\n• "How does KICD recommend integrating mother tongue in Language Activities for Grade 2?"\n• "Generate an observation checklist for fine motor skills based on the milestones in this document"',
        tip: 'Upload your county\'s Curriculum Support Materials (CSMs) alongside the national KICD documents. Many counties have contextualised these materials with local examples. NotebookLM can synthesise both the national and county-level guidance simultaneously.',
        promptTitle: 'NotebookLM: PP Developmental Milestone Tracker Generator',
        prompt: `[With KICD Pre-Primary Curriculum Design uploaded]

PROMPT SEQUENCE:

Step 1: "List all the developmental milestones for [STRAND, e.g., Psychomotor Development] that a PP2 learner should demonstrate by the end of Term 2, exactly as described in the uploaded document."

Step 2: "Convert that milestone list into a teacher observation checklist. Format it as a table with columns: Milestone Description | Date First Observed | BE | AE | ME | EE | Teacher Notes."

Step 3: "For any milestone marked 'Below Expectations', suggest three specific, low-resource intervention activities a teacher can implement in a rural Kenyan school."

Step 4: "Generate a brief Audio Overview of the PP2 Term 2 developmental expectations, something I can listen to during my commute to refresh my memory."

[Click 'Audio Overview' in the NotebookLM Studio panel for the last step]`,
      },
    ],
    deliverable: {
      title: 'Module 2 Deliverable: The Early Years AI Toolkit',
      items: [
        'Three Gemini-generated Environmental Activities outdoor lesson plans using locally available materials, reviewed and customised by the teacher',
        'A bilingual (English + Kiswahili) Home Learning Mission pack for one full term (10 weeks), with parent-language observation rubrics',
        'A NotebookLM notebook with KICD PP and Grade 1-3 curriculum designs loaded and tested with 10 benchmark queries',
        'A Google Classroom "Parent Hub" configured with Guardian Email Summaries and the first month of Home Learning Missions posted',
      ],
    },
  },
  {
    id: 'M3',
    number: '03',
    title: 'Middle & Junior School',
    subtitle: 'Grades 4-9: Talent Identification, SBAs, and Project-Based Learning',
    duration: '5 Hours',
    hours: 5,
    level: 'Grade 4 - Grade 9',
    tag: 'Middle & Junior',
    icon: 'boxes',
    accent: '#7c3aed',
    competencies: ['CT', 'CI', 'CC', 'DL', 'L2L'],
    overview: 'Grades 4 through 9 represent CBC\'s most complex assessment terrain. Upper Primary introduces KNEC\'s School-Based Assessments (SBA) at Grade 4. Junior Secondary (Grades 7-9) adds specialist subjects (Pre-Technical Education, Agriculture & Nutrition, Business Studies, Computer Science) and culminates in the Kenya Junior Secondary Education Assessment (KJSEA), where KNEC\'s assessment contributes 60% and school-based assessments contribute 40% of the final mark. This module builds teacher capacity to design rigorous, AI-assisted project-based learning and manage the full SBA cycle digitally.',
    outcomes: [
      'Use NotebookLM to upload diverse source materials and generate cross-cutting Project-Based Learning (PBL) briefs that simultaneously address multiple Learning Areas.',
      'Design and deploy KNEC-aligned assessment rubrics on Google Classroom for Junior School practical subjects including Pre-Technical Education, Agriculture & Nutrition, and Creative Arts.',
      'Use Gemini to build differentiated formative assessment tasks that correspond to CBC\'s four performance levels (BE, AE, ME, EE).',
      'Create a complete digital SBA management system in Google Classroom that produces audit-ready records for KNEC review.',
    ],
    sections: [
      {
        tool: 'NotebookLM',
        title: 'Generating Cross-Cutting Project-Based Learning from Diverse Sources',
        content: 'CBC\'s philosophy of integrated learning is most powerfully realised through PBL: projects that authentically span multiple Learning Areas. NotebookLM\'s unique power for this purpose is its ability to simultaneously synthesise documents from different subjects and identify genuine conceptual connections that a teacher working through single-subject lesson books would miss.\n\nPBL Design Protocol:\n1. Create a notebook called "Grade [X] Integrated PBL Hub".\n2. Upload: KICD curriculum designs for all relevant Learning Areas, newspaper articles on a current Kenyan issue, community resource documents, and your school\'s local environment profile.\n3. Ask NotebookLM to identify cross-cutting themes and PBL opportunities.\n4. Use the generated project brief as a foundation, then refine with Gemini for learner-facing language and rubric design.',
        tip: 'The best PBL topics are rooted in actual Kenyan community challenges: water access, food security, waste management, road safety. Ask NotebookLM: "Which curriculum strands across Mathematics, Integrated Science, and Social Studies connect to the theme of water harvesting?" You will be surprised at the depth of genuine connections.',
        promptTitle: 'NotebookLM: Cross-Subject PBL Generator',
        prompt: `[Upload KICD Curriculum Designs for Mathematics, Integrated Science, Social Studies, and one elective; upload one newspaper article on a local Kenyan community issue]

PROMPT SEQUENCE:

Step 1 - Identify Connections:
"Analyse all the uploaded curriculum documents and identify 3 Sub-Strands across different Learning Areas that connect to the theme of [e.g., 'Water Conservation in Arid and Semi-Arid Lands of Kenya']. For each connection, state the specific Learning Outcome from each Subject and explain how they link."

Step 2 - Draft the PBL Brief:
"Design a 3-week Project-Based Learning unit for [Grade 7/8] built around the theme of [topic]. The project must:
- Address Learning Outcomes from at least 3 Learning Areas (cite the specific KICD outcomes from my uploaded documents)
- Require learners to produce a tangible community-facing output
- Be achievable in a school with limited technology (no reliable internet, no projector)
- Include clear roles for individual and group work
- End with a presentation to a community audience (parents, local leaders, or peers)"

Step 3 - Generate Assessment Matrix:
"Create an integrated assessment matrix for this PBL project. For each Learning Area involved, write rubric descriptors at all four KNEC performance levels (BE, AE, ME, EE) for the specific outcomes the project addresses."`,
      },
      {
        tool: 'Google Classroom',
        title: 'Managing the Full SBA Cycle Digitally',
        content: 'KNEC School-Based Assessments run from Grade 4 to Grade 12. KNEC develops and uploads assessment tools to their portal; teachers download, administer, mark, and upload results. Google Classroom is not KNEC\'s system, but it is the perfect management layer for organising the teacher\'s workflow around SBAs.\n\nSBA Digital Management System:\n1. Create a private Google Classroom class: "[Grade] SBA Records, [Teacher Name], [Year]". Do not add learners; this is your management space.\n2. Create Topics for each KNEC SBA cycle: "Term 1 SBA 1", "Term 1 SBA 2", etc.\n3. For each SBA, post: the downloaded KNEC tool, your marked rubrics (as a Google Sheet), and your class summary statistics.\n4. Use the Classwork > Materials section to store your KNEC assessment downloads, organised by term.\n5. Export the Gradebook to Sheets at end of each term for your school\'s KNEC upload preparation.',
        tip: 'KNEC\'s cba.knec.ac.ke portal is the official system of record. Google Classroom is your working environment, the place you draft, review, and organise before uploading to KNEC. Never use Classroom as your final record; treat it as your professional workspace.',
        promptTitle: 'Gemini: Critical Thinking Rubric for Junior School Practical Project',
        prompt: `PRACTICAL CASE - Module 3

You are a KNEC assessment specialist. Design a detailed assessment rubric for a Junior School practical project.

PROJECT DETAILS:
- Subject/Learning Area: [e.g., Pre-Technical Studies / Agriculture & Nutrition / Creative Arts]
- Grade: [7, 8, or 9]
- Project Title: [e.g., "Design and Build a Drip Irrigation Model Using Recycled Materials"]
- Core Competency Focus: Critical Thinking and Problem-Solving

Generate a KNEC-aligned rubric with the following structure:

RUBRIC TABLE (7 criteria x 4 performance levels):

CRITERIA to assess (all framed around Critical Thinking):
1. Problem Identification - did the learner clearly define the challenge?
2. Research & Information Gathering - quality and relevance of sources consulted
3. Design Process - logical planning before construction
4. Practical Execution - quality and accuracy of the built model
5. Testing & Iteration - did the learner test, fail, adjust, and improve?
6. Presentation of Findings - clarity of explanation to peers/teacher
7. Reflection - quality of written or oral self-assessment

FOR EACH CRITERION x EACH LEVEL:
Write 2-3 specific, observable behavioural descriptors.
Use this KNEC scale:
- EE (Exceeding Expectations): [descriptor]
- ME (Meeting Expectations): [descriptor]
- AE (Approaching Expectations): [descriptor]
- BE (Below Expectations): [descriptor]

Format as a table I can copy directly into a Google Classroom rubric.`,
      },
      {
        tool: 'Gemini',
        title: 'Differentiated Formative Assessment at Scale',
        content: 'In a class of 45+ Grade 8 learners, differentiation is not a luxury, it is a CBC requirement. The curriculum explicitly mandates that teachers adapt learning and assessment to meet the needs of diverse learners. Gemini reduces the time cost of differentiation from hours to minutes by generating multiple versions of assessments at different complexity levels simultaneously.\n\nDifferentiation Workflow:\n1. Complete your standard lesson plan using the Module 1 template.\n2. Submit that plan to Gemini with the differentiation prompt below.\n3. Gemini produces three assessment versions: support (AE targeting), standard (ME targeting), and extension (EE targeting).\n4. Post all three versions in Google Classroom. Learners self-select, or you assign based on your observation data.',
        tip: 'Do not hide differentiated assessments from learners. In CBC, the goal is competency growth, not ranking. Show learners the full rubric and let them see what EE looks like. This builds the Self-Efficacy competency as they understand what mastery means.',
        promptTitle: 'Gemini: Three-Level Differentiated Formative Assessment Generator',
        prompt: `Generate three differentiated versions of a formative assessment task for the following lesson.

LESSON DETAILS:
- Grade: [e.g., Grade 6]
- Learning Area: [e.g., Integrated Science]
- Sub-Strand: [e.g., Ecosystems]
- Specific Learning Outcome: [Paste from KICD document]
- Assessment Type: [e.g., Written Task / Performance Task / Oral Assessment]

VERSION 1 - SUPPORT LEVEL (Targeting AE, Approaching Expectations):
- Scaffolded task with sentence starters, visual prompts, or reduced complexity
- Learner demonstrates partial understanding with guidance
- Describe the observable indicator that confirms AE is achieved

VERSION 2 - STANDARD LEVEL (Targeting ME, Meeting Expectations):
- Task requires full demonstration of the Specific Learning Outcome
- No additional scaffolding beyond what was provided in the lesson
- Describe the observable indicator that confirms ME is achieved

VERSION 3 - EXTENSION LEVEL (Targeting EE, Exceeding Expectations):
- Task requires application of the concept in a new, unfamiliar Kenyan context
- Learner must make connections across two or more Sub-Strands
- Describe the observable indicator that confirms EE is achieved

For each version: include estimated completion time, materials needed, and teacher observation notes.`,
      },
    ],
    deliverable: {
      title: 'Module 3 Deliverable: The SBA-Ready Digital Classroom',
      items: [
        'One complete 3-week PBL unit generated via NotebookLM, covering at least 3 Learning Areas with an integrated assessment matrix at all four KNEC performance levels',
        'A KNEC-aligned Google Classroom rubric for a Junior School practical subject, ready to deploy',
        'A set of three differentiated formative assessment tasks (support/standard/extension) for one Sub-Strand, posted to Google Classroom',
        'A private SBA Management Classroom configured with Term 1 and Term 2 SBA cycles organised as Topics',
      ],
    },
  },
  {
    id: 'M4',
    number: '04',
    title: 'Senior School Pathways',
    subtitle: 'Grades 10-12: STEM, Social Sciences, and Arts & Sports Science',
    duration: '6 Hours',
    hours: 6,
    level: 'Grade 10 - Grade 12',
    tag: 'Senior School',
    icon: 'compass',
    accent: '#2563eb',
    competencies: ['CT', 'CI', 'DL', 'L2L', 'CC', 'CZ'],
    overview: 'Kenya\'s first cohort of CBC Senior School learners entered Grade 10 in January 2026, a historic moment in Kenyan education. Senior School introduces structured pathway specialisation: STEM (Pure Sciences, Applied Sciences, Technology & Engineering), Social Sciences (Humanities & Business Studies), and Arts & Sports Science (Performing Arts, Visual Arts, Sports). Each pathway has distinct assessment demands, resource needs, and career orientation. This module provides pathway-specific AI toolkits for the teachers navigating this new terrain.',
    outcomes: [
      'Deploy pathway-specific Gemini workflows for STEM problem-solving, Computer Science debugging, and Applied Science investigation design.',
      'Use NotebookLM to synthesise local case studies and government data for Social Sciences and Community Service Learning projects.',
      'Build Google Classroom digital portfolio systems that capture performance, creative, and physical evidence for Arts & Sports Science.',
      'Critically compare how each AI tool serves different pathway needs, and document where their limitations lie.',
    ],
    pathways: [
      {
        name: 'STEM Pathway',
        icon: 'flask',
        tracks: 'Pure Sciences · Applied Sciences · Technology & Engineering',
        subjects: 'Biology, Chemistry, Physics, Computer Science, Agriculture, Advanced Mathematics, Engineering',
      },
      {
        name: 'Social Sciences Pathway',
        icon: 'globe',
        tracks: 'Humanities & Business Studies',
        subjects: 'History & Citizenship, Geography, Business Studies, CRE/IRE, Community Service Learning',
      },
      {
        name: 'Arts & Sports Science Pathway',
        icon: 'palette',
        tracks: 'Performing Arts · Visual Arts · Sports & Recreation',
        subjects: 'Music & Dance, Theatre & Film, Fine Arts, Physical Education, Sports Science',
      },
    ],
    sections: [
      {
        tool: 'Gemini',
        pathway: 'STEM',
        title: 'STEM: Complex Problem-Solving & Computer Science Support',
        content: 'STEM Senior School teachers, particularly in Computer Science, Advanced Mathematics, and Applied Sciences, face the challenge of teaching highly technical content with limited specialist colleagues to consult. Gemini functions as a highly capable subject-specialist colleague: generating worked examples, debugging code, designing lab reports, and creating real-world problem scenarios.\n\nKey STEM Use Cases:\n• Generating advanced Mathematics problem sets at varying difficulty levels\n• Creating Computer Science pseudocode and debugging exercises\n• Designing Applied Science investigation protocols for schools with limited lab equipment\n• Building case studies from Kenyan industrial and agricultural contexts\n• Generating KCSE-style examination questions for internal mocks',
        tip: 'For Computer Science, tell Gemini the exact programming language, IDE, and version your school uses. "Python 3.10 in IDLE on Windows 7 computers with no internet" is a specification that transforms the output from theoretical to practical.',
        promptTitle: 'Gemini: STEM Problem-Solving Scenario & CS Debugging Exercise',
        prompt: `PATHWAY: STEM - [Pure Sciences / Applied Sciences / Technology & Engineering]

SUBJECT: [e.g., Computer Science]
GRADE: [10, 11, or 12]
TOPIC: [e.g., Arrays and List Operations in Python]
PROGRAMMING ENVIRONMENT: [e.g., Python 3.x in IDLE, offline]

Generate a structured debugging exercise for Grade [X] Computer Science learners.

STRUCTURE:
1. REAL-WORLD CONTEXT (Kenyan setting, e.g., a mobile money system, a farm management app, a school records system)
2. THE BUGGY CODE BLOCK - write Python code with 4 deliberately introduced bugs of increasing subtlety:
   - Bug 1: Syntax error (visible to beginner)
   - Bug 2: Logic error (requires understanding of the algorithm)
   - Bug 3: Runtime error (only appears with specific inputs)
   - Bug 4: Off-by-one / edge case error (requires advanced reasoning)
3. THE LEARNER TASK:
   - Identify each bug with line numbers
   - Explain in plain language what each bug does wrong
   - Write the corrected code
   - Predict what the corrected code outputs for three test inputs
4. EXTENSION - modify the corrected code to add one new feature relevant to the Kenyan context
5. MARKING GUIDE - rubric at BE/AE/ME/EE for both debugging accuracy and quality of explanation

Also generate an equivalent Applied Sciences scenario:
"Design a real-world problem-solving scenario for Grade 11 Applied Sciences involving [topic] in a Kenyan context. The scenario must require learners to: collect data, apply a mathematical model, evaluate sources of error, and propose an improvement."`,
      },
      {
        tool: 'NotebookLM',
        pathway: 'Social Sciences',
        title: 'Social Sciences: Synthesising Local Case Studies for CSL',
        content: 'Community Service Learning (CSL) is a core subject for ALL Senior School learners, regardless of pathway. The Social Sciences pathway additionally requires learners to engage with historical documents, geographical data, business case studies, and community research projects. NotebookLM is uniquely powerful here: it synthesises multiple, varied documents (news articles, NGO reports, government data, and textbook chapters) into coherent study resources.\n\nNotebookLM Workflow for Social Sciences:\n1. Create a notebook per CSL project or per term theme (e.g., "Term 2: Urbanisation & Youth Employment in Nairobi").\n2. Upload: county development reports, newspaper articles from the past 5 years, KICD curriculum design, relevant government policy documents.\n3. Ask NotebookLM to synthesise findings, identify tensions between sources, and generate research questions for learner investigations.\n4. Generate Audio Overviews for learners who learn better through listening.',
        tip: 'For CSL projects, upload your school\'s actual community context documents: local chief\'s reports, water committee meeting minutes, health facility data. NotebookLM synthesises real local data. This is the authentic research process CBC intends for CSL.',
        promptTitle: 'NotebookLM: Social Sciences Specialised Study Guide Builder',
        prompt: `[Upload for Social Sciences: KICD Senior School curriculum design for relevant subjects + local/national documents on the topic]

PRACTICAL CASE: Building a Grade 11 Social Sciences study guide on [TOPIC, e.g., "Land Use and Food Security in Kenya's Arid and Semi-Arid Counties"]

Step 1 - Source Synthesis:
"Analyse all uploaded documents. Identify: (a) the 3 most significant facts or findings, (b) 2 areas where the documents contradict each other, (c) 1 gap in the evidence that a learner investigation could address."

Step 2 - Learner-Facing Study Guide:
"Generate a 2-page study guide for Grade 11 Social Sciences learners covering [TOPIC]. Include:
- Key vocabulary with definitions drawn from my uploaded documents
- Timeline of significant events/policies (if applicable)
- Comparison table of at least 2 perspectives or stakeholder positions
- 5 critical thinking questions progressing from recall to evaluation
- 3 suggested community-based investigation activities"

Step 3 - CSL Project Framework:
"Design a Community Service Learning project framework for Grade 11 learners based on this topic. The project must result in a tangible community contribution. Include: project objective, community partner type, learner roles, timeline (6 weeks), and evidence portfolio requirements."

Step 4 - Generate Audio Overview:
[Click Studio, then Audio Overview for a podcast-style revision summary learners can listen to]`,
      },
      {
        tool: 'Google Classroom',
        pathway: 'Arts & Sports Science',
        title: 'Arts & Sports Science: Building Digital Portfolio Systems',
        content: 'The Arts & Sports Science pathway presents a unique assessment challenge: performance, creative production, and physical development are inherently difficult to capture in written tests. CBC\'s portfolio-based assessment model is the answer, and Google Classroom, combined with Google Sites or Google Drive, provides the digital infrastructure.\n\nDigital Portfolio Architecture for Arts & Sports:\n1. Create a Google Classroom for each subject: "Gr 11 Music & Dance", "Gr 11 Theatre & Film", "Gr 11 Sports Science".\n2. Create Assignment types for different portfolio entries: Performance Recording, Design Journal, Sports Science Log, Peer Assessment, Self-Reflection.\n3. Each learner submits portfolio entries via Google Drive links (video recordings, photo documentation, written reflections).\n4. Use Gemini in Classroom to generate assessment rubrics for each portfolio entry type.\n5. At end of term, the Classroom submission history becomes the auditable KNEC portfolio record.',
        tip: 'For Sports Science logs, create a recurring weekly assignment: "Week [X] Sports Log". Learners submit a brief Google Doc with: training activity, duration, measurable performance metric, and self-reflection. Over 3 years, this builds a longitudinal performance portfolio that is far more meaningful than any written exam.',
        promptTitle: 'Gemini: Arts & Sports Science Portfolio Rubric Generator',
        prompt: `PATHWAY: Arts & Sports Science
TRACK: [Performing Arts / Visual Arts / Sports & Recreation]
SUBJECT: [e.g., Theatre & Film / Fine Arts / Sports Science]
GRADE: [10, 11, or 12]
PORTFOLIO ENTRY TYPE: [e.g., Original Screenplay / Visual Art Installation / Athletic Performance Log]

Generate a Google Classroom-ready assessment rubric for this portfolio entry.

RUBRIC REQUIREMENTS:
- 5 assessment criteria specifically designed for [SUBJECT] continuous assessment
- For PERFORMING ARTS: criteria should cover technique, expression, creativity, collaboration, and reflection
- For VISUAL ARTS: criteria should cover concept development, technical skill, use of materials, cultural context, and presentation
- For SPORTS: criteria should cover performance metrics, training consistency, tactical understanding, teamwork, and sports science application

FOR EACH CRITERION x EACH KNEC PERFORMANCE LEVEL (EE / ME / AE / BE):
Write specific, observable descriptors that a non-specialist teacher (a temporary replacement or HOD) could use to assess consistently.

Additionally:
1. Write a SELF-ASSESSMENT version of this rubric, same criteria, but in first-person language the learner completes about their own work.
2. Write a PEER-ASSESSMENT version, same criteria, reframed for a classmate to assess fairly.
3. Suggest 3 specific evidence types the learner should submit alongside this rubric entry.`,
      },
    ],
    deliverable: {
      title: 'Module 4 Deliverable: The Pathway-Specific Digital Toolkit',
      items: [
        'STEM: One full Computer Science debugging exercise and one Applied Sciences investigation protocol, both set in Kenyan contexts, with KNEC rubrics',
        'Social Sciences: A NotebookLM notebook for one CSL project with uploaded local documents, a synthesised study guide, and a 6-week community project framework',
        'Arts & Sports Science: A Google Classroom configured with digital portfolio assignment types, rubrics for at least 3 portfolio entry types (including learner self-assessment and peer-assessment versions)',
        'All pathways: A reflection document comparing how the AI tools serve different pathway needs, and where their limitations lie',
      ],
    },
  },
  {
    id: 'M5',
    number: '05',
    title: 'Revolutionising Competency-Based Assessment',
    subtitle: 'Moving from Rote Testing to Real-World Performance Evidence',
    duration: '4 Hours',
    hours: 4,
    level: 'All Levels',
    tag: 'Assessment',
    icon: 'clipboard',
    accent: '#0c9a7b',
    competencies: ['CT', 'DL', 'L2L', 'SE', 'CC'],
    overview: 'KNEC\'s Competency-Based Assessment Framework (CBAF) uses four performance level descriptors, Exceeding Expectations (EE), Meeting Expectations (ME), Approaching Expectations (AE), and Below Expectations (BE), subdivided into an eight-point scale from EE1 (8 points) to BE2 (1 point). This framework explicitly rejects the ranking and competition culture of 8-4-4. The challenge for teachers is that designing assessments that genuinely distinguish EE from ME, beyond simply asking harder questions, requires new assessment literacy. This module builds that literacy, powered by AI.',
    outcomes: [
      'Design multi-dimensional performance tasks rooted in authentic Kenyan contexts, with an audience beyond the teacher and a tangible product.',
      'Build full eight-level KNEC rubrics (EE1 through BE2) that genuinely distinguish performance levels rather than just escalating difficulty.',
      'Use Google Classroom rubrics and Gemini to deliver personalised, competency-framed feedback at scale.',
      'Create a living NotebookLM assessment bank and run a KNEC alignment audit on your own assessment tasks.',
    ],
    sections: [
      {
        tool: 'Gemini',
        title: 'Designing Multi-Dimensional Performance Tasks',
        content: 'The fundamental shift in CBA is from "What does the learner know?" to "What can the learner do with what they know?" A performance task requires learners to apply, create, evaluate, or transfer their learning to a real-world situation. Gemini is exceptionally good at generating performance tasks rooted in Kenyan realities, if you give it the right specificity.\n\nKNEC Assessment Tools to Integrate with Gemini:\n• Observation Schedules - for practical and performance tasks\n• Rubrics - for evaluating quality of products and processes\n• Checklists - for verifying completion of steps\n• Anecdotal Records - for narrative documentation of learner behaviour\n• Portfolio - for longitudinal evidence of growth\n• Projects - for extended, multi-stage investigations\n• Oral/Aural Assessment - for language and communication competencies',
        tip: 'The most powerful performance tasks have three qualities: (1) They are set in an authentic Kenyan context, a real problem a community faces, (2) They have an audience beyond the teacher: peers, parents, community members, (3) They produce something: a model, a plan, an argument, a creative work. Ask Gemini to include all three in every performance task it generates.',
        promptTitle: 'Gemini: Multi-Dimensional Performance Task with Full KNEC Rubric',
        prompt: `You are a KNEC-certified assessment specialist. Generate a complete performance task with a full multi-dimensional rubric.

TASK SPECIFICATIONS:
- Grade: [e.g., Grade 8]
- Learning Area: [e.g., Agriculture & Nutrition]
- Sub-Strand: [e.g., Soil and Crop Production]
- Core Competency Focus: Critical Thinking AND Creativity (dual focus)
- Authentic Context: [e.g., A local farmer in [County] is facing soil erosion after heavy rains]

PERFORMANCE TASK DESIGN:
1. SCENARIO - Write a 150-word real-world scenario set in the specified Kenyan context
2. LEARNER CHALLENGE - What must the learner produce/do/decide/argue?
3. CONSTRAINTS - What resources are they limited to? (Mirrors real-world resource limitations)
4. AUDIENCE - Who will the learner present/submit this to, beyond the teacher?
5. SUCCESS CRITERIA - What does excellent work look like? (Framed for learners, not teachers)

FULL RUBRIC (6 criteria x 8 KNEC performance levels):

For EACH criterion, write descriptors at ALL EIGHT sub-levels:
EE1 (8pts): [descriptor, outstanding, exemplary performance]
EE2 (7pts): [descriptor, excellent, comprehensive performance]
ME1 (6pts): [descriptor, fully meets the standard]
ME2 (5pts): [descriptor, meets the standard with minor gaps]
AE1 (4pts): [descriptor, approaching but not yet meeting]
AE2 (3pts): [descriptor, some relevant work but significant gaps]
BE1 (2pts): [descriptor, minimal evidence of understanding]
BE2 (1pt): [descriptor, very limited or no evidence]

SUGGESTED CRITERIA:
For this specific task, suggest the 6 most appropriate criteria from: content accuracy, analysis quality, creativity of solution, communication clarity, use of evidence, practical feasibility, local relevance, reflection depth, collaboration (if group task), and presentation quality.`,
      },
      {
        tool: 'Google Classroom',
        title: 'Personalised Feedback Loops at Scale',
        content: 'CBC requires "meaningful, timely feedback", a standard that is nearly impossible to maintain manually across 40-50 learners. Google Classroom\'s combination of rubric tools, private comments, and Gemini AI assistance creates the infrastructure for feedback that feels personal even at scale.\n\nFeedback Architecture:\n1. Build a Rubric directly in Google Classroom (Classwork, Create Assignment, Rubric). Each criterion maps to your KNEC performance descriptors.\n2. When marking, click the rubric level for each criterion. The mark calculates automatically.\n3. Use Private Comments for qualitative feedback. Gemini can draft these: describe the learner\'s performance to Gemini and ask it to write constructive, encouragement-first feedback in accessible language.\n4. Set up a "Return & Resubmit" policy: learners can revise AE and BE work once after feedback. This is CBC\'s philosophy of mastery learning in action.\n5. Use Gemini in Classroom\'s "Summarise Class Responses" feature after a Forms quiz to identify the top 3 misconceptions, address these in the next lesson rather than reteaching everything.',
        tip: 'Write feedback in terms of the CBC competencies, not just subject content. Instead of "Your calculation was wrong", try "Your Critical Thinking showed strong problem identification in steps 1-2. In step 3, revisit how you applied the formula, show me the working in your resubmission." This language builds Self-Efficacy and Learning to Learn.',
        promptTitle: 'Gemini: Differentiated Feedback Generator',
        prompt: `You are a skilled CBC teacher providing written feedback to a learner.

CONTEXT:
- Grade: [e.g., Grade 9]
- Learning Area: [e.g., Business Studies]
- Assessment Task: [e.g., Business plan for a school-based enterprise]
- Learner's Performance Level: [e.g., Approaching Expectations (AE1)]
- Specific Strengths Observed: [e.g., Clear identification of the business opportunity; good knowledge of local market]
- Specific Gaps Observed: [e.g., No financial projections; target customer not defined; no competitive analysis]
- Learner Context (optional): [e.g., English is learner's second language; strong verbal but weaker written skills]

Generate THREE versions of written feedback:

VERSION 1 - CLASSROOM COMMENT (max 60 words):
Encouragement-first. Specific about what worked. One precise, actionable next step. Accessible language.

VERSION 2 - DETAILED RUBRIC COMMENT (max 150 words):
Reference specific rubric criteria. Explain the gap between AE and ME in concrete, observable terms. Give the learner 2-3 specific actions to take before resubmission. End with genuine encouragement.

VERSION 3 - PARENT/GUARDIAN COMMUNICATION (max 100 words):
Plain language (no jargon). Explain what the learner is working on and what support at home would help. Frame in CBC's competency language, not percentage scores.`,
      },
      {
        tool: 'NotebookLM',
        title: 'Building a Living Assessment Resource Bank',
        content: 'Every assessment task you create, every rubric you refine, every performance task that worked, these are professional assets. NotebookLM transforms your assessment collection into a queryable bank: upload your best assessments and ask it to generate variations, adapt them to new topics, or explain how they align to specific KNEC indicators.\n\nAssessment Resource Bank Protocol:\n1. Create a NotebookLM notebook: "[School] CBA Assessment Bank, [Year]".\n2. Upload: your best-performing assessment tasks, the KNEC assessment guidelines, and KICD curriculum designs.\n3. Ask: "Generate 3 new performance tasks on [new topic] modelled on the design principles in my uploaded assessments".\n4. Ask: "Review my uploaded rubric for [subject]. Does it fully address the KNEC CBAF requirements? What is missing?"\n5. Generate Audio Overviews of KNEC assessment guidelines, listen to them during your professional development time.',
        tip: 'Contribute to a school-wide assessment bank. If your school has multiple teachers per grade, create a shared NotebookLM notebook (share access with colleagues). The bank compounds in value as more assessments are added. This is genuine collaborative professional development.',
        promptTitle: 'NotebookLM: Assessment Quality Audit Protocol',
        prompt: `[Upload your existing assessment tasks, rubrics, and KNEC CBAF guidelines to NotebookLM]

AUDIT SEQUENCE - Run these prompts on your uploaded assessments:

AUDIT 1 - KNEC Alignment Check:
"Review my uploaded assessment task for [SUBJECT, GRADE]. Does it align with KNEC's CBAF requirements as described in the guidelines document? List: (a) 3 strengths in the assessment design, (b) 2 gaps or misalignments with KNEC expectations, (c) 1 specific improvement to make it stronger."

AUDIT 2 - Competency Coverage Check:
"Which of CBC's 7 core competencies does my uploaded assessment genuinely assess? For each competency it addresses, show me the specific task element that assesses it. Flag any competencies that are missing and suggest how to incorporate them without making the task longer."

AUDIT 3 - Differentiation Check:
"Does my uploaded assessment provide pathways for learners at all four performance levels (BE, AE, ME, EE)? If not, suggest specific modifications to create entry points for learners approaching expectations while maintaining the challenge for those exceeding expectations."

AUDIT 4 - Generate a Parallel Assessment:
"Using the same design principles, level of challenge, and assessment approach in my uploaded task, generate a parallel assessment on a different but related Sub-Strand. The new task must not share any questions or scenarios with the original."`,
      },
    ],
    deliverable: {
      title: 'Module 5 Deliverable: The CBA Mastery Portfolio',
      items: [
        'Three complete performance tasks (one per level: Lower Primary, Upper Primary/Junior Secondary, Senior School), each with an eight-level KNEC rubric (EE1 through BE2)',
        'A Google Classroom with demonstration rubrics deployed on live assignments, and at least 5 examples of personalised feedback comments generated with Gemini',
        'A NotebookLM "CBA Assessment Bank" notebook with at least 10 uploaded assessment tasks and a completed KNEC alignment audit for each',
        'A personal Reflective Practice Log (Google Doc): What did AI do well? Where did it require significant teacher editing? What are the ethical limits of AI in CBC assessment?',
      ],
    },
  },
]

export function getAiModuleById(id: string): AiModule | undefined {
  return AI_MODULES.find(m => m.id === id)
}
