# WoofBnB

# OpenAPI Specification

**Version:** 2.0.0

**Status:** Draft

**Document Owner:** API Architecture

**Last Updated:** 2026-08-06

---

# 1. Purpose

This document defines the REST API contract for the WoofBnB platform.

It specifies the available resources, endpoint groups, request and response models, authentication requirements, status codes, and API conventions.

Implementation details such as controller logic, service implementation, middleware, and database interaction are intentionally excluded.

---

# 2. Related Documents

| Document                       | Purpose                |
| ------------------------------ | ---------------------- |
| system.json                    | API architecture rules |
| 01_PROJECT_DOCUMENTATION.md    | Business requirements  |
| 02_SOFTWARE_ARCHITECTURE.md    | Architecture overview  |
| 03_DATABASE_DESIGN.md          | Data model             |
| 06_BACKEND_TECHNICAL_DESIGN.md | API implementation     |

---

# 3. API Goals

The API has been designed to:

- Provide a consistent interface for all application features.
- Support secure communication between the frontend and backend.
- Remain independent of frontend implementation.
- Maintain compatibility with future production architecture.
- Encourage consistency across all endpoints.

---

# 4. API Principles

The WoofBnB API follows the principles below.

## RESTful Design

Resources are exposed through consistent REST endpoints.

---

## Stateless Communication

Each request contains all information required to process it.

---

## Resource-Oriented

Endpoints represent business resources rather than implementation details.

---

## Consistent Responses

Response structures should remain consistent throughout the API.

---

## Versioning

The API shall support versioning to allow future evolution without breaking existing clients.

---

# 5. Base URL

Prototype

```

/api/v1

```

Future versions may introduce additional API versions while preserving backward compatibility where practical.

---

# 6. Authentication

Protected endpoints require user authentication.

Authentication behavior is defined by the approved architecture in:

- system.json

Implementation details are documented in:

- 06_BACKEND_TECHNICAL_DESIGN.md

---

# 7. Endpoint Groups

The API is organized into the following resource groups.

| Resource       | Purpose                       |
| -------------- | ----------------------------- |
| Authentication | User registration and sign-in |
| Users          | User profile management       |
| Pets           | Pet management                |
| Pet Sitters    | Pet sitter profiles           |
| Services       | Pet sitter services           |
| Availability   | Sitter availability           |
| Search         | Search functionality          |
| Bookings       | Booking management            |
| Reviews        | Ratings and reviews           |
| Dashboard      | User dashboard                |
| Notifications  | User notifications            |

---

# 8. Common Response Structure

Successful responses should follow a consistent format.

Example

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

Error responses should follow the same structure.

```json
{
  "success": false,
  "message": "Unable to process the request.",
  "errors": []
}
```

This structure should remain consistent across all endpoints.

---

# 9. Authentication Endpoints

| Method | Endpoint              | Description                             | Authentication |
| ------ | --------------------- | --------------------------------------- | -------------- |
| POST   | /auth/register        | Register a new user                     | No             |
| POST   | /auth/login           | Authenticate a user                     | No             |
| POST   | /auth/logout          | End the current session                 | Yes            |
| GET    | /auth/me              | Retrieve the current authenticated user | Yes            |
| POST   | /auth/forgot-password | Request password reset                  | No             |
| POST   | /auth/reset-password  | Reset user password                     | No             |

---

# 10. User Endpoints

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | /users/profile | Retrieve current user profile |
| PUT    | /users/profile | Update current user profile   |
| DELETE | /users/profile | Deactivate user profile       |

---

# 11. Pet Endpoints

| Method | Endpoint   | Description              |
| ------ | ---------- | ------------------------ |
| GET    | /pets      | Retrieve registered pets |
| GET    | /pets/{id} | Retrieve pet details     |
| POST   | /pets      | Register a new pet       |
| PUT    | /pets/{id} | Update pet information   |
| DELETE | /pets/{id} | Remove a pet             |

---

# 12. Pet Sitter Endpoints

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| GET    | /sitters      | Retrieve available pet sitters |
| GET    | /sitters/{id} | Retrieve pet sitter profile    |
| POST   | /sitters      | Create sitter profile          |
| PUT    | /sitters/{id} | Update sitter profile          |

---

# 13. Service Endpoints

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| GET    | /services      | Retrieve available services |
| GET    | /services/{id} | Retrieve service details    |
| POST   | /services      | Create a service            |
| PUT    | /services/{id} | Update a service            |
| DELETE | /services/{id} | Remove a service            |

---

# 14. Availability Endpoints

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | /availability      | Retrieve availability |
| POST   | /availability      | Create availability   |
| PUT    | /availability/{id} | Update availability   |
| DELETE | /availability/{id} | Remove availability   |

---

# 15. Search Endpoints

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| GET    | /search         | Search for pet sitters            |
| GET    | /search/nearby  | Retrieve nearby pet sitters       |
| GET    | /search/filters | Retrieve available search filters |

---

# 16. Booking Endpoints

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| GET    | /bookings      | Retrieve bookings        |
| GET    | /bookings/{id} | Retrieve booking details |
| POST   | /bookings      | Create booking request   |
| PUT    | /bookings/{id} | Update booking           |
| DELETE | /bookings/{id} | Cancel booking           |

---

# 17. Review Endpoints

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /reviews      | Retrieve reviews |
| POST   | /reviews      | Submit review    |
| PUT    | /reviews/{id} | Update review    |
| DELETE | /reviews/{id} | Remove review    |

---

# 18. Dashboard Endpoints

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| GET    | /dashboard | Retrieve dashboard data |

---

# 19. Notification Endpoints

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| GET    | /notifications           | Retrieve notifications    |
| PUT    | /notifications/{id}/read | Mark notification as read |
| DELETE | /notifications/{id}      | Delete notification       |

---

# 20. HTTP Status Codes

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | Request completed successfully          |
| 201  | Resource created successfully           |
| 204  | Request completed without response body |
| 400  | Invalid request                         |
| 401  | Authentication required                 |
| 403  | Access denied                           |
| 404  | Resource not found                      |
| 409  | Conflict                                |
| 422  | Validation failed                       |
| 500  | Internal server error                   |

---

# 21. Request Conventions

API requests should follow consistent conventions throughout the application.

General principles include:

- Use JSON for request bodies.
- Use appropriate HTTP methods.
- Include required path and query parameters.
- Validate all incoming data.
- Return meaningful error messages for invalid requests.

---

# 22. Response Conventions

Responses should remain consistent across all endpoints.

Successful responses include:

- Request status
- Informational message
- Response data

Error responses include:

- Request status
- Error message
- Validation errors where applicable

Response formats should remain consistent to simplify client integration.

---

# 23. Validation Rules

All API endpoints shall validate incoming requests before processing.

Validation includes:

- Required fields
- Data format
- Data type
- Business rule validation
- Resource existence
- Authorization checks

Detailed validation logic is implemented by the backend and documented separately.

---

# 24. Error Handling

The API shall provide predictable and consistent error responses.

Errors should:

- Clearly identify the problem.
- Avoid exposing internal implementation details.
- Use appropriate HTTP status codes.
- Provide actionable validation messages where possible.

Unexpected system failures shall return a generic error response.

---

# 25. API Security

The API shall protect application resources through appropriate authentication and authorization mechanisms.

General security principles include:

- Authenticate protected endpoints.
- Authorize access to protected resources.
- Validate all incoming requests.
- Protect sensitive information.
- Follow secure communication practices.

Implementation details are maintained in the backend technical documentation.

---

# 26. API Versioning

The API shall support versioning to maintain backward compatibility as the platform evolves.

General guidelines include:

- Version APIs through the URL path.
- Maintain compatibility within supported versions.
- Introduce breaking changes through new API versions.
- Deprecate outdated versions through a controlled process.

---

# 27. API Documentation

The API shall be documented using the OpenAPI Specification.

Documentation should include:

- Endpoint descriptions.
- Request parameters.
- Response models.
- Authentication requirements.
- Status codes.
- Example requests and responses.

Documentation shall remain synchronized with implementation.

---

# 28. Design Constraints

The API shall comply with the architectural constraints defined in system.json.

General constraints include:

- Follow REST principles.
- Maintain consistent endpoint naming.
- Keep APIs resource-oriented.
- Avoid exposing implementation details.
- Maintain compatibility with the approved architecture.

---

# 29. Document Ownership

This document defines the external API contract.

The following implementation details are maintained separately.

| Document                        | Responsibility                    |
| ------------------------------- | --------------------------------- |
| 02_SOFTWARE_ARCHITECTURE.md     | Architectural principles          |
| 03_DATABASE_DESIGN.md           | Database design                   |
| 05_FRONTEND_TECHNICAL_DESIGN.md | API consumption by the frontend   |
| 06_BACKEND_TECHNICAL_DESIGN.md  | API implementation                |
| 07_DEPLOYMENT_ARCHITECTURE.md   | API deployment and infrastructure |

---

# 30. Document Maintenance

This document shall be reviewed whenever one or more of the following changes occur:

- New API resources are introduced.
- Existing endpoints are modified.
- Authentication requirements change.
- Request or response models change.
- API versioning strategy changes.

Implementation-specific changes shall be documented within the backend technical documentation.

---

# End of Document
