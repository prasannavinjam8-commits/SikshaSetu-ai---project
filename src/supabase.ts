import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://prbcctljozxpzifgbdng.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_B1-_h2rjopzK9vW552QdEw_VY4o_ie2';

// Safe singleton client initialization:
// Uses existing client on window if already initialized in index.html, or creates new instance
declare global {
  interface Window {
    supabaseClient?: SupabaseClient;
    supabase?: any;
    isFamilySynced?: boolean;
    isPartnerFormFilled?: boolean;
  }
}

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (typeof window !== 'undefined' && window.supabaseClient) {
    return window.supabaseClient;
  }
  if (!clientInstance) {
    clientInstance = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    if (typeof window !== 'undefined') {
      window.supabaseClient = clientInstance;
    }
  }
  return clientInstance;
}

export interface FamilySyncRecord {
  id?: string | number;
  student_email: string;
  parent_email: string;
  created_at?: string;
}

export interface StudentPreferencesRecord {
  id?: string | number;
  student_email?: string;
  expected_rank: string;
  top_branch_choice: string;
  preferred_accommodation: string;
  preferred_language: string;
  admission_route?: string;
  why_branch?: string;
  college_priority?: string;
  four_year_goal?: string;
  backup_plan?: string;
  created_at?: string;
}

// Simple email format validation helper
export function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Save Family Sync Invite to 'family_sync' table in Supabase.
 * Validates both student_email and parent_email before insertion.
 * Non-blocking safe execution.
 */
export async function saveFamilySyncInvite(params: {
  student_email: string;
  parent_email: string;
}): Promise<{ success: boolean; error?: string }> {
  const studentEmail = params.student_email.trim();
  const parentEmail = params.parent_email.trim();

  if (!studentEmail || !isValidEmailFormat(studentEmail)) {
    return { success: false, error: 'Invalid or missing student email.' };
  }

  if (!parentEmail || !isValidEmailFormat(parentEmail)) {
    return { success: false, error: 'Invalid or missing parent/guardian email.' };
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('family_sync')
      .insert([
        {
          student_email: studentEmail,
          parent_email: parentEmail,
        },
      ])
      .select();

    if (error) {
      console.warn('Supabase family_sync insert notice:', error.message || error);
      return { success: false, error: error.message };
    }

    console.info('Family sync invite record stored successfully in Supabase:', data);
    return { success: true };
  } catch (err: any) {
    console.error('Unable to insert family sync invitation into Supabase:', err);
    return { success: false, error: err?.message || 'Database error occurred' };
  }
}

// Cache the last saved payload fingerprint to prevent accidental rapid duplicate inserts
let lastSavedPreferencesFingerprint = '';
let lastSavedTimestamp = 0;

/**
 * Save Student Education Preferences to 'student_preferences' table in Supabase.
 * Used identically by both "Analyze with AI" and "Force Sync" bypass pathways.
 */
export async function saveStudentPreferences(
  preferences: StudentPreferencesRecord
): Promise<{ success: boolean; error?: string }> {
  try {
    const fingerprint = JSON.stringify({
      rank: preferences.expected_rank,
      branch: preferences.top_branch_choice,
      accom: preferences.preferred_accommodation,
      lang: preferences.preferred_language,
      route: preferences.admission_route,
      goal: preferences.four_year_goal,
    });

    const now = Date.now();
    // Debounce exact duplicate saves within 3 seconds
    if (fingerprint === lastSavedPreferencesFingerprint && now - lastSavedTimestamp < 3000) {
      console.info('Skipping duplicate student preferences insertion (recently saved).');
      return { success: true };
    }

    lastSavedPreferencesFingerprint = fingerprint;
    lastSavedTimestamp = now;

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('student_preferences')
      .insert([preferences])
      .select();

    if (error) {
      console.warn('Supabase student_preferences insert notice:', error.message || error);
      return { success: false, error: error.message };
    }

    console.info('Student preferences saved successfully to Supabase:', data);
    return { success: true };
  } catch (err: any) {
    console.error('Unable to save student preferences to Supabase:', err);
    return { success: false, error: err?.message || 'Database error occurred' };
  }
}

/**
 * Non-blocking helper function for asynchronous database writes
 * Ensures UI flows remain immediate, responsive, and uninterrupted.
 */
export function savePreferencesInBackground(
  preferences: StudentPreferencesRecord,
  onError?: (errMessage: string) => void
): void {
  void (async () => {
    try {
      const result = await saveStudentPreferences(preferences);
      if (!result.success && result.error) {
        if (onError) onError(result.error);
      }
    } catch (error) {
      console.error('Unexpected error in savePreferencesInBackground:', error);
    }
  })();
}
