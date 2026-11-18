#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/01c68634e3a6d365afb1f599ab96103b2e341b074b055391885c702335005281/contract';
import endContract from '../../snapshots/01c68634e3a6d365afb1f599ab96103b2e341b074b055391885c702335005281/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'wl_comment',
        columns: [
          col('comment', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdat', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('insertedat', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('ip', 'character varying(100)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('like', 'int4', { default: lit(0), codecRef: { codecId: 'pg/int4@1' } }),
          col('link', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('mail', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('nick', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('pid', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('rid', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('status', 'character varying(50)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('sticky', 'bool', { default: lit(false), codecRef: { codecId: 'pg/bool@1' } }),
          col('ua', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('updatedat', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('url', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('user_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'wl_counter',
        columns: [
          col('createdat', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction0', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction1', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction2', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction3', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction4', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction5', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction6', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction7', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('reaction8', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('time', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedat', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('url', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'wl_users',
        columns: [
          col('2fa', 'character varying(32)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 32 } },
          }),
          col('avatar', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('createdat', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('display_name', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('email', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('facebook', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('github', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('google', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('label', 'character varying(50)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('password', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('twitter', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('type', 'character varying(50)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('updatedat', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('url', 'character varying(255)', {
            default: lit(''),
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'wl_comment',
        index: 'wl_comment_url_idx_f758eab5',
        columns: ['url'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
