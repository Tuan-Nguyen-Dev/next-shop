export interface ProductModel {
    id: string;
    type: string;
    description: string;
    price: string;
    titles: string;
    imageUrl: string;
    files: string[],
    categories: string[]
}