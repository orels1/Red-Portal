/**
 * @apiDefine DBError
 *
 * @apiError (500) {Object} DBError
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 500 InternalServerError
 *      {
 *          "error": "DBError",
 *          "error_details": "some DBError description",
 *          "results": {}
 *      }
 */

/**
 * @apiDefine EntryNotFound
 *
 * @apiError (404) {Object} EntryNotFound
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 NotFound
 *      {
 *          "error": "EntryNotFound",
 *          "error_details": "Requested entry is not found",
 *          "results": {}
 *      }
 */