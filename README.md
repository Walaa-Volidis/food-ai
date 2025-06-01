# 🍕 FoodieAI - AI-Powered Food Recipe Analyzer
<div align="center">
  <h3>✨ Transform any food photo into a complete recipe with AI-powered analysis ✨</h3>
  <p>A beautiful, animated food app that analyzes food images and provides detailed recipes, cooking instructions, and nutrition information using advanced AI technology.</p>
</div>

## 🌟 Features

### 🎨 **Beautiful Design & Animations**
- **No Tabs Interface** - Smooth single-page flow with seamless transitions
- **Stunning Animations** - Powered by Framer Motion for delightful user interactions
- **Food-Themed UI** - Warm gradients, floating food emojis, and appetizing color schemes
- **Responsive Design** - Perfect experience on desktop, tablet, and mobile devices
- **Glassmorphism Effects** - Modern backdrop blur and transparency effects

### 🤖 **AI-Powered Analysis**
- **Smart Food Detection** - Automatically identifies if uploaded image contains food
- **Recipe Generation** - Creates complete recipes with ingredients and step-by-step instructions
- **Cuisine Classification** - Identifies the type of cuisine (Italian, Asian, Mexican, etc.)
- **Difficulty Assessment** - Rates cooking difficulty (Easy, Medium, Hard)
- **Nutrition Information** - Provides detailed nutritional analysis
- **Cooking Time Estimation** - Estimates preparation and cooking time

### 🚀 **User Experience**
- **Drag & Drop Upload** - Intuitive file upload with drag and drop support
- **Real-time Progress** - Animated progress indicators during analysis
- **Error Handling** - Graceful error messages with helpful suggestions
- **Loading Animations** - Engaging cooking-themed loading animations
- **Image Preview** - Instant preview of uploaded images
- **Smooth Transitions** - Seamless navigation between upload and results

## 🛠️ Technology Stack

### **Frontend**
- **[Next.js 15.3.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 11.11.17](https://www.framer.com/motion/)** - Production-ready motion library

### **Backend & AI**
- **[Groq SDK](https://groq.com/)** - Ultra-fast AI inference for food analysis
- **[AWS S3](https://aws.amazon.com/s3/)** - Secure cloud storage for images
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm/yarn/pnpm** - Package manager
- **Groq API Key** - [Get from Groq](https://groq.com/)
- **AWS Account** - For S3 storage

### 1. Clone the Repository

```bash
git clone https://github.com/walaa-volidis/food-ai.git
cd food-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key_here

# AWS S3 Configuration
AWS_REGION=your_aws_region
ACCESS_KEY=your_aws_access_key
SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic! ✨


### Getting API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

#### AWS S3 Setup
1. Log in to [AWS Console](https://aws.amazon.com/console/)
2. Create an S3 bucket for image storage
3. Create IAM user with S3 permissions
4. Generate access keys
5. Add credentials to your `.env.local` file
