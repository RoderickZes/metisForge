# ADR 0001 - Multiple Laboratory Execution Modes

## Status

Accepted

---

## Context

Metis Forge aims to provide practical laboratories that are accessible to as many learners as possible while remaining representative of real-world infrastructure.

Some students have limited hardware resources and cannot comfortably run multiple virtual machines.

Others may wish to reproduce the same laboratory in a more realistic environment using full virtual machines.

The educational objectives should remain identical regardless of the execution environment.

---

## Decision

Every laboratory should support multiple execution modes whenever technically feasible.

The recommended execution modes are:

- **Quick Mode** — Docker containers
- **Professional Mode** — Virtual Machines

Both execution modes should represent the same infrastructure and achieve the same learning objectives.

The execution environment must never change what the student learns.

---

## Rationale

Docker provides:

- Fast deployment.
- Low hardware requirements.
- Easy reproducibility.
- Simple distribution through Git.

Virtual machines provide:

- Full operating system behavior.
- Greater realism.
- Better representation of production environments.
- More advanced networking possibilities.

Each mode serves different educational needs without modifying the laboratory itself.

---

## Consequences

### Positive

- Lower entry barrier.
- Better accessibility.
- More realistic environments for advanced learners.
- Greater flexibility for instructors.
- Better long-term scalability of laboratories.

### Negative

- Additional maintenance effort.
- Two deployment methods must remain synchronized.
- More documentation is required.

---

## Future Considerations

Additional execution modes may be introduced in the future, provided they preserve the educational objectives.

Possible future modes include:

- Cloud environments.
- Kubernetes clusters.
- Hybrid infrastructures.

The execution technology should always be selected according to the learning objectives rather than personal preference.