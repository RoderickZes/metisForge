# ADR 0005 - Multiple Learning Audiences

## Status

Accepted

---

## Context

During the evolution of the project, it became clear that Metis Forge serves multiple educational contexts.

Some learners will study independently.

Others will participate in instructor-led workshops, community programs or classroom environments.

In addition, contributors require technical documentation to maintain and evolve the platform.

These audiences have different goals, responsibilities and information needs.

---

## Decision

Every laboratory in Metis Forge will provide documentation for three distinct audiences.

The existence of multiple audiences should not result in duplicated content.

Each document should be written for a specific audience and avoid repeating information already explained elsewhere.

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
Contributors should be able to understand the design decisions without reading the educational material.

Examples:

- Design documents.
- Internal architecture.
- Future improvements.
- Technical decisions.

Language:

English.

---
### 4. Community

Metis Forge also aims to support local communities by providing accessible educational material that can be used in workshops and outreach programs.

Community activities reuse the student and instructor documentation rather than introducing a separate documentation model.

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

deployment/

docs/
    design.md

exercises/
    README.md
    ...

evidence/

scripts/

teacher/
    README.md
    lesson-plan.md
    instructor-guide.md
    teaching-notes.md 

---

## Future Considerations

Future versions of Metis Forge may include additional documentation for:

- Mentors.
- Translators.
- Accessibility adaptations.

Future versions may also provide contributor onboarding documentation to help new maintainers understand the project architecture and contribution workflow.

These audiences are outside the current scope.