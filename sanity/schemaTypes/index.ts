import { type SchemaTypeDefinition } from 'sanity'
import banner from "@/sanity/schemaTypes/banner";
import category from "@/sanity/schemaTypes/category";
import products from "@/sanity/schemaTypes/products";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
      banner,
      category,
      products,
  ],
}
