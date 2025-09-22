
---
# Reflection — Building FoodMood with AI

Using AI throughout the FoodMood build meaningfully changed my workflow. The biggest benefit was speed at the planning and scaffolding stages. I began by describing the constraints (Next.js, App Router, Tailwind, shadcn/ui, free API only) and the core flows (enter ingredients → see suggestions → open details → save favorites). From that, the assistant generated a file tree, placeholder pages, and a clean split between client/server components. This saved hours compared to a purely manual setup.

For the data layer, the free TheMealDB API does not natively support multi-ingredient queries at once. I asked the AI to propose a workaround and it suggested intersecting the results of `filter.php?i=<ingredient>` calls, then running `lookup.php?i=<id>` for details. This approach was simple, worked within rate/latency constraints, and kept the UI responsive. The AI also helped me write a small normalization helper (lowercase, trim, dedupe) so the search behaved consistently.

The assistant was helpful for UI scaffolding with shadcn/ui. It produced short, compilable stubs that used Button, Card, Skeleton, and simple form components. That let me focus on wiring rather than remembering exact import paths or classNames. For documentation, the AI drafted the README sections (“Setup and run, Features, Tech, AI usage”) and I refined them to match what I actually shipped.

What worked best was giving the assistant concrete inputs (a file tree, a clear success criterion, and the actual third-party endpoints) and asking for small, testable outputs (e.g., “route handler that returns JSON {meals: …}”). I also found it useful to paste diffs when refactoring, so the assistant could produce precise edits rather than generic advice.

What felt limiting: long, open-ended prompts produced verbose results that I had to trim. The model sometimes assumed libraries I did not install or returned types that needed slight changes. I learned to constrain outputs (“TypeScript only”, “single file”, “no external packages”) and to ask for the minimal viable snippet. For example, I had to reiterate that authentication would be a placeholder for now and that favorites should remain client-side until later.

On code quality, AI reviews (e.g., CodeRabbit or IDE review) were most helpful for small correctness issues: missing null checks, inconsistent prop types, and early returns for empty input. For more architectural decisions (e.g., server vs. client components), I still relied on my own judgment but used AI to sanity check trade-offs and list risks.

My main prompting lessons: (1) state constraints upfront, (2) specify the output format (file tree then code blocks), (3) iterate quickly by providing context (file paths, diffs), (4) ask for edge cases and tests once the baseline works. With this approach, I kept momentum while maintaining control over scope and quality.

Overall, AI accelerated the MVP significantly. It did not replace design or judgment, but it helped with repetitive work, boilerplate, and documentation. I’d use the same approach again, with a stronger emphasis on short prompts, explicit constraints, and prompts designed around concrete inputs (trees, diffs, contracts).
