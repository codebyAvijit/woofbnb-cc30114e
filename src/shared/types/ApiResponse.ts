/**
 * Transport-level response envelope defined by 04_OPENAPI_SPECIFICATION.md.
 *
 * Layer: Shared (cross-cutting types only, no behaviour)
 */

export interface ApiSuccessResponse<TData> {
  readonly success: true;
  readonly message: string;
  readonly data: TData;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly message: string;
  readonly errors?: readonly string[];
}

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

/** Standard paginated payload used by list endpoints. */
export interface PaginatedData<TItem> {
  readonly items: readonly TItem[];
  readonly page: number;
  readonly pageSize: number;
  readonly totalItems: number;
  readonly totalPages: number;
}
