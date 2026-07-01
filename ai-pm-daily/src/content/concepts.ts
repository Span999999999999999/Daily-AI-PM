import type { Concept } from './types'

/**
 * Seed content for the MVP. Adding a new lesson + challenge is just appending a
 * Concept object here — no code changes elsewhere.
 */
export const CONCEPTS: Concept[] = [
  {
    id: 'rag',
    title: 'Retrieval-Augmented Generation (RAG)',
    skillId: 'ai-engineering',
    tagline: 'Ground AI answers in your own data, not just its training.',
    minutes: 15,
    xp: 200,
    diagram: {
      nodes: [
        { id: 'q', label: 'User Question', tone: 'blue' },
        { id: 'r', label: 'Retriever', sub: 'Vector search', tone: 'green' },
        { id: 'c', label: 'Relevant Context', sub: 'Top documents', tone: 'amber' },
        { id: 'l', label: 'LLM', sub: 'Generate answer', tone: 'violet' },
        { id: 'a', label: 'Answer + Sources', tone: 'blue' },
      ],
      edges: [
        { from: 'q', to: 'r' },
        { from: 'r', to: 'c' },
        { from: 'c', to: 'l' },
        { from: 'l', to: 'a' },
      ],
    },
    useCase: {
      scenario:
        'You are a PM at a fintech. Customers upload bank statements and ask questions about their spending.',
      goal:
        'Design a feature that answers questions from those statements accurately, with sources.',
      outcome:
        'The assistant retrieves the right transactions before answering, so replies are grounded and trustworthy — fewer hallucinations, happier users.',
    },
    whyItMatters:
      'RAG reduces hallucinations, keeps answers up to date, and connects AI to your company’s real data instead of relying only on what the model memorised during training.',
    challenge: {
      kind: 'ordering',
      prompt: 'Arrange the steps of a RAG flow in the correct order.',
      steps: [
        'User asks a question',
        'Search relevant documents (vector search)',
        'Pass the retrieved context to the LLM',
        'LLM generates an answer',
        'Show the answer with its sources',
      ],
      successNote:
        'Exactly. Retrieval happens before generation — that grounding step is what makes RAG trustworthy.',
    },
  },
  {
    id: 'llm-tokens',
    title: 'LLMs & Tokens',
    skillId: 'ai-fundamentals',
    tagline: 'How a model turns your words into predictions — and cost.',
    minutes: 12,
    xp: 150,
    diagram: {
      nodes: [
        { id: 't', label: 'Text Prompt', tone: 'blue' },
        { id: 'k', label: 'Tokenizer', sub: 'Split into tokens', tone: 'green' },
        { id: 'm', label: 'LLM', sub: 'Predict next token', tone: 'violet' },
        { id: 'o', label: 'Output Tokens', sub: 'Decoded to text', tone: 'amber' },
        { id: 'r', label: 'Response', tone: 'blue' },
      ],
      edges: [
        { from: 't', to: 'k' },
        { from: 'k', to: 'm' },
        { from: 'm', to: 'o' },
        { from: 'o', to: 'r' },
      ],
    },
    useCase: {
      scenario:
        'Your team wants an AI summary on every customer support ticket, and finance asks what it will cost.',
      goal: 'Estimate cost and latency for summarising 10,000 tickets a day.',
      outcome:
        'You reason in tokens: input + output tokens per ticket × price per token. Trimming the prompt and capping output length cuts the bill without hurting quality.',
    },
    whyItMatters:
      'Tokens are the unit of both cost and context limits. Once you think in tokens, pricing, latency, and “why did it get cut off?” all start to make sense.',
    challenge: {
      kind: 'ordering',
      prompt: 'Put the token lifecycle in order, from prompt to response.',
      steps: [
        'You write a text prompt',
        'The tokenizer splits it into tokens',
        'The model predicts the next token repeatedly',
        'Output tokens are decoded back into text',
        'The response is returned to the user',
      ],
      successNote:
        'Right — the model works one token at a time, and both the prompt and the output count toward cost.',
    },
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    skillId: 'ai-fundamentals',
    tagline: 'Design the instructions so the model does the right thing.',
    minutes: 10,
    xp: 150,
    diagram: {
      nodes: [
        { id: 'role', label: 'Role + Goal', sub: 'Who & what', tone: 'blue' },
        { id: 'ctx', label: 'Context', sub: 'Data & examples', tone: 'green' },
        { id: 'task', label: 'Task', sub: 'Clear instruction', tone: 'amber' },
        { id: 'fmt', label: 'Output Format', sub: 'Shape the answer', tone: 'violet' },
        { id: 'chk', label: 'Check & Iterate', tone: 'slate' },
      ],
      edges: [
        { from: 'role', to: 'ctx' },
        { from: 'ctx', to: 'task' },
        { from: 'task', to: 'fmt' },
        { from: 'fmt', to: 'chk' },
      ],
    },
    useCase: {
      scenario:
        'Support agents want AI-drafted replies, but early drafts are too long and off-brand.',
      goal: 'Write a prompt that produces short, on-brand, policy-safe replies.',
      outcome:
        'By setting a clear role, giving brand examples, and specifying the output format (max 4 sentences, friendly tone), draft quality jumps and edits drop.',
    },
    whyItMatters:
      'A good prompt is a product spec for the model. Small changes in role, context, and format often beat swapping to a bigger, more expensive model.',
    challenge: {
      kind: 'ordering',
      prompt: 'Order the parts of a well-structured prompt.',
      steps: [
        'Set the role and goal',
        'Provide context, data, and examples',
        'State the specific task',
        'Specify the output format',
        'Check the result and iterate',
      ],
      successNote:
        'Nice. Role → context → task → format → iterate is a reliable skeleton for almost any prompt.',
    },
  },
  {
    id: 'ai-evaluation',
    title: 'AI Evaluation & Metrics',
    skillId: 'experimentation',
    tagline: 'Prove the AI feature actually works before you ship it.',
    minutes: 14,
    xp: 200,
    diagram: {
      nodes: [
        { id: 'set', label: 'Eval Set', sub: 'Real examples', tone: 'blue' },
        { id: 'run', label: 'Run Model', sub: 'Generate outputs', tone: 'green' },
        { id: 'score', label: 'Score', sub: 'Metrics + graders', tone: 'amber' },
        { id: 'comp', label: 'Compare', sub: 'vs baseline', tone: 'violet' },
        { id: 'ship', label: 'Ship or Iterate', tone: 'slate' },
      ],
      edges: [
        { from: 'set', to: 'run' },
        { from: 'run', to: 'score' },
        { from: 'score', to: 'comp' },
        { from: 'comp', to: 'ship' },
      ],
    },
    useCase: {
      scenario:
        'You built the spending assistant from the RAG lesson. Leadership asks: “Is it good enough to launch?”',
      goal: 'Set up an evaluation that answers that question with evidence, not vibes.',
      outcome:
        'You build a labelled eval set of real questions, score accuracy and grounding, and compare against the old FAQ. Now “good enough” is a number you can defend.',
    },
    whyItMatters:
      'Without evaluation you’re shipping on hope. A repeatable eval turns “it feels better” into a measurable decision and catches regressions before users do.',
    challenge: {
      kind: 'ordering',
      prompt: 'Arrange the steps of evaluating an AI feature.',
      steps: [
        'Collect an eval set of real examples',
        'Run the model to generate outputs',
        'Score the outputs with metrics or graders',
        'Compare against a baseline',
        'Decide to ship or iterate',
      ],
      successNote:
        'Exactly — an eval set plus a baseline comparison is what turns opinions into decisions.',
    },
  },
]

export const CONCEPTS_BY_ID: Record<string, Concept> = Object.fromEntries(
  CONCEPTS.map((c) => [c.id, c]),
)

export function conceptsForSkill(skillId: string): Concept[] {
  return CONCEPTS.filter((c) => c.skillId === skillId)
}
