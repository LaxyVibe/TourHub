/**
 * Mock data for Beppu Story Restaurants
 * This simulates the data that would be fetched from S3
 */

export const beppuStoryRestaurantsData = {
  title: 'Beppu Restaurants',
  subtitle: 'Local Dining Guide',
  restaurants: [
    {
      id: 'jigoku-steamer',
      name: 'Jigoku Mushi Restaurant',
      nameJp: '地獄蒸し料理',
      thumbnail: 'https://images.unsplash.com/photo-1617196701537-7329482cc9fe',
      categories: ['Traditional', 'Steamed Dishes', 'Hot Spring Cuisine'],
      address: '8-6 Kannawa, Beppu, Oita 874-0045, Japan',
      addressJp: '日本、〒874-0045 大分県別府市鉄輪8-6',
      transportation: {
        bus: {
          duration: 15, // in minutes
          lines: ['36', '37'],
          stops: ['Kannawa Bus Terminal']
        },
        walk: {
          duration: 7 // in minutes
        },
        totalTime: 22 // in minutes
      },
      detail: {
        phone: '+81 977-66-3775',
        website: 'https://jigokumushi-kobo.com/',
        openingHours: [
          { days: 'Monday-Friday', hours: '11:00-15:00, 17:00-21:00' },
          { days: 'Saturday-Sunday', hours: '10:30-21:00' },
          { days: 'Holidays', hours: '10:30-21:00' }
        ],
        highlights: [
          'Authentic hot spring steam cooking',
          'Cook your own food over natural steam vents',
          'Fresh local ingredients'
        ],
        hostMessage: 'Jigoku Mushi is a traditional cooking method using the natural steam from hot springs. Our restaurant offers you the unique experience of cooking your own meals over Beppu\'s famous volcanic steam vents. This centuries-old technique creates tender and flavorful dishes that preserve the natural taste of the ingredients. Don\'t miss our specialty seafood basket!',
        hostMessageJp: '「地獄蒸し」は温泉の自然蒸気を使う伝統的な調理法です。当レストランでは、別府の有名な火山蒸気孔で自分の食事を調理するユニークな体験を提供しています。この何世紀も前からある技術は、素材の自然な味を保ちながら、柔らかく風味豊かな料理を生み出します。当店自慢の海鮮バスケットをお見逃しなく！',
        audioTourAvailable: true,
        rating: 4.7,
        reviewCount: 235,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/jigoku-address.mp3'
      }
    },
    {
      id: 'toyotsune',
      name: 'Toyotsune',
      nameJp: '豊常',
      thumbnail: 'https://images.unsplash.com/photo-1617196034283-96c3f4d45c02',
      categories: ['Izakaya', 'Local Cuisine', 'Seafood'],
      address: '3-10 Kitahama, Beppu, Oita 874-0920, Japan',
      addressJp: '日本、〒874-0920 大分県別府市北浜3-10',
      transportation: {
        bus: {
          duration: 10, // in minutes
          lines: ['5', '7'],
          stops: ['Beppu Station']
        },
        walk: {
          duration: 12 // in minutes
        },
        totalTime: 22 // in minutes
      },
      detail: {
        phone: '+81 977-23-4407',
        website: 'https://toyotsune-beppu.jp/',
        openingHours: [
          { days: 'Monday-Saturday', hours: '17:00-23:00' },
          { days: 'Sunday', hours: 'Closed' }
        ],
        highlights: [
          'Fresh local fish and seafood',
          'Traditional izakaya atmosphere',
          'Signature toriten (Oita-style fried chicken)'
        ],
        hostMessage: 'Established in 1955, Toyotsune is one of Beppu\'s most beloved izakayas. We take pride in serving the freshest seafood caught daily from Beppu Bay and traditional Oita specialties. Our toriten (Oita-style fried chicken) is made using a secret family recipe passed down through generations. The cozy traditional setting provides an authentic Japanese dining experience.',
        hostMessageJp: '1955年に創業した豊常は、別府で最も愛されている居酒屋の一つです。毎日、別府湾で獲れた新鮮な魚介類と大分の伝統的な名物料理を提供することを誇りにしています。当店の「とり天」（大分風唐揚げ）は、代々受け継がれた秘伝のレシピで作られています。居心地の良い伝統的な雰囲気で、本格的な日本の食事体験をお楽しみいただけます。',
        audioTourAvailable: false,
        rating: 4.5,
        reviewCount: 187,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/toyotsune-address.mp3'
      }
    },
    {
      id: 'robata-yagoemon',
      name: 'Robata Yagoemon',
      nameJp: '炉端 弥五衛門',
      thumbnail: 'https://images.unsplash.com/photo-1584568499732-fc88bd0a0ded',
      categories: ['Robatayaki', 'Grilled Food', 'Izakaya'],
      address: '2-14-29 Kitahama, Beppu, Oita 874-0920, Japan',
      addressJp: '日本、〒874-0920 大分県別府市北浜2-14-29',
      transportation: {
        bus: {
          duration: 8, // in minutes
          lines: ['5', '41'],
          stops: ['Kitahama Station']
        },
        walk: {
          duration: 5 // in minutes
        },
        totalTime: 13 // in minutes
      },
      detail: {
        phone: '+81 977-21-3753',
        website: null,
        openingHours: [
          { days: 'Tuesday-Sunday', hours: '17:30-22:30' },
          { days: 'Monday', hours: 'Closed' }
        ],
        highlights: [
          'Traditional robatayaki (fireside cooking)',
          'Local fish and vegetables grilled to perfection',
          'Intimate dining experience'
        ],
        hostMessage: 'Yagoemon offers the traditional robatayaki experience, where fresh ingredients are slow-grilled over charcoal right before your eyes. Our chefs select the best seasonal ingredients each morning from local markets. The restaurant\'s intimate setting with counter seating allows you to watch the entire grilling process. We recommend our signature grilled fish of the day and seasonal vegetable platter.',
        hostMessageJp: '弥五衛門では、新鮮な食材が目の前で炭火でじっくりと焼かれる伝統的な炉端焼きの体験を提供しています。シェフたちは毎朝地元の市場から最高の季節の食材を厳選しています。カウンター席のある親密な店内設定により、焼き上げの過程全体をご覧いただけます。当店自慢の本日の焼き魚と季節の野菜盛り合わせをお勧めします。',
        audioTourAvailable: true,
        rating: 4.8,
        reviewCount: 156,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/yagoemon-address.mp3'
      }
    },
    {
      id: 'takegawara-onsen-cafe',
      name: 'Takegawara Onsen Cafe',
      nameJp: '竹瓦温泉カフェ',
      thumbnail: 'https://images.unsplash.com/photo-1545034215-024ea4c4049b',
      categories: ['Cafe', 'Japanese Sweets', 'Tea'],
      address: '16-23 Motomachi, Beppu, Oita 874-0944, Japan',
      addressJp: '日本、〒874-0944 大分県別府市元町16-23',
      transportation: {
        bus: {
          duration: 5, // in minutes
          lines: ['2', '15'],
          stops: ['Takegawara Onsen']
        },
        walk: {
          duration: 3 // in minutes
        },
        totalTime: 8 // in minutes
      },
      detail: {
        phone: '+81 977-23-1585',
        website: 'https://takegawara-cafe.jp/',
        openingHours: [
          { days: 'Daily', hours: '10:00-18:00' }
        ],
        highlights: [
          'Adjacent to historic Takegawara Onsen',
          'Traditional Japanese sweets',
          'Specialty tea selections'
        ],
        hostMessage: 'Our cafe is located right next to the historic Takegawara Onsen, making it the perfect spot to relax after a bath. We specialize in traditional Japanese sweets using local ingredients, especially the famous Beppu "onsen" pudding steamed using hot spring water. Our tea selection includes rare Japanese varieties that pair perfectly with our desserts. The cafe\'s retro ambiance reflects the 100+ year history of the neighboring bath house.',
        hostMessageJp: '当カフェは歴史ある竹瓦温泉のすぐ隣にあり、入浴後にリラックスするのに最適な場所です。地元の食材を使った伝統的な和菓子、特に温泉水を使って蒸した別府名物の「温泉プリン」を専門としています。お茶のセレクションには、デザートと完璧に合う珍しい日本のバラエティが含まれています。カフェのレトロな雰囲気は、隣接する浴場の100年以上の歴史を反映しています。',
        audioTourAvailable: false,
        rating: 4.3,
        reviewCount: 118,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/takegawara-address.mp3'
      }
    },
    {
      id: 'okamotoya',
      name: 'Okamotoya',
      nameJp: '岡本屋',
      thumbnail: 'https://images.unsplash.com/photo-1618535261138-8de15ded6aa5',
      categories: ['Ramen', 'Noodles', 'Local Cuisine'],
      address: '5-7 Ekimae-cho, Beppu, Oita 874-0934, Japan',
      addressJp: '日本、〒874-0934 大分県別府市駅前町5-7',
      transportation: {
        bus: {
          duration: 0, // in minutes
          lines: ['Direct'],
          stops: ['Beppu Station']
        },
        walk: {
          duration: 5 // in minutes
        },
        totalTime: 5 // in minutes
      },
      detail: {
        phone: '+81 977-25-6158',
        website: null,
        openingHours: [
          { days: 'Monday-Saturday', hours: '11:00-22:00' },
          { days: 'Sunday', hours: '11:00-20:00' }
        ],
        highlights: [
          'Local-style ramen',
          'Handmade noodles',
          'Secret broth recipe since 1962'
        ],
        hostMessage: 'Okamotoya has been serving our signature Beppu-style ramen since 1962. Our noodles are handmade fresh daily, and our broth simmers for over 12 hours using a secret family recipe that combines pork, chicken, and local vegetables. The shop\'s location near Beppu Station has made it a favorite stopping point for both locals and travelers for generations. Don\'t miss our special "onsen egg" topping, where we use Beppu\'s hot spring water to create the perfect soft-boiled egg.',
        hostMessageJp: '岡本屋は1962年から別府スタイルのラーメンを提供しています。麺は毎日手作りされたものを使用し、スープは豚肉、鶏肉、地元の野菜を組み合わせた秘伝のファミリーレシピを使って12時間以上煮込んでいます。別府駅近くの場所にあるこのお店は、何世代にもわたって地元の人々や旅行者の両方に愛されてきました。別府の温泉水を使って作る完璧な半熟卵、特製の「温泉卵」トッピングをお見逃しなく。',
        audioTourAvailable: true,
        rating: 4.6,
        reviewCount: 243,
        audioAddress: 'https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/audio/okamotoya-address.mp3'
      }
    }
  ]
};

export default beppuStoryRestaurantsData;
