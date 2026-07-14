# Future Decisions

This document contains topics that require future analysis before becoming formal Architecture Decision Records (ADRs).

These topics are intentionally documented to avoid losing important ideas while the project evolves.


# Distribution Strategy

## Question

How should Metis Forge be delivered to learners?

Possible approaches:

- GitHub repository.
- Web platform.
- Local/offline laboratory.
- Hybrid model.


## Context

Metis Forge has two possible audiences:

### Technical contributors

People interested in:

- Developing laboratories.
- Improving infrastructure.
- Contributing code and documentation.

GitHub is appropriate for this audience.


### Learners

People who want to learn infrastructure and cybersecurity.

Some users may not have:

- Git knowledge.
- Programming experience.
- Previous technical background.

A web platform or guided environment may provide a lower entry barrier.


## Possible Future Model

Metis Forge Core:

- Open source repositories.
- Laboratory definitions.
- Documentation.
- Infrastructure code.


Metis Forge Platform:

- Web interface.
- Learning paths.
- Progress tracking.
- Guided experiences.


Metis Forge Classroom:

- Instructor-led courses.
- Local deployments.
- Community education.


## Decision Status

Not decided.

To be evaluated after the first functional laboratories exist.