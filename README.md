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

