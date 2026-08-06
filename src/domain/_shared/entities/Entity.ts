/**
 * Base entity contracts shared by every domain module.
 *
 * Layer: Domain
 * Rules: no framework, infrastructure or presentation dependencies.
 */

/** UUID v4 identifier (conventions.idGeneration in system.json). */
export type EntityId = string;

/** ISO 8601 UTC timestamp (conventions.dateFormat in system.json). */
export type IsoUtcTimestamp = string;

export interface Entity {
  readonly id: EntityId;
}

/** Audit fields applied to persisted entities. */
export interface AuditableEntity extends Entity {
  readonly createdAt: IsoUtcTimestamp;
  readonly updatedAt: IsoUtcTimestamp;
  readonly createdBy?: EntityId;
  readonly updatedBy?: EntityId;
}

/** Soft-deletable entity (conventions.softDelete in system.json). */
export interface SoftDeletableEntity extends AuditableEntity {
  readonly deletedAt?: IsoUtcTimestamp;
}
