import { enRestaurantsData } from './enRestaurantsData';
import { jaRestaurantsData } from './jaRestaurantsData';
import { koRestaurantsData } from './koRestaurantsData';
import { zhCNRestaurantsData } from './zhCNRestaurantsData';
import { zhTWRestaurantsData } from './zhTWRestaurantsData';

export const getRestaurantsByLanguage = (language = 'en') => {
  switch (language) {
    case 'ja':
      return jaRestaurantsData;
    case 'ko':
      return koRestaurantsData;
    case 'zh-CN':
    case 'zh':
      return zhCNRestaurantsData;
    case 'zh-TW':
    case 'zh-Hant':
      return zhTWRestaurantsData;
    case 'en':
    default:
      return enRestaurantsData;
  }
};

export default getRestaurantsByLanguage;