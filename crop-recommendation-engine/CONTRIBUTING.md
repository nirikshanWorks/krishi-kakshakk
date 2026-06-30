# Contributing to Crop Recommendation Engine

## How to Contribute

We welcome contributions to improve this project!

### Reporting Issues
1. Check if issue already exists
2. Provide detailed description
3. Include steps to reproduce
4. Attach error screenshots if applicable

### Adding Features
1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes following code style
4. Test thoroughly
5. Submit pull request with clear description

### Code Style
- Use consistent indentation (2 spaces)
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns

### Adding New Crops
Update `backend/controllers/aiController.js` cropDatabase:

```javascript
cropName: {
  name: 'Display Name',
  soilTypes: ['type1', 'type2'],
  waterNeeded: 'low|medium|high',
  season: ['season1', 'season2'],
  averageInvestment: amount,
  expectedProfit: amount,
  riskLevel: 'low|medium|high',
  harvestDuration: 'duration',
  minTemperature: value,
  maxTemperature: value
}
```

### Testing
- Test API endpoints with Postman
- Test UI in different browsers
- Verify responsiveness on mobile
- Test with different API keys

### Documentation
- Update README for major changes
- Add code comments
- Document new API endpoints
- Update this file if needed

## Project Structure
- `/backend` - Node.js Express server
- `/frontend` - React application
- `/docs` - Documentation files

## Development Setup
See SETUP_INSTRUCTIONS.md for detailed setup.

## Questions?
Open an issue or check existing discussions.

Thank you for contributing! 🌾
