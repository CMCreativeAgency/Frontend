import Strapi from 'strapi-sdk-js'

export const strapi = new Strapi({
  url: process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL,
})
