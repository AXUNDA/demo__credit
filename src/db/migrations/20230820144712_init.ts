

import { Knex } from "knex";
// import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
  // const defaultUserId =uuidv4()
  // const  walletId = uuidv4()
  await knex.schema.createTable('users', function (table) {
    // table.uuid('user_id').primary();
    table.uuid('user_id').defaultTo(knex.raw('(UUID())')).primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('wallet', function (table) {
    // table.uuid('wallet_id').primary();
    table.uuid('wallet_id').defaultTo(knex.raw('(UUID())')).primary();

    table.uuid('user_id').unique().notNullable().references('user_id').inTable('users');
    table.integer('balance').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('wallet');
  await knex.schema.dropTable('users');
}
