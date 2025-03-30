import { StockListItem } from "@/types/stock";
export const STOCK_LIST: StockListItem[] = [
  {
    id: 1,
    // imageUrl:
    //   "https://e7.pngegg.com/pngimages/435/145/png-clipart-acetaminophen-fever-common-cold-back-pain-symptom-tablet-electronics-service.png",
    nameAr: "بانادول كولد اند فلو لعلاج البرد والإنفلونزا",
    nameEn: "Panadol Cold And Flu for Cold and Influenza Treatment",
    price: 145,
    quantity: 65,
    status: "AVERAGE",
    category: {
      id: 1,
      nameAr: "مسكن للألم",
      nameEn: "Pain Reliever",
    },
  },
  {
    id: 2,
    nameAr: "بروفين 400 مجم لعلاج الصداع وآلام العضلات",
    nameEn: "Brufen 400mg for Headache and Muscle Pain Relief",
    price: 120,
    quantity: 80,
    imageUrl:
      "https://e7.pngegg.com/pngimages/859/194/png-clipart-effervescent-tablet-acetaminophen-pharmaceutical-drug-posologia-tablet-electronics-pharmaceutical-drug.png",
    status: "HIGH",
    category: {
      id: 2,
      nameAr: "مسكن للألم",
      nameEn: "Pain Reliever",
    },
  },
  {
    id: 3,
    nameAr: "كومتركس لعلاج أعراض البرد والحساسية",
    nameEn: "Comtrex for Cold Symptoms and Allergy Relief",
    price: 135,
    quantity: 50,
    imageUrl:
      "https://e7.pngegg.com/pngimages/681/560/png-clipart-effervescent-tablet-aspirin-vitamin-c-pharmaceutical-drug-tablet-electronics-service.png",
    status: "LOW",
    category: {
      id: 3,
      nameAr: "مضاد للحساسية",
      nameEn: "Antihistamine",
    },
  },
  {
    id: 4,
    nameAr: "بنادول اكسترا لعلاج الصداع وآلام الجسم",
    nameEn: "Panadol Extra for Headache and Body Pain Relief",
    price: 155,
    quantity: 70,
    // imageUrl:
    //   "https://e7.pngegg.com/pngimages/843/764/png-clipart-pastille-cough-pharmacy-tablet-pharmaceutical-drug-tablet-electronics-service-thumbnail.png",
    status: "AVERAGE",
    category: {
      id: 1,
      nameAr: "مسكن للألم",
      nameEn: "Pain Reliever",
    },
  },
  {
    id: 5,
    nameAr: "هايبوتنس لعلاج ضغط الدم المرتفع",
    nameEn: "Hypoten for High Blood Pressure Treatment",
    price: 200,
    quantity: 30,
    // imageUrl:
    //   "https://e7.pngegg.com/pngimages/1008/930/png-clipart-benylin-cough-medicine-purple-drank-codeine-cough-syrup-pharmaceutical-drug-magenta-thumbnail.png",
    status: "LOW",
    category: {
      id: 4,
      nameAr: "أدوية ضغط الدم",
      nameEn: "Blood Pressure Medication",
    },
  },
  {
    id: 6,
    nameAr: "اسبوسيد لحماية القلب والوقاية من الجلطات",
    nameEn: "Aspocid for Heart Protection and Stroke Prevention",
    price: 95,
    quantity: 120,
    imageUrl:
      "https://e7.pngegg.com/pngimages/482/889/png-clipart-benylin-cough-medicine-pharmaceutical-drug-common-cold-coughs-service-antihistamine-thumbnail.png",
    status: "HIGH",
    category: {
      id: 5,
      nameAr: "أدوية القلب",
      nameEn: "Cardiovascular Medication",
    },
  },
  {
    id: 7,
    nameAr: "اموكسيل 500 مجم مضاد حيوي واسع المجال",
    nameEn: "Amoxil 500mg Broad Spectrum Antibiotic",
    price: 180,
    quantity: 45,
    imageUrl:
      "https://e7.pngegg.com/pngimages/48/752/png-clipart-strepsils-throat-lozenge-2-4-dichlorobenzyl-alcohol-pharmaceutical-drug-sugar-service-grocery-store-thumbnail.png",
    status: "LOW",
    category: {
      id: 6,
      nameAr: "مضاد حيوي",
      nameEn: "Antibiotic",
    },
  },
  {
    id: 8,
    nameAr: "فولتارين جل لعلاج التهاب المفاصل والعضلات",
    nameEn: "Voltaren Gel for Joint and Muscle Inflammation",
    price: 210,
    quantity: 90,
    imageUrl:
      "https://e7.pngegg.com/pngimages/813/804/png-clipart-mouthwash-povidone-iodine-sore-throat-gargling-antiseptic-sore-throat-pharmaceutical-drug-oral-hygiene.png",
    status: "HIGH",
    category: {
      id: 7,
      nameAr: "مسكن موضعي",
      nameEn: "Topical Pain Reliever",
    },
  },
  {
    id: 9,
    nameAr: "كلارينيز لعلاج حساسية الجيوب الأنفية",
    nameEn: "Clarinase for Sinus Allergy Relief",
    price: 175,
    quantity: 60,
    imageUrl:
      "https://e7.pngegg.com/pngimages/266/63/png-clipart-listerine-mouthwash-johnson-johnson-listerine-mouthwash-listerine-total-care-tooth-germ-dentistry-toothpaste.png",
    status: "AVERAGE",
    category: {
      id: 3,
      nameAr: "مضاد للحساسية",
      nameEn: "Antihistamine",
    },
  },
  {
    id: 10,
    nameAr: "ديسبرين مميع للدم للوقاية من الجلطات",
    nameEn: "Disprin Blood Thinner for Stroke Prevention",
    price: 85,
    quantity: 110,
    imageUrl:
      "https://e7.pngegg.com/pngimages/265/989/png-clipart-mouthwash-colgate-toothpaste-tooth-whitening-toothbrush-toothpaste-miscellaneous-dentistry-thumbnail.png",
    status: "HIGH",
    category: {
      id: 5,
      nameAr: "أدوية القلب",
      nameEn: "Cardiovascular Medication",
    },
  },
  {
    id: 11,
    nameAr: "ميباجن لعلاج القولون العصبي والتقلصات",
    nameEn: "Mebagen for Irritable Bowel Syndrome and Cramps",
    price: 190,
    quantity: 40,
    imageUrl:
      "https://e7.pngegg.com/pngimages/498/339/png-clipart-boiron-cough-honey-homeopathy-common-cold-honey-child-pharmaceutical-drug.png",
    status: "LOW",
    category: {
      id: 8,
      nameAr: "أدوية الجهاز الهضمي",
      nameEn: "Gastrointestinal Medication",
    },
  },
  {
    id: 12,
    nameAr: "سينوبريت لعلاج التهابات الجهاز التنفسي",
    nameEn: "Sinupret for Respiratory Infections",
    price: 165,
    quantity: 55,
    imageUrl:
      "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
    status: "AVERAGE",
    category: {
      id: 9,
      nameAr: "أدوية الجهاز التنفسي",
      nameEn: "Respiratory Medication",
    },
  },
  {
    id: 13,
    nameAr: "دولفين 75 مسكن قوي للآلام",
    nameEn: "Dolphin 75 Strong Pain Reliever",
    price: 220,
    quantity: 35,
    imageUrl:
      "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
    status: "LOW",
    category: {
      id: 1,
      nameAr: "مسكن للألم",
      nameEn: "Pain Reliever",
    },
  },
  // {
  //   id: 14,
  //   nameAr: "جاتوفين لعلاج التهابات المسالك البولية",
  //   nameEn: "Gatofen for Urinary Tract Infections",
  //   price: 140,
  //   quantity: 75,
  //   imageUrl:
  //     "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
  //   status: "AVERAGE",
  //   category: {
  //     id: 6,
  //     nameAr: "مضاد حيوي",
  //     nameEn: "Antibiotic",
  //   },
  // },
  // {
  //   id: 15,
  //   nameAr: "باراسيتامول لتخفيف الحمى وآلام الجسم",
  //   nameEn: "Paracetamol for Fever and Body Pain Relief",
  //   price: 100,
  //   quantity: 95,
  //   imageUrl:
  //     "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
  //   status: "HIGH",
  //   category: {
  //     id: 1,
  //     nameAr: "مسكن للألم",
  //     nameEn: "Pain Reliever",
  //   },
  // },
  // {
  //   id: 16,
  //   nameAr: "نيوروفين لعلاج الصداع وآلام العضلات",
  //   nameEn: "Nurofen for Headache and Muscle Pain Relief",
  //   price: 130,
  //   quantity: 85,
  //   imageUrl:
  //     "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
  //   status: "HIGH",
  //   category: {
  //     id: 1,
  //     nameAr: "مسكن للألم",
  //     nameEn: "Pain Reliever",
  //   },
  // },
  // {
  //   id: 17,
  //   nameAr: "كلوكسيد لعلاج الالتهابات البكتيرية",
  //   nameEn: "Cloxid for Bacterial Infections",
  //   price: 115,
  //   quantity: 100,
  //   imageUrl:
  //     "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
  //   status: "HIGH",
  //   category: {
  //     id: 6,
  //     nameAr: "مضاد حيوي",
  //     nameEn: "Antibiotic",
  //   },
  // },
  // {
  //   id: 18,
  //   nameAr: "باور كابس لعلاج البرد والإنفلونزا",
  //   nameEn: "Power Caps for Cold and Flu Treatment",
  //   price: 145,
  //   quantity: 70,
  //   imageUrl:
  //     "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
  //   status: "AVERAGE",
  //   category: {
  //     id: 10,
  //     nameAr: "أدوية البرد",
  //     nameEn: "Cold Medication",
  //   },
  // },
  // {
  //   id: 19,
  //   nameAr: "سيبرو 500 مضاد حيوي قوي واسع المجال",
  //   nameEn: "Cipro 500 Broad Spectrum Strong Antibiotic",
  //   price: 200,
  //   quantity: 25,
  //   imageUrl:
  //     "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
  //   status: "LOW",
  //   category: {
  //     id: 6,
  //     nameAr: "مضاد حيوي",
  //     nameEn: "Antibiotic",
  //   },
  // },
  // {
  //   id: 20,
  //   nameAr: "ديكلاك 75 لعلاج التهاب المفاصل والروماتيزم",
  //   nameEn: "Diclac 75 for Arthritis and Rheumatism Treatment",
  //   price: 195,
  //   quantity: 50,
  //   imageUrl:
  //     "https://e7.pngegg.com/pngimages/759/500/png-clipart-vicks-vaporub-common-cold-chest-rub-topical-medication-others-cream-service-thumbnail.png",
  //   status: "LOW",
  //   category: {
  //     id: 7,
  //     nameAr: "مسكن موضعي",
  //     nameEn: "Topical Pain Reliever",
  //   },
  // },
];
