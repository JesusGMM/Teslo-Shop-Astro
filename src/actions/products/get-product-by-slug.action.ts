import { defineAction, } from 'astro:actions';
import { z } from 'astro:schema';
import { seedProducts } from 'keys';

export const getProductBySlug = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (slug) => {
    // const [product] = await db
    //   .select()
    //   .from(Product)
    //   .where(eq(Product.slug, slug));

    const product = seedProducts.find((p) => p.slug === slug);

    if (!product) {
      throw new Error(`Product with slug ${slug} not found`);
    }

    return product;

    // const images = await db
    //   .select()
    //   .from(ProductImage)
    //   .where(eq(ProductImage.productId, product.id));

    // return {
    //   product: product,
    //   images: images.map((i) => i.image),
    // };
  },
});
