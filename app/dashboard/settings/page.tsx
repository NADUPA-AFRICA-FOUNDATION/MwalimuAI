'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { BackButton } from '@/components/back-button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { getLowBandwidth, setLowBandwidth } from '@/lib/accessibility'
import { toast } from 'sonner'
import { Wifi, WifiOff } from 'lucide-react'

export default function SettingsPage() {
  const [lowBandwidth, setLBW] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => { setLBW(getLowBandwidth()) }, [])

  // Warn on tab close / refresh when there are unsaved changes
  useEffect(() => {
    if (!isDirty) return
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  const toggleLBW = (v: boolean) => { setLowBandwidth(v); setLBW(v) }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    county: '',
    subjects: '',
    bio: '',
    emailNotifications: true,
    weeklyDigest: false,
    communityEmails: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setIsDirty(true)
  }

  const handleToggle = (field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: !formData[field] })
    setIsDirty(true)
  }

  const handleSave = () => {
    console.log('Settings saved:', formData)
    toast.success('Settings saved successfully')
    setIsDirty(false)
    // TODO: Save to Supabase
  }

  return (
    <div className="max-w-3xl space-y-8">
      <BackButton fallbackHref="/dashboard" label="Back to Dashboard" />
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Your first name"
              autoComplete="given-name"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Your last name"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            autoComplete="email"
            spellCheck={false}
            disabled
          />
          <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+254 712 345 678"
            autoComplete="tel"
          />
        </div>

        <div>
          <Label htmlFor="school">School Name</Label>
          <Input
            id="school"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="Your school name"
            autoComplete="organization"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="county">County</Label>
            <Input
              id="county"
              name="county"
              value={formData.county}
              onChange={handleChange}
              placeholder="Your county"
              autoComplete="address-level2"
            />
          </div>
          <div>
            <Label htmlFor="subjects">Subjects Taught</Label>
            <Input
              id="subjects"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              placeholder="e.g., Mathematics, English"
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself…"
            rows={4}
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Profile
        </Button>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive emails about your learning progress and new content
              </p>
            </div>
            <Switch
              checked={formData.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
              aria-label="Toggle email notifications"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Digest</p>
              <p className="text-sm text-muted-foreground">
                Receive a weekly summary of your progress and new modules
              </p>
            </div>
            <Switch
              checked={formData.weeklyDigest}
              onCheckedChange={() => handleToggle('weeklyDigest')}
              aria-label="Toggle weekly digest"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Community Emails</p>
              <p className="text-sm text-muted-foreground">
                Get notified about new discussions and replies in the community
              </p>
            </div>
            <Switch
              checked={formData.communityEmails}
              onCheckedChange={() => handleToggle('communityEmails')}
              aria-label="Toggle community emails"
            />
          </div>
        </div>
      </Card>

      {/* Accessibility */}
      <Card className="p-6 space-y-5">
        <h2 className="text-xl font-semibold">Accessibility &amp; Connectivity</h2>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
              {lowBandwidth ? <WifiOff className="w-4 h-4 text-muted-foreground" /> : <Wifi className="w-4 h-4 text-primary" />}
            </div>
            <div>
              <p className="font-medium text-sm">Low-bandwidth Mode</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hides video thumbnails and decorative media. Shows text-only lesson content.
                Ideal for schools with slow internet or mobile data constraints.
              </p>
            </div>
          </div>
          <Switch
            checked={lowBandwidth}
            onCheckedChange={toggleLBW}
            aria-label="Toggle low-bandwidth mode"
          />
        </div>

        <div className="bg-muted/30 rounded-xl p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Offline access</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Open any learning program and tap <strong>Save for Offline</strong> to download the full program content as an HTML file.
            Open it in any browser without internet.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-xl p-4">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">WhatsApp sharing</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tap <strong>Share</strong> or <strong>WhatsApp</strong> on any lesson to send key points or a lesson summary directly to your WhatsApp.
            Works on any lesson page.
          </p>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Account</h2>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Download My Data
          </Button>

          {/* Delete account — requires confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This cannot be undone. All your progress, badges, journal entries, and learning data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Yes, delete my account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  )
}
