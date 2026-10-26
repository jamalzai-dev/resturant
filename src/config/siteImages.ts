import type { Localized } from './business';

export type SiteImage = {
  src: string;
  srcSet?: string;
  alt: Localized;
  position?: string;
  width?: number;
  height?: number;
  preview: boolean;
};

// Each menu item has its own original image. Paths, responsive sizes and alt text
// are centralized here. These generated images illustrate the demo menu only.
const dishPhoto = (id: string, en: string, ps: string, height = 960): SiteImage => ({
  src: `/images/menu/${id}-1440.webp`,
  srcSet: `/images/menu/${id}-640.webp 640w, /images/menu/${id}-1440.webp 1440w`,
  alt: { en: `Illustration: ${en}`, ps: `بېلګه: ${ps}` },
  width: 1440,
  height,
  position: 'center',
  preview: true,
});

const menu = {
  'afghan-tikka-roll': dishPhoto('afghan-tikka-roll', 'Afghan Chicken Tikka Roll', 'افغاني چکن تکه رول'),
  'beef-kabab-roll': dishPhoto('beef-kabab-roll', 'Beef Kabab Roll', 'د غوښې کباب رول'),
  'spicy-chutney-roll': dishPhoto('spicy-chutney-roll', 'Spicy Chutney Roll', 'د تندې چټنۍ رول'),
  'egg-potato-roll': dishPhoto('egg-potato-roll', 'Egg & Potato Roll', 'د هګۍ او کچالو رول'),
  'afghan-crispy-broast': dishPhoto(
    'afghan-crispy-broast',
    'Afghan Style Crispy Broast',
    'افغاني کرسپي بروست',
  ),
  'charcoal-wings': dishPhoto('charcoal-wings', 'Charcoal Grilled Wings', 'د سکرو وزرونه'),
  'spicy-fried-wings': dishPhoto('spicy-fried-wings', 'Spicy Fried Wings', 'تند سره شوي وزرونه'),
  'garlic-broast': dishPhoto('garlic-broast', 'Garlic Broast', 'د هوږې بروست'),

  'special-pizza': dishPhoto('special-pizza', 'Special Pizza', 'فل سپیشل پیزا'),
  'cheese-pizza': dishPhoto('cheese-pizza', 'Cheese Pizza', 'چیز پیزا'),
  'crown-pizza': dishPhoto('crown-pizza', 'Crown Crust Pizza', 'کراون کرسټ پیزا'),
  'tikka-pizza': dishPhoto('tikka-pizza', 'Chicken Tikka Pizza', 'چکن تکه پیزا'),
  'bbq-pizza': dishPhoto('bbq-pizza', 'BBQ Chicken Pizza', 'باربیکیو چکن پیزا'),
  'veggie-pizza': dishPhoto('veggie-pizza', 'Veggie Pizza', 'د سبزیو پیزا'),
  'fish-pizza': dishPhoto('fish-pizza', 'Fish Pizza', 'د ماهي پیزا'),
  'fajita-pizza': dishPhoto('fajita-pizza', 'Fajita Pizza', 'فاهیتا پیزا'),
  'pepperoni-pizza': dishPhoto('pepperoni-pizza', 'Pepperoni Pizza', 'پیپروني پیزا'),
  'hot-pizza': dishPhoto('hot-pizza', 'Hot & Spicy Pizza', 'تنده پیزا'),
  'lovers-pizza': dishPhoto('lovers-pizza', 'Pizza Lovers / Mix Pizza', 'پیزا لورز / مکس پیزا'),
  rosh: dishPhoto('rosh', 'Rosh / Meat Dish', 'روش'),
  'kabuli-palaw': dishPhoto('kabuli-palaw', 'Kabuli Palaw', 'کابلي پلو'),
  'plain-palaw': dishPhoto('plain-palaw', 'Plain Palaw', 'ساده پلو'),
  'macha-palaw': dishPhoto('macha-palaw', 'Macha Palaw', 'ماچه پلو'),
  'chicken-biryani': dishPhoto('chicken-biryani', 'Chicken Biryani', 'چکن بریاني'),
  'plain-biryani': dishPhoto('plain-biryani', 'Plain Biryani', 'ساده بریاني'),
  'chicken-boti': dishPhoto('chicken-boti', 'Chicken Boti Kebab', 'چکن بوټي کباب'),
  'chicken-tikka': dishPhoto('chicken-tikka', 'Chicken Tikka Kebab', 'چکن تکه کباب'),
  'afghani-kebab': dishPhoto('afghani-kebab', 'Afghani Kebab', 'افغانی کباب'),
  wings: dishPhoto('wings', 'Spicy Wings', 'سپایسي وینګز'),
  'malai-boti': dishPhoto('malai-boti', 'Chicken Malai Boti', 'چکن ملایي بوټي'),
  'shami-kebab': dishPhoto('shami-kebab', 'Shami Kebab', 'شامي کباب'),
  'pizza-roll': dishPhoto('pizza-roll', 'Pizza Roll', 'پیزا رول'),
  shawarma: dishPhoto('shawarma', 'Shawarma', 'شورما'),
  'special-zinger': dishPhoto('special-zinger', 'Special Zinger Burger', 'سپیشل زینګر برګر'),
  zinger: dishPhoto('zinger', 'Zinger Burger', 'زینګر برګر'),
  broast: dishPhoto('broast', 'Chicken Broast', 'چکن بروست'),
  'platter-2': dishPhoto('platter-2', '2-Person Platter', 'دوه کسیزه پلیټر'),
  'platter-4': dishPhoto('platter-4', '4-Person Platter', 'څلور کسیزه پلیټر'),
  'platter-6': dishPhoto('platter-6', '6-Person Platter', 'شپږ کسیزه پلیټر'),
  'platter-8': dishPhoto('platter-8', '8-Person Platter', 'اته کسیزه پلیټر'),
  mango: dishPhoto('mango', 'Mango Juice', 'ام جوس'),
  banana: dishPhoto('banana', 'Banana Juice', 'کیله جوس'),
  chikoo: dishPhoto('chikoo', 'Chikoo / Sapodilla Juice', 'چیکو جوس'),
  pineapple: dishPhoto('pineapple', 'Pineapple Juice', 'انناس جوس'),
  strawberry: dishPhoto('strawberry', 'Strawberry Juice', 'سټرابري جوس'),
  date: dishPhoto('date', 'Date Juice', 'خرما جوس'),
  avocado: dishPhoto('avocado', 'Avocado Juice', 'ایوکاډو جوس'),
  mixed: dishPhoto('mixed', 'Mixed Juice', 'مکس جوس'),
  pomegranate: dishPhoto('pomegranate', 'Pomegranate Juice', 'انار'),
  orange: dishPhoto('orange', 'Orange / Malta Juice', 'مالټه'),
  apple: dishPhoto('apple', 'Apple Juice', 'سیب'),
  'blue-sky': dishPhoto('blue-sky', 'Blue Sky Drink', 'بلو سکای'),
  cashew: dishPhoto('cashew', 'Cashew Ice Cream', 'کاجو ایسکریم', 1080),
  'tutti-frutti': dishPhoto('tutti-frutti', 'Tutti Frutti Ice Cream', 'ټوټي فروټي ایسکریم', 1080),
  pistachio: dishPhoto('pistachio', 'Pistachio Ice Cream', 'پسته ایسکریم', 1080),
  qulfa: dishPhoto('qulfa', 'Qulfa Ice Cream', 'قلفه ایسکریم', 1080),
  vanilla: dishPhoto('vanilla', 'Vanilla Ice Cream', 'ونیلا ایسکریم', 1080),
  'mango-ice': dishPhoto('mango-ice', 'Mango Ice Cream', 'ام ایسکریم', 1080),
  'strawberry-ice': dishPhoto('strawberry-ice', 'Strawberry Ice Cream', 'سټرابري ایسکریم', 1080),
  chocolate: dishPhoto('chocolate', 'Chocolate Ice Cream', 'چاکلیټ ایسکریم', 1080),
  'pineapple-ice': dishPhoto('pineapple-ice', 'Pineapple Ice Cream', 'انناس ایسکریم', 1080),
};

export const VENUE_FILTERS = ['all', 'exterior', 'interior', 'dining', 'kitchen', 'experience'] as const;
const venue = {
  'dining-window': {
    src: '/images/venue/dining-window-1440.webp',
    srcSet: '/images/venue/dining-window-640.webp 640w, /images/venue/dining-window-1440.webp 1440w',
    width: 1440,
    height: 1920,
    alt: {
      en: 'Stock: wooden dining tables beside tall garden-facing windows',
      ps: 'سټاک: د لویو کړکیو ترڅنګ د خوړو لرګین مېزونه',
    },
    preview: true,
  } satisfies SiteImage,
  'interior-architecture': {
    src: '/images/venue/interior-architecture-1440.webp',
    srcSet:
      '/images/venue/interior-architecture-640.webp 640w, /images/venue/interior-architecture-1440.webp 1440w',
    width: 1440,
    height: 2160,
    alt: {
      en: 'Stock: warm restaurant architecture, pendant lights and booth seating',
      ps: 'سټاک: د رسټورانټ داخلي جوړښت، څراغونه او څوکۍ',
    },
    preview: true,
  } satisfies SiteImage,
  'dining-tables': {
    src: '/images/venue/dining-tables-1440.webp',
    srcSet: '/images/venue/dining-tables-640.webp 640w, /images/venue/dining-tables-1440.webp 1440w',
    width: 1440,
    height: 1920,
    alt: {
      en: 'Stock: carefully arranged dining tables and woven chairs',
      ps: 'سټاک: منظم د خوړو مېزونه او څوکۍ',
    },
    preview: true,
  } satisfies SiteImage,
  'exterior-day': {
    src: '/images/venue/exterior-day-1440.webp',
    srcSet: '/images/venue/exterior-day-640.webp 640w, /images/venue/exterior-day-1440.webp 1440w',
    width: 1440,
    height: 1920,
    alt: {
      en: 'Stock: restaurant entrance with wooden seating and trailing greenery',
      ps: 'سټاک: د رسټورانټ دروازه، لرګینې څوکۍ او شنه بوټي',
    },
    preview: true,
  } satisfies SiteImage,
  'exterior-evening': {
    src: '/images/venue/exterior-evening-1440.webp',
    srcSet: '/images/venue/exterior-evening-640.webp 640w, /images/venue/exterior-evening-1440.webp 1440w',
    width: 1440,
    height: 2160,
    alt: {
      en: 'Stock: warmly illuminated restaurant entrance at dusk',
      ps: 'سټاک: په ماښام کې د رسټورانټ روښانه دروازه',
    },
    preview: true,
  } satisfies SiteImage,
  kitchen: {
    src: '/images/venue/kitchen-1440.webp',
    srcSet: '/images/venue/kitchen-640.webp 640w, /images/venue/kitchen-1440.webp 1440w',
    width: 1440,
    height: 960,
    alt: {
      en: 'Stock: chefs preparing pizzas in a working restaurant kitchen',
      ps: 'سټاک: اشپزان په پخلنځي کې پیزا چمتو کوي',
    },
    preview: true,
  } satisfies SiteImage,
  experience: {
    src: '/images/venue/experience-1440.webp',
    srcSet: '/images/venue/experience-640.webp 640w, /images/venue/experience-1440.webp 1440w',
    width: 1440,
    height: 2160,
    alt: {
      en: 'Stock: two men sharing a meal and conversation in a cafe',
      ps: 'سټاک: دوه نارینه په کافه کې یوځای خواړه خوري او خبرې کوي',
    },
    preview: true,
  } satisfies SiteImage,
};
const interior = venue['dining-window'];

// Food showcases share menu records. Hero and gallery share the separate venue collection.
export const SITE_IMAGES = {
  menu,
  venue,
  hero: venue['dining-window'],
  featured: { pulao: menu['kabuli-palaw'], kebab: menu['afghani-kebab'], pizza: menu['special-pizza'] },
  platters: {
    'platter-2': menu['platter-2'],
    'platter-4': menu['platter-4'],
    'platter-6': menu['platter-6'],
    'platter-8': menu['platter-8'],
  },
  juices: { strawberry: menu.strawberry, mango: menu.mango, banana: menu.banana },
  desserts: { iceCream: menu.pistachio },
  interiors: { dining: interior },
  about: interior,
  gallery: [
    { id: 'dining-window', category: 'dining', image: venue['dining-window'] },
    { id: 'interior-architecture', category: 'interior', image: venue['interior-architecture'] },
    { id: 'dining-tables', category: 'dining', image: venue['dining-tables'] },
    { id: 'exterior-day', category: 'exterior', image: venue['exterior-day'] },
    { id: 'exterior-evening', category: 'exterior', image: venue['exterior-evening'] },
    { id: 'kitchen', category: 'kitchen', image: venue['kitchen'] },
    { id: 'experience', category: 'experience', image: venue['experience'] },
  ],
};
