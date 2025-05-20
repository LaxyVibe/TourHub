// filepath: /Users/sunlau/Documents/creative/LaxyVibe/TourHub/src/mocks/places/basePlacesData.js
/**
 * Base places data with language-independent properties
 * This file contains common data across all languages like IDs, images, ratings, transportation info
 */

export const basePlacesData = {
  places: [
    {
      id: 'beppu-ropeway',
      thumbnail: 'https://images.unsplash.com/photo-1617196701537-7329482cc9fe',
      transportation: {
        bus: {
          duration: 25, // in minutes
          lines: ['36', '41']
        },
        walk: {
          duration: 35 // in minutes from Beppu Station
        },
        totalTime: 60 // in minutes
      },
      detail: {
        phone: '+81 977-22-1234',
        website: 'https://www.beppu-ropeway.co.jp/',
        audioTourAvailable: true,
        rating: 4.6,
        reviewCount: 892,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/beppu-ropeway-address.mp3',
        openingHours: '9:00-17:00',
        fees: {
          adult: 1600, // round trip
          child: 800,
          senior: 1400
        },
        coordinates: {
          lat: 33.2871,
          lng: 131.4981
        }
      }
    },
    {
      id: 'beppu-hells',
      thumbnail: 'https://images.unsplash.com/photo-1617196034283-96c3f4d45c02',
      transportation: {
        bus: {
          duration: 20, // in minutes
          lines: ['2', '5', '7', '9']
        },
        walk: {
          duration: 30 // in minutes from Beppu Station
        },
        totalTime: 50 // in minutes
      },
      detail: {
        phone: '+81 977-66-1577',
        website: 'https://www.beppu-jigoku.com/',
        audioTourAvailable: true,
        rating: 4.8,
        reviewCount: 1543,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/beppu-hells-address.mp3',
        openingHours: '8:00-17:00',
        fees: {
          adult: 2000, // combo ticket for all hells
          child: 1000,
          senior: 1800
        },
        coordinates: {
          lat: 33.3019,
          lng: 131.4988
        }
      }
    }
  ]
};