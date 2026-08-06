/**
 * Result<T, E> pattern.
 *
 * Layer: Shared (cross-cutting)
 *
 * Operations that can fail return a Result instead of throwing, so callers are
 * forced to handle the failure path explicitly. Required by system.json
 * (conventions.errorHandling).
 */

export interface Success<T> {
  readonly success: true;
  readonly value: T;
}

export interface Failure<E> {
  readonly success: false;
  readonly error: E;
}

export type Result<T, E> = Success<T> | Failure<E>;

export function ok<T>(value: T): Success<T> {
  return { success: true, value };
}

export function err<E>(error: E): Failure<E> {
  return { success: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success;
}

export function isErr<T, E>(result: Result<T, E>): result is Failure<E> {
  return !result.success;
}

/** Returns the value when successful, otherwise the provided fallback. */
export function unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
  return result.success ? result.value : fallback;
}

/** Maps the value of a successful result, leaving failures untouched. */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  map: (value: T) => U,
): Result<U, E> {
  return result.success ? ok(map(result.value)) : result;
}
