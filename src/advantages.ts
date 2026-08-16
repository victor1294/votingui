interface Food {
  ututu: string|number;
  "After Noon": string;
  Evening: string;
}
const food: Food = {
  ututu: 'Pap',
  'After Noon': 'Garri',
  'Evening': 'Beans'
}
type DailyFood =
  'plantain'
  | 'Vegetable'
  | 'Garri'
  | 'Beans'
  | 'Rice'
  | 'Abacha'
  | 'Supagetti'
  | 'Egg'
  | undefined
  | null;

interface APFFood {
    morning: DailyFood;
    "After Noon": DailyFood ;
    Evening: DailyFood;
}
let apfFood: Partial<APFFood> = {};
food.ututu = 'pizza';

apfFood.morning = 'Abacha';
