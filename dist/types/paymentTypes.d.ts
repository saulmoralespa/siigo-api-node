export interface QueriesPaymentTypes {
    document_type: "FV";
}
export interface PaymentTypesResponse {
    id: number;
    name: string;
    type: EnumPaymentType;
    active: boolean;
    due_date: boolean;
}
type EnumPaymentType = "Cartera" | "Proveedor" | "CarteraProveedor";
export {};
