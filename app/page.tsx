"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, BookOpen, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">XERODMA</h1>
            <p className="text-xl text-muted-foreground">Professional Gaming Tools & Hardware Solutions</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Public Guides */}
            <Card
              className="bg-card border-border hover:bg-card/80 transition-colors cursor-pointer"
              onClick={() => router.push("/guides")}
            >
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">Browse Guides</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Access product documentation and setup instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Guides</Button>
              </CardContent>
            </Card>

            {/* Staff Panel */}
            <Card
              className="bg-card border-border hover:bg-card/80 transition-colors cursor-pointer"
              onClick={() => router.push("/staff")}
            >
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-2xl text-card-foreground">Staff Panel</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Secure access for staff members and administrators
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  className="w-full border-border text-card-foreground hover:bg-accent bg-transparent"
                >
                  Staff Login
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Product Showcase */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Gaming Arsenal</h2>
            <p className="text-muted-foreground">Professional tools and hardware for competitive gaming</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "HWID Spoofer", url: "/images/hwid-spoofer-banner.png" },
              { name: "DMA Card", url: "/images/dma-card-banner.png" },
              { name: "Rust Product", url: "/images/rust-product-banner.png" },
              { name: "Valorant Tools", url: "/images/valorant-product-banner.png" },
              { name: "Hardware", url: "/images/hardware-banner.png" },
            ].map((product, index) => (
              <div key={index} className="group">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted border border-border">
                  <img
                    src={product.url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="text-sm font-medium text-card-foreground mt-2 text-center">{product.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 mt-12 border-t border-border">
          <p className="text-sm text-muted-foreground">© 2024 XERODMA. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
