import { ClubItem, ClubItemCategory } from 'types/item';

const CLUB_ITEM_CATEGORY = {
  DIGITAL: '디지털',
  SPORT: '스포츠',
  BOOK: '도서',
  CLOTHES: '의류',
  STATIONERY: '문구류',
  ETC: '기타',
};

const CLIB_ITEM_CATEGORY_MENU: { label: string; category: ClubItemCategory }[] = [
  { label: '디지털', category: 'DIGITAL' },
  { label: '스포츠', category: 'SPORT' },
  { label: '도서', category: 'BOOK' },
  { label: '의류', category: 'CLOTHES' },
  { label: '문구류', category: 'STATIONERY' },
  { label: '기타', category: 'ETC' },
];

const CLUB_ITEM_DATA: ClubItem[] = [
  {
    itemId: 0,
    itemName: '27인치 모니터',
    itemPhoto: '/logo.svg',
    itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
    itemLocation: '동아리 방',
    itemCategory: 'DIGITAL',
    itemRentalMaxDay: 0,
    itemAvailable: true,
    itemUsing: false,
    itemRentalDate: '2024-10-29T05:56:14.799Z',
    itemRentalTime: 0,
  },
  {
    itemId: 1,
    itemName: '농구공',
    itemPhoto: '/logo.svg',
    itemDescription: '따끈따끈한 농구공이다.',
    itemLocation: '동아리 방',
    itemCategory: 'SPORT',
    itemRentalMaxDay: 0,
    itemAvailable: true,
    itemUsing: true,
    itemRentalDate: '2024-10-29T05:56:14.799Z',
    itemRentalTime: 4,
  },
  {
    itemId: 2,
    itemName: '스테이플러',
    itemPhoto: '/logo.svg',
    itemDescription: '따끈따끈한 농구공이다.',
    itemLocation: '동아리 방',
    itemCategory: 'ETC',
    itemRentalMaxDay: 0,
    itemAvailable: true,
    itemUsing: false,
    itemRentalDate: '2024-10-29T05:56:14.799Z',
    itemRentalTime: 1,
  },
  {
    itemId: 3,
    itemName: '하둡의 프로그래밍',
    itemPhoto: '/logo.svg',
    itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
    itemLocation: '동아리 방',
    itemCategory: 'BOOK',
    itemRentalMaxDay: 0,
    itemAvailable: true,
    itemUsing: false,
    itemRentalDate: '2024-10-29T05:56:14.799Z',
    itemRentalTime: 3,
  },
  {
    itemId: 4,
    itemName: '아이폰 충전기',
    itemPhoto: '/logo.svg',
    itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
    itemLocation: '동아리 방',
    itemCategory: 'DIGITAL',
    itemRentalMaxDay: 0,
    itemAvailable: true,
    itemUsing: true,
    itemRentalDate: '2024-10-29T05:56:14.799Z',
    itemRentalTime: 14,
  },
  {
    itemId: 5,
    itemName: '스피커',
    itemPhoto: '/logo.svg',
    itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
    itemLocation: '동아리 방',
    itemCategory: 'DIGITAL',
    itemRentalMaxDay: 0,
    itemAvailable: true,
    itemUsing: false,
    itemRentalDate: '2024-10-29T05:56:14.799Z',
    itemRentalTime: 2,
  },
];

export { CLUB_ITEM_CATEGORY, CLIB_ITEM_CATEGORY_MENU, CLUB_ITEM_DATA };
