# ADR 0004 - Learning Philosophy

## Status

Accepted

## Principles

Learning should prioritize understanding over memorization.

Commands are tools.

Concepts are transferable.

The objective is not remembering syntax, but understanding why systems behave the way they do.

## Context

Metis Forge aims to provide practical education in infrastructure and cybersecurity.

Traditional cybersecurity training platforms often focus mainly on exploitation:

- Finding vulnerabilities.
- Obtaining access.
- Completing challenges.

While offensive skills are important, effective security requires understanding how systems are designed, deployed, operated and maintained.


## Problem

A learning platform must decide whether laboratories should focus mainly on vulnerability exploitation or on a complete system lifecycle.

The objective of Metis Forge is to create professionals who understand both how systems work and how they can be protected.


## Considered Options


### Option 1 - Challenge First Approach

The primary objective is solving technical challenges.

Advantages:

- Fast feedback.
- Attractive gamification.
- Easy evaluation.

Disadvantages:

- May encourage tool usage without understanding.
- Limited exposure to system administration.
- Does not represent complete infrastructure lifecycle.


### Option 2 - Infrastructure First Approach

The learner builds and operates systems before analyzing security.

Advantages:

- Develops fundamental understanding.
- Represents real-world environments.
- Creates stronger technical foundations.

Disadvantages:

- Requires more time.
- Higher initial complexity.


### Option 3 - Lifecycle Approach

The learner follows the complete lifecycle:

- Design.
- Deployment.
- Operation.
- Security analysis.
- Hardening.

Advantages:

- Combines infrastructure and cybersecurity.
- Develops professional skills.
- Produces practical evidence.

Disadvantages:

- Requires more time to design and complete each laboratory.
- Higher complexity for beginners.
- Requires more documentation and maintenance effort.
- Progress may feel slower compared to simple challenge-based platforms.
- Evaluation is more complex because success is not only measured by a final answer.

However, these disadvantages are considered acceptable because the objective is not only rapid challenge completion, but developing a deeper understanding of real systems.

## Decision

Metis Forge will follow a lifecycle-based learning approach.

Laboratories should guide learners through:

Understand
     │
Prepare
     │
Design
     │
Deploy
     │
Operate
     │
Observe
     │
Analyze
     │
Secure
     │
Document
     │
Reflect


Security is not treated as an isolated final step.

Security is a continuous process integrated throughout the system lifecycle.


## Evidence-Based Learning

Every laboratory should generate portfolio-quality evidence.

Evidence should demonstrate not only that a task was completed, but that the learner understands the reasoning behind the implementation.

Examples:

- Architecture diagrams.
- Configuration files.
- Documentation.
- Security analysis.
- Improvement proposals.


The objective is not only completing a challenge, but being able to explain and defend technical decisions.


## Consequences


Positive:

- Stronger understanding of real systems.
- Better preparation for professional environments.
- Differentiation from traditional challenge-only platforms.
- Creates valuable portfolio artifacts.


Negative:

- Laboratories require more design effort.
- Progression may feel slower compared to simple challenges.

## Learning Through Failure

Mistakes are expected.

Laboratories should encourage experimentation.

Learners are expected to break systems, investigate failures and recover from them.

Troubleshooting is considered part of the learning process.


## Classroom Support

Laboratories should support both:

- Independent learning.
- Instructor-guided classes.

The same laboratory should be useful in self-paced and classroom environments.

## Future Considerations

Metis Forge may include challenge elements such as:

- Security exercises.
- Vulnerability discovery.
- Capture the Flag activities.
- Realistic operational incidents.
- Maintenance tasks.
- Infrastructure failures.
- Service migrations.
- Disaster recovery.
- Production-like scenarios.

However, challenges should exist inside realistic environments rather than replacing them.

The objective is not to create people capable of following tutorials.

The objective is to create professionals capable of understanding systems they have never seen before.