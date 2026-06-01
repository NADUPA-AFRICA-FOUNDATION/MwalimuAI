'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { BackButton } from '@/components/back-button'

export default function SettingsPage() {
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
  }

  const handleToggle = (field: string) => {
    setFormData({ ...formData, [field]: !formData[field] })
  }

  const handleSave = () => {
    console.log('Settings saved:', formData)
    alert('Settings updated successfully!')
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
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} disabled />
          <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+254 712 345 678"
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
            placeholder="Tell us about yourself..."
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
            />
          </div>
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
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}
