#!/bin/bash

# Product Data Explorer - Quick Start Script
# This script helps you quickly set up and run the application

set -e

echo "🚀 Product Data Explorer - Quick Start"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm version: $(npm --version)${NC}"
echo ""

# Backend setup
echo -e "${YELLOW}📦 Setting up Backend...${NC}"
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update DATABASE_URL in backend/.env before continuing${NC}"
    echo "Press Enter after updating the .env file..."
    read
fi

echo "Generating Prisma Client..."
npx prisma generate

echo "Running database migrations..."
npx prisma migrate dev --name init || true

echo -e "${GREEN}✅ Backend setup complete!${NC}"
echo ""

# Frontend setup
echo -e "${YELLOW}📦 Setting up Frontend...${NC}"
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

echo -e "${GREEN}✅ Frontend setup complete!${NC}"
echo ""

# Start servers
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "To start the application:"
echo ""
echo "1. Start Backend (in one terminal):"
echo -e "   ${YELLOW}cd backend && npm run start:dev${NC}"
echo ""
echo "2. Start Frontend (in another terminal):"
echo -e "   ${YELLOW}cd frontend && npm run dev${NC}"
echo ""
echo "Then visit: http://localhost:3001"
echo ""
echo "Happy exploring! 🚀"
