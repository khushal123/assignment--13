const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc") //sample api key

const getCustomerById = async (id) => {
    try {
        const customer = await stripe.customers.retrieve(id)
        return customer
    } catch (error) {
        console.error("getCustomerById->", {
            error: error,
            stacktrace: "getCustomerById 10"
        })
        return error
    }
}

const createTaxId = async (id, vat_number) => {
    try {
        const taxId = await stripe.customers.createTaxId(
            id,
            { type: 'eu_vat', value: vat_number }
        );
        return taxId
    } catch (error) {
        console.error("createTaxId->", {
            error: error,
            stacktrace: "createTaxId 23"
        })
        return error
    }
}

const updateCustomerById = async (id, data) => {
    try {
        const customer = await stripe.customers.update(
            id,
            data
        );
        return customer
    } catch (error) {
        console.error("updateCustomerById->", {
            error: error,
            stacktrace: "updateCustomerById 36"
        })
        return error
    }
}

const getChargeById = async (chargeId) => {
    try {
        const charge = await stripe.charges.retrieve(
            chargeId
        );
        return charge
    } catch (error) {
        console.error("updateCustomerById->", {
            error: error,
            stacktrace: "updateCustomerById 54"
        })
        return error
    }
}


const listAllCustomers = async (limit) => {
    try {
        for await (const customer of stripe.customers.list({ limit: 3 })) {

        }
        return customers
    } catch (error) {
        console.error("listAllCustomers->", {
            error: error,
            stacktrace: "listAllCustomers 50"
        })
        return error
    }
}

module.exports = {
    getCustomerById,
    updateCustomerById,
    createTaxId,
    getChargeById
}