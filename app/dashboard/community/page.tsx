'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BackButton } from '@/components/back-button'
import { useProfile } from '@/context/profile-context'
import {
  MessageCircle, Heart, Search, Plus, X, ChevronDown,
  ChevronUp, Send, Users,
} from 'lucide-react'

const COMMUNITY_KEY = 'mwalimu_community'
const POST_CATEGORIES = ['Assessment', 'Pedagogy', 'Technology', 'Inclusion', 'Wellbeing', 'Resources', 'Ask a Question']
const FILTER_CATS = ['All', ...POST_CATEGORIES]

interface Reply {
  id: string
  author: string
  initials: string
  body: string
  timestamp: string
}

interface Post {
  id: string
  title: string
  body: string
  category: string
  author: string
  initials: string
  county: string
  timestamp: string
  likes: string[]
  replies: Reply[]
}

function mkInitials(name: string) {
  return name.split(' ').map(n => n[0] ?? '').join('').slice(0, 2).toUpperCase()
}

const SEED: Post[] = [
  {
    id: 'c1', category: 'Assessment',
    title: 'How do I explain CBC strands to parents at the beginning of term?',
    body: "Every term I struggle to explain what CBC strands mean to parents — especially Grade 1 parents used to the old system. They keep asking why there's no 'ranking'. Has anyone made a simple handout that works?",
    author: 'Grace Wanjiku', initials: 'GW', county: 'Kiambu', timestamp: '2 hours ago',
    likes: ['u1', 'u2', 'u3'],
    replies: [{ id: 'r1', author: 'James Omondi', initials: 'JO', body: "I use a one-page chart comparing the old system to CBC. Once parents see 'competencies = skills for life' it clicks. Happy to share the template!", timestamp: '1 hour ago' }],
  },
  {
    id: 'c2', category: 'Pedagogy',
    title: 'Strategies for mixed-ability Grade 4 without making learners feel singled out',
    body: "My Grade 4 class has learners ranging from PP2 literacy level to Grade 5 level. I want to differentiate without any child feeling highlighted. What grouping strategies have actually worked for you in practice?",
    author: 'James Omondi', initials: 'JO', county: 'Kisumu', timestamp: '5 hours ago',
    likes: ['u4', 'u5'],
    replies: [],
  },
  {
    id: 'c3', category: 'Technology',
    title: 'Using mobile phones for digital portfolios — which app works offline?',
    body: "Our school got basic smartphones for teachers. I want to build digital portfolios for learners but need something free, works sometimes offline, no paid subscription. Any recommendations from the field?",
    author: 'Beatrice Njeru', initials: 'BN', county: 'Meru', timestamp: '1 day ago',
    likes: ['u6', 'u7', 'u8', 'u9'],
    replies: [
      { id: 'r2', author: 'Peter Kamau', initials: 'PK', body: "Google Classroom is free and reliable. For offline situations some colleagues store learning photos in a dedicated WhatsApp group per learner — crude but it works.", timestamp: '22 hours ago' },
      { id: 'r3', author: 'Ruth Achieng', initials: 'RA', body: "Seesaw has a free tier and partial offline support. CEMASTEA trainers mentioned it at our last PD session.", timestamp: '18 hours ago' },
    ],
  },
  {
    id: 'c4', category: 'Assessment',
    title: 'Share your single best formative assessment trick — go!',
    body: "Starting a thread for quick wins. Mine: 'traffic light' at end of every lesson — learners hold up red/orange/green to show confidence. Takes 30 seconds and tells me everything I need for tomorrow.",
    author: 'Peter Kamau', initials: 'PK', county: 'Nakuru', timestamp: '2 days ago',
    likes: ['u10', 'u11', 'u12', 'u13', 'u14', 'u15', 'u16'],
    replies: [
      { id: 'r4', author: 'Amina Hassan', initials: 'AH', body: "Exit tickets! One sentence: what did you learn today? I collect them at the door. The ones who can't write a sentence — those are my small-group focus tomorrow.", timestamp: '2 days ago' },
    ],
  },
  {
    id: 'c5', category: 'Wellbeing',
    title: 'End of term exhaustion — how do you protect your energy?',
    body: "Long term, running on empty. Marking, reports, parent meetings, CBC training that feels never-ending. Genuinely asking: what keeps you going? What's your reset routine when you're depleted?",
    author: 'Amina Hassan', initials: 'AH', county: 'Mombasa', timestamp: '3 days ago',
    likes: ['u17', 'u18', 'u19', 'u20'],
    replies: [
      { id: 'r5', author: 'Grace Wanjiku', initials: 'GW', body: "I block Friday afternoons as 'no marking' time. Took months to enforce but it's the best boundary I set. Talking to a colleague who gets it also helps enormously.", timestamp: '3 days ago' },
    ],
  },
  {
    id: 'c6', category: 'Resources',
    title: 'CBC-aligned Mathematics resources for Grade 6 Number strand?',
    body: "The KICD textbook covers the strand but I need supplementary activities — specifically fractions and decimals for Grade 6. Any worksheets, printables, or activity ideas you have found useful?",
    author: 'Ruth Achieng', initials: 'RA', county: 'Siaya', timestamp: '4 days ago',
    likes: ['u21', 'u22'],
    replies: [],
  },
]

function loadPosts(): Post[] {
  if (typeof window === 'undefined') return SEED
  try {
    const raw = localStorage.getItem(COMMUNITY_KEY)
    if (!raw) { localStorage.setItem(COMMUNITY_KEY, JSON.stringify(SEED)); return SEED }
    return JSON.parse(raw) as Post[]
  } catch { return SEED }
}

function savePosts(posts: Post[]) {
  if (typeof window !== 'undefined') localStorage.setItem(COMMUNITY_KEY, JSON.stringify(posts))
}

const CAT_COLORS: Record<string, string> = {
  Assessment:       'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Pedagogy:         'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Technology:       'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  Inclusion:        'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  Wellbeing:        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Resources:        'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'Ask a Question': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

export default function CommunityPage() {
  const { profile } = useProfile()

  const [posts, setPosts]           = useState<Post[]>([])
  const [filter, setFilter]         = useState('All')
  const [search, setSearch]         = useState('')
  const [expanded, setExpanded]     = useState<string | null>(null)
  const [showNew, setShowNew]       = useState(false)
  const [replyBoxes, setReplyBoxes] = useState<Record<string, string>>({})
  const [mounted, setMounted]       = useState(false)
  const replyInputRefs              = useRef<Record<string, HTMLInputElement | null>>({})

  const [newForm, setNewForm] = useState({ title: '', body: '', category: '' })

  useEffect(() => {
    setPosts(loadPosts())
    setMounted(true)
  }, [])

  const authorName    = profile?.name && profile.name !== 'Teacher' ? profile.name : 'You'
  const authorInitials = mkInitials(authorName)
  const userId        = `user-${authorName.replace(/\s+/g, '-').toLowerCase()}`

  const filtered = posts.filter(p => {
    const matchCat = filter === 'All' || p.category === filter
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const toggleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setPosts(prev => {
      const updated = prev.map(p => {
        if (p.id !== postId) return p
        const liked = p.likes.includes(userId)
        return { ...p, likes: liked ? p.likes.filter(l => l !== userId) : [...p.likes, userId] }
      })
      savePosts(updated)
      return updated
    })
  }

  const openAndFocusReply = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(postId)
    setTimeout(() => replyInputRefs.current[postId]?.focus(), 50)
  }

  const submitReply = (postId: string) => {
    const body = replyBoxes[postId]?.trim()
    if (!body) return
    const reply: Reply = {
      id: `reply-${Date.now()}`,
      author: authorName,
      initials: authorInitials,
      body,
      timestamp: 'Just now',
    }
    setPosts(prev => {
      const updated = prev.map(p =>
        p.id === postId ? { ...p, replies: [...p.replies, reply] } : p
      )
      savePosts(updated)
      return updated
    })
    setReplyBoxes(prev => ({ ...prev, [postId]: '' }))
  }

  const submitPost = () => {
    if (!newForm.title.trim() || !newForm.body.trim() || !newForm.category) return
    const post: Post = {
      id: `post-${Date.now()}`,
      title: newForm.title.trim(),
      body: newForm.body.trim(),
      category: newForm.category,
      author: authorName,
      initials: authorInitials,
      county: profile?.county ?? '',
      timestamp: 'Just now',
      likes: [],
      replies: [],
    }
    setPosts(prev => {
      const updated = [post, ...prev]
      savePosts(updated)
      return updated
    })
    setNewForm({ title: '', body: '', category: '' })
    setShowNew(false)
    setExpanded(post.id)
  }

  const totalPosts   = posts.length
  const totalReplies = posts.reduce((s, p) => s + p.replies.length, 0)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Teacher Community</h1>
            <p className="text-sm text-muted-foreground">{totalPosts} discussions · {totalReplies} replies</p>
          </div>
        </div>
      </div>

      {/* Search + New Post */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>
        <Button onClick={() => setShowNew(v => !v)} className="rounded-xl gap-2 shrink-0">
          {showNew ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showNew ? 'Cancel' : 'New Post'}
        </Button>
      </div>

      {/* New post form */}
      {showNew && (
        <div className="glass rounded-2xl p-6 space-y-4 border border-primary/20">
          <h2 className="font-semibold text-sm">Start a New Discussion</h2>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Title *</Label>
            <Input
              placeholder="What do you want to discuss?"
              value={newForm.title}
              onChange={e => setNewForm(f => ({ ...f, title: e.target.value }))}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Your message *</Label>
            <Textarea
              placeholder="Share context, ask a question, or start the conversation…"
              value={newForm.body}
              onChange={e => setNewForm(f => ({ ...f, body: e.target.value }))}
              className="rounded-xl resize-none"
              rows={4}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Category *</Label>
            <Select value={newForm.category} onValueChange={v => setNewForm(f => ({ ...f, category: v }))}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {POST_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={submitPost}
            disabled={!newForm.title.trim() || !newForm.body.trim() || !newForm.category}
            className="w-full rounded-xl font-semibold gap-2"
          >
            <Send className="w-4 h-4" /> Post Discussion
          </Button>
        </div>
      )}

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTER_CATS.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === c
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Posts */}
      {!mounted ? null : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground mb-4">No discussions found.</p>
          <Button onClick={() => { setSearch(''); setFilter('All') }} variant="outline" size="sm" className="rounded-xl">
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => {
            const isOpen = expanded === post.id
            const liked  = post.likes.includes(userId)

            return (
              <div
                key={post.id}
                className={`glass rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'ring-1 ring-primary/20' : ''}`}
              >
                {/* Clickable expand area — only covers title, category, body preview */}
                <button
                  className="w-full text-left px-5 pt-5 pb-3 hover:bg-muted/20 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : post.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${CAT_COLORS[post.category] ?? 'bg-muted text-muted-foreground'}`}>
                          {post.category}
                        </span>
                        {post.county && (
                          <span className="text-xs text-muted-foreground">{post.county}</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm leading-snug mb-1">{post.title}</h3>
                      {!isOpen && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{post.body}</p>
                      )}
                    </div>
                    <div className="shrink-0">
                      {isOpen
                        ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      }
                    </div>
                  </div>
                </button>

                {/* Action bar — always visible, outside the expand button */}
                <div className="flex items-center gap-3 px-5 pb-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                      {post.initials}
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <span className="hidden sm:inline">{post.timestamp}</span>

                  <div className="ml-auto flex items-center gap-3">
                    {/* Comment button — expands post and focuses reply input */}
                    <button
                      onClick={e => openAndFocusReply(post.id, e)}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                      aria-label={`${post.replies.length} replies — click to reply`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.replies.length}</span>
                    </button>

                    {/* Like button — always interactive, no expansion needed */}
                    <button
                      onClick={e => toggleLike(post.id, e)}
                      className={`flex items-center gap-1 transition-colors ${
                        liked
                          ? 'text-red-500 hover:text-red-600'
                          : 'hover:text-red-500'
                      }`}
                      aria-label={liked ? 'Unlike this post' : 'Like this post'}
                      aria-pressed={liked}
                    >
                      <Heart className={`w-3.5 h-3.5 transition-all ${liked ? 'fill-red-500 scale-110' : ''}`} />
                      <span>{post.likes.length}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t border-border/40 px-5 pb-5">
                    {/* Full body */}
                    <p className="text-sm text-muted-foreground leading-relaxed py-4">{post.body}</p>

                    {/* Replies */}
                    {post.replies.length > 0 && (
                      <div className="space-y-3 mb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                        </p>
                        {post.replies.map(reply => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-[9px] font-bold text-accent shrink-0">
                              {reply.initials}
                            </div>
                            <div className="flex-1 bg-muted/30 rounded-xl px-3.5 py-2.5">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold">{reply.author}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{reply.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply input */}
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0 mt-1">
                        {authorInitials}
                      </div>
                      <div className="flex-1 flex gap-2">
                        <Input
                          ref={el => { replyInputRefs.current[post.id] = el }}
                          placeholder="Write a reply…"
                          value={replyBoxes[post.id] ?? ''}
                          onChange={e => setReplyBoxes(prev => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitReply(post.id) } }}
                          className="rounded-xl text-sm h-9"
                        />
                        <Button
                          size="sm"
                          onClick={() => submitReply(post.id)}
                          disabled={!(replyBoxes[post.id]?.trim())}
                          className="rounded-xl px-3 h-9 shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
