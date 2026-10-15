# Sumit Portfolio

A modern personal portfolio website to showcase your skills, projects, experience, education, and contact information.

## Overview

This project is designed as a clean and professional portfolio for a developer or designer. It helps present your work in an attractive way and gives visitors a quick way to learn more about you and get in touch.

## Features

- Responsive portfolio layout
- Hero section with introduction and profile summary
- About section
- Skills and technology stack
- Project showcase / work portfolio
- Experience and education timeline
- Contact section with social links or contact form
- Interactive, rotating 3D Earth with country borders
- Clean and modern design
- Easy to customize for personal branding

## Tech Stack

This project can be built with commonly used frontend technologies such as:
- HTML5
- CSS3
- JavaScript
- React (if used in your project)
- Vite / Next.js / static hosting (depending on setup)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- A modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sumityadav292/Portfolio2
   ```

2. Navigate to the project directory:
   ```bash
   cd sumit-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Run Locally

Start the local development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173` for Vite projects).

If this is a static HTML/CSS portfolio, you can also open `index.html` directly in the browser or run a local server:

```bash
npx serve .
```

### Earth globe assets

The interactive globe in `src/component/pages/1.jsx` loads its Earth texture from
`public/textures/earth.jpg` and country boundaries from
`public/data/countries.geojson`. Keep both files in those locations when
deploying the site. The boundary data is from Natural Earth’s public-domain
1:110m Admin 0 countries dataset; the Earth texture is from the Three.js planet
texture examples.

## Project Structure

```text
sumit-portfolio/
├── public/
│   ├── data/
│   └── textures/
├── src/
├── index.html
├── package.json
├── README.md
└── styles or config files
```

## Customization

You can personalize the portfolio by editing the following:

- `src/App.jsx` or `src/pages` (if using React)
- `src/components` for reusable sections
- `index.html` for basic metadata and page title
- CSS files for colors, fonts, spacing, and layout
- Project data for your own work experience, skills, and social links

## Contact

If you want to connect, feel free to reach out through the contact section or your preferred social profile.

## License

This project is provided as-is for personal use. If you plan to publish or share it publicly, make sure to add the appropriate license that matches your usage.