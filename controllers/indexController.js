const { errorResponse, successResponse } = require("../utils/response");
const nanosService = require("../services/nanos")
const stripeService = require("../services/stripe")
const getClient = async (req, res) => {
    try {
        const { cid } = req.params
        const client = await nanosService.getClientDetails(cid);
        const { vat_number, stripe_customer_id } = client
        const taxId = await stripeService.createTaxId(stripe_customer_id, vat_number)
        return successResponse(res, {
            client: client,
            taxId: taxId
        })
    } catch (error) {
        return errorResponse(res, error, 403)
    }
}

//All customers api is not available for nanos
const updateTaxExempt = async (req, res) => {
    try {
        const { cid } = req.params
        const client = await nanosService.getClientDetails(cid);
        const { country, stripe_customer_id } = client
        const updateBody = {
            tax_exempt: country === "switzerland" ? "none" : "exempt"
        }
        const customer = await stripeService.updateCustomerById(stripe_customer_id, updateBody);
        return successResponse(res, {
            client: customer,
        })
    } catch (error) {
        return errorResponse(res, error, 403)
    }
}


const updateTaxExemptAll = async (req, res) => {
    try {
        const clients = await nanosService.getAllClients()
        if (clients.length > 0) {
            const promises = clients.map((client) => {
                const { country, stripe_customer_id } = client
                const updateBody = {
                    tax_exempt: country === "switzerland" ? "none" : "exempt"
                }
                return stripeService.updateCustomerById(stripe_customer_id, updateBody);
            })
            const result = await Promise.all(promises) //to be added to message queue or websocket. cannot wait for all promises.
            return successResponse(res, {
                clients: result
            })
        }
        return errorResponse(res, {
            error: "error not found"
        })
    } catch (error) {
        return errorResponse(res, error, 403)
    }
}

const renderInvoice = async (req, res) => {
    try {
        const { ad_campaign_id } = req.params
        const campaign = await nanosService.getCampaignsDetails(ad_campaign_id);
        const { client_id } = campaign
        const { stripe_customer_id, stripe_charge_id, email, address } = await nanosService.getClientDetails(client_id)
        const customer = await stripeService.getCustomerById(stripe_customer_id);
        const { amount } = await stripeService.getChargeById(stripe_charge_id)
        const vatAmount = 100 * 7.7 / amount
        const netAmount = amount - vatAmount
        const taxInvoice = {
            client_name: customer.name,
            email,
            address,
            campaign_name: campaign.name,
            vat_amount: vatAmount,
            net_amount: netAmount
        }
        const invoiceResponse = await nanosService.renderTaxInvoice(taxInvoice);
        return successResponse(res, {
            invoice: invoiceResponse
        })
    } catch (error) {
        return errorResponse(res, error, 403)
    }
}


module.exports = {
    getClient,
    updateTaxExempt,
    updateTaxExemptAll,
    renderInvoice
}