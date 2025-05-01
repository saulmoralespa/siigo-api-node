import axios, { AxiosError, AxiosInstance } from "axios";
import {
  AccountGroupResponse,
  Client,
  ClientResponse,
  ClientsResponse,
  CostCenters,
  DeleteProductResponse,
  DocumentTypesResponse,
  Invoice,
  InvoiceDeletedResponse,
  InvoiceErrorsResponse,
  InvoicePdfResponse,
  InvoiceResponse,
  PaymentTypesResponse,
  PriceLists,
  Product,
  ProductResponse,
  ProductsResponse,
  QueriesClients,
  QueriesDocumentTypes,
  QueriesPaymentTypes,
  QueriesProducts,
  SiigoSDKOptions,
  TaxResponse,
  Token,
  UserResponse,
  Warehouses,
  WebhookCreate,
  WebhookEdit,
  WebhookResponse,
  WebhooksResponse,
} from "./types";
import fs from "fs/promises";

export class Siigo {
  private apiBaseUrl = "https://api.siigo.com/";
  private apiVersion = "v1";
  private partnerId = "saulmoralespa";
  private tokenFile = "token.json";

  private username: string;
  private access_key: string;

  constructor({ username, access_key }: SiigoSDKOptions) {
    this.username = username;
    this.access_key = access_key;
  }

  private client(isAuth = false): AxiosInstance {
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

  async getToken(): Promise<Token> {
    if (await this.isTokenExpired()) {
      const { data } = (await this.makeRequest(
        "POST",
        "auth",
        {
          username: this.username,
          access_key: this.access_key,
        },
        true
      )) as { data: Token };

      await this.saveToken(data || "{}");
    }

    const data = await fs.readFile(this.tokenFile, "utf-8");
    return JSON.parse(data);
  }

  async createProduct(payload: Product): Promise<ProductResponse> {
    const { data } = (await this.makeRequest("POST", "products", payload)) as {
      data: ProductResponse;
    };
    return data;
  }

  async getProducts(
    queries?: Partial<QueriesProducts>
  ): Promise<ProductsResponse> {
    const cleanQueries = Object.entries(queries || {}).filter(
      ([_, v]) => v !== undefined
    ) as [string, string][];
    const params = new URLSearchParams(cleanQueries);
    const url = params ? `products?${params.toString()}` : "products";
    const { data } = (await this.makeRequest("GET", url)) as {
      data: ProductsResponse;
    };
    return data;
  }

  async updateProduct(id: string, payload: Product): Promise<ProductResponse> {
    const { data } = (await this.makeRequest(
      "PUT",
      `products/${id}`,
      payload
    )) as { data: ProductResponse };
    return data;
  }

  async deleteProduct(id: string): Promise<DeleteProductResponse> {
    const { data } = (await this.makeRequest("DELETE", `products/${id}`)) as {
      data: DeleteProductResponse;
    };
    return data;
  }

  async createClient(payload: Client): Promise<ClientResponse> {
    const { data } = (await this.makeRequest("POST", "customers", payload)) as {
      data: ClientResponse;
    };
    return data;
  }

  async getClients(
    queries?: Partial<QueriesClients>
  ): Promise<ClientsResponse> {
    const cleanQueries = Object.entries(queries || {}).filter(
      ([_, v]) => v !== undefined
    ) as [string, string][];
    const params = new URLSearchParams(cleanQueries);
    const url = params ? `customers?${params.toString()}` : "customers";
    const { data } = (await this.makeRequest("GET", url)) as {
      data: ClientsResponse;
    };
    return data;
  }

  async getClientById(id: string): Promise<ClientResponse> {
    const { data } = (await this.makeRequest("GET", `customers/${id}`)) as {
      data: ClientResponse;
    };
    return data;
  }

  async updateClient(id: string, payload: Client): Promise<ClientResponse> {
    const { data } = (await this.makeRequest(
      "PUT",
      `customers/${id}`,
      payload
    )) as { data: ClientResponse };
    return data;
  }

  async getUsers(): Promise<UserResponse> {
    const { data } = (await this.makeRequest("GET", "users")) as {
      data: UserResponse;
    };
    return data;
  }

  async createInvoice(payload: Invoice): Promise<InvoiceResponse> {
    const { data } = (await this.makeRequest("POST", "invoices", payload)) as {
      data: InvoiceResponse;
    };
    return data;
  }

  async getAccountGroups(): Promise<AccountGroupResponse[]> {
    const { data } = (await this.makeRequest("GET", "account-groups")) as {
      data: AccountGroupResponse[];
    };
    return data;
  }

  async getTaxes(): Promise<TaxResponse[]> {
    const { data } = (await this.makeRequest("GET", "taxes")) as {
      data: TaxResponse[];
    };
    return data;
  }

  async getDocumentTypes(
    queries?: Partial<QueriesDocumentTypes>
  ): Promise<DocumentTypesResponse[]> {
    const cleanQueries = Object.entries(queries || {}).filter(
      ([_, v]) => v !== undefined
    ) as [string, string][];
    const params = new URLSearchParams(cleanQueries);
    const url = params
      ? `document-types?${params.toString()}`
      : "document-types";
    const { data } = (await this.makeRequest("GET", url)) as {
      data: DocumentTypesResponse[];
    };
    return data;
  }

  async getPaymentTypes(
    queries?: Partial<QueriesPaymentTypes>
  ): Promise<PaymentTypesResponse[]> {
    const cleanQueries = Object.entries(queries || {}).filter(
      ([_, v]) => v !== undefined
    ) as [string, string][];
    const params = new URLSearchParams(cleanQueries);
    const url = params ? `payment-types?${params.toString()}` : "payment-types";
    const { data } = (await this.makeRequest("GET", url)) as {
      data: PaymentTypesResponse[];
    };
    return data;
  }

  async updateInvoice(
    id: string,
    payload: Partial<Invoice>
  ): Promise<InvoiceResponse> {
    const { data } = (await this.makeRequest(
      "PUT",
      `invoices/${id}`,
      payload
    )) as { data: InvoiceResponse };
    return data;
  }

  async getInvoiceById(id: string): Promise<InvoiceResponse> {
    const { data } = (await this.makeRequest("GET", `invoices/${id}`)) as {
      data: InvoiceResponse;
    };
    return data;
  }

  async getPdfInvoiceById(id: string): Promise<InvoicePdfResponse> {
    const { data } = (await this.makeRequest("GET", `invoices/${id}/pdf`)) as {
      data: InvoicePdfResponse;
    };
    return data;
  }

  async getErrorsInvoiceRejected(id: string): Promise<InvoiceErrorsResponse> {
    const { data } = (await this.makeRequest(
      "GET",
      `invoices/${id}/stamp/errors`
    )) as {
      data: InvoiceErrorsResponse;
    };
    return data;
  }

  async deteleteInvoice(id: string): Promise<InvoiceDeletedResponse> {
    const { data } = (await this.makeRequest("DELETE", `invoices/${id}`)) as {
      data: InvoiceDeletedResponse;
    };
    return data;
  }

  async annulInvoice(id: string): Promise<InvoiceDeletedResponse> {
    const { data } = (await this.makeRequest(
      "POST",
      `invoices/${id}/annul`
    )) as {
      data: InvoiceDeletedResponse;
    };
    return data;
  }

  async getPriceList(): Promise<PriceLists[]> {
    const { data } = (await this.makeRequest("GET", "price-lists")) as {
      data: PriceLists[];
    };
    return data;
  }

  async getWarehouses(): Promise<Warehouses[]> {
    const { data } = (await this.makeRequest("GET", "warehouses")) as {
      data: Warehouses[];
    };
    return data;
  }

  async getCostCenter(): Promise<CostCenters[]> {
    const { data } = (await this.makeRequest("GET", "cost-centers")) as {
      data: CostCenters[];
    };
    return data;
  }

  async subscribeWebhook(payload: WebhookCreate): Promise<WebhookResponse> {
    const { data } = (await this.makeRequest("POST", "webhooks", payload)) as {
      data: WebhookResponse;
    };
    return data;
  }

  async editWebhook(payload: WebhookEdit):Promise<WebhookResponse> {
    const { data } = (await this.makeRequest("PUT", "webhooks", payload)) as {
      data: WebhookResponse;
    };
    return data;
  }

  async getWebhook():Promise<WebhooksResponse> {
    const { data } = (await this.makeRequest("GET", "webhooks")) as {
      data: WebhooksResponse;
    };
    return data;
  }

  async deleteWebhook(id: string):Promise<WebhookResponse> {
    const { data } = (await this.makeRequest("DELETE", `webhooks/${id}`)) as {
      data: WebhookResponse;
    };
    return data;
  }

  private async makeRequest(
    method: string,
    url: string,
    data?: any,
    auth = false
  ) {
    try {
      return await this.client(auth).request({
        method,
        url,
        data,
        headers: {
          Authorization: !auth
            ? `Bearer ${await this.getToken().then(
                (token) => token.access_token
              )}`
            : undefined,
        },
      });
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
  }

  private async isTokenExpired(): Promise<boolean> {
    try {
      await fs.access(this.tokenFile);
      const tokenData = await fs.readFile(this.tokenFile, "utf-8");
      const { expires_at } = JSON.parse(tokenData) as Token;
      const currentTime = Math.floor(Date.now() / 1000);
      return expires_at! <= currentTime;
    } catch (error) {
      return true;
    }
  }

  private async saveToken(token: Token): Promise<void> {
    const { expires_in } = token;

    const tokenData = {
      ...token,
      expires_at: Math.floor(Date.now() / 1000) + expires_in / 2,
    };

    const tokenString = JSON.stringify(tokenData);

    try {
      await fs.writeFile(this.tokenFile, tokenString, "utf-8");
    } catch (err) {
      console.error("Error writing token to file", err);
    }
  }

  setTokenFile(file: string) {
    this.tokenFile = file;
  }
}
