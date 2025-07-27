# FitFusion.ai Pro - Python Backend + Flutter Frontend

A comprehensive AI-powered fitness platform with Python FastAPI backend and Flutter mobile app.

## 🏗️ Architecture

- **Backend**: Python FastAPI with SQLAlchemy ORM
- **Frontend**: Flutter mobile app with Dart
- **Database**: PostgreSQL with Alembic migrations
- **AI**: OpenAI API integration
- **Deployment**: Docker containers with GitHub Actions

## 🚀 Quick Start

### Backend Setup

```bash
# Clone repository
git clone https://github.com/yourusername/fitfusion-pro.git
cd fitfusion-pro

# Setup Python environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload
```

### Flutter Setup

```bash
# Navigate to Flutter app
cd mobile_app

# Install Flutter dependencies
flutter pub get

# Run the app
flutter run
```

## 📁 Project Structure

```
fitfusion-pro/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── alembic/            # Database migrations
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Python dependencies
├── mobile_app/             # Flutter frontend
│   ├── lib/
│   │   ├── models/         # Data models
│   │   ├── screens/        # UI screens
│   │   ├── services/       # API services
│   │   ├── widgets/        # Reusable widgets
│   │   └── utils/          # Utilities
│   ├── assets/             # Images, fonts
│   └── pubspec.yaml        # Flutter dependencies
├── docker-compose.yml      # Docker setup
├── .github/                # GitHub Actions
└── README.md
```

## 🛠️ Features

### Backend Features
- ✅ FastAPI REST API
- ✅ SQLAlchemy ORM with PostgreSQL
- ✅ JWT Authentication
- ✅ OpenAI AI Integration
- ✅ File upload handling
- ✅ Real-time WebSocket support
- ✅ Comprehensive API documentation

### Flutter Features
- ✅ Cross-platform mobile app
- ✅ Modern Material Design 3
- ✅ Real-time data synchronization
- ✅ Camera integration for food scanning
- ✅ Offline data caching
- ✅ Push notifications
- ✅ Dark/Light theme support

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost/fitfusion

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in production
docker-compose -f docker-compose.prod.yml up --build
```

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Flutter tests
cd mobile_app
flutter test
```

## 📱 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@fitfusion.ai
- 💬 Discord: [Join our community](https://discord.gg/fitfusion)
- 📖 Documentation: [docs.fitfusion.ai](https://docs.fitfusion.ai) 