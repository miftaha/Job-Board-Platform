# Job Nexus

Welcome to **Job Nexus**, a web application designed to streamline job searching and application processes. Built with Next.js, this project provides an intuitive interface for users to browse jobs, view details, and apply for positions seamlessly.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Folder Structure](#folder-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Known Issues](#known-issues)
- [Acknowledgments](#acknowledgments)

## Features

1. **Job Listing**
   - Browse a list of available jobs with details such as title, company, location, and experience level.
2. **Job Details**
   - View detailed information about a specific job, including description, salary, and application options.
3. **API Data Integration**
   - Apply for jobs via `POST /api/jobs/{job_id}/apply/` with `Job` (title), `Resume` (file, optional), and `Cover letter`.
   - Note: Backend response may be slow due to hosting limitations; timeout set to 30 seconds to accommodate potential delays.
4. **User Authentication**
   - Secure login and authentication to manage job applications.
5. **Responsive Design**
   - Optimized for desktop and mobile devices with a clean, user-friendly interface.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn
- Git
- Access to the backend API at `https://alx-project-nexus-pvjg.onrender.com/api`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/miftaha/job-nexus.git
   cd job-nexus
   ```
2. Install dependencies

```bash
npm install

```

3. Start the development server

```bash
npm run dev
```

## Usage

1. Browse Jobs: Navigate to the dashboard to view the list of jobs.
2. View Job Details: Click on a job to see more details and apply.
3. Apply for a Job: Fill out the application form with a cover letter and optionally upload a resume (PDF format, max 5MB), then submit.
4. Authentication: Log in to access protected routes and submit applications.

## API Integration

The application integrates with a backend API hosted at https://alx-project-nexus-pvjg.onrender.com/api. Key endpoints include:

1. GET /api/jobs/: Retrieve the list of jobs.
2. GET /api/jobs/{job_id}/: Retrieve details of a specific job.
3. POST /api/jobs/{job_id}/apply/: Submit a job application.

## Folder Structure

Here’s an overview of the project’s folder structure

job-nexus/
├── public/ # Static assets (e.g., images, favicon)
├── src/ # Source code
│ ├── components/ # Reusable React components
│ │ ├── common/ # Shared UI components (e.g., Button, Input)
│ │ └── layout/ # Layout components (e.g., Sidebar, Footer)
│ ├── constants/ # Constants (e.g., API_BASE_URL)
│ ├── context/ # React context (e.g., AuthContext)
│ ├── lib/ # Utility functions and API helpers
│ │ ├── api/ # API fetch functions (e.g., fetchJobs)
│ │ └── utils/ # General utilities (e.g., decodeJWT)
│ ├── pages/ # Next.js pages
│ │ ├── api/ # API routes (e.g., proxy for /api/jobs/[jobId]/apply)
│ │ ├── jobs/ # Job-related pages (e.g., [id].tsx for job details)
│ │ ├── dashboard.tsx # Dashboard page for job listing
│ │ ├── login.tsx # Login page
│ │ └── \_app.tsx # Custom App for global setup
│ ├── styles/ # Global styles (e.g., globals.css)
│ └── types/ # TypeScript type definitions (e.g., Job type)
├── .env.local # Environment variables (not tracked)
├── next.config.js # Next.js configuration
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation
