import type { Author, PaymentDetails } from './types';

export const paymentDetails: PaymentDetails = {
    instaPay: "zakaa@instapay",
    vodafoneCash: "01012345678",
    fawryCode: "78912345"
};

export const authors: Record<string, Author> = {
    ahmed: {
        name: "أحمد عصام",
        avatar: "/images/ahmed-esam.png", // Updated to user provided image
        role: "مؤسس أثير | AIR",
        bio: "رائد أعمال تقني مهتم بتبسيط الذكاء الاصطناعي للشركات الناشئة.",
        twitter: "ahmed_esam",
        linkedin: "ahmed-esam"
    },
    guest_expert: {
        name: "خبير زائر",
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Expert",
        role: "مستشار أتمتة",
        bio: "خبير في أتمتة العمليات التجارية باستخدام أدوات الذكاء الاصطناعي.",
        twitter: "expert_ai",
        linkedin: "expert-ai"
    }
};
