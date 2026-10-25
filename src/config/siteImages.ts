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

const interior: SiteImage = {
  src: '/images/interior-1440.webp',
  srcSet: '/images/interior-640.webp 640w, /images/interior-1440.webp 1440w',
  alt: {
    en: 'Illustrative dining room with warm lighting and arches',
    ps: 'بېلګه: د طاقونو لرونکی روښانه د خوړو تالار',
  },
  preview: true,
};

// Featured and gallery images reference the same dish records, so a photo
// replacement automatically stays consistent across every part of the website.
export const SITE_IMAGES = {
  menu,
  hero: menu['special-pizza'],
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
    { id: 'dining', category: 'interiors', image: interior },
    { id: 'grill', category: 'dishes', image: menu['afghani-kebab'] },
    { id: 'juice', category: 'juices', image: menu.strawberry },
    { id: 'rice', category: 'dishes', image: menu['kabuli-palaw'] },
    { id: 'pizza', category: 'dishes', image: menu['special-pizza'] },
    { id: 'mango', category: 'juices', image: menu.mango },
  ],
};
