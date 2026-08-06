/**
 * Provider-agnostic file storage contract (system.json → storage.abstraction).
 *
 * Layer: Application
 * Rules: implemented by Infrastructure, never used directly by Presentation.
 */

import type { ApplicationError } from "@/application/_shared/errors/ApplicationError";
import type { Result } from "@/shared/types/Result";

export interface StoredFileDto {
  readonly bucket: string;
  readonly path: string;
  readonly sizeInBytes: number;
  readonly contentType: string;
}

export type StorageResult<T> = Result<T, ApplicationError>;

export interface IFileStorageService {
  upload(bucket: string, path: string, file: File): Promise<StorageResult<StoredFileDto>>;
  download(bucket: string, path: string): Promise<StorageResult<Blob>>;
  delete(bucket: string, path: string): Promise<StorageResult<void>>;
  getPublicUrl(bucket: string, path: string): string;
  list(bucket: string, prefix?: string): Promise<StorageResult<readonly StoredFileDto[]>>;
}
