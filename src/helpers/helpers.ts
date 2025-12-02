import { useLanguage } from "../contexts";

export const projectStatuses = [
    {
        nameAr: "متاح",
        nameEn: "Available",
    },
    {
        nameAr: "قريباً",
        nameEn: "Coming Soon",
    },
];


export const getStatusText = (status: number) => {
    const { currentLanguage } = useLanguage();

    return status === 1 ? currentLanguage.code === "ar" ? projectStatuses[0].nameAr : projectStatuses[0].nameEn :
        currentLanguage.code === "ar" ? projectStatuses[1].nameAr : projectStatuses[1].nameEn;
};
export const typeArray: typeItem[] = [
    {
        nameAr: "شقة",
        nameEn: "Apartment",
    },
    {
        nameAr: "فيلا",
        nameEn: "Villa",
    },
    {
        nameAr: "عرف استوديو",
        nameEn: "Duplex",
    },
    {
        nameAr: "غرفة بناء",
        nameEn: "Penthouse",
    },
    {
        nameAr: "استديو",
        nameEn: "Studio",
    },
];

interface typeItem {
    nameAr: string,
    nameEn: string,
}
export const statusArray = [
    {
        nameAr: "متاح",
        nameEn: "Available",
    },
    {
        nameAr: "محجوزة",
        nameEn: "Reserved",
    },
    {
        nameAr: "مباع",
        nameEn: "Sold",
    },
    {
        nameAr: "تحت الانشاء",
        nameEn: "UnderConstruction",
    },
];


export const getTypeText = (type: number): string => {
    const { currentLanguage } = useLanguage();
    if (!type || type > 5) {
        return currentLanguage.code === "ar" ? typeArray[0].nameAr : typeArray[0].nameEn
    } else {
        return currentLanguage.code === "ar" ? typeArray[type - 1].nameAr : typeArray[type - 1].nameEn
    }

};

export const getStatusUnitText = (type: number) => {
    const { currentLanguage } = useLanguage();

    if (type > 5) {
        return currentLanguage.code === "ar" ? statusArray[0].nameAr : statusArray[0].nameEn
    } else {
        return currentLanguage.code === "ar" ? statusArray[type - 1].nameAr : statusArray[type - 1].nameEn
    }

};

export type UnitTypeText = "available" | "sold" | "rented";

const unitTypeMap: Record<number, UnitTypeText> = {
    1: "available",
    2: "sold",
    3: "rented",
};

export const returnUnitTypeText = (type: number): UnitTypeText => {
    return unitTypeMap[type] ?? "available";
};



