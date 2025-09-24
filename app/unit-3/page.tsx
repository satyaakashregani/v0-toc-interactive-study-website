"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Lightbulb, Target, Cpu, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const topics = [
  { id: 1, title: "Turing Machine Definition", completed: false },
  { id: 2, title: "Turing Machine Examples", completed: false },
  { id: 3, title: "Church's Thesis", completed: false },
  { id: 4, title: "Decidability vs Undecidability", completed: false },
  { id: 5, title: "The Halting Problem", completed: false },
]

export default function Unit3Page() {
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
                <h1 className="text-2xl font-bold">Unit 3: Turing Machines & Computability</h1>
                <p className="text-muted-foreground">The ultimate computational model and limits of computation</p>
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
              {/* Topic 1: Turing Machine Definition */}
              <TabsContent value="topic-1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="w-5 h-5" />
                      Turing Machine Definition
                    </CardTitle>
                    <CardDescription>The most powerful computational model</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Key Insight:</strong> Turing Machine = Finite Automata + Infinite Tape. It can read,
                        write, and move in both directions on the tape.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Formal Definition</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>TM M = (Q, Σ, Γ, δ, q₀, qₐ, qᵣ)</strong>
                          <br />Q = Finite set of states
                          <br />Σ = Input alphabet
                          <br />Γ = Tape alphabet (Σ ⊆ Γ)
                          <br />δ = Transition function: Q × Γ → Q × Γ × {`{L, R}`}
                          <br />
                          q₀ = Start state
                          <br />
                          qₐ = Accept state
                          <br />
                          qᵣ = Reject state
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Key Components</h3>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="tape">
                          <AccordionTrigger>Infinite Tape</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p className="text-sm">
                                The tape extends infinitely in both directions, divided into cells.
                              </p>
                              <div className="bg-card border rounded-lg p-4">
                                <div className="text-center space-y-2">
                                  <p className="text-xs text-muted-foreground">Tape Example</p>
                                  <div className="flex justify-center gap-1">
                                    <div className="w-8 h-8 border border-muted-foreground flex items-center justify-center text-xs">
                                      ⊔
                                    </div>
                                    <div className="w-8 h-8 border border-muted-foreground flex items-center justify-center text-xs">
                                      a
                                    </div>
                                    <div className="w-8 h-8 border-2 border-primary flex items-center justify-center text-xs bg-primary/10">
                                      b
                                    </div>
                                    <div className="w-8 h-8 border border-muted-foreground flex items-center justify-center text-xs">
                                      b
                                    </div>
                                    <div className="w-8 h-8 border border-muted-foreground flex items-center justify-center text-xs">
                                      ⊔
                                    </div>
                                  </div>
                                  <p className="text-xs">↑ Head position</p>
                                </div>
                              </div>
                              <ul className="text-sm space-y-1">
                                <li>• ⊔ represents blank symbol</li>
                                <li>• Head can read and write current cell</li>
                                <li>• Head can move Left (L) or Right (R)</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="transition">
                          <AccordionTrigger>Transition Function</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <p className="text-sm">δ(q, a) = (p, b, D) means:</p>
                              <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
                                <p className="font-mono text-sm">
                                  In state q, reading symbol a:
                                  <br />• Change to state p
                                  <br />• Write symbol b on tape
                                  <br />• Move head in direction D (L or R)
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Unlike finite automata, TM can modify its input and move bidirectionally.
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="computation">
                          <AccordionTrigger>Computation Process</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <ol className="list-decimal list-inside text-sm space-y-1">
                                <li>Input string placed on tape, head at leftmost symbol</li>
                                <li>TM starts in state q₀</li>
                                <li>Apply transition function repeatedly</li>
                                <li>Halt when reaching qₐ (accept) or qᵣ (reject)</li>
                                <li>If no transition defined, implicitly reject</li>
                              </ol>
                              <div className="bg-muted p-3 rounded-lg">
                                <p className="text-sm">
                                  <strong>Three possible outcomes:</strong>
                                  <br />• Accept (reach qₐ)
                                  <br />• Reject (reach qᵣ or no transition)
                                  <br />• Loop forever (never halt)
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Tip:</strong> Always show the tape configuration at each step when tracing TM
                          execution. Use format: state + tape content + head position.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 2: Turing Machine Examples */}
              <TabsContent value="topic-2" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Turing Machine Examples</CardTitle>
                    <CardDescription>Understanding TM through concrete examples</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Strategy:</strong> Design TMs by thinking about what information needs to be
                        "remembered" and how to use the tape as memory.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Example 1: Language {`{aⁿbⁿcⁿ | n ≥ 1}`}</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          This language cannot be recognized by PDA, but TM can handle it easily.
                        </p>

                        <div className="bg-card border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-3">Algorithm:</h4>
                          <ol className="list-decimal list-inside text-sm space-y-1">
                            <li>Mark first 'a' with 'X', move right</li>
                            <li>Find first 'b', mark with 'Y', move right</li>
                            <li>Find first 'c', mark with 'Z', move left back to start</li>
                            <li>Repeat until all symbols marked</li>
                            <li>Accept if pattern is XⁿYⁿZⁿ</li>
                          </ol>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Trace for "aabbcc":</strong>
                            <br />
                            Step 1: aabbcc → Xabbcc
                            <br />
                            Step 2: Xabbcc → XaYbcc
                            <br />
                            Step 3: XaYbcc → XaYbcZ
                            <br />
                            Step 4: XaYbcZ → XXYbcZ
                            <br />
                            Step 5: XXYbcZ → XXYYCZ
                            <br />
                            Step 6: XXYYCZ → XXYYZZ ✓ Accept
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Example 2: Palindrome Recognition</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Recognize strings that read the same forwards and backwards.</p>

                        <div className="bg-card border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-3">Algorithm:</h4>
                          <ol className="list-decimal list-inside text-sm space-y-1">
                            <li>Mark leftmost symbol, remember it</li>
                            <li>Move to rightmost unmarked symbol</li>
                            <li>Check if it matches remembered symbol</li>
                            <li>If yes, mark it and repeat from step 1</li>
                            <li>Accept when all symbols processed</li>
                          </ol>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Instantaneous Description (ID)</h3>
                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>Format: αqβ</strong>
                          <br />α = tape content to left of head
                          <br />q = current state
                          <br />β = tape content from head position rightward
                          <br />
                          <br />
                          <strong>Example:</strong> abq₁cd means state q₁, head on 'c'
                        </p>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Strategy:</strong> For TM design problems, first describe the algorithm in plain
                          English, then implement the transitions.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 3: Church's Thesis */}
              <TabsContent value="topic-3" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Church's Thesis</CardTitle>
                    <CardDescription>The fundamental principle of computability</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Church's Thesis:</strong> Any problem that can be solved by an algorithm can be solved
                        by a Turing Machine.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">What This Means</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          Church's Thesis equates "algorithmically solvable" with "Turing Machine computable."
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Implications</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                              <p>• TMs are as powerful as any computer</p>
                              <p>• Modern computers can't solve problems TMs can't</p>
                              <p>• TMs define the limits of computation</p>
                              <p>• Basis for complexity theory</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Evidence</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                              <p>• All programming languages are TM-equivalent</p>
                              <p>• Lambda calculus ≡ TM</p>
                              <p>• Recursive functions ≡ TM</p>
                              <p>• No counterexamples found</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Universal Turing Machine</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          A TM that can simulate any other TM - the theoretical foundation of programmable computers.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Universal TM U:</strong>
                            <br />
                            Input: ⟨M⟩w (encoding of TM M + input w)
                            <br />
                            Output: Same as M(w)
                            <br />
                            <br />U simulates M running on w
                          </p>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Significance:</strong> Shows that a single "universal" machine can perform any
                            computation - this is the principle behind general-purpose computers!
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Computational Equivalence</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Many different models of computation are equivalent to TMs:</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                          <div className="bg-muted p-2 rounded text-xs">Multi-tape TM</div>
                          <div className="bg-muted p-2 rounded text-xs">Non-deterministic TM</div>
                          <div className="bg-muted p-2 rounded text-xs">RAM Model</div>
                          <div className="bg-muted p-2 rounded text-xs">Lambda Calculus</div>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Note:</strong> Church's Thesis is not a theorem - it's a hypothesis about the
                          nature of computation that has never been disproven.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 4: Decidability vs Undecidability */}
              <TabsContent value="topic-4" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Decidability vs Undecidability</CardTitle>
                    <CardDescription>Problems that can and cannot be solved algorithmically</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Fundamental Insight:</strong> Not all problems can be solved by algorithms. Some
                        problems are inherently undecidable.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Definitions</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg text-green-600">Decidable</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>
                              <strong>Definition:</strong> A language L is decidable if there exists a TM M that:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li>Always halts</li>
                              <li>Accepts if w ∈ L</li>
                              <li>Rejects if w ∉ L</li>
                            </ul>
                            <p className="text-green-600 font-semibold">Always gives yes/no answer</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg text-red-600">Undecidable</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>
                              <strong>Definition:</strong> A language L is undecidable if no TM can decide it.
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li>No algorithm always halts with correct answer</li>
                              <li>May loop forever on some inputs</li>
                              <li>Fundamental limitation of computation</li>
                            </ul>
                            <p className="text-red-600 font-semibold">No algorithm can solve it</p>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">Recognizable vs Decidable</h3>
                      <div className="space-y-3">
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Recognizable (Semi-decidable):</strong>
                            <br />• TM accepts if w ∈ L
                            <br />• TM may reject or loop if w ∉ L
                            <br />• One-sided answer
                            <br />
                            <br />
                            <strong>Decidable:</strong>
                            <br />• TM accepts if w ∈ L
                            <br />• TM rejects if w ∉ L
                            <br />• Always halts with definitive answer
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Examples of Decidable Problems</h3>
                      <div className="space-y-2">
                        <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                          <ul className="text-sm space-y-1">
                            <li>• Does DFA M accept string w?</li>
                            <li>• Is CFG G ambiguous?</li>
                            <li>• Are two DFAs equivalent?</li>
                            <li>• Is regular language L empty?</li>
                          </ul>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Examples of Undecidable Problems</h3>
                      <div className="space-y-2">
                        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                          <ul className="text-sm space-y-1">
                            <li>• Halting Problem (most famous)</li>
                            <li>• Does TM M accept string w?</li>
                            <li>• Is context-free language L empty?</li>
                            <li>• Are two CFGs equivalent?</li>
                          </ul>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Key Insight:</strong> As we move up the Chomsky hierarchy (Regular → CF → CS → RE),
                          more languages become expressible but fewer problems remain decidable.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 5: The Halting Problem */}
              <TabsContent value="topic-5" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      The Halting Problem
                    </CardTitle>
                    <CardDescription>The most famous undecidable problem</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        <strong>The Problem:</strong> Given a TM M and input w, does M halt on w? This fundamental
                        question cannot be solved algorithmically.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Problem Statement</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>HALT = {`{⟨M,w⟩ | M is a TM and M halts on input w}`}</strong>
                          <br />
                          <br />
                          Question: Can we build a TM H that decides HALT?
                          <br />
                          H(⟨M,w⟩) = Accept if M halts on w
                          <br />
                          H(⟨M,w⟩) = Reject if M loops on w
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Proof by Contradiction</h3>
                      <div className="space-y-3">
                        <p className="text-sm">We'll prove HALT is undecidable using a diagonal argument:</p>

                        <div className="space-y-3">
                          <div className="border-l-4 border-primary pl-4">
                            <h4 className="font-semibold text-sm">Step 1: Assume H exists</h4>
                            <p className="text-xs text-muted-foreground">
                              Suppose there exists a TM H that decides the halting problem.
                            </p>
                          </div>

                          <div className="border-l-4 border-primary pl-4">
                            <h4 className="font-semibold text-sm">Step 2: Construct D</h4>
                            <p className="text-xs text-muted-foreground">
                              Build a new TM D that uses H as a subroutine:
                            </p>
                            <div className="bg-muted p-2 rounded font-mono text-xs mt-1">
                              D(⟨M⟩): if H(⟨M,⟨M⟩⟩) = Accept then loop forever
                              <br /> else halt
                            </div>
                          </div>

                          <div className="border-l-4 border-primary pl-4">
                            <h4 className="font-semibold text-sm">Step 3: The Paradox</h4>
                            <p className="text-xs text-muted-foreground">What happens when we run D(⟨D⟩)?</p>
                          </div>
                        </div>

                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Case 1:</strong> If D halts on ⟨D⟩, then H(⟨D,⟨D⟩⟩) = Accept
                            <br />
                            But then D loops forever by construction! ⚡ Contradiction
                            <br />
                            <br />
                            <strong>Case 2:</strong> If D loops on ⟨D⟩, then H(⟨D,⟨D⟩⟩) = Reject
                            <br />
                            But then D halts by construction! ⚡ Contradiction
                          </p>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Conclusion:</strong> Since both cases lead to contradictions, our assumption that H
                            exists must be false. Therefore, the halting problem is undecidable.
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Why This Matters</h3>
                      <div className="space-y-3">
                        <p className="text-sm">The halting problem has profound implications:</p>

                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>
                            <strong>Software verification:</strong> Can't always prove programs are correct
                          </li>
                          <li>
                            <strong>Debugging:</strong> Can't build perfect debuggers that detect infinite loops
                          </li>
                          <li>
                            <strong>Optimization:</strong> Some compiler optimizations are impossible
                          </li>
                          <li>
                            <strong>AI limitations:</strong> Fundamental bounds on what AI can solve
                          </li>
                        </ul>
                      </div>

                      <h3 className="text-xl font-semibold">Complexity Classes: P and NP</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Class P</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>Problems solvable in polynomial time by deterministic TM</p>
                            <p>
                              <strong>Examples:</strong>
                            </p>
                            <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                              <li>Sorting</li>
                              <li>Graph connectivity</li>
                              <li>Linear programming</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Class NP</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>Problems where solutions can be verified in polynomial time</p>
                            <p>
                              <strong>Examples:</strong>
                            </p>
                            <ul className="list-disc list-inside text-xs space-y-1 ml-2">
                              <li>SAT (satisfiability)</li>
                              <li>Traveling salesman</li>
                              <li>Graph coloring</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-sm">
                          <strong>P vs NP Question:</strong> Is P = NP? This is one of the most important unsolved
                          problems in computer science, worth $1 million if solved!
                        </p>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Focus:</strong> Understand the halting problem proof structure. Practice
                          identifying decidable vs undecidable problems.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/unit-2">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Unit 2
                </Button>
              </Link>
              <Link href="/unit-4">
                <Button>
                  Next: Unit 4
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
