
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

type CustomerProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
};

// Changed from Omit<CustomerProfile, "id"> to make all fields optional
type ProfileUpdateData = {
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

export function useCustomer() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["customerProfile", user?.id],
    queryFn: async (): Promise<CustomerProfile | null> => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) {
        console.error("Error fetching customer profile:", error);
        throw error;
      }
      
      return data;
    },
    enabled: !!user,
  });

  const updateProfile = useMutation({
    mutationFn: async (profileData: ProfileUpdateData) => {
      if (!user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from("customers")
        .update(profileData)
        .eq("id", user.id);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: error.message,
        });
        throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerProfile", user?.id] });
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  };
}
