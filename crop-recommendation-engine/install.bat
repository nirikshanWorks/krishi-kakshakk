@echo off
REM Installation script for Crop Recommendation Engine on Windows

echo.
echo ====================================
echo Crop Recommendation Engine Installer
echo ====================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

cd ..

echo Step 2: Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

cd ..

echo.
echo ====================================
echo Installation Complete!
echo ====================================
echo.
echo Next Steps:
echo 1. Navigate to backend folder: cd backend
echo 2. Create .env file and add API keys
echo 3. Run: npm start
echo.
echo In a NEW terminal window:
echo 1. Navigate to frontend folder: cd frontend
echo 2. Run: npm start
echo.
echo Frontend will open at: http://localhost:3000
echo Backend runs at: http://localhost:5000
echo.

pause
