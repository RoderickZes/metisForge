# ADR 0001 - Container First Architecture

## Status

Accepted


## Context

Metis Forge requires learning environments that are easy to reproduce, distribute and execute on different hardware configurations.

Virtual machines provide realistic environments but require significant system resources.

Containers provide lightweight, reproducible and version-controlled environments that can be easily shared through Git repositories.

The platform needs to balance realism, accessibility and maintainability.


## Decision

Metis Forge will prioritize container-based laboratories as the default approach.

Virtual machines will be considered for advanced scenarios where full operating system isolation or complex network environments are required.


## Consequences

### Positive

- Lower hardware requirements.
- Faster deployment of learning environments.
- Easier version control through Git.
- Better reproducibility between users.
- Alignment with modern infrastructure practices.


### Negative

- Users need to understand container concepts.
- Some real-world infrastructure scenarios cannot be fully represented with containers.
- Additional abstraction compared to traditional virtual machines.


## Future Considerations

Metis Forge may support hybrid environments combining:

- Docker containers.
- Virtual machines.
- Cloud-based resources.

The choice of technology should always be based on the learning objective.