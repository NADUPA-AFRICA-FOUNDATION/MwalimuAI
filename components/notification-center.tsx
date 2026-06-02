'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, X, BookOpen, Award, MessageSquare, Megaphone, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type NotificationType = 'course' | 'achievement' | 'community' | 'announcement'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  read: boolean
  link?: string
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'Welcome to Mwalimu AI!',
    message: 'Start your professional development journey with our AI-powered platform.',
    time: 'Just now',
    read: false,
    link: '/dashboard',
  },
  {
    id: '2',
    type: 'course',
    title: 'New Module Available',
    message: 'CBC Fundamentals module is now available. Start learning today!',
    time: '5 min ago',
    read: false,
    link: '/dashboard/modules/1',
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Badge Earned!',
    message: 'Congratulations! You earned the "Quick Starter" badge.',
    time: '1 hour ago',
    read: false,
    link: '/dashboard/achievements',
  },
  {
    id: '4',
    type: 'community',
    title: 'New Reply to Your Post',
    message: 'Sarah M. replied to your discussion about formative assessment.',
    time: '2 hours ago',
    read: true,
    link: '/dashboard/community',
  },
  {
    id: '5',
    type: 'course',
    title: 'Complete Your Assessment',
    message: 'Take your needs assessment to get personalized learning recommendations.',
    time: '1 day ago',
    read: true,
    link: '/dashboard/assessment',
  },
]

const notificationIcons: Record<NotificationType, typeof BookOpen> = {
  course: BookOpen,
  achievement: Award,
  community: MessageSquare,
  announcement: Megaphone,
}

const notificationColors: Record<NotificationType, string> = {
  course: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  achievement: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  community: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  announcement: 'bg-primary/10 text-primary',
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const unreadCount = notifications.filter((n) => !n.read).length

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.link) router.push(notification.link)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-muted rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className={cn('w-5 h-5 transition-colors', isOpen ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-accent text-accent-foreground rounded-full px-1 animate-pulse motion-reduce:animate-none" aria-hidden="true">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-label="Notifications"
          aria-modal="false"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-sm">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:underline font-medium focus-visible:ring-2 focus-visible:ring-ring rounded px-0.5"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <Bell className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">No notifications yet</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  We&apos;ll notify you when something arrives
                </p>
              </div>
            ) : (
              <ul role="list" className="divide-y divide-border">
                {notifications.map((notification) => {
                  const Icon = notificationIcons[notification.type]
                  return (
                    <li
                      key={notification.id}
                      className={cn(
                        'group relative px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                        !notification.read && 'bg-primary/5'
                      )}
                      onClick={() => handleNotificationClick(notification)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleNotificationClick(notification)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${notification.title}${!notification.read ? ' (unread)' : ''}`}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div
                          className={cn(
                            'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center',
                            notificationColors[notification.type]
                          )}
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn('text-sm font-medium truncate', !notification.read && 'text-foreground')}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-1.5" aria-hidden="true" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-muted-foreground/70 mt-1">
                            {notification.time}
                          </p>
                        </div>

                        {/* Actions (visible on hover) */}
                        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                              className="p-1.5 hover:bg-background rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                              aria-label="Mark as read"
                            >
                              <Check className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="p-1.5 hover:bg-background rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label="Delete notification"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
              <button
                onClick={clearAll}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded px-0.5"
              >
                Clear all
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-7"
                onClick={() => {
                  setIsOpen(false)
                  router.push('/dashboard/settings')
                }}
              >
                Notification settings
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
