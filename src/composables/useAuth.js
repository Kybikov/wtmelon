import { ref, onMounted } from 'vue';
import { supabase } from '../services/supabaseClient';

const user = ref(null);
const loading = ref(true);

export function useAuth() {
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signInWithMagicLink = async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/cabinet',
      },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    user.value = null;
  };

  const getCurrentUser = () => {
    return user.value;
  };

  const initAuth = () => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      user.value = session?.user ?? null;
      loading.value = false;

      supabase.auth.onAuthStateChange((_event, session) => {
        (async () => {
          user.value = session?.user ?? null;
        })();
      });
    })();
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithMagicLink,
    signOut,
    getCurrentUser,
    initAuth,
  };
}
