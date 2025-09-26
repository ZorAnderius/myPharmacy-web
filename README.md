# myPharmacy

**Your medication, delivered**

myPharmacy is a modern, full-stack web application designed to revolutionize the pharmacy experience. Built with cutting-edge technologies, it offers a seamless platform for managing pharmacies, products, and user experiences with an emphasis on security, performance, and user-friendly design.

🌐 **Live Demo:** [View Live Application](https://my-pharmacy-web-green.vercel.app/)

## Features

### Authentication & Security
- **Secure User Authentication** - JWT token-based authentication with automatic refresh
- **Google OAuth Integration** - One-click login with Google services
- **CSRF Protection** - Built-in CSRF token management for enhanced security
- **Role-based Access Control** - Different access levels for various user types

### Pharmacy Management
- **Multi-Shop Support** - Create and manage multiple pharmacy locations
- **Dynamic Shop Display** - Beautiful grid layout showcasing shop information
- **Real-time Shop Updates** - Instant updates when shops are created or modified
- **Shop Profile Dashboard** - Comprehensive overview of shop performance

### Product Management
- **Product Catalog Management** - Add, edit, and manage medicine inventory
- **Advanced Search & Filtering** - Smart search with category-based filtering
- **Image Upload Support** - Product photos with automatic optimization
- **Stock Management** - Real-time inventory tracking and status updates

### User Experience
- **Personal Profile Management** - Avatar upload, profile customization
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX** - Beautiful animations, hover effects, and intuitive design
- **Real-time Loading States** - Smooth loading transitions and error handling

### Data Management
- **Centralized State Management** - Redux Toolkit for efficient data handling
- **Persistent Storage** - Redux Persist for session continuity
- **Optimistic Updates** - Immediate UI responses with background sync
- **Data Validation** - Comprehensive form validation and error handling

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8 or higher) - Usually comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/myPharmacy-web.git
   cd myPharmacy-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory and configure the following:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_API_TIMEOUT=10000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5179` to view the application.

## Memory Optimization & Build Issues

### If you encounter heap out-of-memory errors during build:

The repository includes optimizations for memory-intensive build processes:

- **Automatic Memory Management** - Build script includes `--max-old-space-size=4096` for larger memory allocation
- **Chunk Splitting** - Bundle is automatically split into vendor, redux, and ui chunks
- **Source Maps Optimization** - Disabled in production for reduced memory usage
- **Node.js Version Control** - `.nvmrc` file ensures consistent Node.js versions

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready static files |
| `npm run preview` | Preview production build locally |
| `npm start` | Launch production server |
| `npm run lint` | Run ESLint for code quality checks |

## Tech Stack

### Frontend Framework
- **React 19** - Latest version with cutting-edge features
- **Vite** - Lightning-fast build tool and development server
- **React Router DOM** - Client-side routing and navigation

### State Management
- **Redux Toolkit** - Modern Redux with simplified setup
- **Redux Persist** - Session and state persistence
- **React Redux** - Official React bindings for Redux ya

### Styling & UI
- **CSS Modules** - Scoped styling approach
- **Modern CSS** - Flexbox, Grid, CSS Variables
- **Responsive Design** - Mobile-first approach
- **Custom Variables** - Consistent theming system

### Authentication & Security
- **Axios** - HTTP client with interceptors
- **JWT Handling** - Secure token management
- **CSRF Protection** - Cross-site request forgery prevention
- **Input Sanitization** - XSS protection

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Modern Normalize** - CSS reset and normalization
- **Hot Module Replacement** - Instant development updates

## Project Structure

```
myPharmacy-web/
├── src/
│   ├── app/
│   │   ├── providers/         # Service providers & API configuration
│   │   └── routes/           # Routing configuration
│   ├── assets/
│   │   ├── css/              # Global stylesheets
│   │   ├── img/              # Static images
│   │   └── fonts/            # Custom fonts
│   ├── components/           # Reusable components (within pages/)
│   ├── constants/            # Application constants
│   ├── features/            # Feature-specific modules (Loader)
│   ├── pages/               # Page components
│   ├── redux/               # Redux state management
│   ├── shared/              # Shared utilities & components
│   ├── utils/               # Utility functions
│   └── widgets/             # Complex UI widgets
├── public/                  # Static public assets
└── package.json             # Project dependencies
```

## Key Features Breakdown

### Pharmacy Dashboard
- **Grid Layout** - Beautiful 2-column responsive grid for shop display
- **Hover Effects** - Elegant card animations with shadow effects
- **Dynamic Loading** - Real-time shop data updates without page refresh
- **Modal Forms** - Smooth overlay forms for shop creation and editing

### Authentication Flow
- **Token Persistence** - Seamless user session management
- **Auto-refresh Tokens** - Background token renewal
- **Protected Routes** - Secure access control for authenticated users
- **Logout Cleanup** - Complete session and storage cleanup

### Security Implementation
- **Cross-barrier Protection** - Comprehensive security layers
- **Input Validation** - Client and server-side validation
- **Secure Headers** - CSRF and authorization headers
- **Data Sanitization** - XSS and injection protection

### User Interface
- **Component-based Architecture** - Modular and maintainable code
- **CSS Modules** - Scoped styling for component isolation
- **Responsive Design** - Perfect experience on all devices
- **Accessibility** - WCAG compliant design principles

## Deployment

### Production Build
```bash
npm run build
```

This creates a `dist/` directory with optimized, production-ready files.

### Memory-Optimized Build (for platforms like Render)
```bash
npm run build:render
```

Special build command with memory allocation for deployment platforms.

### Deployment Platforms
- **Vercel** - Instant deployment for frontend applications ⭐ **[Currently Live](https://my-pharmacy-web-green.vercel.app/)**
- **Netlify** - Continuous deployment from Git repositories  
- **Render** - Full-stack hosting solution (includes `render.yaml`)
- **GitHub Pages** - Free hosting for public repositories

**Current Deployment Status:** ✅ **Live on Vercel**
- **URL:** https://my-pharmacy-web-green.vercel.app/
- **Auto-deployment:** Connected to GitHub repository
- **Status:** Active and operational

### Production Server
```bash
npm start
```

Launches the production server using the `serve` package.

### Render.com Specific Setup
The project includes a `render.yaml` configuration file for easy deployment:

1. Connect your GitHub repository to Render
2. Import the repository 
3. Render will automatically detect the `render.yaml` file
4. The build will run with optimized memory settings

## Configuration

### Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_API_TIMEOUT=10000
NODE_ENV=production
```

### Build Configuration
The project uses Vite for bundling and optimization. Configuration is located in `vite.config.js`.

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** - `git checkout -b feature/AmazingFeature`
3. **Commit your changes** - `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch** - `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact & Support

For questions, support, or collaboration opportunities:

- **Live Demo**: https://my-pharmacy-web-green.vercel.app/
- **Email**: your-email@domain.com
- **Collaboration**: Get in touch through the provided channels

---

<div align="center">

**Made with ❤️ for Healthcare Innovation**

*Revolutionizing the pharmacy experience, one application at a time*

[**Try the Live Demo**](https://my-pharmacy-web-green.vercel.app/)

</div>

## 🌟 Acknowledgments

Thanks to all contributors and the open-source community for making this project возможным.

**Special mentions:**
- React team for the amazing framework
- Vite for the blazing-fast build process
- Redux Toolkit for state management excellence
- All beta testers who helped refine the user experience

---
