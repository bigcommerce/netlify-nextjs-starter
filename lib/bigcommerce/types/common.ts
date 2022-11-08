export interface Measurement {
  value: number;
  unit: 'KILOGRAMS' | 'GRAMS' | 'POUNDS' | 'OUNCES';
}

export interface Image {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}
