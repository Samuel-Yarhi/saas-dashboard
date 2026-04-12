"use client";

import { useEffect } from "react";
import { Client } from "@/data/clients-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    clientFormSchema,
    ClientFormValues,
} from "@/features/dashboard/schemas/client-form-schema";

type EditClientSheetProps = {
    client: Client | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedClient: Client) => void;
};

export function EditClientSheet({
    client,
    open,
    onOpenChange,
    onSave,
}: EditClientSheetProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ClientFormValues>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            name: "",
            company: "",
            email: "",
            status: "Active",
            plan: "Starter",
            monthlyRevenue: 0,
        },
    });

    useEffect(() => {
        if (client) {
            reset({
                name: client.name,
                company: client.company,
                email: client.email,
                status: client.status,
                plan: client.plan,
                monthlyRevenue: client.monthlyRevenue,
            });
        }
    }, [client, reset]);

    function onSubmit(values: ClientFormValues) {
        if (!client) return;

        onSave({
            ...client,
            ...values,
        });

        onOpenChange(false);
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit client</SheetTitle>
                    <SheetDescription>
                        Update client information and save your changes.
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 ml-6 mr-4 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input {...register("name")} />
                        {errors.name ? (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input {...register("company")} />
                        {errors.company ? (
                            <p className="text-sm text-destructive">{errors.company.message}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" {...register("email")} />
                        {errors.email ? (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Trial">Trial</SelectItem>
                                        <SelectItem value="Churned">Churned</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.status ? (
                            <p className="text-sm text-destructive">{errors.status.message}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Plan</label>
                        <Controller
                            control={control}
                            name="plan"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Starter">Starter</SelectItem>
                                        <SelectItem value="Pro">Pro</SelectItem>
                                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.plan ? (
                            <p className="text-sm text-destructive">{errors.plan.message}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Monthly Revenue</label>
                        <Input
                            type="number"
                            min="0"
                            step="1"
                            {...register("monthlyRevenue", { valueAsNumber: true })}
                        />
                        {errors.monthlyRevenue ? (
                            <p className="text-sm text-destructive">
                                {errors.monthlyRevenue.message}
                            </p>
                        ) : null}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            Save changes
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}