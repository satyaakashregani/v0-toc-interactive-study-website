"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Target,
  Code,
  Layers,
  ArrowDown,
  ArrowUp,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const topics = [
  { id: 1, title: "Compiler Structure & Phases", completed: false },
  { id: 2, title: "Lexical Analysis", completed: false },
  { id: 3, title: "Syntax Analysis Overview", completed: false },
  { id: 4, title: "Top-Down Parsing", completed: false },
  { id: 5, title: "Bottom-Up Parsing", completed: false },
  { id: 6, title: "LR Parsers (SLR, CLR, LALR)", completed: false },
  { id: 7, title: "Syntax Directed Translation", completed: false },
]

export default function Unit4Page() {
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
                <h1 className="text-2xl font-bold">Unit 4: Compilers & Syntax Analysis</h1>
                <p className="text-muted-foreground">From source code to executable programs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">1.5 hours</Badge>
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
              {/* Topic 1: Compiler Structure */}
              <TabsContent value="topic-1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Compiler Structure & Phases
                    </CardTitle>
                    <CardDescription>Understanding how compilers transform source code to machine code</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Key Insight:</strong> A compiler is a complex program that translates high-level source
                        code into low-level machine code through multiple phases.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Compiler Overview</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>Input:</strong> Source Code (e.g., C++, Java)
                          <br />
                          <strong>Output:</strong> Target Code (e.g., Assembly, Machine Code)
                          <br />
                          <strong>Process:</strong> Analysis + Synthesis
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Compilation Phases</h3>
                      <div className="space-y-4">
                        <div className="bg-card border rounded-lg p-6">
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
                                <p className="font-semibold">Source Code</p>
                                <p className="text-xs font-mono">int x = a + b * 2;</p>
                              </div>
                            </div>

                            <div className="flex justify-center">
                              <ArrowDown className="w-5 h-5 text-muted-foreground" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-4">
                                <h4 className="font-semibold text-center">Analysis Phase</h4>

                                <div className="space-y-3">
                                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                                    <p className="font-semibold text-sm">1. Lexical Analysis</p>
                                    <p className="text-xs">Break into tokens</p>
                                    <p className="text-xs font-mono">int, x, =, a, +, b, *, 2, ;</p>
                                  </div>

                                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                    <p className="font-semibold text-sm">2. Syntax Analysis</p>
                                    <p className="text-xs">Build parse tree</p>
                                    <p className="text-xs">Check grammar rules</p>
                                  </div>

                                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                                    <p className="font-semibold text-sm">3. Semantic Analysis</p>
                                    <p className="text-xs">Type checking</p>
                                    <p className="text-xs">Scope resolution</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h4 className="font-semibold text-center">Synthesis Phase</h4>

                                <div className="space-y-3">
                                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                                    <p className="font-semibold text-sm">4. Intermediate Code</p>
                                    <p className="text-xs">Three-address code</p>
                                    <p className="text-xs font-mono">t1 = b * 2; t2 = a + t1; x = t2;</p>
                                  </div>

                                  <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                                    <p className="font-semibold text-sm">5. Code Optimization</p>
                                    <p className="text-xs">Improve efficiency</p>
                                    <p className="text-xs">Remove redundancy</p>
                                  </div>

                                  <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                                    <p className="font-semibold text-sm">6. Code Generation</p>
                                    <p className="text-xs">Target machine code</p>
                                    <p className="text-xs font-mono">MOV, ADD, MUL instructions</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center">
                              <ArrowDown className="w-5 h-5 text-muted-foreground" />
                            </div>

                            <div className="text-center">
                              <div className="bg-muted p-3 rounded-lg">
                                <p className="font-semibold">Machine Code</p>
                                <p className="text-xs font-mono">10110000 01000001 ...</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Symbol Table</h3>
                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                        <p className="text-sm">
                          <strong>Purpose:</strong> Central data structure that stores information about identifiers
                          <br />
                          <strong>Contains:</strong> Variable names, types, scope, memory locations
                          <br />
                          <strong>Used by:</strong> All phases of compilation
                        </p>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Tip:</strong> Remember the order of phases and what each phase produces. Draw the
                          compilation pipeline for complex problems.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 2: Lexical Analysis */}
              <TabsContent value="topic-2" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lexical Analysis</CardTitle>
                    <CardDescription>Breaking source code into tokens</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Role:</strong> The lexical analyzer (lexer) reads the source code character by character
                        and groups them into meaningful tokens.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">What are Tokens?</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          Tokens are the basic building blocks of a program - the "words" of the programming language.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Token Types</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                              <div className="space-y-1">
                                <p>
                                  <strong>Keywords:</strong> if, while, int, return
                                </p>
                                <p>
                                  <strong>Identifiers:</strong> variable names, function names
                                </p>
                                <p>
                                  <strong>Literals:</strong> 123, "hello", 3.14
                                </p>
                                <p>
                                  <strong>Operators:</strong> +, -, *, /, =, ==
                                </p>
                                <p>
                                  <strong>Delimiters:</strong> (, ), {`{, }, ;`}
                                </p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Example</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <div className="bg-muted p-3 rounded font-mono text-xs">
                                <p>
                                  <strong>Input:</strong> int sum = a + b;
                                </p>
                                <br />
                                <p>
                                  <strong>Tokens:</strong>
                                </p>
                                <p>int (keyword)</p>
                                <p>sum (identifier)</p>
                                <p>= (operator)</p>
                                <p>a (identifier)</p>
                                <p>+ (operator)</p>
                                <p>b (identifier)</p>
                                <p>; (delimiter)</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Token Specification</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Tokens are specified using regular expressions:</p>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm space-y-1">
                            <strong>Identifier:</strong> [a-zA-Z][a-zA-Z0-9]*
                            <br />
                            <strong>Integer:</strong> [0-9]+
                            <br />
                            <strong>Float:</strong> [0-9]+\.[0-9]+
                            <br />
                            <strong>Whitespace:</strong> [ \t\n]+
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Lexical Analyzer Implementation</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Lexical analyzers are typically implemented using finite automata:</p>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="dfa-approach">
                            <AccordionTrigger>DFA-based Approach</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3">
                                <ol className="list-decimal list-inside text-sm space-y-1">
                                  <li>Create DFA for each token type</li>
                                  <li>Combine DFAs into single automaton</li>
                                  <li>Use longest match principle</li>
                                  <li>Handle conflicts with priority rules</li>
                                </ol>
                                <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
                                  <p className="text-sm">
                                    <strong>Longest Match:</strong> Always choose the longest possible token
                                    <br />
                                    Example: "while" is keyword, not identifier "w" + "hile"
                                  </p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="error-handling">
                            <AccordionTrigger>Error Handling</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3">
                                <p className="text-sm">Common lexical errors and recovery strategies:</p>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                  <li>
                                    <strong>Invalid characters:</strong> Skip and report error
                                  </li>
                                  <li>
                                    <strong>Unterminated strings:</strong> Insert closing quote
                                  </li>
                                  <li>
                                    <strong>Invalid numbers:</strong> Treat as separate tokens
                                  </li>
                                </ul>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Focus:</strong> Practice converting regular expressions to DFAs and handling
                          ambiguous token recognition.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 3: Syntax Analysis Overview */}
              <TabsContent value="topic-3" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      Syntax Analysis Overview
                    </CardTitle>
                    <CardDescription>Parsing tokens into parse trees</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Goal:</strong> Determine if the sequence of tokens forms a valid program according to
                        the language grammar.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Parser Types</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <ArrowDown className="w-4 h-4" />
                              Top-Down Parsing
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>
                              <strong>Strategy:</strong> Start with start symbol, derive the input string
                            </p>
                            <p>
                              <strong>Parse Tree:</strong> Built from root to leaves
                            </p>
                            <p>
                              <strong>Derivation:</strong> Leftmost derivation
                            </p>
                            <p>
                              <strong>Examples:</strong> Recursive Descent, LL parsers
                            </p>
                            <div className="bg-green-50 border border-green-200 p-2 rounded text-xs">
                              <strong>Pros:</strong> Intuitive, easy to implement
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <ArrowUp className="w-4 h-4" />
                              Bottom-Up Parsing
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>
                              <strong>Strategy:</strong> Start with input, reduce to start symbol
                            </p>
                            <p>
                              <strong>Parse Tree:</strong> Built from leaves to root
                            </p>
                            <p>
                              <strong>Derivation:</strong> Rightmost derivation in reverse
                            </p>
                            <p>
                              <strong>Examples:</strong> LR, SLR, LALR parsers
                            </p>
                            <div className="bg-blue-50 border border-blue-200 p-2 rounded text-xs">
                              <strong>Pros:</strong> More powerful, handles more grammars
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">Grammar Requirements</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Different parsing techniques require different grammar properties:</p>

                        <div className="space-y-3">
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="font-mono text-sm">
                              <strong>LL(k) Grammars:</strong> Left-to-right scan, Leftmost derivation, k lookahead
                              <br />
                              <strong>LR(k) Grammars:</strong> Left-to-right scan, Rightmost derivation, k lookahead
                              <br />
                              <br />
                              <strong>Power Hierarchy:</strong> LL(k) ⊂ LR(k) ⊂ Context-Free
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Parse Tree vs Syntax Tree</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Parse Tree</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Shows derivation steps</li>
                              <li>Includes all grammar symbols</li>
                              <li>Used by parser</li>
                              <li>More detailed</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Abstract Syntax Tree</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Shows program structure</li>
                              <li>Omits unnecessary details</li>
                              <li>Used by later phases</li>
                              <li>More compact</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">Error Recovery</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Strategies for handling syntax errors:</p>

                        <div className="space-y-2">
                          <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-semibold text-sm">Panic Mode</h4>
                            <p className="text-xs text-muted-foreground">Skip tokens until synchronizing token found</p>
                          </div>
                          <div className="border-l-4 border-yellow-500 pl-4">
                            <h4 className="font-semibold text-sm">Phrase Level</h4>
                            <p className="text-xs text-muted-foreground">Insert/delete tokens to continue parsing</p>
                          </div>
                          <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-sm">Error Productions</h4>
                            <p className="text-xs text-muted-foreground">Add grammar rules for common errors</p>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Key Concept:</strong> The choice between top-down and bottom-up parsing depends on the
                          grammar and the desired parser characteristics.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 4: Top-Down Parsing */}
              <TabsContent value="topic-4" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top-Down Parsing</CardTitle>
                    <CardDescription>Building parse trees from root to leaves</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Approach:</strong> Start with the start symbol and try to derive the input string using
                        leftmost derivations.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Recursive Descent Parsing</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          A simple top-down parsing technique where each non-terminal has a corresponding procedure.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Grammar Example:</strong>
                            <br />E → T E'
                            <br />
                            E' → + T E' | ε
                            <br />T → F T'
                            <br />
                            T' → * F T' | ε
                            <br />F → ( E ) | id
                          </p>
                        </div>

                        <div className="bg-card border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Procedure for E:</h4>
                          <div className="bg-muted p-3 rounded font-mono text-xs">
                            procedure E() {`{`}
                            <br /> T();
                            <br /> E_prime();
                            <br />
                            {`}`}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">LL(1) Parsing</h3>
                      <div className="space-y-3">
                        <p className="text-sm">A more systematic approach using parsing tables.</p>

                        <div className="space-y-3">
                          <div className="border-l-4 border-primary pl-4">
                            <h4 className="font-semibold text-sm">Requirements for LL(1)</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li>• No left recursion</li>
                              <li>• No ambiguity</li>
                              <li>• FIRST and FOLLOW sets must be disjoint</li>
                            </ul>
                          </div>
                        </div>

                        <h4 className="font-semibold">FIRST and FOLLOW Sets</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">FIRST(α)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p>Set of terminals that can begin strings derived from α</p>
                              <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                                FIRST(E) = {`{(, id}`}
                                <br />
                                FIRST(T) = {`{(, id}`}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">FOLLOW(A)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p>Set of terminals that can appear immediately after A</p>
                              <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                                FOLLOW(E) = {`{), $}`}
                                <br />
                                FOLLOW(T) = {`{+, ), $}`}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Left Recursion Elimination</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Top-down parsers cannot handle left-recursive grammars directly.</p>

                        <div className="bg-card border rounded-lg p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-sm">Before (Left Recursive)</h4>
                              <div className="bg-red-50 border border-red-200 p-2 rounded font-mono text-xs">
                                A → A α | β
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">After (Right Recursive)</h4>
                              <div className="bg-green-50 border border-green-200 p-2 rounded font-mono text-xs">
                                A → β A'
                                <br />
                                A' → α A' | ε
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Strategy:</strong> Practice computing FIRST and FOLLOW sets. They're essential
                          for constructing LL(1) parsing tables.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 5: Bottom-Up Parsing */}
              <TabsContent value="topic-5" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bottom-Up Parsing</CardTitle>
                    <CardDescription>Building parse trees from leaves to root</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Approach:</strong> Start with input tokens and reduce them to the start symbol using
                        rightmost derivations in reverse.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Shift-Reduce Parsing</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          The fundamental bottom-up parsing technique using a stack and two operations:
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Shift</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p>Move next input token onto the stack</p>
                              <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                                Stack: [a, b]
                                <br />
                                Input: [c, d, e]
                                <br />
                                After shift: [a, b, c]
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Reduce</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p>Replace handle on stack with left side of production</p>
                              <div className="bg-muted p-2 rounded font-mono text-xs mt-2">
                                Stack: [E, +, E]
                                <br />
                                Rule: E → E + E
                                <br />
                                After reduce: [E]
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Handle Identification</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          A <strong>handle</strong> is a substring that matches the right side of a production and whose
                          reduction represents one step in the reverse of a rightmost derivation.
                        </p>

                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Key Property:</strong> In any right-sentential form, the handle is the rightmost
                            substring that can be reduced.
                          </p>
                        </div>

                        <div className="bg-card border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Example Reduction Sequence:</h4>
                          <div className="bg-muted p-3 rounded font-mono text-xs space-y-1">
                            <p>id + id * id</p>
                            <p>E + id * id (reduce id → E)</p>
                            <p>E + E * id (reduce id → E)</p>
                            <p>E + E * E (reduce id → E)</p>
                            <p>E + E (reduce E * E → E)</p>
                            <p>E (reduce E + E → E)</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Conflicts in Shift-Reduce Parsing</h3>
                      <div className="space-y-3">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base text-red-600">Shift-Reduce Conflict</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p>Parser cannot decide whether to shift or reduce</p>
                              <div className="bg-red-50 border border-red-200 p-2 rounded text-xs mt-2">
                                <strong>Example:</strong> Dangling else problem
                                <br />
                                if E then if E then S else S
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base text-orange-600">Reduce-Reduce Conflict</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                              <p>Parser cannot decide which production to use for reduction</p>
                              <div className="bg-orange-50 border border-orange-200 p-2 rounded text-xs mt-2">
                                <strong>Cause:</strong> Ambiguous grammar or insufficient lookahead
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Operator Precedence Parsing</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          A simple bottom-up technique for expression grammars using operator precedence and
                          associativity.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Precedence Relations:</strong>
                            <br />a ⋖ b (a has lower precedence than b)
                            <br />a ⋗ b (a has higher precedence than b)
                            <br />a ≐ b (a has same precedence as b)
                          </p>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Key Insight:</strong> Bottom-up parsing is more powerful than top-down but requires
                          more sophisticated algorithms to resolve conflicts.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 6: LR Parsers */}
              <TabsContent value="topic-6" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>LR Parsers (SLR, CLR, LALR)</CardTitle>
                    <CardDescription>The most powerful deterministic parsing techniques</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>LR = Left-to-right scan, Rightmost derivation in reverse.</strong> These are the most
                        general deterministic parsing methods.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">LR Parser Components</h3>
                      <div className="space-y-3">
                        <div className="bg-card border rounded-lg p-4">
                          <div className="grid md:grid-cols-3 gap-4 text-center">
                            <div className="space-y-2">
                              <div className="bg-primary/10 border border-primary/20 p-3 rounded">
                                <p className="font-semibold text-sm">Stack</p>
                                <p className="text-xs">Stores states and symbols</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-secondary/10 border border-secondary/20 p-3 rounded">
                                <p className="font-semibold text-sm">Parsing Table</p>
                                <p className="text-xs">ACTION and GOTO functions</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="bg-accent/10 border border-accent/20 p-3 rounded">
                                <p className="font-semibold text-sm">Input Buffer</p>
                                <p className="text-xs">Remaining input tokens</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">LR Parser Actions</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">ACTION Table</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <ul className="list-disc list-inside space-y-1">
                              <li>
                                <strong>Shift s:</strong> Push state s onto stack
                              </li>
                              <li>
                                <strong>Reduce r:</strong> Apply production rule r
                              </li>
                              <li>
                                <strong>Accept:</strong> Parsing successful
                              </li>
                              <li>
                                <strong>Error:</strong> Syntax error detected
                              </li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">GOTO Table</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>Determines next state after reduction</p>
                            <div className="bg-muted p-2 rounded font-mono text-xs">
                              GOTO[state, non-terminal] = next_state
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">LR Parser Variants</h3>
                      <div className="space-y-4">
                        <div className="grid gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">SLR (Simple LR)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                              <p>
                                <strong>Method:</strong> Uses FOLLOW sets to resolve conflicts
                              </p>
                              <p>
                                <strong>Power:</strong> Least powerful but simplest
                              </p>
                              <p>
                                <strong>Limitation:</strong> May have conflicts that CLR can resolve
                              </p>
                              <div className="bg-muted p-2 rounded font-mono text-xs">
                                Reduce A → α only if lookahead ∈ FOLLOW(A)
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">CLR (Canonical LR)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                              <p>
                                <strong>Method:</strong> Uses LR(1) items with lookahead
                              </p>
                              <p>
                                <strong>Power:</strong> Most powerful, handles all LR(1) grammars
                              </p>
                              <p>
                                <strong>Limitation:</strong> Large parsing tables
                              </p>
                              <div className="bg-muted p-2 rounded font-mono text-xs">
                                Item: [A → α•β, a] where a is lookahead
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">LALR (Look-Ahead LR)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                              <p>
                                <strong>Method:</strong> Merges CLR states with same core
                              </p>
                              <p>
                                <strong>Power:</strong> Between SLR and CLR
                              </p>
                              <p>
                                <strong>Advantage:</strong> Smaller tables than CLR, more powerful than SLR
                              </p>
                              <div className="bg-primary/10 border border-primary/20 p-2 rounded text-xs">
                                <strong>Most commonly used in practice!</strong>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm text-center">
                            <strong>Power Hierarchy:</strong> SLR ⊂ LALR ⊂ CLR ⊂ LR(1)
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">LR(1) Items</h3>
                      <div className="space-y-3">
                        <p className="text-sm">An LR(1) item is a production with a dot and a lookahead symbol:</p>

                        <div className="bg-card border rounded-lg p-4">
                          <div className="space-y-2">
                            <p className="font-mono text-sm">[A → α•β, a]</p>
                            <ul className="text-xs space-y-1">
                              <li>• A → αβ is a production</li>
                              <li>• Dot indicates current position</li>
                              <li>• a is the lookahead symbol</li>
                              <li>• Reduce when dot is at end and next input is a</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Focus:</strong> Understand the differences between SLR, CLR, and LALR. Practice
                          constructing parsing tables for simple grammars.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 7: Syntax Directed Translation */}
              <TabsContent value="topic-7" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Syntax Directed Translation</CardTitle>
                    <CardDescription>Attaching semantic actions to grammar productions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Purpose:</strong> Perform semantic analysis and code generation during parsing by
                        associating actions with grammar rules.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Syntax Directed Definitions (SDD)</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          A context-free grammar with attributes and semantic rules attached to productions.
                        </p>

                        <div className="bg-card border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Example: Simple Calculator</h4>
                          <div className="bg-muted p-3 rounded font-mono text-xs space-y-1">
                            <p>E → E₁ + T {`{ E.val = E₁.val + T.val }`}</p>
                            <p>E → T {`{ E.val = T.val }`}</p>
                            <p>T → T₁ * F {`{ T.val = T₁.val * F.val }`}</p>
                            <p>T → F {`{ T.val = F.val }`}</p>
                            <p>F → (E) {`{ F.val = E.val }`}</p>
                            <p>F → digit {`{ F.val = digit.lexval }`}</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Attribute Types</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Synthesized Attributes</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>Computed from attributes of children</p>
                            <p>
                              <strong>Direction:</strong> Bottom-up (leaves to root)
                            </p>
                            <div className="bg-green-50 border border-green-200 p-2 rounded text-xs">
                              <strong>Example:</strong> Expression value computed from operand values
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Inherited Attributes</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>Computed from attributes of parent/siblings</p>
                            <p>
                              <strong>Direction:</strong> Top-down (root to leaves)
                            </p>
                            <div className="bg-blue-50 border border-blue-200 p-2 rounded text-xs">
                              <strong>Example:</strong> Variable type inherited from declaration
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">Translation Schemes</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          SDDs with embedded semantic actions that specify when actions are performed.
                        </p>

                        <div className="bg-card border rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Example: Code Generation</h4>
                          <div className="bg-muted p-3 rounded font-mono text-xs space-y-1">
                            <p>E → E₁ + T {`{ print('+') }`}</p>
                            <p>E → T</p>
                            <p>T → T₁ * F {`{ print('*') }`}</p>
                            <p>T → F</p>
                            <p>F → (E)</p>
                            <p>F → id {`{ print(id.name) }`}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Generates postfix notation: a + b * c → a b c * +
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Applications</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Type Checking</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Propagate type information</li>
                              <li>Check type compatibility</li>
                              <li>Insert type conversions</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Code Generation</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Generate intermediate code</li>
                              <li>Emit assembly instructions</li>
                              <li>Optimize on-the-fly</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Tip:</strong> Practice writing semantic rules for simple grammars. Focus on
                          understanding synthesized vs inherited attributes.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/unit-3">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Unit 3
                </Button>
              </Link>
              <Link href="/unit-5">
                <Button>
                  Next: Unit 5
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
