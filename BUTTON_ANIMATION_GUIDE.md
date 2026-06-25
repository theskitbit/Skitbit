# Button Animation Micro-Interactions Guide

## Overview
This guide outlines the animation system for interactive buttons across the application. All animations use pure CSS/Tailwind with no external animation libraries, ensuring optimal performance and minimal bundle size.

## Core Animation Properties

### Duration
- **Standard**: 300ms
- **Rationale**: Fast enough to feel responsive (< 100ms feels jarring), slow enough to feel smooth (> 500ms feels sluggish)
- **Use Cases**: All hover and active state transitions

### Easing Function
- **Applied**: `ease-out`
- **Behavior**: Starts at full speed, gradually decelerates to create a natural, snappy feel
- **Alternative**: `ease-in-out` for more dramatic effects (not recommended for subtle micro-interactions)

### Transform Effects

#### Scale
- **Hover State**: `scale-105` (105% of original size)
  - 5% growth is noticeable without being disruptive
  - Signals interactivity without overwhelming the interface
- **Active State**: `scale-95` (95% of original size)
  - Provides tactile press feedback
  - Symmetrical with hover effect for consistency

#### Translate (Vertical Lift)
- **Hover State**: `-translate-y-0.5` (2px upward movement)
  - Creates sense of "lightness" and elevation
  - Subtle enough to not distract from content
  - Paired with shadow increase for depth perception
- **Active State**: Removed (button returns to baseline)

#### Shadow
- **Default**: None (flat appearance)
- **Hover**: `shadow-lg` (large shadow)
  - Creates elevation illusion matching the lift effect
  - Depth perception supports the scale increase
- **Active**: `shadow-md` (medium shadow)
  - Compromise between default and hover
  - Suggests button is "pressed" or depressed into surface

## Implementation Patterns

### Pattern 1: Reusable Button Component
```tsx
<button className="transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-md">
  Click Me
</button>
```

### Pattern 2: With Icon
```tsx
<button className="px-6 py-3 flex items-center gap-2 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-md">
  Contact Us
  <span className="transition-transform group-hover:translate-x-0.5">→</span>
</button>
```

### Pattern 3: Conditional Animation
```tsx
<InteractiveButton animated={true} variant="default">
  Primary Action
</InteractiveButton>
```

## Trigger Points

### Hover
- **Desktop**: Triggered when cursor enters button bounds
- **Timing**: Immediate (0ms delay)
- **Duration**: 300ms transition

### Active (Press)
- **Desktop**: Triggered on mouse down
- **Mobile**: Triggered on touch
- **Timing**: Immediate feedback
- **Release**: Transitions back to hover or default state

### Focus (Keyboard)
- **Trigger**: Tab navigation or explicit focus
- **Animation**: Preserved outline ring (no custom animation)
- **Reason**: Ensure accessibility and keyboard navigation clarity

## Animation Breakdown Timeline

For a single hover interaction:
```
Time (ms)  | Scale      | Shadow       | Position
-----------|------------|--------------|----------
0          | 100%       | none         | 0px
150        | 102.5%     | shadow-lg    | -1px
300        | 105%       | shadow-lg    | -2px (stable)

On Release:
300-600ms  | Returns to 100% (ease-out)
```

## Best Practices

### ✅ Do
- Apply animations only to primary actions (CTAs, form submits)
- Use consistent animation durations across the site (300ms)
- Test hover states with keyboard navigation
- Ensure sufficient color contrast in all states
- Use GPU-accelerated properties (transform, box-shadow)

### ❌ Don't
- Stack multiple animations on nested elements
- Animate layout properties (width, height, margin, padding)
- Use animations for non-interactive elements
- Exceed 300ms duration for micro-interactions
- Violate WCAG AA contrast requirements in any state

## Performance Optimization

### Why These Choices?
1. **Transform over Position**: GPU-accelerated, no layout recalculation
2. **Box-Shadow over Border**: No reflow, smooth visual effect
3. **CSS over JavaScript**: Native browser optimization, zero runtime cost
4. **Tailwind Classes**: Automatic vendor prefixes, consistent output

### No Layout Shifts
All animated properties use CSS transforms:
- `scale()` ✅ GPU accelerated
- `translate()` ✅ GPU accelerated
- `box-shadow` ✅ No layout impact
- Avoid: width, height, margin, padding changes ❌

## Accessibility Considerations

### Respects User Preferences
- Animations work with `prefers-reduced-motion` (Tailwind default)
- Users with motion sensitivity can disable animations OS-wide
- Functionality remains identical regardless of animation state

### Touch Targets
- Minimum 44x44px for mobile (maintained across states)
- No animations reduce interactive area
- Scale transforms don't affect pointer events

### Focus States
- Default `focus-visible:ring` preserved
- Outline colors meet WCAG AA contrast
- Tab navigation unchanged by animations

### Keyboard Navigation
- All button interactions accessible via Enter/Space
- No animation-dependent functionality
- Click handlers fire regardless of animation state

## Responsive Considerations

### Desktop
- Full micro-interactions enabled
- Hover states trigger on cursor movement
- Active states on mouse down

### Mobile/Touch
- Hover animations still apply (on-touch)
- Active animations trigger on touch
- No pointer-specific limitations

### Reduced Motion
- If `prefers-reduced-motion: reduce` is set in OS:
  - Duration reduced to instant
  - Opacity changes preferred over transforms
  - Subtle feedback still present

## Color States Maintained

### Primary Button
- **Default**: `bg-primary text-primary-foreground`
- **Hover**: Scale + lift + shadow (no color change)
- **Active**: Scale down + medium shadow (no color change)
- **Focus**: Outline ring added (no animation overlap)

### Secondary Button
- **Default**: `bg-muted text-foreground`
- **Hover**: Scale + lift + shadow
- **Active**: Scale down + medium shadow
- **Focus**: Outline ring added

## Migration Guide

### From Old Button (opacity-based)
```tsx
// Old
<button className="hover:opacity-90 transition">

// New
<button className="hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-out">
```

### Why Change?
1. **More Engaging**: Multiple effects create richer feedback
2. **Better UX**: Scale and lift feel more natural
3. **Professional**: Micro-interactions signal quality
4. **Accessible**: Works with keyboard and touch
5. **Performant**: GPU-accelerated transforms

## Testing Checklist

- [ ] Hover animation triggers smoothly on desktop
- [ ] Active (press) animation provides tactile feedback
- [ ] Mobile touch states work correctly
- [ ] Keyboard navigation (Tab + Enter) works
- [ ] Focus ring visible and accessible
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No layout shift or jank on animation
- [ ] Color contrast meets WCAG AA (all states)
- [ ] Touch targets remain ≥ 44x44px
- [ ] Animation doesn't conflict with other effects

## Examples in Codebase

### Hero Section
- Primary: "Contact Us" button
- Secondary: "Learn more" button

### CTA Section
- Primary: "Let's get started" button
- Secondary: "Learn more" button

### Components
- `components/hero.tsx`
- `components/cta.tsx`
- `components/interactive-button.tsx`

## Future Enhancements

Possible additions without breaking changes:
- Icon animation (rotate arrow on hover)
- Text color shift on hover
- Animated underline for secondary buttons
- Staggered animations for button groups
- Loading states with spinner integration
