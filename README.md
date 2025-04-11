### IP Location Finder

A modern, responsive web application that allows users to find geographical information based on IP addresses. The application consumes the ipify.org Geolocation API to provide accurate location data.

## Features

- 🌍 **IP Geolocation**: Get detailed geographical information for any IP address
- 🔍 **Current Location**: Quickly find your own IP address and location
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Search History**: Automatically saves your recent searches for quick access
- 💾 **Local Storage**: Persists search history between sessions

## Technologies Used

- HTML5
- CSS3 
- JavaScript 
- [ipify.org Geolocation API](https://geo.ipify.org/)

## Usage
### Basic Usage

1. Open the application in your web browser clicking the deployed web page
2. To find your own location, click the "Get My Location" button
3. To find information about a specific IP address, enter it in the input field and click "Search"
4. View the detailed location information in the card below

### Search History

- Your recent searches are automatically saved and displayed in the history section
- Click on any item in the history to quickly search for that IP address again
- Use the "Clear History" button to remove all saved searches

## API Information

This project uses the [ipify.org Geolocation API](https://geo.ipify.org/) to retrieve IP location data.

### API Limitations

- Free tier: 1,000 credits
- Each request costs 2 credits
- Maximum 100 requests per second

## Browser Compatibility

- Chrome (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Troubleshooting

### API Request Fails

If you encounter issues with the API:

1. Check your internet connection
2. Verify the API key is correct
3. Ensure you haven't exceeded the API request limits
4. Check if the IP address format is valid

### Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 422: Unprocessable Entity
- 429: Too Many Requests
- 5XX: Internal Server Error


---

Created by [Your Name] - [Your Website/GitHub]
