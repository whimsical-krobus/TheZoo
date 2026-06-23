# 🦁 The Zoo - Animal Management System

This is a web application for managing and monitoring animals in a zoo. The main purpose is to keep track of feeding schedules, view detailed information about animals, and ensure all creatures in your care receive timely meals.

## 🎯 Project Purpose

The Zoo is a responsive web application designed to simplify zoo operations by providing caretakers with a centralized platform to:
- Monitor all animals and their feeding status
- Track when each animal was last fed
- Receive alerts for animals that need feeding
- View detailed information about each animal
- Maintain feeding history and schedules

## ✨ Key Features

### 🐾 Animal Management
- **Browse All Animals**: View a comprehensive list of all animals in the zoo with images, names, and short descriptions
- **Detailed Animal Pages**: Click on any animal to see full details and additional information
- **Search & Filter**: Easily find specific animals in the collection

### 🍽️ Feeding System
- **Feeding Tracking**: Record when animals are fed and automatically track feeding times
- **Smart Alerts**: The system automatically identifies animals that haven't been fed in over 4 hours
- **Visual Indicators**: Clear notifications showing which animals need immediate feeding
- **Feeding History**: Keep records of when each animal was last fed

### 📱 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Comfortable viewing in any lighting condition
- **Offline Support**: Cached data allows basic functionality even without internet connection
- **Real-time Updates**: Automatic status checks every minute to keep information current

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework for production
- **Language**: TypeScript - Type-safe JavaScript development
- **Styling**: Tailwind CSS - Utility-first CSS framework
- **State Management**: React Hooks - Custom hooks for animals data and feeding status
- **Data Persistence**: Local Storage - Client-side caching for offline support
- **API Integration**: REST API for fetching animal data

## 📦 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── AnimalCard.tsx      # Card component for animal display
│   ├── AnimalList.tsx      # List view of animals
│   ├── FeedButton.tsx      # Button to feed animals
│   ├── FeedNotice.tsx      # Alert for animals needing food
│   └── Header.tsx          # Application header
├── constants/          # Application constants
│   ├── api.ts             # API endpoint configuration
│   ├── index.ts           # Main constants export
│   ├── storage.ts         # Local storage key constants
│   └── time.ts            # Time-related constants
├── hooks/              # Custom React hooks
│   ├── useAnimals.ts       # Hook for fetching and managing animals
│   └── useFeedingStatus.ts # Hook for tracking feeding status
├── models/             # TypeScript type definitions
│   ├── animals.ts         # Animal type definitions
│   └── animalDetails.ts   # Detailed animal information types
├── services/           # API and business logic
│   ├── animalService.ts   # Animal data operations
│   └── serviceBase.ts     # Base HTTP service
├── utils/              # Utility functions
│   ├── imageUtils.ts      # Image handling and optimization
│   └── timeUtils.ts       # Time and date calculations
├── animals/            # Animal pages
│   ├── page.tsx           # Animals list page
│   └── [id]/page.tsx      # Individual animal detail page
├── page.tsx            # Home page with feeding alerts
├── layout.tsx          # Root layout component
└── globals.css         # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-zoo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed)
   - Check if any `.env` file is required for API configuration

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Linting

Check code quality:
```bash
npm run lint
```

## 📖 How to Use

1. **Home Page**: View animals that need feeding (last fed more than 4 hours ago)
2. **Animals Page**: Browse all animals in the zoo with their images and descriptions
3. **Animal Details**: Click on any animal to view full details and additional information
4. **Feed an Animal**: Click the "Feed" button on an animal's detail page to record feeding
5. **Feeding Alerts**: Check the home page for animals that urgently need feeding

## 🔄 API Integration

The application fetches animal data from:
```
https://animals.azurewebsites.net/api/animals
```

Data is cached locally in the browser's localStorage for offline access and improved performance.

## 🧪 Features in Detail

### Feeding Threshold
Animals are flagged as needing food when:
- **4+ hours** have passed since last feeding

### Status Monitoring
- Feeding status is checked every **60 seconds** (1 minute)
- Real-time status updates without page refresh
- Visual feedback for feeding operations

### Data Persistence
- Animal data is stored in browser localStorage
- Feeding history is maintained locally
- Offline mode supports viewing cached animal data

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is private and part of an educational institution assignment.

## 🐛 Troubleshooting

### Animals not loading?
- Check internet connection
- Clear browser cache and localStorage
- Verify API endpoint is accessible
- Check browser console for error messages

### Feeding status not updating?
- Refresh the page to manual trigger an update
- Check that localStorage is enabled in your browser
- Verify your browser's date/time is correct

## 📞 Support

For issues or questions, please contact the development team or check the project documentation.

---

**Made with ❤️ for the animals** 🦁🐘🦒🦓 
