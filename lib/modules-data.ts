export type Lesson = {
  id: number
  title: string
  duration: number
  type: 'video' | 'reading' | 'quiz' | 'activity'
  content: string
  completed: boolean
}

export type Module = {
  id: number
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  lessons: Lesson[]
  progress: number
  icon: string
  objectives: string[]
  prerequisites: string[]
}

export const modulesData: Module[] = [
  {
    id: 1,
    title: 'CBC Fundamentals',
    description: 'Understand the core principles and philosophy of Competency-Based Curriculum.',
    category: 'foundations',
    difficulty: 'beginner',
    duration: 45,
    progress: 0,
    icon: '📚',
    objectives: [
      'Understand the philosophy behind CBC',
      'Identify the seven core competencies',
      'Explain the shift from content-based to competency-based learning',
      'Describe the role of the teacher in CBC',
      'Apply CBC principles in lesson planning',
    ],
    prerequisites: [],
    lessons: [
      {
        id: 1,
        title: 'Introduction to Competency-Based Curriculum',
        duration: 10,
        type: 'video',
        completed: false,
        content: `
# Introduction to Competency-Based Curriculum

Welcome to the first lesson on CBC Fundamentals. In this lesson, we will explore what Competency-Based Curriculum means and why Kenya adopted this educational approach.

## What is CBC?

Competency-Based Curriculum (CBC) is an educational approach that focuses on what learners can demonstrate they know and can do, rather than just what they have been taught. It emphasizes:

- **Skills development** over content memorization
- **Practical application** of knowledge
- **Individual learner progress** at their own pace
- **Holistic development** of the child

## Why Kenya Adopted CBC

Kenya introduced CBC in 2017 to address several challenges in the education system:

1. **Relevance**: Making education more relevant to the needs of the 21st century
2. **Employment**: Preparing learners for the job market with practical skills
3. **Innovation**: Fostering creativity and critical thinking
4. **Inclusivity**: Catering to diverse learning needs and abilities

## Key Features of CBC

- Learner-centered approach
- Continuous assessment
- Focus on competencies rather than just grades
- Integration of values and life skills
- Parental involvement in learning

In the next lesson, we will explore the seven core competencies in detail.
        `,
      },
      {
        id: 2,
        title: 'The Seven Core Competencies',
        duration: 12,
        type: 'reading',
        completed: false,
        content: `
# The Seven Core Competencies

The CBC framework is built around seven core competencies that every learner should develop. These competencies are interconnected and should be integrated across all learning areas.

## 1. Communication and Collaboration

Learners should be able to:
- Express ideas clearly in writing and speech
- Listen actively and respectfully
- Work effectively in teams
- Use various communication tools and technologies

## 2. Critical Thinking and Problem Solving

This competency enables learners to:
- Analyze information objectively
- Evaluate different perspectives
- Make informed decisions
- Solve problems creatively

## 3. Creativity and Imagination

Learners develop:
- Original thinking
- Artistic expression
- Innovation skills
- Ability to generate new ideas

## 4. Citizenship

This involves:
- Understanding rights and responsibilities
- Participating in community activities
- Respecting diversity
- Demonstrating patriotism

## 5. Digital Literacy

Learners should be able to:
- Use digital devices responsibly
- Access and evaluate online information
- Create digital content
- Stay safe online

## 6. Learning to Learn

This meta-competency includes:
- Self-directed learning
- Time management
- Goal setting
- Reflection and self-assessment

## 7. Self-Efficacy

Learners develop:
- Confidence in their abilities
- Resilience
- Growth mindset
- Personal responsibility

## Integrating Competencies in Teaching

As a teacher, you should design activities that develop multiple competencies simultaneously. For example, a group project can develop communication, collaboration, critical thinking, and creativity all at once.
        `,
      },
      {
        id: 3,
        title: 'From Content to Competency: The Paradigm Shift',
        duration: 8,
        type: 'video',
        completed: false,
        content: `
# From Content to Competency: The Paradigm Shift

This lesson explores the fundamental shift from traditional content-based education to competency-based learning.

## The Old Paradigm: Content-Based Education

Traditional education focused on:
- **Knowledge transmission**: Teacher as the source of all knowledge
- **Memorization**: Students expected to recall facts
- **Examinations**: High-stakes tests determining success
- **Standardization**: One-size-fits-all approach
- **Subject silos**: Learning compartmentalized by subject

## The New Paradigm: Competency-Based Education

CBC shifts the focus to:
- **Knowledge application**: Using knowledge to solve real problems
- **Understanding**: Deep comprehension over surface memorization
- **Continuous assessment**: Ongoing feedback and growth
- **Differentiation**: Personalized learning paths
- **Integration**: Cross-curricular connections

## What This Means for Teachers

| Old Role | New Role |
|----------|----------|
| Lecturer | Facilitator |
| Knowledge source | Learning guide |
| Assessor | Coach |
| Disciplinarian | Mentor |
| Content expert | Learning designer |

## Practical Implications

1. **Lesson planning** should focus on what learners will be able to DO
2. **Activities** should be hands-on and application-focused
3. **Assessment** should be varied and continuous
4. **Feedback** should be constructive and growth-oriented
5. **Environment** should be safe for experimentation and failure
        `,
      },
      {
        id: 4,
        title: 'The Teacher\'s Role in CBC',
        duration: 10,
        type: 'reading',
        completed: false,
        content: `
# The Teacher's Role in CBC

The role of the teacher in CBC is fundamentally different from traditional education. This lesson explores what it means to be a CBC teacher.

## From Sage on the Stage to Guide on the Side

In CBC, teachers transition from being the central source of knowledge to being facilitators of learning. This means:

### Facilitating Learning
- Creating enabling learning environments
- Providing resources and materials
- Guiding learners through activities
- Asking probing questions

### Differentiating Instruction
- Recognizing diverse learning needs
- Adapting activities for different learners
- Providing multiple pathways to learning
- Supporting struggling learners while challenging advanced ones

### Assessing Continuously
- Using formative assessment daily
- Providing immediate, constructive feedback
- Tracking individual learner progress
- Using assessment data to inform instruction

### Building Relationships
- Creating safe learning spaces
- Understanding each learner's background
- Involving parents in learning
- Collaborating with colleagues

## Key Skills for CBC Teachers

1. **Observation**: Watching and listening to understand learner needs
2. **Questioning**: Using questions to promote thinking
3. **Flexibility**: Adapting plans based on learner responses
4. **Creativity**: Designing engaging, relevant activities
5. **Patience**: Allowing learners to progress at their own pace
6. **Reflection**: Continuously improving practice

## Self-Assessment

Ask yourself:
- How much do I talk versus how much do my learners talk?
- Do I allow learners to make mistakes and learn from them?
- How do I accommodate different learning styles?
- Do I know each learner's strengths and challenges?
        `,
      },
      {
        id: 5,
        title: 'Knowledge Check: CBC Fundamentals',
        duration: 5,
        type: 'quiz',
        completed: false,
        content: `
# Knowledge Check: CBC Fundamentals

Test your understanding of the key concepts covered in this module.

## Quiz Questions

**Question 1:** What is the primary focus of Competency-Based Curriculum?

a) Memorizing facts and figures
b) Passing examinations
c) Developing skills and abilities learners can demonstrate
d) Following a strict syllabus

**Answer:** c) Developing skills and abilities learners can demonstrate

---

**Question 2:** How many core competencies are there in the CBC framework?

a) 5
b) 6
c) 7
d) 8

**Answer:** c) 7

---

**Question 3:** Which of the following best describes the teacher's role in CBC?

a) The main source of all knowledge
b) A facilitator and guide for learning
c) Someone who lectures all day
d) A strict disciplinarian

**Answer:** b) A facilitator and guide for learning

---

**Question 4:** Which is NOT one of the seven core competencies?

a) Communication and Collaboration
b) Test-Taking Skills
c) Digital Literacy
d) Self-Efficacy

**Answer:** b) Test-Taking Skills

---

**Question 5:** The shift from content-based to competency-based education means:

a) Less work for teachers
b) Focus on what learners can DO, not just what they know
c) Eliminating all examinations
d) Teaching only practical subjects

**Answer:** b) Focus on what learners can DO, not just what they know

## Reflection

After completing this quiz, reflect on:
- Which concepts are you most confident about?
- Which areas need more review?
- How can you apply these concepts in your classroom?
        `,
      },
    ],
  },
  {
    id: 2,
    title: 'Competency-Based Assessment',
    description: 'Learn how to design and implement effective competency-based assessments.',
    category: 'assessment',
    difficulty: 'intermediate',
    duration: 60,
    progress: 0,
    icon: '✅',
    objectives: [
      'Distinguish between formative and summative assessment',
      'Design rubrics for competency assessment',
      'Implement portfolio-based assessment',
      'Use observation as an assessment tool',
      'Provide constructive feedback to learners',
      'Document and report learner progress',
    ],
    prerequisites: ['CBC Fundamentals'],
    lessons: [
      {
        id: 1,
        title: 'Understanding Assessment in CBC',
        duration: 10,
        type: 'video',
        completed: false,
        content: `
# Understanding Assessment in CBC

Assessment in CBC is fundamentally different from traditional testing. This lesson introduces the key concepts of competency-based assessment.

## What is Competency-Based Assessment?

Competency-based assessment focuses on measuring what learners can DO with their knowledge, not just what they can recall. It:

- Measures application of skills
- Uses multiple methods
- Is ongoing and continuous
- Provides feedback for improvement
- Celebrates growth and progress

## Types of Assessment

### Formative Assessment
- Ongoing during learning
- Provides feedback for improvement
- Low or no stakes
- Examples: observations, questions, exit tickets

### Summative Assessment
- At the end of a learning period
- Evaluates achievement of competencies
- Higher stakes
- Examples: projects, portfolios, performances

## Key Principles

1. **Authentic**: Connected to real-world tasks
2. **Valid**: Measures what it claims to measure
3. **Reliable**: Consistent results across different contexts
4. **Fair**: Accessible to all learners
5. **Transparent**: Clear criteria known to learners
        `,
      },
      {
        id: 2,
        title: 'Designing Effective Rubrics',
        duration: 12,
        type: 'reading',
        completed: false,
        content: `
# Designing Effective Rubrics

Rubrics are essential tools for assessing competencies. This lesson teaches you how to create and use effective rubrics.

## What is a Rubric?

A rubric is a scoring guide that describes levels of performance for a task. It includes:
- Criteria: What is being assessed
- Levels: Degrees of quality
- Descriptors: What each level looks like

## Types of Rubrics

### Holistic Rubrics
- Single overall score
- Quick to use
- Good for general assessment
- Less detailed feedback

### Analytic Rubrics
- Separate scores for each criterion
- More detailed
- Better feedback
- More time-consuming

## Creating a Rubric: Step by Step

1. **Identify the competency** to be assessed
2. **Define the criteria** - what specific skills/behaviors?
3. **Determine performance levels** - typically 3-5 levels
4. **Write clear descriptors** for each level
5. **Test and refine** the rubric

## Example Rubric: Oral Presentation

| Criteria | Exceeding (4) | Meeting (3) | Approaching (2) | Beginning (1) |
|----------|---------------|-------------|-----------------|---------------|
| Content | Well-researched, comprehensive | Adequate information | Some relevant information | Limited content |
| Delivery | Confident, engaging | Clear and audible | Some hesitation | Difficult to hear |
| Organization | Logical, clear structure | Generally organized | Some structure | Disorganized |
| Visual Aids | Effective, enhances message | Supports presentation | Basic visuals | No visuals or distracting |

## Tips for Using Rubrics

- Share rubrics with learners BEFORE the task
- Use rubrics consistently
- Provide feedback using rubric language
- Involve learners in rubric creation when possible
        `,
      },
      {
        id: 3,
        title: 'Portfolio Assessment',
        duration: 10,
        type: 'video',
        completed: false,
        content: `
# Portfolio Assessment

Portfolios are powerful tools for documenting and assessing competency development over time.

## What is a Portfolio?

A portfolio is a purposeful collection of learner work that demonstrates:
- Growth over time
- Achievement of competencies
- Reflection on learning
- Best work examples

## Types of Portfolios

### Growth Portfolio
- Shows progress over time
- Includes early and later work
- Demonstrates improvement

### Showcase Portfolio
- Best work only
- Demonstrates achievement
- Often shared with others

### Process Portfolio
- Documents the learning journey
- Includes drafts and revisions
- Shows thinking and problem-solving

## What to Include

- Written work samples
- Projects and artifacts
- Photos of activities
- Self-reflections
- Peer feedback
- Teacher observations
- Certificates and awards

## Managing Portfolios

### Physical Portfolios
- Folders or binders
- Organized by subject or competency
- Regular review and update

### Digital Portfolios
- Online platforms
- Easy to share
- Multimedia elements
- Accessible anywhere

## Assessment Using Portfolios

1. Review portfolio contents regularly
2. Use rubrics for consistency
3. Include learner self-assessment
4. Document growth over time
5. Share with parents during conferences
        `,
      },
      {
        id: 4,
        title: 'Observation and Documentation',
        duration: 8,
        type: 'reading',
        completed: false,
        content: `
# Observation and Documentation

Observation is one of the most powerful assessment tools in CBC. This lesson covers effective observation techniques.

## Why Observation Matters

Observation allows teachers to:
- See competencies in action
- Assess process, not just product
- Capture authentic learning moments
- Understand individual learners
- Identify support needs

## Types of Observation

### Informal Observation
- Happens naturally during class
- Quick mental notes
- General impressions

### Formal Observation
- Planned and structured
- Specific focus
- Documented systematically

### Participant Observation
- Teacher involved in activity
- Real-time assessment
- May miss some details

### Non-participant Observation
- Teacher watches from outside
- Can see overall dynamics
- May seem less natural

## Documentation Methods

### Anecdotal Records
Brief, objective notes about specific incidents:
- Date and time
- What happened
- Who was involved
- Significance

### Checklists
Quick yes/no or present/absent indicators:
- Easy to use
- Consistent
- Limited detail

### Rating Scales
Degrees of performance:
- More nuanced than checklists
- Quick to complete
- Good for tracking progress

### Running Records
Continuous narrative of events:
- Rich detail
- Time-consuming
- Good for in-depth analysis

## Best Practices

1. Observe regularly and systematically
2. Be objective - describe, don't judge
3. Document promptly
4. Look for patterns over time
5. Use multiple methods
6. Respect learner privacy
        `,
      },
      {
        id: 5,
        title: 'Providing Constructive Feedback',
        duration: 10,
        type: 'video',
        completed: false,
        content: `
# Providing Constructive Feedback

Feedback is essential for learning. This lesson covers how to provide feedback that promotes growth.

## Why Feedback Matters

Effective feedback:
- Clarifies expectations
- Identifies strengths and areas for growth
- Motivates improvement
- Builds self-assessment skills
- Strengthens relationships

## Characteristics of Effective Feedback

### Specific
❌ "Good work"
✅ "Your explanation of the water cycle included all key stages with accurate descriptions"

### Timely
- Given soon after the work
- While context is fresh
- Before moving to new topics

### Actionable
- Tells learner what to do next
- Focuses on improvement
- Within learner's control

### Balanced
- Acknowledges strengths
- Identifies growth areas
- Maintains dignity

## The SBI Model

**Situation**: Where and when
**Behavior**: What you observed
**Impact**: The effect it had

Example: "During the group activity (S), you helped your teammate understand the instructions (B), which allowed the whole group to complete the task on time (I)."

## Feedback Techniques

### Praise-Question-Suggestion
1. What did the learner do well?
2. What question could prompt reflection?
3. What specific suggestion for improvement?

### Two Stars and a Wish
- Two things done well (stars)
- One thing to improve (wish)

### Growth-Focused Language
- "Not yet" instead of "wrong"
- "Keep practicing" instead of "you can't"
- "You're improving in..." instead of "you still need work on..."

## Receiving Feedback

Teach learners to:
- Listen without defending
- Ask clarifying questions
- Reflect on the feedback
- Create an action plan
        `,
      },
      {
        id: 6,
        title: 'Assessment Practice Activity',
        duration: 10,
        type: 'activity',
        completed: false,
        content: `
# Assessment Practice Activity

Apply what you've learned by completing these practical exercises.

## Activity 1: Create a Rubric

Design a rubric for assessing "Communication and Collaboration" competency during a group project.

Your rubric should include:
- At least 3 criteria
- 4 performance levels
- Clear descriptors for each level

## Activity 2: Observation Practice

Plan an observation session for your class:
1. What competency will you observe?
2. What documentation method will you use?
3. What specific behaviors will you look for?
4. When will you conduct the observation?

## Activity 3: Feedback Practice

Write constructive feedback for the following scenario:

*A learner submitted a project on environmental conservation. The content was accurate and well-researched, but the presentation was disorganized and the learner seemed nervous during the oral presentation.*

Use the SBI model or Praise-Question-Suggestion format.

## Activity 4: Portfolio Planning

Design a portfolio structure for your class:
- What items will be included?
- How often will portfolios be updated?
- How will learners select items?
- How will you assess portfolios?

## Reflection Questions

After completing these activities, reflect on:
1. Which assessment method do you feel most confident using?
2. What challenges do you anticipate in implementing these methods?
3. How will you involve learners in the assessment process?
4. What support do you need to improve your assessment practices?
        `,
      },
    ],
  },
  {
    id: 3,
    title: 'Formative Assessment Strategies',
    description: 'Explore practical formative assessment techniques to support learning.',
    category: 'assessment',
    difficulty: 'intermediate',
    duration: 50,
    progress: 0,
    icon: '📝',
    objectives: [
      'Understand the purpose of formative assessment',
      'Apply various formative assessment techniques',
      'Use formative data to adjust instruction',
      'Create a culture of continuous feedback',
      'Involve learners in self and peer assessment',
    ],
    prerequisites: ['CBC Fundamentals'],
    lessons: [
      { id: 1, title: 'What is Formative Assessment?', duration: 10, type: 'video', completed: false, content: 'Introduction to formative assessment concepts and purposes.' },
      { id: 2, title: 'Quick Check Techniques', duration: 10, type: 'reading', completed: false, content: 'Various quick techniques for checking understanding.' },
      { id: 3, title: 'Exit Tickets and Entry Slips', duration: 10, type: 'activity', completed: false, content: 'How to use exit tickets and entry slips effectively.' },
      { id: 4, title: 'Self and Peer Assessment', duration: 10, type: 'reading', completed: false, content: 'Strategies for involving learners in assessment.' },
      { id: 5, title: 'Using Data to Inform Instruction', duration: 10, type: 'video', completed: false, content: 'How to use formative assessment data.' },
      { id: 6, title: 'Formative Assessment Quiz', duration: 5, type: 'quiz', completed: false, content: `
# Knowledge Check: Formative Assessment Strategies

Test your understanding of formative assessment techniques and their application in CBC.

**Question 1:** What is the main purpose of formative assessment?

a) To assign grades at the end of a term
b) To support and improve learning during instruction
c) To compare students with each other
d) To prepare students for national exams

**Answer:** b) To support and improve learning during instruction

---

**Question 2:** Which of the following is an example of a quick check technique?

a) End-of-year examination
b) Thumbs up/thumbs down
c) Standardized test
d) Final project presentation

**Answer:** b) Thumbs up/thumbs down

---

**Question 3:** How should teachers use exit ticket data?

a) File them away for records
b) Use them to plan the next lesson and address gaps
c) Share them with parents only
d) Grade them for the report card

**Answer:** b) Use them to plan the next lesson and address gaps

---

**Question 4:** What is an important benefit of peer assessment?

a) It reduces teacher workload permanently
b) It helps learners develop critical thinking and self-assessment skills
c) It eliminates the need for teacher feedback
d) It makes grading more consistent

**Answer:** b) It helps learners develop critical thinking and self-assessment skills

---

**Question 5:** Which statement best describes the relationship between formative assessment and instruction?

a) Formative assessment happens only at the end of instruction
b) Formative assessment is separate from instruction
c) Formative assessment should inform and adjust instruction continuously
d) Formative assessment replaces instruction

**Answer:** c) Formative assessment should inform and adjust instruction continuously
` },
    ],
  },
  {
    id: 4,
    title: 'Inclusive Teaching Practices',
    description: 'Strategies for supporting diverse learners in the CBC framework.',
    category: 'pedagogy',
    difficulty: 'intermediate',
    duration: 55,
    progress: 0,
    icon: '👥',
    objectives: [
      'Understand principles of inclusive education',
      'Identify diverse learning needs',
      'Adapt instruction for different learners',
      'Create inclusive classroom environments',
      'Support learners with special needs',
    ],
    prerequisites: ['CBC Fundamentals'],
    lessons: [
      { id: 1, title: 'Principles of Inclusive Education', duration: 12, type: 'video', completed: false, content: 'Foundation concepts of inclusive education.' },
      { id: 2, title: 'Understanding Diverse Learners', duration: 10, type: 'reading', completed: false, content: 'Types of diversity and learning differences.' },
      { id: 3, title: 'Differentiated Instruction', duration: 12, type: 'video', completed: false, content: 'Strategies for differentiating instruction.' },
      { id: 4, title: 'Universal Design for Learning', duration: 11, type: 'reading', completed: false, content: 'UDL principles and application.' },
      { id: 5, title: 'Creating an Inclusive Classroom', duration: 10, type: 'activity', completed: false, content: 'Practical strategies for inclusive classrooms.' },
      { id: 6, title: 'Inclusive Teaching Quiz', duration: 5, type: 'quiz', completed: false, content: `
# Knowledge Check: Inclusive Teaching Practices

Test your understanding of inclusive education principles and strategies.

**Question 1:** What is the core principle of inclusive education?

a) Separating learners by ability level
b) All learners have the right to quality education in regular settings
c) Special needs learners should have separate classrooms
d) Fast learners should help slower ones

**Answer:** b) All learners have the right to quality education in regular settings

---

**Question 2:** In differentiated instruction, teachers can differentiate by:

a) Content, process, and product
b) Speed only
c) Gender and age
d) Test scores only

**Answer:** a) Content, process, and product

---

**Question 3:** Universal Design for Learning (UDL) provides:

a) One way to teach all learners
b) Multiple means of engagement, representation, and action/expression
c) Technology solutions only
d) Standardized curricula

**Answer:** b) Multiple means of engagement, representation, and action/expression

---

**Question 4:** Which of the following is a barrier to inclusive education?

a) Flexible seating arrangements
b) Negative attitudes toward diversity
c) Varied assessment methods
d) Collaborative learning activities

**Answer:** b) Negative attitudes toward diversity

---

**Question 5:** How should teachers respond to a learner struggling with reading?

a) Move them to a lower grade
b) Provide alternative ways to access content (audio, visual)
c) Wait for them to catch up
d) Focus only on writing skills instead

**Answer:** b) Provide alternative ways to access content (audio, visual)
` },
    ],
  },
  {
    id: 5,
    title: 'Digital Integration in CBC',
    description: 'Integrate technology effectively into your CBC teaching practice.',
    category: 'technology',
    difficulty: 'intermediate',
    duration: 60,
    progress: 0,
    icon: '💻',
    objectives: [
      'Understand the role of technology in CBC',
      'Select appropriate digital tools for learning',
      'Design technology-enhanced lessons',
      'Promote digital literacy among learners',
      'Address technology challenges in schools',
    ],
    prerequisites: ['CBC Fundamentals'],
    lessons: [
      { id: 1, title: 'Technology and CBC', duration: 10, type: 'video', completed: false, content: 'How technology supports CBC implementation.' },
      { id: 2, title: 'Digital Tools for Teachers', duration: 12, type: 'reading', completed: false, content: 'Overview of useful digital tools.' },
      { id: 3, title: 'Designing Tech-Enhanced Lessons', duration: 12, type: 'activity', completed: false, content: 'Practical lesson design with technology.' },
      { id: 4, title: 'Teaching Digital Literacy', duration: 13, type: 'video', completed: false, content: 'Developing learner digital skills.' },
      { id: 5, title: 'Overcoming Tech Challenges', duration: 8, type: 'reading', completed: false, content: 'Solutions for common technology challenges.' },
      { id: 6, title: 'Digital Integration Practice', duration: 5, type: 'quiz', completed: false, content: `
# Knowledge Check: Digital Integration in CBC

Test your understanding of integrating technology effectively in your CBC classroom.

**Question 1:** What is the primary purpose of integrating technology in CBC classrooms?

a) To replace traditional teaching methods entirely
b) To enhance learning and develop digital literacy competencies
c) To reduce the teacher's workload
d) To entertain students

**Answer:** b) To enhance learning and develop digital literacy competencies

---

**Question 2:** According to the SAMR model, which level represents the highest transformation of learning?

a) Substitution
b) Augmentation
c) Modification
d) Redefinition

**Answer:** d) Redefinition

---

**Question 3:** When selecting digital tools for your classroom, what should be your primary consideration?

a) The tool's popularity
b) Its alignment with learning objectives
c) The tool's cost
d) How new the technology is

**Answer:** b) Its alignment with learning objectives

---

**Question 4:** Which of the following is a key component of digital literacy?

a) Being able to type fast
b) Owning the latest devices
c) Evaluating online information critically
d) Having social media accounts

**Answer:** c) Evaluating online information critically

---

**Question 5:** How can technology best support formative assessment in CBC?

a) By replacing teacher observation
b) By providing immediate feedback and tracking progress
c) By making exams harder
d) By eliminating paper-based tests

**Answer:** b) By providing immediate feedback and tracking progress
` },
    ],
  },
  {
    id: 6,
    title: 'Student-Centered Learning',
    description: 'Design and facilitate learner-centered activities that build competencies.',
    category: 'pedagogy',
    difficulty: 'beginner',
    duration: 45,
    progress: 0,
    icon: '🎯',
    objectives: [
      'Understand student-centered learning principles',
      'Design engaging learning activities',
      'Facilitate rather than lecture',
      'Promote learner agency and voice',
    ],
    prerequisites: [],
    lessons: [
      { id: 1, title: 'What is Student-Centered Learning?', duration: 12, type: 'video', completed: false, content: 'Introduction to student-centered approaches.' },
      { id: 2, title: 'Designing Engaging Activities', duration: 12, type: 'reading', completed: false, content: 'How to create engaging learning experiences.' },
      { id: 3, title: 'The Art of Facilitation', duration: 11, type: 'video', completed: false, content: 'Skills for facilitating learning.' },
      { id: 4, title: 'Student Voice and Choice', duration: 10, type: 'activity', completed: false, content: 'Strategies for promoting learner agency.' },
      { id: 5, title: 'Student-Centered Learning Quiz', duration: 5, type: 'quiz', completed: false, content: `
# Knowledge Check: Student-Centered Learning

Test your understanding of student-centered learning approaches.

**Question 1:** In student-centered learning, the teacher's primary role is:

a) Lecturer delivering content
b) Facilitator guiding discovery
c) Disciplinarian maintaining order
d) Examiner testing knowledge

**Answer:** b) Facilitator guiding discovery

---

**Question 2:** Which of the following promotes student voice in the classroom?

a) Strict adherence to textbook content
b) Teacher-directed activities only
c) Allowing learners to make choices about their learning
d) Standardized tests

**Answer:** c) Allowing learners to make choices about their learning

---

**Question 3:** A key characteristic of engaging learning activities is:

a) They are always quiet and individual
b) They connect to learners' real lives and interests
c) They require no preparation
d) They focus only on memorization

**Answer:** b) They connect to learners' real lives and interests

---

**Question 4:** When facilitating group work, teachers should:

a) Give all the answers immediately
b) Observe, ask probing questions, and guide as needed
c) Leave the room
d) Work with only one group the entire time

**Answer:** b) Observe, ask probing questions, and guide as needed

---

**Question 5:** Student agency means:

a) Students acting as teachers
b) Learners having ownership and control over their learning
c) Students doing whatever they want
d) Teachers having less work

**Answer:** b) Learners having ownership and control over their learning
` },
    ],
  },
]

export function getModuleById(id: number): Module | undefined {
  return modulesData.find((m) => m.id === id)
}

export function getModulesByCategory(category: string): Module[] {
  if (category === 'all') return modulesData
  return modulesData.filter((m) => m.category === category)
}
