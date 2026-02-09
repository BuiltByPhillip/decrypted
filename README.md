# Decrypted

An extensible framework for creating interactive cryptographic protocol exercises, enabling users to learn by doing with real-time feedback.

**Live Demo:** [decrypted-chi.vercel.app](https://decrypted-chi.vercel.app)

## Overview

Decrypted allows educators to define cryptographic protocol exercises using a simple text-based Domain Specific Language (DSL). The framework parses these definitions into interactive UI components, supporting multiple exercise types:

- **Select** - Multiple choice questions
- **Fill** - User input with constraint validation
- **Construct** - Drag-and-drop expression building
- **Calculate** - Computational exercises

## Tech Stack

- [Next.js 15](https://nextjs.org) - React framework
- [Tailwind CSS 4](https://tailwindcss.com) - Styling
- [tRPC](https://trpc.io) - Type-safe API
- [Prisma](https://prisma.io) - Database ORM
- [Lucide React](https://lucide.dev/icons) - Icons

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## DSL Example

```
protocol: Diffie-Hellman
participants: Alice, Bob

step 1:
    description: Alice chooses secret a
    exercise:
        type: fill
        prompt: Choose Alice's secret exponent
        hint: Choose a random integer in the range [2, p-2]
        answer: 2 < $1 and $1 < p-2

step 2:
    description: Alice computes her public key A
    exercise:
        type: construct
        prompt: Construct the expression for Alice's public key
        palette: g, a, p, ^, mod
        answer: g ^ a mod p
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── _components/        # Shared components
│   └── hooks/              # Custom hooks including DSL parser
├── components/             # Reusable UI components
├── server/                 # tRPC server and database
└── styles/                 # Global styles
```

## Deployment

The application is deployed on [Vercel](https://vercel.com). Push to `main` to trigger automatic deployment.
