/**
 * Base restaurant data with language-independent properties
 * This file contains common data across all languages like IDs, images, ratings, and contact information
 */

export const baseRestaurantsData = {
  restaurants: [
    {
      id: 'jigoku-steamer',
      thumbnail: 'https://images.unsplash.com/photo-1617196701537-7329482cc9fe',
      transportation: {
        bus: {
          duration: 15, // in minutes
          lines: ['36', '37']
        },
        walk: {
          duration: 7 // in minutes
        },
        totalTime: 22 // in minutes
      },
      detail: {
        phone: '+81 977-66-3775',
        website: 'https://jigokumushi-kobo.com/',
        audioTourAvailable: true,
        rating: 4.7,
        reviewCount: 235,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/jigoku-address.mp3'
      }
    },
    {
      id: 'toyotsune',
      thumbnail: 'https://images.unsplash.com/photo-1617196034283-96c3f4d45c02',
      transportation: {
        bus: {
          duration: 10, // in minutes
          lines: ['5', '7']
        },
        walk: {
          duration: 12 // in minutes
        },
        totalTime: 22 // in minutes
      },
      detail: {
        phone: '+81 977-23-4407',
        website: 'https://toyotsune-beppu.jp/',
        audioTourAvailable: false,
        rating: 4.5,
        reviewCount: 187,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/toyotsune-address.mp3'
      }
    },
    {
      id: 'robata-yagoemon',
      thumbnail: 'https://images.unsplash.com/photo-1584568499732-fc88bd0a0ded',
      transportation: {
        bus: {
          duration: 8, // in minutes
          lines: ['5', '41']
        },
        walk: {
          duration: 5 // in minutes
        },
        totalTime: 13 // in minutes
      },
      detail: {
        phone: '+81 977-21-3753',
        website: null,
        audioTourAvailable: true,
        rating: 4.8,
        reviewCount: 156,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/yagoemon-address.mp3'
      }
    },
    {
      id: 'takegawara-onsen-cafe',
      thumbnail: 'https://images.unsplash.com/photo-1545034215-024ea4c4049b',
      transportation: {
        bus: {
          duration: 5, // in minutes
          lines: ['2', '15']
        },
        walk: {
          duration: 3 // in minutes
        },
        totalTime: 8 // in minutes
      },
      detail: {
        phone: '+81 977-23-1585',
        website: 'https://takegawara-cafe.jp/',
        audioTourAvailable: false,
        rating: 4.3,
        reviewCount: 118,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/takegawara-address.mp3'
      }
    },
    {
      id: 'okamotoya',
      thumbnail: 'https://images.unsplash.com/photo-1618535261138-8de15ded6aa5',
      transportation: {
        bus: {
          duration: 0, // in minutes
          lines: ['Direct']
        },
        walk: {
          duration: 5 // in minutes
        },
        totalTime: 5 // in minutes
      },
      detail: {
        phone: '+81 977-25-6158',
        website: null,
        audioTourAvailable: true,
        rating: 4.6,
        reviewCount: 243,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/okamotoya-address.mp3'
      }
    }
  ]
};

export default baseRestaurantsData;
