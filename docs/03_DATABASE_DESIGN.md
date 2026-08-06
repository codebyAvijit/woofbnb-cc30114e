# WoofBnB

# Database Design Document

**Version:** 2.0.0

**Status:** Draft

**Document Owner:** Database Architecture

**Last Updated:** 2026-08-06

---

# 1. Purpose

This document defines the logical database design for the WoofBnB platform.

It describes the data model, entity relationships, naming conventions, integrity rules, indexing strategy, and migration principles that support the application.

Implementation details such as repository implementations, ORM configuration, SQL scripts, and API interactions are intentionally excluded.

---

# 2. Related Documents

| Document                       | Purpose                                      |
| ------------------------------ | -------------------------------------------- |
| system.json                    | Database constraints and architectural rules |
| 01_PROJECT_DOCUMENTATION.md    | Business requirements                        |
| 02_SOFTWARE_ARCHITECTURE.md    | Overall architecture                         |
| 04_OPENAPI_SPECIFICATION.md    | Data contracts                               |
| 06_BACKEND_TECHNICAL_DESIGN.md | Repository implementation                    |

---

# 3. Database Goals

The database has been designed to support the following objectives.

## DG-001

Maintain data integrity throughout the application.

---

## DG-002

Support efficient storage and retrieval of application data.

---

## DG-003

Minimize redundancy through normalized design.

---

## DG-004

Support future migration without changing business behaviour.

---

## DG-005

Maintain compatibility with the approved project architecture.

---

# 4. Database Principles

The WoofBnB database follows the principles below.

---

## Normalization

Data shall be organized to reduce duplication while preserving readability and maintainability.

---

## Integrity

Relationships between entities shall be enforced using appropriate constraints.

---

## Consistency

Naming conventions and data structures shall remain consistent throughout the database.

---

## Maintainability

Schema evolution should occur through controlled migrations.

---

## Extensibility

The schema should support future business features without major redesign.

---

# 5. Entity Overview

The primary business entities include:

- Users
- Pets
- Pet Sitters
- Services
- Bookings
- Reviews
- Availability
- Notifications

Each entity represents a core business concept identified in the project documentation.

Detailed field definitions are provided later in this document.

---

# 6. High-Level Entity Relationships

The primary relationships are summarized below.

```

User
│
├── Pets
│
├── Bookings
│
└── Reviews

Pet Sitter
│
├── Services
│
├── Availability
│
└── Bookings

Booking
│
├── Pet
│
├── Pet Owner
│
└── Pet Sitter

Review
│
├── Booking
│
└── Pet Sitter

```

This overview illustrates the primary business relationships.

Detailed entity specifications are provided in the following sections.

---

# 7. Naming Conventions

The database follows consistent naming conventions.

## Tables

- Singular business entities
- PascalCase naming

Examples

- User
- Pet
- Booking

---

## Columns

- camelCase
- Descriptive names
- Avoid abbreviations

Examples

- firstName
- createdAt
- updatedAt

---

## Primary Keys

All entities use:

```

id

```

---

## Foreign Keys

Relationships use:

```

{relatedEntity}Id

```

Examples

- userId
- petId
- bookingId

---

## Audit Fields

Where applicable, entities include:

- createdAt
- updatedAt
- deletedAt
- createdBy
- updatedBy

These fields support auditing and lifecycle management.

---

# 8. Entity Definitions

The following entities represent the core business data required by the WoofBnB platform.

---

## 8.1 User

### Purpose

Represents a registered platform user.

A user may act as:

- Pet Owner
- Pet Sitter
- Administrator

### Core Attributes

- id
- firstName
- lastName
- email
- phoneNumber
- profileImage
- role
- status
- createdAt
- updatedAt

### Relationships

- One User may own multiple Pets.
- One User may create multiple Bookings.
- One User may submit multiple Reviews.

---

## 8.2 Pet

### Purpose

Represents a pet owned by a registered user.

### Core Attributes

- id
- userId
- name
- species
- breed
- age
- weight
- medicalNotes
- createdAt
- updatedAt

### Relationships

- One Pet belongs to one User.
- One Pet may have multiple Bookings.

---

## 8.3 Pet Sitter Profile

### Purpose

Represents the professional profile of a pet sitter.

### Core Attributes

- id
- userId
- biography
- experience
- serviceArea
- averageRating
- reviewCount
- verificationStatus
- createdAt
- updatedAt

### Relationships

- One Pet Sitter belongs to one User.
- One Pet Sitter offers multiple Services.
- One Pet Sitter receives multiple Bookings.
- One Pet Sitter receives multiple Reviews.

---

## 8.4 Service

### Purpose

Defines a service offered by a pet sitter.

### Core Attributes

- id
- petSitterId
- serviceName
- description
- price
- duration
- availabilityStatus
- createdAt
- updatedAt

### Relationships

- One Service belongs to one Pet Sitter.

---

## 8.5 Booking

### Purpose

Represents a booking between a pet owner and a pet sitter.

### Core Attributes

- id
- petId
- petOwnerId
- petSitterId
- serviceId
- bookingDate
- bookingStatus
- notes
- createdAt
- updatedAt

### Relationships

- One Booking belongs to one Pet.
- One Booking belongs to one Pet Owner.
- One Booking belongs to one Pet Sitter.
- One Booking references one Service.
- One Booking may have one Review.

---

## 8.6 Review

### Purpose

Represents customer feedback after a completed booking.

### Core Attributes

- id
- bookingId
- reviewerId
- petSitterId
- rating
- comment
- createdAt

### Relationships

- One Review belongs to one Booking.
- One Review belongs to one Pet Sitter.
- One Review belongs to one User.

---

## 8.7 Availability

### Purpose

Represents a pet sitter's available schedule.

### Core Attributes

- id
- petSitterId
- availableDate
- startTime
- endTime
- status

### Relationships

- One Availability record belongs to one Pet Sitter.

---

## 8.8 Notification

### Purpose

Represents notifications delivered to users.

### Core Attributes

- id
- userId
- title
- message
- notificationType
- isRead
- createdAt

### Relationships

- One Notification belongs to one User.

---

# 9. Relationship Rules

The following relationship rules apply across the database.

- A User may own multiple Pets.
- A User may create multiple Bookings.
- A Pet belongs to one User.
- A Booking references one Pet.
- A Booking references one Pet Sitter.
- A Booking references one Service.
- A completed Booking may generate one Review.
- A Pet Sitter may provide multiple Services.
- A Pet Sitter may define multiple Availability records.
- A User may receive multiple Notifications.

---

# 10. Data Integrity Rules

The database shall enforce the following integrity principles.

- Every entity shall have a unique identifier.
- Required fields shall not be empty.
- Foreign key relationships shall remain valid.
- Orphaned records shall be prevented.
- Audit information shall be maintained where applicable.
- Soft deletion shall preserve historical data when required.

---

# 11. Lifecycle Management

Business entities progress through defined lifecycle states.

Examples include:

### User

- Registered
- Active
- Suspended
- Inactive

---

### Booking

- Requested
- Confirmed
- In Progress
- Completed
- Cancelled

---

### Review

- Submitted
- Published
- Archived

Lifecycle transitions shall follow the business rules defined in the Project Documentation.

---

# 12. Data Validation Principles

The database shall support the integrity of business data through consistent validation principles.

General validation includes:

- Required fields shall contain valid values.
- Identifiers shall be unique.
- Relationships shall reference existing records.
- Invalid or inconsistent data shall be prevented where possible.
- Business validation rules shall be enforced by the application layer.

Database validation shall complement, but not replace, application-level validation.

---

# 13. Indexing Strategy

The indexing strategy shall support efficient retrieval of frequently accessed data.

Priority should be given to:

- Primary identifiers
- Foreign key relationships
- Frequently searched attributes
- Common sorting fields

The implementation of indexes shall be determined during database implementation and optimized based on application usage.

---

# 14. Data Lifecycle

Business data progresses through defined lifecycle stages.

Typical lifecycle activities include:

- Creation
- Modification
- Retrieval
- Archival (where applicable)
- Deletion according to business rules

Historical records should be preserved when required for auditing or reporting.

---

# 15. Data Retention

The platform shall retain business data in accordance with operational and legal requirements.

Retention policies should:

- Preserve active business records.
- Support historical reporting where required.
- Protect user information.
- Allow controlled removal of obsolete data.

Specific retention periods shall be defined as business requirements evolve.

---

# 16. Backup and Recovery Considerations

The platform shall support reliable backup and recovery processes.

Objectives include:

- Protection against accidental data loss.
- Recovery from system failures.
- Preservation of business continuity.
- Support for disaster recovery planning.

Implementation details are maintained within the deployment documentation.

---

# 17. Migration Principles

Database changes shall be managed through controlled migration practices.

Migration activities should:

- Preserve existing business data.
- Maintain schema consistency.
- Support backward compatibility where practical.
- Be documented and version controlled.

The migration strategy shall align with the approved project architecture.

---

# 18. Security Considerations

The database shall support secure handling of application data.

General principles include:

- Protect sensitive information.
- Restrict unauthorized access.
- Maintain data integrity.
- Support auditability.
- Follow approved security practices.

Implementation mechanisms are documented separately.

---

# 19. Design Constraints

The database design shall comply with the architectural constraints defined in system.json.

General constraints include:

- Maintain normalized data structures.
- Preserve referential integrity.
- Use consistent naming conventions.
- Support modular application design.
- Avoid database-specific business logic where practical.
- Maintain compatibility with future technology evolution.

---

# 20. Document Ownership

This document defines the logical database design.

The following implementation details are maintained separately.

| Document                       | Responsibility                            |
| ------------------------------ | ----------------------------------------- |
| 02_SOFTWARE_ARCHITECTURE.md    | Architectural principles                  |
| 04_OPENAPI_SPECIFICATION.md    | Data contracts and API models             |
| 06_BACKEND_TECHNICAL_DESIGN.md | Repository and persistence implementation |
| 07_DEPLOYMENT_ARCHITECTURE.md  | Backup, recovery and infrastructure       |

---

# 21. Document Maintenance

This document shall be reviewed whenever one or more of the following changes occur:

- Business entities are introduced or removed.
- Relationships between entities change.
- Naming conventions are updated.
- Data integrity requirements change.
- Migration strategy changes.
- Architectural database constraints are updated.

Implementation-specific updates shall be documented within the appropriate technical documents.

---

# End of Document
