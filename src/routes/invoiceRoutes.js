const { getInvoices, addInvoice } = require('../controllers/invoiceController')
const verifyToken = require('../middlewares/verifyToken')

const routes = (app) => {
  app.route('/invoice')
    .get(verifyToken, getInvoices)
    .post(verifyToken, addInvoice)
}

module.exports = routes
