/**
 * Japanese (ja) restaurant data
 */

import { baseRestaurantsData } from './baseRestaurantsData';

export const jaRestaurantsData = {
  title: '別府のレストラン',
  subtitle: '地元のダイニングガイド',
  restaurants: baseRestaurantsData.restaurants.map(restaurant => {
    // Create a deep copy of the base restaurant data
    const restaurantCopy = JSON.parse(JSON.stringify(restaurant));
    
    // Add language-specific data
    switch (restaurant.id) {
      case 'jigoku-steamer':
        return {
          ...restaurantCopy,
          name: '地獄蒸し料理',
          nameEn: 'Jigoku Mushi Restaurant',
          categories: ['伝統料理', '蒸し料理', '温泉料理'],
          address: '〒874-0045 大分県別府市鉄輪8-6',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['鉄輪バスターミナル']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '月曜～金曜', hours: '11:00-15:00, 17:00-21:00' },
              { days: '土曜・日曜', hours: '10:30-21:00' },
              { days: '祝日', hours: '10:30-21:00' }
            ],
            highlights: [
              '本格的な温泉蒸し料理',
              '自然の蒸気孔で自分の食事を調理',
              '新鮮な地元の食材'
            ],
            hostMessage: '「地獄蒸し」は温泉の自然蒸気を使う伝統的な調理法です。当レストランでは、別府の有名な火山蒸気孔で自分の食事を調理するユニークな体験を提供しています。この何世紀も前からある技術は、素材の自然な味を保ちながら、柔らかく風味豊かな料理を生み出します。当店自慢の海鮮バスケットをお見逃しなく！'
          }
        };
      
      case 'toyotsune':
        return {
          ...restaurantCopy,
          name: '豊常',
          nameEn: 'Toyotsune',
          categories: ['居酒屋', '郷土料理', '海鮮料理'],
          address: '〒874-0920 大分県別府市北浜3-10',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['別府駅']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '月曜～土曜', hours: '17:00-23:00' },
              { days: '日曜', hours: '休業' }
            ],
            highlights: [
              '新鮮な地元の魚介類',
              '伝統的な居酒屋の雰囲気',
              '名物とり天（大分風唐揚げ）'
            ],
            hostMessage: '1955年に創業した豊常は、別府で最も愛されている居酒屋の一つです。毎日、別府湾で獲れた新鮮な魚介類と大分の伝統的な名物料理を提供することを誇りにしています。当店の「とり天」（大分風唐揚げ）は、代々受け継がれた秘伝のレシピで作られています。居心地の良い伝統的な雰囲気で、本格的な日本の食事体験をお楽しみいただけます。'
          }
        };
      
      case 'robata-yagoemon':
        return {
          ...restaurantCopy,
          name: '炉端 弥五衛門',
          nameEn: 'Robata Yagoemon',
          categories: ['炉端焼き', '焼き物', '居酒屋'],
          address: '〒874-0920 大分県別府市北浜2-14-29',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['北浜駅']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '火曜～日曜', hours: '17:30-22:30' },
              { days: '月曜', hours: '休業' }
            ],
            highlights: [
              '伝統的な炉端焼き（囲炉裏料理）',
              '完璧に焼き上げられた地元の魚と野菜',
              '親密な食事体験'
            ],
            hostMessage: '弥五衛門では、新鮮な食材が目の前で炭火でじっくりと焼かれる伝統的な炉端焼きの体験を提供しています。シェフたちは毎朝地元の市場から最高の季節の食材を厳選しています。カウンター席のある親密な店内設定により、焼き上げの過程全体をご覧いただけます。当店自慢の本日の焼き魚と季節の野菜盛り合わせをお勧めします。'
          }
        };
      
      case 'takegawara-onsen-cafe':
        return {
          ...restaurantCopy,
          name: '竹瓦温泉カフェ',
          nameEn: 'Takegawara Onsen Cafe',
          categories: ['カフェ', '和菓子', 'お茶'],
          address: '〒874-0944 大分県別府市元町16-23',
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
              { days: '毎日', hours: '10:00-18:00' }
            ],
            highlights: [
              '歴史ある竹瓦温泉に隣接',
              '伝統的な和菓子',
              '特選茶葉のセレクション'
            ],
            hostMessage: '当カフェは歴史ある竹瓦温泉のすぐ隣にあり、入浴後にリラックスするのに最適な場所です。地元の食材を使った伝統的な和菓子、特に温泉水を使って蒸した別府名物の「温泉プリン」を専門としています。お茶のセレクションには、デザートと完璧に合う珍しい日本のバラエティが含まれています。カフェのレトロな雰囲気は、隣接する浴場の100年以上の歴史を反映しています。'
          }
        };
      
      case 'okamotoya':
        return {
          ...restaurantCopy,
          name: '岡本屋',
          nameEn: 'Okamotoya',
          categories: ['ラーメン', '麺類', '郷土料理'],
          address: '〒874-0934 大分県別府市駅前町5-7',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['別府駅']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '月曜～土曜', hours: '11:00-22:00' },
              { days: '日曜', hours: '11:00-20:00' }
            ],
            highlights: [
              '地元風ラーメン',
              '手打ち麺',
              '1962年以来の秘伝スープレシピ'
            ],
            hostMessage: '岡本屋は1962年から別府スタイルのラーメンを提供しています。麺は毎日手作りされたものを使用し、スープは豚肉、鶏肉、地元の野菜を組み合わせた秘伝のファミリーレシピを使って12時間以上煮込んでいます。別府駅近くの場所にあるこのお店は、何世代にもわたって地元の人々や旅行者の両方に愛されてきました。別府の温泉水を使って作る完璧な半熟卵、特製の「温泉卵」トッピングをお見逃しなく。'
          }
        };
      
      default:
        return restaurantCopy;
    }
  })
};

export default jaRestaurantsData;
