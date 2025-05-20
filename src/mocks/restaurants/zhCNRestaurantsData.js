/**
 * Simplified Chinese (zh-CN) restaurant data
 */

import { baseRestaurantsData } from './baseRestaurantsData';

export const zhCNRestaurantsData = {
  title: '别府餐厅',
  subtitle: '当地美食指南',
  restaurants: baseRestaurantsData.restaurants.map(restaurant => {
    // Create a deep copy of the base restaurant data
    const restaurantCopy = JSON.parse(JSON.stringify(restaurant));
    
    // Add language-specific data
    switch (restaurant.id) {
      case 'jigoku-steamer':
        return {
          ...restaurantCopy,
          name: '地狱蒸餐厅',
          nameJp: '地獄蒸し料理',
          categories: ['传统料理', '蒸煮料理', '温泉料理'],
          address: '日本, 〒874-0045 大分县别府市铁轮8-6',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['铁轮巴士站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '周一至周五', hours: '11:00-15:00, 17:00-21:00' },
              { days: '周六至周日', hours: '10:30-21:00' },
              { days: '节假日', hours: '10:30-21:00' }
            ],
            highlights: [
              '正宗温泉蒸气烹饪',
              '在天然蒸气孔上烹饪自己的食物',
              '新鲜当地食材'
            ],
            hostMessage: '地狱蒸是使用温泉天然蒸气的传统烹饪方法。我们餐厅提供您在别府著名的火山蒸气孔上烹饪自己餐点的独特体验。这种有着数百年历史的技术能创造出保留食材天然风味的嫩滑美食。别错过我们特色的海鲜篮！'
          }
        };
      
      case 'toyotsune':
        return {
          ...restaurantCopy,
          name: '丰常',
          nameJp: '豊常',
          categories: ['居酒屋', '当地料理', '海鲜'],
          address: '日本, 〒874-0920 大分县别府市北滨3-10',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['别府站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '周一至周六', hours: '17:00-23:00' },
              { days: '周日', hours: '休息' }
            ],
            highlights: [
              '新鲜本地鱼类和海鲜',
              '传统居酒屋氛围',
              '招牌炸鸡天妇罗（大分风格）'
            ],
            hostMessage: '丰常成立于1955年，是别府最受喜爱的居酒屋之一。我们以提供每天从别府湾捕捞的最新鲜海鲜和大分传统特色菜为荣。我们的炸鸡天妇罗（大分风格炸鸡）是使用代代相传的家族秘方制作的。舒适的传统环境提供了正宗的日本餐饮体验。'
          }
        };
      
      case 'robata-yagoemon':
        return {
          ...restaurantCopy,
          name: '炉端弥五卫门',
          nameJp: '炉端 弥五衛門',
          categories: ['炉端烧', '烤物', '居酒屋'],
          address: '日本, 〒874-0920 大分县别府市北滨2-14-29',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['北滨站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '周二至周日', hours: '17:30-22:30' },
              { days: '周一', hours: '休息' }
            ],
            highlights: [
              '传统炉端烧（炭火烹饪）',
              '完美烤制的当地鱼类和蔬菜',
              '亲密用餐体验'
            ],
            hostMessage: '弥五卫门提供传统的炉端烧体验，新鲜食材在您眼前慢慢地用炭火烤制。我们的厨师每天早晨从当地市场选择最好的季节性食材。餐厅的吧台座位设置让您可以观看整个烤制过程。我们推荐我们的招牌当日烤鱼和季节蔬菜拼盘。'
          }
        };
      
      case 'takegawara-onsen-cafe':
        return {
          ...restaurantCopy,
          name: '竹瓦温泉咖啡馆',
          nameJp: '竹瓦温泉カフェ',
          categories: ['咖啡馆', '日式甜点', '茶'],
          address: '日本, 〒874-0944 大分县别府市元町16-23',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['竹瓦温泉']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '每日', hours: '10:00-18:00' }
            ],
            highlights: [
              '毗邻历史悠久的竹瓦温泉',
              '传统日式甜点',
              '特色茶品精选'
            ],
            hostMessage: '我们的咖啡馆位于历史悠久的竹瓦温泉旁边，是泡完温泉放松的完美去处。我们专注于使用当地食材制作的传统日式甜点，特别是著名的别府「温泉」布丁，这是用温泉水蒸制的。我们的茶品选择包括与我们的甜点完美搭配的稀有日本茶品。咖啡馆的复古氛围反映了相邻澡堂超过100年的历史。'
          }
        };
      
      case 'okamotoya':
        return {
          ...restaurantCopy,
          name: '冈本屋',
          nameJp: '岡本屋',
          categories: ['拉面', '面食', '当地料理'],
          address: '日本, 〒874-0934 大分县别府市站前町5-7',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['别府站']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '周一至周六', hours: '11:00-22:00' },
              { days: '周日', hours: '11:00-20:00' }
            ],
            highlights: [
              '当地风格拉面',
              '手工制面',
              '自1962年以来的秘传汤头配方'
            ],
            hostMessage: '冈本屋自1962年以来一直提供我们招牌的别府风格拉面。我们的面条每天新鲜手工制作，我们的汤头使用结合猪肉、鸡肉和当地蔬菜的家族秘方熬煮超过12小时。店铺靠近别府站的位置使它成为几代当地人和旅客最喜爱的停留点。别错过我们特制的「温泉蛋」配料，我们用别府的温泉水来制作完美的温泉蛋。'
          }
        };
      
      default:
        return restaurantCopy;
    }
  })
};

export default zhCNRestaurantsData;
