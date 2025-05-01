export interface Invoice {
    document: Document;
    date: string;
    customer: Customer;
    cost_center?: number;
    currency?: Currency;
    seller: number;
    stamp: Mail;
    mail: Mail;
    observations?: string;
    items: Item[];
    payments: Payment[];
    globaldiscounts?: Globaldiscount[];
    additional_fields?: AdditionalFieldsInvoice;
}
export interface InvoiceResponse {
    id: string;
    document: Document;
    number: number;
    name: string;
    date: string;
    customer: CustomerResponse;
    cost_center: number;
    currency: Currency;
    total: number;
    balance: number;
    seller: number;
    stamp: Stamp;
    mail: MailResponse;
    observations: string;
    items: ItemResponse[];
    payments: PaymentResponse[];
    public_url: string;
    globaldiscounts: GlobaldiscountResponse[];
    additional_fields: AdditionalFieldsInvoice;
    metadata: MetadataInvoice;
}
export interface AdditionalFieldsInvoice {
}
export interface Currency {
    code: string;
    exchange_rate: number;
}
export interface Customer {
    identification: string;
    branch_office: number;
}
export interface CustomerResponse {
    id: string;
    identification: string;
    branch_office: number;
}
export interface Document {
    id: number;
}
export interface Globaldiscount {
    id: number;
    percentage: number;
    value: number;
}
export interface GlobaldiscountResponse {
    id: number;
    name: string;
    percentage: number;
    value: number;
}
export interface Item {
    code: string;
    description: string;
    quantity: number;
    price: number;
    discount?: number;
    taxes?: Document[];
    transport?: Transport;
}
export interface ItemResponse {
    id: string;
    code: string;
    description: string;
    quantity: number;
    price: number;
    discount: Discount;
    taxes: Taxes;
}
export interface Transport {
    file_number: number;
    shipment_number: string;
    transported_quantity: number;
    measurement_unit: string;
    freight_value: number;
    purchase_order: string;
    service_type: string;
}
export interface Mail {
    send: boolean;
}
export interface Payment {
    id: number;
    value: number;
    due_date: string;
}
export interface Stamp {
    status: string;
    cufe: string;
    observations: string;
    errors: string;
}
export interface MailResponse {
    status: string;
    observations: string;
}
export interface Discount {
    percentage: number;
    value: number;
}
export interface Taxes {
    id: number;
    name: string;
    type: EnumTypeTaxes;
    percentage: number;
    value: number;
}
export interface PaymentResponse {
    id: number;
    name: string;
    value: number;
    due_date: string;
}
export interface MetadataInvoice {
    created: Date;
    last_updated: Date | null;
}
export interface QueriesDocumentTypes {
    type: EnumTypeInvoice;
}
export interface DocumentTypesResponse {
    id: number;
    code: string;
    name: string;
    description: string;
    type: EnumTypeInvoice;
    active: boolean;
    seller_by_item: boolean;
    cost_center: boolean;
    cost_center_mandatory: boolean;
    automatic_number: boolean;
    consecutive: number;
    discount_type: EnumDiscountType;
    decimals: boolean;
    advance_payment: boolean;
    reteiva: boolean;
    reteica: boolean;
    self_withholding: boolean;
    self_withholding_limit: number;
    electronic_type: EnumElectronicType;
    cargo_transportation: boolean;
    healthcare_company: boolean;
    customer_by_item: boolean;
}
export interface InvoiceDeletedResponse {
    id: string;
    deleted: boolean;
}
export interface InvoicePdfResponse {
    id: string;
    base64: string;
}
export interface InvoiceErrorsResponse {
    id: string;
    errors: MessageError[];
}
export interface MessageError {
    message: string;
}
type EnumTypeTaxes = "IVA" | "Retefuente" | "ReteIVA" | "ReteICA" | "Impoconsumo" | "AdValorem" | "Autorretencion";
type EnumTypeInvoice = "FV" | "RC" | "NC" | "FC" | "CC";
type EnumDiscountType = "Percentage" | "Value";
type EnumElectronicType = "NoElectronic" | "Electronicvoice" | "ContingencyInvoice" | "ExportInvoice";
export {};
