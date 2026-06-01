'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BackButton } from '@/components/back-button'
import { Download, BookOpen, Video, FileText } from 'lucide-react'

const resources = [
  {
    id: 1,
    title: 'CBC Implementation Guide 2024',
    type: 'PDF',
    size: '2.4 MB',
    icon: FileText,
    description: 'Comprehensive guide on CBC curriculum implementation strategies.',
    tags: ['CBC', 'Implementation', 'Guidelines'],
  },
  {
    id: 2,
    title: 'Formative Assessment Toolkit',
    type: 'PDF',
    size: '1.8 MB',
    icon: BookOpen,
    description: 'Ready-to-use templates and tools for formative assessments.',
    tags: ['Assessment', 'Templates', 'Tools'],
  },
  {
    id: 3,
    title: 'Video: Competency-Based Grading',
    type: 'Video',
    size: '45 min',
    icon: Video,
    description: 'Expert video on implementing competency-based grading systems.',
    tags: ['Grading', 'Video', 'Assessment'],
  },
  {
    id: 4,
    title: 'Inclusive Classroom Strategies',
    type: 'PDF',
    size: '2.1 MB',
    icon: FileText,
    description: 'Practical strategies for supporting diverse learners in CBC.',
    tags: ['Inclusion', 'Diversity', 'Strategies'],
  },
  {
    id: 5,
    title: 'Digital Tools for CBC',
    type: 'Video',
    size: '30 min',
    icon: Video,
    description: 'Overview of digital tools that support CBC implementation.',
    tags: ['Technology', 'Tools', 'Video'],
  },
  {
    id: 6,
    title: 'Parent Communication Templates',
    type: 'PDF',
    size: '0.9 MB',
    icon: FileText,
    description: 'Templates for communicating CBC changes to parents.',
    tags: ['Communication', 'Templates', 'Parents'],
  },
]

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
      <div>
        <h1 className="text-3xl font-bold mb-2">Resources & Materials</h1>
        <p className="text-muted-foreground">
          Download and access curated resources to support your CBC implementation journey.
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon
          return (
            <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.type} • {resource.size}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Resource
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
