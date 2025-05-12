/**
 * Place client configurations for different place IDs
 * These configurations are used for the PlaceLanding component
 */

export const getPlaceClientInfo = (hostname, pathname, placeId) => {
  // Beppu Tower place
  if (placeId === 'beppu-tower') {
    return {
      clientName: 'Beppu Tower',
      variant: 'beppu-place',
      title: 'Beppu Tower',
      subtitle: 'Scenic Viewpoint',
      placeId: 'beppu-tower',
      location: 'Beppu, Japan',
      placeDetails: {
        openingHours: '9:00 AM - 6:00 PM',
        entranceFee: '500¥',
        description: 'A landmark tower providing panoramic views of Beppu City and its famous hot springs.'
      }
    };
  }
  // Tokyo Tower place
  else if (placeId === 'tokyo-tower') {
    return {
      clientName: 'Tokyo Tower',
      variant: 'tokyo-place',
      title: 'Tokyo Tower',
      subtitle: 'Iconic Landmark',
      placeId: 'tokyo-tower',
      location: 'Tokyo, Japan',
      placeDetails: {
        openingHours: '9:00 AM - 11:00 PM',
        entranceFee: '1,200¥',
        description: 'An iconic communications and observation tower in the heart of Tokyo, offering stunning views of the city skyline.'
      }
    };
  }
  // Kyoto Temple place
  else if (placeId === 'kiyomizu-temple') {
    return {
      clientName: 'Kiyomizu Temple',
      variant: 'kyoto-place',
      title: 'Kiyomizu-dera Temple',
      subtitle: 'Historic Buddhist Temple',
      placeId: 'kiyomizu-temple',
      location: 'Kyoto, Japan',
      placeDetails: {
        openingHours: '6:00 AM - 6:00 PM',
        entranceFee: '400¥',
        description: 'Built in 778 AD, this historic Buddhist temple offers magnificent views of Kyoto and contains several important cultural treasures.'
      }
    };
  }
  // Osaka Castle place
  else if (placeId === 'osaka-castle') {
    return {
      clientName: 'Osaka Castle',
      variant: 'osaka-place',
      title: 'Osaka Castle',
      subtitle: 'Historic Landmark',
      placeId: 'osaka-castle',
      location: 'Osaka, Japan',
      placeDetails: {
        openingHours: '9:00 AM - 5:00 PM',
        entranceFee: '600¥',
        description: 'A magnificent castle built in the 16th century, featuring a museum with artifacts related to the history of the castle and the city.'
      }
    };
  }
  // Nara Deer Park place
  else if (placeId === 'nara-park') {
    return {
      clientName: 'Nara Park',
      variant: 'nara-place',
      title: 'Nara Deer Park',
      subtitle: 'Public Park with Deer',
      placeId: 'nara-park',
      location: 'Nara, Japan',
      placeDetails: {
        openingHours: 'Open 24 hours',
        entranceFee: 'Free',
        description: 'A public park known for its freely roaming deer. Considered messengers of the gods in Shinto, these deer have become a symbol of the city.'
      }
    };
  }
  // Mount Fuji place
  else if (placeId === 'mount-fuji') {
    return {
      clientName: 'Mount Fuji',
      variant: 'fuji-place',
      title: 'Mount Fuji',
      subtitle: 'Iconic Mountain',
      placeId: 'mount-fuji',
      location: 'Shizuoka & Yamanashi, Japan',
      placeDetails: {
        openingHours: 'Climbing season: July to September',
        entranceFee: '1,000¥ (climbing fee)',
        description: 'Japan\'s tallest mountain and an active volcano, Mount Fuji is an iconic symbol of Japan and a UNESCO World Heritage site.'
      }
    };
  }
  // Shibuya Crossing place
  else if (placeId === 'shibuya-crossing') {
    return {
      clientName: 'Shibuya Crossing',
      variant: 'shibuya-place',
      title: 'Shibuya Crossing',
      subtitle: 'Famous Intersection',
      placeId: 'shibuya-crossing',
      location: 'Tokyo, Japan',
      placeDetails: {
        openingHours: 'Always open',
        entranceFee: 'Free',
        description: 'One of the busiest pedestrian crossings in the world, with up to 3,000 people crossing at once during peak times.'
      }
    };
  }
  // Arashiyama Bamboo Grove place
  else if (placeId === 'bamboo-grove') {
    return {
      clientName: 'Arashiyama Bamboo Grove',
      variant: 'arashiyama-place',
      title: 'Arashiyama Bamboo Grove',
      subtitle: 'Natural Forest Path',
      placeId: 'bamboo-grove',
      location: 'Kyoto, Japan',
      placeDetails: {
        openingHours: 'Always open',
        entranceFee: 'Free',
        description: 'A stunning path lined with towering bamboo stalks that create a unique atmosphere as sunlight filters through.'
      }
    };
  }
  // Hakone Onsen place
  else if (placeId === 'hakone-onsen') {
    return {
      clientName: 'Hakone Onsen',
      variant: 'hakone-place',
      title: 'Hakone Hot Springs',
      subtitle: 'Natural Hot Springs',
      placeId: 'hakone-onsen',
      location: 'Hakone, Japan',
      placeDetails: {
        openingHours: 'Varies by establishment',
        entranceFee: '1,000-2,500¥ (day use)',
        description: 'Famous hot spring resort area with beautiful views of Mount Fuji, offering relaxing bathing experiences in natural thermal waters.'
      }
    };
  }
  // Hiroshima Peace Memorial place
  else if (placeId === 'peace-memorial') {
    return {
      clientName: 'Hiroshima Peace Memorial',
      variant: 'hiroshima-place',
      title: 'Hiroshima Peace Memorial',
      subtitle: 'Historic Memorial',
      placeId: 'peace-memorial',
      location: 'Hiroshima, Japan',
      placeDetails: {
        openingHours: '8:30 AM - 6:00 PM (March-July, September-November), 8:30 AM - 7:00 PM (August), 8:30 AM - 5:00 PM (December-February)',
        entranceFee: '200¥ (museum)',
        description: 'A UNESCO World Heritage Site dedicated to the legacy of Hiroshima as the first city to suffer a nuclear attack and to the memories of the bomb\'s direct and indirect victims.'
      }
    };
  }
  
  // Default variant
  return {
    clientName: 'Laxy Travel',
    variant: 'default',
    title: 'Laxy Travel Guide',
    subtitle: 'Explore with us now',
    location: null,
    placeId: placeId
  };
};

export default getPlaceClientInfo;