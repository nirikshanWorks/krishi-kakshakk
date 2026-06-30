#!/bin/bash

# Installation script for Crop Recommendation Engine on Mac/Linux

echo ""
echo "===================================="
echo "Crop Recommendation Engine Installer"
echo "===================================="
echo ""

echo "Step 1: Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi
echo "Backend dependencies installed successfully!"
echo ""

cd ..

echo "Step 2: Installing Frontend Dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi
echo "Frontend dependencies installed successfully!"
echo ""

cd ..

echo ""
echo "===================================="
echo "Installation Complete!"
echo "===================================="
echo ""
echo "Next Steps:"
echo "1. Navigate to backend folder: cd backend"
echo "2. Create .env file and add API keys"
echo "3. Run: npm start"
echo ""
echo "In a NEW terminal window:"
echo "1. Navigate to frontend folder: cd frontend"
echo "2. Run: npm start"
echo ""
echo "Frontend will open at: http://localhost:3000"
echo "Backend runs at: http://localhost:5000"
echo ""
