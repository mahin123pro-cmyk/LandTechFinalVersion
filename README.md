# VUMI — Digital Land Deed & Ownership Verification Platform

A Secure, QR-Based Land Document Verification System for Bangladesh

VUMI is a web-based, mobile-friendly platform designed to help users verify the authenticity and integrity of land deeds using QR codes, SHA-256 cryptographic hashing, and digital signatures. The platform aims to reduce land document forgery, improve transparency, and make document verification faster and more accessible in Bangladesh.

Project Category: Digital Governance & Land Administration
Selected Problem: Deed & Ownership Verification
Target Country: Bangladesh
## 📌 Table of Contents
Overview
Problem Statement
Proposed Solution
Key Features
System Architecture
Technology Stack
System Workflow
Verification Results
Security Approach
Nationwide Implementation Strategy
Team Members
Future Enhancements
Disclaimer
License

## 🌍 Overview

Land document forgery and ownership fraud are significant challenges in Bangladesh. Altered deeds, fragmented records, and complex verification procedures can lead to financial losses, property disputes, and delays in land transactions.

VUMI proposes a digital verification platform that allows users to scan a QR code or enter a unique document ID to check a land document against a trusted digital record.

The platform uses cryptographic hashing to detect document modifications and digital signatures to help establish the authenticity of documents issued by authorized entities.

VUMI is intended to complement existing government land digitization initiatives, providing a simple and accessible verification experience for citizens, property buyers, and authorized officials.

## ❗ Problem Statement

Traditional land document verification can be time-consuming and difficult, particularly when records are fragmented or reliable digital information is not readily accessible.

Key challenges include:

Forged or manipulated land deeds.
Unauthorized modifications to document contents.
Difficulties verifying document authenticity.
Time-consuming manual verification procedures.
Limited access to reliable digital records.
Financial losses and disputes arising from fraudulent documents.

VUMI aims to address these challenges through a secure, technology-driven document verification process.

## 💡 Proposed Solution

VUMI provides a centralized digital verification workflow for land documents.

Authorized personnel register trusted documents in the system. Each registered document receives a unique identifier and a SHA-256 cryptographic hash. Where supported, digital signatures are used to validate the document's source and integrity.

A QR code is generated for each registered document and linked to its verification page.

When a user scans the QR code or enters the document ID, the platform retrieves the corresponding record and performs the applicable verification checks.

The result helps users understand whether the document matches the trusted digital record or requires further investigation.

## ✨ Key Features
1. QR-Based Document Verification

Scan a QR code to access a document's verification page quickly and conveniently.

2. SHA-256 Tamper Detection

Calculate and compare cryptographic hashes to identify changes in a document's contents.

3. Digital Signature Validation

Validate digital signatures using trusted public keys to help establish document origin and integrity.

4. Document ID Lookup

Verify documents using a unique document identifier without requiring a QR code.

5. Secure Administrative Access

Restrict document registration and other sensitive operations to authorized personnel.

6. Document Metadata and Status

Display permitted document information and verification status while protecting sensitive personal data.

7. Audit Trail

Maintain logs of document registration, authorized changes, and verification activities.

8. Bangla Language Support

Provide an accessible experience for Bangla-speaking users.

9. Fraud Reporting

Allow users to flag suspicious documents for review by authorized personnel.

##🏗️ System Architecture

VUMI follows a modular architecture consisting of the frontend, backend API, database, document storage, and verification service.

              ┌────────────────────────┐
              │      User / Official   │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   React.js Frontend    │
              │  QR Scan / Document ID │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Express.js Backend   │
              │      REST API          │
              └────────────┬───────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
   ┌────────────────────┐    ┌────────────────────┐
   │ MongoDB Database   │    │ Verification       │
   │ Trusted Records    │    │ Service            │
   └────────────────────┘    └─────────┬──────────┘
                                       │
                            ┌──────────┴──────────┐
                            ▼                     ▼
                   ┌────────────────┐   ┌────────────────┐
                   │ SHA-256 Hash   │   │ Digital        │
                   │ Comparison     │   │ Signature Check│
                   └────────────────┘   └────────────────┘


Note: This diagram illustrates the proposed architecture. Actual integrations depend on the implemented application and available authorized records.

##🛠️ Technology Stack
Component	Technology	Purpose
Frontend	React.js	User interface and verification pages
Backend	Node.js, Express.js	API endpoints and application logic
Database	MongoDB	Document metadata and verification records
Cryptographic Hashing	SHA-256	Document integrity checking
QR Code Generation	qrcode, qrcode.react	Generate and display QR codes
Digital Signatures	Public-key cryptography	Validate document origin and integrity
Frontend Deployment	Vercel	Host the web application
Backend Deployment	Render	Host the API server
🔄 System Workflow
Step 1: Document Registration

An authorized official uploads a land document and verifies its source according to the applicable registration procedure.

Step 2: Unique ID and Hash Generation

The backend generates a unique document ID and calculates the document's SHA-256 hash.

Step 3: Digital Signature

Where supported, the document or its relevant metadata is digitally signed using an authorized private key. The corresponding public key is used for signature verification.

Step 4: QR Code Generation

The system generates a QR code linked to the document's verification page.

Step 5: User Verification

A user scans the QR code or enters the document ID to retrieve the relevant trusted record.

Step 6: Integrity and Signature Checks

The system compares the submitted document's hash with the stored hash and validates the digital signature where applicable.

Step 7: Verification Result

The system displays the verification outcome and records relevant activity in the audit log.

✅ Verification Results

VUMI can present verification results using the following statuses:

Status	Meaning
Verified	The submitted document matches the trusted record, and applicable signature checks pass.
Document Altered	The submitted document's hash differs from the trusted hash.
Further Verification Required	The record is missing, the signature is invalid or unavailable, or additional checks are necessary.

A verification result indicates document integrity against the system's trusted records. It does not independently establish legal ownership or guarantee that the underlying government record is correct.

🔐 Security Approach

Security is a core consideration in VUMI's design.

Cryptographic hashing: Use SHA-256 to detect changes in document contents.
Digital signatures: Use trusted public-key cryptography to validate signed records.
Access control: Restrict sensitive administrative operations to authorized users.
Audit logging: Record relevant administrative and verification activities.
Data privacy: Expose only the document metadata permitted for public access.
Secure communication: Use HTTPS for communication between clients and the backend.
Credential protection: Store secrets and private keys securely, outside the source code.
Input validation: Validate uploaded files, document identifiers, and API requests.

Important: A hash alone does not prove who issued a document. Digital signatures require a trusted key-management process, and the system must obtain its reference records from an authorized source.

🚀 Getting Started

Follow these steps to run the project locally once the source code and dependencies are available.

Prerequisites
Node.js and npm
MongoDB instance
Git
A code editor, such as Visual Studio Code
1. Clone the Repository
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>


Replace the placeholders with your actual repository URL and directory name.

2. Install Dependencies

For a project with separate frontend and backend directories:

cd backend
npm install

cd ../frontend
npm install


Adjust the directory names to match your repository structure.

3. Configure Environment Variables

Create a .env file in the backend directory and configure the variables required by your application.

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173


These are example settings; the actual variable names and values depend on your implementation.

Never commit database credentials, private keys, or other secrets to version control.

4. Start the Backend
cd backend
npm run dev


Use the appropriate command defined in your backend's package.json.

5. Start the Frontend

In a separate terminal:

cd frontend
npm run dev


Open the local URL printed by the frontend development server.

6. Verify a Document
Open the VUMI application.
Scan a registered document's QR code or enter its document ID.
Review the verification result returned by the backend.

The commands and environment variables above are illustrative and may need adjustment to match the actual project files.

🌏 Nationwide Implementation Strategy
Phase 1: Pilot Testing

Deploy the platform in a selected district using authorized land records and evaluate its usability, security, and verification accuracy.

Phase 2: Regional Expansion

Extend the platform to additional districts and explore integration with government land databases, subject to authorization and technical feasibility.

Phase 3: Nationwide Deployment

Scale the platform through government partnerships, official staff training, public awareness campaigns, and appropriate infrastructure.

Phase 4: Continuous Improvement

Maintain system security, improve reliability, conduct regular audits, and update the platform based on user feedback and regulatory requirements.

🔮 Future Enhancements

Potential future improvements include:

Integration with authorized government land record systems.
Stronger digital identity verification for officials.
Public-key infrastructure and certificate management.
Role-based access control and multi-factor authentication.
Secure document storage and version history.
Bangla and English language switching.
Mobile application support.
Notifications for suspicious verification activity.
Advanced fraud detection and reporting dashboards.
Improved accessibility and support for low-bandwidth connections.

These enhancements depend on implementation priorities, available resources, and relevant government approvals.

👥 Team Members

Team Name: Consonants
Team ID: LA-38

Name	Student ID	Department
Mohaimenur Rahman Mahin	262-15-249	Computer Science and Engineering
Khaled Aman	262-15-641	Computer Science and Engineering
Mentors
Faculty Mentor: Ms. Subarna Akter Liza — Lecturer, CSE
Industry Mentor: MD Shoaib Khan — CSE-TECH
⚖️ Disclaimer

VUMI is a digital document verification initiative intended to help identify potential document tampering and improve access to verification information.

The platform does not replace official land registration procedures, government records, legal ownership determination, or verification by the relevant authorities.

The reliability of verification results depends on the authenticity, accuracy, and authorization of the underlying records and cryptographic keys.

📄 License

A license has not yet been specified. Add an appropriate open-source or project-specific license before distributing the source code publicly.

VUMI — Building Trust in Land Document Verification.

Designed for a more transparent, accessible, and secure digital land administration ecosystem in Bangladesh.
