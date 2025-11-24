# ISKCON Bhakti Center - Donation Management System
## Technical Specification Document

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Database Design](#database-design)
6. [API Specifications](#api-specifications)
7. [Frontend Components](#frontend-components)
8. [User Flows](#user-flows)
9. [Security & Authentication](#security--authentication)
10. [Deployment Architecture](#deployment-architecture)
11. [Development Guidelines](#development-guidelines)

---

## Executive Summary

The ISKCON Bhakti Center Donation Management System is a comprehensive web application designed to streamline donation tracking, donor management, receipt generation, and reporting for the ISKCON organization. This system aims to provide transparency, efficiency, and ease of use for both administrators and donors.

### Key Objectives
- **Donor Management**: Maintain comprehensive donor profiles and histories
- **Donation Tracking**: Real-time tracking of all donations with categorization
- **Receipt Generation**: Automated tax receipt generation and distribution
- **Reporting & Analytics**: Advanced reporting capabilities for financial insights
- **Security**: Robust authentication and data protection mechanisms

---

## Project Overview

### Purpose
To create a modern, scalable, and secure donation management platform that enables ISKCON Bhakti Center to:
- Track donations efficiently
- Manage donor relationships
- Generate compliance-ready tax receipts
- Provide real-time analytics and reports
- Ensure data security and privacy

### Target Users
1. **Admin Users**: Full system access including configuration and user management
2. **Staff Users**: Donation entry, donor management, and basic reporting
3. **Donors**: Self-service portal for viewing donation history and downloading receipts
4. **Accountants**: Financial reporting and reconciliation

### Core Features

#### 1. Donor Management
- Create, update, and manage donor profiles
- Track donor contact information and preferences
- Maintain donation history per donor
- Support for individual and organizational donors
- Communication preferences and consent management

#### 2. Donation Processing
- Multiple donation types (one-time, recurring, campaign-specific)
- Various payment methods (cash, check, online, UPI, card)
- Multi-currency support
- Campaign and program categorization
- Anonymous donation support

#### 3. Receipt Management
- Automatic receipt generation upon donation
- 80G tax receipt generation for Indian donors
- PDF receipt download and email distribution
- Bulk receipt generation for year-end
- Receipt template customization

#### 4. Reporting & Analytics
- Dashboard with key metrics
- Donation trends and analytics
- Donor retention reports
- Campaign performance tracking
- Financial reports (daily, monthly, quarterly, annual)
- Export capabilities (Excel, PDF, CSV)

#### 5. User Management
- Role-based access control (RBAC)
- Multi-level permission system
- Audit logs for all activities
- User activity tracking

---

## Technology Stack

### Frontend
```
Technology: React 18.x
Language: TypeScript
State Management: Redux Toolkit / Zustand
UI Framework: Material-UI (MUI) / Ant Design
Form Handling: React Hook Form + Zod validation
Data Fetching: React Query / TanStack Query
Routing: React Router v6
Charts & Visualization: Recharts / Chart.js
PDF Generation: jsPDF / react-pdf
HTTP Client: Axios
Build Tool: Vite
Testing: Jest, React Testing Library
```

### Backend
```
Framework: NestJS 10.x
Language: TypeScript
ORM: TypeORM / Prisma
Authentication: Passport.js (JWT, Local Strategy)
Validation: class-validator, class-transformer
Documentation: Swagger/OpenAPI
File Upload: Multer
Email: Nodemailer
PDF Generation: PDFKit / Puppeteer
Task Scheduling: Bull Queue with Redis
Logging: Winston
Testing: Jest, Supertest
```

### Database
```
Primary Database: PostgreSQL 15.x
Cache Layer: Redis 7.x
File Storage: AWS S3 / Local Storage
```

### DevOps & Infrastructure
```
Containerization: Docker
Orchestration: Docker Compose (Development)
CI/CD: GitHub Actions / GitLab CI
Hosting: AWS / DigitalOcean / Vercel (Frontend) + Railway/Render (Backend)
Reverse Proxy: Nginx
SSL/TLS: Let's Encrypt
Monitoring: PM2, Sentry
```

---

## System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WebApp[React Web Application]
        MobileApp[Mobile Browser]
    end

    subgraph "API Gateway Layer"
        NGINX[Nginx Reverse Proxy]
        SSL[SSL/TLS Termination]
    end

    subgraph "Application Layer"
        API[NestJS API Server]
        Auth[Authentication Service]
        Email[Email Service]
        PDF[PDF Generation Service]
        Queue[Background Job Queue]
    end

    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL Database)]
        Redis[(Redis Cache)]
        S3[File Storage - S3]
    end

    subgraph "External Services"
        Payment[Payment Gateway]
        SMS[SMS Gateway]
        EmailProvider[Email Provider - SMTP]
    end

    WebApp --> NGINX
    MobileApp --> NGINX
    NGINX --> SSL
    SSL --> API
    
    API --> Auth
    API --> Email
    API --> PDF
    API --> Queue
    
    Auth --> PostgreSQL
    API --> PostgreSQL
    API --> Redis
    Queue --> Redis
    PDF --> S3
    
    Email --> EmailProvider
    API --> Payment
    API --> SMS
```

### Component Architecture

```mermaid
graph LR
    subgraph "Frontend Components"
        A[App Shell]
        B[Auth Module]
        C[Dashboard Module]
        D[Donor Module]
        E[Donation Module]
        F[Receipt Module]
        G[Reports Module]
    end

    subgraph "Backend Modules"
        H[Auth Module]
        I[Users Module]
        J[Donors Module]
        K[Donations Module]
        L[Receipts Module]
        M[Reports Module]
        N[Campaigns Module]
    end

    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G

    B -.API Calls.-> H
    C -.API Calls.-> K
    D -.API Calls.-> J
    E -.API Calls.-> K
    F -.API Calls.-> L
    G -.API Calls.-> M
```

---

## Database Design

### Entity-Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ AUDIT_LOGS : creates
    USERS {
        uuid id PK
        varchar email UK
        varchar password_hash
        varchar first_name
        varchar last_name
        varchar phone
        enum role "ADMIN, STAFF, DONOR, ACCOUNTANT"
        enum status "ACTIVE, INACTIVE, SUSPENDED"
        timestamp created_at
        timestamp updated_at
        timestamp last_login
    }

    DONORS ||--o{ DONATIONS : makes
    DONORS ||--o{ DONOR_ADDRESSES : has
    DONORS {
        uuid id PK
        varchar donor_code UK
        enum donor_type "INDIVIDUAL, ORGANIZATION"
        varchar first_name
        varchar last_name
        varchar organization_name
        varchar email
        varchar phone
        varchar pan_number UK
        varchar aadhar_number
        date date_of_birth
        enum communication_preference "EMAIL, SMS, BOTH, NONE"
        boolean consent_80g
        boolean is_anonymous
        enum status "ACTIVE, INACTIVE"
        timestamp created_at
        timestamp updated_at
        uuid created_by FK
    }

    DONOR_ADDRESSES {
        uuid id PK
        uuid donor_id FK
        enum address_type "HOME, OFFICE, MAILING"
        varchar address_line1
        varchar address_line2
        varchar city
        varchar state
        varchar country
        varchar postal_code
        boolean is_primary
        timestamp created_at
    }

    DONATIONS ||--|| RECEIPTS : generates
    DONATIONS ||--o{ DONATION_ITEMS : contains
    DONATIONS }o--|| CAMPAIGNS : belongs_to
    DONATIONS }o--|| DONORS : from
    DONATIONS {
        uuid id PK
        varchar donation_number UK
        uuid donor_id FK
        uuid campaign_id FK
        decimal amount
        varchar currency
        enum donation_type "ONE_TIME, RECURRING, PLEDGE"
        enum payment_method "CASH, CHECK, ONLINE, UPI, CARD, BANK_TRANSFER"
        varchar payment_reference
        date donation_date
        enum status "PENDING, COMPLETED, CANCELLED, REFUNDED"
        text notes
        boolean is_anonymous
        uuid received_by FK
        timestamp created_at
        timestamp updated_at
    }

    DONATION_ITEMS {
        uuid id PK
        uuid donation_id FK
        uuid fund_id FK
        decimal amount
        text description
        timestamp created_at
    }

    CAMPAIGNS ||--o{ DONATIONS : receives
    CAMPAIGNS {
        uuid id PK
        varchar code UK
        varchar name
        text description
        decimal target_amount
        decimal current_amount
        date start_date
        date end_date
        enum status "DRAFT, ACTIVE, COMPLETED, CANCELLED"
        varchar image_url
        timestamp created_at
        timestamp updated_at
        uuid created_by FK
    }

    FUNDS {
        uuid id PK
        varchar code UK
        varchar name
        text description
        enum category "GENERAL, CONSTRUCTION, EDUCATION, FOOD, FESTIVAL"
        boolean is_active
        timestamp created_at
    }

    RECEIPTS ||--|| DONATIONS : for
    RECEIPTS {
        uuid id PK
        varchar receipt_number UK
        uuid donation_id FK
        uuid donor_id FK
        decimal total_amount
        date receipt_date
        enum receipt_type "REGULAR, 80G, ANNUAL"
        varchar pdf_url
        boolean is_sent
        timestamp sent_at
        timestamp created_at
        uuid generated_by FK
    }

    RECURRING_SCHEDULES ||--o{ DONATIONS : generates
    RECURRING_SCHEDULES {
        uuid id PK
        uuid donor_id FK
        uuid campaign_id FK
        decimal amount
        enum frequency "DAILY, WEEKLY, MONTHLY, QUARTERLY, YEARLY"
        date start_date
        date end_date
        date next_donation_date
        enum status "ACTIVE, PAUSED, CANCELLED, COMPLETED"
        integer occurrences_count
        integer max_occurrences
        timestamp created_at
        timestamp updated_at
    }

    AUDIT_LOGS {
        uuid id PK
        uuid user_id FK
        varchar entity_type
        uuid entity_id
        enum action "CREATE, UPDATE, DELETE, VIEW"
        jsonb old_values
        jsonb new_values
        varchar ip_address
        varchar user_agent
        timestamp created_at
    }

    SETTINGS {
        uuid id PK
        varchar key UK
        text value
        enum data_type "STRING, NUMBER, BOOLEAN, JSON"
        text description
        timestamp updated_at
        uuid updated_by FK
    }

    FUNDS ||--o{ DONATION_ITEMS : allocated_to
    RECURRING_SCHEDULES }o--|| DONORS : for
    RECURRING_SCHEDULES }o--|| CAMPAIGNS : supports
```

### Database Schema Details

#### Key Tables Description

**USERS**
- Manages system users (admin, staff, accountants)
- Implements role-based access control
- Tracks authentication and session data

**DONORS**
- Central repository for all donor information
- Supports both individual and organizational donors
- Includes PAN for 80G tax deduction compliance
- Tracks communication preferences and consent

**DONATIONS**
- Records all donation transactions
- Supports multiple payment methods and types
- Links to donors and campaigns
- Maintains audit trail with received_by field

**RECEIPTS**
- Auto-generated for each donation
- Supports 80G tax receipts
- Stores PDF URL for download
- Tracks email delivery status

**CAMPAIGNS**
- Time-bound fundraising initiatives
- Tracks progress against targets
- Can be linked to multiple donations

**FUNDS**
- Categorizes donations by purpose
- Enables fund-wise reporting
- Supports specific allocation tracking

**RECURRING_SCHEDULES**
- Manages recurring donation schedules
- Auto-generates donations based on frequency
- Supports multiple recurrence patterns

**AUDIT_LOGS**
- Complete audit trail of all system activities
- Stores before/after values for changes
- Tracks user actions and IP addresses

---

## API Specifications

### Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.iskcon-donations.org/api/v1
```

### Authentication Endpoints

#### POST /auth/register
Create new user account
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91-9876543210",
  "role": "STAFF"
}

Response: 201 Created
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STAFF",
  "createdAt": "2025-11-23T12:00:00Z"
}
```

#### POST /auth/login
User authentication
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "accessToken": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "STAFF"
  }
}
```

#### POST /auth/refresh
Refresh access token
```json
Request:
{
  "refreshToken": "refresh_token_here"
}

Response: 200 OK
{
  "accessToken": "new_jwt_token_here"
}
```

### Donor Endpoints

#### GET /donors
List all donors with pagination and filters
```
Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- search: string (search in name, email, phone)
- status: ACTIVE | INACTIVE
- donorType: INDIVIDUAL | ORGANIZATION
- sortBy: firstName | lastName | createdAt
- order: ASC | DESC

Response: 200 OK
{
  "data": [
    {
      "id": "uuid",
      "donorCode": "DN0001",
      "firstName": "Ramesh",
      "lastName": "Kumar",
      "email": "ramesh@example.com",
      "phone": "+91-9876543210",
      "donorType": "INDIVIDUAL",
      "status": "ACTIVE",
      "totalDonations": 15000,
      "lastDonationDate": "2025-11-15",
      "createdAt": "2025-01-10T10:00:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

#### POST /donors
Create new donor
```json
Request:
{
  "donorType": "INDIVIDUAL",
  "firstName": "Ramesh",
  "lastName": "Kumar",
  "email": "ramesh@example.com",
  "phone": "+91-9876543210",
  "panNumber": "ABCDE1234F",
  "dateOfBirth": "1985-05-15",
  "consent80g": true,
  "address": {
    "addressLine1": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "postalCode": "400001"
  }
}

Response: 201 Created
{
  "id": "uuid",
  "donorCode": "DN0152",
  "donorType": "INDIVIDUAL",
  "firstName": "Ramesh",
  "lastName": "Kumar",
  "email": "ramesh@example.com",
  "createdAt": "2025-11-23T12:00:00Z"
}
```

#### GET /donors/:id
Get donor details
```json
Response: 200 OK
{
  "id": "uuid",
  "donorCode": "DN0152",
  "donorType": "INDIVIDUAL",
  "firstName": "Ramesh",
  "lastName": "Kumar",
  "email": "ramesh@example.com",
  "phone": "+91-9876543210",
  "panNumber": "ABCDE1234F",
  "status": "ACTIVE",
  "addresses": [
    {
      "addressType": "HOME",
      "addressLine1": "123 Main Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "postalCode": "400001"
    }
  ],
  "statistics": {
    "totalDonations": 45000,
    "donationCount": 12,
    "firstDonationDate": "2024-01-15",
    "lastDonationDate": "2025-11-20"
  }
}
```

#### PUT /donors/:id
Update donor information

#### DELETE /donors/:id
Soft delete donor (changes status to INACTIVE)

### Donation Endpoints

#### GET /donations
List donations with filters
```
Query Parameters:
- page, limit (pagination)
- donorId: uuid
- campaignId: uuid
- status: PENDING | COMPLETED | CANCELLED | REFUNDED
- paymentMethod: CASH | CHECK | ONLINE | UPI | CARD
- startDate: date
- endDate: date
- minAmount: number
- maxAmount: number

Response: Similar pagination structure with donation records
```

#### POST /donations
Create new donation
```json
Request:
{
  "donorId": "uuid",
  "campaignId": "uuid",
  "amount": 5000,
  "currency": "INR",
  "donationType": "ONE_TIME",
  "paymentMethod": "UPI",
  "paymentReference": "UPI123456789",
  "donationDate": "2025-11-23",
  "isAnonymous": false,
  "notes": "For Janmashtami celebration",
  "items": [
    {
      "fundId": "uuid",
      "amount": 3000,
      "description": "Festival fund"
    },
    {
      "fundId": "uuid",
      "amount": 2000,
      "description": "General fund"
    }
  ]
}

Response: 201 Created
{
  "id": "uuid",
  "donationNumber": "DON2025110001",
  "amount": 5000,
  "status": "COMPLETED",
  "receipt": {
    "id": "uuid",
    "receiptNumber": "REC2025110001",
    "pdfUrl": "https://s3.../receipt.pdf"
  },
  "createdAt": "2025-11-23T12:00:00Z"
}
```

#### GET /donations/:id
Get donation details

#### PUT /donations/:id/status
Update donation status (cancel, refund)

### Receipt Endpoints

#### GET /receipts
List receipts

#### GET /receipts/:id
Get receipt details

#### GET /receipts/:id/download
Download receipt PDF

#### POST /receipts/:id/resend
Resend receipt email

#### POST /receipts/bulk-generate
Generate receipts for a date range

### Campaign Endpoints

#### GET /campaigns
List campaigns

#### POST /campaigns
Create campaign

#### GET /campaigns/:id
Get campaign details

#### PUT /campaigns/:id
Update campaign

#### GET /campaigns/:id/donations
Get campaign donations

### Reports Endpoints

#### GET /reports/dashboard
Dashboard statistics
```json
Response: 200 OK
{
  "totalDonations": {
    "today": 45000,
    "thisMonth": 850000,
    "thisYear": 9500000
  },
  "donorStats": {
    "totalDonors": 1250,
    "newDonorsThisMonth": 45,
    "activeDonors": 890
  },
  "recentDonations": [...],
  "topCampaigns": [...],
  "donationTrends": {
    "labels": ["Jan", "Feb", "Mar", ...],
    "data": [125000, 145000, 178000, ...]
  }
}
```

#### GET /reports/donations/summary
Donation summary report with date range and filters

#### GET /reports/donors/retention
Donor retention analysis

#### GET /reports/campaigns/performance
Campaign performance metrics

#### POST /reports/export
Export reports in various formats (Excel, PDF, CSV)

---

## Frontend Components

### Component Hierarchy

```
App
├── AuthLayout
│   ├── LoginPage
│   ├── RegisterPage
│   └── ForgotPasswordPage
│
└── MainLayout
    ├── Header
    │   ├── Logo
    │   ├── Navigation
    │   └── UserMenu
    │
    ├── Sidebar
    │   └── NavigationMenu
    │
    └── Content
        ├── Dashboard
        │   ├── StatsCards
        │   ├── DonationChart
        │   ├── RecentDonations
        │   └── TopCampaigns
        │
        ├── Donors
        │   ├── DonorList
        │   │   ├── SearchBar
        │   │   ├── Filters
        │   │   └── DataTable
        │   ├── DonorForm (Create/Edit)
        │   └── DonorDetails
        │       ├── ProfileInfo
        │       ├── DonationHistory
        │       └── AddressInfo
        │
        ├── Donations
        │   ├── DonationList
        │   ├── DonationForm
        │   └── DonationDetails
        │
        ├── Receipts
        │   ├── ReceiptList
        │   ├── ReceiptViewer
        │   └── BulkReceiptGenerator
        │
        ├── Campaigns
        │   ├── CampaignList
        │   ├── CampaignForm
        │   └── CampaignDetails
        │       ├── ProgressBar
        │       ├── DonationList
        │       └── Analytics
        │
        ├── Reports
        │   ├── ReportBuilder
        │   ├── DonationReports
        │   ├── DonorReports
        │   └── CampaignReports
        │
        └── Settings
            ├── UserManagement
            ├── RoleManagement
            ├── FundManagement
            └── SystemSettings
```

### Key Component Details

#### Dashboard Component
- Real-time statistics cards
- Interactive donation trend charts
- Recent donations table
- Top campaigns widget
- Quick action buttons

#### DonorList Component
Features:
- Advanced search and filtering
- Sortable data table
- Bulk actions (export, email)
- Quick view modal
- Pagination with configurable page size

#### DonationForm Component
Features:
- Donor search/select with autocomplete
- Campaign selection
- Multiple fund allocation
- Payment method selection
- Real-time amount validation
- Receipt preview
- Form validation with Zod schema

#### ReceiptViewer Component
Features:
- PDF preview
- Download button
- Email sending capability
- Print functionality
- Receipt template customization

---

## User Flows

### Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant DB

    User->>Frontend: Enter credentials
    Frontend->>Frontend: Validate form
    Frontend->>API: POST /auth/login
    API->>DB: Query user by email
    DB-->>API: User data
    API->>API: Verify password hash
    API->>API: Generate JWT tokens
    API-->>Frontend: Access & Refresh tokens
    Frontend->>Frontend: Store tokens
    Frontend->>Frontend: Redirect to dashboard
    Frontend->>API: GET /users/profile (with JWT)
    API->>API: Verify JWT
    API-->>Frontend: User profile
    Frontend->>Frontend: Update user state
```

### Donation Creation Flow

```mermaid
sequenceDiagram
    actor Staff
    participant Frontend
    participant API
    participant DB
    participant Queue
    participant EmailService
    participant PDFService

    Staff->>Frontend: Fill donation form
    Frontend->>Frontend: Validate form data
    Frontend->>API: POST /donations
    
    API->>DB: Begin Transaction
    API->>DB: Create Donation record
    API->>DB: Create Donation Items
    API->>DB: Update Campaign amount
    API->>DB: Create Receipt record
    DB-->>API: Donation & Receipt IDs
    API->>DB: Commit Transaction
    
    API->>Queue: Queue PDF generation job
    API-->>Frontend: Donation created (201)
    
    Frontend->>Frontend: Show success message
    Frontend->>Frontend: Navigate to donation details
    
    Queue->>PDFService: Generate receipt PDF
    PDFService->>PDFService: Create PDF from template
    PDFService->>DB: Update receipt with PDF URL
    
    Queue->>EmailService: Send receipt email
    EmailService->>EmailService: Prepare email with PDF
    EmailService-->>Staff: Email sent
    EmailService->>DB: Update receipt sent status
```

### Donor Registration and First Donation Flow

```mermaid
flowchart TD
    Start([Staff receives donor]) --> CheckExists{Donor exists?}
    
    CheckExists -->|No| CreateDonor[Create new donor profile]
    CheckExists -->|Yes| LoadDonor[Load donor profile]
    
    CreateDonor --> FillInfo[Fill donor information]
    FillInfo --> ValidatePAN{Valid PAN?}
    ValidatePAN -->|No| InvalidPAN[Show error message]
    InvalidPAN --> FillInfo
    ValidatePAN -->|Yes| Get80G{80G consent?}
    Get80G -->|Yes| Mark80G[Mark for 80G receipt]
    Get80G -->|No| RegularReceipt[Mark for regular receipt]
    Mark80G --> SaveDonor[Save donor to DB]
    RegularReceipt --> SaveDonor
    
    SaveDonor --> CreateDonation
    LoadDonor --> CreateDonation[Create donation]
    
    CreateDonation --> SelectCampaign{Select campaign?}
    SelectCampaign -->|Yes| ChooseCampaign[Choose from active campaigns]
    SelectCampaign -->|No| GeneralDonation[General donation]
    
    ChooseCampaign --> AllocateFunds
    GeneralDonation --> AllocateFunds[Allocate to funds]
    
    AllocateFunds --> EnterAmount[Enter amount & payment details]
    EnterAmount --> ValidateAmount{Amount valid?}
    ValidateAmount -->|No| ShowError[Show validation error]
    ShowError --> EnterAmount
    ValidateAmount -->|Yes| SubmitDonation[Submit donation]
    
    SubmitDonation --> ProcessPayment[Process & record payment]
    ProcessPayment --> GenerateReceipt[Auto-generate receipt]
    GenerateReceipt --> CreatePDF[Create PDF receipt]
    CreatePDF --> SendEmail{Send email?}
    
    SendEmail -->|Yes| EmailReceipt[Email receipt to donor]
    SendEmail -->|No| PrintReceipt[Print receipt]
    
    EmailReceipt --> UpdateStats[Update statistics]
    PrintReceipt --> UpdateStats
    UpdateStats --> End([Donation complete])
```

### Recurring Donation Processing Flow

```mermaid
flowchart TD
    Start([Cron job triggers]) --> FetchSchedules[Fetch active schedules for today]
    FetchSchedules --> HasSchedules{Any schedules?}
    
    HasSchedules -->|No| End([End])
    HasSchedules -->|Yes| LoopSchedules[For each schedule]
    
    LoopSchedules --> CheckMaxOccurrences{Max occurrences reached?}
    CheckMaxOccurrences -->|Yes| DeactivateSchedule[Deactivate schedule]
    CheckMaxOccurrences -->|No| CheckEndDate{End date passed?}
    
    CheckEndDate -->|Yes| DeactivateSchedule
    CheckEndDate -->|No| CreateDonation[Create donation from schedule]
    
    CreateDonation --> ProcessPayment{Payment successful?}
    ProcessPayment -->|No| LogFailure[Log failure]
    ProcessPayment -->|Yes| GenerateReceipt[Generate receipt]
    
    LogFailure --> NotifyAdmin[Notify admin]
    GenerateReceipt --> SendEmail[Send receipt email]
    SendEmail --> UpdateSchedule[Update next donation date]
    UpdateSchedule --> IncrementCount[Increment occurrence count]
    
    NotifyAdmin --> NextSchedule
    IncrementCount --> NextSchedule{More schedules?}
    DeactivateSchedule --> NextSchedule
    
    NextSchedule -->|Yes| LoopSchedules
    NextSchedule -->|No| End
```

### Report Generation Flow

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant API
    participant DB
    participant ReportService
    participant S3

    User->>Frontend: Select report type & filters
    Frontend->>API: POST /reports/generate
    API->>DB: Query data with filters
    DB-->>API: Result dataset
    
    alt Small dataset (< 1000 rows)
        API->>ReportService: Generate report
        ReportService-->>API: Report data
        API-->>Frontend: Report JSON
        Frontend->>Frontend: Display report
    else Large dataset
        API->>Queue: Queue report generation
        API-->>Frontend: Job queued (202)
        Frontend->>Frontend: Show progress indicator
        
        Queue->>ReportService: Generate report
        ReportService->>DB: Fetch data in chunks
        ReportService->>ReportService: Process & format data
        ReportService->>S3: Upload report file
        S3-->>ReportService: File URL
        ReportService->>DB: Save report metadata
        
        Frontend->>API: Poll /reports/status/:jobId
        API->>DB: Check job status
        DB-->>API: Status & file URL
        API-->>Frontend: Completed with URL
        Frontend->>Frontend: Show download button
        User->>Frontend: Click download
        Frontend->>S3: Download file
    end
```

---

## Security & Authentication

### Authentication Strategy

#### JWT-based Authentication
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), stored in httpOnly cookie
- **Token Rotation**: Refresh tokens are rotated on each use
- **Blacklisting**: Implement token blacklist for logout

#### Password Policy
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character
- Password hashing using bcrypt (cost factor: 12)

### Authorization

#### Role-Based Access Control (RBAC)

```typescript
Roles & Permissions:

ADMIN:
  - Full system access
  - User management
  - System configuration
  - All donor & donation operations
  - All reports
  - Audit log access

STAFF:
  - Create/edit donors
  - Create/edit donations
  - Generate receipts
  - View reports
  - Campaign management

ACCOUNTANT:
  - View all donors & donations
  - Generate financial reports
  - Export data
  - Receipt management
  - Read-only access to campaigns

DONOR (Self-service):
  - View own profile
  - View donation history
  - Download own receipts
  - Update communication preferences
```

### Security Measures

#### API Security
```mermaid
flowchart LR
    Request[API Request] --> RateLimiter{Rate Limit Check}
    RateLimiter -->|Exceeded| Block[429 Too Many Requests]
    RateLimiter -->|OK| CORS{CORS Check}
    CORS -->|Invalid| Reject[403 Forbidden]
    CORS -->|Valid| Auth{Authentication}
    Auth -->|Invalid Token| Unauthorized[401 Unauthorized]
    Auth -->|Valid Token| Authz{Authorization}
    Authz -->|No Permission| Forbidden[403 Forbidden]
    Authz -->|Has Permission| Validate{Input Validation}
    Validate -->|Invalid| BadRequest[400 Bad Request]
    Validate -->|Valid| Sanitize[Sanitize Input]
    Sanitize --> Process[Process Request]
    Process --> Log[Audit Log]
    Log --> Response[Return Response]
```

#### Data Protection
- **Encryption at Rest**: PostgreSQL encryption
- **Encryption in Transit**: TLS 1.3
- **Sensitive Data**: PII fields encrypted at application level
- **PAN Masking**: Display only last 4 digits
- **Data Retention**: Automated data purging after 7 years

#### Input Validation & Sanitization
- Class-validator for DTO validation
- SQL Injection prevention via ORM parameterized queries
- XSS protection with content sanitization
- CSRF protection with tokens
- File upload validation (type, size, content)

#### Audit Logging
All critical operations logged:
- User authentication (success/failure)
- Donor creation/modification
- Donation creation/cancellation
- Receipt generation
- Report exports
- Settings changes
- User role changes

### Compliance

#### Indian Tax Compliance (80G)
- PAN number mandatory for 80G receipts
- Receipt must contain:
  - Organization's 80G registration number
  - Donor's PAN
  - Amount in words and figures
  - Date of donation
  - Authorized signatory
- Annual consolidated receipts

#### Data Privacy (GDPR/PDPA Ready)
- Consent management
- Right to access data
- Right to deletion (anonymization)
- Data portability
- Breach notification mechanism

---

## Deployment Architecture

### Production Deployment Diagram

```mermaid
graph TB
    subgraph "CDN Layer"
        CloudFlare[CloudFlare CDN]
    end

    subgraph "Load Balancer"
        LB[Nginx Load Balancer]
    end

    subgraph "Web Servers"
        WEB1[Nginx Web Server 1]
        WEB2[Nginx Web Server 2]
    end

    subgraph "Application Servers"
        APP1[NestJS Instance 1<br/>PM2]
        APP2[NestJS Instance 2<br/>PM2]
        APP3[NestJS Instance 3<br/>PM2]
    end

    subgraph "Background Workers"
        WORKER1[Worker - Email]
        WORKER2[Worker - PDF Generation]
        WORKER3[Worker - Scheduled Jobs]
    end

    subgraph "Data Layer"
        POSTGRES_PRIMARY[(PostgreSQL Primary)]
        POSTGRES_REPLICA[(PostgreSQL Replica)]
        REDIS_MASTER[(Redis Master)]
        REDIS_SLAVE[(Redis Slave)]
    end

    subgraph "Storage"
        S3[(S3 / Object Storage)]
    end

    subgraph "Monitoring"
        SENTRY[Sentry - Error Tracking]
        CLOUDWATCH[CloudWatch / Monitoring]
    end

    Internet((Internet)) --> CloudFlare
    CloudFlare --> LB
    
    LB --> WEB1
    LB --> WEB2
    
    WEB1 --> APP1
    WEB1 --> APP2
    WEB2 --> APP2
    WEB2 --> APP3
    
    APP1 --> POSTGRES_PRIMARY
    APP2 --> POSTGRES_PRIMARY
    APP3 --> POSTGRES_PRIMARY
    
    APP1 --> REDIS_MASTER
    APP2 --> REDIS_MASTER
    APP3 --> REDIS_MASTER
    
    POSTGRES_PRIMARY -.Replication.-> POSTGRES_REPLICA
    REDIS_MASTER -.Replication.-> REDIS_SLAVE
    
    APP1 --> S3
    APP2 --> S3
    APP3 --> S3
    
    REDIS_MASTER --> WORKER1
    REDIS_MASTER --> WORKER2
    REDIS_MASTER --> WORKER3
    
    WORKER2 --> S3
    WORKER1 --> POSTGRES_PRIMARY
    WORKER2 --> POSTGRES_PRIMARY
    WORKER3 --> POSTGRES_PRIMARY
    
    APP1 -.Logs.-> SENTRY
    APP2 -.Logs.-> SENTRY
    APP3 -.Logs.-> SENTRY
    
    APP1 -.Metrics.-> CLOUDWATCH
    POSTGRES_PRIMARY -.Metrics.-> CLOUDWATCH
    REDIS_MASTER -.Metrics.-> CLOUDWATCH
```

### Deployment Environments

#### Development
```yaml
Frontend:
  Host: localhost:5173
  Build: Vite dev server
  API: http://localhost:3000

Backend:
  Host: localhost:3000
  Runtime: Node.js (direct)
  Database: PostgreSQL (local Docker)
  Redis: Redis (local Docker)
```

#### Staging
```yaml
Frontend:
  Host: staging.iskcon-donations.org
  Hosting: Vercel / Netlify
  Build: Production build
  
Backend:
  Host: api-staging.iskcon-donations.org
  Hosting: Railway / Render
  Instances: 1
  Database: PostgreSQL (managed)
  Redis: Redis (managed)
```

#### Production
```yaml
Frontend:
  Host: donations.iskcon-bhakti.org
  Hosting: Vercel / CloudFlare Pages
  CDN: CloudFlare
  Build: Optimized production build
  
Backend:
  Host: api.iskcon-bhakti.org
  Hosting: AWS EC2 / DigitalOcean
  Instances: 3 (auto-scaling)
  Database: AWS RDS PostgreSQL (Multi-AZ)
  Redis: AWS ElastiCache (cluster mode)
  Storage: AWS S3
  Load Balancer: AWS ALB / Nginx
  
Monitoring:
  APM: Sentry
  Logs: CloudWatch / DataDog
  Uptime: UptimeRobot
```

### CI/CD Pipeline

```mermaid
flowchart LR
    A[Developer Push] --> B[Git Repository]
    B --> C{Branch?}
    
    C -->|feature/*| D[Run Tests]
    C -->|develop| E[Run Tests + Build]
    C -->|main| F[Run Full Pipeline]
    
    D --> D1[Unit Tests]
    D1 --> D2[Lint Check]
    D2 --> D3[Type Check]
    
    E --> E1[Unit Tests]
    E1 --> E2[Integration Tests]
    E2 --> E3[Build]
    E3 --> E4[Deploy to Dev]
    
    F --> F1[All Tests]
    F1 --> F2[Security Scan]
    F2 --> F3[Build Production]
    F3 --> F4[Deploy to Staging]
    F4 --> F5{Manual Approval}
    F5 -->|Approved| F6[Deploy to Production]
    F5 -->|Rejected| F7[Rollback]
    F6 --> F8[Health Check]
    F8 --> F9[Send Notification]
```

### Docker Setup

#### docker-compose.yml for Development
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:3000

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/dms
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret-key
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=dms
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
  redis_data:
```

### Backup Strategy

```mermaid
flowchart TD
    Start([Backup Schedule]) --> DB_Backup[PostgreSQL Backup]
    DB_Backup --> Full{Full Backup?}
    
    Full -->|Daily at 2 AM| FullBackup[Full Database Dump]
    Full -->|Every 4 hours| IncrementalBackup[Incremental Backup]
    
    FullBackup --> Compress[Compress with gzip]
    IncrementalBackup --> Compress
    
    Compress --> Encrypt[Encrypt with GPG]
    Encrypt --> Upload[Upload to S3]
    Upload --> Verify[Verify Upload]
    
    Verify --> Retention{Check Retention}
    Retention --> Delete[Delete old backups]
    Delete --> Notify[Send notification]
    
    Start --> FileBackup[S3 File Backup]
    FileBackup --> Versioning[S3 Versioning Enabled]
    Versioning --> Lifecycle[Lifecycle Policy]
    Lifecycle --> Glacier[Move to Glacier after 90 days]
    
    Notify --> End([Backup Complete])
    Glacier --> End
```

**Retention Policy:**
- Hourly incremental: 24 hours
- Daily full: 30 days
- Weekly full: 12 weeks
- Monthly full: 12 months
- Yearly full: 7 years

---

## Development Guidelines

### Project Structure

#### Frontend Structure
```
frontend/
├── public/
│   └── assets/
├── src/
│   ├── api/                 # API client & endpoints
│   ├── components/          # Reusable components
│   │   ├── common/
│   │   ├── forms/
│   │   └── layout/
│   ├── features/            # Feature-based modules
│   │   ├── auth/
│   │   ├── donors/
│   │   ├── donations/
│   │   ├── receipts/
│   │   └── reports/
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Redux store
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
└── vite.config.ts
```

#### Backend Structure
```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/
│   │   ├── donors/
│   │   ├── donations/
│   │   ├── receipts/
│   │   ├── campaigns/
│   │   └── reports/
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   └── validators/
│   ├── config/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeds/
│   ├── shared/
│   ├── app.module.ts
│   └── main.ts
├── test/
├── .env.example
├── package.json
└── nest-cli.json
```

### Coding Standards

#### TypeScript
- Use strict mode
- Explicit types for function parameters and return values
- Use interfaces for object shapes
- Use enums for fixed sets of values
- Avoid `any` type

#### Naming Conventions
- **Files**: kebab-case (donor-list.component.tsx)
- **Classes**: PascalCase (DonorService)
- **Functions/Variables**: camelCase (getDonorById)
- **Constants**: UPPER_SNAKE_CASE (MAX_UPLOAD_SIZE)
- **Interfaces**: PascalCase with 'I' prefix (IDonor) or without prefix
- **Types**: PascalCase (DonationType)

#### Git Workflow
```
Branch naming:
- feature/add-donor-management
- bugfix/fix-receipt-generation
- hotfix/critical-security-patch
- release/v1.2.0

Commit messages:
- feat: Add donor search functionality
- fix: Resolve receipt PDF generation issue
- docs: Update API documentation
- refactor: Improve donation service
- test: Add unit tests for donor module
- chore: Update dependencies
```

### Testing Strategy

#### Unit Tests
- **Coverage Target**: 80%
- **Framework**: Jest
- Test all service methods
- Test utility functions
- Test custom hooks

#### Integration Tests
- API endpoint testing
- Database integration tests
- Third-party service mocking

#### E2E Tests
- Critical user flows
- Authentication flow
- Donation creation flow
- Receipt generation flow

#### Testing Commands
```bash
# Frontend
npm run test              # Run unit tests
npm run test:coverage     # With coverage report
npm run test:e2e         # E2E tests

# Backend
npm run test              # Run unit tests
npm run test:e2e         # E2E tests
npm run test:cov         # Coverage report
```

### Performance Optimization

#### Frontend
- Code splitting by routes
- Lazy loading of components
- Image optimization
- Memoization of expensive computations
- Virtual scrolling for large lists
- Debouncing user inputs
- Caching API responses

#### Backend
- Database query optimization
- Proper indexing
- Connection pooling
- Caching with Redis
- Pagination for large datasets
- Background job processing
- API response compression

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=ISKCON DMS
VITE_ENABLE_ANALYTICS=false
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dms
DATABASE_POOL_SIZE=10

# Redis
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
EMAIL_FROM=noreply@iskcon-bhakti.org

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=iskcon-dms-files

# Application
APP_URL=http://localhost:5173
MAX_UPLOAD_SIZE=10485760
ALLOWED_FILE_TYPES=.pdf,.jpg,.png

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

---

## Additional Considerations

### Scalability
- Horizontal scaling of API servers
- Database read replicas
- Redis clustering for cache
- CDN for static assets
- Queue-based background processing
- Microservices consideration for future growth

### Monitoring & Observability
- Application Performance Monitoring (APM)
- Error tracking with Sentry
- Custom metrics and dashboards
- Uptime monitoring
- Log aggregation and search
- Database performance monitoring

### Disaster Recovery
- Automated backups
- Multi-region deployment option
- Database point-in-time recovery
- Documented recovery procedures
- Regular disaster recovery drills

### Future Enhancements
1. **Mobile Application**: React Native app for donors
2. **SMS Notifications**: Send donation confirmations via SMS
3. **Payment Gateway Integration**: Online payment acceptance
4. **Automated Thank You**: Personalized thank you emails
5. **Donation Analytics**: Advanced ML-based donor insights
6. **Multi-language Support**: Internationalization (i18n)
7. **Blockchain Integration**: Transparent donation tracking
8. **API for Third-party Integrations**: Public API for partners

---

## Glossary

| Term | Definition |
|------|------------|
| **80G Receipt** | Tax deduction certificate under Section 80G of Income Tax Act |
| **PAN** | Permanent Account Number (Indian tax identifier) |
| **Donor** | Individual or organization making donations |
| **Campaign** | Time-bound fundraising initiative |
| **Fund** | Category or purpose for which donations are collected |
| **Receipt** | Official acknowledgment of donation |
| **Recurring Donation** | Scheduled periodic donations |
| **RBAC** | Role-Based Access Control |
| **JWT** | JSON Web Token for authentication |
| **ORM** | Object-Relational Mapping |

---

## Appendix

### Technology Decision Matrix

| Aspect | Technology | Alternatives Considered | Reason for Selection |
|--------|-----------|------------------------|---------------------|
| Frontend Framework | React | Vue, Angular | Large ecosystem, team expertise |
| Backend Framework | NestJS | Express, Fastify | Built-in architecture, TypeScript |
| Database | PostgreSQL | MySQL, MongoDB | ACID compliance, JSON support |
| Cache | Redis | Memcached | Feature-rich, persistence |
| ORM | TypeORM/Prisma | Sequelize | Type safety, migrations |
| State Management | Redux Toolkit | Context API, MobX | Predictable state, DevTools |
| UI Library | Material-UI | Ant Design, Chakra | Comprehensive components |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-23 | Saurabh Kaushik, Tech Team | Initial specification |
| | | | |

---

**Document Status**: Draft for Review  
**Next Review Date**: 2025-11-30  
**Approval Required**: Project Stakeholders, ISKCON Management

---

*This technical specification is a living document and will be updated as the project evolves.*
