# LAB-001 - First Linux Server

## Laboratory Design Document


## Status

Design phase


## Overview

LAB-001 - First Linux Server is the first practical laboratory of Metis Forge.

The objective of this laboratory is to introduce learners to Linux system administration by providing a clean operating system environment where they must build, configure and secure a functional server.

The learner does not receive a preconfigured vulnerable machine.

Instead, they start from a minimal Linux installation and progressively transform it into a usable and secure system.


## Learning Philosophy

This laboratory follows the Metis Forge lifecycle approach:

```
Understand
    |
Design
    |
Build
    |
Operate
    |
Analyze
    |
Secure
    |
Document
```

The objective is not only to execute commands, but to understand why each component exists and how it affects the entire system.


## Scenario

A small organization has received a new server.

The server currently contains only a basic Linux installation.

The learner is responsible for preparing this server for internal use.

The server must become:

- Administrable.
- Organized.
- Secure.
- Documented.


The learner acts as a junior system administrator responsible for the initial configuration.


## Base Operating System Decision

### Selected Distribution

Ubuntu Server


## Reasoning

Ubuntu was selected as the base operating system for the first laboratory because:

- It has extensive documentation.
- It has a large community.
- It is widely used in professional environments.
- It is commonly found in cloud environments.
- It provides a smoother learning experience for beginners.


The objective of the first laboratory is to teach Linux concepts, not create unnecessary complexity through distribution-specific troubleshooting.


Future laboratories may introduce other distributions, including Debian, Alpine Linux or enterprise-focused systems.


## Learning Mode

---

# Execution Modes

LAB-001 supports two execution modes.

The learning objectives are the same in both modes.

The difference is only the infrastructure used to run the laboratory.


## Docker Mode

### Purpose

Docker Mode is the recommended option for beginners, classrooms and low-resource environments.

It provides a lightweight and reproducible Linux server environment.


Advantages:

- Low hardware requirements.
- Fast deployment.
- Easy distribution.
- Suitable for community education.


Limitations:

- The learner interacts with Linux inside a container environment.
- Some virtualization concepts are abstracted.


Example:
Student Machine

    |
    |
 Docker

    |
    |

Ubuntu Server Container



---

## Virtual Machine Mode

### Purpose

Virtual Machine Mode provides a more realistic server administration experience.

It is recommended for learners who have enough hardware resources and want to simulate professional environments.


Advantages:

- Full operating system experience.
- More realistic infrastructure management.
- Allows practicing virtualization concepts.
- Closer to production environments.


Limitations:

- Requires more CPU, RAM and storage.
- More complex initial setup.


Example:


Physical Machine

    |
    |

Hypervisor

    |
    |

Ubuntu Server VM



---

## Design Principle

Both modes must provide the same educational experience.

The learner should be able to complete the laboratory regardless of the execution method.

Metis Forge prioritizes accessibility without sacrificing professional learning paths.


### Selected Mode

Build Mode


## Reasoning

The learner starts from a clean Linux environment and builds the server configuration step by step.

This approach was selected because understanding comes from the process of construction.

The learner should understand:

- Why users exist.
- Why permissions exist.
- Why services exist.
- Why logs exist.
- How Linux organizes information.


A preconfigured environment would reduce the learning opportunity.


## Initial Learning Objectives


After completing this laboratory, the learner should understand:


### Linux Filesystem

The learner should understand the Linux filesystem hierarchy.

Topics:

- Root directory `/`.
- System directories.
- Configuration files.
- User data.
- Application data.
- Temporary files.


Important directories:

```
/
├── etc
├── home
├── root
├── usr
├── var
├── tmp
└── proc
```


The learner should understand that Linux follows a unified filesystem tree instead of separate drive letters.


---

## Users and Groups

The learner should understand how Linux manages identities.

Topics:

- Users.
- Groups.
- Root account.
- User privileges.
- Account management.


Expected knowledge:

- Create users.
- Create groups.
- Assign users to groups.
- Understand privilege separation.


---

## File Permissions

The learner should understand Linux permission management.

Topics:

- Owner.
- Group.
- Others.
- Read permissions.
- Write permissions.
- Execute permissions.


Example:

```
-rwxr-x---
```

The learner should understand how permissions affect security and system operation.


---

## Remote Administration with SSH

The learner should understand remote server administration.

Topics:

- SSH protocol.
- Client/server communication.
- Authentication.
- Service management.
- Secure access.


The final environment should allow remote administration through SSH.


---

## Logs and System Visibility

The learner should understand that systems generate information about their operation.

Topics:

- System logs.
- Service logs.
- Authentication events.
- Troubleshooting.


Tools:

```
journalctl
/var/log
systemctl
```


Logs are considered an important security and operational resource.


---

# Initial Laboratory Components

The first version of LAB-001 will include:


## Operating System

Ubuntu Server


## Services

Initial services:

- SSH server.
- User management.
- Permission management.
- System logging.


Additional services may be introduced in future iterations.


## Security Concepts

The laboratory introduces:

- Least privilege.
- Account separation.
- Secure administration.
- Access control.
- Auditing.


---

# Laboratory Structure

The laboratory follows the Metis Forge laboratory standard:

```
LAB-001-first-linux-server/

├── README.md
├── docs/
├── deployment/
├── exercises/
├── evidence/
└── scripts/
```


## Evidence Requirements

Completing the laboratory should produce evidence of understanding.

Examples:

- System architecture diagram.
- Configuration notes.
- Commands executed.
- Screenshots.
- Security observations.
- Improvement recommendations.


The goal is not only completion, but the ability to explain technical decisions.


---

# Future Expansion

Future versions of this laboratory may include:

- Web server deployment.
- Firewall configuration.
- Backup systems.
- Monitoring.
- Vulnerability assessment.
- Hardening practices.


These additions should preserve the original objective:

Understanding how a Linux server is built, operated and secured.


# References

Ubuntu Server Documentation:

https://ubuntu.com/server/docs


Linux Filesystem Hierarchy Standard:

https://refspecs.linuxfoundation.org/fhs/


OpenSSH Documentation:

https://www.openssh.com/manual.html