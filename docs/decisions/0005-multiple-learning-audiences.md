# ADR 0005 - Multiple Learning Audiences

## Status

Accepted

---

## Context

Metis Forge was originally designed as a self-learning platform focused on infrastructure and cybersecurity.

During the project design, a second educational scenario emerged:

- Instructor-led classes.
- Community workshops.
- Educational activities in underserved communities.

This introduced a new requirement.

The project must support not only students learning independently, but also instructors delivering the laboratories in person.

At the same time, contributors need technical documentation to maintain and evolve the project.

These three audiences have different goals and require different documentation.

---

## Decision

Every laboratory in Metis Forge will provide documentation for three distinct audiences.

### 1. Student Documentation

Purpose:

Help learners complete the laboratory independently.

Examples:

- Laboratory README.
- Exercises.
- Evidence requirements.

Language:

Spanish (default).

---

### 2. Instructor Documentation

Purpose:

Help instructors explain concepts, guide discussions and deliver the laboratory in classrooms or workshops.

Examples:

- Lesson plans.
- Instructor guides.
- Teaching notes.
- Demonstrations.
- Analogies.
- Common misconceptions.
- Suggested questions.

Language:

Spanish (default).

---

### 3. Contributor Documentation

Purpose:

Help contributors maintain and improve the laboratory.

Examples:

- Design documents.
- Internal architecture.
- Future improvements.
- Technical decisions.

Language:

English.

---

## Rationale

Different audiences consume information differently.

Students need guidance.

Instructors need teaching support.

Contributors need engineering documentation.

Separating these responsibilities improves clarity, maintainability and educational quality.

---

## Consequences

### Positive

- Better classroom experience.
- Easier community teaching.
- Clear separation of documentation.
- Easier maintenance.
- Supports both self-learning and instructor-led education.

### Negative

- More documentation to maintain.
- Higher initial effort when creating new laboratories.

---

## Laboratory Structure

Every laboratory should follow this structure:

```
LAB-XXX/

README.md

teacher/
├── README.md
├── lesson-plan.md
├── instructor-guide.md
└── teaching-notes.md

docs/
└── design.md

deployment/

exercises/

evidence/

scripts/
```

---

## Future Considerations

Future versions of Metis Forge may include additional documentation for:

- Mentors.
- Translators.
- Accessibility adaptations.

These audiences are outside the current scope.