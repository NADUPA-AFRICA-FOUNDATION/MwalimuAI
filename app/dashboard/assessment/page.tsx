'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { BackButton } from '@/components/back-button'

type Question = {
  id: string
  question: string
  type: 'scale' | 'radio' | 'multiple' | 'text'
  scale?: number
  options?: string[]
}

const assessmentQuestions: Question[] = [
  {
    id: 'cbc_familiarity',
    question: 'How familiar are you with Competency-Based Curriculum (CBC)?',
    type: 'scale',
    scale: 5,
  },
  {
    id: 'assessment_confidence',
    question: 'How confident are you in competency-based assessment?',
    type: 'scale',
    scale: 5,
  },
  {
    id: 'formative_skills',
    question: 'How skilled are you in formative assessment techniques?',
    type: 'scale',
    scale: 5,
  },
  {
    id: 'challenges',
    question: 'What challenges do you face with CBC integration? (Select all that apply)',
    type: 'multiple',
    options: [
      'Time management',
      'Lack of resources',
      'Student engagement',
      'Assessment strategies',
      'Technology access',
      'Teacher workload',
    ],
  },
  {
    id: 'learning_style',
    question: 'What is your preferred learning style?',
    type: 'radio',
    options: ['Video', 'Text-based', 'Interactive activities', 'Mixed approach'],
  },
  {
    id: 'time_available',
    question: 'How much time can you dedicate to professional development weekly?',
    type: 'radio',
    options: ['Less than 1 hour', '1-3 hours', '3-5 hours', 'More than 5 hours'],
  },
  {
    id: 'priority_areas',
    question: 'What areas are your top priorities? (Select up to 3)',
    type: 'multiple',
    options: [
      'CBC fundamentals',
      'Assessment strategies',
      'Inclusive teaching',
      'Technology integration',
      'Student engagement',
      'Classroom management',
    ],
  },
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})

  const currentQuestion = assessmentQuestions[currentStep]
  const progress = ((currentStep + 1) / assessmentQuestions.length) * 100

  const handleScaleChange = (value: string) => {
    setResponses({ ...responses, [currentQuestion.id]: parseInt(value) })
  }

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const current = responses[currentQuestion.id] || []
    if (checked) {
      setResponses({ ...responses, [currentQuestion.id]: [...current, option] })
    } else {
      setResponses({
        ...responses,
        [currentQuestion.id]: current.filter((o: string) => o !== option),
      })
    }
  }

  const handleRadioChange = (value: string) => {
    setResponses({ ...responses, [currentQuestion.id]: value })
  }

  const handleNext = () => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    console.log('Assessment responses:', responses)
    alert('Thank you for completing the needs assessment! Your results will help personalize your learning journey.')
    // TODO: Save to Supabase
  }

  const isCurrentQuestionAnswered = () => {
    const response = responses[currentQuestion.id]
    if (response === undefined) return false
    if (currentQuestion.type === 'multiple') {
      return Array.isArray(response) && response.length > 0
    }
    return true
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
      <div>
        <h1 className="text-3xl font-bold mb-2">Needs Assessment</h1>
        <p className="text-muted-foreground">
          Help us understand your needs and learning preferences. This will personalize your learning journey.
        </p>
      </div>

      <Card className="p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentStep + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

          {/* Scale (1-5) */}
          {currentQuestion.type === 'scale' && currentQuestion.scale && (
            <div className="flex gap-4 justify-center">
              {Array.from({ length: currentQuestion.scale }).map((_, idx) => {
                const value = idx + 1
                const isSelected = responses[currentQuestion.id] === value
                return (
                  <button
                    key={value}
                    onClick={() => handleScaleChange(String(value))}
                    className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          )}

          {/* Radio (Single Choice) */}
          {currentQuestion.type === 'radio' && currentQuestion.options && (
            <RadioGroup 
              value={responses[currentQuestion.id] || ''} 
              onValueChange={handleRadioChange}
            >
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem
                    value={option}
                    id={`${currentQuestion.id}-${option}`}
                  />
                  <Label htmlFor={`${currentQuestion.id}-${option}`} className="cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Checkboxes (Multiple Choice) */}
          {currentQuestion.type === 'multiple' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${currentQuestion.id}-${option}`}
                    checked={(responses[currentQuestion.id] || []).includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                  />
                  <Label htmlFor={`${currentQuestion.id}-${option}`} className="cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {currentStep === assessmentQuestions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isCurrentQuestionAnswered()}
              className="gap-2"
            >
              Complete Assessment
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className="gap-2"
            >
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
