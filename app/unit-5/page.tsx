"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ArrowLeft, ArrowRight, BookOpen, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const topics = [
  {
    id: "intermediate-code",
    title: "Intermediate Code Generation",
    content: {
      definition:
        "Intermediate code is a machine-independent code that sits between high-level source code and target machine code.",
      keyPoints: [
        "Three-Address Code (TAC) - Most common form",
        "Quadruples and Triples representation",
        "Abstract Syntax Trees (AST)",
        "Stack-based intermediate code",
      ],
      examples: [
        {
          title: "Three-Address Code Example",
          code: `// Source: a = b + c * d
t1 = c * d
t2 = b + t1
a = t2

// Each instruction has at most 3 addresses:
// - Two operands and one result`,
        },
      ],
      examTips: [
        "Focus on TAC generation from expressions",
        "Practice converting control structures to TAC",
        "Remember operator precedence in code generation",
      ],
    },
  },
  {
    id: "code-optimization",
    title: "Code Optimization Techniques",
    content: {
      definition: "Code optimization improves program efficiency without changing its functionality.",
      keyPoints: [
        "Machine Independent Optimizations",
        "Machine Dependent Optimizations",
        "Local vs Global Optimizations",
        "Peephole Optimization",
      ],
      categories: [
        {
          name: "Local Optimizations",
          techniques: [
            "Constant Folding: 3 + 4 → 7",
            "Constant Propagation: x = 5; y = x + 2 → y = 7",
            "Dead Code Elimination",
            "Algebraic Simplification: x * 1 → x",
          ],
        },
        {
          name: "Global Optimizations",
          techniques: ["Common Subexpression Elimination", "Loop Optimization", "Code Motion", "Strength Reduction"],
        },
      ],
      examTips: [
        "Memorize common optimization patterns",
        "Practice identifying optimization opportunities",
        "Understand the difference between local and global optimizations",
      ],
    },
  },
  {
    id: "data-flow-analysis",
    title: "Data Flow Analysis",
    content: {
      definition:
        "Data flow analysis gathers information about the possible set of values calculated at various points in a program.",
      keyPoints: ["Reaching Definitions", "Available Expressions", "Live Variable Analysis", "Use-Definition Chains"],
      concepts: [
        {
          name: "Reaching Definitions",
          description:
            "A definition d reaches a point p if there exists a path from d to p such that d is not killed along that path.",
          example: "x = 1; ... ; y = x + 2 (definition of x reaches the use in y = x + 2)",
        },
        {
          name: "Live Variable Analysis",
          description: "A variable is live at a point if its value may be used before the variable is redefined.",
          example: "Used for register allocation and dead code elimination",
        },
      ],
      examTips: [
        "Practice drawing data flow graphs",
        "Understand IN and OUT sets for each analysis",
        "Know the iterative algorithm for data flow analysis",
      ],
    },
  },
  {
    id: "loop-optimization",
    title: "Loop Optimization",
    content: {
      definition:
        "Loop optimization techniques improve the performance of loops, which often consume most of the execution time.",
      keyPoints: ["Loop Invariant Code Motion", "Strength Reduction", "Loop Unrolling", "Loop Fusion and Fission"],
      techniques: [
        {
          name: "Loop Invariant Code Motion",
          description: "Move computations that produce the same result in every loop iteration outside the loop.",
          example: `// Before:
for (i = 0; i < n; i++) {
    x = y + z;  // y + z is loop invariant
    a[i] = x * i;
}

// After:
x = y + z;  // Moved outside
for (i = 0; i < n; i++) {
    a[i] = x * i;
}`,
        },
        {
          name: "Strength Reduction",
          description: "Replace expensive operations with cheaper ones.",
          example: `// Before: i * 4 in each iteration
// After: Use addition instead of multiplication`,
        },
      ],
      examTips: [
        "Identify loop invariant expressions",
        "Practice strength reduction examples",
        "Understand when loop unrolling is beneficial",
      ],
    },
  },
  {
    id: "register-allocation",
    title: "Register Allocation",
    content: {
      definition: "Register allocation assigns variables to processor registers to minimize memory access.",
      keyPoints: [
        "Graph Coloring Algorithm",
        "Live Range Analysis",
        "Spilling and Reloading",
        "Register Interference Graph",
      ],
      algorithm: [
        "1. Build interference graph",
        "2. Color the graph with k colors (k = number of registers)",
        "3. If coloring fails, spill some variables to memory",
        "4. Repeat until successful coloring",
      ],
      concepts: [
        {
          name: "Interference Graph",
          description:
            "Graph where nodes are variables and edges connect variables that cannot share the same register (live at the same time).",
        },
        {
          name: "Graph Coloring",
          description: "Assign colors (registers) to nodes such that no two adjacent nodes have the same color.",
        },
      ],
      examTips: [
        "Practice building interference graphs",
        "Understand the graph coloring algorithm",
        "Know when and how spilling occurs",
      ],
    },
  },
]

export default function Unit5Page() {
  const [currentTopic, setCurrentTopic] = useState(0)
  const [completedTopics, setCompletedTopics] = useState<number[]>([])
  const [showExamTips, setShowExamTips] = useState(false)

  const markTopicComplete = (topicIndex: number) => {
    if (!completedTopics.includes(topicIndex)) {
      setCompletedTopics([...completedTopics, topicIndex])
    }
  }

  const progress = (completedTopics.length / topics.length) * 100

  return (
    <div className="min-h-screen grid-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">Unit 5: Intermediate Code & Code Optimization</h1>
              <p className="text-muted-foreground">Master code generation and optimization techniques</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              {completedTopics.length}/{topics.length} Complete
            </Badge>
            <ThemeToggle />
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Unit Progress</span>
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Topic Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topics.map((topic, index) => (
                  <Button
                    key={topic.id}
                    variant={currentTopic === index ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left h-auto p-3 ${
                      currentTopic === index ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setCurrentTopic(index)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {completedTopics.includes(index) ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span className="text-sm leading-tight">{topic.title}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{topics[currentTopic].title}</CardTitle>
                  <Button onClick={() => setShowExamTips(!showExamTips)} variant="outline" size="sm">
                    <Target className="w-4 h-4 mr-2" />
                    Exam Tips
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Definition */}
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <h3 className="font-semibold mb-2">Definition</h3>
                  <p className="text-muted-foreground">{topics[currentTopic].content.definition}</p>
                </div>

                {/* Key Points */}
                <div>
                  <h3 className="font-semibold mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {topics[currentTopic].content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dynamic Content Based on Topic */}
                {topics[currentTopic].content.examples && (
                  <div>
                    <h3 className="font-semibold mb-3">Examples</h3>
                    {topics[currentTopic].content.examples.map((example, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg border">
                        <h4 className="font-medium mb-2">{example.title}</h4>
                        <pre className="text-sm whitespace-pre-wrap font-mono">{example.code}</pre>
                      </div>
                    ))}
                  </div>
                )}

                {topics[currentTopic].content.categories && (
                  <div>
                    <h3 className="font-semibold mb-3">Optimization Categories</h3>
                    {topics[currentTopic].content.categories.map((category, index) => (
                      <div key={index} className="mb-4 p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">{category.name}</h4>
                        <ul className="space-y-1">
                          {category.techniques.map((technique, techIndex) => (
                            <li key={techIndex} className="text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {technique}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {topics[currentTopic].content.concepts && (
                  <div>
                    <h3 className="font-semibold mb-3">Key Concepts</h3>
                    {topics[currentTopic].content.concepts.map((concept, index) => (
                      <div key={index} className="mb-4 p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">{concept.name}</h4>
                        <p className="text-sm mb-2 text-muted-foreground">{concept.description}</p>
                        {concept.example && <p className="text-sm italic">Example: {concept.example}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {topics[currentTopic].content.techniques && (
                  <div>
                    <h3 className="font-semibold mb-3">Optimization Techniques</h3>
                    {topics[currentTopic].content.techniques.map((technique, index) => (
                      <div key={index} className="mb-4 p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">{technique.name}</h4>
                        <p className="text-sm mb-2 text-muted-foreground">{technique.description}</p>
                        <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-3 rounded">
                          {technique.example}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {topics[currentTopic].content.algorithm && (
                  <div>
                    <h3 className="font-semibold mb-3">Algorithm Steps</h3>
                    <ol className="space-y-2">
                      {topics[currentTopic].content.algorithm.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium min-w-[24px] text-center">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Exam Tips */}
                {showExamTips && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Exam Strategy Tips
                    </h3>
                    <ul className="space-y-2">
                      {topics[currentTopic].content.examTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation and Completion */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    onClick={() => setCurrentTopic(Math.max(0, currentTopic - 1))}
                    disabled={currentTopic === 0}
                    variant="outline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={() => markTopicComplete(currentTopic)}
                    disabled={completedTopics.includes(currentTopic)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {completedTopics.includes(currentTopic) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>

                  <Button
                    onClick={() => setCurrentTopic(Math.min(topics.length - 1, currentTopic + 1))}
                    disabled={currentTopic === topics.length - 1}
                    variant="outline"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
