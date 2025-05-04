# Purla Gallery

A showcase application for artisan artists to display their handmade items. This platform allows creators to present their unique products in an elegant, responsive gallery with multilingual support.

<!-- Add a screenshot of your application here -->
<!-- ![Purla Gallery Screenshot](public/purla_screenshot.png) -->

## 🚀 Tech Stack

### Frontend
- **[Next.js](https://nextjs.org/)** (v15.3) - React framework with server-side rendering and static site generation
- **[React](https://react.dev/)** (v19) - UI library for building component-based interfaces
- **[TypeScript](https://www.typescriptlang.org/)** (v5) - Typed JavaScript for better developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4) - Utility-first CSS framework
- **[SASS](https://sass-lang.com/)** - CSS preprocessor for advanced styling
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons

### Backend & CMS
- **[Sanity.io](https://www.sanity.io/)** (v3) - Headless CMS for structured content
- **[Sanity Studio](https://www.sanity.io/studio)** - Customizable content studio
- **[Next-Sanity](https://github.com/sanity-io/next-sanity)** - Sanity integration for Next.js

### Internationalization
- Custom i18n implementation with support for English and Bulgarian

### Development Tools
- **[ESLint](https://eslint.org/)** (v9) - JavaScript/TypeScript linter
- **[Prettier](https://prettier.io/)** (v3.5) - Code formatter
- **[TurboPack](https://turbo.build/pack)** - Next.js bundler for faster development

## 🌟 Features

- **Responsive Design**: Optimized for all device sizes
- **Theme System**: Light, dark, and earthy themes with design tokens
- **Multilingual Support**: English and Bulgarian languages
- **Product Gallery**: Grid layout with responsive cards
- **Product Details**: Individual product pages with images and descriptions
- **CMS Integration**: Content management through Sanity Studio

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Yarn](https://yarnpkg.com/) package manager
- [Git](https://git-scm.com/) for version control

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/purla-gallery.git
   cd purla-gallery
   ```

2. Install dependencies for the main project:
   ```bash
   yarn install
   ```

3. Install dependencies for Sanity Studio:
   ```bash
   cd studio
   yarn install
   cd ..
   ```

### Development

1. Start the Next.js development server:
   ```bash
   yarn dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

2. Start the Sanity Studio development server:
   ```bash
   cd studio
   yarn dev
   ```
   Sanity Studio will be available at [http://localhost:3333](http://localhost:3333)

### Building for Production

1. Build the Next.js application:
   ```bash
   yarn build
   ```

2. Build Sanity Studio:
   ```bash
   cd studio
   yarn build
   ```

### Deployment

- Deploy the Next.js application to [Vercel](https://vercel.com/) or your preferred hosting provider
- Deploy Sanity Studio using `yarn deploy` from the studio directory

## 📁 Project Structure

```
purla-gallery/
├── public/                  # Static assets and localization files
│   ├── locales/             # Translation files
│   │   ├── en/              # English translations
│   │   └── bg/              # Bulgarian translations
├── src/
│   ├── components/          # React components
│   ├── interfaces/          # TypeScript interfaces
│   ├── pages/               # Next.js pages
│   ├── sanity/              # Sanity configuration
│   ├── styles/              # SCSS styles and themes
│   │   ├── design-tokens.scss  # Design system tokens
│   │   └── themes.scss      # Theme definitions
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── studio/                  # Sanity Studio
│   ├── schemaTypes/         # Content schemas
│   └── ...
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
