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
├── scripts/
└── teacher/


## Component Definition


### README.md

Entry point for the laboratory.

Contains:

- Overview
- Learning objectives
- Scenario description
- Requirements
- Recommended learning path
- Links to the deployment guide and exercises


### docs/

Contains technical explanations.

Examples:

- Architecture diagrams.
- Component descriptions.
- References.
- Design decisions.


### deployment/

Purpose:

Guide the learner through understanding the execution environment before deploying it.

Examples:

- Dockerfile
- Docker Compose
- Build scripts
- Environment documentation


### exercises/

Contains practical activities.

Exercises should encourage understanding, experimentation and troubleshooting.

They should not only provide commands to copy and execute.

Exercises are sequential.

Each exercise builds upon the previous one.

Learners should understand the current stage before moving to the next.


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

### teacher/

Support material for instructors conducting the laboratory.

Examples:

Lesson plans.
Instructor guides.
Teaching notes.
Classroom recommendations.
Common student difficulties.

Purpose:

Provide educational support without exposing instructor material to learners during self-paced study.

## Learning Philosophy

A Metis Forge laboratory follows this cycle:

Understand

↓

Prepare

↓

Deploy

↓

Operate

↓

Analyze

↓

Secure

↓

Document

↓

Reflect


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

### Learning Audiences

Each laboratory should support three complementary audiences:

Learners
Follow the laboratory independently.

Instructors
Use teaching material to guide students in classroom environments.

Contributors
Understand the laboratory implementation and evolve the project.

## Future Considerations

Metis Forge may provide tooling to:

Validate laboratory structure.
Check required documentation.
Automate environment creation.
Verify learning outcomes.
Generate portfolio-ready evidence.


