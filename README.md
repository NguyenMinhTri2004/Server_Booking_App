# Booking Platform — Full-Stack Microservices

A full-stack accommodation booking platform built with a microservices architecture, featuring real-time availability management, payment processing, and event-driven communication between services.

> **Status:** Active development &nbsp;|&nbsp; `booking-service` (Java): 61 tests passing ✅ &nbsp;|&nbsp; `property-service` (Go): 🚧 In Progress &nbsp;|&nbsp; `search-service` (Java): 🚧 In Progress

---

## 📸 Screenshots

| Home Page | Search Results |
|-----------|---------------|
| ![Home](docs/screenshots/home.png) | ![Search](docs/screenshots/search.png) |

| Hotel Detail | Booking Flow |
|-------------|-------------|
| ![Hotel](docs/screenshots/hotel-detail.png) | ![Booking](docs/screenshots/booking.png) |

| Host Dashboard | Admin Panel |
|----------------|-------------|
| ![Host](docs/screenshots/host-dashboard.png) | ![Admin](docs/screenshots/admin.png) |

---

## 🏗️ Architecture

```
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │     (Port 3001)     │
                    └──────────┬──────────┘
                               │ REST / HTTP
                    ┌──────────▼───────────┐
                    │   Node.js API Gateway │
                    │   Express + JWT       │
                    │   (Port 3000)         │
                    └──┬──────────┬──────┬──┘
                       │          │      │
          gRPC (sync)  │    gRPC  │ gRPC │ (sync)
                       │          │      │
         ┌─────────────▼─┐  ┌─────▼──┐  ┌▼──────────────────┐
         │  booking-     │  │property│  │  search-           │
         │  service ✅   │  │svc 🚧  │  │  service 🚧        │
         │  Java+Spring  │  │Go+Gin  │  │  Java + Spring     │
         │  Port 8081    │  │Port    │  │  Port 8083         │
         │  gRPC :9091   │  │8082    │  │  gRPC :9093        │
         └──────┬───┬────┘  │gRPC    │  └──────────┬─────────┘
                │   │ gRPC  │:9092   │             │ query
                │   └──────►│        │        ┌────▼──────────┐
                │           └───┬────┘        │ Elasticsearch │
                │               │ CDC         │  (Port 9200)  │
                │          ┌────▼──────────┐  └───────────────┘
                │          │   Debezium    │          ▲
                │          │  Kafka Connect│          │ index
                │          └────┬──────────┘          │
                │   ┌───────────▼──────────────┐      │
                └──►│       Kafka Topics        ├──────┘
                    │  booking.created          │ (search-service
                    │  booking.confirmed        │  consumes property.*
                    │  booking.cancelled        │  CDC → indexes ES)
                    │  property.accommodations  │
                    │  property.rooms           │
                    └──────────┬────────────────┘
                               │ async
                    ┌──────────▼────────┐
                    │  notification-    │
                    │  service (TBD)    │
                    └───────────────────┘

  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ Observability (ELK Stack) ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
    All services emit structured JSON logs
  │  Java → Logback JSON  •  Go → zerolog  •  Node.js → winston                  │
    Filebeat (log shipper)
  │       ↓                                                                       │
    Logstash (Port 5044) → Elasticsearch log-* indices → Kibana (Port 5601)
  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

### Communication Strategy

| Channel | Protocol | Use Case |
|---------|----------|----------|
| Client → Gateway | REST / HTTP | Browser compatibility, public API |
| Gateway → Services | **gRPC** | Low latency, type-safe, HTTP/2 multiplexing |
| booking → property | **gRPC** | Validate accommodation exists before booking |
| Services → Kafka | Async events | Fire-and-forget: notifications, payments |
| property DB → Kafka | **Debezium CDC** | Capture row-level changes, sync to search index |
| Kafka → search-service | Async consume | Index accommodation changes into Elasticsearch |

> **Why gRPC internally?** Binary serialization (protobuf) is ~5x faster than JSON. Shared `.proto` contracts enforce API compatibility across Java, Go, and Node.js at compile time.

> **Why Debezium for search sync?** Pulling data on a schedule risks stale reads. Debezium tails the PostgreSQL WAL (Write-Ahead Log) and emits a Kafka event for every INSERT / UPDATE / DELETE — search index stays in sync within seconds, with zero polling overhead.

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=flat&logo=antdesign&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat)

### API Gateway (Node.js)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)

### Booking Service (Java) ✅
![Java](https://img.shields.io/badge/Java_24-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.4-6DB33F?style=flat&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-4169E1?style=flat&logo=postgresql&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=flat&logo=apachekafka&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)

### Property Service (Go) 🚧
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL_16-4169E1?style=flat&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![Gin](https://img.shields.io/badge/Gin-00ADD8?style=flat&logo=go&logoColor=white)
![gRPC](https://img.shields.io/badge/gRPC-244c5a?style=flat&logo=grpc&logoColor=white)

### Search Service (Java) 🚧
![Java](https://img.shields.io/badge/Java_24-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.4-6DB33F?style=flat&logo=springboot&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch_8-005571?style=flat&logo=elasticsearch&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=flat&logo=apachekafka&logoColor=white)
![Debezium](https://img.shields.io/badge/Debezium-FF0000?style=flat&logo=debezium&logoColor=white)

### Inter-Service Communication
![gRPC](https://img.shields.io/badge/gRPC-244c5a?style=flat&logo=grpc&logoColor=white)
![Protobuf](https://img.shields.io/badge/Protocol_Buffers-244c5a?style=flat&logo=google&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=flat&logo=apachekafka&logoColor=white)

### Monitoring & Observability (ELK Stack) 🚧
![Elasticsearch](https://img.shields.io/badge/Elasticsearch_8-005571?style=flat&logo=elasticsearch&logoColor=white)
![Logstash](https://img.shields.io/badge/Logstash-005571?style=flat&logo=logstash&logoColor=white)
![Kibana](https://img.shields.io/badge/Kibana-005571?style=flat&logo=kibana&logoColor=white)
![Filebeat](https://img.shields.io/badge/Filebeat-005571?style=flat&logo=elasticstack&logoColor=white)

### Infrastructure
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Debezium](https://img.shields.io/badge/Debezium-FF0000?style=flat&logo=debezium&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)

---

## ✨ Features

### For Guests
- 🔍 **Search & Filter** — Search accommodations by location, dates, guests, price range
- 🗺️ **Map Integration** — Google Maps with property pins and area exploration
- 📅 **Real-time Availability** — Live room availability check with Redis caching (5-min TTL)
- 💳 **Payment** — Secure checkout via Stripe with full payment flow
- 🎫 **My Trips** — View booking history, upcoming stays, booking details
- ❤️ **Wishlist** — Save and manage favourite accommodations
- 🎁 **Rewards & Wallet** — Points system and wallet balance

### For Hosts
- 🏠 **Become a Host** — Multi-step onboarding flow
- 📊 **Host Dashboard** — Revenue charts, occupancy rates, booking management
- 📆 **Availability Management** — Set available dates and pricing per room
- 👤 **Guest Management** — View guest info, approve/decline bookings

### For Admins
- 📋 **Admin Panel** — Full booking lifecycle management
- 🔄 **Status Management** — PENDING → CONFIRMED → COMPLETED / CANCELLED transitions
- 👥 **User Management** — Access control with role-based permissions (USER / HOST / ADMIN)

---

## 📦 Booking Service — Key Technical Highlights

The `booking-service` is the core domain service written in Java Spring Boot, demonstrating production-grade backend patterns:

### Concurrency Control
```java
// Pessimistic locking prevents double-booking when two users book simultaneously
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT r FROM RoomAvailability r WHERE r.accommodationId = :id AND r.date BETWEEN :from AND :to")
List<RoomAvailability> findByAccommodationIdAndDateBetweenWithLock(...);
```

### Event-Driven Architecture
```
POST /bookings  →  Reserve rooms (DB transaction)
                →  Publish booking.created to Kafka
                →  notification-service sends confirmation email  (async)
                →  payment-service initiates payment flow        (async)
```

### Redis Caching
```java
@Cacheable(value = "availability", key = "#accommodationId + ':' + #checkIn + ':' + #checkOut")
public AvailabilityCheckResponse checkAvailability(...) { ... }

@CacheEvict(value = "availability", allEntries = true)
public void reserveRooms(...) { ... }
```

### Database Schema
```
bookings ──── booking_contacts    (1:1)
         └─── guests              (1:N)
room_availabilities               (managed separately with pessimistic lock)
```

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/bookings` | Create booking + reserve rooms atomically |
| `GET` | `/api/v1/bookings/my` | Get current user's bookings (paginated) |
| `GET` | `/api/v1/bookings/{id}` | Get booking detail |
| `PATCH` | `/api/v1/bookings/{id}/status` | Update status (ADMIN/HOST) |
| `DELETE` | `/api/v1/bookings/{id}` | Cancel booking + restore availability |
| `GET` | `/api/v1/bookings/{id}/guests` | List guests |
| `POST` | `/api/v1/bookings/{id}/guests` | Add guest to booking |
| `DELETE` | `/api/v1/bookings/{id}/guests/{guestId}` | Remove guest |
| `GET` | `/api/v1/availability` | Check room availability for date range |
| `POST` | `/api/v1/availability` | Set availability (HOST) |
| `PUT` | `/api/v1/availability/{id}` | Update available count (HOST) |

### Tests — 61 passing ✅
```
AvailabilityServiceTest    10 tests  — caching, date validation, locking
AvailabilityControllerTest  7 tests  — REST layer, error handling
BookingServiceTest         14 tests  — create flow, status transitions, cancellation
BookingControllerTest      12 tests  — auth headers, validation, pagination
GuestServiceTest            8 tests  — ownership checks, CRUD
GuestControllerTest         7 tests  — REST layer, 403/404 scenarios
BookingEventPublisherTest   3 tests  — Kafka topic routing
```

---

## 🏃 Property Service — Go (🚧 In Progress)

The `property-service` manages accommodation listings and room inventory. Written in Go for high-throughput read operations (search, listing, detail pages).

### Planned Responsibilities
- Accommodation CRUD — create, update, delete listings (HOST)
- Room management — room types, amenities, pricing
- Image management — integrate with Cloudinary
- Search & filter — location, price range, amenities, availability window
- Expose `GET /api/v1/accommodations/{id}/exists` for booking-service validation

### Planned Tech Choices
| Concern | Choice | Reason |
|---------|--------|--------|
| HTTP Framework | Gin | Lightweight, high-performance, idiomatic Go |
| ORM | GORM | Clean PostgreSQL integration |
| Migration | golang-migrate | SQL-first, version controlled |
| Cache | Redis | Property details cached — high read, low write |
| Config | Viper | 12-factor env var management |
| Testing | testify + httptest | Standard Go test patterns |

### Planned API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/accommodations` | Search & filter accommodations |
| `GET` | `/api/v1/accommodations/{id}` | Get accommodation detail |
| `GET` | `/api/v1/accommodations/{id}/exists` | Validate exists (used by booking-service) |
| `POST` | `/api/v1/accommodations` | Create listing (HOST) |
| `PUT` | `/api/v1/accommodations/{id}` | Update listing (HOST) |
| `DELETE` | `/api/v1/accommodations/{id}` | Delete listing (HOST/ADMIN) |
| `GET` | `/api/v1/accommodations/{id}/rooms` | List rooms |
| `POST` | `/api/v1/accommodations/{id}/rooms` | Add room type |

---

## 🔍 Search Service — Java (🚧 In Progress)

The `search-service` provides full-text search and filtering across all accommodations, powered by Elasticsearch. Instead of querying the property-service database on every search request, it maintains a dedicated search index kept in sync via **Debezium CDC** (Change Data Capture).

### CDC Data Pipeline

```
property-service (PostgreSQL)
        │
        │  Debezium Kafka Connect
        │  tails PostgreSQL WAL
        ▼
   Kafka Topics
   property.accommodations   ← INSERT / UPDATE / DELETE events
   property.rooms
        │
        │  search-service (Kafka consumer)
        ▼
   Elasticsearch index
   accommodations            ← full-text + geo + filter queries
```

> Every time a host creates or updates a listing in `property-service`, Debezium captures the WAL change and emits a Kafka event. The search-service consumes it and updates the index — **no polling, no stale reads**.

### Planned Responsibilities
- Consume CDC events from `property.*` Kafka topics → upsert / delete Elasticsearch documents
- Full-text search across name, description, location, amenities
- Geo-distance filtering — find accommodations within N km of a point
- Faceted filtering — price range, type, star rating, available dates
- Expose `GET /api/v1/search/accommodations` for the API gateway

### Planned Tech Choices
| Concern | Choice | Reason |
|---------|--------|--------|
| Search Engine | Elasticsearch 8 | Industry standard full-text + geo search |
| ORM for ES | Spring Data Elasticsearch | Annotation-driven index mapping, clean repository pattern |
| CDC Source | Debezium + Kafka Connect | Zero-polling WAL-based sync, battle-tested at scale |
| Framework | Spring Boot 3.4 | Consistent with booking-service, mature Kafka + ES starters |
| Testing | Testcontainers (ES + Kafka) | Spin up real Elasticsearch in tests |

### Planned API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/search/accommodations` | Full-text + geo + filter search |
| `GET` | `/api/v1/search/accommodations/{id}` | Get indexed accommodation detail |
| `POST` | `/api/v1/search/reindex` | Trigger full re-index (ADMIN) |

---

## 📊 Monitoring & Observability — ELK Stack (🚧 In Progress)

All microservices emit **structured JSON logs** that are aggregated, processed, and visualised through the ELK stack.

### Log Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│                        Services (log sources)                    │
│                                                                  │
│  booking-service    property-service    search-service           │
│  (Logback JSON)     (zerolog JSON)      (Logback JSON)           │
│  api-gateway                                                     │
│  (winston JSON)                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │  structured JSON logs
                    ┌──────▼──────┐
                    │  Filebeat   │  lightweight log shipper
                    │ (Port 5066) │  tails log files / Docker stdout
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Logstash   │  parse · filter · enrich
                    │ (Port 5044) │  add service name, env, trace ID
                    └──────┬──────┘
                           │
                    ┌──────▼───────────────┐
                    │     Elasticsearch    │  index: logs-*
                    │     (Port 9200)      │  retention policy via ILM
                    └──────┬───────────────┘
                           │
                    ┌──────▼──────┐
                    │   Kibana    │  dashboards · Discover · Alerts
                    │ (Port 5601) │
                    └─────────────┘
```

### Kibana Dashboards (Planned)
| Dashboard | Metrics |
|-----------|---------|
| **Service Health** | Error rate, latency p50/p95/p99 per service |
| **Booking Pipeline** | Booking create → confirm → complete funnel |
| **Kafka Lag** | Consumer group lag per topic |
| **Search Performance** | Query latency, cache hit rate, index size |

### Structured Log Format (Java — Logback JSON)
```json
{
  "timestamp": "2025-05-03T10:00:00Z",
  "level": "INFO",
  "service": "booking-service",
  "traceId": "abc123",
  "userId": "u-456",
  "message": "Booking created",
  "bookingId": "b-789",
  "durationMs": 42
}
```

> `traceId` is propagated across service calls (via gRPC metadata / HTTP headers) so a single user request can be traced end-to-end in Kibana.

### Component Roles
| Component | Role | Port |
|-----------|------|------|
| **Filebeat** | Ships log files / Docker stdout to Logstash | 5066 |
| **Logstash** | Parses raw logs, enriches with metadata, routes to Elasticsearch | 5044 |
| **Elasticsearch** | Stores and indexes log documents (`logs-*` indices) | 9200 |
| **Kibana** | Search, visualise, and alert on log data | 5601 |

> Note: Elasticsearch serves **two purposes** in this architecture — search index (`accommodations` index, owned by search-service) and log storage (`logs-*` indices, owned by ELK). Separate index patterns keep them isolated.

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Java 24 (for local booking-service development)

### Run with Docker Compose

```bash
git clone https://github.com/your-username/booking-platform.git
cd booking-platform

# Start all infrastructure + booking-service
docker compose up --build
```

Services will be available at:
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3001 |
| API Gateway | http://localhost:3000 |
| Booking Service | http://localhost:8081 |
| Swagger UI | http://localhost:8081/swagger-ui.html |

### Local Development (booking-service)

```bash
cd Server_Booking_App/booking-service

# Requires PostgreSQL, Redis, Kafka running (use docker compose up postgres redis kafka)
mvn spring-boot:run
```

### Run Tests

```bash
cd Server_Booking_App/booking-service
mvn test
```

---

## 📁 Project Structure

```
booking-platform/
├── Client_Booking_App/              # Next.js 14 frontend
│   ├── pages/                       # File-based routing
│   ├── modules/                     # Feature modules
│   └── zustand/                     # Global state
│
├── Server_Booking_App/              # Backend — Node.js API Gateway + microservices
│   ├── controllers/                 # Express route handlers
│   ├── services/                    # Node.js business logic
│   ├── models/                      # Mongoose schemas
│   ├── middlewares/                 # JWT auth, rate limiting
│   │
│   ├── booking-service/             # ✅ Java Spring Boot — booking domain
│   │   ├── src/main/java/
│   │   │   └── com/bookingapp/bookingservice/
│   │   │       ├── booking/         # Booking CRUD + status management
│   │   │       ├── guest/           # Guest management
│   │   │       ├── availability/    # Room availability + pessimistic locking
│   │   │       ├── event/           # Kafka event publishing
│   │   │       └── common/          # Config, exceptions, response wrappers
│   │   └── src/test/                # 61 unit + integration tests
│   │
│   ├── property-service/            # 🚧 Go — accommodation & room management
│   │   ├── cmd/
│   │   ├── internal/
│   │   │   ├── handler/             # Gin HTTP handlers
│   │   │   ├── service/             # Business logic
│   │   │   ├── repository/          # GORM data access
│   │   │   └── model/               # Domain models
│   │   └── db/migration/            # golang-migrate SQL files
│   │
│   └── search-service/              # 🚧 Java Spring Boot — Elasticsearch + Debezium CDC
│       ├── src/main/java/
│       │   └── com/bookingapp/searchservice/
│       │       ├── search/          # Search API + Elasticsearch repository
│       │       ├── consumer/        # Kafka CDC event consumers
│       │       ├── document/        # Elasticsearch document models
│       │       └── common/          # Config, exception handling
│       └── src/test/                # Testcontainers (ES + Kafka)
│
└── monitoring/                      # 🚧 ELK Stack — centralized logging
    ├── filebeat/
    │   └── filebeat.yml             # Input: Docker stdout, output: Logstash
    ├── logstash/
    │   ├── pipeline/
    │   │   └── booking-platform.conf  # Parse JSON logs, add service metadata
    │   └── logstash.yml
    └── kibana/
        └── dashboards/              # Exported Kibana dashboard JSON
```

---

## 🔐 Authentication Flow

```
Client  →  API Gateway (verifies JWT)
               │
               │  injects X-User-Id, X-User-Role headers
               ▼
        booking-service (trusts headers from gateway)
```

JWT is validated once at the gateway. Downstream services receive user identity via trusted internal headers — no redundant token parsing in each service.

---

## 📈 Roadmap

### 🚧 In Progress
- [ ] `property-service` (Go + Gin) — accommodation CRUD, room management
- [ ] `search-service` (Java + Spring Boot) — Elasticsearch indexing via Debezium CDC
- [ ] ELK Stack — Filebeat + Logstash + Elasticsearch + Kibana centralized logging

### 📋 Planned
- [ ] `notification-service` — Kafka consumer → SendGrid email / Firebase push
- [ ] `payment-service` — Stripe webhook handler, payment lifecycle
- [ ] Kong / NGINX API Gateway migration
- [ ] Kubernetes deployment with Helm charts
- [ ] CI/CD with GitHub Actions

---

## 👤 Author

**Nguyen Minh Tri**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-linkedin)
- Email: nguyenminhtri.vnpt2@gmail.com
