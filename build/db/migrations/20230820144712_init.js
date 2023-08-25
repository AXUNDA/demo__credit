"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('users', function (table) {
            // table.uuid('user_id').defaultTo(knex.raw('(UUID())')).primary();
            table.uuid('user_id').primary();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
        yield knex.schema.createTable('wallet', function (table) {
            table.string('wallet_id').primary().notNullable();
            table.uuid('user_id').unique().notNullable().references('user_id').inTable('users');
            table.float('balance').notNullable().defaultTo(0.00).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
        yield knex.schema.createTable('transaction_history', function (table) {
            table.string('transaction_id').primary().notNullable();
            table.uuid('sender_user_id').notNullable().references('user_id').inTable('users');
            table.string('recipient_user_id').notNullable();
            table.string('sender').notNullable();
            table.string('beneficiary').notNullable();
            table.enum('transaction_type', ['deposit', 'withdrawal', 'transfer']).notNullable();
            table.float('amount').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable('wallet');
        yield knex.schema.dropTable('users');
    });
}
exports.down = down;
