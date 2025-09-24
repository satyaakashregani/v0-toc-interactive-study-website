"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Target, CheckCircle, PlayCircle, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const units = [
  {
    id: 1,
    title: "Finite Automata & Regular Expressions",
    description: "DFA, NFA, Regular Expressions, Mealy & Moore Machines",
    duration: "2 hours",
    topics: 8,
    completed: 0,
    href: "/unit-1",
  },
  {
    id: 2,
    title: "Context-Free Grammar & Push Down Automata",
    description: "CFG, Grammar Simplification, PDA, Normal Forms",
    duration: "2 hours",
    topics: 6,
    completed: 0,
    href: "/unit-2",
  },
  {
    id: 3,
    title: "Turing Machines & Computability",
    description: "Turing Machines, Decidability, P vs NP, Halting Problem",
    duration: "2 hours",
    topics: 5,
    completed: 0,
    href: "/unit-3",
  },
  {
    id: 4,
    title: "Compilers & Syntax Analysis",
    description: "Compiler Structure, Parsing, LR Parsers, Syntax Analysis",
    duration: "1.5 hours",
    topics: 7,
    completed: 0,
    href: "/unit-4",
  },
  {
    id: 5,
    title: "Intermediate Code & Code Optimization",
    description: "Code Generation, Optimization, Basic Blocks, DAG",
    duration: "1.5 hours",
    topics: 6,
    completed: 0,
    href: "/unit-5",
  },
]

export default function HomePage() {
  const [progress] = useState(0)
  const totalTopics = units.reduce((sum, unit) => sum + unit.topics, 0)
  const completedTopics = units.reduce((sum, unit) => sum + unit.completed, 0)

  return (
    <div className="min-h-screen grid-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Last Attempt - Supply Exam
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Master Theory of{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Computation
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Complete intensive preparation for your Theory of Computation supply exam in just one day. Interactive
                lessons, practice problems, and exam strategies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Target className="w-5 h-5 mr-2" />
                Quick Review
              </Button>
            </div>

            {/* Progress Overview */}
            <Card className="max-w-md mx-auto">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Overall Progress</CardTitle>
                <CardDescription>
                  {completedTopics} of {totalTopics} topics completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0% Complete</span>
                  <span>9 hours remaining</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Study Plan</h2>
          <p className="text-muted-foreground text-lg">
            Five comprehensive units designed for intensive one-day preparation
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <Card key={unit.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="outline">Unit {unit.id}</Badge>
                    <CardTitle className="text-lg text-balance">{unit.title}</CardTitle>
                  </div>
                  <div className="text-2xl">
                    {unit.completed === unit.topics ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Brain className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </div>
                <CardDescription className="text-pretty">{unit.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{unit.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{unit.topics} topics</span>
                  </div>
                </div>

                <Progress value={(unit.completed / unit.topics) * 100} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {unit.completed}/{unit.topics} completed
                  </span>
                  <Link href={unit.href}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Start Unit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card/50 backdrop-blur-sm border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Units</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{totalTopics}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">9</div>
              <div className="text-sm text-muted-foreground">Hours</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Practice Problems</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
