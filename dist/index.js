var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import fs from "fs/promises";
export class Siigo {
    constructor({ username, access_key }) {
        this.apiBaseUrl = "https://api.siigo.com/";
        this.apiVersion = "v1";
        this.partnerId = "saulmoralespa";
        this.tokenFile = "token.json";
        this.username = username;
        this.access_key = access_key;
    }
    client(isAuth = false) {
        let baseURL = this.apiBaseUrl;
        if (!isAuth) {
            baseURL = baseURL + this.apiVersion + "/";
        }
        return axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
                "Partner-Id": this.partnerId,
            },
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isTokenExpired()) {
                const { data } = (yield this.makeRequest("POST", "auth", {
                    username: this.username,
                    access_key: this.access_key,
                }, true));
                yield this.saveToken(data || "{}");
            }
            const data = yield fs.readFile(this.tokenFile, "utf-8");
            return JSON.parse(data);
        });
    }
    createProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("POST", "products", payload));
            return data;
        });
    }
    getProducts(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanQueries = Object.entries(queries || {}).filter(([_, v]) => v !== undefined);
            const params = new URLSearchParams(cleanQueries);
            const url = params ? `products?${params.toString()}` : "products";
            const { data } = (yield this.makeRequest("GET", url));
            return data;
        });
    }
    updateProduct(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("PUT", `products/${id}`, payload));
            return data;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("DELETE", `products/${id}`));
            return data;
        });
    }
    createClient(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("POST", "customers", payload));
            return data;
        });
    }
    getClients(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanQueries = Object.entries(queries || {}).filter(([_, v]) => v !== undefined);
            const params = new URLSearchParams(cleanQueries);
            const url = params ? `customers?${params.toString()}` : "customers";
            const { data } = (yield this.makeRequest("GET", url));
            return data;
        });
    }
    getClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", `customers/${id}`));
            return data;
        });
    }
    updateClient(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("PUT", `customers/${id}`, payload));
            return data;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", "users"));
            return data;
        });
    }
    createInvoice(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("POST", "invoices", payload));
            return data;
        });
    }
    getAccountGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", "account-groups"));
            return data;
        });
    }
    getTaxes() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", "taxes"));
            return data;
        });
    }
    getDocumentTypes(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanQueries = Object.entries(queries || {}).filter(([_, v]) => v !== undefined);
            const params = new URLSearchParams(cleanQueries);
            const url = params
                ? `document-types?${params.toString()}`
                : "document-types";
            const { data } = (yield this.makeRequest("GET", url));
            return data;
        });
    }
    getPaymentTypes(queries) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanQueries = Object.entries(queries || {}).filter(([_, v]) => v !== undefined);
            const params = new URLSearchParams(cleanQueries);
            const url = params ? `payment-types?${params.toString()}` : "payment-types";
            const { data } = (yield this.makeRequest("GET", url));
            return data;
        });
    }
    updateInvoice(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("PUT", `invoices/${id}`, payload));
            return data;
        });
    }
    getInvoiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", `invoices/${id}`));
            return data;
        });
    }
    getPdfInvoiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", `invoices/${id}/pdf`));
            return data;
        });
    }
    getErrorsInvoiceRejected(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", `invoices/${id}/stamp/errors`));
            return data;
        });
    }
    deteleteInvoice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("DELETE", `invoices/${id}`));
            return data;
        });
    }
    annulInvoice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("POST", `invoices/${id}/annul`));
            return data;
        });
    }
    getPriceList() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", "price-lists"));
            return data;
        });
    }
    getWarehouses() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", "warehouses"));
            return data;
        });
    }
    getCostCenter() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", "cost-centers"));
            return data;
        });
    }
    subscribeWebhook(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("POST", "webhooks", payload));
            return data;
        });
    }
    editWebhook(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("PUT", "webhooks", payload));
            return data;
        });
    }
    getWebhook() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("GET", "webhooks"));
            return data;
        });
    }
    deleteWebhook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = (yield this.makeRequest("DELETE", `webhooks/${id}`));
            return data;
        });
    }
    makeRequest(method_1, url_1, data_1) {
        return __awaiter(this, arguments, void 0, function* (method, url, data, auth = false) {
            var _a;
            try {
                return yield this.client(auth).request({
                    method,
                    url,
                    data,
                    headers: {
                        Authorization: !auth
                            ? `Bearer ${yield this.getToken().then((token) => token.access_token)}`
                            : undefined,
                    },
                });
            }
            catch (err) {
                const error = err;
                if (axios.isAxiosError(error)) {
                    console.log((_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                }
            }
        });
    }
    isTokenExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.access(this.tokenFile);
                const tokenData = yield fs.readFile(this.tokenFile, "utf-8");
                const { expires_at } = JSON.parse(tokenData);
                const currentTime = Math.floor(Date.now() / 1000);
                return expires_at <= currentTime;
            }
            catch (error) {
                return true;
            }
        });
    }
    saveToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { expires_in } = token;
            const tokenData = Object.assign(Object.assign({}, token), { expires_at: Math.floor(Date.now() / 1000) + expires_in / 2 });
            const tokenString = JSON.stringify(tokenData);
            try {
                yield fs.writeFile(this.tokenFile, tokenString, "utf-8");
            }
            catch (err) {
                console.error("Error writing token to file", err);
            }
        });
    }
    setTokenFile(file) {
        this.tokenFile = file;
    }
}
