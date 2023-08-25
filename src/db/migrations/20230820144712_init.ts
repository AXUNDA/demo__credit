

import { Knex } from "knex";



export async function up(knex: Knex): Promise<void> {

 
  await knex.schema.createTable('users', function (table) {
   
    // table.uuid('user_id').defaultTo(knex.raw('(UUID())')).primary();
    table.uuid('user_id').primary();

    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
   

  });

  await knex.schema.createTable('wallet', function (table) {
    
    table.string('wallet_id').primary().notNullable()

    table.uuid('user_id').unique().notNullable().references('user_id').inTable('users');
    table.float('balance').notNullable().defaultTo(0.00).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
   
  });
  await knex.schema.createTable('transaction_history', function (table) {
    
    table.string('transaction_id').primary().notNullable()
    table.uuid('sender_user_id').notNullable().references('user_id').inTable('users');
    table.string('recipient_user_id').notNullable()



    table.string('sender').notNullable()
    table.string('beneficiary').notNullable()
    table.enum('transaction_type', ['deposit', 'withdrawal', 'transfer']).notNullable()


    table.float('amount').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now());
 
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('wallet');
  await knex.schema.dropTable('users');
}
