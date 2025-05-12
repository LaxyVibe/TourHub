/**
 * Tour client configurations for different tour IDs
 * These configurations are used for the GuideLanding component
 */

export const getTourClientInfo = (hostname, pathname, tourId) => {
  // === BEPPU TOURS ===
  
  // Japanese Beppu hot springs tour
  if (tourId === 'jpn-bepu-tur-001') {
    return {
      clientName: 'Beppu Tour Guide',
      variant: 'beppu-tour',
      title: 'Beppu Hot Springs Tour',
      subtitle: 'Guided Experience',
      tourId: 'jpn-bepu-tur-001',
      location: 'Beppu, Japan',
      description: 'Experience Beppu\'s famous "Hells" (Jigoku) – a series of colorful hot springs for viewing, not bathing – on this guided tour. Learn about the geothermal activity that makes Beppu famous.',
      featuredImage: 'https://images.unsplash.com/photo-1583071299823-58e1b61728e3',
      tourDetails: {
        duration: '3 hours',
        distance: '4 km',
        difficulty: 'Easy',
        meetingPoint: 'Beppu Station East Exit',
        startTime: '10:00 AM',
        endTime: '1:00 PM',
        highlights: ['Jigoku Hot Springs', 'Traditional Onsen Experience', 'Local Cuisine Tasting'],
        languages: ['English', 'Japanese'],
        included: ['Professional guide', 'Hot spring entrance fees', 'Snacks'],
        notIncluded: ['Hotel pickup', 'Transportation', 'Gratuities'],
        price: {
          adult: '¥6,500',
          child: '¥3,250',
          infant: 'Free'
        },
        cancellationPolicy: 'Free cancellation up to 24 hours before the tour start time',
      },
      itinerary: [
        {
          time: '10:00 AM',
          title: 'Meet Your Guide',
          description: 'Meet your guide at Beppu Station East Exit. Brief introduction to Beppu and its geological significance.',
          placeId: null
        },
        {
          time: '10:30 AM',
          title: 'Umi Jigoku (Sea Hell)',
          description: 'Visit the cobalt blue hot spring, one of the most beautiful in Beppu.',
          placeId: 'beppu-umi-jigoku'
        },
        {
          time: '11:15 AM',
          title: 'Oniishibozu Jigoku (Shaven Monk\'s Head Hell)',
          description: 'See the bubbling mud pools that resemble a monk\'s shaved head.',
          placeId: 'beppu-oniishibozu-jigoku'
        },
        {
          time: '12:00 PM',
          title: 'Local Cuisine Tasting',
          description: 'Enjoy local specialties, including "jigoku-mushi" (hell-steamed) dishes cooked using steam from the hot springs.',
          placeId: 'beppu-local-restaurant'
        },
        {
          time: '1:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends back at Beppu Station. Your guide will provide recommendations for other activities in Beppu.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Sarah Thompson',
          rating: 5,
          date: 'April 2025',
          comment: 'The hot springs were incredible! Our guide was knowledgeable and friendly. Highly recommend this tour.'
        },
        {
          name: 'Takashi Yamada',
          rating: 4,
          date: 'March 2025',
          comment: 'Good tour with interesting information. The food tasting was a highlight.'
        }
      ],
      guideInfo: {
        name: 'Yuki Tanaka',
        photo: 'https://randomuser.me/api/portraits/women/43.jpg',
        bio: 'Born and raised in Beppu, Yuki has been a tour guide for 7 years and is passionate about sharing the culture and natural wonders of her hometown.',
        languages: ['Japanese', 'English']
      }
    };
  }
  
  // Beppu traditional culture tour
  else if (tourId === 'jpn-bepu-tur-002') {
    return {
      clientName: 'Beppu Cultural Tour',
      variant: 'beppu-culture',
      title: 'Beppu Cultural Immersion',
      subtitle: 'Traditional Experience',
      tourId: 'jpn-bepu-tur-002',
      location: 'Beppu, Japan',
      description: 'Immerse yourself in the traditional culture of Beppu beyond the hot springs. This tour focuses on local crafts, rituals, and the unique cultural heritage of this historic spa town.',
      featuredImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
      tourDetails: {
        duration: '4 hours',
        distance: '3 km',
        difficulty: 'Easy',
        meetingPoint: 'Beppu Traditional Crafts Center',
        startTime: '1:00 PM',
        endTime: '5:00 PM',
        highlights: ['Bamboo Crafts Workshop', 'Traditional Tea Ceremony', 'Local Shrine Visit'],
        languages: ['English', 'Japanese', 'Chinese'],
        included: ['Professional cultural guide', 'Workshop materials', 'Tea ceremony'],
        notIncluded: ['Hotel pickup', 'Additional food or drinks', 'Gratuities'],
        price: {
          adult: '¥7,800',
          child: '¥3,900',
          infant: 'Free'
        },
        cancellationPolicy: 'Free cancellation up to 48 hours before the tour start time',
      },
      itinerary: [
        {
          time: '1:00 PM',
          title: 'Introduction to Beppu Culture',
          description: 'Meet at the Beppu Traditional Crafts Center for an introduction to the cultural heritage of the region.',
          placeId: 'beppu-crafts-center'
        },
        {
          time: '1:30 PM',
          title: 'Bamboo Crafting Workshop',
          description: 'Participate in a hands-on bamboo crafting workshop. Create your own small souvenir to take home.',
          placeId: 'beppu-bamboo-workshop'
        },
        {
          time: '3:00 PM',
          title: 'Traditional Tea Ceremony',
          description: 'Experience an authentic Japanese tea ceremony in a historic tea house.',
          placeId: 'beppu-tea-house'
        },
        {
          time: '4:00 PM',
          title: 'Ogiyama Shrine Visit',
          description: 'Visit a local shrine and learn about the spiritual practices associated with the hot springs.',
          placeId: 'beppu-ogiyama-shrine'
        },
        {
          time: '5:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends at the shrine. Your guide will provide information on evening activities in Beppu.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Michael Chen',
          rating: 5,
          date: 'February 2025',
          comment: 'The bamboo workshop was fantastic. I love my little basket souvenir! Tea ceremony was a peaceful experience.'
        },
        {
          name: 'Emi Kato',
          rating: 5,
          date: 'January 2025',
          comment: 'Very authentic cultural experience. The guide was knowledgeable about local traditions.'
        }
      ],
      guideInfo: {
        name: 'Hiroshi Matsumoto',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        bio: 'Hiroshi is a cultural preservationist who has studied traditional crafts for over 20 years. He is dedicated to sharing authentic Japanese cultural experiences with visitors.',
        languages: ['Japanese', 'English', 'Chinese']
      }
    };
  }
  
  // Beppu nature and hiking tour
  else if (tourId === 'jpn-bepu-tur-003') {
    return {
      clientName: 'Beppu Nature Tour',
      variant: 'beppu-nature',
      title: 'Beppu Mountains & Forests Trek',
      subtitle: 'Nature Adventure',
      tourId: 'jpn-bepu-tur-003',
      location: 'Beppu, Japan',
      description: 'Explore the natural beauty surrounding Beppu on this guided hiking tour. Discover lush forests, mountain trails, and breathtaking views of Beppu Bay and the volcanic landscapes.',
      featuredImage: 'https://images.unsplash.com/photo-1526102384929-0df5ee4e4585',
      tourDetails: {
        duration: '6 hours',
        distance: '8 km',
        difficulty: 'Moderate',
        meetingPoint: 'Beppu Ropeway Lower Station',
        startTime: '9:00 AM',
        endTime: '3:00 PM',
        highlights: ['Mountain Hiking', 'Forest Bathing', 'Panoramic Views', 'Wildlife Spotting'],
        languages: ['English', 'Japanese'],
        included: ['Professional nature guide', 'Lunch box', 'Water', 'Trekking poles rental'],
        notIncluded: ['Ropeway tickets', 'Additional food or drinks', 'Gratuities'],
        price: {
          adult: '¥9,500',
          child: '¥4,750',
          infant: 'Not recommended'
        },
        cancellationPolicy: 'Free cancellation up to 72 hours before the tour start time',
      },
      itinerary: [
        {
          time: '9:00 AM',
          title: 'Meet Your Guide',
          description: 'Meet at the Beppu Ropeway Lower Station for a safety briefing and introduction to the local ecosystem.',
          placeId: 'beppu-ropeway'
        },
        {
          time: '9:30 AM',
          title: 'Ascent to Trailhead',
          description: 'Take the ropeway up to access the mountain trail starting point.',
          placeId: 'beppu-mountain-trailhead'
        },
        {
          time: '10:30 AM',
          title: 'Forest Trail Hike',
          description: 'Guided hike through ancient forests with explanation of local flora and fauna.',
          placeId: 'beppu-forest-trail'
        },
        {
          time: '12:00 PM',
          title: 'Lunch at Viewpoint',
          description: 'Enjoy a traditional Japanese lunch box at a scenic viewpoint overlooking Beppu Bay.',
          placeId: 'beppu-mountain-viewpoint'
        },
        {
          time: '1:00 PM',
          title: 'Continuation and Descent',
          description: 'Continue the hike, gradually descending through different vegetation zones.',
          placeId: null
        },
        {
          time: '3:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends back at the Beppu Ropeway Lower Station.',
          placeId: 'beppu-ropeway'
        }
      ],
      reviews: [
        {
          name: 'David Wilson',
          rating: 5,
          date: 'April 2025',
          comment: 'Fantastic hike with stunning views! Our guide knew so much about local plants and wildlife. Highly recommend for nature lovers!'
        },
        {
          name: 'Ayako Suzuki',
          rating: 4,
          date: 'March 2025',
          comment: 'Beautiful trail and good pace for moderate hikers. The lunch spot had amazing views of the bay.'
        }
      ],
      guideInfo: {
        name: 'Kenji Nakamura',
        photo: 'https://randomuser.me/api/portraits/men/67.jpg',
        bio: 'Kenji is a certified nature guide and forest therapy instructor with extensive knowledge of Beppu\'s mountain ecosystems. He has been leading tours for 12 years.',
        languages: ['Japanese', 'English']
      }
    };
  }
  
  // === TOKYO TOURS ===
  
  // Tokyo city explorer tour
  else if (tourId === 'jpn-toky-tur-001') {
    return {
      clientName: 'Tokyo Tour Guide',
      variant: 'tokyo-tour',
      title: 'Tokyo City Explorer',
      subtitle: 'Urban Adventure',
      tourId: 'jpn-toky-tur-001',
      location: 'Tokyo, Japan',
      description: 'Discover the highlights of Tokyo on this guided city tour. From ancient temples to futuristic districts, experience the captivating contrasts of Japan\'s vibrant capital.',
      featuredImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      tourDetails: {
        duration: '4 hours',
        distance: '5 km',
        difficulty: 'Easy',
        meetingPoint: 'Shibuya Station Hachiko Exit',
        startTime: '10:00 AM',
        endTime: '2:00 PM',
        highlights: ['Shibuya Crossing', 'Meiji Shrine', 'Harajuku Experience'],
        languages: ['English', 'Japanese', 'Chinese'],
        included: ['Professional guide', 'Public transportation during tour', 'Welcome drink'],
        notIncluded: ['Hotel pickup', 'Meals', 'Shrine donations', 'Gratuities'],
        price: {
          adult: '¥8,000',
          child: '¥4,000',
          infant: 'Free'
        },
        cancellationPolicy: 'Free cancellation up to 24 hours before the tour start time',
      },
      itinerary: [
        {
          time: '10:00 AM',
          title: 'Shibuya Scramble',
          description: 'Meet at Hachiko statue outside Shibuya Station. Experience the famous Shibuya Crossing, the busiest pedestrian intersection in the world.',
          placeId: 'shibuya-crossing'
        },
        {
          time: '11:00 AM',
          title: 'Meiji Shrine',
          description: 'Visit the tranquil Meiji Shrine, dedicated to Emperor Meiji and his wife. Walk through the peaceful forest in the heart of Tokyo.',
          placeId: 'meiji-shrine'
        },
        {
          time: '12:30 PM',
          title: 'Harajuku & Takeshita Street',
          description: 'Explore Harajuku, the center of Japanese youth culture and fashion. Walk down the vibrant Takeshita Street.',
          placeId: 'takeshita-street'
        },
        {
          time: '1:30 PM',
          title: 'Omotesando Hills',
          description: 'Stroll along Omotesando Avenue, known as Tokyo\'s Champs-Élysées, with its designer boutiques and architectural landmarks.',
          placeId: 'omotesando-hills'
        },
        {
          time: '2:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends at Omotesando Station. Your guide will provide recommendations for further exploration.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Jessica Brown',
          rating: 5,
          date: 'March 2025',
          comment: 'Perfect introduction to Tokyo! Our guide Aki was fantastic - knowledgeable, funny, and gave us great tips for the rest of our trip.'
        },
        {
          name: 'Liu Wei',
          rating: 4,
          date: 'February 2025',
          comment: 'Enjoyed the contrast between traditional shrine and modern Harajuku. Good pace and interesting information.'
        }
      ],
      guideInfo: {
        name: 'Akiko Yamamoto',
        photo: 'https://randomuser.me/api/portraits/women/12.jpg',
        bio: 'Akiko has been a Tokyo guide for 9 years and specializes in bridging traditional and modern Japanese culture for international visitors.',
        languages: ['Japanese', 'English', 'French']
      }
    };
  }
  
  // Tokyo foodie tour
  else if (tourId === 'jpn-toky-tur-002') {
    return {
      clientName: 'Tokyo Food Tours',
      variant: 'tokyo-food',
      title: 'Tokyo Foodie Adventure',
      subtitle: 'Culinary Exploration',
      tourId: 'jpn-toky-tur-002',
      location: 'Tokyo, Japan',
      description: 'Savor the flavors of Tokyo on this food-focused walking tour. From street food to traditional izakaya dishes, dive into Japanese cuisine with a knowledgeable local guide.',
      featuredImage: 'https://images.unsplash.com/photo-1580442151529-343f2f6e0e27',
      tourDetails: {
        duration: '3 hours',
        distance: '2 km',
        difficulty: 'Easy',
        meetingPoint: 'Yurakucho Station Central Exit',
        startTime: '5:00 PM',
        endTime: '8:00 PM',
        highlights: ['Street Food Tasting', 'Izakaya Experience', 'Sake Sampling'],
        languages: ['English', 'Japanese'],
        included: ['Professional food guide', 'All food tastings (7-8 items)', '2 alcoholic or non-alcoholic drinks'],
        notIncluded: ['Hotel pickup', 'Additional food or drinks', 'Gratuities'],
        price: {
          adult: '¥12,000',
          child: '¥6,000',
          infant: 'Not recommended'
        },
        cancellationPolicy: 'Free cancellation up to 48 hours before the tour start time',
      },
      itinerary: [
        {
          time: '5:00 PM',
          title: 'Meet Your Guide',
          description: 'Meet at Yurakucho Station for an introduction to Japanese food culture and the evening\'s tastings.',
          placeId: null
        },
        {
          time: '5:15 PM',
          title: 'Yakitori Alley',
          description: 'Visit the atmospheric alleys under the train tracks for yakitori (grilled chicken skewers) and other street foods.',
          placeId: 'yurakucho-yakitori-alley'
        },
        {
          time: '6:00 PM',
          title: 'Tsukiji Outer Market',
          description: 'Explore the outer market area of the former Tsukiji fish market, sampling fresh seafood items.',
          placeId: 'tsukiji-outer-market'
        },
        {
          time: '7:00 PM',
          title: 'Traditional Izakaya',
          description: 'Experience a traditional Japanese izakaya (pub) with a variety of small dishes and sake tasting.',
          placeId: 'ginza-izakaya'
        },
        {
          time: '8:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends at the izakaya. Your guide will provide recommendations for dessert options or continued evening exploration.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Robert Johnson',
          rating: 5,
          date: 'April 2025',
          comment: 'Incredible food tour! We tried so many different things I would have never found on my own. The izakaya experience was a highlight.'
        },
        {
          name: 'Naomi Sato',
          rating: 5,
          date: 'March 2025',
          comment: 'As a Japanese-American, I was impressed by the authentic places we visited. Our guide Keiko was knowledgeable and fun!'
        }
      ],
      guideInfo: {
        name: 'Keiko Suzuki',
        photo: 'https://randomuser.me/api/portraits/women/54.jpg',
        bio: 'Keiko is a certified sake sommelier and food specialist with a passion for introducing visitors to the depth and variety of Japanese cuisine.',
        languages: ['Japanese', 'English']
      }
    };
  }
  
  // Tokyo technology tour
  else if (tourId === 'jpn-toky-tur-003') {
    return {
      clientName: 'Tokyo Tech Tours',
      variant: 'tokyo-tech',
      title: 'Tokyo Technology & Future Tour',
      subtitle: 'Digital Exploration',
      tourId: 'jpn-toky-tur-003',
      location: 'Tokyo, Japan',
      description: 'Explore Tokyo\'s cutting-edge technology scene on this guided tour. From robotics to digital art, experience the innovations that make Tokyo a global tech hub.',
      featuredImage: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f',
      tourDetails: {
        duration: '5 hours',
        distance: '4 km',
        difficulty: 'Easy',
        meetingPoint: 'Akihabara Station Electric Town Exit',
        startTime: '1:00 PM',
        endTime: '6:00 PM',
        highlights: ['Electronics District', 'Robot Restaurant', 'Digital Art Museum'],
        languages: ['English', 'Japanese'],
        included: ['Professional tech guide', 'Robot show entry', 'Digital art museum ticket'],
        notIncluded: ['Hotel pickup', 'Meals', 'Additional attractions', 'Gratuities'],
        price: {
          adult: '¥13,500',
          child: '¥6,750',
          infant: 'Not recommended'
        },
        cancellationPolicy: 'Free cancellation up to 48 hours before the tour start time',
      },
      itinerary: [
        {
          time: '1:00 PM',
          title: 'Akihabara Electronics District',
          description: 'Meet at Akihabara Station and explore the famous electronics district with its anime shops, gaming arcades, and tech stores.',
          placeId: 'akihabara-electric-town'
        },
        {
          time: '2:30 PM',
          title: 'Miraikan - National Museum of Emerging Science',
          description: 'Visit this interactive science museum showcasing Japan\'s technological innovations and future concepts.',
          placeId: 'miraikan-museum'
        },
        {
          time: '4:00 PM',
          title: 'teamLab Borderless Digital Art Museum',
          description: 'Experience the stunning digital art installations at this immersive, interactive museum.',
          placeId: 'teamlab-borderless'
        },
        {
          time: '6:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends at the digital art museum in Odaiba. Your guide will provide recommendations for dinner and evening activities in this futuristic district.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Thomas Weber',
          rating: 5,
          date: 'March 2025',
          comment: 'Mind-blowing tech tour! The digital art museum was incredible, like nothing I\'ve ever experienced before. Great for anyone interested in future technology.'
        },
        {
          name: 'Haruka Ito',
          rating: 4,
          date: 'February 2025',
          comment: 'Very interesting tour with a knowledgeable guide. The Miraikan exhibits were fascinating, and I loved the robots!'
        }
      ],
      guideInfo: {
        name: 'Takeshi Saito',
        photo: 'https://randomuser.me/api/portraits/men/22.jpg',
        bio: 'Takeshi has a background in computer science and previously worked in Tokyo\'s tech industry. He loves sharing Japan\'s unique relationship with technology and its vision for the future.',
        languages: ['Japanese', 'English']
      }
    };
  }
  
  // === KYOTO TOURS ===
  
  // Kyoto temples and gardens tour
  else if (tourId === 'jpn-kyot-tur-001') {
    return {
      clientName: 'Kyoto Cultural Tours',
      variant: 'kyoto-temples',
      title: 'Kyoto Temples & Gardens',
      subtitle: 'Cultural Journey',
      tourId: 'jpn-kyot-tur-001',
      location: 'Kyoto, Japan',
      description: 'Discover the spiritual heart of Japan on this guided tour of Kyoto\'s most beautiful temples and gardens. Experience the serenity and cultural significance of these historic sites.',
      featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      tourDetails: {
        duration: '6 hours',
        distance: '5 km',
        difficulty: 'Easy',
        meetingPoint: 'Kyoto Station Central Exit',
        startTime: '9:00 AM',
        endTime: '3:00 PM',
        highlights: ['Golden Pavilion', 'Zen Rock Garden', 'Bamboo Forest'],
        languages: ['English', 'Japanese', 'French'],
        included: ['Professional cultural guide', 'Temple entrance fees', 'Tea ceremony experience'],
        notIncluded: ['Hotel pickup', 'Lunch', 'Additional activities', 'Gratuities'],
        price: {
          adult: '¥11,000',
          child: '¥5,500',
          infant: 'Free'
        },
        cancellationPolicy: 'Free cancellation up to 72 hours before the tour start time',
      },
      itinerary: [
        {
          time: '9:00 AM',
          title: 'Meet Your Guide',
          description: 'Meet at Kyoto Station for a brief introduction to Kyoto\'s history and the day\'s itinerary.',
          placeId: null
        },
        {
          time: '10:00 AM',
          title: 'Kinkakuji (Golden Pavilion)',
          description: 'Visit the iconic Zen temple covered in gold leaf, set beside a reflective pond in beautiful gardens.',
          placeId: 'kinkakuji-temple'
        },
        {
          time: '11:30 AM',
          title: 'Ryoanji Temple',
          description: 'Explore Japan\'s most famous Zen rock garden, a masterpiece of minimalist design.',
          placeId: 'ryoanji-temple'
        },
        {
          time: '1:00 PM',
          title: 'Lunch Break',
          description: 'Enjoy lunch at a local restaurant serving traditional Kyoto cuisine (not included in tour price).',
          placeId: 'kyoto-traditional-restaurant'
        },
        {
          time: '2:00 PM',
          title: 'Arashiyama Bamboo Grove',
          description: 'Walk through the enchanting bamboo forest pathway, one of Kyoto\'s most photographed sites.',
          placeId: 'arashiyama-bamboo'
        },
        {
          time: '3:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends at Arashiyama district. Your guide will provide recommendations for continued exploration in the area.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Emily Parker',
          rating: 5,
          date: 'April 2025',
          comment: 'Absolutely stunning tour! The temples were breath-taking and our guide Miyoko was so knowledgeable about Japanese history and Buddhism.'
        },
        {
          name: 'François Dubois',
          rating: 5,
          date: 'March 2025',
          comment: 'A perfect day in Kyoto. The gardens were peaceful even with other tourists around, and the bamboo grove was magical.'
        }
      ],
      guideInfo: {
        name: 'Miyoko Takahashi',
        photo: 'https://randomuser.me/api/portraits/women/67.jpg',
        bio: 'Miyoko has studied Japanese art history and tea ceremony for over 15 years. She is passionate about sharing Kyoto\'s cultural heritage with visitors from around the world.',
        languages: ['Japanese', 'English', 'French']
      }
    };
  }
  
  // Kyoto geisha district tour
  else if (tourId === 'jpn-kyot-tur-002') {
    return {
      clientName: 'Kyoto Evening Tours',
      variant: 'kyoto-geisha',
      title: 'Gion Geisha District by Night',
      subtitle: 'Evening Exploration',
      tourId: 'jpn-kyot-tur-002',
      location: 'Kyoto, Japan',
      description: 'Experience the enchanting atmosphere of Kyoto\'s geisha district on this evening walking tour. Learn about the fascinating world of geisha culture while strolling through historic streets.',
      featuredImage: 'https://images.unsplash.com/photo-1493409137604-0610cbe37262',
      tourDetails: {
        duration: '2 hours',
        distance: '3 km',
        difficulty: 'Easy',
        meetingPoint: 'Gion-Shijo Station Exit 3',
        startTime: '7:00 PM',
        endTime: '9:00 PM',
        highlights: ['Historic Geisha District', 'Traditional Machiya Houses', 'Potential Geisha Sightings'],
        languages: ['English', 'Japanese'],
        included: ['Professional cultural guide', 'Japanese sweet tasting'],
        notIncluded: ['Hotel pickup', 'Dinner', 'Photography permit for geisha', 'Gratuities'],
        price: {
          adult: '¥6,000',
          child: '¥3,000',
          infant: 'Not recommended'
        },
        cancellationPolicy: 'Free cancellation up to 24 hours before the tour start time',
      },
      itinerary: [
        {
          time: '7:00 PM',
          title: 'Meet Your Guide',
          description: 'Meet at Gion-Shijo Station for an introduction to Gion\'s history and geisha (known as geiko in Kyoto) culture.',
          placeId: null
        },
        {
          time: '7:15 PM',
          title: 'Hanami-koji Street',
          description: 'Walk down the famous street lined with traditional wooden machiya houses, teahouses, and exclusive restaurants.',
          placeId: 'hanami-koji'
        },
        {
          time: '8:00 PM',
          title: 'Shirakawa Canal Area',
          description: 'Explore the atmospheric canal area, one of the most beautiful streets in Gion, especially in the evening.',
          placeId: 'shirakawa-canal'
        },
        {
          time: '8:30 PM',
          title: 'Yasaka Shrine',
          description: 'Visit the illuminated shrine that marks the entrance to the Gion district.',
          placeId: 'yasaka-shrine'
        },
        {
          time: '9:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends at Yasaka Shrine. Your guide will provide recommendations for dining or continued evening exploration.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Amanda Wilson',
          rating: 5,
          date: 'March 2025',
          comment: 'Magical evening in Gion! We were lucky enough to see two maiko (apprentice geisha) on their way to appointments. The atmosphere at night was enchanting.'
        },
        {
          name: 'Takeshi Honda',
          rating: 4,
          date: 'February 2025',
          comment: 'Very informative tour about geiko culture. Our guide was respectful and made sure we understood proper etiquette when encountering geiko or maiko.'
        }
      ],
      guideInfo: {
        name: 'Saki Kimura',
        photo: 'https://randomuser.me/api/portraits/women/33.jpg',
        bio: 'Saki specializes in Kyoto\'s traditional arts and has extensively researched geiko culture. She provides cultural context while ensuring respectful observation of this living tradition.',
        languages: ['Japanese', 'English']
      }
    };
  }
  
  // === OKINAWA TOURS ===
  
  // Okinawa beaches and marine life tour
  else if (tourId === 'jpn-okin-tur-001') {
    return {
      clientName: 'Okinawa Ocean Tours',
      variant: 'okinawa-marine',
      title: 'Okinawa Marine Discovery',
      subtitle: 'Underwater Adventure',
      tourId: 'jpn-okin-tur-001',
      location: 'Okinawa, Japan',
      description: 'Discover the vibrant marine life and stunning beaches of Okinawa on this guided tour. From snorkeling in coral reefs to relaxing on pristine white sand, experience the tropical paradise of Japan\'s southern islands.',
      featuredImage: 'https://images.unsplash.com/photo-1590452224879-867e8013a549',
      tourDetails: {
        duration: '7 hours',
        distance: 'Various locations',
        difficulty: 'Moderate (swimming ability required)',
        meetingPoint: 'Naha Port Terminal',
        startTime: '9:00 AM',
        endTime: '4:00 PM',
        highlights: ['Coral Reef Snorkeling', 'Glass-Bottom Boat Tour', 'Emerald Beach Visit'],
        languages: ['English', 'Japanese'],
        included: ['Professional marine guide', 'Snorkeling equipment', 'Lunch', 'Transportation between sites'],
        notIncluded: ['Hotel pickup', 'Underwater photography', 'Wetsuits (available for rental)', 'Gratuities'],
        price: {
          adult: '¥15,000',
          child: '¥7,500',
          infant: 'Not recommended'
        },
        cancellationPolicy: 'Free cancellation up to 72 hours before the tour start time. Weather dependent activity.',
      },
      itinerary: [
        {
          time: '9:00 AM',
          title: 'Meet Your Guide',
          description: 'Meet at Naha Port Terminal for a safety briefing and introduction to Okinawa\'s marine ecosystem.',
          placeId: null
        },
        {
          time: '10:00 AM',
          title: 'Blue Cave Snorkeling',
          description: 'Snorkel at the famous Blue Cave, known for its crystal clear waters and abundant tropical fish.',
          placeId: 'okinawa-blue-cave'
        },
        {
          time: '12:00 PM',
          title: 'Lunch at Beach Restaurant',
          description: 'Enjoy a traditional Okinawan lunch with fresh seafood at a beachside restaurant.',
          placeId: 'okinawa-beach-restaurant'
        },
        {
          time: '1:30 PM',
          title: 'Glass-Bottom Boat Tour',
          description: 'Take a glass-bottom boat tour to observe coral reefs and marine life without getting wet.',
          placeId: 'okinawa-glass-boat'
        },
        {
          time: '2:30 PM',
          title: 'Emerald Beach Relaxation',
          description: 'Spend time at Emerald Beach, considered one of Japan\'s most beautiful beaches with its white sand and emerald water.',
          placeId: 'emerald-beach'
        },
        {
          time: '4:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends back at Naha Port Terminal.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Jason Miller',
          rating: 5,
          date: 'April 2025',
          comment: 'Incredible marine life! We saw so many colorful fish and even a sea turtle during our snorkeling session. The Blue Cave was magical.'
        },
        {
          name: 'Yumi Tanaka',
          rating: 4,
          date: 'March 2025',
          comment: 'Beautiful beaches and clear water. The guide was very attentive to safety during snorkeling. Lunch was delicious!'
        }
      ],
      guideInfo: {
        name: 'Kai Nakamura',
        photo: 'https://randomuser.me/api/portraits/men/78.jpg',
        bio: 'Kai is a certified diving instructor and marine biologist who grew up in Okinawa. He is passionate about ocean conservation and sharing the underwater wonders of his home.',
        languages: ['Japanese', 'English']
      }
    };
  }
  
  // Okinawan culture and history tour
  else if (tourId === 'jpn-okin-tur-002') {
    return {
      clientName: 'Okinawa Cultural Tours',
      variant: 'okinawa-culture',
      title: 'Okinawan Heritage Experience',
      subtitle: 'Cultural Journey',
      tourId: 'jpn-okin-tur-002',
      location: 'Okinawa, Japan',
      description: 'Explore the unique culture and fascinating history of Okinawa on this guided tour. Learn about the former Ryukyu Kingdom, traditional crafts, and distinctive customs that set Okinawa apart from mainland Japan.',
      featuredImage: 'https://images.unsplash.com/photo-1604999431559-384c7c96fbf9',
      tourDetails: {
        duration: '6 hours',
        distance: 'Various locations',
        difficulty: 'Easy',
        meetingPoint: 'Shuri Castle Park Entrance',
        startTime: '10:00 AM',
        endTime: '4:00 PM',
        highlights: ['Shuri Castle', 'Traditional Craft Workshop', 'Okinawan Cuisine Tasting'],
        languages: ['English', 'Japanese'],
        included: ['Professional cultural guide', 'Castle entrance fee', 'Craft materials', 'Food tasting', 'Transportation between sites'],
        notIncluded: ['Hotel pickup', 'Full meals', 'Additional souvenirs', 'Gratuities'],
        price: {
          adult: '¥10,000',
          child: '¥5,000',
          infant: 'Free'
        },
        cancellationPolicy: 'Free cancellation up to 48 hours before the tour start time.',
      },
      itinerary: [
        {
          time: '10:00 AM',
          title: 'Shuri Castle Tour',
          description: 'Explore the reconstructed royal palace of the Ryukyu Kingdom, a UNESCO World Heritage site representing Okinawa\'s unique architecture and history.',
          placeId: 'shuri-castle'
        },
        {
          time: '12:00 PM',
          title: 'Tsuboya Pottery District',
          description: 'Visit the traditional pottery district and participate in a hands-on workshop to create your own Okinawan-style pottery piece.',
          placeId: 'tsuboya-pottery'
        },
        {
          time: '1:30 PM',
          title: 'Okinawan Food Experience',
          description: 'Sample traditional Okinawan dishes and learn about the island\'s unique cuisine, influenced by both Japanese and Chinese traditions.',
          placeId: 'okinawa-food-market'
        },
        {
          time: '3:00 PM',
          title: 'Shikinaen Royal Garden',
          description: 'Visit the former royal villa and garden that blends Japanese and Chinese landscaping styles.',
          placeId: 'shikinaen-garden'
        },
        {
          time: '4:00 PM',
          title: 'Tour Conclusion',
          description: 'The tour ends at Shikinaen. Your guide will provide recommendations for dinner and evening activities.',
          placeId: null
        }
      ],
      reviews: [
        {
          name: 'Sarah Thompson',
          rating: 5,
          date: 'March 2025',
          comment: 'Fascinating insight into Okinawan culture! I loved learning about how different it is from mainland Japan. The pottery workshop was a highlight.'
        },
        {
          name: 'Hiroshi Yamada',
          rating: 5,
          date: 'February 2025',
          comment: 'As a Japanese person from Tokyo, I found this tour very educational. Okinawa has such a distinct culture and history that many Japanese aren\'t familiar with.'
        }
      ],
      guideInfo: {
        name: 'Mizuki Higa',
        photo: 'https://randomuser.me/api/portraits/women/23.jpg',
        bio: 'Mizuki is an Okinawan historian specializing in Ryukyu Kingdom history. Her family has lived in Okinawa for generations, and she is passionate about preserving and sharing her cultural heritage.',
        languages: ['Japanese', 'English', 'Uchinaaguchi (Okinawan language)']
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
    description: 'Discover the beauty of Japan with our guided tours. From the bustling streets of Tokyo to the serene hot springs of Beppu, we offer authentic experiences that connect you to the heart of Japanese culture.',
    featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    tourId: tourId,
    tourDetails: {
      duration: 'Varies',
      highlights: ['Authentic Experiences', 'Expert Local Guides', 'Small Group Sizes'],
      languages: ['English', 'Japanese']
    }
  };
};

export default getTourClientInfo;