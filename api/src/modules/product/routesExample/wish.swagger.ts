/**
 * A favorite
 * @typedef {object} Favorite
 * @property {string} product_id.required - The identify product
 * @property {string} customer_id.required - The indentify user
 * @property {string} status.required - The status favorited
 *
 */

/**
 * POST /favorite
 * @summary Create favorite client
 * @tags ProductsFavorite
 * @param {Favorite} request.body.required - Initial infor
 * @return {Favorite} 200 - favorite response
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
 * PUT /favorite/{id}
 * @summary Update favorite client
 * @tags ProductsFavorite
 * @param {Favorite} request.body.required - Edited favorite information
 * @param {string} request.query.required - identify favorite for by Id
 * @return {Favorite} 200 - favorite response
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
 * GET /favorite/{id}
 * @summary Get favorite client
 * @tags ProductsFavorite
 * @param {string} id.path - id favorite
 * @return {Favorite} 200 - favorite response
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
 * GET /favorite/
 * @summary Get all favorite client
 * @tags ProductsFavorite
 * @return {Favorite} 200 - favorite response
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
 * DELETE /favorite/{id}
 * @summary Delete real account
 * @tags ProductsFavorite
 * @param {string} id.path - id by delete favorite
 * @return {Favorite} 200 - favorite response
 * @security BearerAuth
 * @example request - 200 - success response - application/json
 * {
 *   "name": "robson",
 *   "email": "robson@hotmail.com",
 *   "password": "123456"
 * }
 *
 */
