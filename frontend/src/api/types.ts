export const SCHEMA_VERSION = 1;

export interface WledStudioError {
  code: string;
  message: string;
  reload_required?: boolean;
}

export interface WledStudioWsResult<T = unknown> {
  ok?: boolean;
  error?: WledStudioError;
  schema_version?: number;
  data?: T;
}
