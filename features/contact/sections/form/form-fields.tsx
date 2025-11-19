import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle } from 'lucide-react'
import { formData } from './data'

interface FieldProps {
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function NameField({ value, onChange, error, disabled }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">
        {formData.fields.name.label}
        {formData.fields.name.required && <span className="text-destructive ml-1" aria-label="required">*</span>}
      </Label>
      <Input
        id="name"
        name="name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={formData.fields.name.placeholder}
        required={formData.fields.name.required}
        disabled={disabled}
        aria-required={formData.fields.name.required}
        aria-invalid={!!error}
        aria-describedby={error ? 'name-error' : undefined}
        maxLength={100}
      />
      {error && (
        <p id="name-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}

export function EmailField({ value, onChange, error, disabled }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">
        {formData.fields.email.label}
        {formData.fields.email.required && <span className="text-destructive ml-1" aria-label="required">*</span>}
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={formData.fields.email.placeholder}
        required={formData.fields.email.required}
        disabled={disabled}
        aria-required={formData.fields.email.required}
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
        autoComplete="email"
      />
      {error && (
        <p id="email-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}

export function PhoneField({ value, onChange, error, disabled }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">{formData.fields.phone.label}</Label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="(403) 555-0123"
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? 'phone-error' : 'phone-hint'}
        autoComplete="tel"
        maxLength={14}
      />
      {!error && (
        <p id="phone-hint" className="text-xs text-muted-foreground">
          Optional. Format: (403) 555-0123
        </p>
      )}
      {error && (
        <p id="phone-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}

interface ServiceFieldProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function ServiceField({ value, onChange, disabled }: ServiceFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="service">{formData.fields.service.label}</Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger id="service" aria-describedby="service-hint">
          <SelectValue placeholder={formData.fields.service.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {formData.fields.service.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p id="service-hint" className="text-xs text-muted-foreground">
        Optional. Select the service you&apos;re interested in
      </p>
    </div>
  )
}

interface MessageFieldProps extends FieldProps {
  rows?: number
}

export function MessageField({ value, onChange, error, disabled, rows = 5 }: MessageFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">
        {formData.fields.message.label}
        {formData.fields.message.required && <span className="text-destructive ml-1" aria-label="required">*</span>}
      </Label>
      <Textarea
        id="message"
        name="message"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={formData.fields.message.placeholder}
        rows={rows}
        required={formData.fields.message.required}
        disabled={disabled}
        aria-required={formData.fields.message.required}
        aria-invalid={!!error}
        aria-describedby={error ? 'message-error' : 'message-hint'}
        maxLength={1000}
      />
      <div className="flex justify-between">
        <div className="flex-1">
          {!error && (
            <p id="message-hint" className="text-xs text-muted-foreground">
              {value.length}/1000 characters
            </p>
          )}
          {error && (
            <p id="message-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface HoneypotFieldProps {
  value: string
  onChange: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export function HoneypotField({ value, onChange, inputRef }: HoneypotFieldProps) {
  return (
    <div className="hidden" aria-hidden="true">
      <Label htmlFor="website">Website</Label>
      <Input
        ref={inputRef}
        id="website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
