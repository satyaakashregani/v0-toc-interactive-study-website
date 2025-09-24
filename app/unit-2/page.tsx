"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Lightbulb, Target, BookOpen, Layers } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const topics = [
  { id: 1, title: "Context-Free Grammar (CFG)", completed: false },
  { id: 2, title: "Derivations and Parse Trees", completed: false },
  { id: 3, title: "Ambiguous Grammars", completed: false },
  { id: 4, title: "Grammar Simplification", completed: false },
  { id: 5, title: "Normal Forms (CNF & GNF)", completed: false },
  { id: 6, title: "Push Down Automata (PDA)", completed: false },
]

export default function Unit2Page() {
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
                <h1 className="text-2xl font-bold">Unit 2: Context-Free Grammar & Push Down Automata</h1>
                <p className="text-muted-foreground">Understanding nested structures and stack-based computation</p>
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
              {/* Topic 1: Context-Free Grammar */}
              <TabsContent value="topic-1" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Context-Free Grammar (CFG)
                    </CardTitle>
                    <CardDescription>More powerful than regular grammars - handles nested structures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Key Insight:</strong> CFGs can handle nested structures like balanced parentheses, which
                        regular expressions cannot.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">CFG Definition</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>CFG G = (V, T, P, S)</strong>
                          <br />V = Variables (Non-terminals)
                          <br />T = Terminals
                          <br />P = Production rules
                          <br />S = Start symbol
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Production Rule Format</h3>
                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>A → α</strong>
                          <br />
                          Where A ∈ V (single non-terminal)
                          <br />
                          And α ∈ (V ∪ T)* (string of terminals and non-terminals)
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Classic Examples</h3>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="balanced">
                          <AccordionTrigger>Balanced Parentheses</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="font-mono text-sm">
                                  <strong>Grammar:</strong>
                                  <br />S → (S) | SS | ε<br />
                                  <br />
                                  <strong>Generates:</strong>
                                  <br />
                                  ε, (), (()), ()(), (())(), ...
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                This grammar generates all strings of balanced parentheses - impossible with regular
                                expressions!
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="anbn">
                          <AccordionTrigger>aⁿbⁿ Language</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="font-mono text-sm">
                                  <strong>Grammar:</strong>
                                  <br />S → aSb | ε<br />
                                  <br />
                                  <strong>Generates:</strong>
                                  <br />
                                  ε, ab, aabb, aaabbb, aaaabbbb, ...
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Equal numbers of a's followed by equal numbers of b's - the classic non-regular
                                language.
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="arithmetic">
                          <AccordionTrigger>Arithmetic Expressions</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3">
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="font-mono text-sm">
                                  <strong>Grammar:</strong>
                                  <br />E → E + E | E * E | (E) | id
                                  <br />
                                  <br />
                                  <strong>Generates:</strong>
                                  <br />
                                  id, id + id, id * id, (id + id) * id, ...
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Note: This grammar is ambiguous - we'll fix this in Topic 3!
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Tip:</strong> Always verify your grammar by deriving a few example strings. Check
                          both valid and invalid strings.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 2: Derivations and Parse Trees */}
              <TabsContent value="topic-2" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      Derivations and Parse Trees
                    </CardTitle>
                    <CardDescription>How grammars generate strings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Key Concept:</strong> Derivations show the step-by-step process of generating a string
                        from the start symbol.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Types of Derivations</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Leftmost Derivation (LMD)</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>• Always replace the leftmost non-terminal</p>
                            <p>• Unique for unambiguous grammars</p>
                            <p>• Used in top-down parsing</p>
                            <div className="bg-muted p-2 rounded font-mono text-xs">
                              S ⇒ <span className="bg-primary/20">A</span>B ⇒ aB ⇒ ab
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Rightmost Derivation (RMD)</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm space-y-2">
                            <p>• Always replace the rightmost non-terminal</p>
                            <p>• Unique for unambiguous grammars</p>
                            <p>• Used in bottom-up parsing</p>
                            <div className="bg-muted p-2 rounded font-mono text-xs">
                              S ⇒ A<span className="bg-primary/20">B</span> ⇒ Ab ⇒ ab
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">Parse Trees</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Visual representation of how a string is derived from the grammar.</p>

                        <div className="bg-card border rounded-lg p-6">
                          <div className="text-center space-y-4">
                            <p className="text-sm text-muted-foreground">Parse Tree for "aabb" using S → aSb | ε</p>
                            <div className="flex justify-center">
                              <div className="text-center space-y-2">
                                <div className="text-lg font-bold">S</div>
                                <div className="flex justify-center gap-8">
                                  <div className="text-center">
                                    <div className="text-base">a</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-base font-bold">S</div>
                                    <div className="flex justify-center gap-4 mt-2">
                                      <div className="text-sm">a</div>
                                      <div className="text-sm font-bold">S</div>
                                      <div className="text-sm">b</div>
                                    </div>
                                    <div className="text-xs mt-1">ε</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-base">b</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                          <p className="text-sm">
                            <strong>Key Properties:</strong>
                            <br />• Root = Start symbol
                            <br />• Leaves = Terminal symbols (read left-to-right gives the string)
                            <br />• Internal nodes = Non-terminals
                            <br />• Each internal node's children = Right side of a production rule
                          </p>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Strategy:</strong> Draw parse trees carefully. They're worth significant marks
                          and help verify your derivations.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 3: Ambiguous Grammars */}
              <TabsContent value="topic-3" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ambiguous Grammars</CardTitle>
                    <CardDescription>When one string has multiple parse trees</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Definition:</strong> A grammar is ambiguous if there exists at least one string with
                        multiple leftmost derivations (or parse trees).
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Classic Example: Arithmetic Expressions</h3>

                      <div className="space-y-3">
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Ambiguous Grammar:</strong>
                            <br />E → E + E | E * E | (E) | id
                            <br />
                            <br />
                            <strong>String:</strong> id + id * id
                            <br />
                            <strong>Problem:</strong> Two different parse trees possible!
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Parse Tree 1: (id + id) * id</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs">
                              <div className="text-center space-y-1">
                                <div>E</div>
                                <div className="flex justify-center gap-2">
                                  <span>E</span>
                                  <span>*</span>
                                  <span>E</span>
                                </div>
                                <div className="text-muted-foreground">Addition first, then multiplication</div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">Parse Tree 2: id + (id * id)</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs">
                              <div className="text-center space-y-1">
                                <div>E</div>
                                <div className="flex justify-center gap-2">
                                  <span>E</span>
                                  <span>+</span>
                                  <span>E</span>
                                </div>
                                <div className="text-muted-foreground">Multiplication first, then addition</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Removing Ambiguity</h3>
                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>Unambiguous Grammar:</strong>
                          <br />E → E + T | T<br />T → T * F | F<br />F → (E) | id
                          <br />
                          <br />
                          <strong>Result:</strong> * has higher precedence than +<br />
                          <strong>String "id + id * id" now has unique parse: id + (id * id)</strong>
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Why Ambiguity Matters</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>
                          <strong>Compilers:</strong> Need unique interpretation of code
                        </li>
                        <li>
                          <strong>Parsing:</strong> Ambiguous grammars cause parsing conflicts
                        </li>
                        <li>
                          <strong>Semantics:</strong> Different parse trees = different meanings
                        </li>
                      </ul>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Exam Tip:</strong> To prove ambiguity, find ONE string with two different leftmost
                          derivations or parse trees.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 4: Grammar Simplification */}
              <TabsContent value="topic-4" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Grammar Simplification</CardTitle>
                    <CardDescription>Removing useless productions and symbols</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Goal:</strong> Create an equivalent grammar with no useless rules. Follow the order:
                        ε-productions → Unit productions → Useless symbols.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">Step 1: Eliminate ε-Productions</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          Remove rules of the form A → ε (except if S → ε and S doesn't appear on any right side).
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Example:</strong>
                            <br />S → AB | a<br />A → aA | ε<br />B → bB | b<br />
                            <br />
                            <strong>After removing A → ε:</strong>
                            <br />S → AB | B | a<br />A → aA | a<br />B → bB | b
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Step 2: Eliminate Unit Productions</h3>
                      <div className="space-y-3">
                        <p className="text-sm">Remove rules of the form A → B (single non-terminal).</p>

                        <div className="bg-muted p-4 rounded-lg">
                          <p className="font-mono text-sm">
                            <strong>Example:</strong>
                            <br />S → A | a<br />A → B | b<br />B → c<br />
                            <br />
                            <strong>After removing unit productions:</strong>
                            <br />S → b | c | a<br />A → b | c<br />B → c
                          </p>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">Step 3: Remove Useless Symbols</h3>
                      <div className="space-y-3">
                        <p className="text-sm">
                          Remove symbols that cannot derive terminal strings or are unreachable from start symbol.
                        </p>

                        <div className="border-l-4 border-primary pl-4 space-y-2">
                          <div>
                            <h4 className="font-semibold text-sm">3a: Remove Non-generating Symbols</h4>
                            <p className="text-xs text-muted-foreground">
                              Symbols that cannot produce terminal strings
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">3b: Remove Unreachable Symbols</h4>
                            <p className="text-xs text-muted-foreground">Symbols not reachable from start symbol</p>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Critical:</strong> Always follow the order! Doing steps out of order can lead to
                          incorrect results.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 5: Normal Forms */}
              <TabsContent value="topic-5" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Normal Forms</CardTitle>
                    <CardDescription>Standardized grammar formats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Chomsky Normal Form (CNF)</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-3">
                          <p>
                            <strong>Rules allowed:</strong>
                          </p>
                          <div className="bg-muted p-3 rounded font-mono text-xs">
                            A → BC (two non-terminals)
                            <br />A → a (single terminal)
                            <br />S → ε (only if needed)
                          </div>
                          <p>
                            <strong>Use:</strong> Parsing algorithms, complexity analysis
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Greibach Normal Form (GNF)</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-3">
                          <p>
                            <strong>Rules allowed:</strong>
                          </p>
                          <div className="bg-muted p-3 rounded font-mono text-xs">
                            A → aα
                            <br />
                            (terminal followed by
                            <br />
                            zero or more non-terminals)
                          </div>
                          <p>
                            <strong>Use:</strong> PDA construction, left recursion removal
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <h3 className="text-xl font-semibold">Converting to CNF</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Eliminate ε-productions, unit productions, useless symbols</li>
                      <li>Replace terminals in long rules with new non-terminals</li>
                      <li>Break long rules into binary rules</li>
                    </ol>

                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-mono text-sm">
                        <strong>Example Conversion:</strong>
                        <br />S → aSb | ab
                        <br />
                        <br />
                        <strong>Step 1:</strong> Replace terminals
                        <br />S → ASB | AB
                        <br />A → a, B → b<br />
                        <br />
                        <strong>Final CNF:</strong>
                        <br />S → AS₁ | AB
                        <br />
                        S₁ → SB
                        <br />A → a, B → b
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Topic 6: Push Down Automata */}
              <TabsContent value="topic-6" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Push Down Automata (PDA)</CardTitle>
                    <CardDescription>Finite automata with a stack</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Lightbulb className="w-4 h-4" />
                      <AlertDescription>
                        <strong>Key Insight:</strong> PDA = NFA + Stack. The stack provides the memory needed to
                        recognize context-free languages.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">PDA Definition</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F)</strong>
                          <br />Q = Finite set of states
                          <br />Σ = Input alphabet
                          <br />Γ = Stack alphabet
                          <br />δ = Transition function
                          <br />
                          q₀ = Start state
                          <br />
                          Z₀ = Initial stack symbol
                          <br />F = Final states
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Transition Function</h3>
                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                        <p className="font-mono text-sm">
                          <strong>δ(q, a, X) = {`{(p₁, γ₁), (p₂, γ₂), ...}`}</strong>
                          <br />
                          <br />
                          From state q, reading input a,
                          <br />
                          with X on top of stack,
                          <br />
                          go to state pᵢ and replace X with γᵢ
                        </p>
                      </div>

                      <h3 className="text-xl font-semibold">Acceptance Methods</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Final State</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p>String accepted if PDA ends in a final state (stack contents don't matter)</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Empty Stack</CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p>String accepted if PDA empties the stack (final states don't matter)</p>
                          </CardContent>
                        </Card>
                      </div>

                      <h3 className="text-xl font-semibold">Example: aⁿbⁿ Language</h3>
                      <div className="bg-card border rounded-lg p-4">
                        <div className="space-y-3">
                          <p className="text-sm font-semibold">PDA for L = {`{aⁿbⁿ | n ≥ 1}`}</p>
                          <div className="bg-muted p-3 rounded font-mono text-xs space-y-1">
                            <p>δ(q₀, a, Z₀) = {`{(q₀, AZ₀)}`} // Push A for each a</p>
                            <p>δ(q₀, a, A) = {`{(q₀, AA)}`} // Keep pushing A's</p>
                            <p>δ(q₀, b, A) = {`{(q₁, ε)}`} // Pop A for each b</p>
                            <p>δ(q₁, b, A) = {`{(q₁, ε)}`} // Keep popping A's</p>
                            <p>δ(q₁, ε, Z₀) = {`{(q₂, Z₀)}`} // Accept when stack has Z₀</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Strategy: Push one A for each a, then pop one A for each b. Accept if stack returns to
                            initial state.
                          </p>
                        </div>
                      </div>

                      <Alert>
                        <Target className="w-4 h-4" />
                        <AlertDescription>
                          <strong>Equivalence Theorem:</strong> PDAs and CFGs are equivalent in power - they both
                          recognize exactly the context-free languages.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Link href="/unit-1">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous: Unit 1
                </Button>
              </Link>
              <Link href="/unit-3">
                <Button>
                  Next: Unit 3
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
