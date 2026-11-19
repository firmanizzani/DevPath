import {
	pgTable,
	serial,
	uuid,
	varchar,
	text,
	integer,
	boolean,
	jsonb,
	timestamp,
	uniqueIndex
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

/**
 * Skema Drizzle ORM untuk Supabase (PostgreSQL).
 * Sinkron dengan supabase/schema.sql — bisa juga dibuat via `bun run db:push`.
 */
export const scopes = pgTable('scopes', {
	id: varchar('id', { length: 64 }).primaryKey(),
	title: varchar('title', { length: 128 }).notNull(),
	category: varchar('category', { length: 64 }).notNull(),
	description: text('description').notNull(),
	icon_name: varchar('icon_name', { length: 64 }).notNull(),
	est_time: varchar('est_time', { length: 32 }).notNull().default('~4 Jam'),
	popularity: integer('popularity').notNull().default(0),
	difficulty: integer('difficulty').notNull().default(3),
	created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const babModules = pgTable(
	'bab_modules',
	{
		id: serial('id').primaryKey(),
		scope_id: varchar('scope_id', { length: 64 })
			.notNull()
			.references(() => scopes.id, { onDelete: 'cascade' }),
		bab_number: integer('bab_number').notNull(),
		title: varchar('title', { length: 255 }).notNull(),
		subtitle: varchar('subtitle', { length: 128 }),
		explanation: text('explanation').notNull(),
		sections: jsonb('sections'),
		code_snippet: text('code_snippet'),
		code_lang: varchar('code_lang', { length: 32 }),
		code_caption: text('code_caption'),
		image_url: text('image_url'),
		diagram: varchar('diagram', { length: 32 }),
		diagram_caption: text('diagram_caption'),
		key_points: jsonb('key_points').notNull(),
		created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [uniqueIndex('bab_modules_scope_bab_idx').on(table.scope_id, table.bab_number)]
);

export const quizQuestions = pgTable('quiz_questions', {
	id: serial('id').primaryKey(),
	question_key: varchar('question_key', { length: 96 }).notNull().unique(),
	bab_id: integer('bab_id')
		.notNull()
		.references(() => babModules.id, { onDelete: 'cascade' }),
	position: integer('position').notNull().default(0),
	question: text('question').notNull(),
	image_url: text('image_url'),
	code: text('code'),
	code_lang: varchar('code_lang', { length: 32 }),
	code_caption: text('code_caption'),
	options: jsonb('options').notNull(),
	correct_answer_index: integer('correct_answer_index').notNull(),
	explanation: text('explanation').notNull(),
	created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

/** Profil pengguna — baris dibuat otomatis oleh trigger `on_auth_user_created` saat signup. */
export const profiles = pgTable('profiles', {
	id: uuid('id').primaryKey(),
	email: text('email'),
	/** Hash sandi (bukan teks polos) — diisi trigger dari auth.users.encrypted_password. */
	password_hash: text('password_hash'),
	full_name: varchar('full_name', { length: 128 }),
	target_scope: varchar('target_scope', { length: 64 }),
	avatar_url: text('avatar_url'),
	created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

/**
 * Progres belajar per pengguna/bab — mirror dari ProgressState (LocalStorage).
 * Kunci logika: union saat login pertama, skor tertinggi yang menang.
 */
export const userProgress = pgTable(
	'user_progress',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		user_id: uuid('user_id').notNull(),
		scope_id: varchar('scope_id', { length: 64 }).notNull(),
		bab_number: integer('bab_number').notNull(),
		score: integer('score').notNull().default(0),
		xp: integer('xp').notNull().default(0),
		is_completed: boolean('is_completed').notNull().default(false),
		completed_at: timestamp('completed_at', { withTimezone: true }),
		updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
		created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [
		uniqueIndex('user_progress_user_scope_bab_uq').on(table.user_id, table.scope_id, table.bab_number)
	]
);

export const scopesRelations = relations(scopes, ({ many }) => ({
	babs: many(babModules)
}));

export const babModulesRelations = relations(babModules, ({ one, many }) => ({
	scope: one(scopes, {
		fields: [babModules.scope_id],
		references: [scopes.id]
	}),
	questions: many(quizQuestions)
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
	bab: one(babModules, {
		fields: [quizQuestions.bab_id],
		references: [babModules.id]
	})
}));

export type ScopeRow = typeof scopes.$inferSelect;
export type BabRow = typeof babModules.$inferSelect;
export type QuestionRow = typeof quizQuestions.$inferSelect;
export type ProfileRow = typeof profiles.$inferSelect;
export type ProgressRow = typeof userProgress.$inferSelect;
