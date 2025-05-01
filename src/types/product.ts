export interface Product {
    code: string;
    name: string;
    account_group: number;
    type: EnumType;
    stock_control: boolean;
    active: boolean;
    tax_classification: EnumTaxClassification;
    tax_included: boolean;
    tax_consumption_value: number;
    taxes: Tax[];
    prices: Price[];
    unit: string;
    unit_label: string;
    reference: string;
    description: string;
    additional_fields: AdditionalFields;
}

export interface ProductResponse {
    id: string;
    name: string;
    account_group: AccountGroup;
    type: EnumType;
    stock_control: boolean;
    active: boolean;
    tax_classification: EnumTaxClassification;
    tax_included?: boolean;
    tax_consumption_value?: number;
    taxes?: TaxesProduct[];
    prices?: PriceResponse[];
    unit: Unit;
    unit_label?: string;
    reference: string;
    description: string;
    additional_fields: AdditionalFields;
    available_quantity: number;
    warehouses?: String[];
    metadata: Metadata;
}

export interface ProductsResponse {
    pagination: ProductPagination;
    results: ProductResponse[];
    _links: ProductLinks;
}

export interface AccountGroup {
    id: number;
    name: string;
}

export interface AdditionalFields {
    barcode: string;
    brand: string;
    tariff: string;
    model: string;
}

export interface Price {
    currency_code: string;
    price_list: PriceList[];
}

export interface PriceResponse {
    currency_code: string;
    price_list: PriceList[];
}

export interface PriceList {
    position: number;
    value: number;
}

export interface PriceListResponse {
    position: number;
    value: number;
    name: string;
}

export interface Tax {
    id: number;
    milliliters: number;
    rate: number;
}

export interface TaxesProduct {
    id: number;
    name: string;
    type: EnumTaxType;
    percentage: number;
}

export interface TaxResponse extends TaxesProduct {
    active: boolean;
}

export interface Unit {
    code: string;
    name: string
}

export interface Metadata {
    created: string;
    last_updated: string;
}

export interface ProductPagination {
    page: number;
    page_size: number;
    total_results: number;
}

export interface ProductLinks {
    self: {
        href: string
    }
}

export interface DeleteProductResponse {
    id: string;
    deleted: boolean;
}

export interface QueriesProducts {
    code?: string;
    created_start?: string;
    created_end?: string;
    updated_start?: string;
    updated_end?: string;
    id?: string;
}

type EnumType = "Product" | "Service" | "ConsumerGood";
type EnumTaxClassification = "Taxed" | "Exempt" | "Excluded";
type EnumTaxType = "IVA" | "Retefuente" | "ReteIVA" | "ReteICA" | "Impoconsumo" | "AdValorem" | "Autorretencion";