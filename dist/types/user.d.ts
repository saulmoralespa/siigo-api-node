export interface UserResponse {
    pagination: PaginationUser;
    results: User[];
}
export interface PaginationUser {
    page: number;
    page_size: number;
    total_results: number;
}
export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    active: boolean;
    identification: string;
}
