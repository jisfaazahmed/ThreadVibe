
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { useCustomer } from "@/hooks/use-customer";

const profileSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }).nullable().or(z.string().min(1, { message: "First name is required" })),
  last_name: z.string().min(1, { message: "Last name is required" }).nullable().or(z.string().min(1, { message: "Last name is required" })),
  phone: z.string().nullable().or(z.string()),
  address_line1: z.string().nullable().or(z.string()),
  address_line2: z.string().nullable().or(z.string()),
  city: z.string().nullable().or(z.string()),
  state: z.string().nullable().or(z.string()),
  postal_code: z.string().nullable().or(z.string()),
  country: z.string().nullable().or(z.string()),
});

const AccountProfile = () => {
  const { user, signOut } = useAuth();
  const { profile, isLoading, updateProfile } = useCustomer();
  const [isSaving, setIsSaving] = React.useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
      address_line1: profile?.address_line1 || "",
      address_line2: profile?.address_line2 || "",
      city: profile?.city || "",
      state: profile?.state || "",
      postal_code: profile?.postal_code || "",
      country: profile?.country || "",
    },
  });

  // Update form values when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        address_line1: profile.address_line1 || "",
        address_line2: profile.address_line2 || "",
        city: profile.city || "",
        state: profile.state || "",
        postal_code: profile.postal_code || "",
        country: profile.country || "",
      });
    }
  }, [profile, form]);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      setIsSaving(true);
      await updateProfile.mutateAsync(values);
    } catch (error) {
      console.error("Update profile error:", error);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Email address</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address_line1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address_line2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State / Province</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="postal_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" type="button" onClick={() => signOut()}>
                Sign Out
              </Button>
              <Button type="submit" disabled={isSaving || !form.formState.isDirty}>
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-t-white rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AccountProfile;
