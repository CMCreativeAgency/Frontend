import Strapi from 'strapi-sdk-js'

export const strapi = new Strapi({
  url: process.env.STRAPI_URL || 'https://balanced-attraction-cee6197eab.strapiapp.com',
})
