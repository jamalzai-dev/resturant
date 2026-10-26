import type { Localized } from '../config/business';
import { SITE_IMAGES, type SiteImage } from '../config/siteImages';
export const CATEGORIES = [
  'all',
  'pizza',
  'rice',
  'kebab',
  'rolls',
  'burgers',
  'crispy',
  'platter',
  'juice',
  'dessert',
] as const;
export type Category = (typeof CATEGORIES)[number];
export type PizzaSize = 'small' | 'medium' | 'large';
export type MenuItem = {
  id: string;
  name: Localized;
  description: Localized;
  category: Category;
  price: number | null;
  sizes?: Record<PizzaSize, number>;
  image?: SiteImage;
  tag?: 'signature' | 'fromGrill' | 'fresh';
  contents?: Localized[];
};
const PLATTER_CONTENTS: Localized[] = [
  { en: 'Seasoned long-grain rice', ps: 'خوندورې اوږدې وریجې' },
  { en: 'Slow-cooked meat', ps: 'ورو پخې شوې غوښې' },
  { en: 'Fish fillets', ps: 'د ماهي ټوټې' },
  { en: 'Grilled seekh kebabs', ps: 'سیخ کباب' },
  { en: 'Fresh cucumber, tomato and onion salad', ps: 'د بادرنګو، رومیانو او پیازو تازه سلاته' },
];
// Supplied prices are retained. Additional pizza prices and platter contents are demo examples.
export const MENU: MenuItem[] = [
  {
    id: 'special-pizza',
    category: 'pizza',
    price: 180,
    name: {
      en: 'Special Pizza',
      ps: 'فل سپیشل پیزا',
    },
    description: {
      en: 'Chicken, vegetables and mozzarella.',
      ps: 'چرګ، سبزي او موزرېلا پنیر.',
    },
    sizes: {
      small: 180,
      medium: 300,
      large: 500,
    },
    tag: 'signature',
    image: SITE_IMAGES.menu['special-pizza'],
  },
  {
    id: 'cheese-pizza',
    category: 'pizza',
    price: 160,
    name: {
      en: 'Cheese Pizza',
      ps: 'چیز پیزا',
    },
    description: {
      en: 'Tomato sauce and plenty of mozzarella.',
      ps: 'د رومیانو ساس او موزرېلا پنیر.',
    },
    sizes: {
      small: 160,
      medium: 280,
      large: 450,
    },
    image: SITE_IMAGES.menu['cheese-pizza'],
  },
  {
    id: 'crown-pizza',
    category: 'pizza',
    price: 220,
    name: {
      en: 'Crown Crust Pizza',
      ps: 'کراون کرسټ پیزا',
    },
    description: {
      en: 'Chicken pizza with a filled crown-style crust.',
      ps: 'د چرګ پیزا له ډکې کراون کرسټ غاړې سره.',
    },
    sizes: {
      small: 220,
      medium: 350,
      large: 550,
    },
    image: SITE_IMAGES.menu['crown-pizza'],
  },
  {
    id: 'tikka-pizza',
    category: 'pizza',
    price: 200,
    name: {
      en: 'Chicken Tikka Pizza',
      ps: 'چکن تکه پیزا',
    },
    description: {
      en: 'Tikka chicken, peppers and onion.',
      ps: 'تکه چرګ، مرچ او پیاز.',
    },
    sizes: {
      small: 200,
      medium: 320,
      large: 520,
    },
    image: SITE_IMAGES.menu['tikka-pizza'],
  },
  {
    id: 'bbq-pizza',
    category: 'pizza',
    price: 200,
    name: {
      en: 'BBQ Chicken Pizza',
      ps: 'باربیکیو چکن پیزا',
    },
    description: {
      en: 'Chicken, onion and smoky BBQ sauce.',
      ps: 'چرګ، پیاز او باربیکیو ساس.',
    },
    sizes: {
      small: 200,
      medium: 320,
      large: 520,
    },
    image: SITE_IMAGES.menu['bbq-pizza'],
  },
  {
    id: 'veggie-pizza',
    category: 'pizza',
    price: 170,
    name: {
      en: 'Veggie Pizza',
      ps: 'د سبزیو پیزا',
    },
    description: {
      en: 'Peppers, olives, onion and cheese.',
      ps: 'مرچ، زیتون، پیاز او پنیر.',
    },
    sizes: {
      small: 170,
      medium: 280,
      large: 460,
    },
    image: SITE_IMAGES.menu['veggie-pizza'],
  },
  {
    id: 'fish-pizza',
    category: 'pizza',
    price: 220,
    name: {
      en: 'Fish Pizza',
      ps: 'د ماهي پیزا',
    },
    description: {
      en: 'Fish, peppers and a light tomato sauce.',
      ps: 'ماهي، مرچ او د رومیانو ساس.',
    },
    sizes: {
      small: 220,
      medium: 350,
      large: 550,
    },
    image: SITE_IMAGES.menu['fish-pizza'],
  },
  {
    id: 'fajita-pizza',
    category: 'pizza',
    price: 200,
    name: {
      en: 'Fajita Pizza',
      ps: 'فاهیتا پیزا',
    },
    description: {
      en: 'Spiced chicken with peppers and onion.',
      ps: 'مصالحه شوی چرګ له مرچ او پیاز سره.',
    },
    sizes: {
      small: 200,
      medium: 320,
      large: 520,
    },
    image: SITE_IMAGES.menu['fajita-pizza'],
  },
  {
    id: 'pepperoni-pizza',
    category: 'pizza',
    price: 200,
    name: {
      en: 'Pepperoni Pizza',
      ps: 'پیپروني پیزا',
    },
    description: {
      en: 'Pepperoni, mozzarella and tomato sauce.',
      ps: 'پیپروني، موزرېلا او د رومیانو ساس.',
    },
    sizes: {
      small: 200,
      medium: 320,
      large: 520,
    },
    image: SITE_IMAGES.menu['pepperoni-pizza'],
  },
  {
    id: 'hot-pizza',
    category: 'pizza',
    price: 200,
    name: {
      en: 'Hot & Spicy Pizza',
      ps: 'تنده پیزا',
    },
    description: {
      en: 'Chicken, chillies and jalapeños.',
      ps: 'چرګ، تند مرچ او جلاپینو.',
    },
    sizes: {
      small: 200,
      medium: 320,
      large: 520,
    },
    image: SITE_IMAGES.menu['hot-pizza'],
  },
  {
    id: 'lovers-pizza',
    category: 'pizza',
    price: 230,
    name: {
      en: 'Pizza Lovers / Mix Pizza',
      ps: 'پیزا لورز / مکس پیزا',
    },
    description: {
      en: 'Chicken, pepperoni, vegetables and extra cheese.',
      ps: 'چرګ، پیپروني، سبزي او زیات پنیر.',
    },
    sizes: {
      small: 230,
      medium: 370,
      large: 580,
    },
    image: SITE_IMAGES.menu['lovers-pizza'],
  },
  {
    id: 'rosh',
    category: 'rice',
    price: 250,
    name: {
      en: 'Rosh / Meat Dish',
      ps: 'روش',
    },
    description: {
      en: 'Slow-cooked meat with a light broth.',
      ps: 'ورو پاخه شوي غوښه له شوروا سره.',
    },
    image: SITE_IMAGES.menu['rosh'],
  },
  {
    id: 'kabuli-palaw',
    category: 'rice',
    price: 180,
    name: {
      en: 'Kabuli Palaw',
      ps: 'کابلي پلو',
    },
    description: {
      en: 'Rice with carrots and raisins.',
      ps: 'وریجې له ګازرو او ممیزو سره.',
    },
    tag: 'signature',
    image: SITE_IMAGES.menu['kabuli-palaw'],
  },
  {
    id: 'plain-palaw',
    category: 'rice',
    price: 100,
    name: {
      en: 'Plain Palaw',
      ps: 'ساده پلو',
    },
    description: {
      en: 'A simple plate of seasoned rice.',
      ps: 'ساده او خوندورې وریجې.',
    },
    image: SITE_IMAGES.menu['plain-palaw'],
  },
  {
    id: 'macha-palaw',
    category: 'rice',
    price: 350,
    name: {
      en: 'Macha Palaw',
      ps: 'ماچه پلو',
    },
    description: {
      en: 'Rice served with a tender meat shank.',
      ps: 'پلو له نرمې ماچې سره.',
    },
    image: SITE_IMAGES.menu['macha-palaw'],
  },
  {
    id: 'chicken-biryani',
    category: 'rice',
    price: 120,
    name: {
      en: 'Chicken Biryani',
      ps: 'چکن بریاني',
    },
    description: {
      en: 'Spiced rice with chicken.',
      ps: 'مصالحه لرونکې وریجې له چرګ سره.',
    },
    image: SITE_IMAGES.menu['chicken-biryani'],
  },
  {
    id: 'plain-biryani',
    category: 'rice',
    price: 70,
    name: {
      en: 'Plain Biryani',
      ps: 'ساده بریاني',
    },
    description: {
      en: 'Fragrant biryani rice.',
      ps: 'خوشبویه د بریاني وریجې.',
    },
    image: SITE_IMAGES.menu['plain-biryani'],
  },
  {
    id: 'chicken-boti',
    category: 'kebab',
    price: 200,
    name: {
      en: 'Chicken Boti Kebab',
      ps: 'چکن بوټي کباب',
    },
    description: {
      en: 'Marinated chicken from the grill.',
      ps: 'مصالحه شوی د چرګ کباب.',
    },
    image: SITE_IMAGES.menu['chicken-boti'],
  },
  {
    id: 'chicken-tikka',
    category: 'kebab',
    price: 200,
    name: {
      en: 'Chicken Tikka Kebab',
      ps: 'چکن تکه کباب',
    },
    description: {
      en: 'Grilled chicken with tikka spices.',
      ps: 'د تکې په مصالحو پوخ شوی چرګ.',
    },
    image: SITE_IMAGES.menu['chicken-tikka'],
  },
  {
    id: 'afghani-kebab',
    category: 'kebab',
    price: 150,
    name: {
      en: 'Afghani Kebab',
      ps: 'افغانی کباب',
    },
    description: {
      en: 'Traditional grilled kebab.',
      ps: 'دودیز خوندور کباب.',
    },
    image: SITE_IMAGES.menu['afghani-kebab'],
  },
  {
    id: 'wings',
    category: 'crispy',
    price: 200,
    name: {
      en: 'Spicy Wings',
      ps: 'سپایسي وینګز',
    },
    description: {
      en: 'Crispy chicken wings with a little heat.',
      ps: 'کرسپی او تند د چرګ وزرونه.',
    },
    image: SITE_IMAGES.menu['wings'],
  },
  {
    id: 'malai-boti',
    category: 'kebab',
    price: 200,
    name: {
      en: 'Chicken Malai Boti',
      ps: 'چکن ملایي بوټي',
    },
    description: {
      en: 'Chicken in a mild, creamy marinade.',
      ps: 'د چرګ نرم کباب له ملایي مصالحو سره.',
    },
    image: SITE_IMAGES.menu['malai-boti'],
  },
  {
    id: 'shami-kebab',
    category: 'kebab',
    price: 200,
    name: {
      en: 'Shami Kebab',
      ps: 'شامي کباب',
    },
    description: {
      en: 'Soft meat patties with warm spices.',
      ps: 'نرمې د غوښې ټکۍ له مصالحو سره.',
    },
    image: SITE_IMAGES.menu['shami-kebab'],
  },
  {
    id: 'pizza-roll',
    category: 'rolls',
    price: 120,
    name: {
      en: 'Pizza Roll',
      ps: 'پیزا رول',
    },
    description: {
      en: 'Cheese and pizza filling in a crisp roll.',
      ps: 'پنیر او د پیزا مواد په کرسپی رول کې.',
    },
    image: SITE_IMAGES.menu['pizza-roll'],
  },
  {
    id: 'shawarma',
    category: 'rolls',
    price: 70,
    name: {
      en: 'Shawarma',
      ps: 'شورما',
    },
    description: {
      en: 'Chicken, salad and sauce in a wrap.',
      ps: 'چرګ، سلاته او ساس په ډوډۍ کې.',
    },
    image: SITE_IMAGES.menu['shawarma'],
  },
  {
    id: 'special-zinger',
    category: 'burgers',
    price: 200,
    name: {
      en: 'Special Zinger Burger',
      ps: 'سپیشل زینګر برګر',
    },
    description: {
      en: 'Crispy chicken, cheese and house sauce.',
      ps: 'کرسپی چرګ، پنیر او ځانګړی ساس.',
    },
    tag: 'signature',
    image: SITE_IMAGES.menu['special-zinger'],
  },
  {
    id: 'zinger',
    category: 'burgers',
    price: 120,
    name: {
      en: 'Zinger Burger',
      ps: 'زینګر برګر',
    },
    description: {
      en: 'Crispy chicken with salad and sauce.',
      ps: 'کرسپی چرګ له سلاتې او ساس سره.',
    },
    image: SITE_IMAGES.menu['zinger'],
  },
  {
    id: 'broast',
    category: 'crispy',
    price: 200,
    name: {
      en: 'Chicken Broast',
      ps: 'چکن بروست',
    },
    description: {
      en: 'Golden, crispy chicken.',
      ps: 'طلایي او کرسپی چرګ.',
    },
    image: SITE_IMAGES.menu['broast'],
  },
  {
    id: 'platter-2',
    category: 'platter',
    price: 400,
    name: {
      en: '2-Person Platter',
      ps: 'دوه کسیزه پلیټر',
    },
    description: {
      en: 'A sharing meal for two.',
      ps: 'د دوو کسانو لپاره ګډ خواړه.',
    },
    contents: PLATTER_CONTENTS,
    image: SITE_IMAGES.menu['platter-2'],
  },
  {
    id: 'platter-4',
    category: 'platter',
    price: 700,
    name: {
      en: '4-Person Platter',
      ps: 'څلور کسیزه پلیټر',
    },
    description: {
      en: 'A family platter for four.',
      ps: 'د څلورو کسانو لپاره د کورنۍ پلیټر.',
    },
    contents: PLATTER_CONTENTS,
    image: SITE_IMAGES.menu['platter-4'],
  },
  {
    id: 'platter-6',
    category: 'platter',
    price: 1300,
    name: {
      en: '6-Person Platter',
      ps: 'شپږ کسیزه پلیټر',
    },
    description: {
      en: 'A sharing platter for six.',
      ps: 'د شپږو کسانو لپاره ګډ پلیټر.',
    },
    contents: PLATTER_CONTENTS,
    image: SITE_IMAGES.menu['platter-6'],
  },
  {
    id: 'platter-8',
    category: 'platter',
    price: 1500,
    name: {
      en: '8-Person Platter',
      ps: 'اته کسیزه پلیټر',
    },
    description: {
      en: 'A large platter for eight.',
      ps: 'د اتو کسانو لپاره لوی پلیټر.',
    },
    contents: PLATTER_CONTENTS,
    image: SITE_IMAGES.menu['platter-8'],
  },
  {
    id: 'mango',
    category: 'juice',
    price: 120,
    name: {
      en: 'Mango Juice',
      ps: 'ام جوس',
    },
    description: {
      en: 'Sweet mango, served cold.',
      ps: 'د آم خوږ او یخ جوس.',
    },
    image: SITE_IMAGES.menu['mango'],
  },
  {
    id: 'banana',
    category: 'juice',
    price: 120,
    name: {
      en: 'Banana Juice',
      ps: 'کیله جوس',
    },
    description: {
      en: 'A smooth banana drink.',
      ps: 'نرم د کېلې جوس.',
    },
    image: SITE_IMAGES.menu['banana'],
  },
  {
    id: 'chikoo',
    category: 'juice',
    price: 120,
    name: {
      en: 'Chikoo / Sapodilla Juice',
      ps: 'چیکو جوس',
    },
    description: {
      en: 'A creamy chikoo drink.',
      ps: 'نرم او خوږ د چیکو جوس.',
    },
    image: SITE_IMAGES.menu['chikoo'],
  },
  {
    id: 'pineapple',
    category: 'juice',
    price: 120,
    name: {
      en: 'Pineapple Juice',
      ps: 'انناس جوس',
    },
    description: {
      en: 'Sweet and tangy pineapple.',
      ps: 'خوږ او تروش د انناس جوس.',
    },
    image: SITE_IMAGES.menu['pineapple'],
  },
  {
    id: 'strawberry',
    category: 'juice',
    price: 150,
    name: {
      en: 'Strawberry Juice',
      ps: 'سټرابري جوس',
    },
    description: {
      en: 'A refreshing strawberry drink.',
      ps: 'تازه د سټرابري جوس.',
    },
    image: SITE_IMAGES.menu['strawberry'],
  },
  {
    id: 'date',
    category: 'juice',
    price: 120,
    name: {
      en: 'Date Juice',
      ps: 'خرما جوس',
    },
    description: {
      en: 'A smooth date drink.',
      ps: 'نرم د خرما جوس.',
    },
    image: SITE_IMAGES.menu['date'],
  },
  {
    id: 'avocado',
    category: 'juice',
    price: 120,
    name: {
      en: 'Avocado Juice',
      ps: 'ایوکاډو جوس',
    },
    description: {
      en: 'A creamy avocado drink.',
      ps: 'نرم د ایوکاډو جوس.',
    },
    image: SITE_IMAGES.menu['avocado'],
  },
  {
    id: 'mixed',
    category: 'juice',
    price: 120,
    name: {
      en: 'Mixed Juice',
      ps: 'مکس جوس',
    },
    description: {
      en: 'A blend of fruit flavours.',
      ps: 'د مېوو ګډ جوس.',
    },
    image: SITE_IMAGES.menu['mixed'],
  },
  {
    id: 'pomegranate',
    category: 'juice',
    price: 120,
    name: {
      en: 'Pomegranate Juice',
      ps: 'انار',
    },
    description: {
      en: 'Sweet-tart pomegranate juice.',
      ps: 'خوږ او تروش د انارو جوس.',
    },
    image: SITE_IMAGES.menu['pomegranate'],
  },
  {
    id: 'orange',
    category: 'juice',
    price: 100,
    name: {
      en: 'Orange / Malta Juice',
      ps: 'مالټه',
    },
    description: {
      en: 'A refreshing citrus juice.',
      ps: 'تازه د مالټې جوس.',
    },
    image: SITE_IMAGES.menu['orange'],
  },
  {
    id: 'apple',
    category: 'juice',
    price: 100,
    name: {
      en: 'Apple Juice',
      ps: 'سیب',
    },
    description: {
      en: 'A light apple juice.',
      ps: 'تازه د مڼو جوس.',
    },
    image: SITE_IMAGES.menu['apple'],
  },
  {
    id: 'blue-sky',
    category: 'juice',
    price: 60,
    name: {
      en: 'Blue Sky Drink',
      ps: 'بلو سکای',
    },
    description: {
      en: 'A chilled blue refreshment.',
      ps: 'یخ او تازه آبي څښاک.',
    },
    image: SITE_IMAGES.menu['blue-sky'],
  },
  {
    id: 'cashew',
    category: 'dessert',
    price: 80,
    name: {
      en: 'Cashew Ice Cream',
      ps: 'کاجو ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['cashew'],
  },
  {
    id: 'tutti-frutti',
    category: 'dessert',
    price: 80,
    name: {
      en: 'Tutti Frutti Ice Cream',
      ps: 'ټوټي فروټي ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['tutti-frutti'],
  },
  {
    id: 'pistachio',
    category: 'dessert',
    price: 80,
    name: {
      en: 'Pistachio Ice Cream',
      ps: 'پسته ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['pistachio'],
  },
  {
    id: 'qulfa',
    category: 'dessert',
    price: 80,
    name: {
      en: 'Qulfa Ice Cream',
      ps: 'قلفه ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['qulfa'],
  },
  {
    id: 'vanilla',
    category: 'dessert',
    price: 70,
    name: {
      en: 'Vanilla Ice Cream',
      ps: 'ونیلا ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['vanilla'],
  },
  {
    id: 'mango-ice',
    category: 'dessert',
    price: 70,
    name: {
      en: 'Mango Ice Cream',
      ps: 'ام ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['mango-ice'],
  },
  {
    id: 'strawberry-ice',
    category: 'dessert',
    price: 70,
    name: {
      en: 'Strawberry Ice Cream',
      ps: 'سټرابري ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['strawberry-ice'],
  },
  {
    id: 'chocolate',
    category: 'dessert',
    price: 70,
    name: {
      en: 'Chocolate Ice Cream',
      ps: 'چاکلیټ ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['chocolate'],
  },
  {
    id: 'pineapple-ice',
    category: 'dessert',
    price: 70,
    name: {
      en: 'Pineapple Ice Cream',
      ps: 'انناس ایسکریم',
    },
    description: {
      en: 'A scoop of your favourite flavour.',
      ps: 'د خپلې خوښې ایسکریم.',
    },
    image: SITE_IMAGES.menu['pineapple-ice'],
  },
  {
    id: 'afghan-tikka-roll',
    category: 'rolls',
    price: null,
    name: { en: 'Afghan Chicken Tikka Roll', ps: 'افغاني چکن تکه رول' },
    description: {
      en: 'Charcoal chicken, coriander chutney and onions in flatbread.',
      ps: 'په ډوډۍ کې د سکرو چرګ، د ګشنیزو چټني او پیاز.',
    },
    image: SITE_IMAGES.menu['afghan-tikka-roll'],
  },
  {
    id: 'beef-kabab-roll',
    category: 'rolls',
    price: null,
    name: { en: 'Beef Kabab Roll', ps: 'د غوښې کباب رول' },
    description: {
      en: 'Beef seekh kebab, mint chutney and chopped tomatoes.',
      ps: 'د غوا سیخ کباب، د نعناع چټني او میده رومیان.',
    },
    image: SITE_IMAGES.menu['beef-kabab-roll'],
  },
  {
    id: 'spicy-chutney-roll',
    category: 'rolls',
    price: null,
    name: { en: 'Spicy Chutney Roll', ps: 'د تندې چټنۍ رول' },
    description: {
      en: 'Grilled chicken with hot red pepper chutney.',
      ps: 'ګریل شوی چرګ له تندې سرې چټنۍ سره.',
    },
    image: SITE_IMAGES.menu['spicy-chutney-roll'],
  },
  {
    id: 'egg-potato-roll',
    category: 'rolls',
    price: null,
    name: { en: 'Egg & Potato Roll', ps: 'د هګۍ او کچالو رول' },
    description: {
      en: 'Seasoned fried potatoes and boiled egg in soft flatbread.',
      ps: 'په نرمه ډوډۍ کې خوندور سره شوي کچالو او اېشول شوې هګۍ.',
    },
    image: SITE_IMAGES.menu['egg-potato-roll'],
  },
  {
    id: 'afghan-crispy-broast',
    category: 'crispy',
    price: null,
    name: { en: 'Afghan Style Crispy Broast', ps: 'افغاني کرسپي بروست' },
    description: {
      en: 'Garlic and coriander chicken, green chutney and fries.',
      ps: 'د هوږې او ګشنیزو چرګ، شنه چټني او سره کچالو.',
    },
    image: SITE_IMAGES.menu['afghan-crispy-broast'],
  },
  {
    id: 'charcoal-wings',
    category: 'crispy',
    price: null,
    name: { en: 'Charcoal Grilled Wings', ps: 'د سکرو وزرونه' },
    description: {
      en: 'Smoky chicken wings with saffron, lemon and garlic.',
      ps: 'د سکرو وزرونه له زعفرانو، لیمو او هوږې سره.',
    },
    image: SITE_IMAGES.menu['charcoal-wings'],
  },
  {
    id: 'spicy-fried-wings',
    category: 'crispy',
    price: null,
    name: { en: 'Spicy Fried Wings', ps: 'تند سره شوي وزرونه' },
    description: {
      en: 'Crispy chicken wings with a spicy chili coating.',
      ps: 'کرسپي وزرونه له تندو مرچو سره.',
    },
    image: SITE_IMAGES.menu['spicy-fried-wings'],
  },
  {
    id: 'garlic-broast',
    category: 'crispy',
    price: null,
    name: { en: 'Garlic Broast', ps: 'د هوږې بروست' },
    description: {
      en: 'Golden crispy chicken with aromatic garlic.',
      ps: 'طلایي کرسپي چرګ له خوشبویه هوږې سره.',
    },
    image: SITE_IMAGES.menu['garlic-broast'],
  },
];
