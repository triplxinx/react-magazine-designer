# Magazine Designer

## Project Description

Magazine Designer is a fully-featured web application enabling users to visually create magazine layouts with a WYSIWYG drag-and-drop interface. It allows adding text boxes, images, and vector shapes onto pages sized for print (e.g., A4, Letter). Users can position, resize, and style elements precisely with snapping to a grid for alignment. The application supports multiple pages and exports the entire magazine as a high-quality, print-ready PDF file with accurate dimensions, margins, and DPI settings.

---

## Features

- Drag-and-drop interface for adding and manipulating text, images, and shapes.
- Multiple print page sizes supported (A4, Letter, Legal).
- Precise element positioning and resizing with snapping to a 5mm grid.
- Rich text editing with basic formatting (bold, italic, underline).
- Image upload or placeholder images with resizing and aspect ratio handling.
- Vector shapes (rectangle, circle, line) with customizable fill and stroke.
- Multi-page document management with add/remove page controls.
- Export to print-ready PDF with correct page sizes, margins, and high DPI.
- Responsive and accessible UI with keyboard focus management.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher recommended
- npm (comes with Node.js) or yarn package manager

---

## Installation

Clone the repository and install dependencies:

    git clone https://github.com/yourusername/magazine-designer.git
    cd magazine-designer
    npm install

Or with yarn:

    yarn install

---

## Configuration

Create a `.env` file in the root directory to override default settings or copy from `.env.example`:

    cp .env.example .env

Environment variables available:

- `REACT_APP_DEFAULT_DPI` (default: 300) — DPI for print output.
- `REACT_APP_DEFAULT_PAGE_WIDTH_MM` (default: 210) — Default page width in millimeters.
- `REACT_APP_DEFAULT_PAGE_HEIGHT_MM` (default: 297) — Default page height in millimeters.
- `REACT_APP_DEFAULT_MARGIN_MM` (default: 10) — Page margin in millimeters.
- `REACT_APP_MAX_IMAGE_SIZE_MB` (default: 10) — Max uploaded image size in megabytes.

---

## Running the Application

Start the development server:

    npm start

Or with yarn:

    yarn start

The app will be accessible at `http://localhost:3000` by default.

---

## Building for Production

To build a production-ready optimized bundle:

    npm run build

Or with yarn:

    yarn build

The build output will be in the `build` directory.

---

## Usage Examples

- Use the **Toolbar** at the top to add text boxes, images, or shapes.
- Select page size from the dropdown (A4, Letter, Legal).
- Add or remove pages using the + Page / - Page buttons.
- Navigate between pages with the page number input.
- Drag and resize elements on the page canvas.
- For text, click inside the box to edit content with basic formatting shortcuts:
  - **Ctrl+B**: Bold
  - **Ctrl+I**: Italic
  - **Ctrl+U**: Underline
- For images, upload your own or replace the placeholder image.
- For shapes, select type and adjust fill/stroke colors and stroke width.
- When ready, click **Export PDF** to download the entire magazine as a print-ready PDF.

---

## Troubleshooting

- **PDF export fails or is blank:** Ensure you have at least one page with elements. Try refreshing the page and retrying export.
- **Images not uploading:** Check file type and size limits (default max 10MB). Supported image formats are standard web types (JPEG, PNG, GIF).
- **Elements won't move or resize:** Make sure you click and drag on the element or its resize handle. Snapping restricts movement to grid increments.
- **Page size or DPI not changing:** Confirm `.env` variables are set correctly and restart the app.
- **App does not start:** Verify Node.js version (`node -v`) and reinstall dependencies.

---

## Project Structure

- `package.json` — project dependencies and scripts.
- `.env.example` — example environment variables file.
- `src/index.js` — React app entry point.
- `src/App.js` — main app component managing state and layout.
- `src/components/Toolbar.js` — controls for adding elements and page management.
- `src/components/PageCanvas.js` — renders the magazine pages and their elements.
- `src/components/elements/` — individual draggable/resizable element components:
  - `TextElement.js`
  - `ImageElement.js`
  - `ShapeElement.js`
- `src/components/ExportButton.js` — triggers PDF export.
- `src/utils/pdfGenerator.js` — converts layout to print-ready PDF using jsPDF.
- `src/styles/global.css` — global styles and resets.

---

## Contributing

Contributions are welcome! Please open issues or pull requests on GitHub.

---

## License

This project is licensed under the MIT License.
