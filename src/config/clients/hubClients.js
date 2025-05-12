/**
 * Hub client configurations for different hostnames
 * These configurations are used for the HubLanding component
 */

export const getHubClientInfo = (hostname, pathname) => {
  // Beppu Story - Japanese hotspring destination
  if (hostname.includes('stay-beppu-story')) {
    return {
      clientName: 'Beppu Story',
      variant: 'beppu-story',
      title: 'Beppu Story',
      subtitle: 'Audio Guide',
      location: 'Beppu, Japan',
      description: 'Discover the enchanting hot springs and cultural heritage of Beppu, a city known for its geothermal wonders and traditional Japanese hospitality.',
      featuredImage: 'https://images.unsplash.com/photo-1583072379598-8c10a8c8ad05',
      featuredTours: ['jpn-bepu-tur-001', 'jpn-bepu-tur-002', 'jpn-bepu-tur-003'],
      featuredPlaces: ['beppu-tower', 'beppu-jigoku', 'beppu-ropeway', 'beppu-aquarium'],
      contactInfo: {
        email: 'info@beppu-story.com',
        phone: '+81-977-123-4567',
        address: '1-2-3 Kitahama, Beppu, Oita Prefecture, Japan'
      },
      socialMedia: {
        instagram: '@beppustory',
        facebook: 'BeppuStoryOfficial',
        twitter: '@BeppuStory'
      }
    };
  }
  
  // Tokyo BnB - Urban Tokyo experience
  if (hostname.includes('stay-tokyo-bnb')) {
    return {
      clientName: 'Tokyo BnB',
      variant: 'tokyo-bnb',
      title: 'Tokyo BnB Guide',
      subtitle: 'Discover Tokyo',
      location: 'Tokyo, Japan',
      description: 'Experience the vibrant city life of Tokyo with our curated guides. From traditional temples to futuristic skyscrapers, explore the perfect blend of old and new Japan.',
      featuredImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
      featuredTours: ['jpn-toky-tur-001', 'jpn-toky-tur-002', 'jpn-toky-tur-003'],
      featuredPlaces: ['tokyo-tower', 'tokyo-skytree', 'meiji-shrine', 'shibuya-crossing'],
      contactInfo: {
        email: 'hello@tokyobnb.com',
        phone: '+81-3-1234-5678',
        address: '4-5-6 Shinjuku, Tokyo, Japan'
      },
      socialMedia: {
        instagram: '@tokyobnbofficial',
        facebook: 'TokyoBnBOfficial',
        twitter: '@TokyoBnB'
      }
    };
  }

  // Kyoto Zen - Traditional Japanese experience
  if (hostname.includes('stay-kyoto-zen')) {
    return {
      clientName: 'Kyoto Zen',
      variant: 'kyoto-zen',
      title: 'Kyoto Zen Experience',
      subtitle: 'Traditional Japan',
      location: 'Kyoto, Japan',
      description: 'Immerse yourself in the serene beauty of ancient Kyoto. Our guides take you through historic temples, peaceful gardens, and authentic cultural experiences in Japan\'s former capital.',
      featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      featuredTours: ['jpn-kyot-tur-001', 'jpn-kyot-tur-002'],
      featuredPlaces: ['kinkakuji-temple', 'fushimi-inari', 'arashiyama-bamboo', 'gion-district'],
      contactInfo: {
        email: 'info@kyotozen.jp',
        phone: '+81-75-987-6543',
        address: '7-8-9 Higashiyama, Kyoto, Japan'
      },
      socialMedia: {
        instagram: '@kyotozen',
        facebook: 'KyotoZenExperience',
        twitter: '@KyotoZen'
      }
    };
  }

  // Okinawa Paradise - Tropical island getaway
  if (hostname.includes('stay-okinawa-paradise')) {
    return {
      clientName: 'Okinawa Paradise',
      variant: 'okinawa-paradise',
      title: 'Okinawa Paradise',
      subtitle: 'Island Adventures',
      location: 'Okinawa, Japan',
      description: 'Escape to the tropical paradise of Okinawa, where crystal-clear waters, white sandy beaches, and unique island culture await. Discover a different side of Japan in this southern archipelago.',
      featuredImage: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
      featuredTours: ['jpn-okin-tur-001', 'jpn-okin-tur-002'],
      featuredPlaces: ['churaumi-aquarium', 'shuri-castle', 'emerald-beach', 'cape-manzamo'],
      contactInfo: {
        email: 'hello@okinawa-paradise.com',
        phone: '+81-98-765-4321',
        address: '10-11-12 Naha, Okinawa, Japan'
      },
      socialMedia: {
        instagram: '@okinawaparadise',
        facebook: 'OkinawaParadiseOfficial',
        twitter: '@OkinawaParadise'
      }
    };
  }
  
  // Default variant
  return {
    clientName: 'Laxy Travel',
    variant: 'default',
    title: 'Laxy Travel Guide',
    subtitle: 'Explore with us now',
    location: 'Japan',
    description: 'Your ultimate travel companion for exploring the best destinations in Japan. From ancient temples to modern cities, natural wonders to culinary delights, discover Japan with Laxy Travel.',
    featuredImage: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3',
    featuredTours: ['jpn-bepu-tur-001', 'jpn-toky-tur-001', 'jpn-kyot-tur-001', 'jpn-okin-tur-001'],
    featuredPlaces: ['tokyo-tower', 'beppu-jigoku', 'fushimi-inari', 'churaumi-aquarium'],
    contactInfo: {
      email: 'info@laxytravel.com',
      phone: '+81-3-9876-5432',
      address: 'Global Headquarters, Tokyo, Japan'
    },
    socialMedia: {
      instagram: '@laxytravelofficial',
      facebook: 'LaxyTravelOfficial',
      twitter: '@LaxyTravel'
    }
  };
};

export default getHubClientInfo;