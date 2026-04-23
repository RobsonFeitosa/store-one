import { z } from 'zod'

export const attributesForm = z
  .array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      options: z.array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      ),
      variations: z.array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          price: z.number().optional(),
          quantity: z.number().nullable().optional(),
          time: z.string().nullable().optional(),
          weight: z.number().nullable().optional(),
          sku: z.string().nullable().optional(),
          actived: z.boolean().optional().default(true),
          image: z.any().optional(),
          dimensions: z
            .object({
              width: z.number().nullable().optional(),
              length: z.number().nullable().optional(),
              height: z.number().nullable().optional(),
            })
            .nullable()
            .optional(),
        }),
      ),
    }),
  )
  .optional()

export const productForm = z
  .object({
    name: z.string(),
    description: z.string().nullable(),
    short_description: z.string().nullable(),
    price: z.number().nullable().optional(),
    old_price: z.number().nullable().optional(),
    type: z.string().optional(),
    published: z.string().default('draft').optional(),
    categories: z.array(z.string().optional()).optional(),
    visibility: z.string().default('public').optional(),
    mode_data: z.string(),
    time: z.string().nullable().optional(),
    images: z
      .array(
        z.object({
          id: z.number().optional(),
          path: z.string(),
          file: z.any(),
        }),
      )
      .optional(),
    product_data: z
      .object({
        id: z.string().optional(),
        quantity: z.number().nullable().optional(),
        sku: z.string().nullable().optional(),
        weight: z.number().nullable().optional(),
        dimensions: z.object({
          width: z.number().nullable().optional(),
          length: z.number().nullable().optional(),
          height: z.number().nullable().optional(),
        }),
      })
      .optional(),
    attributes: attributesForm,
  })
  .superRefine(({ attributes, mode_data }, ctx) => {
    if (
      mode_data === 'multiple' &&
      attributes &&
      attributes[0]?.options?.length === 0
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['mode_data'],
        message: 'É necessário ter mais de um atributo',
      })
    }
  })

export type AttributesFormData = z.infer<typeof attributesForm>
export type ProductFormData = z.infer<typeof productForm>
