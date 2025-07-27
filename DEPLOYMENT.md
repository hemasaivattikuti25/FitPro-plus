# FitFusion.ai Pro - Deployment Guide

This guide will help you deploy the FitFusion.ai Pro application to production.

## 🚀 Quick Deployment

### Prerequisites

- Docker and Docker Compose installed
- Git installed
- A server with at least 2GB RAM and 10GB storage
- Domain name (optional but recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fitfusion-pro.git
cd fitfusion-pro
```

### 2. Environment Setup

```bash
# Copy environment example
cp backend/env.example backend/.env

# Edit the environment file
nano backend/.env
```

Update the following variables in `backend/.env`:

```env
# Database
DATABASE_URL=postgresql://fitfusion_user:fitfusion_password@postgres:5432/fitfusion

# Security (Generate a strong secret key)
SECRET_KEY=your-very-secure-secret-key-here

# OpenAI (Get from https://platform.openai.com/)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=False
```

### 3. Deploy with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Initialize Database

```bash
# Run database migrations
docker-compose exec backend alembic upgrade head

# Create initial admin user (optional)
docker-compose exec backend python -c "
from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.core.database import User

db = SessionLocal()
admin_user = User(
    email='admin@fitfusion.ai',
    username='admin',
    hashed_password=get_password_hash('admin123'),
    full_name='Admin User'
)
db.add(admin_user)
db.commit()
db.close()
print('Admin user created successfully!')
"
```

### 5. Access the Application

- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔧 Production Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
```

### 2. SSL Certificate (Optional)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

### 3. Nginx Configuration

Create `/etc/nginx/sites-available/fitfusion`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/fitfusion /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Environment Variables for Production

Create `.env.production`:

```env
# Database
DATABASE_URL=postgresql://fitfusion_user:fitfusion_password@postgres:5432/fitfusion

# Security
SECRET_KEY=your-production-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=False

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760

# AI Settings
AI_MODEL=gpt-3.5-turbo
AI_MAX_TOKENS=1000

# Redis
REDIS_URL=redis://redis:6379
```

### 5. Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: fitfusion_db_prod
    environment:
      POSTGRES_DB: fitfusion
      POSTGRES_USER: fitfusion_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - fitfusion_network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    container_name: fitfusion_redis_prod
    networks:
      - fitfusion_network
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: fitfusion_backend_prod
    env_file:
      - .env.production
    volumes:
      - ./uploads:/app/uploads
    depends_on:
      - postgres
      - redis
    networks:
      - fitfusion_network
    restart: unless-stopped

  frontend:
    build:
      context: ./mobile_app
      dockerfile: Dockerfile.web
    container_name: fitfusion_frontend_prod
    depends_on:
      - backend
    networks:
      - fitfusion_network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  fitfusion_network:
    driver: bridge
```

### 6. Deploy to Production

```bash
# Deploy with production configuration
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 📱 Mobile App Deployment

### Android

```bash
cd mobile_app

# Build APK
flutter build apk --release

# Build App Bundle
flutter build appbundle --release
```

### iOS

```bash
cd mobile_app

# Build iOS
flutter build ios --release

# Archive for App Store
flutter build ipa --release
```

## 🔄 CI/CD with GitHub Actions

### 1. Set up GitHub Secrets

Go to your repository Settings > Secrets and add:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password
- `HOST`: Your server IP
- `USERNAME`: SSH username
- `KEY`: SSH private key

### 2. Automatic Deployment

The GitHub Actions workflow will:

1. Run tests on push to main branch
2. Build Docker images
3. Push to Docker Hub
4. Deploy to your server

## 🛠️ Maintenance

### Backup Database

```bash
# Create backup
docker-compose exec postgres pg_dump -U fitfusion_user fitfusion > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U fitfusion_user fitfusion < backup.sql
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Monitor Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Scale Services

```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3
```

## 🔒 Security Checklist

- [ ] Change default passwords
- [ ] Use strong SECRET_KEY
- [ ] Enable HTTPS
- [ ] Configure firewall
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor logs
- [ ] Rate limiting
- [ ] Input validation

## 📊 Monitoring

### Health Checks

```bash
# Check API health
curl http://localhost:8000/health

# Check database
docker-compose exec postgres pg_isready -U fitfusion_user
```

### Performance Monitoring

```bash
# Monitor resource usage
docker stats

# Check disk usage
df -h

# Monitor memory
free -h
```

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```bash
   docker-compose logs postgres
   docker-compose restart postgres
   ```

2. **Backend Not Starting**
   ```bash
   docker-compose logs backend
   docker-compose exec backend python -c "import app.main"
   ```

3. **Frontend Not Loading**
   ```bash
   docker-compose logs frontend
   docker-compose restart frontend
   ```

### Reset Everything

```bash
# Stop all services
docker-compose down

# Remove volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Start fresh
docker-compose up -d
```

## 📞 Support

For deployment issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Check network connectivity
4. Review the troubleshooting section above
5. Create an issue on GitHub

---

**Happy Deploying! 🚀** 