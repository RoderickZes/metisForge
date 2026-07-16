# Metis Forge Architecture

## Overview

This document describes the architectural organization of the Metis Forge project.

Rather than describing technologies, it explains how the repository is structured and how each component contributes to the educational platform.

---

# Repository Structure

```
metisForge/
│
├── docs/
├── labs/
├── README.md
└── ROADMAP.md
```

The repository is divided into two major areas:

- Project documentation
- Practical laboratories

---

# Documentation Layer

```
docs/
```

Contains documentation about the project itself.

Current documents include:

- Architecture
- Philosophy
- Architectural Decision Records (ADRs)
- Roadmap

This documentation explains why the project exists and how it evolves.

---

# Laboratory Layer

```
labs/
```

Contains every practical laboratory.

Each laboratory is self-contained and can be completed independently while building upon previous knowledge.

Every laboratory follows a common structure.

```
LAB-XXX/
│
├── deployment/
├── exercises/
├── evidence/
├── scripts/
├── teacher/
├── docs/
└── README.md
```

---

# Laboratory Components

## README

Introduces the laboratory.

Explains objectives, prerequisites and recommended learning path.

---

## deployment/

Contains everything required to build the laboratory environment.

Examples:

- Dockerfile
- Docker Compose
- Build scripts
- VM instructions

---

## exercises/

Contains the practical activities performed by the student.

Exercises should gradually increase in complexity.

---

## evidence/

Contains templates and recommendations for documenting completed work.

Students are encouraged to record:

- Commands
- Screenshots
- Explanations
- Lessons learned

---

## scripts/

Utility scripts used to automate repetitive tasks.

Scripts should never replace understanding.

Automation supports learning but does not replace it.

---

## teacher/

Material intended for instructors.

Examples:

- Lesson plans
- Teaching notes
- Instructor guides

This separation allows the same laboratory to be used for both self-learning and classroom instruction.

---

## docs/

Additional documentation specific to the laboratory.

Examples:

- Design documents
- Architecture diagrams
- Technical references

---

# Learning Architecture

Every laboratory follows the same educational lifecycle.

```
Understand
      ↓
Design
      ↓
Deployment
      ↓
Operation
      ↓
Security Analysis
      ↓
Hardening
      ↓
Documentation
```

This lifecycle is independent of the technology being used.

---

# Design Principles

Every laboratory should be:

- Reproducible
- Modular
- Documented
- Incremental
- Accessible

---

# Execution Modes

Whenever possible, laboratories should support multiple execution modes.

Quick Mode

- Docker

Professional Mode

- Virtual Machine

Both modes should provide equivalent learning objectives.

---

# Evolution

New laboratories should extend the platform without changing its architectural principles.

Consistency is preferred over complexity.