# Improve Booking Flow

You are tasked with analyzing and improving the Square-integrated booking system to match Square's official booking UX and best practices.

## Analysis Phase

1. **Review Current Implementation**
   - Read all booking files in `features/booking/`
   - Analyze `lib/integrations/square.ts` for API integration
   - Check `features/booking/actions/create-booking.ts` for booking logic
   - Review all step components in `features/booking/sections/`

2. **Fetch Square Documentation**
   - Use Context7 MCP to fetch Square Bookings API docs:
     - `/websites/developer_squareup_com-docs` with topic "bookings api complete flow best practices"
     - `/websites/developer_squareup_com-docs` with topic "availability search time slots"
     - `/websites/developer_squareup_com-docs` with topic "bookings webhooks notifications"
   - Identify missing features and best practices

3. **Analyze UX Gaps**
   - Compare current flow with Square's official booking site UX
   - Identify missing features:
     - Real-time availability checking
     - Time slot availability based on staff schedule
     - Booking conflicts prevention
     - Multiple duration options
     - Cancellation/rescheduling
     - Email confirmations
     - SMS notifications
     - Waitlist management
     - Deposit/payment integration
     - Customer notes field
     - Custom fields/questions

## Improvement Phase

4. **Use shadcn MCP for UX Enhancements**
   - Search shadcn registry for better components:
     - `@shadcn` - Look for form blocks, calendar examples, time picker
     - `@reui` - Look for improved stepper variants, loading states
     - `@magicui` - Look for animated components for better feedback
   - View component examples before implementing
   - Get add commands for components you'll use

5. **Implement Missing Critical Features**

   Priority order:

   **High Priority:**
   - [ ] Real-time availability checking (fetch available slots from Square)
   - [ ] Loading states for each step
   - [ ] Error boundaries and error handling
   - [ ] Form persistence (save progress in localStorage)
   - [ ] Booking confirmation screen
   - [ ] Email confirmation integration

   **Medium Priority:**
   - [ ] Multiple service durations
   - [ ] Add-on services
   - [ ] Special requests/notes field
   - [ ] Cancellation policy display
   - [ ] Rescheduling capability
   - [ ] Time zone selection for remote services

   **Low Priority:**
   - [ ] Waitlist functionality
   - [ ] Recurring appointments
   - [ ] Package/membership integration
   - [ ] Payment/deposit collection
   - [ ] SMS reminders
   - [ ] Custom intake forms

6. **UX Improvements**

   For each step, ensure:

   **Service Step:**
   - Service images/thumbnails
   - Service descriptions/details expandable
   - Highlight popular services
   - Show "Recommended for you" if applicable
   - Filter by category if many services

   **Staff Step:**
   - Staff photos (if available)
   - Staff bio/credentials
   - Staff availability preview
   - Show "Soonest available" option
   - Display staff ratings/reviews if available

   **Date/Time Step:**
   - Show only available time slots (integrate with Square Availability API)
   - Display time zone clearly
   - Show "Morning/Afternoon/Evening" quick filters
   - Indicate if requested time is unavailable
   - Suggest alternative times
   - Show duration in time slot

   **Info Step:**
   - Pre-fill returning customer data
   - Phone number formatting
   - Add emergency contact option
   - Add "How did you hear about us?" field
   - Clear privacy policy link
   - Add notes/special requests field

7. **Technical Improvements**

   - Add proper TypeScript types for all Square API responses
   - Implement proper error handling with user-friendly messages
   - Add loading skeletons for async operations
   - Implement optimistic UI updates
   - Add analytics tracking for drop-off points
   - Implement form validation with Zod schemas
   - Add rate limiting for API calls
   - Implement retry logic for failed requests

8. **Accessibility & Mobile**

   - Ensure all interactive elements are keyboard accessible
   - Add proper ARIA labels
   - Test with screen readers
   - Ensure touch targets are at least 44x44px
   - Test on various mobile devices (viewport sizes)
   - Add haptic feedback for mobile interactions
   - Ensure good contrast ratios
   - Add skip links for navigation

## Implementation Guidelines

- **Use TodoWrite** to track all improvements
- **Use shadcn MCP** to find and install components
- **Use Context7** to verify Square API best practices
- **Test each change** before moving to the next
- **Keep it mobile-first** - design for mobile, enhance for desktop
- **Follow the existing architecture** in `features/booking/`
- **Update types** in `lib/integrations/square.ts` as needed
- **Keep sections focused** - one responsibility per component
- **Add loading states** - never leave users wondering
- **Handle errors gracefully** - always show actionable error messages

## Success Criteria

✅ Booking flow matches Square's official UX quality
✅ All critical Square Bookings API features implemented
✅ Mobile experience is flawless
✅ Loading and error states are professional
✅ Form validation is comprehensive
✅ Accessibility score is 95%+
✅ No console errors or warnings
✅ TypeScript compilation passes with no errors
✅ All booking steps can be navigated back/forward
✅ User can complete a booking successfully

## Deliverables

1. Improved booking flow with all missing features
2. Updated Square integration with availability API
3. Enhanced UX with shadcn components
4. Proper error handling and loading states
5. Mobile-optimized responsive design
6. Comprehensive TypeScript types
7. Documentation of new features added

Start by creating a comprehensive todo list, then systematically work through each improvement while referencing Square's documentation for best practices.
