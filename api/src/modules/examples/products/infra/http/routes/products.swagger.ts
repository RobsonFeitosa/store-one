/**
 * A product
 * @typedef {object} Product
 * @property {string} name.required - The identify product
 * @property {string} cod_product.required - The identify product
 * @property {number} price.required - The identify product
 * @property {number} old_price.required - The identify product
 * @property {number} quantity.required - The identify product
 * @property {string} description.required - The identify product
 * @property {string} slug.required - The identify product
 * @property {string} categories.required - The identify product
 * @property {ProductImages} images_product.required - The identify product
 * @property {string} order_products.required - The identify product
 *
 */

/**
 * A imagesProduct
 * @typedef {object} ProductImages
 * @property {string} name.required - The identify product
 * @property {string} cod_product.required - The identify product
 * @property {string} price.required - The identify product
 * @property {string} old_price.required - The identify product
 * @property {string} quantity.required - The identify product
 * @property {string} description.required - The identify product
 * @property {string} slug.required - The identify product
 * @property {string} categories.required - The identify product
 * @property {string} images_product.required - The identify product
 * @property {string} order_products.required - The identify product
 * @property {string} name.required - The identify product
 * @property {string} customer_id.required - The indentify user
 * @property {string} status.required - The status productd
 *
 */

/**
 * POST /products
 * @summary Create product client
 * @tags Products
 * @param {Products} request.body.required - Initial infor
 * @return {Products} 200 - product response
 * @security BearerAuth
 * @example request - 200 - success response - application/json
 * {
 *   "name": "robson",
 *   "email": "robson@hotmail.com",
 *   "password": "123456"
 * }
 *
 */

/**
 * PUT /products/{id}
 * @summary Update product client
 * @tags Products
 * @param {Products} request.body.required - Edited product information
 * @param {string} request.query.required - identify product for by Id
 * @return {Products} 200 - product response
 * @security BearerAuth
 * @example request - 200 - success response - application/json
 * {
 *   "name": "robson",
 *   "email": "robson@hotmail.com",
 *   "password": "123456"
 * }
 *
 */

/**
 * GET /products/{id}
 * @summary Get product client
 * @tags Products
 * @param {string} id.path - id product
 * @return {Products} 200 - product response
 * @security BearerAuth
 * @example request - 200 - success response - application/json
 * {
 *   "name": "robson",
 *   "email": "robson@hotmail.com",
 *   "password": "123456"
 * }
 *
 */

/**
 * GET /products/
 * @summary Get all product client
 * @tags Products
 * @return {Products} 200 - product response
 * @security BearerAuth
 * @example request - 200 - success response - application/json
 * [
 *  {
 *   "name": "robson",
 *   "email": "robson@hotmail.com",
 *   "password": "123456"
 *  }
 * ]
 *
 */

/**
 * DELETE /products/{id}
 * @summary Delete real account
 * @tags Products
 * @param {string} id.path - id by delete product
 * @return {Products} 200 - product response
 * @security BearerAuth
 * @example request - 200 - success response - application/json
 * {
 *   "name": "robson",
 *   "email": "robson@hotmail.com",
 *   "password": "123456"
 * }
 *
 */
