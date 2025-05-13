/**
 * Mock data for Beppu Story
 * This simulates the data that would be fetched from S3
 */

export const beppuStoryData = {
  title: 'Beppu Story',
  subtitle: 'Audio Guide',
  location: 'Beppu, Japan',
  variant: 'beppu-story',
  suites: [
    {
      id: 'suite-1',
      name: 'Premium Suite 1', 
      passcode: '1111',
      roomImages: [
        { 
          id: 1, 
          src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0", 
          alt: "Suite 1 Photo 1" 
        },
        { 
          id: 2, 
          src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4", 
          alt: "Suite 1 Photo 2" 
        },
        { 
          id: 3, 
          src: "https://images.unsplash.com/photo-1560185127-028e7c3a0f10", 
          alt: "Suite 1 Photo 3" 
        }
      ],
      stayInfo: {
        checkin: 'After 3:00 PM',
        checkout: 'Before 11:00 AM',
        wifi: {
          ssid: 'LaxyHub-Suite1',
          password: 'laxy2025s1'
        },
        rules: 'No smoking. No parties. Quiet hours after 10pm.'
      }
    },
    {
      id: 'suite-2',
      name: 'Premium Suite 2',
      passcode: '2222',
      roomImages: [
        { 
          id: 1, 
          src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461", 
          alt: "Suite 2 Photo 1" 
        },
        { 
          id: 2, 
          src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", 
          alt: "Suite 2 Photo 2" 
        },
        { 
          id: 3, 
          src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a", 
          alt: "Suite 2 Photo 3" 
        }
      ],
      stayInfo: {
        checkin: 'After 3:00 PM',
        checkout: 'Before 11:00 AM',
        wifi: {
          ssid: 'LaxyHub-Suite2',
          password: 'laxy2025s2'
        },
        rules: 'No smoking. No parties. Quiet hours after 10pm.'
      }
    },
    {
      id: 'suite-3',
      name: 'Deluxe Suite',
      passcode: '3333',
      roomImages: [
        { 
          id: 1, 
          src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39", 
          alt: "Deluxe Suite Photo 1" 
        },
        { 
          id: 2, 
          src: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa", 
          alt: "Deluxe Suite Photo 2" 
        },
        { 
          id: 3, 
          src: "https://images.unsplash.com/photo-1540518614846-7eded433c457", 
          alt: "Deluxe Suite Photo 3" 
        }
      ],
      stayInfo: {
        checkin: 'After 2:00 PM',
        checkout: 'Before 12:00 PM',
        wifi: {
          ssid: 'LaxyHub-Deluxe',
          password: 'laxy2025dlx'
        },
        rules: 'No smoking. No pets. Quiet hours after 10pm.'
      }
    },
    {
      id: 'suite-4',
      name: 'Family Suite',
      passcode: '4444',
      roomImages: [
        { 
          id: 1, 
          src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6", 
          alt: "Family Suite Photo 1" 
        },
        { 
          id: 2, 
          src: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c", 
          alt: "Family Suite Photo 2" 
        },
        { 
          id: 3, 
          src: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9", 
          alt: "Family Suite Photo 3" 
        }
      ],
      stayInfo: {
        checkin: 'After 2:00 PM',
        checkout: 'Before 11:00 AM',
        wifi: {
          ssid: 'LaxyHub-Family',
          password: 'laxy2025fam'
        },
        rules: 'Kid-friendly. No smoking. Quiet hours after 9pm.'
      }
    },
    {
      id: 'suite-5',
      name: 'Executive Suite',
      passcode: '5555',
      roomImages: [
        { 
          id: 1, 
          src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304", 
          alt: "Executive Suite Photo 1" 
        },
        { 
          id: 2, 
          src: "https://images.unsplash.com/photo-1566152446736-77b394124d1b", 
          alt: "Executive Suite Photo 2" 
        },
        { 
          id: 3, 
          src: "https://images.unsplash.com/photo-1598927379792-ef9b07c6fa85", 
          alt: "Executive Suite Photo 3" 
        }
      ],
      stayInfo: {
        checkin: 'After 2:00 PM',
        checkout: 'Before 12:00 PM',
        wifi: {
          ssid: 'LaxyHub-Exec',
          password: 'laxy2025exec'
        },
        rules: 'No smoking. Business center access included.'
      }
    },
    {
      id: 'suite-6',
      name: 'Penthouse Suite',
      passcode: '6666',
      roomImages: [
        { 
          id: 1, 
          src: "https://images.unsplash.com/photo-1590490360182-c33d57733427", 
          alt: "Penthouse Suite Photo 1" 
        },
        { 
          id: 2, 
          src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf", 
          alt: "Penthouse Suite Photo 2" 
        },
        { 
          id: 3, 
          src: "https://images.unsplash.com/photo-1596178060671-7a58b126afb7", 
          alt: "Penthouse Suite Photo 3" 
        }
      ],
      stayInfo: {
        checkin: 'After 3:00 PM',
        checkout: 'Before 12:00 PM',
        wifi: {
          ssid: 'LaxyHub-Penthouse',
          password: 'laxy2025pent'
        },
        rules: 'No smoking. Private elevator access. 24-hour butler service.'
      }
    }
  ],
  carouselTitle: 'Premium Suite 1', // Default title
  sectionLabels: {
    infoLabel: 'Airbnb Information',
    restaurantsLabel: 'Restaurant List',
    attractionsLabel: 'Attraction List',
    toursLabel: 'Tour List',
    popularToursLabel: 'Popular Tours',
    restaurantsShortLabel: 'Restaurants',
    attractionsShortLabel: 'Attractions'
  },
  featuredTours: [
    {
      id: 'jpn-bepu-tur-001',
      name: 'Beppu Hot Springs Tour',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
      duration: '3 hours',
      language: 'English guide available'
    },
    {
      id: 'jpn-bepu-tur-002',
      name: 'City Bus Tour',
      image: 'https://images.unsplash.com/photo-1601024445121-e5b82f020549',
      duration: '4 hours',
      language: 'Includes lunch'
    },
    {
      id: 'jpn-bepu-tur-003',
      name: 'Mount Tsurumi Hiking Tour',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e',
      duration: '6 hours',
      language: 'Advanced level'
    }
  ],
  featuredPlaces: [
    {
      id: 'beppu-tower',
      name: 'Beppu Tower',
      image: 'https://images.unsplash.com/photo-1583072379598-8c10a8c8ad05',
      description: 'Landmark • 15 min by bus'
    },
    {
      id: 'beppu-jigoku',
      name: 'Takegawara Onsen',
      image: 'https://images.unsplash.com/photo-1545569341-85aa36a0d485',
      description: 'Traditional public bath • 10 min walk'
    },
    {
      id: 'beppu-ropeway',
      name: 'Kintetsu Ropeway',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e',
      description: 'Mountain view • 20 min by bus'
    },
    {
      id: 'beppu-aquarium',
      name: 'Umitamago Aquarium',
      image: 'https://images.unsplash.com/photo-1588852656644-704c1c54bf07',
      description: 'Marine life • 25 min by bus'
    }
  ],
  restaurantList: [
    {
      id: 'restaurant-1',
      name: 'Toyotsune Sushi',
      description: 'Traditional sushi • 5 min walk'
    },
    {
      id: 'restaurant-2',
      name: 'Oita Ramen Shop',
      description: 'Local ramen • 8 min walk'
    },
    {
      id: 'restaurant-3',
      name: 'Sunset Café',
      description: 'Coffee & cakes • 3 min walk'
    }
  ],
  // Default room images and hotel info (for backward compatibility)
  roomImages: [
    { 
      id: 1, 
      src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0", 
      alt: "Room Photo 1" 
    },
    { 
      id: 2, 
      src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4", 
      alt: "Room Photo 2" 
    },
    { 
      id: 3, 
      src: "https://images.unsplash.com/photo-1560185127-028e7c3a0f10", 
      alt: "Room Photo 3" 
    }
  ]
};

export default beppuStoryData;