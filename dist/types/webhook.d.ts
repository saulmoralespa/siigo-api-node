export interface WebhookCreate {
    application_id: string;
    topic: string;
    url: string;
}
export interface WebhookResponse {
    id: string;
    application_id: string;
    url: string;
    topic: string;
    company_key: string;
    active: boolean;
    created_at: Date;
}
export interface WebhooksResponse {
    pagination: WebhookPagination;
    results: WebhookResponse[];
    _links: WebhookLinks;
}
export interface WebhookEdit extends WebhookCreate {
    active: boolean;
}
export interface WebhookPagination {
    page: number;
    page_size: number;
    total_results: number;
}
export interface WebhookLinks {
    previous: {
        href: string;
    };
    self: {
        href: string;
    };
    next: {
        href: string;
    };
}
