# 🌍 Open Minds Platform

**Open Minds** is a global, open-source education platform built to make learning **free**, **inclusive**, and **personalized** for everyone, everywhere — even offline.  
We dream of a world where access to knowledge is not a privilege, but a basic right.

---

## ✨ Why Open Minds Matters

Millions of learners worldwide face barriers to quality education due to cost, connectivity, or language. Open Minds breaks down these barriers by providing:

- Free, high-quality learning resources
- Multilingual and community-driven content
- Tools that work even without reliable internet
- Personalized, AI-guided learning for every student

We believe education should empower everyone, everywhere.

---

## 🚀 Our Mission

- **Accessible**: Works even in low-bandwidth regions and basic devices.
- **Multilingual**: Supports many languages and local dialects.
- **Community-powered**: Anyone can contribute courses, lessons, or mentorship.
- **AI-guided**: Personalized learning paths for every student.
- **Offline-first**: Mobile apps and downloadable content for areas without stable internet.

---

## 🏗️ Current Structure

- `/backend` — API, database, and server logic
- `/frontend` — Web application
- `/mobile` — Mobile app (offline-first)
- `/docs` — Documentation and guides

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/chojuninengu/open-minds-platform.git
cd open-minds-platform
```

### 2. Backend Setup (Python Example)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup (React Example)

```bash
cd ../frontend
npm install  # or yarn
npm start    # or yarn start
```

### 4. Mobile Setup (React Native Example)

```bash
cd ../mobile
npm install  # or yarn
npx expo start  # or react-native run-android / run-ios
```

> _Update these instructions as your stack evolves!_

---

## 🤝 How to Contribute

We welcome contributors of all backgrounds! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines (coming soon).

- Open an issue to suggest features or report bugs
- Fork the repo and submit a pull request
- Join our discussions to help shape the future of Open Minds

---

## 📫 Stay Connected

- [Project Board](#) (coming soon)
- [Discussions](#) (coming soon)

---

Together, we can make education a universal right. 🌎🚀

## Live Demo

Visit our website: [Open Minds Platform](https://chojuninengu.github.io/open-minds-platform)

## Features

- Free courses in various subjects
- Community-driven learning
- Modern, responsive design
- Dark mode support
- Mobile-friendly interface

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Heroicons

## Development

To run this project locally:

1. Clone the repository:

```bash
git clone https://github.com/chojuninengu/open-minds-platform.git
cd open-minds-platform
```

2. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions.

To deploy manually:

1. Build the project:

```bash
cd frontend
npm run build
```

2. Push changes to the main branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

3. The GitHub Actions workflow will automatically deploy the changes to GitHub Pages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
