# Feedback Collector

A single-page feedback collector application built with Next.js, React, and Tailwind CSS. It includes both a feedback submission form and an admin view to display all submitted feedback entries.

## Features

- Clean, responsive layout using Tailwind CSS
- Feedback submission form with validation
- Admin view to display all submitted feedback
- Dark/light theme toggle
- Animations and transitions
- Mobile-responsive design
- Form validation with user-friendly messages
- Loading states for better UX
- Timestamps for each submission

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Netlify Forms, Netlify Functions
- **Deployment**: Netlify

## Project Structure

```
feedback-collector/
├── components/
│   ├── FeedbackForm.js     # Feedback submission form
│   └── AdminView.js        # Display for submitted feedback
├── netlify/
│   └── functions/
│       ├── submit-feedback.js  # API endpoint to submit feedback
│       └── get-feedbacks.js    # API endpoint to retrieve feedback
├── app/
│   ├── page.js             # Main Next.js app configuration
│   └── layout.js            # Main application page
│   └── globals.css         # Global styles and Tailwind imports
├── package.json            # Project dependencies
└── netlify.toml            # Netlify deployment configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/feedback-collector.git
   cd feedback-collector
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is configured for easy deployment to Netlify:

1. Push your code to a GitHub repository.
2. Create a new site on Netlify and connect it to your GitHub repository.
3. Netlify will automatically detect the build settings from the `netlify.toml` file.
4. Set up environment variables in the Netlify dashboard:
   - `NETLIFY_API_TOKEN`: Your Netlify personal access token
   - `SITE_ID`: Your Netlify site ID

### Setting Up Netlify Forms

1. Netlify will automatically detect the form in your HTML with the `data-netlify="true"` attribute.
2. After the first form submission, Netlify will create the form in your site's Forms section.
3. You can view all submissions in the Netlify dashboard under the Forms tab.
4. The admin view in your application will use the Netlify API to display submissions.


## Live Demo

You can view the live application at: https://feedbackform-15.netlify.app/

## Credits

Developed by Saksham Jamwal
