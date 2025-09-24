"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Lightbulb, Target, BookOpen } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const topics = [
  { id: 1, title: "Introduction to Automata Theory", completed: false },
  { id: 2, title: "Deterministic Finite Automata (DFA)", completed: false },
  { id: 3, title: "Non-Deterministic Finite Automata (NFA)", completed: false },
  { id: 4, title: "NFA to DFA Conversion", completed: false },
  { id: 5, title: "DFA Minimization", completed: false },
  { id: 6, title: "Mealy and Moore Machines", completed: false },
  { id: 7, title: "Regular Expressions", completed: false },
  { id: 8, title: "Applications and Practice", completed: false },
]

export default function Unit1Page() {
  const [completedTopics, setCompletedTopics] = useState<number[]>([])
  const [currentTopic, setCurrentTopic] = useState(1)

  const toggleTopic = (topicId: number) => {
    setCompletedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const progress = (completedTopics.length / topics.length) * 100

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Unit 1: Finite Automata & Regular Expressions</h1>
                <p className="text-muted-foreground">Master the fundamentals of computation theory</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">2 hours</Badge>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>
                Progress: {completedTopics.length}/{topics.length} topics
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentTopic === topic.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setCurrentTopic(topic.id)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTopic(topic.id)
                      }}
                      className="flex-shrink-0"
                    >
                      {completedTopics.includes(topic.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <span className="text-sm font-medium">{topic.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={`topic-${currentTopic}`} className="space-y-6">
              {/* Topic 1: Introduction */}
              <TabsContent value="topic-1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Introduction to Automata Theory
                    </CardTitle>
                    <CardDescription>Understanding the foundations of computation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Key Insight:</strong> Automata theory is the mathematical foundation that helps us
                        understand what computers can and cannot do.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Core Concepts</h3>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="alphabet">
                          <AccordionTrigger>Alphabet (Σ)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p>A finite set of symbols used to construct strings.</p>
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="font-mono text-sm">
                                  <strong>Examples:</strong>
                                  <br />Σ = {`{0, 1}`} (binary alphabet)
                                  <br />Σ = {`{a, b, c}`} (letters)
                                  <br />Σ = {`{+, -, *, /}`} (operators)
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="string">
                          <AccordionTrigger>String</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p>A finite sequence of symbols from an alphabet.</p>
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="font-mono text-sm">
                                  <strong>Examples:</strong>
                                  <br />
                                  "01101" (binary string)
                                  <br />
                                  "abc" (letter string)
                                  <br />
                                  "ε" (empty string - contains no symbols)
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="language">
                          <AccordionTrigger>Language (L)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p>A set of strings over an alphabet. Can be finite or infinite.</p>
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="font-mono text-sm">
                                  <strong>Examples:</strong>
                                  <br />
                                  L₁ = {`{ε, 0, 1, 00, 01, 10, 11}`} (finite)
                                  <br />
                                  L₂ = {`{all binary strings ending in 1}`} (infinite)
                                  <br />
                                  L₃ = {`{aⁿbⁿ | n ≥ 0}`} = {`{ε, ab, aabb, aaabbb, ...}`}
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="grammar">
                          <AccordionTrigger>Grammar</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p>A set of rules that define how to generate strings in a language.</p>
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="font-mono text-sm">
                                  <strong>Grammar G = (V, T, P, S)</strong>
                                  <br />V = Variables (non-terminals)
                                  <br />T = Terminals (alphabet symbols)
                                  <br />P = Production rules
                                  <br />S = Start symbol
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    <Alert>
                      <Target className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Exam Tip:</strong> Always clearly define your alphabet and show string examples when
                        solving problems.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 2: DFA */}
              <TabsContent value="topic-2" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Deterministic Finite Automata (DFA)</CardTitle>
                    <CardDescription>The simplest computational model</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Think of DFA as:</strong> A vending machine - for every state and input, there's exactly
                        one next state.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">DFA Definition</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>DFA M = (Q, Σ, δ, q₀, F)</strong>
                          <br />Q = Finite set of states
                          <br />Σ = Input alphabet
                          <br />δ = Transition function: Q × Σ → Q<br />
                          q₀ = Start state
                          <br />F = Set of final (accepting) states
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Key Properties</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>Deterministic:</strong> For every state and input symbol, exactly one transition
                        </li>
                        <li>
                          <strong>No ε-moves:</strong> Every transition consumes an input symbol
                        </li>
                        <li>
                          <strong>Finite memory:</strong> Only remembers current state
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold">Example: Binary Strings Ending in "01"</h3>
                      <div className="bg-card border rounded-lg p-6">
                        <div className="text-center space-y-4">
                          <p className="text-sm text-muted-foreground">State Diagram</p>
                          <div className="flex justify-center items-center gap-8">
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
                                <span className="font-bold">q₀</span>
                              </div>
                              <p className="text-xs mt-1">Start</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                                <span className="font-bold">q₁</span>
                              </div>
                              <p className="text-xs mt-1">Saw 0</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-500/10">
                                <span className="font-bold">q₂</span>
                              </div>
                              <p className="text-xs mt-1">Accept</p>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p>Transitions: q₀ &gt; q₁, q₁ &gt; q₂</p>
                            <p>Self-loops and other transitions omitted for clarity</p>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Strategy:</strong> Always draw state diagrams clearly. Label start state with
                          arrow, final states with double circles.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 3: NFA */}
              <TabsContent value="topic-3" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Non-Deterministic Finite Automata (NFA)</CardTitle>
                    <CardDescription>Multiple choices, more flexibility</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Think of NFA as:</strong> A maze with multiple paths - if any path leads to acceptance,
                        the string is accepted.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">NFA vs DFA Comparison</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">DFA</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>• Exactly one transition per (state, symbol)</p>
                            <p>• No ε-transitions</p>
                            <p>• Predictable execution</p>
                            <p>• Easier to implement</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">NFA</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>• 0, 1, or more transitions per (state, symbol)</p>
                            <p>• Can have ε-transitions</p>
                            <p>• Multiple execution paths</p>
                            <p>• More compact representation</p>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">Key Insight</h3>
                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                        <p className="text-sm">
                          <strong>Equivalence Theorem:</strong> For every NFA, there exists an equivalent DFA that
                          accepts the same language. NFAs don't add computational power, but they can be more concise.
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">ε-Transitions</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Transitions that don't consume input symbols - "free moves"</p>
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>ε-closure(q):</strong> Set of all states reachable from q using only ε-transitions
                          </p>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Tip:</strong> When tracing NFA execution, consider ALL possible paths. A string
                          is accepted if ANY path reaches a final state.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 4: NFA to DFA Conversion */}
              <TabsContent value="topic-4" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>NFA to DFA Conversion (Subset Construction)</CardTitle>
                    <CardDescription>The most important algorithm in Unit 1</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Core Idea:</strong> Each DFA state represents a SET of NFA states that could be active
                        simultaneously.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Algorithm Steps</h3>
                      <div className="space-y-3">
                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold">Step 1: Start State</h4>
                          <p className="text-sm text-muted-foreground">
                            DFA start state = ε-closure of NFA start state
                          </p>
                        </div>
                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold">Step 2: Explore Transitions</h4>
                          <p className="text-sm text-muted-foreground">
                            For each DFA state S and symbol a: new state = ε-closure(δ(S, a))
                          </p>
                        </div>
                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold">Step 3: Mark Final States</h4>
                          <p className="text-sm text-muted-foreground">
                            DFA state is final if it contains any NFA final state
                          </p>
                        </div>
                        <div className="border-l-4 border-primary pl-4">
                          <h4 className="font-semibold">Step 4: Repeat</h4>
                          <p className="text-sm text-muted-foreground">Continue until no new states are created</p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Example Walkthrough</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>Given NFA states:</strong> {`{q₀, q₁, q₂}`}
                          <br />
                          <strong>Start state:</strong> q₀
                          <br />
                          <strong>Final states:</strong> {`{q₂}`}
                          <br />
                          <br />
                          <strong>DFA Construction:</strong>
                          <br />
                          DFA State A = {`{q₀}`} (start)
                          <br />
                          DFA State B = {`{q₀, q₁}`}
                          <br />
                          DFA State C = {`{q₂}`} (final)
                          <br />
                        </p>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Strategy:</strong> Use a systematic table to track DFA states and transitions.
                          This prevents errors and shows clear work.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Continue with remaining topics... */}
              <TabsContent value="topic-5" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>DFA Minimization</CardTitle>
                    <CardDescription>Creating the smallest equivalent DFA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Goal:</strong> Remove redundant states while preserving the language accepted.
                      </AlertDescription>
                    </Alert>
                    <div className="mt-4 space-y-4">
                      <h3 className="text-lg font-semibold">Minimization Algorithm</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Remove unreachable states</li>
                        <li>Create initial partition: {`{Final States, Non-Final States}`}</li>
                        <li>Refine partitions based on transition behavior</li>
                        <li>Repeat until no more refinement possible</li>
                        <li>Each final partition becomes one state in minimized DFA</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topic-6" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mealy and Moore Machines</CardTitle>
                    <CardDescription>Finite automata with output</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Moore Machine</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p>• Output depends only on current state</p>
                          <p>• Output written inside state circles</p>
                          <p>• Input length n → Output length n+1</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Mealy Machine</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p>• Output depends on state AND input</p>
                          <p>• Output written on transition arrows</p>
                          <p>• Input length n → Output length n</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topic-7" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regular Expressions</CardTitle>
                    <CardDescription>Pattern matching and language description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Operations</h3>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                        <p>
                          <strong>a*</strong> - Zero or more a's
                        </p>
                        <p>
                          <strong>a+</strong> - One or more a's
                        </p>
                        <p>
                          <strong>a|b</strong> - Either a or b
                        </p>
                        <p>
                          <strong>ab</strong> - a followed by b
                        </p>
                        <p>
                          <strong>(a|b)*</strong> - Any combination of a's and b's
                        </p>
                      </div>
                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Key Theorem:</strong> Regular expressions and finite automata are equivalent in
                          expressive power.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topic-8" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Applications and Practice</CardTitle>
                    <CardDescription>Real-world applications and exam preparation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Common Applications</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Lexical analysis in compilers</li>
                        <li>Pattern matching in text editors</li>
                        <li>Protocol verification</li>
                        <li>Digital circuit design</li>
                      </ul>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Focus:</strong> Practice NFA to DFA conversion, DFA minimization, and regular
                          expression problems extensively.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link href="/unit-2">
                <Button>
                  Next: Unit 2
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
