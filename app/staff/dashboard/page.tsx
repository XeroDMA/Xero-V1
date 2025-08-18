"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Files, BookOpen, Users, Download, Upload, Shield, Activity, TrendingUp, Clock, Settings } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function StaffDashboardPage() {
  const [stats] = useState({
    totalFiles: 247,
    activeDownloads: 12,
    totalGuides: 18,
    activeUsers: 8,
  })

  const recentActivity = [
    { id: 1, action: "File uploaded", item: "HWID-Spoofer-v2.1.exe", time: "2 minutes ago", type: "upload" },
    { id: 2, action: "Guide accessed", item: "Valorant Setup Guide", time: "5 minutes ago", type: "guide" },
    {
      id: 3,
      action: "Download link generated",
      item: "DMA-Card-Firmware.bin",
      time: "12 minutes ago",
      type: "download",
    },
    { id: 4, action: "User authenticated", item: "staff_user_02", time: "18 minutes ago", type: "auth" },
  ]

  const productImages = [
    { name: "HWID Spoofer", url: "/images/hwid-spoofer-banner.png", category: "Security" },
    { name: "DMA Card", url: "/images/dma-card-banner.png", category: "Hardware" },
    { name: "Rust Product", url: "/images/rust-product-banner.png", category: "Gaming" },
    { name: "Valorant Colorbot", url: "/images/valorant-colorbot-banner.png", category: "Gaming" },
    { name: "Apex Legends", url: "/images/apex-legends-banner.png", category: "Gaming" },
    { name: "Fortnite Product", url: "/images/fortnite-product-banner.png", category: "Gaming" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with XERODMA branding */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">XERODMA Dashboard</h1>
            <p className="text-muted-foreground">Welcome to the professional gaming tools management system</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Files</CardTitle>
              <Files className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stats.totalFiles}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Active Downloads</CardTitle>
              <Download className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stats.activeDownloads}</div>
              <p className="text-xs text-muted-foreground">
                <Activity className="inline w-3 h-3 mr-1" />
                Real-time activity
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Guides</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stats.totalGuides}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +3 new this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Active Users</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                <Shield className="inline w-3 h-3 mr-1" />
                Staff members online
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">Latest actions in the XERODMA system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {activity.type === "upload" && <Upload className="w-4 h-4 text-primary" />}
                      {activity.type === "guide" && <BookOpen className="w-4 h-4 text-accent" />}
                      {activity.type === "download" && <Download className="w-4 h-4 text-primary" />}
                      {activity.type === "auth" && <Shield className="w-4 h-4 text-accent" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.item}</p>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Showcase with enhanced branding */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">XERODMA Gaming Arsenal</CardTitle>
              <CardDescription className="text-muted-foreground">
                Professional gaming tools and hardware solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {productImages.map((product, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
                      <img
                        src={product.url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-card-foreground">{product.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge className="text-xs bg-primary text-primary-foreground">Active</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions with XERODMA branding */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">XERODMA Control Center</CardTitle>
            <CardDescription className="text-muted-foreground">
              Quick access to essential management functions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col bg-primary hover:bg-primary/90 text-primary-foreground group">
                <Upload className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Upload New File</span>
                <span className="text-xs opacity-80">Add gaming tools</span>
              </Button>
              <Button className="h-20 flex-col bg-accent hover:bg-accent/90 text-accent-foreground group">
                <BookOpen className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Manage Guides</span>
                <span className="text-xs opacity-80">Setup instructions</span>
              </Button>
              <Button className="h-20 flex-col bg-secondary hover:bg-secondary/90 text-secondary-foreground group">
                <Users className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-medium">User Management</span>
                <span className="text-xs opacity-80">Access control</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-6 border-t border-border">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold text-foreground">XERODMA</span>
          </div>
          <p className="text-sm text-muted-foreground">Professional Gaming Tools & Hardware Solutions</p>
          <p className="text-xs text-muted-foreground mt-1">© 2024 XERODMA. All rights reserved.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
