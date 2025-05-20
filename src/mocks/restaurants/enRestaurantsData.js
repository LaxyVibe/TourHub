/**
 * English (en) restaurant data
 */

import { baseRestaurantsData } from './baseRestaurantsData';

export const enRestaurantsData = {
  title: 'Beppu Restaurants',
  subtitle: 'Local Dining Guide',
  restaurants: baseRestaurantsData.restaurants.map(restaurant => {
    // Create a deep copy of the base restaurant data
    const restaurantCopy = JSON.parse(JSON.stringify(restaurant));
    
    // Add language-specific data
    switch (restaurant.id) {
      case 'jigoku-steamer':
        return {
          ...restaurantCopy,
          name: 'Jigoku Mushi Restaurant',
          nameJp: '地獄蒸し料理',
          categories: ['Traditional', 'Steamed Dishes', 'Hot Spring Cuisine'],
          address: '8-6 Kannawa, Beppu, Oita 874-0045, Japan',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['Kannawa Bus Terminal']
            }
          },
          detail: {
            ...restaurantCopy.detail,
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
            hostMessage: 'Jigoku Mushi is a traditional cooking method using the natural steam from hot springs. Our restaurant offers you the unique experience of cooking your own meals over Beppu\'s famous volcanic steam vents. This centuries-old technique creates tender and flavorful dishes that preserve the natural taste of the ingredients. Don\'t miss our specialty seafood basket!'
          }
        };
      
      case 'toyotsune':
        return {
          ...restaurantCopy,
          name: 'Toyotsune',
          nameJp: '豊常',
          categories: ['Izakaya', 'Local Cuisine', 'Seafood'],
          address: '3-10 Kitahama, Beppu, Oita 874-0920, Japan',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['Beppu Station']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: 'Monday-Saturday', hours: '17:00-23:00' },
              { days: 'Sunday', hours: 'Closed' }
            ],
            highlights: [
              'Fresh local fish and seafood',
              'Traditional izakaya atmosphere',
              'Signature toriten (Oita-style fried chicken)'
            ],
            hostMessage: 'Established in 1955, Toyotsune is one of Beppu\'s most beloved izakayas. We take pride in serving the freshest seafood caught daily from Beppu Bay and traditional Oita specialties. Our toriten (Oita-style fried chicken) is made using a secret family recipe passed down through generations. The cozy traditional setting provides an authentic Japanese dining experience.'
          }
        };
      
      case 'robata-yagoemon':
        return {
          ...restaurantCopy,
          name: 'Robata Yagoemon',
          nameJp: '炉端 弥五衛門',
          categories: ['Robatayaki', 'Grilled Food', 'Izakaya'],
          address: '2-14-29 Kitahama, Beppu, Oita 874-0920, Japan',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['Kitahama Station']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: 'Tuesday-Sunday', hours: '17:30-22:30' },
              { days: 'Monday', hours: 'Closed' }
            ],
            highlights: [
              'Traditional robatayaki (fireside cooking)',
              'Local fish and vegetables grilled to perfection',
              'Intimate dining experience'
            ],
            hostMessage: 'Yagoemon offers the traditional robatayaki experience, where fresh ingredients are slow-grilled over charcoal right before your eyes. Our chefs select the best seasonal ingredients each morning from local markets. The restaurant\'s intimate setting with counter seating allows you to watch the entire grilling process. We recommend our signature grilled fish of the day and seasonal vegetable platter.'
          }
        };
      
      case 'takegawara-onsen-cafe':
        return {
          ...restaurantCopy,
          name: 'Takegawara Onsen Cafe',
          nameJp: '竹瓦温泉カフェ',
          categories: ['Cafe', 'Japanese Sweets', 'Tea'],
          address: '16-23 Motomachi, Beppu, Oita 874-0944, Japan',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['Takegawara Onsen']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: 'Daily', hours: '10:00-18:00' }
            ],
            highlights: [
              'Adjacent to historic Takegawara Onsen',
              'Traditional Japanese sweets',
              'Specialty tea selections'
            ],
            hostMessage: 'Our cafe is located right next to the historic Takegawara Onsen, making it the perfect spot to relax after a bath. We specialize in traditional Japanese sweets using local ingredients, especially the famous Beppu "onsen" pudding steamed using hot spring water. Our tea selection includes rare Japanese varieties that pair perfectly with our desserts. The cafe\'s retro ambiance reflects the 100+ year history of the neighboring bath house.'
          }
        };
      
      case 'okamotoya':
        return {
          ...restaurantCopy,
          name: 'Okamotoya',
          nameJp: '岡本屋',
          categories: ['Ramen', 'Noodles', 'Local Cuisine'],
          address: '5-7 Ekimae-cho, Beppu, Oita 874-0934, Japan',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['Beppu Station']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: 'Monday-Saturday', hours: '11:00-22:00' },
              { days: 'Sunday', hours: '11:00-20:00' }
            ],
            highlights: [
              'Local-style ramen',
              'Handmade noodles',
              'Secret broth recipe since 1962'
            ],
            hostMessage: 'Okamotoya has been serving our signature Beppu-style ramen since 1962. Our noodles are handmade fresh daily, and our broth simmers for over 12 hours using a secret family recipe that combines pork, chicken, and local vegetables. The shop\'s location near Beppu Station has made it a favorite stopping point for both locals and travelers for generations. Don\'t miss our special "onsen egg" topping, where we use Beppu\'s hot spring water to create the perfect soft-boiled egg.'
          }
        };
      
      default:
        return restaurantCopy;
    }
  })
};

export default enRestaurantsData;
