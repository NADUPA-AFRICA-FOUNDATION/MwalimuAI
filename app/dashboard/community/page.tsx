'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { BackButton } from '@/components/back-button'
import { MessageCircle, Heart, Share2, Search } from 'lucide-react'

const forumPosts = [
  {
    id: 1,
    title: 'How to make formative assessment engaging for Grade 3 students?',
    author: 'Sarah M.',
    category: 'Assessment',
    replies: 12,
    likes: 24,
    timestamp: '2 hours ago',
    excerpt: 'I\'ve been struggling to keep my Grade 3 students engaged during formative assessments. Any creative strategies?',
  },
  {
    id: 2,
    title: 'Best practices for CBC implementation in resource-limited schools',
    author: 'John K.',
    category: 'Implementation',
    replies: 8,
    likes: 18,
    timestamp: '5 hours ago',
    excerpt: 'Many of us teach in schools with limited resources. Let\'s share what actually works...',
  },
  {
    id: 3,
    title: 'Integrating digital tools without overwhelming students',
    author: 'Grace L.',
    category: 'Technology',
    replies: 15,
    likes: 32,
    timestamp: '1 day ago',
    excerpt: 'Tips on introducing technology gradually while maintaining focus on competency development.',
  },
  {
    id: 4,
    title: 'Creating inclusive assessment for students with learning differences',
    author: 'Peter N.',
    category: 'Inclusion',
    replies: 10,
    likes: 22,
    timestamp: '1 day ago',
    excerpt: 'Sharing strategies for ensuring all students can demonstrate their competencies...',
  },
  {
    id: 5,
    title: 'Managing workload: Finding time for quality feedback',
    author: 'Mary M.',
    category: 'Workload',
    replies: 19,
    likes: 41,
    timestamp: '2 days ago',
    excerpt: 'CBC requires meaningful feedback but we\'re already stretched thin. What helps you manage?',
  },
]

const categories = ['All', 'Assessment', 'Implementation', 'Technology', 'Inclusion', 'Workload']

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
        <p className="text-muted-foreground">
          Connect with fellow educators, share experiences, and learn from each other.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-4 items-center flex-col md:flex-row">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2 w-full md:w-auto">
          <MessageCircle className="w-4 h-4" />
          New Discussion
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer hover:bg-muted/30"
            >
              <div className="flex gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <Badge variant="secondary" className="whitespace-nowrap">
                      {post.category}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-3 text-sm">{post.excerpt}</p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>By {post.author}</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between min-w-max">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                  <Share2 className="w-4 h-4 text-muted-foreground mt-2" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No discussions found matching your criteria.</p>
            <Button>Create the First Discussion</Button>
          </Card>
        )}
      </div>
    </div>
  )
}
