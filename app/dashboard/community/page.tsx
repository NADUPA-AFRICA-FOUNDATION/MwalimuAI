'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BackButton } from '@/components/back-button'
import { useProfile } from '@/context/profile-context'
import { createClient } from '@/lib/supabase/client'
import { recordCommunityPost } from '@/lib/streak'
import {
  MessageCircle, Heart, Search, Plus, X, ChevronDown,
  ChevronUp, Send, Users, Loader2, Pencil, Trash2, Check,
} from 'lucide-react'

const POST_CATEGORIES = ['Assessment', 'Pedagogy', 'Technology', 'Inclusion', 'Wellbeing', 'Resources', 'Ask a Question']
const FILTER_CATS     = ['All', ...POST_CATEGORIES]

interface Reply {
  id: string
  userId: string
  author: string
  initials: string
  body: string
  timestamp: string
  createdAt: string
  edited: boolean
}

interface Post {
  id: string
  userId: string
  title: string
  content: string
  category: string
  author: string
  initials: string
  county: string
  timestamp: string
  createdAt: string
  edited: boolean
  likes: string[]
  replies: Reply[]
}

// Authors can edit their posts/replies for 3 hours; after that the option disappears.
const EDIT_WINDOW_MS = 3 * 60 * 60 * 1000
function withinEditWindow(createdAt: string): boolean {
  return Date.now() - new Date(createdAt).getTime() < EDIT_WINDOW_MS
}

function mkInitials(name: string) {
  return name.split(' ').map(n => n[0] ?? '').join('').slice(0, 2).toUpperCase()
}

function formatTs(iso: string): string {
  const ms   = Date.now() - new Date(iso).getTime()
  const hrs  = ms / 3_600_000
  const days = hrs / 24
  if (hrs < 1)  return 'Just now'
  if (hrs < 2)  return '1 hour ago'
  if (hrs < 24) return `${Math.floor(hrs)} hours ago`
  if (days < 2) return '1 day ago'
  if (days < 7) return `${Math.floor(days)} days ago`
  return new Date(iso).toLocaleDateString()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToPost(row: any): Post {
  return {
    id:        row.id,
    userId:    row.user_id     ?? '',
    title:     row.title       ?? '',
    content:   row.content     ?? '',
    category:  row.category    ?? '',
    author:    row.author_name ?? 'Teacher',
    initials:  mkInitials(row.author_name ?? 'T'),
    county:    row.county      ?? '',
    timestamp: formatTs(row.created_at),
    createdAt: row.created_at,
    edited:    !!row.edited_at,
    likes:     row.likes       ?? [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replies: (row.community_comments ?? []).map((c: any): Reply => ({
      id:        c.id,
      userId:    c.user_id ?? '',
      author:    c.author_name ?? 'Teacher',
      initials:  mkInitials(c.author_name ?? 'T'),
      body:      c.body ?? '',
      timestamp: formatTs(c.created_at),
      createdAt: c.created_at,
      edited:    !!c.edited_at,
    })),
  }
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
  const { profile, user } = useProfile()
  const supabase = createClient()

  const [posts, setPosts]           = useState<Post[]>([])
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState('All')
  const [search, setSearch]         = useState('')
  const [expanded, setExpanded]     = useState<string | null>(null)
  const [showNew, setShowNew]       = useState(false)
  const [replyBoxes, setReplyBoxes]   = useState<Record<string, string>>({})
  const [replyErrors, setReplyErrors] = useState<Record<string, string>>({})
  const replyInputRefs                = useRef<Record<string, HTMLInputElement | null>>({})
  const [newForm, setNewForm]         = useState({ title: '', content: '', category: '' })
  const [postError, setPostError]     = useState<string | null>(null)
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [editPostForm, setEditPostForm]   = useState({ title: '', content: '' })
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null)
  const [editReplyBody, setEditReplyBody]   = useState('')
  const [actionError, setActionError]       = useState<string | null>(null)

  const authorName     = profile?.name && profile.name !== 'Teacher'
    ? profile.name
    : (user?.email?.split('@')[0] ?? 'Teacher')
  const authorInitials = mkInitials(authorName)
  const userId         = user?.id ?? ''

  const loadPosts = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('community_posts')
      .select('*, community_comments(id, author_name, body, created_at, user_id, edited_at)')
      .order('created_at', { ascending: false })
    setPosts((data ?? []).map(dbToPost))
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { loadPosts() }, [loadPosts])

  const filtered = posts.filter(p => {
    const matchCat    = filter === 'All' || p.category === filter
    const matchSearch = !search
      || p.title.toLowerCase().includes(search.toLowerCase())
      || p.content.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const toggleLike = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!userId) return
    const post = posts.find(p => p.id === postId)
    if (!post) return
    const liked    = post.likes.includes(userId)
    const newLikes = liked ? post.likes.filter(l => l !== userId) : [...post.likes, userId]
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: newLikes } : p))
    await supabase.from('community_posts').update({ likes: newLikes }).eq('id', postId)
  }

  const openAndFocusReply = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(postId)
    setTimeout(() => replyInputRefs.current[postId]?.focus(), 50)
  }

  const submitReply = async (postId: string) => {
    const body = replyBoxes[postId]?.trim()
    if (!body || !userId) return

    setReplyErrors(prev => ({ ...prev, [postId]: '' }))

    const optimistic: Reply = {
      id: `temp-${Date.now()}`, userId, author: authorName,
      initials: authorInitials, body, timestamp: 'Just now',
      createdAt: new Date().toISOString(), edited: false,
    }
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, optimistic] } : p
    ))
    setReplyBoxes(prev => ({ ...prev, [postId]: '' }))

    const { error } = await supabase.from('community_comments').insert({
      post_id: postId, user_id: userId, author_name: authorName, body,
    })

    if (error) {
      // Revert optimistic update
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, replies: p.replies.filter(r => !r.id.startsWith('temp-')) }
          : p
      ))
      setReplyBoxes(prev => ({ ...prev, [postId]: body }))
      setReplyErrors(prev => ({ ...prev, [postId]: error.message }))
      return
    }

    loadPosts()
  }

  const submitPost = async () => {
    if (!newForm.title.trim() || !newForm.content.trim() || !newForm.category || !userId) return
    setPostError(null)

    const { data: inserted, error } = await supabase
      .from('community_posts')
      .insert({
        user_id:     userId,
        title:       newForm.title.trim(),
        content:     newForm.content.trim(),
        category:    newForm.category,
        author_name: authorName,
        county:      profile?.county ?? '',
        likes:       [],
      })
      .select()
      .single()

    if (error) { setPostError(error.message); return }

    recordCommunityPost()
    setNewForm({ title: '', content: '', category: '' })
    setShowNew(false)

    if (inserted) {
      const newPost = dbToPost({ ...inserted, community_comments: [] })
      setPosts(prev => [newPost, ...prev])
      setExpanded(newPost.id)
    }
  }

  // ── Edit & delete (own posts/replies only; edit within 3 hours) ──
  const deletePost = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Delete this post and all its replies? This cannot be undone.')) return
    setActionError(null)
    const prev = posts
    setPosts(p => p.filter(x => x.id !== postId))
    const { error } = await supabase.from('community_posts').delete().eq('id', postId)
    if (error) { setPosts(prev); setActionError(`Delete failed: ${error.message}`) }
  }

  const deleteReply = async (postId: string, replyId: string) => {
    if (!window.confirm('Delete this reply? This cannot be undone.')) return
    setActionError(null)
    const prev = posts
    setPosts(p => p.map(x => x.id === postId
      ? { ...x, replies: x.replies.filter(r => r.id !== replyId) }
      : x))
    const { error } = await supabase.from('community_comments').delete().eq('id', replyId)
    if (error) { setPosts(prev); setActionError(`Delete failed: ${error.message}`) }
  }

  const startEditPost = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingPostId(post.id)
    setEditPostForm({ title: post.title, content: post.content })
    setExpanded(post.id)
  }

  const saveEditPost = async (postId: string) => {
    const title = editPostForm.title.trim()
    const content = editPostForm.content.trim()
    if (!title || !content) return
    setActionError(null)
    const editedAt = new Date().toISOString()
    const { error } = await supabase
      .from('community_posts')
      .update({ title, content, edited_at: editedAt, updated_at: editedAt })
      .eq('id', postId)
    if (error) { setActionError(`Edit failed: ${error.message}`); return }
    setPosts(p => p.map(x => x.id === postId ? { ...x, title, content, edited: true } : x))
    setEditingPostId(null)
  }

  const startEditReply = (reply: Reply) => {
    setEditingReplyId(reply.id)
    setEditReplyBody(reply.body)
  }

  const saveEditReply = async (postId: string, replyId: string) => {
    const body = editReplyBody.trim()
    if (!body) return
    setActionError(null)
    const { error } = await supabase
      .from('community_comments')
      .update({ body, edited_at: new Date().toISOString() })
      .eq('id', replyId)
    if (error) { setActionError(`Edit failed: ${error.message}`); return }
    setPosts(p => p.map(x => x.id === postId
      ? { ...x, replies: x.replies.map(r => r.id === replyId ? { ...r, body, edited: true } : r) }
      : x))
    setEditingReplyId(null)
  }

  const totalReplies = posts.reduce((s, p) => s + p.replies.length, 0)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Teacher Community</h1>
          <p className="text-sm text-muted-foreground">{posts.length} discussions · {totalReplies} replies</p>
        </div>
      </div>

      {/* Search + New Post */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
          <Input
            aria-label="Search discussions"
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
            <Label htmlFor="post-title" className="text-sm font-medium">Title *</Label>
            <Input id="post-title" placeholder="What do you want to discuss?"
              value={newForm.title} onChange={e => setNewForm(f => ({ ...f, title: e.target.value }))}
              className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="post-body" className="text-sm font-medium">Your message *</Label>
            <Textarea id="post-body" placeholder="Share context, ask a question, or start the conversation…"
              value={newForm.content} onChange={e => setNewForm(f => ({ ...f, content: e.target.value }))}
              className="rounded-xl resize-none" rows={4} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="post-category" className="text-sm font-medium">Category *</Label>
            <Select value={newForm.category} onValueChange={v => setNewForm(f => ({ ...f, category: v }))}>
              <SelectTrigger id="post-category" className="rounded-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {POST_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {postError && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-3 py-2">
              Failed to post: {postError}
            </p>
          )}
          <Button onClick={submitPost}
            disabled={!newForm.title.trim() || !newForm.content.trim() || !newForm.category || !userId}
            className="w-full rounded-xl font-semibold gap-2">
            <Send className="w-4 h-4" /> Post Discussion
          </Button>
        </div>
      )}

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTER_CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === c
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {actionError && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-3 py-2" role="alert">
          {actionError}
        </p>
      )}

      {/* Posts list */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground mb-4">
            {search || filter !== 'All' ? 'No discussions found.' : 'Be the first to start a discussion!'}
          </p>
          {(search || filter !== 'All') && (
            <Button onClick={() => { setSearch(''); setFilter('All') }} variant="outline" size="sm" className="rounded-xl">
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => {
            const isOpen = expanded === post.id
            const liked  = post.likes.includes(userId)

            return (
              <div key={post.id}
                className={`glass rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'ring-1 ring-primary/20' : ''}`}>

                <button className="w-full text-left px-5 pt-5 pb-3 hover:bg-muted/20 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : post.id)} aria-expanded={isOpen}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${CAT_COLORS[post.category] ?? 'bg-muted text-muted-foreground'}`}>
                          {post.category}
                        </span>
                        {post.county && <span className="text-xs text-muted-foreground">{post.county}</span>}
                      </div>
                      <h3 className="font-semibold text-sm leading-snug mb-1">{post.title}</h3>
                      {!isOpen && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{post.content}</p>
                      )}
                    </div>
                    <div className="shrink-0">
                      {isOpen
                        ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                </button>

                {/* Action bar */}
                <div className="flex items-center gap-3 px-5 pb-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
                      {post.initials}
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <span className="hidden sm:inline">{post.timestamp}</span>
                  {post.edited && <span className="italic">Edited</span>}
                  <div className="ml-auto flex items-center gap-3">
                    {post.userId === userId && (
                      <>
                        {withinEditWindow(post.createdAt) && (
                          <button onClick={e => startEditPost(post, e)}
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                            aria-label="Edit post">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button onClick={e => deletePost(post.id, e)}
                          className="flex items-center gap-1 hover:text-destructive transition-colors"
                          aria-label="Delete post">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    <button onClick={e => openAndFocusReply(post.id, e)}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                      aria-label={`${post.replies.length} replies — click to reply`}>
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.replies.length}</span>
                    </button>
                    <button onClick={e => toggleLike(post.id, e)}
                      className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
                      aria-label={liked ? 'Unlike' : 'Like'} aria-pressed={liked}>
                      <Heart className={`w-3.5 h-3.5 transition-all ${liked ? 'fill-red-500 scale-110' : ''}`} />
                      <span>{post.likes.length}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div className="border-t border-border/40 px-5 pb-5">
                    {editingPostId === post.id ? (
                      <div className="space-y-3 py-4">
                        <Input
                          aria-label="Edit post title"
                          value={editPostForm.title}
                          onChange={e => setEditPostForm(f => ({ ...f, title: e.target.value }))}
                          className="rounded-xl text-sm font-semibold"
                        />
                        <Textarea
                          aria-label="Edit post content"
                          value={editPostForm.content}
                          onChange={e => setEditPostForm(f => ({ ...f, content: e.target.value }))}
                          className="rounded-xl resize-none text-sm" rows={4}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => saveEditPost(post.id)}
                            disabled={!editPostForm.title.trim() || !editPostForm.content.trim()}
                            className="rounded-xl gap-1.5">
                            <Check className="w-3.5 h-3.5" /> Save changes
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingPostId(null)} className="rounded-xl">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed py-4">{post.content}</p>
                    )}

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
                                {reply.edited && <span className="text-xs text-muted-foreground italic">Edited</span>}
                                {reply.userId === userId && !reply.id.startsWith('temp-') && (
                                  <span className="ml-auto flex items-center gap-2">
                                    {withinEditWindow(reply.createdAt) && (
                                      <button onClick={() => startEditReply(reply)}
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label="Edit reply">
                                        <Pencil className="w-3 h-3" />
                                      </button>
                                    )}
                                    <button onClick={() => deleteReply(post.id, reply.id)}
                                      className="text-muted-foreground hover:text-destructive transition-colors"
                                      aria-label="Delete reply">
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </span>
                                )}
                              </div>
                              {editingReplyId === reply.id ? (
                                <div className="flex gap-2 mt-1">
                                  <Input
                                    aria-label="Edit reply"
                                    value={editReplyBody}
                                    onChange={e => setEditReplyBody(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveEditReply(post.id, reply.id) } }}
                                    className="rounded-xl text-xs h-8"
                                  />
                                  <Button size="sm" onClick={() => saveEditReply(post.id, reply.id)}
                                    disabled={!editReplyBody.trim()}
                                    className="rounded-xl px-2.5 h-8 shrink-0" aria-label="Save reply">
                                    <Check className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => setEditingReplyId(null)}
                                    className="rounded-xl px-2.5 h-8 shrink-0" aria-label="Cancel edit">
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground leading-relaxed">{reply.body}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary shrink-0 mt-1">
                          {authorInitials}
                        </div>
                        <div className="flex-1 flex gap-2">
                          <Input
                            ref={el => { replyInputRefs.current[post.id] = el }}
                            aria-label={`Reply to: ${post.title}`}
                            placeholder={userId ? 'Write a reply…' : 'Sign in to reply'}
                            value={replyBoxes[post.id] ?? ''}
                            onChange={e => setReplyBoxes(prev => ({ ...prev, [post.id]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitReply(post.id) } }}
                            className="rounded-xl text-sm h-9"
                            disabled={!userId}
                          />
                          <Button size="sm" onClick={() => submitReply(post.id)}
                            disabled={!(replyBoxes[post.id]?.trim()) || !userId}
                            className="rounded-xl px-3 h-9 shrink-0">
                            <Send className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                      {replyErrors[post.id] && (
                        <p className="text-xs text-destructive pl-9">
                          Reply failed: {replyErrors[post.id]}
                        </p>
                      )}
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
