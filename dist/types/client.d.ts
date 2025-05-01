export interface Client {
    type: EnumClientType;
    person_type: EnumPersonType;
    id_type: string;
    identification: string;
    check_digit?: string;
    name: string[];
    commercial_name: string;
    branch_office: number;
    active: boolean;
    vat_responsible: boolean;
    fiscal_responsibilities: FiscalResponsibility[];
    address: Address;
    phones: Phone[];
    contacts: Contact[];
    comments: string;
    related_users?: RelatedUsers;
}
export interface ClientResponse {
    id: string;
    type: EnumClientType;
    person_type: EnumPersonType;
    id_type: IdType;
    identification: string;
    check_digit: string;
    name: string[];
    commercial_name: string;
    branch_office: number;
    active: boolean;
    vat_responsible: boolean;
    fiscal_responsibilities: FiscalResponsibilityResponse[];
    address: AddressResponse;
    phones: Phone[];
    contacts: Contact[];
    comments: string;
    related_users: RelatedUsers;
    metadata: MetadataClient;
}
export interface Address {
    address: string;
    city: City;
    postal_code: string;
}
export interface AddressResponse {
    address: string;
    city: CityResponse;
    postal_code: string;
}
export interface City {
    country_code: string;
    state_code: string;
    city_code: string;
}
export interface CityResponse {
    country_code: string;
    country_name: string;
    state_code: string;
    state_name: string;
    city_code: string;
    city_name: string;
}
export interface Contact {
    first_name: string;
    last_name: string;
    email?: string;
    phone: Phone;
}
export interface Phone {
    indicative: string;
    number: string;
    extension: string;
}
export interface FiscalResponsibility {
    code: string;
}
export interface FiscalResponsibilityResponse {
    code: string;
    name: string;
}
export interface RelatedUsers {
    seller_id: number;
    collector_id: number;
}
export interface IdType {
    code: string;
    name: string;
}
export interface MetadataClient {
    created: string;
    last_updated: string;
}
export interface QueriesClients {
    identification: string;
    branch_office: number;
    created_start: string;
    created_end: string;
    updated_start: string;
    updated_end: string;
}
export interface ClientsResponse {
    pagination: Pagination;
    results: ClientResponse[];
    _links: Links;
}
export interface Pagination {
    page: number;
    page_size: number;
    total_results: number;
}
export interface Links {
    self: {
        href: string;
    };
}
type EnumClientType = "Customer" | "Supplier" | "Other";
type EnumPersonType = "Person" | "Company";
export {};
