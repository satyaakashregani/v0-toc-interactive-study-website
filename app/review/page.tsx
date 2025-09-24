"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Target, Clock, CheckCircle, AlertTriangle, Lightbulb, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

const quickReference = {
  "Unit 1": {
    title: "Finite Automata & Regular Expressions",
    keyFormulas: [
      "DFA: δ(q, a) → q'",
      "NFA: δ(q, a) → {q₁, q₂, ...}",
      "ε-NFA: δ(q, ε) → {q₁, q₂, ...}",
      "Regular Expression: (a|b)*abb",
    ],
    algorithms: ["Subset Construction (NFA → DFA)", "Thompson's Construction (RE → NFA)", "Minimization Algorithm"],
    examTricks: [
      "Always check if ε is accepted",
      "Draw state diagrams for complex problems",
      "Use pumping lemma for non-regular proofs",
    ],
  },
  "Unit 2": {
    title: "Context-Free Grammar & PDA",
    keyFormulas: ["CFG: G = (V, T, P, S)", "CNF: A → BC or A → a", "GNF: A → aα", "PDA: δ(q, a, Z) → {(q', γ)}"],
    algorithms: [
      "CYK Algorithm (CNF parsing)",
      "Elimination of ε-productions",
      "Left Recursion Removal",
      "Left Factoring",
    ],
    examTricks: [
      "Convert to CNF for parsing questions",
      "Check ambiguity with parse trees",
      "PDA stack operations are crucial",
    ],
  },
  "Unit 3": {
    title: "Turing Machines & Computability",
    keyFormulas: [
      "TM: M = (Q, Σ, Γ, δ, q₀, B, F)",
      "δ(q, X) → (q', Y, D)",
      "Church's Thesis: Effective ≡ Computable",
      "Halting Problem: Undecidable",
    ],
    algorithms: ["TM Construction for Languages", "Reduction Proofs", "Diagonalization Method"],
    examTricks: [
      "Trace TM execution step by step",
      "Use reduction for undecidability proofs",
      "Remember P ⊆ NP relationship",
    ],
  },
  "Unit 4": {
    title: "Compilers & Syntax Analysis",
    keyFormulas: [
      "FIRST(α) = {a | α ⇒* aβ}",
      "FOLLOW(A) = {a | S ⇒* αAaβ}",
      "LR(0): [A → α•β]",
      "SLR: FOLLOW sets for reduce actions",
    ],
    algorithms: [
      "Recursive Descent Parsing",
      "LR(0) Item Construction",
      "SLR Parser Construction",
      "LALR Parser Generation",
    ],
    examTricks: [
      "Build parsing tables systematically",
      "Check for shift-reduce conflicts",
      "LL(1) needs FIRST/FOLLOW sets",
    ],
  },
  "Unit 5": {
    title: "Intermediate Code & Optimization",
    keyFormulas: [
      "TAC: x = y op z",
      "Quadruple: (op, arg1, arg2, result)",
      "Triple: (op, arg1, arg2)",
      "Basic Block: Single entry, single exit",
    ],
    algorithms: [
      "Three-Address Code Generation",
      "Data Flow Analysis",
      "Graph Coloring (Register Allocation)",
      "Loop Optimization",
    ],
    examTricks: [
      "Identify loop invariants quickly",
      "Build interference graphs carefully",
      "Common subexpression elimination patterns",
    ],
  },
}

const examQuestions = [
  {
    id: 1,
    unit: "Unit 1",
    question: "Construct a DFA that accepts strings over {0,1} where every 0 is followed by at least one 1.",
    type: "Construction",
    difficulty: "Medium",
    timeLimit: "10 minutes",
    hint: 'Think about states representing "just saw 0" and "safe state"',
  },
  {
    id: 2,
    unit: "Unit 2",
    question: "Convert the grammar S → aSb | ab to Chomsky Normal Form.",
    type: "Algorithm",
    difficulty: "Easy",
    timeLimit: "8 minutes",
    hint: "Introduce new variables for terminals and long productions",
  },
  {
    id: 3,
    unit: "Unit 3",
    question: "Prove that the language {ww | w ∈ {0,1}*} is not context-free using pumping lemma.",
    type: "Proof",
    difficulty: "Hard",
    timeLimit: "15 minutes",
    hint: "Consider the structure of strings that can be pumped",
  },
  {
    id: 4,
    unit: "Unit 4",
    question: "Construct SLR parsing table for the grammar: E → E+T | T, T → T*F | F, F → (E) | id",
    type: "Construction",
    difficulty: "Hard",
    timeLimit: "20 minutes",
    hint: "Build LR(0) items first, then add FOLLOW sets for reduce actions",
  },
  {
    id: 5,
    unit: "Unit 5",
    question: "Optimize the code: t1=a*b; t2=c*d; t3=a*b+c*d; t4=a*b*c*d",
    type: "Optimization",
    difficulty: "Medium",
    timeLimit: "12 minutes",
    hint: "Look for common subexpressions and strength reduction opportunities",
  },
]

const studyPlan = [
  {
    time: "9:00 AM - 10:30 AM",
    activity: "Unit 1: Finite Automata & Regular Expressions",
    focus: "DFA/NFA construction, Regular expressions",
    priority: "High",
  },
  {
    time: "10:45 AM - 12:15 PM",
    activity: "Unit 2: Context-Free Grammar & PDA",
    focus: "Grammar transformations, Parsing",
    priority: "High",
  },
  {
    time: "1:15 PM - 2:45 PM",
    activity: "Unit 3: Turing Machines & Computability",
    focus: "TM construction, Decidability",
    priority: "Medium",
  },
  {
    time: "3:00 PM - 4:30 PM",
    activity: "Unit 4: Compilers & Syntax Analysis",
    focus: "Parsing techniques, Parser construction",
    priority: "High",
  },
  {
    time: "4:45 PM - 6:15 PM",
    activity: "Unit 5: Intermediate Code & Optimization",
    focus: "Code generation, Optimization techniques",
    priority: "Medium",
  },
  {
    time: "7:00 PM - 8:30 PM",
    activity: "Final Review & Practice Problems",
    focus: "Quick revision, Mock test",
    priority: "Critical",
  },
]

export default function ReviewPage() {
  const [selectedUnit, setSelectedUnit] = useState("Unit 1")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showHint, setShowHint] = useState(false)

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
              <h1 className="text-3xl font-bold mb-2">Final Review & Exam Preparation</h1>
              <p className="text-muted-foreground">Last-minute revision and practice for your supply exam</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive">
              <Clock className="w-4 h-4 mr-2" />
              Last Attempt
            </Badge>
            <ThemeToggle />
          </div>
        </div>

        <Tabs defaultValue="quick-reference" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quick-reference">
              <BookOpen className="w-4 h-4 mr-2" />
              Quick Reference
            </TabsTrigger>
            <TabsTrigger value="practice-questions">
              <Brain className="w-4 h-4 mr-2" />
              Practice Questions
            </TabsTrigger>
            <TabsTrigger value="study-plan">
              <Target className="w-4 h-4 mr-2" />
              Study Plan
            </TabsTrigger>
            <TabsTrigger value="exam-tips">
              <Zap className="w-4 h-4 mr-2" />
              Exam Strategy
            </TabsTrigger>
          </TabsList>

          {/* Quick Reference */}
          <TabsContent value="quick-reference">
            <div className="grid gap-6">
              <div className="flex gap-2 mb-4">
                {Object.keys(quickReference).map((unit) => (
                  <Button
                    key={unit}
                    variant={selectedUnit === unit ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedUnit(unit)}
                  >
                    {unit}
                  </Button>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{quickReference[selectedUnit].title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Key Formulas & Definitions</h3>
                    <div className="grid gap-2">
                      {quickReference[selectedUnit].keyFormulas.map((formula, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded font-mono text-sm">
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Important Algorithms</h3>
                    <ul className="space-y-2">
                      {quickReference[selectedUnit].algorithms.map((algorithm, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {algorithm}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Exam Tricks & Tips
                    </h3>
                    <ul className="space-y-2">
                      {quickReference[selectedUnit].examTricks.map((trick, index) => (
                        <li key={index} className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                          {trick}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Practice Questions */}
          <TabsContent value="practice-questions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Practice Questions</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {currentQuestion + 1} / {examQuestions.length}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        examQuestions[currentQuestion].difficulty === "Easy"
                          ? "text-green-600 border-green-600"
                          : examQuestions[currentQuestion].difficulty === "Medium"
                            ? "text-yellow-600 border-yellow-600"
                            : "text-red-600 border-red-600"
                      }
                    >
                      {examQuestions[currentQuestion].difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge>{examQuestions[currentQuestion].unit}</Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {examQuestions[currentQuestion].timeLimit}
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Question {currentQuestion + 1}</h3>
                  <p>{examQuestions[currentQuestion].question}</p>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                </div>

                {showHint && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-amber-700 dark:text-amber-300">{examQuestions[currentQuestion].hint}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    onClick={() => {
                      setCurrentQuestion(Math.max(0, currentQuestion - 1))
                      setShowHint(false)
                    }}
                    disabled={currentQuestion === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentQuestion(Math.min(examQuestions.length - 1, currentQuestion + 1))
                      setShowHint(false)
                    }}
                    disabled={currentQuestion === examQuestions.length - 1}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Plan */}
          <TabsContent value="study-plan">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  One-Day Study Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyPlan.map((session, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="text-muted-foreground font-mono text-sm min-w-[140px]">{session.time}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{session.activity}</h3>
                        <p className="text-muted-foreground text-sm">{session.focus}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          session.priority === "Critical"
                            ? "border-red-500 text-red-600"
                            : session.priority === "High"
                              ? "border-orange-500 text-orange-600"
                              : "border-blue-500 text-blue-600"
                        }
                      >
                        {session.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exam Strategy */}
          <TabsContent value="exam-tips">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Critical Exam Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Time Management (3 Hours)</h3>
                    <ul className="space-y-1 text-red-700 dark:text-red-300 text-sm">
                      <li>• Spend 5 minutes reading all questions</li>
                      <li>• Attempt easy questions first (Units 1, 2)</li>
                      <li>• Allocate 30-35 minutes per unit</li>
                      <li>• Keep 15 minutes for final review</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">High-Scoring Topics</h3>
                    <ul className="space-y-1 text-green-700 dark:text-green-300 text-sm">
                      <li>• DFA/NFA construction (Unit 1) - Easy marks</li>
                      <li>• Grammar transformations (Unit 2) - Algorithmic</li>
                      <li>• Parsing table construction (Unit 4) - Step-by-step</li>
                      <li>• Code optimization (Unit 5) - Pattern recognition</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Common Mistakes to Avoid</h3>
                    <ul className="space-y-1 text-amber-700 dark:text-amber-300 text-sm">
                      <li>• Not checking if ε is accepted in automata</li>
                      <li>• Forgetting to eliminate ε-productions in CNF</li>
                      <li>• Missing shift-reduce conflicts in parsing tables</li>
                      <li>• Not showing intermediate steps in proofs</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Last-Minute Checklist</h3>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
                      <li>• Review all formulas and definitions</li>
                      <li>• Practice drawing state diagrams quickly</li>
                      <li>• Memorize parsing algorithm steps</li>
                      <li>• Know common optimization patterns</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
