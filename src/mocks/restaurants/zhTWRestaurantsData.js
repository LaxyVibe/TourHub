/**
 * Traditional Chinese (zh-TW) restaurant data
 */

import { baseRestaurantsData } from './baseRestaurantsData';

export const zhTWRestaurantsData = {
  title: '別府餐廳',
  subtitle: '當地美食指南',
  restaurants: baseRestaurantsData.restaurants.map(restaurant => {
    // Create a deep copy of the base restaurant data
    const restaurantCopy = JSON.parse(JSON.stringify(restaurant));
    
    // Add language-specific data
    switch (restaurant.id) {
      case 'jigoku-steamer':
        return {
          ...restaurantCopy,
          name: '地獄蒸餐廳',
          nameJp: '地獄蒸し料理',
          categories: ['傳統料理', '蒸煮料理', '溫泉料理'],
          address: '日本, 〒874-0045 大分縣別府市鐵輪8-6',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['鐵輪巴士站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '週一至週五', hours: '11:00-15:00, 17:00-21:00' },
              { days: '週六至週日', hours: '10:30-21:00' },
              { days: '假日', hours: '10:30-21:00' }
            ],
            highlights: [
              '正宗溫泉蒸氣烹調',
              '在天然蒸氣孔上烹調自己的食物',
              '新鮮當地食材'
            ],
            hostMessage: '地獄蒸是使用溫泉天然蒸氣的傳統烹飪方法。我們餐廳提供您在別府著名的火山蒸氣孔上烹調自己餐點的獨特體驗。這種有著數百年歷史的技術能創造出保留食材天然風味的嫩滑美食。別錯過我們特色的海鮮籃！'
          }
        };
      
      case 'toyotsune':
        return {
          ...restaurantCopy,
          name: '豐常',
          nameJp: '豊常',
          categories: ['居酒屋', '當地料理', '海鮮'],
          address: '日本, 〒874-0920 大分縣別府市北濱3-10',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['別府站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '週一至週六', hours: '17:00-23:00' },
              { days: '週日', hours: '休息' }
            ],
            highlights: [
              '新鮮本地魚類和海鮮',
              '傳統居酒屋氛圍',
              '招牌炸雞天婦羅（大分風格）'
            ],
            hostMessage: '豐常成立於1955年，是別府最受喜愛的居酒屋之一。我們以提供每天從別府灣捕撈的最新鮮海鮮和大分傳統特色菜為榮。我們的炸雞天婦羅（大分風格炸雞）是使用代代相傳的家族秘方製作的。舒適的傳統環境提供了正宗的日本餐飲體驗。'
          }
        };
      
      case 'robata-yagoemon':
        return {
          ...restaurantCopy,
          name: '爐端彌五衛門',
          nameJp: '炉端 弥五衛門',
          categories: ['爐端燒', '烤物', '居酒屋'],
          address: '日本, 〒874-0920 大分縣別府市北濱2-14-29',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['北濱站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '週二至週日', hours: '17:30-22:30' },
              { days: '週一', hours: '休息' }
            ],
            highlights: [
              '傳統爐端燒（炭火烹調）',
              '完美烤製的當地魚類和蔬菜',
              '親密用餐體驗'
            ],
            hostMessage: '彌五衛門提供傳統的爐端燒體驗，新鮮食材在您眼前慢慢地用炭火烤製。我們的廚師每天早晨從當地市場選擇最好的季節性食材。餐廳的吧台座位設置讓您可以觀看整個烤製過程。我們推薦我們的招牌當日烤魚和季節蔬菜拼盤。'
          }
        };
      
      case 'takegawara-onsen-cafe':
        return {
          ...restaurantCopy,
          name: '竹瓦溫泉咖啡館',
          nameJp: '竹瓦温泉カフェ',
          categories: ['咖啡館', '日式甜點', '茶'],
          address: '日本, 〒874-0944 大分縣別府市元町16-23',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['竹瓦溫泉']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '每日', hours: '10:00-18:00' }
            ],
            highlights: [
              '毗鄰歷史悠久的竹瓦溫泉',
              '傳統日式甜點',
              '特色茶品精選'
            ],
            hostMessage: '我們的咖啡館位於歷史悠久的竹瓦溫泉旁邊，是泡完溫泉放鬆的完美去處。我們專注於使用當地食材製作的傳統日式甜點，特別是著名的別府「溫泉」布丁，這是用溫泉水蒸製的。我們的茶品選擇包括與我們的甜點完美搭配的稀有日本茶品。咖啡館的復古氛圍反映了相鄰澡堂超過100年的歷史。'
          }
        };
      
      case 'okamotoya':
        return {
          ...restaurantCopy,
          name: '岡本屋',
          nameJp: '岡本屋',
          categories: ['拉麵', '麵食', '當地料理'],
          address: '日本, 〒874-0934 大分縣別府市站前町5-7',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['別府站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '週一至週六', hours: '11:00-22:00' },
              { days: '週日', hours: '11:00-20:00' }
            ],
            highlights: [
              '當地風格拉麵',
              '手工製麵',
              '自1962年以來的秘傳湯頭配方'
            ],
            hostMessage: '岡本屋自1962年以來一直提供我們招牌的別府風格拉麵。我們的麵條每天新鮮手工製作，我們的湯頭使用結合豬肉、雞肉和當地蔬菜的家族秘方熬煮超過12小時。店舖靠近別府站的位置使它成為幾代當地人和旅客最喜愛的停留點。別錯過我們特製的「溫泉蛋」配料，我們用別府的溫泉水來製作完美的溫泉蛋。'
          }
        };
      
      default:
        return restaurantCopy;
    }
  })
};

export default zhTWRestaurantsData;
