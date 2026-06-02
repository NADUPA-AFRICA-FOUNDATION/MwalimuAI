export type Track = 'core' | 'stem' | 'languages' | 'humanities' | 'leadership' | 'wellbeing'

export interface Lesson {
  id: string
  title: string
  duration: string
  videoTitle: string
  videoPoints: string[]
  reading: string
  reflectionPrompt: string
  reflectionPlaceholder: string
}

export interface LearningModule {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: [string, string, string, string]
  correct: 0 | 1 | 2 | 3
  explanation: string
}

export interface Assignment {
  title: string
  context: string
  task: string
  hints: string[]
  rubric: string[]
}

export interface Program {
  id: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  track: Track
  kicdAlignment: string
  hours: number
  lessons: number
  accent: 'primary' | 'accent'
  available: boolean
  launchingSoon?: boolean
  modules: LearningModule[]
  preAssessment: AssessmentQuestion[]
  postAssessment: AssessmentQuestion[]
  assignment: Assignment
  certificate: { subtitle: string; skills: string[] }
}

/* ── Program 1: CBC Foundations ────────────────────────────── */
const cbcFoundations: Program = {
  id: 'cbc-foundations',
  title: 'CBC Foundations',
  shortTitle: 'CBC Foundations',
  tagline: 'Understand CBC from the ground up',
  description: 'Master the core principles of Kenya\'s Competency-Based Curriculum. This program covers the CBC framework, curriculum design, and how to translate policy into everyday classroom practice.',
  track: 'core',
  kicdAlignment: 'KICD CBC PD Level 1 — Core Framework',
  hours: 5,
  lessons: 9,
  accent: 'primary',
  available: true,
  modules: [
    {
      id: 'm1',
      title: 'The CBC Framework',
      description: 'Understand what CBC is, why it was introduced, and its guiding philosophy.',
      lessons: [
        {
          id: 'l1',
          title: 'What is CBC and Why It Matters',
          duration: '15 min',
          videoTitle: 'Introduction to the Competency-Based Curriculum',
          videoPoints: [
            'Why Kenya moved from 8-4-4 to CBC',
            'The KICD mandate and development process',
            'How CBC serves 21st-century learners',
            'Real classroom transformation stories',
          ],
          reading: `The Competency-Based Curriculum (CBC) represents Kenya's most significant educational reform in decades. Introduced by KICD from 2017, CBC shifts the focus from knowledge memorisation to the development of skills, values, and competencies that learners need throughout life. The driving question changed from "What does this child know?" to "What can this child do and become?"\n\nUnder the old 8-4-4 system, success was measured almost entirely by final examination scores, which often rewarded rote learning over understanding. CBC changes this by embedding learning in real-world contexts, encouraging learners to apply knowledge rather than just recall it. For teachers, this is both exciting and challenging — it invites you to become a facilitator of learning experiences rather than a transmitter of content.`,
          reflectionPrompt: 'Think about one lesson you taught recently. How could you redesign it to be more competency-focused rather than content-focused?',
          reflectionPlaceholder: 'Describe the lesson, what you would change, and which competency it would develop...',
        },
        {
          id: 'l2',
          title: 'The 7 Core Competencies',
          duration: '20 min',
          videoTitle: 'Breaking Down CBC\'s Core Competencies',
          videoPoints: [
            'Communication and Collaboration in the classroom',
            'Critical Thinking and Problem Solving activities',
            'Creativity and Imagination across subjects',
            'Citizenship, Digital Literacy, Learning to Learn, Self-Efficacy',
          ],
          reading: `CBC identifies seven core competencies every Kenyan learner must develop: Communication and Collaboration, Critical Thinking and Problem Solving, Creativity and Imagination, Citizenship, Digital Literacy, Learning to Learn, and Self-Efficacy. These are not separate subjects — they are woven into every lesson across all learning areas.\n\nAs a teacher, your role is to create activities where competencies emerge naturally. A mathematics lesson on fractions, for example, can develop Critical Thinking when learners explain their reasoning, Collaboration when they work in groups, and Communication when they present solutions. The competency does not need to be labelled for the learner — it simply needs to be the outcome of a well-designed activity.`,
          reflectionPrompt: 'Choose two core competencies and describe one specific activity for each that you could try this week.',
          reflectionPlaceholder: 'Competency 1: ... Activity: ...\nCompetency 2: ... Activity: ...',
        },
        {
          id: 'l3',
          title: 'CBC vs 8-4-4: Key Differences',
          duration: '15 min',
          videoTitle: 'Comparing 8-4-4 and CBC: A Teacher\'s Perspective',
          videoPoints: [
            'Assessment: exams vs continuous competency evaluation',
            'Content coverage vs depth of understanding',
            'Teacher role: instructor vs facilitator',
            'The learner: passive recipient vs active constructor',
          ],
          reading: `The most important shift in moving from 8-4-4 to CBC is in the purpose of assessment. In 8-4-4, assessment meant examinations that ranked learners. In CBC, assessment is continuous, diagnostic, and developmental — it tells the teacher what the learner can already do and what support they need next. This is assessment FOR learning, not OF learning.\n\nThe curriculum structure also changes. 8-4-4 organised content into subjects with prescribed syllabi to "cover." CBC organises learning into Strands and Sub-strands with Specific Learning Outcomes (SLOs). Teachers move from covering content to designing experiences that lead learners toward identified competencies, and assessment tells them whether learners are getting there.`,
          reflectionPrompt: 'Which aspect of the CBC approach feels most different from what you were trained to do? What support would help you make this transition?',
          reflectionPlaceholder: 'I find it most different to... because... What would help me is...',
        },
      ],
    },
    {
      id: 'm2',
      title: 'Curriculum Planning in CBC',
      description: 'Learn to read and use the CBC curriculum design tools effectively.',
      lessons: [
        {
          id: 'l1',
          title: 'Strands, Sub-Strands and SLOs',
          duration: '20 min',
          videoTitle: 'Reading and Using CBC Curriculum Design Documents',
          videoPoints: [
            'How Strands organise a learning area',
            'Sub-strands as focused learning topics',
            'Writing and unpacking Specific Learning Outcomes',
            'Using the curriculum design document in lesson planning',
          ],
          reading: `Every CBC learning area is organised into Strands — broad thematic areas — and Sub-strands, which are specific topics within each strand. For example, in English, one strand might be "Reading" and a sub-strand might be "Reading Comprehension." This structure helps teachers connect individual lessons to the bigger curriculum map.\n\nSpecific Learning Outcomes (SLOs) are the measurable statements of what learners should be able to do by the end of a lesson or unit. Well-written SLOs use action verbs: "identify," "explain," "demonstrate," "create." When you plan a lesson, you start with the SLO and design activities that lead learners toward it. The SLO also guides your assessment — if a learner can perform the SLO, they have met the expectation.`,
          reflectionPrompt: 'Pick one lesson you\'re planning this week. Write 2–3 SLOs using action verbs that you can actually assess.',
          reflectionPlaceholder: 'By the end of this lesson, learners should be able to: 1. ... 2. ... 3. ...',
        },
        {
          id: 'l2',
          title: 'Designing Learner-Centred Activities',
          duration: '25 min',
          videoTitle: 'From Teacher-Centred to Learner-Centred: Practical Steps',
          videoPoints: [
            'The WHERETO framework for activity design',
            'Hands-on learning with local materials',
            'Collaborative learning structures',
            'Moving from lecture to guided discovery',
          ],
          reading: `A learner-centred classroom is one where learners are actively doing — exploring, creating, discussing, and applying — rather than passively watching the teacher. This doesn\'t mean the teacher disappears; it means you design activities and then step back to guide, question, and support as learners work.\n\nPractical examples: instead of explaining how plants grow, give learner groups a real seedling to observe and record changes. Instead of telling learners the rules of grammar, give them a text and ask them to discover the pattern. Instead of solving all maths problems on the board, have learners attempt first, then discuss different approaches. The teacher\'s expertise shows in the quality of the activity design and the questions asked during the lesson, not the amount of talking done.`,
          reflectionPrompt: 'Take one lesson you typically "teach" by explaining. Redesign the main activity so learners discover or construct the knowledge themselves.',
          reflectionPlaceholder: 'Original activity: I usually...\nRedesigned: Instead, learners will...\nMy role during this: I will...',
        },
        {
          id: 'l3',
          title: 'CBC Learning Materials and Resources',
          duration: '15 min',
          videoTitle: 'Making CBC Resources Work for You',
          videoPoints: [
            'KICD-approved textbooks and supplementary materials',
            'Low-cost and locally sourced learning materials',
            'Digital resources for CBC teaching',
            'Creating your own classroom materials',
          ],
          reading: `CBC materials go beyond textbooks. The KICD curriculum designs are supported by approved textbooks, but effective CBC teaching also draws on the local environment, community expertise, and teacher-created materials. A lesson on ecosystems can use the school compound; a lesson on fractions can use locally available fruits.\n\nDigital resources — videos, simulations, and interactive activities — can enrich CBC lessons significantly. Where technology is available, platforms like the Kenya Education Cloud and YouTube channels dedicated to CBC offer supporting content. However, effective CBC teaching does not require technology — the core shift is in pedagogy (how you teach), not tools (what you use).`,
          reflectionPrompt: 'Identify one locally available resource (material, person, or place) that you could use to enrich an upcoming lesson. How would you use it?',
          reflectionPlaceholder: 'Resource: ...\nLesson: ...\nHow I would use it: ...',
        },
      ],
    },
    {
      id: 'm3',
      title: 'CBC in Practice',
      description: 'Put CBC theory into action: planning, record-keeping, and parent engagement.',
      lessons: [
        {
          id: 'l1',
          title: 'Planning Your First CBC Lesson',
          duration: '20 min',
          videoTitle: 'A Step-by-Step CBC Lesson Plan Walkthrough',
          videoPoints: [
            'The CBC lesson plan format used in Kenya',
            'Introduction hooks and prior knowledge activation',
            'Activity sequencing for depth',
            'Planning for differentiation from the start',
          ],
          reading: `A CBC lesson plan is structured around outcomes, not content. You begin by identifying your SLOs, then work backwards to design activities that lead learners there. The plan includes an Introduction (5–10 minutes to activate prior knowledge and set context), Main Activities (the core learning experience with differentiation), and a Conclusion (reflection, assessment, and closing).\n\nThe most important habit to develop is planning your assessment before you plan your activities. Ask: "How will I know if learners have met the SLO?" Once you have that answer, design activities that give learners the opportunity to demonstrate that capability. This backwards design approach ensures your lesson has a clear purpose and every activity serves the learning outcome.`,
          reflectionPrompt: 'Design a short lesson plan (introduction + one main activity + assessment) for any topic you are teaching next week.',
          reflectionPlaceholder: 'Topic: ...\nSLO: By the end learners will be able to...\nIntroduction (hook): ...\nMain activity: ...\nAssessment: I will know they\'ve achieved the SLO by...',
        },
        {
          id: 'l2',
          title: 'CBC Record Keeping',
          duration: '20 min',
          videoTitle: 'Keeping CBC Records Without Being Overwhelmed',
          videoPoints: [
            'What records CBC requires and why',
            'Practical anecdotal note-taking during lessons',
            'Cumulative records and portfolios',
            'Efficient record-keeping systems',
          ],
          reading: `CBC requires ongoing documentation of learner progress. This includes lesson plans, attendance records, learner performance records, anecdotal notes, and portfolio evidence. While this can feel overwhelming at first, developing efficient habits makes it manageable.\n\nPractical strategies: use a simple observation template that fits on one page per week; during activities, carry sticky notes to jot observations; at the end of each lesson, spend 3 minutes updating your class register with brief notes (strong, developing, emerging) for each learner. The goal is a running picture of each learner\'s growth, not a perfect snapshot on any single day.`,
          reflectionPrompt: 'What record-keeping system do you currently use? What one change would make it more useful for tracking individual learner progress?',
          reflectionPlaceholder: 'Currently I...\nOne change I could make: ...\nThis would help because...',
        },
        {
          id: 'l3',
          title: 'Building CBC Partnerships with Parents',
          duration: '15 min',
          videoTitle: 'Communicating CBC to Parents: Practical Guidance',
          videoPoints: [
            'Why parents struggle to understand CBC',
            'Simple explanations that resonate with parents',
            'Engaging parents as learning partners at home',
            'Handling resistance and concerns positively',
          ],
          reading: `Many parents trained under 8-4-4 and equate "good education" with exercise books full of written work and regular examinations. When they see their child doing project work, group activities, and continuous assessment, they may worry. Your job is to help them understand the why behind CBC — that it is preparing their children for a world that demands skills, not just certificates.\n\nEffective parent communication about CBC uses familiar language: "Instead of memorising facts, your child is learning how to think and solve problems." Invite parents into the classroom once a term to observe an activity. Send home brief notes explaining what their child learned and how they can support it. When parents feel like partners in the learning process, they become advocates for CBC, not critics.`,
          reflectionPrompt: 'Write 2–3 sentences you could use to explain CBC to a parent who is concerned that their child isn\'t doing enough "bookwork".',
          reflectionPlaceholder: 'What I would say: ...',
        },
      ],
    },
  ],
  preAssessment: [
    { id: 'q1', question: 'What does CBC stand for?', options: ['Content-Based Curriculum', 'Competency-Based Curriculum', 'Classroom-Based Curriculum', 'Core-Based Curriculum'], correct: 1, explanation: 'CBC stands for Competency-Based Curriculum — it focuses on developing competencies (skills + values + knowledge) rather than content alone.' },
    { id: 'q2', question: 'How many core competencies does CBC identify?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'CBC identifies 7 core competencies: Communication & Collaboration, Critical Thinking, Creativity, Citizenship, Digital Literacy, Learning to Learn, and Self-Efficacy.' },
    { id: 'q3', question: 'What replaces "subjects" as the organisational structure in CBC?', options: ['Topics', 'Units', 'Strands and Sub-strands', 'Chapters'], correct: 2, explanation: 'CBC organises each learning area into Strands (broad areas) and Sub-strands (specific topics).' },
    { id: 'q4', question: 'What does SLO stand for in CBC?', options: ['Standard Learning Objective', 'Specific Learning Outcome', 'Student Learning Output', 'Subject Learning Order'], correct: 1, explanation: 'SLO = Specific Learning Outcome — a measurable statement of what learners should be able to do by lesson\'s end.' },
    { id: 'q5', question: 'In CBC, assessment is primarily meant to:', options: ['Rank learners at the end of term', 'Measure what was memorised', 'Inform teaching and support learner growth', 'Replace national examinations'], correct: 2, explanation: 'CBC assessment is formative — it informs the teacher and supports the learner\'s ongoing growth.' },
    { id: 'q6', question: 'Which describes a learner-centred lesson?', options: ['Teacher lectures for most of the lesson', 'Learners copy notes from the board', 'Learners actively construct knowledge through activities', 'The textbook determines the lesson structure'], correct: 2, explanation: 'Learner-centred means learners are actively engaged — discovering, creating, collaborating — rather than passively receiving information.' },
  ],
  postAssessment: [
    { id: 'q1', question: 'What does CBC stand for?', options: ['Content-Based Curriculum', 'Competency-Based Curriculum', 'Classroom-Based Curriculum', 'Core-Based Curriculum'], correct: 1, explanation: 'CBC = Competency-Based Curriculum.' },
    { id: 'q2', question: 'How many core competencies does CBC identify?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'CBC has 7 core competencies.' },
    { id: 'q3', question: 'What replaces "subjects" as the organisational structure in CBC?', options: ['Topics', 'Units', 'Strands and Sub-strands', 'Chapters'], correct: 2, explanation: 'Strands and Sub-strands organise the CBC learning areas.' },
    { id: 'q4', question: 'What does SLO stand for in CBC?', options: ['Standard Learning Objective', 'Specific Learning Outcome', 'Student Learning Output', 'Subject Learning Order'], correct: 1, explanation: 'SLO = Specific Learning Outcome.' },
    { id: 'q5', question: 'In CBC, the teacher\'s primary role is:', options: ['Delivering content', 'Facilitating learning experiences', 'Marking examinations', 'Covering the syllabus'], correct: 1, explanation: 'In CBC, teachers facilitate — they design and guide experiences rather than transmit content.' },
    { id: 'q6', question: 'Backwards design in lesson planning means:', options: ['Starting from the textbook', 'Starting from the assessment to plan activities', 'Teaching the last topic first', 'Ending with the introduction'], correct: 1, explanation: 'Backwards design: start with what you want learners to achieve (SLO + assessment), then design activities to get there.' },
  ],
  assignment: {
    title: 'My CBC Alignment Reflection',
    context: 'You have completed the CBC Foundations program. Now it\'s time to apply your learning to your own classroom context.',
    task: 'Write a structured reflection (300–500 words) describing: (1) One specific aspect of your teaching you will change to be more CBC-aligned, (2) How this change connects to the competencies CBC aims to develop, (3) What challenges you anticipate and how you plan to address them.',
    hints: [
      'Be specific — choose one lesson, one topic, or one habit rather than trying to change everything at once',
      'Connect your change to at least one of the 7 core competencies',
      'Be honest about challenges — they\'re real and acknowledging them is part of professional growth',
    ],
    rubric: [
      'Clearly identifies one specific teaching change',
      'Connects the change to CBC competencies',
      'Shows understanding of learner-centred principles',
      'Acknowledges real challenges with thoughtful responses',
      'Writes in clear, professional language',
    ],
  },
  certificate: {
    subtitle: 'CBC Foundations Program',
    skills: ['CBC Framework & Philosophy', 'Curriculum Design (Strands, SLOs)', 'Learner-Centred Lesson Planning', 'CBC Assessment Principles', 'Parent Communication for CBC'],
  },
}

/* ── Program 2: Assessment for Learning ───────────────────── */
const assessmentForLearning: Program = {
  id: 'assessment-for-learning',
  title: 'Assessment for Learning',
  shortTitle: 'Assessment',
  tagline: 'Move from testing to teaching through assessment',
  description: 'Master CBC\'s competency-based assessment system. From designing rubrics and tracking performance levels to portfolio assessment and parent reporting, this program transforms how you understand what your learners know and can do.',
  track: 'core',
  kicdAlignment: 'KICD CBC PD Level 2 — Assessment Competency',
  hours: 6,
  lessons: 9,
  accent: 'accent',
  available: true,
  modules: [
    {
      id: 'm1',
      title: 'Understanding CBC Assessment',
      description: 'The philosophy and framework of competency-based assessment.',
      lessons: [
        {
          id: 'l1',
          title: 'What is Competency-Based Assessment?',
          duration: '20 min',
          videoTitle: 'Rethinking Assessment: From Exams to Evidence',
          videoPoints: [
            'Why traditional testing doesn\'t fit CBC',
            'Evidence of learning vs. memory recall',
            'Continuous vs. periodic assessment',
            'How assessment drives instruction',
          ],
          reading: `Competency-Based Assessment (CBA) focuses on gathering evidence that a learner can perform a skill, apply a concept, or demonstrate a value — not just recall a fact. Assessment becomes ongoing and embedded in daily activities rather than concentrated in periodic exams. A learner\'s ability to explain their reasoning aloud is evidence; a group presentation is evidence; a written reflection is evidence.\n\nThe shift from summative to formative assessment is at the heart of CBA. Formative assessment happens during learning — it tells you where the learner is now and what they need next. Summative assessment (like term reports) still exists in CBC, but it is supported by the rich formative data you collect throughout the term. Together, they give a comprehensive picture of each learner.`,
          reflectionPrompt: 'In a typical week, what proportion of your assessment is formative (during learning) vs. summative (at the end)? What would you want it to be?',
          reflectionPlaceholder: 'Currently: roughly __% formative, __% summative\nIdeal: ...\nTo get there I would need to...',
        },
        {
          id: 'l2',
          title: 'The Four Performance Levels',
          duration: '15 min',
          videoTitle: 'Exceeds, Meets, Approaching, Below: Using Performance Levels',
          videoPoints: [
            'What each performance level means in practice',
            'How to observe and record performance levels',
            'Avoiding grade inflation and deflation',
            'Communicating levels to learners and parents',
          ],
          reading: `CBC uses four performance levels: Exceeds Expectations (EE), Meets Expectations (ME), Approaching Expectations (AE), and Below Expectations (BE). These replace percentage marks as the primary way of communicating learner progress. Each level describes what the learner can do relative to the SLO, not relative to other learners.\n\nEE means the learner has gone beyond the SLO — they show deeper understanding, make connections to other contexts, or demonstrate independent application. ME means the learner has achieved the SLO as stated. AE means the learner is working towards it and needs some support. BE means the learner has not yet demonstrated the expected competency and needs significant intervention. Your teaching response differs significantly for each level.`,
          reflectionPrompt: 'For a recent lesson, describe one learner at each of the four performance levels and what evidence led you to that judgement.',
          reflectionPlaceholder: 'EE: [Learner description] Evidence: ...\nME: ...\nAE: ...\nBE: ...',
        },
        {
          id: 'l3',
          title: 'Designing Assessment Rubrics',
          duration: '25 min',
          videoTitle: 'Building Rubrics That Work in CBC Classrooms',
          videoPoints: [
            'Criteria-based vs. holistic rubrics',
            'Writing clear, observable criteria',
            'Aligning rubrics to SLOs and competencies',
            'Using rubrics for self-assessment',
          ],
          reading: `A rubric is a scoring guide that describes levels of quality for a given task. In CBC, rubrics are tied to SLOs: the criteria describe what "Exceeds," "Meets," "Approaching," and "Below" look like for that specific outcome. Well-written criteria are observable — they describe what the teacher will see or hear, not abstract qualities.\n\nFor example, a rubric for "oral communication" might describe EE as: "Speaks clearly, uses topic vocabulary correctly, and responds to questions with elaboration." ME: "Speaks clearly and uses most vocabulary correctly." AE: "Communicates the main idea but struggles with vocabulary or clarity." BE: "Has difficulty communicating the idea clearly." Share rubrics with learners before the task — it becomes a learning tool, not just a marking tool.`,
          reflectionPrompt: 'Choose one upcoming assessment task and write a simple 2-criterion rubric with all four performance levels.',
          reflectionPlaceholder: 'Task: ...\nCriterion 1: ...\nEE: ... ME: ... AE: ... BE: ...\nCriterion 2: ...',
        },
      ],
    },
    {
      id: 'm2',
      title: 'Formative Assessment Strategies',
      description: 'Practical techniques for assessing during learning, not just at the end.',
      lessons: [
        {
          id: 'l1',
          title: 'Quick Formative Techniques',
          duration: '20 min',
          videoTitle: '10 Formative Assessment Strategies for CBC Classrooms',
          videoPoints: [
            'Exit tickets: what they are and how to use them',
            'Traffic lights and thumbs — quick whole-class checks',
            'Targeted questioning techniques',
            'Mini whiteboards and show-of-hands variations',
          ],
          reading: `Formative assessment doesn\'t require elaborate preparation. The most effective techniques are simple and can be embedded in any lesson. Exit tickets — a brief written response to one question at the end of class — give you immediate data on understanding. The question should be tied directly to the lesson\'s SLO: "Write one thing that confused you about today\'s topic" or "Solve this problem and explain your reasoning."\n\nTargeted questioning is another powerful tool. Instead of asking "Does everyone understand?", ask specific, observable questions: "Who can show me an example of..." or "Explain to your partner why..." These techniques reveal actual understanding rather than superficial compliance. When you spot a pattern in responses — three learners all making the same error — you have actionable data to inform the next lesson.`,
          reflectionPrompt: 'Choose one formative technique from this lesson. How will you use it in your next class? What question will you ask?',
          reflectionPlaceholder: 'Technique: ...\nMy question: ...\nWhat I will do with the information: ...',
        },
        {
          id: 'l2',
          title: 'Peer and Self-Assessment',
          duration: '20 min',
          videoTitle: 'Getting Learners to Assess Themselves and Each Other',
          videoPoints: [
            'Why self-assessment builds metacognition',
            'Structured peer feedback protocols',
            'Two Stars and a Wish method',
            'Building a culture of constructive feedback',
          ],
          reading: `When learners assess their own work and each other\'s, they develop metacognition — the ability to think about their own thinking. CBC explicitly values self-efficacy and learning to learn, and self/peer assessment is one of the most direct ways to build both. Learners who can identify gaps in their own understanding become independent learners.\n\nTo make peer assessment work, teach the protocol explicitly. "Two Stars and a Wish" is a simple, effective structure: identify two things the work does well and one thing that could be improved. Model it yourself first, then practice with low-stakes content. Always pair peer assessment with a clear rubric so feedback is based on criteria, not personal opinion. The goal is a classroom culture where constructive feedback is normal, valued, and growth-oriented.`,
          reflectionPrompt: 'How comfortable are your learners with giving and receiving feedback? What one step would you take to build a more feedback-positive classroom culture?',
          reflectionPlaceholder: 'Currently, my learners...\nOne step I would take: ...\nI would start by...',
        },
        {
          id: 'l3',
          title: 'Anecdotal Records and Observation',
          duration: '20 min',
          videoTitle: 'The Art of Observing Learners: What to Look For and How to Record',
          videoPoints: [
            'What constitutes valid observation evidence',
            'Efficient recording systems during class',
            'Observation focus rotation across learners',
            'Using observations to plan interventions',
          ],
          reading: `Observation is one of the most authentic forms of assessment — you see exactly what a learner can do in a real learning context. Anecdotal records are brief written notes capturing what a learner said or did during an activity. Unlike formal assessments, they capture unexpected moments of growth as well as areas of concern.\n\nPractical approaches: carry a clipboard with a class list and simple codes (✓ met, ~ approaching, – below); focus on 4–5 learners per lesson so you give full attention rather than shallow notes on everyone; note specific, observable behaviours ("correctly identified the main idea without prompting") rather than vague impressions ("did well"). Over a term, these records build into a detailed developmental portrait of every learner.`,
          reflectionPrompt: 'Design a simple observation recording system you could realistically use during a lesson. What would it look like? How would you use the data?',
          reflectionPlaceholder: 'My system: ...\nWhat I would record: ...\nHow I would use the data the next day: ...',
        },
      ],
    },
    {
      id: 'm3',
      title: 'Portfolio Assessment',
      description: 'Build and use learner portfolios as powerful evidence of growth.',
      lessons: [
        {
          id: 'l1',
          title: 'Building a Learner Portfolio',
          duration: '20 min',
          videoTitle: 'What Goes in a CBC Portfolio and Why',
          videoPoints: [
            'Portfolio purpose: showcase growth, not perfection',
            'What to include: work samples, reflections, observations',
            'Physical vs. digital portfolios in Kenyan schools',
            'Managing portfolios with large classes',
          ],
          reading: `A portfolio is a curated collection of evidence showing a learner\'s growth over time. Unlike a test, it captures the process of learning — drafts, revisions, self-assessments, and finished products. In CBC, portfolios are a core assessment tool because they provide rich, multidimensional evidence of competency development that a single assessment cannot.\n\nFor practical implementation, a simple physical portfolio can be a manila folder or exercise book for each learner. Include: 2–3 work samples per term (chosen by the learner), teacher observation notes, learner self-assessment records, and one "best piece" with a written explanation. Label clearly and store systematically. The portfolio belongs to the learner — their ownership of it is itself an expression of the Learning to Learn competency.`,
          reflectionPrompt: 'What evidence of learning do you currently collect? How could you organise it into a portfolio system for your class?',
          reflectionPlaceholder: 'Currently I collect...\nA portfolio for my class would include...\nI would manage it by...',
        },
        {
          id: 'l2',
          title: 'Learner Ownership of Portfolio',
          duration: '15 min',
          videoTitle: 'Giving Learners Agency in Their Own Assessment',
          videoPoints: [
            'Why learner choice in portfolio selection matters',
            'Guided reflection prompts for young learners',
            'Portfolio conferences: learner-led conversations',
            'Celebrating growth visibly in the classroom',
          ],
          reading: `The most distinctive feature of portfolio assessment is that learners choose and explain their own work. This is not passive collection — it is active, reflective curation. When a learner selects a piece to include and writes "I chose this because..." they are practising the Self-Efficacy and Learning to Learn competencies at the same time.\n\nEven young learners can engage in portfolio reflection with scaffolding. Prompts like "I am proud of this because..." or "This was hard for me, and I solved it by..." build the habit of self-reflection from early grades. Over time, learners develop a meta-awareness of their own learning journey — they can see their growth in ways that a grade on a page cannot show.`,
          reflectionPrompt: 'Write a simple reflection prompt you could use with your grade level to help learners explain why they chose a piece of work for their portfolio.',
          reflectionPlaceholder: 'My reflection prompt: ...\nI chose this piece because...\nWhat this shows about my learning is...',
        },
        {
          id: 'l3',
          title: 'Portfolios and Parent Engagement',
          duration: '20 min',
          videoTitle: 'Portfolio Sharing: Connecting Home and School Through Evidence',
          videoPoints: [
            'Portfolio sharing events and parent conversations',
            'Using portfolios during parent-teacher conferences',
            'Preparing learners to present their portfolios',
            'Addressing parental questions about performance levels',
          ],
          reading: `Portfolios transform parent-teacher conversations. Instead of the teacher reporting on the learner, the learner presents their own evidence of growth. This shifts the dynamic from the teacher judging the learner to the learner taking ownership of their progress. Parents see real work, hear their child explain it, and gain understanding of competency-based growth.\n\nTo make portfolio sharing events successful: prepare learners with a 2-minute presentation structure ("This is my best work because... I grew in this area by... My next goal is..."); invite parents to ask questions of the learner, not just the teacher; use the rubric to explain performance levels in parent-friendly language. When parents understand that "Approaching Expectations" means "actively developing, with teacher support" rather than "failing," resistance to CBC assessment decreases significantly.`,
          reflectionPrompt: 'Plan a 30-minute portfolio sharing event for your class. What would the schedule be? How would you prepare your learners?',
          reflectionPlaceholder: 'Schedule: ...\nHow I would prepare learners (2 weeks before): ...\nWhat I would say to parents about performance levels: ...',
        },
      ],
    },
  ],
  preAssessment: [
    { id: 'q1', question: 'In CBC, assessment is primarily:', options: ['Summative — a final exam at the end of term', 'Formative — ongoing during learning', 'Competitive — comparing learners to each other', 'Selective — identifying the top performers'], correct: 1, explanation: 'CBC assessment is primarily formative — it happens during learning and informs teaching decisions.' },
    { id: 'q2', question: 'Which is a performance level in CBC?', options: ['Pass/Fail', 'A, B, C, D', 'Meets Expectations', 'Good, Average, Poor'], correct: 2, explanation: 'CBC uses four levels: Exceeds Expectations (EE), Meets Expectations (ME), Approaching Expectations (AE), Below Expectations (BE).' },
    { id: 'q3', question: 'A rubric is best described as:', options: ['A test paper', 'A scoring guide with criteria and performance levels', 'A lesson plan template', 'A class register'], correct: 1, explanation: 'A rubric describes levels of quality for a task, tied to clear, observable criteria.' },
    { id: 'q4', question: 'What is the purpose of a learner portfolio?', options: ['To store completed exercise books', 'To provide evidence of growth over time', 'To rank learners in the class', 'To replace term examinations'], correct: 1, explanation: 'Portfolios curate evidence of a learner\'s growth over time — not just final products but the process of learning.' },
    { id: 'q5', question: 'Peer assessment is primarily valuable because:', options: ['It saves teacher marking time', 'It develops metacognition and feedback skills', 'It makes learners competitive', 'It replaces teacher assessment'], correct: 1, explanation: 'Peer assessment develops metacognition (thinking about thinking) and builds constructive feedback skills — key CBC competencies.' },
    { id: 'q6', question: 'An exit ticket is:', options: ['A permission slip to leave class', 'A brief end-of-lesson assessment', 'A homework assignment', 'A quiz at the start of class'], correct: 1, explanation: 'An exit ticket is a brief written response at lesson\'s end, tied to the SLO — it gives immediate formative data.' },
  ],
  postAssessment: [
    { id: 'q1', question: 'In CBC, assessment is primarily:', options: ['Summative', 'Formative', 'Competitive', 'Selective'], correct: 1, explanation: 'CBC assessment is formative — ongoing and developmental.' },
    { id: 'q2', question: '"EE" in CBC performance levels stands for:', options: ['Excellent and Exceptional', 'Exceeds Expectations', 'Equal to Expected', 'Evidence of Excellence'], correct: 1, explanation: 'EE = Exceeds Expectations — the learner has gone beyond the stated SLO.' },
    { id: 'q3', question: 'Backwards design in assessment means:', options: ['Marking from the last question first', 'Designing the assessment before planning activities', 'Starting with the lowest-level learners', 'Using the textbook to set questions'], correct: 1, explanation: 'Backwards design: start with what you want learners to achieve, then design activities and assessments to get there.' },
    { id: 'q4', question: 'Which is NOT typically included in a CBC learner portfolio?', options: ['Work samples chosen by the learner', 'Learner self-reflections', 'The teacher\'s annual salary', 'Observation notes from the teacher'], correct: 2, explanation: 'Portfolios include learner work, reflections, and teacher observations — not administrative information.' },
    { id: 'q5', question: 'The "Two Stars and a Wish" technique is used for:', options: ['Lesson planning', 'Peer assessment', 'Classroom rules', 'Parent communication'], correct: 1, explanation: 'Two Stars and a Wish is a structured peer feedback protocol: two strengths + one area for improvement.' },
    { id: 'q6', question: 'Anecdotal records are:', options: ['Fictional stories about learners', 'Brief observational notes during activities', 'End-of-year reports', 'Examination mark sheets'], correct: 1, explanation: 'Anecdotal records are brief, specific notes of what a learner said or did during an activity.' },
  ],
  assignment: {
    title: 'Formative Assessment Plan',
    context: 'You are planning a two-week unit of work for your class. Apply what you have learned about formative assessment to design a complete assessment plan for this unit.',
    task: 'Design a formative assessment plan for a 2-week unit you are currently teaching. Include: (1) Two formative assessment techniques you will use and how, (2) A simple rubric with 2 criteria for one key task, (3) How you will involve learners in self or peer assessment, (4) How you will use the data to adjust your teaching.',
    hints: [
      'Choose formative techniques that fit naturally into your daily lessons — don\'t add extra admin',
      'Write rubric criteria that describe observable behaviour, not vague qualities',
      'Plan the self-assessment activity before the lesson — it works best when structured',
    ],
    rubric: [
      'Formative techniques are specific and connected to SLOs',
      'Rubric criteria are observable and clearly differentiated across levels',
      'Learner involvement in assessment is genuinely competency-building',
      'Data use plan shows how teaching will respond to learner evidence',
    ],
  },
  certificate: {
    subtitle: 'Assessment for Learning Program',
    skills: ['Competency-Based Assessment Design', 'Assessment Rubrics', 'Formative Assessment Strategies', 'Portfolio Assessment', 'Learner-Led Self-Assessment', 'Parent Reporting in CBC'],
  },
}

/* ── Program 3: Inclusive Education ───────────────────────── */
const inclusiveEducation: Program = {
  id: 'inclusive-education',
  title: 'Inclusive Education',
  shortTitle: 'Inclusive Ed',
  tagline: 'Every learner belongs, every learner succeeds',
  description: 'Build an inclusive classroom that meets every learner where they are. This program covers differentiation strategies, Universal Design for Learning, and practical approaches grounded in CBC\'s every-learner-succeeds philosophy.',
  track: 'core',
  kicdAlignment: 'KICD CBC PD Level 2 — Inclusive Pedagogy',
  hours: 5,
  lessons: 9,
  accent: 'primary',
  available: true,
  modules: [
    {
      id: 'm1',
      title: 'Every Learner Counts',
      description: 'Understand the foundations of inclusive education in the CBC context.',
      lessons: [
        {
          id: 'l1', title: 'The Inclusive Education Mandate', duration: '15 min',
          videoTitle: 'Kenya\'s Commitment to Inclusive Education',
          videoPoints: ['Kenya\'s Special Needs Education policy', 'CBC\'s universal design philosophy', 'Rights-based approach to education', 'What inclusion looks like in a Kenyan primary school'],
          reading: `Kenya\'s educational policy, aligned with the UN Convention on the Rights of Persons with Disabilities, commits to inclusive education — every child learning in their local school, supported appropriately. CBC was designed with this in mind: the curriculum\'s flexibility in activities, assessment, and pace is intended to accommodate a wide range of learners.\n\nInclusion does not mean ignoring difference — it means actively planning for it. A truly inclusive classroom is one where every learner\'s needs are anticipated in the lesson design, not addressed after the fact as a problem to be solved. This requires a shift in mindset: diversity is the norm, and good teaching accounts for it from the start.`,
          reflectionPrompt: 'Identify one learner in your class who has a specific learning barrier. How does your current lesson design account for their needs?',
          reflectionPlaceholder: 'The learner I\'m thinking of...\nTheir barrier is...\nCurrently my lessons address this by...\nWhat could be improved: ...',
        },
        {
          id: 'l2', title: 'Understanding Learning Barriers', duration: '20 min',
          videoTitle: 'Types of Learning Barriers in Kenyan Classrooms',
          videoPoints: ['Physical and sensory barriers', 'Cognitive and learning differences', 'Language and communication barriers', 'Social-emotional and environmental barriers'],
          reading: `Learning barriers are any factor that prevents a learner from fully participating in and benefiting from education. They include physical barriers (mobility or sensory impairment), cognitive barriers (intellectual disability, learning differences like dyslexia), language barriers (English or Kiswahili is not the home language), and social-emotional barriers (trauma, poverty, family instability).\n\nIdentifying barriers requires observation and relationship-building. A learner who appears disengaged may be struggling with language comprehension, not ability. A learner who is slow to write may have a fine motor challenge, not a cognitive one. Before labelling a learner, ask: "What is the barrier between this learner and the learning?" Then ask: "What can I change in my teaching to reduce that barrier?"`,
          reflectionPrompt: 'Choose one barrier type and describe a specific, practical accommodation you could make in tomorrow\'s lesson.',
          reflectionPlaceholder: 'Barrier type: ...\nAccommodation I would make: ...\nThis would help because...',
        },
        {
          id: 'l3', title: 'CBC\'s Every-Learner Philosophy', duration: '15 min',
          videoTitle: 'How CBC Was Designed With Inclusion in Mind',
          videoPoints: ['Flexible pacing built into the curriculum', 'Multiple means of demonstrating competency', 'The role of continuous assessment in identifying needs early', 'Moving from deficit to strengths-based thinking'],
          reading: `CBC explicitly rejects the idea that education is for some learners and not others. The curriculum is designed with flexible pathways: learners can demonstrate competency through writing, speaking, drawing, making, or performing. This flexibility is intentional — it recognises that intelligence and capability take many forms.\n\nThe shift from deficit thinking ("this learner can\'t") to strengths thinking ("this learner can, when supported appropriately") is one of the most important professional shifts a teacher can make. Every learner has strengths. An effective inclusive teacher identifies those strengths and uses them as entry points for learning. A learner who struggles with reading may excel in oral explanation, practical demonstration, or artistic representation.`,
          reflectionPrompt: 'Think of a learner you find challenging. List three strengths they demonstrate — not academic strengths necessarily, but any strengths. How could you use these as learning entry points?',
          reflectionPlaceholder: 'Learner: ...\nStrength 1: ... How to use it: ...\nStrength 2: ...\nStrength 3: ...',
        },
      ],
    },
    {
      id: 'm2',
      title: 'Differentiation in Practice',
      description: 'Practical strategies for meeting diverse learner needs in one classroom.',
      lessons: [
        {
          id: 'l1', title: 'Differentiated Content and Process', duration: '25 min',
          videoTitle: 'Practical Differentiation in a Large CBC Classroom',
          videoPoints: ['Differentiating by readiness, interest, and learning profile', 'Tiered activities for the same SLO', 'Flexible grouping strategies', 'How to plan differentiation without doubling your workload'],
          reading: `Differentiation means adjusting the content (what learners learn), process (how they learn it), or product (how they demonstrate learning) based on learner readiness, interest, or learning profile. In a CBC classroom, the SLO is the same for all learners — what changes is the pathway to get there.\n\nA practical example: if the SLO is "explain the water cycle," some learners might meet it by drawing and labelling a diagram; others by writing a paragraph; advanced learners by creating an explanation for younger learners. The content (water cycle) and outcome (explanation) are the same — the complexity and modality differ. Tiered activities like these can be prepared in advance and offered to learners based on your observation data.`,
          reflectionPrompt: 'Design tiered activities for an upcoming lesson. What does the task look like for learners who are below, at, and above the expected level?',
          reflectionPlaceholder: 'SLO: ...\nBelow level: ...\nAt level: ...\nAbove level: ...',
        },
        {
          id: 'l2', title: 'Universal Design for Learning (UDL)', duration: '20 min',
          videoTitle: 'UDL Basics: Designing for All Learners from the Start',
          videoPoints: ['The three UDL principles: representation, action & expression, engagement', 'Multiple means of presenting information', 'Giving learners choices in how they show learning', 'Building flexibility into lesson design proactively'],
          reading: `Universal Design for Learning (UDL) is an approach to curriculum design that proactively plans for learner diversity rather than retrofitting accommodations after the fact. UDL is built on three principles: provide multiple means of Representation (how information is presented), Action and Expression (how learners demonstrate learning), and Engagement (how learners are motivated and interested).\n\nA UDL-informed lesson might present information through spoken explanation, a visual diagram, AND a physical demonstration — removing barriers for visual, auditory, and kinaesthetic learners simultaneously. Learners might choose to demonstrate their understanding in writing, through a drawing, or via oral explanation. These choices are built into the lesson design, so no single learner feels singled out as needing "extra help."`,
          reflectionPrompt: 'Apply one UDL principle to an upcoming lesson. What multiple means of representation, expression, or engagement will you include?',
          reflectionPlaceholder: 'UDL principle I\'m applying: ...\nIn practice, I will offer: ...\nThis will help learners who...',
        },
        {
          id: 'l3', title: 'Grouping Strategies', duration: '20 min',
          videoTitle: 'Strategic Grouping for Inclusive Learning',
          videoPoints: ['Mixed-ability vs. similar-ability grouping: when to use each', 'Interest-based and learning profile grouping', 'Cooperative learning structures (Jigsaw, Think-Pair-Share)', 'Managing groups with a large, diverse class'],
          reading: `How you group learners has a profound effect on inclusion. Mixed-ability groups allow stronger learners to consolidate their understanding through explanation (the best way to learn is to teach), while providing peer models and support for struggling learners. However, always pairing the same learners creates dependency rather than growth — vary grouping frequently.\n\nCooperative learning structures like Jigsaw (each group member becomes an expert on one part and teaches the others) are particularly powerful for inclusion: every member has a valued role, and the task requires everyone\'s contribution. Think-Pair-Share gives all learners thinking time before speaking, which helps learners who process slowly or are less confident in whole-class discussions. Rotate your grouping strategies to serve different learner needs at different times.`,
          reflectionPrompt: 'Reflect on your current grouping practices. Are the same learners always grouped together? How could you vary your grouping this term to better serve all learners?',
          reflectionPlaceholder: 'Currently I group by...\nA different grouping I will try: ...\nThis will benefit learners who...',
        },
      ],
    },
    {
      id: 'm3',
      title: 'The Inclusive Classroom in Practice',
      description: 'Environment, wellbeing, and stakeholder collaboration for every learner.',
      lessons: [
        {
          id: 'l1', title: 'Adapting the Learning Environment', duration: '15 min',
          videoTitle: 'Low-Cost, High-Impact Classroom Environment Adaptations',
          videoPoints: ['Physical arrangement for diverse learning needs', 'Visual supports and word walls', 'Sensory considerations in classroom setup', 'Making materials accessible on a limited budget'],
          reading: `The physical environment of a classroom communicates whether all learners are expected and welcome. Flexible seating arrangements (allowing some learners to sit at the front, or near the teacher), clear visual routines displayed on the wall, and materials at accessible heights all reduce barriers without singling out individual learners.\n\nLow-cost adaptations with high impact: write key vocabulary on the board before the lesson begins; number steps in a task clearly; provide simple visual timers for learners who struggle with transitions; allow learners who need movement to stand or work at a standing surface. Many adaptations that help learners with specific needs also benefit the entire class.`,
          reflectionPrompt: 'Walk through your classroom mentally. Name two environmental changes you could make this week that would benefit your most challenged learners.',
          reflectionPlaceholder: 'Change 1: ...\nWhy this will help: ...\nChange 2: ...',
        },
        {
          id: 'l2', title: 'Social-Emotional Wellbeing in Inclusive Classrooms', duration: '20 min',
          videoTitle: 'Safety, Belonging, and Emotional Regulation in CBC',
          videoPoints: ['Why emotional safety enables learning', 'CBC\'s wellbeing strand', 'Simple regulation strategies for the classroom', 'Addressing bullying and building community'],
          reading: `A learner cannot learn if they don\'t feel safe. Social-emotional wellbeing is not separate from academic learning in CBC — it is a prerequisite for it. The CBC Self-Efficacy and Citizenship competencies require that learners feel valued, heard, and capable. Creating this environment is one of a teacher\'s most fundamental responsibilities.\n\nPractical actions: begin each Monday with a brief class circle where learners share one word about how they\'re feeling; establish clear, consistent classroom routines that reduce anxiety for learners who need predictability; use "emotion vocabulary" explicitly — name feelings without judgement; address bullying directly and model the kind of community you want to build. These practices benefit all learners, but they are essential for learners with social-emotional needs.`,
          reflectionPrompt: 'Describe one practice you already use to support learner wellbeing. Then describe one new practice from this lesson you want to try.',
          reflectionPlaceholder: 'What I already do: ...\nNew practice I want to try: ...\nI will start on: [date]',
        },
        {
          id: 'l3', title: 'Collaborating with Parents and Support Staff', duration: '20 min',
          videoTitle: 'Building Your Inclusion Team: Parents, SEN Teachers, and More',
          videoPoints: ['Parents as essential partners in inclusion', 'Working with special needs education teachers', 'Referral processes for learners with significant needs', 'Keeping communication consistent and strength-based'],
          reading: `No teacher works alone in an inclusive classroom. Parents know their children better than anyone — their home language, their strengths, their fears, what calms them. Establishing a relationship of trust with parents of learners with additional needs is foundational. Regular, brief updates (not just when problems arise) build that trust.\n\nWhere a special needs education (SNE) teacher or resource centre is available, collaborate actively. The SNE teacher can suggest specific accommodations, model strategies in your classroom, and help develop individualised education plans. For learners with significant needs that exceed classroom accommodation, use your school\'s referral process — but document carefully and communicate transparently with parents throughout. Inclusion works best as a team effort.`,
          reflectionPrompt: 'Identify one learner who needs additional support. Who else should be involved in their support team (parent, SNE teacher, school counsellor)? What is your first step?',
          reflectionPlaceholder: 'Learner: ...\nSupport team members: ...\nMy first step: ...\nTimeline: ...',
        },
      ],
    },
  ],
  preAssessment: [
    { id: 'q1', question: 'Inclusive education means:', options: ['Separate schools for learners with disabilities', 'All learners learning together with appropriate support', 'Only teaching the highest-performing learners', 'Ignoring learning differences'], correct: 1, explanation: 'Inclusive education means all learners, regardless of ability, learning together in their local school with appropriate support.' },
    { id: 'q2', question: 'Differentiation in CBC means:', options: ['Teaching different content to different learners', 'Adjusting pathways to the same SLO based on learner needs', 'Separating learners by ability permanently', 'Giving easier work to struggling learners'], correct: 1, explanation: 'Differentiation adjusts the pathway (content, process, or product) while keeping the SLO the same for all.' },
    { id: 'q3', question: 'UDL stands for:', options: ['Universal Design for Learning', 'Unified Development of Literacy', 'Updated Digital Learning', 'Underprivileged Development in Learning'], correct: 0, explanation: 'UDL = Universal Design for Learning — designing lessons proactively to accommodate all learners from the start.' },
    { id: 'q4', question: 'A learning barrier is:', options: ['A low exam score', 'Any factor preventing full participation in learning', 'A learner who misbehaves', 'Homework not submitted'], correct: 1, explanation: 'A learning barrier is any factor — physical, cognitive, language, social-emotional — that prevents full participation.' },
    { id: 'q5', question: 'Mixed-ability grouping primarily benefits:', options: ['Only the weakest learners', 'Only the strongest learners', 'All learners through peer modelling and explanation', 'Nobody — ability grouping is always better'], correct: 2, explanation: 'Mixed-ability groups benefit everyone: stronger learners consolidate through teaching, weaker learners gain peer models.' },
    { id: 'q6', question: 'Strengths-based thinking means:', options: ['Ignoring learning difficulties', 'Finding entry points through what a learner CAN do', 'Only praising learners', 'Avoiding assessment'], correct: 1, explanation: 'Strengths-based: start from what a learner can do and use those strengths as entry points into new learning.' },
  ],
  postAssessment: [
    { id: 'q1', question: 'Inclusive education means:', options: ['Separate schools for special needs', 'All learners learning together with support', 'Teaching only gifted learners', 'Using the same approach for everyone'], correct: 1, explanation: 'Inclusion = all learners, appropriate support, local school.' },
    { id: 'q2', question: 'In UDL, "multiple means of expression" refers to:', options: ['Different languages in the curriculum', 'Allowing learners to show learning in different ways', 'Multiple textbooks', 'Oral and written exams'], correct: 1, explanation: 'Multiple means of expression: learners can write, speak, draw, make — different modalities for demonstrating competency.' },
    { id: 'q3', question: 'The Jigsaw grouping strategy:', options: ['Groups learners by ability', 'Has each member become an expert who teaches others', 'Is for one learner working alone', 'Involves competitive ranking'], correct: 1, explanation: 'Jigsaw: each group member studies one piece and teaches the rest — every member has a valued expert role.' },
    { id: 'q4', question: 'Think-Pair-Share mainly helps learners who:', options: ['Are very confident speakers', 'Process information slowly or are less confident in whole-class settings', 'Always finish early', 'Need no support'], correct: 1, explanation: 'Think-Pair-Share gives processing time before speaking, helping slower processors and less confident learners participate.' },
    { id: 'q5', question: 'Why does social-emotional wellbeing matter for learning?', options: ['It doesn\'t — academic work is what matters', 'A learner who doesn\'t feel safe cannot learn effectively', 'It only matters for early years', 'Wellbeing is the family\'s responsibility'], correct: 1, explanation: 'Emotional safety is a prerequisite for learning — a learner who feels unsafe or unwelcome cannot access academic content.' },
    { id: 'q6', question: 'When should you involve a parent in supporting a learner with additional needs?', options: ['Only when the learner has a formal diagnosis', 'Only when serious problems arise', 'Regularly, with strength-based communication from the start', 'Never — it\'s a school matter'], correct: 2, explanation: 'Regular, strength-based communication builds trust and partnership — don\'t wait for problems.' },
  ],
  assignment: {
    title: 'Differentiation in My Classroom',
    context: 'You know your learners. Now apply inclusive education principles to a real classroom challenge.',
    task: 'Describe one learner in your class (anonymised) who faces a learning barrier. Write a differentiation plan that includes: (1) Description of the barrier and the learner\'s strengths, (2) Two differentiation strategies you will implement, (3) How you will involve the learner\'s parent/guardian, (4) How you will know whether the strategies are working.',
    hints: ['Use a pseudonym — focus on the barrier and strategies, not the learner\'s identity', 'Strategies should be realistic for your class size and resources', 'Your success indicators should be observable behaviour, not exam scores'],
    rubric: ['Clear, respectful description of barrier and strengths', 'Differentiation strategies are specific and realistic', 'Parent involvement plan is practical and relationship-based', 'Success indicators are observable and measurable'],
  },
  certificate: { subtitle: 'Inclusive Education Program', skills: ['Inclusive Education Principles', 'Identifying Learning Barriers', 'Differentiation Strategies', 'Universal Design for Learning', 'Strengths-Based Teaching', 'Parent & Stakeholder Collaboration'] },
}

/* ── Program 4: STEM Integration ──────────────────────────── */
const stemIntegration: Program = {
  id: 'stem-integration',
  title: 'STEM Integration',
  shortTitle: 'STEM',
  tagline: 'Science, Technology, Engineering and Mathematics in CBC',
  description: 'Bring STEM education to life in your CBC classroom. This CEMASTEA-aligned program covers inquiry-based learning, the 5E model, cross-curricular STEM links, and practical project-based learning with low-cost materials.',
  track: 'stem',
  kicdAlignment: 'CEMASTEA-aligned STEM Teacher PD Framework',
  hours: 6,
  lessons: 9,
  accent: 'accent',
  available: true,
  modules: [
    {
      id: 'm1',
      title: 'STEM in the CBC Context',
      description: 'Understand STEM education and how it maps onto Kenya\'s CBC framework.',
      lessons: [
        {
          id: 'l1', title: 'What is STEM Education?', duration: '15 min',
          videoTitle: 'STEM Education in Africa: Context and Opportunity',
          videoPoints: ['STEM as integrated, not just separate subjects', 'Why Kenya needs STEM thinking from primary level', 'CEMASTEA\'s role in STEM teacher development', 'What STEM looks like in a Kenyan classroom'],
          reading: `STEM education — Science, Technology, Engineering, and Mathematics — is more than teaching these subjects separately. It is an integrated approach where learners apply concepts from multiple disciplines to solve real problems. In a STEM lesson, a learner might apply mathematics to measure, science to hypothesise, engineering to design, and technology to build — all in service of a single challenge.\n\nKenya recognised STEM\'s importance to national development early. CEMASTEA (Centre for Mathematics, Science and Technology Education in Africa) has worked for decades to build STEM teaching capacity. CBC provides the curriculum context: its emphasis on Critical Thinking, Problem Solving, and Creativity maps perfectly onto STEM\'s inquiry-based approach.`,
          reflectionPrompt: 'Identify one topic you currently teach in Science or Mathematics. How could it be approached as a STEM challenge rather than a traditional lesson?',
          reflectionPlaceholder: 'Topic: ...\nAs a STEM challenge, learners could: ...\nThis would connect to these subjects: ...',
        },
        {
          id: 'l2', title: 'STEM in the CBC Curriculum', duration: '20 min',
          videoTitle: 'Mapping STEM to CBC Strands and Learning Areas',
          videoPoints: ['Science & Technology strands with STEM potential', 'Mathematics as the language of STEM', 'Pre-Technical Studies and engineering thinking', 'Creative Arts and design thinking connections'],
          reading: `STEM threads through multiple CBC learning areas. Science & Technology develops the scientific method, hypothesis testing, and technological thinking. Mathematics provides the quantitative tools for all STEM fields. Pre-Technical Studies (Upper Primary) introduces engineering design and making. Even Creative Arts contributes design thinking — the iterative process of designing, building, testing, and improving.\n\nThe CBC Science & Technology strand structure explicitly includes inquiry: learners are expected to investigate, design, make, and evaluate. This maps directly to STEM pedagogy. When planning STEM-integrated lessons, look for natural connections: a lesson on fractions becomes a cooking measurement challenge; a lesson on ecosystems becomes a water quality investigation; a lesson on structures becomes a bridge-building challenge.`,
          reflectionPrompt: 'Look at your timetable for this week. Identify two natural connections between different learning areas that could become a STEM lesson.',
          reflectionPlaceholder: 'Connection 1: [Subject A] + [Subject B] → STEM challenge: ...\nConnection 2: ...',
        },
        {
          id: 'l3', title: 'Cross-Curricular STEM Links', duration: '25 min',
          videoTitle: 'Breaking Down Subject Silos: Cross-Curricular STEM Planning',
          videoPoints: ['What cross-curricular planning looks like in practice', 'Coordinating with colleagues across subjects', 'Learner benefit of integrated approaches', 'Time and curriculum management for STEM integration'],
          reading: `Cross-curricular STEM happens when two or more subjects share a learning experience. This requires coordination — ideally, the class teacher plans explicitly for connections, but even informal links are valuable. When learners see that fractions show up in music (rhythm), in cooking (recipes), and in construction (measurements), they understand that mathematics is not a school subject — it is a way of describing the world.\n\nEffective cross-curricular STEM in CBC doesn\'t require abandoning the curriculum plan. It requires intentional noticing: as you plan a science investigation, ask "what mathematics is embedded here?" As you teach a geography lesson, ask "what engineering or technology concepts connect?" Small, regular cross-curricular links are more powerful than occasional "STEM days" because they build persistent habits of integrated thinking.`,
          reflectionPrompt: 'Plan one "curriculum link moment" for this week: identify a concept in one subject that you will deliberately connect to another subject. How will you make the connection explicit for learners?',
          reflectionPlaceholder: 'Primary subject: ...\nConnected subject: ...\nConcept: ...\nHow I\'ll make it explicit: ...',
        },
      ],
    },
    {
      id: 'm2',
      title: 'Inquiry-Based Learning',
      description: 'The 5E model and practical inquiry approaches for CBC STEM teaching.',
      lessons: [
        {
          id: 'l1', title: 'The 5E Inquiry Model', duration: '25 min',
          videoTitle: 'The 5E Model in Action: A CBC Science Lesson',
          videoPoints: ['Engage: hooking learners with a question or phenomenon', 'Explore: structured hands-on investigation', 'Explain: connecting experience to concepts', 'Elaborate: applying to new contexts', 'Evaluate: formative and summative assessment'],
          reading: `The 5E instructional model — Engage, Explore, Explain, Elaborate, Evaluate — is a research-based framework for inquiry teaching that aligns perfectly with CBC\'s competency approach. Unlike traditional lessons that begin with the teacher explaining and end with learners practising, the 5E begins with a question or phenomenon that hooks learners, then guides them through progressive stages of discovery.\n\nIn the Engage phase, you spark curiosity: "Why does ice melt faster in the sun?" In Explore, learners investigate hands-on. In Explain, you connect their observations to the scientific concept. In Elaborate, they apply the concept to a new situation. Evaluate is embedded throughout — in the quality of their questions, their investigation methods, and their explanations. The 5E ensures learners construct understanding rather than passively receive it.`,
          reflectionPrompt: 'Choose an upcoming science or mathematics topic. Design a brief 5E outline for a lesson on it.',
          reflectionPlaceholder: 'Topic: ...\nEngage (hook): ...\nExplore (activity): ...\nExplain (key concept to draw out): ...\nElaborate (application): ...\nEvaluate (how you\'ll check understanding): ...',
        },
        {
          id: 'l2', title: 'Designing STEM Investigations', duration: '30 min',
          videoTitle: 'From Question to Conclusion: Running a STEM Investigation',
          videoPoints: ['Forming investigable questions from learner curiosity', 'Fair test design in primary science', 'Data collection and recording methods', 'Drawing evidence-based conclusions'],
          reading: `A STEM investigation begins with a question that can be tested: "Which material absorbs water best?" "Does the height of a ramp affect how far a car travels?" Good investigation questions are specific, testable, and connected to the learner\'s world. Teaching learners to form their own investigable questions is itself a critical thinking competency.\n\nFair test design — changing one variable at a time while keeping all others the same — is the foundational scientific method. Teach it through analogy: "If we change the ramp height AND the car weight at the same time, how will we know which change made the difference?" Simple data recording tables (variable, measurement, repeat measurements) teach both scientific rigour and mathematical recording. Always return to the original question: "What does our evidence tell us?"`,
          reflectionPrompt: 'Design a simple fair-test investigation your class could do with materials found in or around your school.',
          reflectionPlaceholder: 'Question: Does... affect...?\nWhat we will change (variable): ...\nWhat we will keep the same: ...\nWhat we will measure: ...\nMaterials needed: ...',
        },
        {
          id: 'l3', title: 'Low-Cost STEM Materials', duration: '20 min',
          videoTitle: 'STEM with Zero Budget: Resources in Your Community',
          videoPoints: ['Everyday materials for science investigations', 'Community resources as STEM learning contexts', 'Making STEM kits from local materials', 'Sustainability and reuse in STEM education'],
          reading: `One of the most persistent myths about STEM education is that it requires expensive equipment. In reality, some of the most powerful STEM investigations use materials found at home or in the school compound. Bottle tops for counting and sorting, soil and water for filtration experiments, local plants for biology investigations, cardboard and straws for engineering challenges — the resources are around you.\n\nA "STEM kit" for your classroom can be assembled from: paper, cardboard, scissors, tape, string, rubber bands, bottle tops, paper clips, and water. These materials support dozens of investigations across multiple grades. Equally valuable is the community itself: invite a local farmer to discuss soil science; take learners to a construction site (safely, with permission) to study engineering; observe weather patterns in the school compound over weeks.`,
          reflectionPrompt: 'List 5 materials you could collect from your school or community this week to build a basic STEM kit for your class.',
          reflectionPlaceholder: '1. ...\n2. ...\n3. ...\n4. ...\n5. ...\nPossible investigations using these: ...',
        },
      ],
    },
    {
      id: 'm3',
      title: 'STEM Projects',
      description: 'Design, run, and celebrate project-based STEM learning in your classroom.',
      lessons: [
        {
          id: 'l1', title: 'Project-Based Learning Basics', duration: '20 min',
          videoTitle: 'PBL in Primary Schools: What It Is and Why It Works',
          videoPoints: ['What makes a learning experience a genuine "project"', 'The driving question in PBL', 'Learner voice and choice in project design', 'Managing PBL with large classes'],
          reading: `Project-Based Learning (PBL) is an extended inquiry where learners investigate and respond to a complex, real-world question or problem. Unlike a traditional assignment, a PBL project unfolds over days or weeks, involves multiple disciplines, and results in a public product — something shared with an audience beyond the classroom.\n\nThe "driving question" is central to PBL: it should be open-ended, genuinely interesting, and connected to learners\' lives. "How can we reduce waste in our school?" or "What makes bridges strong?" invite sustained inquiry. Learner voice and choice — deciding on their own investigation approach, team structure, and final product — builds the CBC competencies of Critical Thinking, Creativity, and Self-Efficacy simultaneously.`,
          reflectionPrompt: 'Write a driving question for a 2-week STEM project appropriate for your grade level. What real-world problem or question would genuinely engage your learners?',
          reflectionPlaceholder: 'Driving question: How can we...? / What makes...?\nWhy this is relevant to my learners: ...\nSubjects this connects to: ...',
        },
        {
          id: 'l2', title: 'Running a Classroom STEM Project', duration: '30 min',
          videoTitle: 'Managing a STEM Project from Start to Finish',
          videoPoints: ['Planning the project arc across days/weeks', 'Daily STEM session structure', 'Managing noise, movement, and materials', 'Check-in points to keep groups on track'],
          reading: `Running a multi-week STEM project requires clear structure. Plan the project arc: Day 1, introduce the driving question and form teams; Days 2–3, research and plan; Days 4–7, design and build; Days 8–9, test and revise; Day 10, present and reflect. Within this arc, each daily STEM session follows a mini-structure: brief check-in (5 min), work time (30 min), debrief (5 min).\n\nManagement challenges are real in large classes: noise, access to materials, uneven team contributions. Strategies that help: assign roles within each group (materials manager, recorder, timekeeper, presenter); create clear material stations rather than distributing everything at once; use a visual project tracker on the wall so groups can see their progress. Expect iteration — the best STEM learning happens when initial designs fail and learners persevere.`,
          reflectionPrompt: 'Map out a 5-day mini STEM project for your class. What happens each day? What is the driving question? What will learners produce?',
          reflectionPlaceholder: 'Driving question: ...\nDay 1: ...\nDay 2: ...\nDay 3: ...\nDay 4: ...\nDay 5 (presentation): ...',
        },
        {
          id: 'l3', title: 'Showcasing and Celebrating Learner Work', duration: '15 min',
          videoTitle: 'STEM Fairs and Exhibitions: Making Learning Public',
          videoPoints: ['The value of authentic audiences for learner motivation', 'Organising a simple classroom STEM fair', 'Linking STEM projects to community challenges', 'Connecting with CEMASTEA and STEM competitions'],
          reading: `When learners share their STEM projects with an audience — parents, other classes, community members — motivation and quality both increase. An authentic audience gives purpose to the work. Organising even a small classroom STEM fair (where each group sets up their project and explains it to visiting learners) dramatically increases learner engagement and communication competency development.\n\nCEMASTEA and various NGOs run STEM competitions for Kenyan schools that provide external motivation and the chance to present work nationally. While competitions are not the primary goal, connecting classroom projects to real-world challenges (school water management, local environmental issues, community health) grounds STEM learning in the competencies CBC most values: citizenship, critical thinking, and problem-solving in service of others.`,
          reflectionPrompt: 'How could you create a public audience for a learner STEM project this term? Who could you invite? How would you prepare learners to present?',
          reflectionPlaceholder: 'Audience: ...\nFormat: ...\nPreparation: ...\nDate I could do this: ...',
        },
      ],
    },
  ],
  preAssessment: [
    { id: 'q1', question: 'STEM education is best described as:', options: ['Teaching science, technology, engineering, and maths separately', 'An integrated approach connecting multiple disciplines to solve real problems', 'Only for secondary schools', 'A replacement for the CBC Science curriculum'], correct: 1, explanation: 'STEM is integrated — learners apply concepts from multiple disciplines to real problems.' },
    { id: 'q2', question: 'The 5E model stands for:', options: ['Explain, Explore, Experiment, Evaluate, Extend', 'Engage, Explore, Explain, Elaborate, Evaluate', 'Enable, Explore, Examine, Evaluate, Extend', 'Enquire, Explore, Explain, Examine, Evaluate'], correct: 1, explanation: '5E = Engage, Explore, Explain, Elaborate, Evaluate — a research-based inquiry teaching framework.' },
    { id: 'q3', question: 'A "fair test" in science means:', options: ['A test that all learners find easy', 'Changing one variable at a time while keeping others the same', 'Testing learners fairly without bias', 'A test that is graded fairly'], correct: 1, explanation: 'A fair test changes only one variable (independent variable) while controlling all others, making results valid.' },
    { id: 'q4', question: 'The "driving question" in PBL should be:', options: ['Closed — with one correct answer', 'Open-ended and connected to real-world problems', 'From the textbook', 'Decided only by the teacher'], correct: 1, explanation: 'A PBL driving question is open-ended, genuinely interesting, and connected to learners\' real world.' },
    { id: 'q5', question: 'Running a STEM project requires expensive equipment:', options: ['True — STEM needs labs and technology', 'False — many powerful investigations use everyday materials', 'Only partly — some technology is always required', 'Depends on the school budget'], correct: 1, explanation: 'False — bottle tops, cardboard, water, soil, and local materials support many powerful STEM investigations.' },
    { id: 'q6', question: 'CEMASTEA is:', options: ['A science textbook publisher', 'The Centre for Mathematics, Science and Technology Education in Africa', 'A ministry department', 'A learner competition organiser only'], correct: 1, explanation: 'CEMASTEA = Centre for Mathematics, Science and Technology Education in Africa — a regional STEM teacher development institution.' },
  ],
  postAssessment: [
    { id: 'q1', question: 'STEM integration in CBC connects best with which competencies?', options: ['Only digital literacy', 'Critical Thinking, Problem Solving, and Creativity', 'Only self-efficacy', 'Only communication'], correct: 1, explanation: 'STEM naturally develops Critical Thinking, Problem Solving, and Creativity — all core CBC competencies.' },
    { id: 'q2', question: 'In the 5E model, the "Explore" phase is:', options: ['The teacher explaining the concept', 'Learners investigating hands-on before the explanation', 'Learners taking a test', 'The homework phase'], correct: 1, explanation: 'Explore: learners investigate hands-on BEFORE the teacher explains — they discover before they are told.' },
    { id: 'q3', question: 'Cross-curricular STEM links are best built through:', options: ['Weekly STEM days only', 'Intentional noticing of connections across daily lessons', 'Separate STEM teachers', 'After-school clubs only'], correct: 1, explanation: 'Regular, intentional noticing of cross-subject connections is more effective than occasional special events.' },
    { id: 'q4', question: 'Learner voice and choice in PBL develops which CBC competency?', options: ['Digital Literacy only', 'Self-Efficacy, Critical Thinking, and Creativity', 'Citizenship only', 'Communication only'], correct: 1, explanation: 'When learners make choices about their investigation and product, they develop Self-Efficacy, Critical Thinking, and Creativity simultaneously.' },
    { id: 'q5', question: 'A public audience for STEM projects increases:', options: ['Test anxiety', 'Motivation, communication skills, and work quality', 'Competition between learners', 'Teacher workload only'], correct: 1, explanation: 'An authentic audience gives purpose to the work, increasing motivation, quality, and communication development.' },
    { id: 'q6', question: 'What should happen when a learner\'s STEM design fails?', options: ['Restart with a different topic', 'Treat failure as a learning opportunity and iterate', 'Give the learner the correct answer', 'Stop the project'], correct: 1, explanation: 'Failure and iteration are central to STEM learning — persevering through failure develops Self-Efficacy and genuine engineering thinking.' },
  ],
  assignment: {
    title: '2-Week STEM Project Plan',
    context: 'You have learned the principles of inquiry-based and project-based STEM learning. Now design a project you will actually run with your class.',
    task: 'Design a complete 2-week STEM project plan including: (1) A driving question connected to your community/environment, (2) Day-by-day outline (10 days), (3) Materials list using mostly locally available items, (4) How you will assess learning (not just the final product), (5) How you will share/celebrate the work with an audience.',
    hints: ['Choose a driving question that genuinely connects to your learners\' lives', 'Plan for failure — build in revision time', 'Assessment should happen throughout the project, not only at the end'],
    rubric: ['Driving question is open-ended, engaging, and community-connected', 'Day-by-day plan shows clear progression through inquiry stages', 'Materials are realistic and low-cost', 'Assessment plan is ongoing and competency-based', 'Celebration/showcase plan is achievable'],
  },
  certificate: { subtitle: 'STEM Integration Program', skills: ['STEM Education Principles', 'The 5E Inquiry Model', 'Fair Test Investigation Design', 'Cross-Curricular STEM Planning', 'Project-Based Learning', 'Low-Cost STEM Resources'] },
}

/* ── Coming-Soon Programs ──────────────────────────────────── */
const languageTeaching: Program = {
  id: 'language-teaching',
  title: 'Language Teaching in CBC',
  shortTitle: 'Languages',
  tagline: 'English & Kiswahili pedagogy in the CBC context',
  description: 'Effective strategies for teaching English and Kiswahili as both subjects and languages of instruction in the CBC era. Covers literacy development, multilingual classrooms, and reading competency.',
  track: 'languages',
  kicdAlignment: 'KICD Languages Strand — CBC PD Level 2',
  hours: 5,
  lessons: 9,
  accent: 'primary',
  available: false,
  launchingSoon: true,
  modules: [],
  preAssessment: [],
  postAssessment: [],
  assignment: { title: '', context: '', task: '', hints: [], rubric: [] },
  certificate: { subtitle: 'Language Teaching Program', skills: [] },
}

const schoolLeadership: Program = {
  id: 'school-leadership',
  title: 'School Leadership & Management',
  shortTitle: 'Leadership',
  tagline: 'Lead CBC implementation from the front office',
  description: 'KEMI-aligned professional development for school heads and deputy heads. Covers CBC change management, instructional leadership, staff coaching, and performance management in the CBC era.',
  track: 'leadership',
  kicdAlignment: 'KEMI Leadership Development Framework',
  hours: 8,
  lessons: 12,
  accent: 'accent',
  available: false,
  launchingSoon: true,
  modules: [],
  preAssessment: [],
  postAssessment: [],
  assignment: { title: '', context: '', task: '', hints: [], rubric: [] },
  certificate: { subtitle: 'School Leadership Program', skills: [] },
}

const humanitiesTrack: Program = {
  id: 'humanities-integration',
  title: 'Humanities & Social Studies',
  shortTitle: 'Humanities',
  tagline: 'History, geography, citizenship in the CBC context',
  description: 'Teaching Social Studies, Religious Education, and Creative Arts with CBC competency-based approaches. Covers inquiry learning in the humanities and connecting to learners\' lived experiences.',
  track: 'humanities',
  kicdAlignment: 'KICD Humanities Strand — CBC PD Level 2',
  hours: 5,
  lessons: 9,
  accent: 'primary',
  available: false,
  launchingSoon: true,
  modules: [],
  preAssessment: [],
  postAssessment: [],
  assignment: { title: '', context: '', task: '', hints: [], rubric: [] },
  certificate: { subtitle: 'Humanities Program', skills: [] },
}

/* ── Program 8: Teacher Wellbeing & Resilience ─────────────── */
const teacherWellbeing: Program = {
  id: 'teacher-wellbeing',
  title: 'Teacher Wellbeing & Resilience',
  shortTitle: 'Wellbeing',
  tagline: 'Sustain your passion for teaching',
  description: 'Build evidence-based habits to manage stress, prevent burnout, and sustain a fulfilling teaching career. Practical strategies designed for the realities of Kenyan CBC classrooms.',
  track: 'wellbeing',
  kicdAlignment: 'TSC Teacher PD — Professional Practice & Wellbeing',
  hours: 4,
  lessons: 9,
  accent: 'accent',
  available: true,
  modules: [
    {
      id: 'm1',
      title: 'Understanding Your Stress',
      description: 'Recognise burnout signals early and understand what drives them in the Kenyan teaching context.',
      lessons: [
        {
          id: 'l1',
          title: 'Recognising Teacher Burnout Early',
          duration: '12 min',
          videoTitle: 'The Warning Signs Teachers Miss',
          videoPoints: [
            'Burnout versus normal tiredness — how to tell the difference',
            'The three dimensions: exhaustion, cynicism, reduced efficacy',
            'Why teachers are particularly vulnerable to chronic stress',
            'Common early signals that are easy to dismiss',
          ],
          reading: `Teacher burnout is not a personal failure — it is a predictable response to sustained, unmanaged demands. Understanding the signs early gives you the power to respond before your health and love for teaching suffer.

**The Three Phases of Burnout**

Burnout rarely arrives overnight. Phase one is enthusiasm erosion — lessons that used to energise you feel flat. Phase two is disillusionment — persistent cynicism about learners, colleagues, or the system. Phase three is depletion — emotional numbness and a sense that nothing you do matters.

**Early Warning Signs**

The most commonly missed signals: dreading Monday from Saturday afternoon; feeling resentful when a learner asks a question you've answered hundreds of times; increasing difficulty separating from work thoughts during personal time; physical symptoms like disrupted sleep, frequent illness, or persistent headaches.

**Why Teaching in Kenya Is Particularly Demanding**

CBC implementation has added substantial new complexity to an already demanding role. Teachers are expected to be curriculum designers, counsellors, assessors, and administrators simultaneously — often with inadequate training, large class sizes, and limited resources. Recognising these systemic pressures is not complaining; it is accurate accounting of your professional reality.`,
          reflectionPrompt: 'Where are you on the burnout spectrum right now?',
          reflectionPlaceholder: 'Be honest with yourself. Rate your energy, enthusiasm, and sense of purpose on a scale of 1–10. What signals have you been ignoring?',
        },
        {
          id: 'l2',
          title: 'The Science of Stress in Education',
          duration: '14 min',
          videoTitle: 'What Chronic Stress Does to a Teacher\'s Brain',
          videoPoints: [
            'The cortisol-performance curve: optimal stress vs. chronic overload',
            'How sustained stress erodes patience and empathy',
            'Why willpower alone does not fix teacher stress',
            'The biological case for rest as a professional tool',
          ],
          reading: `Understanding the biology of stress helps teachers make sense of their responses under pressure — and why recovery is not laziness but a professional necessity.

**The Stress Response**

When you perceive a threat — an angry parent, a collapsing lesson, 60 noisy learners — your body releases cortisol and adrenaline. Heart rate rises, focus narrows, and non-urgent systems (immune response, empathic processing) are temporarily suppressed. This is helpful for short-term challenges.

The problem begins when this response is chronically activated. In a demanding teaching environment, your nervous system may rarely fully return to baseline. Over weeks and months, elevated cortisol levels reduce patience and impulse control, suppress the immune system, and decrease creative thinking — exactly the capacities that make great teaching possible.

**Recovery Is a Professional Requirement**

Many teachers feel guilty about rest, especially during CBC workload peaks. But recovery is not the opposite of productivity — it is the precondition for it. A teacher operating at 60% on a rested brain is more effective than one at 100% on an exhausted one. Sleep, brief physical activity, social connection, and time without professional responsibility are biological inputs that make sustained teaching possible.`,
          reflectionPrompt: 'What does genuine recovery actually look like in your current week?',
          reflectionPlaceholder: 'When do you truly switch off from work? What gets in the way? What one change this week could create even 30 minutes of genuine rest?',
        },
        {
          id: 'l3',
          title: 'Kenya-Specific Teaching Pressures',
          duration: '13 min',
          videoTitle: 'The Unique Demands of CBC Teaching in Kenya',
          videoPoints: [
            'Class sizes and resource constraints as systemic stressors, not personal failures',
            'The emotional weight of the CBC transition — feeling watched and judged',
            'Community expectations and the "super-teacher" image',
            'Financial pressures specific to the Kenyan teaching workforce',
          ],
          reading: `Kenyan teachers face stressors that international wellbeing research rarely addresses. Applying generic wellness advice to a Kenyan classroom context often fails. This lesson addresses the specific landscape honestly.

**The CBC Transition Burden**

Teachers are learning a new framework while teaching it, with inadequate training, limited resources, and without seeing the full curriculum picture for their learners. This ambiguity creates chronic low-level anxiety that is easy to internalise as personal incompetence. It is a systems challenge being absorbed by individual teachers.

**Class Size Realities**

A class of 50+ learners requires individualised CBC assessment for every child. The emotional labour of maintaining positive, attentive relationships with 50 individuals — tracking their competencies, family situations, and wellbeing — is enormous. Acknowledging this is not complaining; it is accurate accounting of your work.

**Community Expectations**

In many Kenyan communities, teachers are expected to be available at all times. While this trust is meaningful, it extends professional responsibility into all areas of personal life. Communicating clearly and kindly about your availability is a professional skill, not rudeness.

**Financial Stress**

TSC salary delays, school-level financial expectations, and the cost of maintaining classroom resources from personal funds add material stress that affects wellbeing. These are systemic issues that deserve collective solutions — and individual acknowledgement.`,
          reflectionPrompt: 'Which systemic pressure affects you most? What is one thing within your control?',
          reflectionPlaceholder: 'Separate what you can influence from what you cannot. What one small shift in the controllable part could make a meaningful difference this term?',
        },
      ],
    },
    {
      id: 'm2',
      title: 'Practical Resilience Tools',
      description: 'Evidence-based, low-cost strategies you can start using this week.',
      lessons: [
        {
          id: 'l1',
          title: 'Micro-Recovery During the School Day',
          duration: '12 min',
          videoTitle: 'Small Habits That Restore Energy Without Extra Time',
          videoPoints: [
            'The 2-minute transition ritual between lessons',
            'Box breathing — a 90-second nervous system reset',
            'Strategic use of preparation periods for actual recovery',
            'The "shutdown complete" end-of-day practice',
          ],
          reading: `Wellbeing doesn't require a retreat. Daily micro-recovery practices can meaningfully reduce cumulative stress within the constraints of a full teaching timetable.

**The Transition Ritual**

Between lessons, your brain is still processing the previous class while preparing for the next. Without a reset, stress accumulates through the day. A simple 2-minute transition ritual — stepping outside briefly, taking 5 deep breaths, naming one thing that went well in the last lesson — breaks this accumulation.

**Box Breathing**

When you notice rising tension, box breathing activates the parasympathetic nervous system within 90 seconds. Inhale for 4 counts. Hold for 4. Exhale for 4. Hold for 4. Repeat 3–4 times. This is evidence-based, invisible to others, and requires nothing except 90 seconds of intention.

**Preparation Periods**

Research consistently shows that preparation periods used entirely for marking leave teachers more depleted, not less. Splitting prep time — 70% task-focused, 30% deliberately resting your thinking — produces better quality work and more sustainable energy across the day.

**The Shutdown Practice**

At the end of the working day, review your task list, update your plan for tomorrow, and say (or think) "shutdown complete." This signals to your brain that professional processing is done for the day — reducing the intrusive work thoughts that occupy personal time and fragment recovery.`,
          reflectionPrompt: 'Which micro-recovery practice could you realistically start tomorrow?',
          reflectionPlaceholder: 'Be specific. What time of day? What would it look like in your actual school context? What might get in the way, and how would you handle that?',
        },
        {
          id: 'l2',
          title: 'Setting Boundaries Without Guilt',
          duration: '15 min',
          videoTitle: 'Professional Limits as a Teaching Competency',
          videoPoints: [
            'Why boundaries protect learners as much as teachers',
            'Scripts for common boundary situations in Kenyan schools',
            'Communicating limits to parents, colleagues, and administration',
            'The difference between caring and absorbing',
          ],
          reading: `The most common reason teachers give for not setting limits is guilt — a feeling that a "real" teacher would always say yes. This lesson reframes boundaries as professional stewardship, not selfishness.

**Boundaries Protect Learners**

A teacher who never sets limits gradually becomes depleted. A depleted teacher has less patience, creativity, and emotional presence available for the class. Setting appropriate limits on your availability is, ultimately, a professional act of care for your learners.

**Common Situations and Responses**

*Parent messages after 8pm:* "Thank you for reaching out. I'll respond during school hours tomorrow."

*Unplanned extra duties:* "I want to do this well — could you tell me which current responsibility this replaces, or should we discuss with the head teacher?"

*Colleagues expecting unlimited support:* "I have 20 minutes now — is that enough? If we need longer, can we find a time that works for both of us?"

None of these responses are unkind. They are honest and they protect your capacity to teach.

**Caring Versus Absorbing**

There is a difference between caring about a learner's situation and taking on their distress as your own. You can hold compassion for a struggling family without personally solving their problems. This distinction — clearly understood — is the foundation of sustainable teaching.`,
          reflectionPrompt: 'Where in your professional life do you feel you have no boundaries? What is the cost?',
          reflectionPlaceholder: 'Name one boundary you have been needing to set. What is stopping you? Write the exact words you would use.',
        },
        {
          id: 'l3',
          title: 'Actually Resting During Holidays',
          duration: '13 min',
          videoTitle: 'Why Teachers Don\'t Feel Rested After Holidays (and How to Fix It)',
          videoPoints: [
            'Physical, cognitive, and emotional rest — three distinct needs',
            'Why marking during holidays prevents real recovery',
            'Planning the first and last weeks of term sustainably',
            'Social connection as a non-negotiable recovery tool',
          ],
          reading: `Most Kenyan teachers end a school holiday still feeling tired. This is because rest without intention rarely produces recovery. Understanding the types of rest — and planning deliberately for each — transforms holidays from administrative gaps into genuine restoration.

**Three Types of Rest**

*Physical rest* is sleep and reduced physical demand. Seven to eight hours of sleep per night consistently produces measurable improvements in mood, patience, and cognitive function within 5–7 days.

*Cognitive rest* is time without professional thinking. Checking curriculum resources, planning lessons, and reading education circulars all use the same mental resources as teaching. True cognitive rest requires at least 4–5 consecutive days with no professional reading or planning.

*Emotional rest* is time without being the person who is needed. For teachers who are also community resources, this can be the rarest form of rest. It requires deliberately communicating reduced availability and spending time in relationships where you receive care rather than only giving it.

**The First and Last Weeks of Term**

The first week back is often the most draining. Deliberately planning gentler activities — review and reconnection rather than new content — preserves energy for the rest of term. Similarly, planning the final week as reduced-load protects quality to the very last day and creates psychological closure.`,
          reflectionPrompt: 'Did you feel genuinely restored at the start of the last term? What was missing?',
          reflectionPlaceholder: 'Honestly describe your last holiday. Which type of rest was missing? What would you plan differently next time?',
        },
      ],
    },
    {
      id: 'm3',
      title: 'Sustaining a Teaching Career',
      description: 'Build long-term systems and habits that keep you engaged and effective for years.',
      lessons: [
        {
          id: 'l1',
          title: 'Building Your Teacher Support Network',
          duration: '12 min',
          videoTitle: 'Why Peer Support Is a Professional Necessity',
          videoPoints: [
            'The evidence for peer support on teacher retention and wellbeing',
            'Starting wellbeing conversations in your staffroom',
            'Formal and informal support structures in Kenyan schools',
            'Digital communities for Kenyan CBC teachers',
          ],
          reading: `Teacher isolation — working in professional silos without peer support — is one of the strongest predictors of early career exit. Building deliberate connections with colleagues is not a soft addition to PD; it is a career sustainability strategy.

**What Effective Peer Support Looks Like**

It often begins with two colleagues who agree to a weekly 15-minute check-in — not about logistics, but about how they are actually managing. "What worked this week? What are you struggling with?" — asked and answered honestly between trusted colleagues — does more for sustained wellbeing than many formal training events.

**Starting the Conversation**

Many teachers feel uncomfortable initiating wellbeing conversations, especially where professional stoicism is valued. A simple entry: "I've been finding [specific challenge] really hard this term. Have you had anything similar?" This invitation is almost universally met with relief rather than discomfort.

**Building on What Exists**

Most schools have informal peer relationships that can be intentionally deepened. The lunch break that could include one honest conversation. The staff group chat used for logistics that could also hold a weekly reflection question. The colleague who already checks on you — who could you offer that to in return?

These small, consistent investments in professional relationships are among the most evidence-based and lowest-cost interventions for teacher wellbeing available.`,
          reflectionPrompt: 'Who is in your professional support system? Are they aware of it?',
          reflectionPlaceholder: 'Name 1–2 colleagues who support you. What makes those relationships different? Is there someone you could offer that kind of intentional support to?',
        },
        {
          id: 'l2',
          title: 'Managing CBC Workload Sustainably',
          duration: '15 min',
          videoTitle: 'Working Smarter with CBC Planning and Assessment',
          videoPoints: [
            'The minimum viable lesson plan — what CBC actually requires vs. what teachers add',
            'Batching assessment to reduce daily cognitive load',
            'Using learners in the assessment process (as CBC intends)',
            'Identifying tasks that don\'t serve learners and declining them',
          ],
          reading: `CBC was designed to improve learning outcomes, not to maximise teacher administrative burden. Many teachers have accumulated workload that exceeds what KICD actually requires. This lesson helps identify and reduce that excess.

**The Minimum Viable Lesson Plan**

A CBC lesson plan needs: a clear learning outcome, an engaging activity, a formative check. It does not need to be a multi-page document for every lesson. Scheme of work and classroom lesson notes are different things — many teachers merge them unnecessarily due to anxiety or unclear school requirements.

Identify what your school actually requires versus what you are producing from habit. The gap is often significant and reducible.

**Batching Assessment**

Spreading assessment recording throughout the week means your brain never fully exits assessment mode. Designating two focused windows per week for all recording reduces both the total time and the cognitive residue. Involving learners in self-assessment and peer assessment is both pedagogically sound (CBC explicitly requires learner agency) and practically lightening.

**Strategic Prioritisation**

Not every request requires a yes. Developing clarity about what directly serves your learners — and politely declining what doesn't — is a professional skill that accumulates into significant workload reduction over a term. This is not laziness; it is professional stewardship.`,
          reflectionPrompt: 'Where is your workload higher than CBC actually requires? What could you simplify?',
          reflectionPlaceholder: 'List 3 tasks that take significant time. Which are KICD requirements? Which are school habits or personal anxiety? What would happen if you reduced them?',
        },
        {
          id: 'l3',
          title: 'Renewing Your Joy for Teaching',
          duration: '14 min',
          videoTitle: 'Reconnecting with Why You Chose This Work',
          videoPoints: [
            'The research on purpose as the strongest buffer against burnout',
            'Identifying your personal teaching "why"',
            'Designing small moments of joy into everyday practice',
            'Long-term career planning that honours your wellbeing',
          ],
          reading: `The teachers who sustain 20–30-year careers and look back with satisfaction are not those who experienced no difficulty. They are those who maintained access to their reasons for choosing teaching, even during the hardest periods.

**Purpose as a Buffer Against Burnout**

Research on occupational wellbeing consistently finds that sense of purpose is the strongest predictor of sustained engagement in demanding careers. Purpose doesn't mean feeling inspired every day — it means having a clear enough answer to "why am I doing this?" to navigate the days when the answer feels distant.

**Finding Your Teaching Why**

Reflect: When was the last time you felt genuinely effective as a teacher? What was happening? Who was involved? What specifically did you do? These answers point toward your professional values — the anchor you return to during difficult periods.

Common teaching "whys" among Kenyan teachers: seeing a first-generation learner access opportunities their parents couldn't. Watching a struggling child grasp something after weeks of patience. Building something in a community that will outlast your own presence there.

**Designing Joy Into Practice**

Joy in teaching is not something that happens to you — it is something you design. One topic per term that genuinely excites you. One lesson per week that you would be happy to have observed, not because it is perfect but because it is authentically yours. One learner per class who responds most visibly to what you offer.

These small designs, compounded across a career, create a teaching life that sustains itself.`,
          reflectionPrompt: 'What is your teaching why? When did you last feel clearly connected to it?',
          reflectionPlaceholder: 'Write it down — your actual reason for teaching, not what sounds good but what gets you up on the hard days. When did you last feel that clearly?',
        },
      ],
    },
  ],
  preAssessment: [
    { id: 'wb-pre-1', question: 'Which of these is a recognised early warning sign of teacher burnout?', options: ['Feeling more energised than usual', 'Reduced enthusiasm for lessons that previously engaged you', 'Wanting to improve lesson quality', 'Spending more time preparing'], correct: 1, explanation: 'Erosion of enthusiasm for previously engaging work is one of the earliest and most reliable burnout signals.' },
    { id: 'wb-pre-2', question: 'In CBC implementation, teacher stress is best understood as:', options: ['A personal weakness to overcome', 'Inevitable and unchangeable', 'A predictable response to systemic demands that can be managed', 'Proof that the teacher needs more training'], correct: 2, explanation: 'Burnout is a systemic, predictable response — not a personal failing. This framing is essential for genuine recovery.' },
    { id: 'wb-pre-3', question: 'Which activity provides the most effective cognitive rest?', options: ['Marking books in a different room', 'Reading CBC curriculum resources', 'Planning next term\'s lessons', 'Spending time completely away from professional tasks'], correct: 3, explanation: 'Cognitive rest requires complete disengagement from professional thinking — not just a change of location.' },
    { id: 'wb-pre-4', question: 'Setting professional limits (boundaries) primarily benefits:', options: ['Only the teacher\'s personal life', 'Only school administration', 'Both the teacher and their learners', 'Only parents'], correct: 2, explanation: 'A teacher with sustainable limits has more emotional presence, patience, and creativity available for learners.' },
    { id: 'wb-pre-5', question: 'The most evidence-based approach to managing CBC workload is:', options: ['Working longer hours to stay ahead', 'Identifying minimum viable requirements and reducing unnecessary additions', 'Delegating all marking to learners', 'Ignoring KICD assessment requirements'], correct: 1, explanation: 'Many teachers add workload beyond KICD requirements through anxiety or habit. Identifying the minimum viable approach reduces load without compromising standards.' },
    { id: 'wb-pre-6', question: 'Teacher peer support networks are most valuable because they:', options: ['Replace formal professional development', 'Provide emotional validation from colleagues who share the same context', 'Reduce class sizes', 'Guarantee salary increases'], correct: 1, explanation: 'Peer support from colleagues who understand the same pressures is one of the most effective and accessible wellbeing interventions available.' },
  ],
  postAssessment: [
    { id: 'wb-post-1', question: 'Box breathing works as a stress-reduction technique because it:', options: ['Distracts attention from the stressor', 'Activates the parasympathetic nervous system within 90 seconds', 'Increases cortisol levels temporarily', 'Requires 10+ minutes to be effective'], correct: 1, explanation: 'Controlled breathing directly activates the parasympathetic (rest-and-digest) nervous system, reducing the stress response rapidly.' },
    { id: 'wb-post-2', question: 'The "shutdown complete" practice helps teachers by:', options: ['Allowing them to work later in the evening', 'Signalling to the brain that professional processing is done for the day', 'Improving lesson planning quality', 'Reducing the need for sleep'], correct: 1, explanation: 'A deliberate end-of-day ritual creates psychological closure, reducing the intrusive work thoughts that fragment personal recovery time.' },
    { id: 'wb-post-3', question: 'When CBC workload exceeds what KICD requires, this is most often caused by:', options: ['Learner misbehaviour', 'Anxiety, habit, and unclear school requirements', 'TSC regulations', 'Parental demands'], correct: 1, explanation: 'Teachers frequently add documentation and planning work beyond KICD minimums due to anxiety or unclear guidance — reducing this excess is both practical and professionally sound.' },
    { id: 'wb-post-4', question: 'Emotional rest is best defined as:', options: ['Sleeping for more than 8 hours', 'Time without being the person who is needed', 'A holiday abroad', 'Avoiding all professional reading'], correct: 1, explanation: 'Emotional rest requires time in relationships and spaces where you receive care rather than giving it — especially important for teachers who are community resources.' },
    { id: 'wb-post-5', question: 'Your personal teaching "why" is most useful when:', options: ['Writing a job application', 'Navigating difficult periods by reconnecting with your professional purpose', 'Impressing inspectors', 'Completing TSC forms'], correct: 1, explanation: 'Purpose is the strongest buffer against burnout — not because it eliminates difficulty, but because it provides a clear reason to navigate through it.' },
    { id: 'wb-post-6', question: 'The most sustainable way to build peer support in a school is:', options: ['Formal weekly staff meetings', 'Small, consistent, honest check-ins with 1–2 trusted colleagues', 'Anonymous feedback boxes', 'Performance appraisals'], correct: 1, explanation: 'Sustained peer support grows from small, regular, honest exchanges between trusted colleagues — not from formal structures.' },
  ],
  assignment: {
    title: 'My Wellbeing Action Plan',
    context: 'You have explored the science of teaching stress and practical resilience strategies. Now it\'s time to create a personalised wellbeing plan for your specific context.',
    task: 'Write a 300–500 word Wellbeing Action Plan that: (1) honestly names your 2 biggest stress contributors this term, (2) identifies one micro-recovery practice you will commit to and how it fits your timetable, (3) describes one professional boundary you will set and the exact words you will use, and (4) states your teaching "why" in 2–3 sentences.',
    hints: [
      'Be honest about your actual situation — generic plans don\'t get implemented',
      'For the boundary, write the specific words, not just the intention',
      'Your "why" should be personal, not what sounds good on paper',
      'Consider what would make this plan easy to revisit in 4 weeks',
    ],
    rubric: [
      'Specific and honest identification of personal stressors',
      'Realistic micro-recovery practice with implementation detail',
      'Concrete boundary with specific language',
      'Authentic teaching purpose statement',
    ],
  },
  certificate: {
    subtitle: 'Teacher Wellbeing & Resilience Program',
    skills: [
      'Burnout recognition and early intervention',
      'Evidence-based stress management techniques',
      'Professional boundary-setting',
      'Sustainable CBC workload management',
      'Peer support and resilience building',
    ],
  },
}

export const PROGRAMS: Program[] = [
  cbcFoundations,
  assessmentForLearning,
  inclusiveEducation,
  stemIntegration,
  teacherWellbeing,
  languageTeaching,
  schoolLeadership,
  humanitiesTrack,
]

export const TRACKS: { id: Track; label: string; count: number }[] = [
  { id: 'core',      label: 'Core CBC',  count: 3 },
  { id: 'stem',      label: 'STEM',      count: 1 },
  { id: 'wellbeing', label: 'Wellbeing', count: 1 },
  { id: 'languages', label: 'Languages', count: 1 },
  { id: 'humanities',label: 'Humanities',count: 1 },
  { id: 'leadership',label: 'Leadership',count: 1 },
]

export function getProgramById(id: string): Program | undefined {
  return PROGRAMS.find(p => p.id === id)
}

export function getLessonById(program: Program, moduleId: string, lessonId: string) {
  const mod = program.modules.find(m => m.id === moduleId)
  if (!mod) return null
  const lesson = mod.lessons.find(l => l.id === lessonId)
  if (!lesson) return null
  return { module: mod, lesson }
}

export function getNextLesson(program: Program, moduleId: string, lessonId: string): { moduleId: string; lessonId: string } | null {
  for (let mi = 0; mi < program.modules.length; mi++) {
    const mod = program.modules[mi]
    if (mod.id !== moduleId) continue
    const li = mod.lessons.findIndex(l => l.id === lessonId)
    if (li < mod.lessons.length - 1) return { moduleId: mod.id, lessonId: mod.lessons[li + 1].id }
    if (mi < program.modules.length - 1) {
      const nextMod = program.modules[mi + 1]
      return { moduleId: nextMod.id, lessonId: nextMod.lessons[0].id }
    }
    return null
  }
  return null
}

export function getPrevLesson(program: Program, moduleId: string, lessonId: string): { moduleId: string; lessonId: string } | null {
  for (let mi = 0; mi < program.modules.length; mi++) {
    const mod = program.modules[mi]
    if (mod.id !== moduleId) continue
    const li = mod.lessons.findIndex(l => l.id === lessonId)
    if (li > 0) return { moduleId: mod.id, lessonId: mod.lessons[li - 1].id }
    if (mi > 0) {
      const prevMod = program.modules[mi - 1]
      return { moduleId: prevMod.id, lessonId: prevMod.lessons[prevMod.lessons.length - 1].id }
    }
    return null
  }
  return null
}

export function getTotalLessons(program: Program): number {
  return program.modules.reduce((sum, m) => sum + m.lessons.length, 0)
}
