# 🐧 Linux Grandfa - Your AI-Powered Linux Command Line Mentor

Meet **Nesti**, your wise old Linux grandfather in penguin form! An interactive AI chatbot that transforms complex Linux system administration into simple, conversational guidance. Ask Nesti anything about Linux commands, and get instant, practical answers—no jargon, just wisdom.

## ✨ Features

- **AI-Powered Intelligence** - Powered by Google's Gemini 2.5 Flash model
- **Linux-Focused Expertise** - Answers ONLY Linux/Unix system administration questions
- **Image Analysis** - Upload terminal screenshots or config files for analysis
- **Conversational UI** - Retro pixel art terminal interface with smooth interactions
- **Copy to Clipboard** - Easily copy responses for quick reference
- **Real-time Response** - Instant answers with loading indicators
- **Production Ready** - Deployed on Render (backend) & Vercel (frontend)

## 🎮 Live Demo

- **Frontend**: https://linux-grandfa.vercel.app
- **Backend API**: https://linux-grandfa.onrender.com
- **API Docs**: https://linux-grandfa.onrender.com/docs

## 🏗️ Architecture

### Frontend (Next.js + React + TypeScript)
```
LinuxGrandfa-FE/
├── app/
│   ├── components/        # Reusable UI components
│   │   ├── ChatBox.tsx    # Main chat interface
│   │   ├── ChatMessage.tsx # Message display with copy button
│   │   ├── ChatInput.tsx  # Input with image upload
│   │   ├── PixelCard.tsx  # Pixel-art themed container
│   │   ├── PixelButton.tsx # Styled buttons
│   │   └── PixelLogo.tsx  # Animated logo
│   ├── config/           # API configuration
│   ├── services/         # API communication
│   └── page.tsx          # Main page
├── globals.css           # Pixel art styling
└── package.json
```

**Tech Stack:**
- Next.js 16 (React framework)
- React 19 (UI library)
- TypeScript 5 (Type safety)
- Tailwind CSS 4 (Styling)
- Google Fonts (Pixel art fonts)

### Backend (FastAPI + Python)
```
LinuxGrandfa-BE/
├── app/
│   ├── main.py           # FastAPI application
│   ├── config/
│   │   └── settings.py   # Environment configuration
│   ├── models/
│   │   └── chat.py       # Request/response models
│   ├── routers/
│   │   └── chat.py       # API endpoints
│   └── services/
│       └── gemini_service.py # Gemini AI integration
├── requirements.txt
├── render.yaml          # Render deployment config
└── .env.example         # Environment template
```

**Tech Stack:**
- FastAPI 0.109+ (Web framework)
- Uvicorn (ASGI server)
- Google Generative AI (Gemini integration)
- Pydantic (Data validation)

## 🚀 Quick Start

### Frontend (Local Development)

```bash
cd LinuxGrandfa-FE

# Install dependencies
npm install

# Create environment file
echo 'NEXT_PUBLIC_API_URL=http://localhost:8000' > .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

### Backend (Local Development)

```bash
cd LinuxGrandfa-BE

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env and add your Gemini API key from https://aistudio.google.com/apikey

# Run server
uvicorn app.main:app --reload --port 8000

# View API docs at http://localhost:8000/docs
```

## 📋 API Documentation

### Endpoints

#### Chat Endpoint
```
POST /api/chat/
```

**Request:**
```json
{
  "message": "How do I list files in Linux?",
  "images": ["data:image/png;base64,..."]  // Optional
}
```

**Response:**
```json
{
  "response": "Use the 'ls' command to list files...",
  "role": "assistant"
}
```

#### Health Check
```
GET /api/chat/health
GET /health
```

#### API Documentation
```
GET /docs          # Swagger UI
GET /redoc         # ReDoc
```

## 🌐 Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Select `LinuxGrandfa-BE` folder as root
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables:
   - `GEMINI_API_KEY` = Your Gemini API key
   - `CORS_ORIGINS` = Your Vercel frontend URL

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Select `LinuxGrandfa-FE` folder as root
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Your Render backend URL
5. Deploy!

## 🔧 Environment Variables

### Backend (.env)
```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
APP_NAME=LinuxGrandfa API
APP_VERSION=1.0.0
DEBUG=false
CORS_ORIGINS=["http://localhost:3000", "https://yourdomain.com"]
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🎨 UI/UX Features

- **Retro Pixel Art Theme** - 90s terminal aesthetic
- **Responsive Design** - Works on desktop, tablet, and mobile
- **3D Shadow Effects** - Pixel-perfect layered shadows
- **CRT Scan Lines** - Authentic monitor effect
- **Grid Background** - Classic terminal grid pattern
- **Smooth Animations** - Loading indicators and transitions
- **Dark Mode** - Easy on the eyes

## 🤖 AI Behavior

Nesti (the AI) is configured to:
- **Only answer Linux questions** - Redirects off-topic queries
- **Keep responses concise** - 2-4 sentences for simple questions
- **Use simple language** - No technical jargon
- **Provide examples** - Practical use cases when relevant
- **Warn about dangers** - Alerts for destructive commands (rm -rf, etc.)
- **Analyze images** - Detects Linux-related screenshots

## 📦 Project Stats

- **Frontend**: 6 React components + services layer
- **Backend**: RESTful API with 2 main endpoints
- **Code**: 100% TypeScript (frontend) + Python (backend)
- **Database**: Stateless (no DB needed)
- **Deployment**: Fully cloud-native

## 🛠️ Built By

**Steven Madali** - Full-stack developer & Linux enthusiast

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

- 🐛 Report issues on GitHub
- 💬 Ask Nesti anything about Linux
- 📖 Check the API docs at `/docs`

---

**Ready to chat with your Linux mentor?** Start here: [Linux Grandfa](https://linux-grandfa.vercel.app) 

