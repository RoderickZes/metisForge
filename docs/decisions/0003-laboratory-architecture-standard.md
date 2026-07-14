# ADR 0003 - Laboratory Architecture Standard

## Status

Accepted


## Context

Metis Forge will contain multiple practical laboratories focused on infrastructure, system administration and cybersecurity.

As the platform grows, laboratories need a consistent structure that allows:

- Easy navigation.
- Reproducible environments.
- Community contributions.
- Consistent learning experiences.

A laboratory should not be considered only as a vulnerable machine or technical exercise.

A Metis Forge laboratory represents a complete learning experience:

- Understanding a system.
- Deploying an environment.
- Operating the components.
- Analyzing security.
- Improving the implementation.
- Documenting the results.


## Problem

Without a defined laboratory standard, each laboratory could develop different:

- Documentation formats.
- Deployment methods.
- Learning objectives.
- Evaluation methods.

This would make the platform difficult to maintain and harder for new contributors to understand.


## Considered Options


### Option 1 - Free Form Laboratories

Each contributor creates laboratories using their preferred structure.

Advantages:

- Maximum flexibility.

Disadvantages:

- Inconsistent user experience.
- Difficult maintenance.
- Higher contributor onboarding cost.


### Option 2 - Identical Laboratory Templates

Every laboratory must contain exactly the same files and folders.

Advantages:

- High consistency.

Disadvantages:

- Limits different learning scenarios.
- Creates unnecessary restrictions.


### Option 3 - Standardized Core Structure

Laboratories share a common foundation while allowing additional components when required.

Advantages:

- Balance between consistency and flexibility.
- Easier collaboration.
- Better learning experience.


## Decision

Metis Forge will use a standardized laboratory architecture.

Each laboratory must contain the following core components:

LAB-XXX-name/

├── README.md
├── docs/
├── deployment/
├── exercises/
├── evidence/
└── scripts/



## Component Definition


### README.md

Entry point for the laboratory.

Contains:

- Overview.
- Learning objectives.
- Scenario description.
- Requirements.
- Quick start information.


### docs/

Contains technical explanations.

Examples:

- Architecture diagrams.
- Component descriptions.
- References.
- Design decisions.


### deployment/

Contains files required to create the environment.

Examples:

- Docker Compose files.
- Dockerfiles.
- Configuration files.


### exercises/

Contains practical activities.

Exercises should encourage understanding, experimentation and troubleshooting.

They should not only provide commands to copy and execute.


### evidence/

Contains proof of completed learning activities.

Examples:

- Screenshots.
- Command outputs.
- Diagrams.
- Security reports.
- Personal notes.


The objective is to demonstrate understanding, not only completion.


### scripts/

Contains automation utilities.

Examples:

- Setup scripts.
- Validation scripts.
- Cleanup scripts.


## Learning Philosophy

A Metis Forge laboratory follows this cycle:

Understand
|
Deploy
|
Operate
|
Analyze
|
Secure
|
Document



The final objective is not only solving a challenge, but understanding the complete lifecycle of a system.


## Consequences


Positive:

- Consistent learning experience.
- Easier contribution model.
- Better portfolio value.
- Encourages documentation habits.
- Produces evidence of practical skills.


Negative:

- Requires more work when creating laboratories.
- Some simple exercises may not need every component.


## Future Considerations

Metis Forge may implement automated validation to verify that laboratories follow the defined structure.