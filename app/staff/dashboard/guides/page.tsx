"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Eye,
  Calendar,
  User,
  Shield,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Guide {
  id: string
  title: string
  description: string
  category: string
  isPasswordProtected: boolean
  password?: string
  createdDate: string
  lastModified: string
  author: string
  views: number
  status: "published" | "draft" | "archived"
}

export default function GuidesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)
  const [newGuide, setNewGuide] = useState({
    title: "",
    description: "",
    category: "",
    content: "",
    isPasswordProtected: false,
    password: "",
  })

  const [guides] = useState<Guide[]>([
    {
      id: "1",
      title: "HWID Spoofer Installation Guide",
      description: "Complete setup instructions for the HWID Spoofer tool",
      category: "Installation",
      isPasswordProtected: true,
      password: "hwid2024",
      createdDate: "2024-01-15",
      lastModified: "2024-01-16",
      author: "Admin",
      views: 234,
      status: "published",
    },
    {
      id: "2",
      title: "DMA Card Configuration",
      description: "Step-by-step guide for configuring your DMA card",
      category: "Hardware",
      isPasswordProtected: true,
      password: "dma_config",
      createdDate: "2024-01-14",
      lastModified: "2024-01-15",
      author: "TechSupport",
      views: 189,
      status: "published",
    },
    {
      id: "3",
      title: "Valorant Colorbot Setup",
      description: "How to properly configure the Valorant colorbot",
      category: "Gaming",
      isPasswordProtected: true,
      password: "val_setup",
      createdDate: "2024-01-13",
      lastModified: "2024-01-14",
      author: "GameMaster",
      views: 312,
      status: "published",
    },
    {
      id: "4",
      title: "Rust Cheat Configuration",
      description: "Advanced configuration options for Rust cheats",
      category: "Gaming",
      isPasswordProtected: true,
      password: "rust_advanced",
      createdDate: "2024-01-12",
      lastModified: "2024-01-13",
      author: "Admin",
      views: 156,
      status: "published",
    },
    {
      id: "5",
      title: "Troubleshooting Common Issues",
      description: "Solutions for frequently encountered problems",
      category: "Support",
      isPasswordProtected: false,
      createdDate: "2024-01-10",
      lastModified: "2024-01-11",
      author: "Support",
      views: 89,
      status: "draft",
    },
  ])

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateGuide = () => {
    console.log("Creating guide:", newGuide)
    // Handle guide creation with your Node.js backend
    setIsCreateDialogOpen(false)
    setNewGuide({
      title: "",
      description: "",
      category: "",
      content: "",
      isPasswordProtected: false,
      password: "",
    })
  }

  const handlePasswordUpdate = (guideId: string, password: string) => {
    console.log("Updating password for guide:", guideId, password)
    // Handle password update with your Node.js backend
    setIsPasswordDialogOpen(false)
    setSelectedGuide(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-primary text-primary-foreground">Published</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "archived":
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "installation":
        return "bg-primary/10 text-primary border-primary/20"
      case "hardware":
        return "bg-accent/10 text-accent border-accent/20"
      case "gaming":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      case "support":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Guides Management</h1>
            <p className="text-muted-foreground">Create and manage product guides with password protection</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Create Guide
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-card-foreground">Create New Guide</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Add a new guide for your products
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guide-title" className="text-card-foreground">
                      Title
                    </Label>
                    <Input
                      id="guide-title"
                      placeholder="Guide title"
                      value={newGuide.title}
                      onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guide-category" className="text-card-foreground">
                      Category
                    </Label>
                    <Input
                      id="guide-category"
                      placeholder="e.g., Installation, Gaming"
                      value={newGuide.category}
                      onChange={(e) => setNewGuide({ ...newGuide, category: e.target.value })}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guide-description" className="text-card-foreground">
                    Description
                  </Label>
                  <Input
                    id="guide-description"
                    placeholder="Brief description of the guide"
                    value={newGuide.description}
                    onChange={(e) => setNewGuide({ ...newGuide, description: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guide-content" className="text-card-foreground">
                    Content
                  </Label>
                  <Textarea
                    id="guide-content"
                    placeholder="Write your guide content here..."
                    value={newGuide.content}
                    onChange={(e) => setNewGuide({ ...newGuide, content: e.target.value })}
                    className="bg-input border-border text-foreground min-h-32"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="password-protected"
                    checked={newGuide.isPasswordProtected}
                    onChange={(e) => setNewGuide({ ...newGuide, isPasswordProtected: e.target.checked })}
                    className="rounded border-border"
                  />
                  <Label htmlFor="password-protected" className="text-card-foreground">
                    Password Protected
                  </Label>
                </div>
                {newGuide.isPasswordProtected && (
                  <div className="space-y-2">
                    <Label htmlFor="guide-password" className="text-card-foreground">
                      Password
                    </Label>
                    <Input
                      id="guide-password"
                      type="password"
                      placeholder="Enter password"
                      value={newGuide.password}
                      onChange={(e) => setNewGuide({ ...newGuide, password: e.target.value })}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-border text-card-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateGuide}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Create Guide
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Guides</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{guides.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Published</CardTitle>
              <Eye className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {guides.filter((g) => g.status === "published").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Protected</CardTitle>
              <Lock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {guides.filter((g) => g.isPasswordProtected).length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {guides.reduce((sum, guide) => sum + guide.views, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">All Guides</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your product guides and access controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border text-foreground"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="bg-muted border-border hover:bg-muted/80 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-card-foreground mb-2">{guide.title}</CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getCategoryColor(guide.category)}>{guide.category}</Badge>
                          {getStatusBadge(guide.status)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover border-border">
                          <DropdownMenuItem className="text-popover-foreground hover:bg-accent">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedGuide(guide)
                              setIsPasswordDialogOpen(true)
                            }}
                            className="text-popover-foreground hover:bg-accent"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Set Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{guide.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {guide.isPasswordProtected ? (
                            <Lock className="w-3 h-3 text-primary" />
                          ) : (
                            <Unlock className="w-3 h-3 text-muted-foreground" />
                          )}
                          <span>{guide.isPasswordProtected ? "Protected" : "Public"}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{guide.createdDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{guide.views} views</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Password Dialog */}
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">Set Guide Password</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedGuide && `Update password for "${selectedGuide.title}"`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-card-foreground">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordDialogOpen(false)}
                  className="border-border text-card-foreground"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => selectedGuide && handlePasswordUpdate(selectedGuide.id, "new-password")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
