# ADR 0002 - Documentation Language Strategy

## Status

Accepted


## Context

Metis Forge aims to be an open-source infrastructure learning platform focused on teaching people how to build, secure and operate real-world systems.

The project has two main objectives:

1. Provide professional-level infrastructure and cybersecurity knowledge.
2. Make technical education accessible to people with different levels of experience and resources.

Most professional documentation in technology is written in English. However, requiring English knowledge from the beginning can create an unnecessary barrier for new learners, especially those entering the field without previous technical experience.


## Problem

Choosing the documentation language requires balancing:

- Accessibility for beginners.
- Alignment with the global technology ecosystem.
- Development of professional technical vocabulary.


## Considered Options


### Option 1 - English Only

Advantages:

- Matches most professional documentation.
- Easier international collaboration.
- Direct exposure to technical English.

Disadvantages:

- Creates an additional barrier for beginners.
- Limits accessibility for Spanish-speaking learners.


### Option 2 - Spanish Only

Advantages:

- Easier access for local learners.
- Better educational experience for beginners.

Disadvantages:

- May delay exposure to the English terminology used professionally.
- Less aligned with international resources.


### Option 3 - Spanish First, English Compatible

Advantages:

- Provides an accessible learning path.
- Maintains professional terminology.
- Allows future bilingual expansion.
- Reduces the initial learning barrier.

Disadvantages:

- Requires additional documentation effort.


## Decision

Metis Forge will follow a Spanish-first documentation strategy.

Educational explanations will be primarily written in Spanish.

Technical terms commonly used in the industry will remain in their original form.

Examples:

- server
- container
- filesystem
- firewall
- kernel
- service
- daemon


Advanced documentation and future international contributions may include English versions.


## Consequences

Positive:

- More accessible for Spanish-speaking beginners.
- Easier adoption in educational environments.
- Maintains connection with real-world technical language.


Negative:

- Requires maintaining translation consistency.
- Some documentation will require additional work.


## Future Considerations

Metis Forge may implement:

- Spanish documentation as default.
- Optional English translations.
- Community contributions for additional languages.

The objective is to remove unnecessary barriers while preparing learners for professional environments.

## Documentation Categories

## Educational Documentation

Audience:
Learners

Language:
Spanish

Purpose:
Teach infrastructure and cybersecurity concepts.

---

## Instructor Documentation

Audience:
Teachers and instructors

Language:
Spanish

Purpose:
Support classroom teaching, lesson planning and educational guidance.

---

## Engineering Documentation

Audience:
Developers and contributors

Language:
English

Purpose:
Describe architecture, implementation decisions and project evolution.

Language should never become a barrier to learning.

Professional terminology should be introduced progressively while keeping educational content accessible.