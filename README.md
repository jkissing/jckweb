# Kissinger Research Group - Modern Academic Website

A modern, responsive academic website for the Kissinger Research Group at the University of Georgia.

## Features

- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Design**: Clean, professional academic aesthetic
- **Easy to Customize**: Simple HTML/CSS/JavaScript structure
- **GitHub Pages Ready**: Can be deployed directly to GitHub Pages
- **Accessible**: Semantic HTML and ARIA labels for better accessibility
- **Fast Loading**: Optimized CSS and JavaScript with smooth animations

## Structure

```
modern-site/
├── index.html              # Homepage
├── research.html           # Research page
├── publications.html       # Publications page
├── members.html            # Team members page
├── databases.html          # Databases page
├── news.html              # Lab news page
├── contact.html           # Contact page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # JavaScript functionality
└── images/                # Image assets
```

## Quick Start

### Local Development

1. Simply open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server
   ```

### Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "main" branch as source
   - Click Save

4. Your site will be live at: `https://yourusername.github.io/your-repo/`

## Customization Guide

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #ba0c2f;      /* UGA red */
    --secondary-color: #000000;     /* Black */
    --text-color: #333;             /* Dark gray */
    --bg-light: #f8f9fa;            /* Light background */
}
```

### Adding Team Members

Edit `members.html` and add member profiles in the appropriate section.

### Adding Publications

Edit `publications.html` and add publications to the list.

### Adding News Items

Edit `news.html` and add news articles using the existing format.

### Adding Images

Place images in the `images/` directory and reference them:
```html
<img src="images/your-image.jpg" alt="Description">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

## License

© 2026 Kissinger Research Group, University of Georgia

## Contact

University of Georgia
Athens, GA 30602

---

Built with modern web standards for optimal performance and accessibility.
