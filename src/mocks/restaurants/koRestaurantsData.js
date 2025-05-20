/**
 * Korean (ko) restaurant data
 */

import { baseRestaurantsData } from './baseRestaurantsData';

export const koRestaurantsData = {
  title: '벳푸 레스토랑',
  subtitle: '현지 식당 가이드',
  restaurants: baseRestaurantsData.restaurants.map(restaurant => {
    // Create a deep copy of the base restaurant data
    const restaurantCopy = JSON.parse(JSON.stringify(restaurant));
    
    // Add language-specific data
    switch (restaurant.id) {
      case 'jigoku-steamer':
        return {
          ...restaurantCopy,
          name: '지고쿠 무시 레스토랑',
          nameJp: '地獄蒸し料理',
          categories: ['전통 요리', '찐 요리', '온천 요리'],
          address: '일본, 〒874-0045 오이타현 벳푸시 칸나와 8-6',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['칸나와 버스 터미널']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '월요일-금요일', hours: '11:00-15:00, 17:00-21:00' },
              { days: '토요일-일요일', hours: '10:30-21:00' },
              { days: '공휴일', hours: '10:30-21:00' }
            ],
            highlights: [
              '정통 온천 증기 요리',
              '자연 증기구에서 직접 요리하는 경험',
              '신선한 지역 식재료'
            ],
            hostMessage: '지고쿠 무시는 온천의 자연 증기를 이용하는 전통적인 요리법입니다. 저희 레스토랑은 벳푸의 유명한 화산 증기구에서 직접 요리를 할 수 있는 독특한 경험을 제공합니다. 이 수백 년의 역사를 가진 기술은 재료 본연의 맛을 보존하면서 부드럽고 풍미 가득한 요리를 만들어냅니다. 저희의 특제 해산물 바구니를 꼭 맛보세요!'
          }
        };
      
      case 'toyotsune':
        return {
          ...restaurantCopy,
          name: '도요쓰네',
          nameJp: '豊常',
          categories: ['이자카야', '현지 요리', '해산물'],
          address: '일본, 〒874-0920 오이타현 벳푸시 키타하마 3-10',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['벳푸역']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '월요일-토요일', hours: '17:00-23:00' },
              { days: '일요일', hours: '휴무' }
            ],
            highlights: [
              '신선한 지역 생선과 해산물',
              '전통적인 이자카야 분위기',
              '시그니처 도리텐(오이타식 닭튀김)'
            ],
            hostMessage: '1955년에 설립된 도요쓰네는 벳푸에서 가장 사랑받는 이자카야 중 하나입니다. 저희는 매일 벳푸 만에서 잡아온 신선한 해산물과 오이타의 전통 특선 요리를 제공하는 것을 자랑으로 생각합니다. 저희의 도리텐(오이타식 닭튀김)은 대대로 전해 내려오는 비밀 가족 레시피로 만들어집니다. 아늑한 전통적인 분위기는 정통 일본 식사 경험을 제공합니다.'
          }
        };
      
      case 'robata-yagoemon':
        return {
          ...restaurantCopy,
          name: '로바타 야고에몬',
          nameJp: '炉端 弥五衛門',
          categories: ['로바타야키', '구이 요리', '이자카야'],
          address: '일본, 〒874-0920 오이타현 벳푸시 키타하마 2-14-29',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['키타하마역']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '화요일-일요일', hours: '17:30-22:30' },
              { days: '월요일', hours: '휴무' }
            ],
            highlights: [
              '전통적인 로바타야키(화로 요리)',
              '완벽하게 구운 지역 생선과 채소',
              '친밀한 식사 경험'
            ],
            hostMessage: '야고에몬은 신선한 재료를 눈앞에서 숯불로 천천히 구워내는 전통적인 로바타야키 경험을 제공합니다. 저희 셰프들은 매일 아침 지역 시장에서 최고의 계절 식재료를 선별합니다. 카운터 좌석이 있는 아늑한 공간 구성은 요리 과정 전체를 지켜볼 수 있게 해줍니다. 저희 시그니처 오늘의 생선 구이와 계절 채소 플래터를 추천합니다.'
          }
        };
      
      case 'takegawara-onsen-cafe':
        return {
          ...restaurantCopy,
          name: '다케가와라 온천 카페',
          nameJp: '竹瓦温泉カフェ',
          categories: ['카페', '일본 디저트', '차'],
          address: '일본, 〒874-0944 오이타현 벳푸시 모토마치 16-23',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['다케가와라 온천']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '매일', hours: '10:00-18:00' }
            ],
            highlights: [
              '역사적인 다케가와라 온천 옆에 위치',
              '전통 일본 디저트',
              '특별한 차 선택'
            ],
            hostMessage: '저희 카페는 역사적인 다케가와라 온천 바로 옆에 위치하여 목욕 후 휴식을 취하기에 완벽한 장소입니다. 저희는 지역 재료를 사용한 전통 일본 디저트, 특히 온천수로 찐 벳푸 유명한 "온천" 푸딩을 전문으로 합니다. 차 셀렉션에는 디저트와 완벽하게 어울리는 희귀한 일본 차 종류가 포함되어 있습니다. 카페의 레트로한 분위기는 인접한 목욕 시설의 100년 이상의 역사를 반영합니다.'
          }
        };
      
      case 'okamotoya':
        return {
          ...restaurantCopy,
          name: '오카모토야',
          nameJp: '岡本屋',
          categories: ['라멘', '국수 요리', '현지 요리'],
          address: '일본, 〒874-0934 오이타현 벳푸시 에키마에초 5-7',
          transportation: {
            ...restaurantCopy.transportation,
            bus: {
              ...restaurantCopy.transportation.bus,
              stops: ['벳푸역']
            }
          },
          detail: {
            ...restaurantCopy.detail,
            openingHours: [
              { days: '월요일-토요일', hours: '11:00-22:00' },
              { days: '일요일', hours: '11:00-20:00' }
            ],
            highlights: [
              '지역식 라멘',
              '수제 면',
              '1962년부터 이어온 비밀 육수 레시피'
            ],
            hostMessage: '오카모토야는 1962년부터 시그니처 벳푸식 라멘을 제공해왔습니다. 저희 면은 매일 신선하게 수제로 만들어지며, 육수는 돼지고기, 닭고기, 지역 채소를 조합한 비밀 가족 레시피로 12시간 이상 끓입니다. 벳푸역 근처의 위치는 수 세대에 걸쳐 현지인과 여행자 모두에게 인기 있는 방문 장소가 되었습니다. 벳푸의 온천수를 사용하여 완벽한 반숙 달걀을 만드는 특별한 "온천 달걀" 토핑을 놓치지 마세요.'
          }
        };
      
      default:
        return restaurantCopy;
    }
  })
};

export default koRestaurantsData;
