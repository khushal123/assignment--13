const axios = require('axios')
const apiClient = axios.create({
    baseURL: process.env.MOCK_API_NANOS
})

apiClient.interceptors.request.use((request) => {
    //add access token here
    return request
})

apiClient.interceptors.response.use(undefined, error => {
    throw error
})


const getClientDetails = async (clientId) => {
    try {
        const response = await apiClient.get(`get_client_details/${clientId}`)
        return response.data
    } catch (error) {
        return error.response.data ? error.response.data : "Something went wrong"
    }
}

const getAllClients = async (clientId) => {
    try {
        const response = await apiClient.get(`get_all_clients`)
        return response.data
    } catch (error) {
        return error.response.data ? error.response.data : "Something went wrong"
    }
}

const getAllCampaigns = async () => {
    try {
        const response = apiClient.get(`list_all_campaigns`)
        return response.data
    } catch (error) {
        return error.response.data ? error.response.data : "Something went wrong"
    }
}

const getCampaignsDetails = async (campaignId) => {
    try {
        const response = apiClient.get(`get_campaign_details/${campaignId}`)
        return response.data
    } catch (error) {
        return error.response.data ? error.response.data : "Something went wrong"
    }
}

const renderTaxInvoice = async (invoiceData) => {
    try {
        const response = apiClient.post(`render_tax_invoice`, invoiceData)
        return response.data
    } catch (error) {
        return error.response.data ? error.response.data : "Something went wrong"
    }
}

module.exports = {
    getClientDetails,
    getAllCampaigns,
    getCampaignsDetails,
    getAllClients,
    renderTaxInvoice
}