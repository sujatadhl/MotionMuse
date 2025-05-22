"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Film, Upload, Wand2 } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

export default function VideoGenerator() {
  const { user } = useAuth()
  const [generating, setGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [formData, setFormData] = useState({
    prompt: "",
    style: "realistic",
    duration: 15,
    aspectRatio: "16:9",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, duration: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGenerating(true)

    // Simulate video generation
    setTimeout(() => {
      setGenerating(false)
      setVideoUrl("/placeholder.svg?height=720&width=1280&text=Generated+Video")
    }, 3000)
  }

  // Get max duration based on user plan
  const getMaxDuration = () => {
    switch (user?.plan) {
      case "enterprise":
        return 300 // 5 minutes
      case "single":
        return 60 // 1 minute
      default:
        return 15 // 15 seconds for free plan
    }
  }

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter text-navy">AI Video Generator</h1>
            <p className="text-xl text-muted-foreground">
              Create professional videos in minutes with our AI-powered tool
            </p>
            {user?.plan && (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-logo-blue text-white">
                  {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                </span>
              </div>
            )}
          </div>

          {/* Demo Image Section */}
          <div className="relative mx-auto max-w-3xl mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-logo-purple/20 via-logo-pink/20 to-logo-blue/20 rounded-xl blur-xl"></div>
            <div className="relative bg-white p-4 rounded-xl shadow-lg">
              <Image
                src="/images/video-generator-demo.png"
                alt="AI Video Generator Demo"
                width={800}
                height={450}
                className="rounded-lg w-full h-auto"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Create animated explainer videos, company announcements, and more with just a few clicks
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="text-to-video" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger
                value="text-to-video"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-muse-red data-[state=active]:to-muse-orange data-[state=active]:text-white"
              >
                Text to Video
              </TabsTrigger>
              <TabsTrigger
                value="image-to-video"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-logo-blue data-[state=active]:to-logo-green data-[state=active]:text-white"
              >
                Image to Video
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text-to-video">
              <Card className="border-muse-red/20">
                <CardHeader>
                  <CardTitle className="text-navy">Text to Video</CardTitle>
                  <CardDescription>Describe your video and our AI will generate it for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="prompt">Video Description</Label>
                      <Textarea
                        id="prompt"
                        name="prompt"
                        placeholder="Describe your video in detail. E.g., A drone shot of a coastal city at sunset with people walking on the beach."
                        value={formData.prompt}
                        onChange={handleChange}
                        className="min-h-[120px] border-navy/20 focus-visible:ring-logo-blue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="style">Video Style</Label>
                        <Select value={formData.style} onValueChange={(value) => handleSelectChange("style", value)}>
                          <SelectTrigger id="style" className="border-navy/20 focus:ring-logo-blue">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realistic">Realistic</SelectItem>
                            <SelectItem value="cinematic">Cinematic</SelectItem>
                            <SelectItem value="animated">Animated</SelectItem>
                            <SelectItem value="vintage">Vintage</SelectItem>
                            <SelectItem value="futuristic">Futuristic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                        <Select
                          value={formData.aspectRatio}
                          onValueChange={(value) => handleSelectChange("aspectRatio", value)}
                        >
                          <SelectTrigger id="aspectRatio" className="border-navy/20 focus:ring-logo-blue">
                            <SelectValue placeholder="Select aspect ratio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                            <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                            <SelectItem value="1:1">1:1 (Square)</SelectItem>
                            <SelectItem value="4:5">4:5 (Instagram)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="duration">Duration (seconds)</Label>
                        <span>{formData.duration}s</span>
                      </div>
                      <Slider
                        id="duration"
                        min={5}
                        max={getMaxDuration()}
                        step={5}
                        value={[formData.duration]}
                        onValueChange={handleSliderChange}
                        className="[&>span]:bg-muse-red"
                      />
                      {user?.plan === "free" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Free plan limited to 15 seconds. Upgrade for longer videos.
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-muse-red to-muse-orange hover:from-muse-red/90 hover:to-muse-orange/90 text-white"
                      disabled={generating}
                    >
                      {generating ? (
                        <>
                          <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Film className="mr-2 h-4 w-4" />
                          Generate Video
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="image-to-video">
              <Card className="border-logo-blue/20">
                <CardHeader>
                  <CardTitle className="text-navy">Image to Video</CardTitle>
                  <CardDescription>Upload an image and our AI will transform it into a video</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="image">Upload Image</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-navy/20"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 10MB)</p>
                            </div>
                            <Input id="image-upload" type="file" accept="image/*" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prompt">Additional Instructions (Optional)</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Add any specific instructions for how you want the image to be animated"
                        className="min-h-[80px] border-navy/20 focus-visible:ring-logo-blue"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="style">Animation Style</Label>
                        <Select defaultValue="zoom">
                          <SelectTrigger id="style" className="border-navy/20 focus:ring-logo-blue">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zoom">Zoom</SelectItem>
                            <SelectItem value="pan">Pan</SelectItem>
                            <SelectItem value="3d">3D Effect</SelectItem>
                            <SelectItem value="parallax">Parallax</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="duration">Duration (seconds)</Label>
                          <span>15s</span>
                        </div>
                        <Slider
                          id="duration"
                          min={5}
                          max={getMaxDuration()}
                          step={5}
                          defaultValue={[15]}
                          className="[&>span]:bg-logo-blue"
                        />
                        {user?.plan === "free" && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Free plan limited to 15 seconds. Upgrade for longer videos.
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-logo-blue to-logo-green hover:from-logo-blue/90 hover:to-logo-green/90 text-white"
                    >
                      <Film className="mr-2 h-4 w-4" />
                      Generate Video
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {videoUrl && (
            <Card className="border-rainbow-gradient bg-gradient-to-r from-transparent via-white to-transparent p-[1px]">
              <CardHeader className="bg-background rounded-t-lg">
                <CardTitle className="text-navy">Generated Video</CardTitle>
                <CardDescription>Your AI-generated video is ready to download or share</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 bg-background rounded-b-lg">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={videoUrl || "/placeholder.svg"}
                    alt="Generated video preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-gradient-to-r from-muse-red to-muse-orange hover:from-muse-red/90 hover:to-muse-orange/90 text-white">
                    Download Video
                  </Button>
                  <Button variant="outline" className="border-navy text-navy hover:bg-navy/10">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
