export type User = {
    id: number;
    name: string;
    createdAt:string;
    email: string;
    phone: string;
    isActive: boolean;
    address: {
        id: number;
        street: string;
        city: string;
        pincode: string;
    };
};