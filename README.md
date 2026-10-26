# Digital Chemistry Learning Hub

An interactive learning site for digital chemistry and computational drug discovery, built while studying for an MSc in Digital Chemistry. It turns lecture topics into short web lessons, each followed by a quick-check quiz.

## Contents

17 lessons grouped into six chapters:

1. Atomic structure, chemical bonds, molecular shape
2. Functional groups, SMILES
3. Drug discovery pipeline, molecular properties, reaction mechanisms
4. Fingerprints, QSAR modelling, RDKit basics
5. Drug pipeline overview, target identification, hit / lead / candidate
6. ADMET, drug-likeness, molecular docking

Features:

- Lesson pages with embedded multiple-choice quick checks
- Text highlighting and notes on any lesson (stored per user)
- Login and per-user data through Supabase

## Tech stack

React 19, Vite, React Router, GSAP animations, Tailwind CSS, Supabase (auth and Postgres).

## Run locally

```bash
npm install
cp .env.example .env      # then fill in your own Supabase project values
npm run dev
```

Create the tables by running `supabase-setup.sql` in the Supabase SQL editor. The environment variables are `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
