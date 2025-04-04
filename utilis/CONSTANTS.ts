export const QTY_STATUS = {
  LOW: {
    id: 1,
    nameAr: "منخفض",
    nameEn: "Low",
    style: "bg-red-100 text-red-900 dark:bg-[#17262E] dark:text-[#FF0D73]",
  },
  AVERAGE: {
    id: 2,
    nameAr: "متوسط",
    nameEn: "Average",
    style: "bg-blue-100 text-blue-900 dark:bg-[#17262E] dark:text-[#FFEA00]",
  },
  HIGH: {
    id: 3,
    nameAr: "مرتفع",
    nameEn: "High",
    style: "bg-green-100 text-green-900 dark:bg-[#17262E] dark:text-[#00Df72]",
  },
};
export const USER_STATUS = {
  ACTIVE: {
    id: 1,
    nameAr: "نشط",
    nameEn: "Active",
    style: "bg-green-100 text-green-900  dark:text-[#00DF72]",
    background: "dark:bg-[#00Df72]",
    value: "ACTIVE",
  },
  INACTIVE: {
    id: 2,
    nameAr: "غير نشط",
    nameEn: "Inactive",
    style: "bg-yellow-100 text-yellow-900  dark:text-[#FFEA00]",
    background: "dark:bg-[#f1c40f]",
    value: "INACTIVE",
  },
  OFFLINE: {
    id: 3,
    nameAr: "غير متصل",
    nameEn: "Offline",
    style: "bg-gray-100 text-gray-900  dark:text-[#A0AEC0]",
    background: "dark:bg-[#95a5a6]",
    value: "OFFLINE",
  },
  INVITED: {
    id: 4,
    nameAr: "مدعو",
    nameEn: "Invited",
    style: "bg-blue-100 text-blue-900  dark:text-[#4299E1]",
    background: "dark:bg-[#3498db]",
    value: "INVITED",
  },
};
export const BRANCH_STATUS = {
  OPEN: {
    style: "dark:text-[#00Df72] font-bold",
    background: "dark:bg-[#00Df72]",
  },
  CLOSED: {
    style: "dark:text-[#FF0D73]",
    background: "dark:bg-[#FF0D73]",
  },
  VACATION: {
    style: "dark:text-gray-400",
    background: "dark:bg-gray-400",
  },
  BREAK: {
    style: "dark:text-[#FFEA00]",
    background: "dark:bg-[#FFEA00]",
  },
};
