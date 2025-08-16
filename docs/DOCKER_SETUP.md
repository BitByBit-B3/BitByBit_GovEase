# Docker Setup Guide for GovEase

This guide provides comprehensive instructions for setting up and running GovEase using Docker.

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git
- 4GB+ available RAM
- 10GB+ available disk space

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/BitByBit-B3/BitByBit_GovEase.git
cd BitByBit_GovEase
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.local.example .env.local

# Edit with your Firebase configuration
nano .env.local
```

### 3. Production Deployment
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f govease

# Access application
open http://localhost:3000
```

## 🔧 Configuration Options

### Production Configuration (docker-compose.yml)
- **Web Server**: Next.js application on port 3000
- **Reverse Proxy**: Nginx with SSL support on ports 80/443
- **Caching**: Redis for session and data caching
- **Auto Updates**: Watchtower for automatic container updates
- **Health Checks**: Built-in health monitoring
- **Logging**: Centralized log collection

### Development Configuration (docker-compose.dev.yml)
- **Hot Reload**: Automatic code reloading
- **Volume Mounting**: Live code changes without rebuilds
- **Debug Mode**: Enhanced error reporting
- **Development Redis**: Isolated cache for testing

## 📁 Docker Services

### Main Application (govease)
```yaml
Image: Custom Next.js build
Ports: 3000
Health Check: HTTP GET /
Resources: 1GB RAM, 2 CPU cores
```

### Nginx Proxy (nginx)
```yaml
Image: nginx:alpine
Ports: 80, 443
SSL: Auto-configured
Load Balancing: Round-robin
```

### Redis Cache (redis)
```yaml
Image: redis:7-alpine
Ports: 6379
Persistence: Yes
Password: Configurable
```

### Watchtower (watchtower)
```yaml
Image: containrrr/watchtower
Function: Auto-updates containers
Schedule: Daily at midnight
Cleanup: Automatic
```

## 🛠️ Development Setup

### Hot Reload Development
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Follow logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development
docker-compose -f docker-compose.dev.yml down
```

### Building Custom Images
```bash
# Build production image
docker build -t govease:latest .

# Build development image
docker build -f Dockerfile.dev -t govease:dev .

# Multi-platform build (ARM64 + AMD64)
docker buildx build --platform linux/amd64,linux/arm64 -t govease:latest .
```

## 🚀 Deployment Commands

### Production Deployment
```bash
# Initial deployment
docker-compose up -d

# Update application
docker-compose pull
docker-compose up -d --force-recreate

# Scale services
docker-compose up -d --scale govease=3

# Backup volumes
docker run --rm -v govease_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data
```

### Health Monitoring
```bash
# Check service health
docker-compose ps

# View detailed container info
docker inspect govease-app

# Monitor resource usage
docker stats

# Check logs
docker-compose logs --tail=50 -f
```

## 🔒 Security Configuration

### SSL/TLS Setup
1. Place SSL certificates in `./ssl/` directory:
   ```
   ssl/
   ├── cert.pem
   └── private.key
   ```

2. Update nginx.conf with SSL configuration:
   ```nginx
   server {
       listen 443 ssl;
       ssl_certificate /etc/nginx/ssl/cert.pem;
       ssl_certificate_key /etc/nginx/ssl/private.key;
   }
   ```

### Environment Security
```bash
# Secure environment file permissions
chmod 600 .env.local

# Use Docker secrets for production
echo "your_secret" | docker secret create firebase_key -
```

## 📊 Monitoring & Logs

### Log Management
```bash
# View all logs
docker-compose logs

# Follow specific service logs
docker-compose logs -f govease

# Export logs to file
docker-compose logs > govease-logs-$(date +%Y%m%d).log

# Rotate logs automatically
docker system prune -f
```

### Performance Monitoring
```bash
# Monitor resource usage
docker stats govease-app

# Check container health
docker healthcheck govease-app

# Memory usage
docker exec govease-app cat /proc/meminfo
```

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

**Container Won't Start**
```bash
# Check container logs
docker logs govease-app

# Inspect container configuration
docker inspect govease-app

# Restart with fresh build
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Firebase Connection Issues**
```bash
# Verify environment variables
docker exec govease-app env | grep FIREBASE

# Test Firebase connectivity
docker exec govease-app curl -f https://firebase.googleapis.com
```

### Performance Optimization
```bash
# Enable buildkit for faster builds
export DOCKER_BUILDKIT=1

# Use multi-stage build caching
docker build --cache-from govease:latest .

# Optimize image size
docker system df
docker image prune -f
```

## 🔄 Backup & Recovery

### Data Backup
```bash
# Backup Redis data
docker exec govease-redis redis-cli BGSAVE

# Backup application data
docker run --rm -v govease_data:/data -v $(pwd):/backup alpine tar czf /backup/data-backup.tar.gz /data

# Backup environment configuration
cp .env.local .env.local.backup
```

### Disaster Recovery
```bash
# Restore from backup
docker run --rm -v govease_data:/data -v $(pwd):/backup alpine tar xzf /backup/data-backup.tar.gz -C /

# Recreate services
docker-compose down
docker-compose up -d

# Verify data integrity
docker exec govease-app npm run health-check
```

## 📈 Scaling

### Horizontal Scaling
```bash
# Scale web application
docker-compose up -d --scale govease=3

# Load balance with nginx
# Update nginx.conf with upstream configuration
```

### Resource Limits
```yaml
# Add to docker-compose.yml
services:
  govease:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
        reservations:
          memory: 512M
          cpus: '0.5'
```

## 🌐 Production Checklist

- [ ] SSL certificates configured
- [ ] Environment variables secured
- [ ] Health checks enabled
- [ ] Log rotation configured
- [ ] Backup strategy implemented
- [ ] Monitoring alerts set up
- [ ] Resource limits defined
- [ ] Security scanning completed
- [ ] Performance testing done
- [ ] Documentation updated

## 📞 Support

For Docker-related issues:
1. Check the logs: `docker-compose logs`
2. Verify configuration: `docker-compose config`
3. Test connectivity: `docker exec govease-app curl localhost:3000`
4. Review documentation: `/docs` directory

## 🔗 References

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Redis Docker Guide](https://hub.docker.com/_/redis)