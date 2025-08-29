"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileText, Shield, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* XERODMA Logo/Brand */}
        <div className="space-y-4">
          <div className="text-6xl font-bold text-primary">XERODMA</div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* 404 Error */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-primary/80">404</h1>
          <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary bg-transparent"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm">Home</span>
            </Button>
          </Link>

          <Link href="/guides">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary bg-transparent"
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm">Guides</span>
            </Button>
          </Link>

          <Link href="/staff">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary bg-transparent"
            >
              <Shield className="w-5 h-5" />
              <span className="text-sm">Staff Panel</span>
            </Button>
          </Link>
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  )
}
