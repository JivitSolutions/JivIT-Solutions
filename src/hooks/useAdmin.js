import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook to check if the current user has administrative privileges.
 */
export const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    setIsAdmin(false);
                    setProfile(null);
                    return;
                }

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                setProfile(data);
                setIsAdmin(data.role === 'admin');
            } catch (err) {
                console.error('Error checking admin status:', err);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            checkAdminStatus();
        });

        return () => subscription.unsubscribe();
    }, []);

    return { isAdmin, loading, profile };
};
