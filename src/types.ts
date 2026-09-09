/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorOption {
  name: string;
  hex: string;
  bgClass: string;
}

export interface CapProduct {
  id: string;
  name: string;
  urduName: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  colors: ColorOption[];
  sizes: string[];
  imageUrl: string;
  isFeatured?: boolean;
  isAvailable?: boolean;
  hasFeatherIncluded?: boolean;
  storyDescription?: string;
  category?: "pakol" | "choga" | "waistcoat" | "shawl" | "coat" | "ingredients";
}

export interface CartItem {
  id: string; // unique cart item id (product.id + color + size + feather)
  product: CapProduct;
  selectedColor: ColorOption;
  selectedSize: string;
  addFeather: boolean;
  featherPrice: number;
  quantity: number;
}

export interface CustomCapConfig {
  baseColor: ColorOption;
  selectedSize: string;
  featherType: string;
  metalAccent: string;
  monogramText: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
