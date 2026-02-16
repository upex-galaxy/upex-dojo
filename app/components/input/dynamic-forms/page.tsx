"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ComponentLayout } from "@/components/component-layout"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter a valid email.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .max(4, { message: "You can add a maximum of 4 URLs." }),
  applyJob: z.boolean(),
  employmentStatus: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: ProfileFormValues = {
  username: "",
  email: "",
  bio: "",
  urls: [{ value: "https://example.com" }],
  applyJob: false,
  employmentStatus: undefined,
}

export default function DynamicFormsPage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  const watchApplyJob = form.watch("applyJob")

  React.useEffect(() => {
    if (!watchApplyJob) {
      form.setValue("employmentStatus", undefined)
    }
  }, [watchApplyJob, form])

  function onSubmit(data: ProfileFormValues) {
    console.log(data)
  }

  return (
    <ComponentLayout>
      <h1 className="text-3xl font-bold mb-6" data-testid="page-title">Dynamic Forms</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid="dynamic-form">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem data-testid="form-field-username">
                <FormLabel data-testid="username-label">Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} data-testid="username-input" />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage data-testid="username-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem data-testid="form-field-email">
                <FormLabel data-testid="email-label">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} data-testid="email-input" />
                </FormControl>
                <FormDescription>Enter your email address.</FormDescription>
                <FormMessage data-testid="email-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem data-testid="form-field-bio">
                <FormLabel data-testid="bio-label">Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} data-testid="bio-textarea" />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage data-testid="bio-error" />
              </FormItem>
            )}
          />
          <div data-testid="urls-section">
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem data-testid={`form-field-url-${index}`}>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>URLs</FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} data-testid={`url-input-${index}`} />
                    </FormControl>
                    <FormMessage data-testid={`url-error-${index}`} />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
              disabled={fields.length >= 4}
              data-testid="add-url-button"
            >
              Add URL
            </Button>
          </div>
          <FormField
            control={form.control}
            name="applyJob"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4" data-testid="form-field-applyjob">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} data-testid="applyjob-checkbox" />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel data-testid="applyjob-label">Apply for a job</FormLabel>
                  <FormDescription>Check this if you want to apply for a job.</FormDescription>
                </div>
              </FormItem>
            )}
          />
          {watchApplyJob && (
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem data-testid="form-field-employment">
                  <FormLabel data-testid="employment-label">Employment Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="employment-trigger">
                        <SelectValue placeholder="Select your employment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent data-testid="employment-content">
                      <SelectItem value="unemployed" data-testid="employment-option-unemployed">Unemployed</SelectItem>
                      <SelectItem value="employed" data-testid="employment-option-employed">Employed</SelectItem>
                      <SelectItem value="student" data-testid="employment-option-student">Student</SelectItem>
                      <SelectItem value="retired" data-testid="employment-option-retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select your current employment status.</FormDescription>
                  <FormMessage data-testid="employment-error" />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" data-testid="submit-button">Update profile</Button>
        </form>
      </Form>
      <div className="mt-8" data-testid="form-state-section">
        <h2 className="text-lg font-semibold">Form State:</h2>
        <pre className="mt-2 w-full max-w-2xl overflow-auto text-sm bg-muted p-4 rounded-md" data-testid="form-state-display">
          {JSON.stringify(form.watch(), null, 2)}
        </pre>
      </div>
    </ComponentLayout>
  )
}
