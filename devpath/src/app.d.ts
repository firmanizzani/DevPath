import type { Session, User } from '@supabase/supabase-js';
import type { createServerClient } from '@supabase/ssr';

type SupabaseServerClient = ReturnType<typeof createServerClient>;

export interface PublicProfile {
	id: string;
	email: string | null;
	full_name: string | null;
	target_scope: string | null;
	avatar_url: string | null;
	created_at?: string;
	updated_at?: string;
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseServerClient;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			user: { id: string; email: string; name: string; avatar_url: string | null } | null;
			profile: PublicProfile | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
