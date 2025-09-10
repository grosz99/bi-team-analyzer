# Business Intelligence Team Role Analyzer

A React/Next.js application for analyzing Business Intelligence team structure, identifying skill gaps, and getting AI-powered role recommendations.

## Features

- **Pre-populated BI Roles**: 6 default roles with detailed descriptions
- **Editable Role Management**: Add, edit, and delete team roles
- **AI-Powered Analysis**: Get recommendations for new roles and skill gaps using OpenAI
- **Export Functionality**: Export analysis to PDF, CSV, or JSON formats
- **BCG Professional Design**: Clean, professional interface with BCG color scheme

## Setup Instructions

### 1. Fix npm permissions (if needed)
```bash
sudo chown -R $(whoami) ~/.npm-cache
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Follow the prompts to link your project and deploy.

### Option 2: Using GitHub

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and deploy

## OpenAI API Key

The application includes a hardcoded API key for demo purposes. For production use:

1. Get your own API key from [OpenAI](https://platform.openai.com)
2. Update the key in `/utils/openai.js`
3. Consider using environment variables for security

## Project Structure

```
bi-team-analyzer/
├── components/       # React components
├── pages/           # Next.js pages
├── styles/          # Global styles
├── utils/           # Utility functions
├── public/          # Static assets
└── package.json     # Dependencies
```

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- OpenAI API
- jsPDF for PDF export
- Lucide React for icons

## Default Roles

The application comes with 6 pre-configured BI roles:
- Product Owner
- Product Manager
- Product Analyst
- Data Engineer
- Solution Engineer
- Data Visualization Analyst

## Usage

1. Review and edit the current team roles
2. Add strategic objectives for your BI team
3. Describe desired skills and capabilities
4. Click "Analyze Team & Get Recommendations"
5. Review the AI-generated analysis
6. Export results in your preferred format

## Notes

- The application includes fallback analysis results if the OpenAI API fails
- All data is processed client-side for privacy
- Responsive design works on desktop and mobile devices