# Design Brief: Playful Romance Birthday Surprise

## Direction
Playful Romance — warm, celebratory interface with soft rose accents and deliberately cute decorative elements for intimate personal moments.

## Tone
Warm, romantic, and playful—executing cuteness with intention and restraint while maintaining emotional sincerity.

## Differentiation
Animated decorative elements (floating hearts, ribbon animations, bouncing teddy emoji) paired with rose/coral accents create an immediately memorable, personal experience.

## Color Palette

| Token      | OKLCH          | Role                      |
| ---------- | -------------- | ------------------------- |
| background | 0.97 0.008 70  | Warm cream primary surface |
| foreground | 0.18 0.02 50   | Deep warm text            |
| card       | 0.99 0.006 70  | Gift box backgrounds      |
| primary    | 0.58 0.2 350   | Warm rose buttons/accents |
| accent     | 0.65 0.18 25   | Dusty coral secondary     |
| muted      | 0.92 0.015 70  | Subtle backgrounds        |

## Typography
- Display: Space Grotesk — modern, playful, distinctive headings
- Body: DM Sans — warm, approachable, highly readable for messages
- Scale: hero text-5xl bold, h2 text-3xl bold, body text-base

## Elevation & Depth
Soft elevated shadows on cards with subtle warm undertones; minimal depth to maintain warmth and approachability.

## Structural Zones

| Zone    | Background       | Border    | Notes                  |
| ------- | ---------------- | --------- | ---------------------- |
| Header  | bg-background    | border-b  | Clean separation       |
| Content | bg-card (gifts)  | —         | Gift boxes rotate      |
| Footer  | bg-muted/30      | border-t  | Final message zone     |

## Spacing & Rhythm
Spacious density with generous gaps between gift options; micro-spacing (0.5rem) for label grouping; section rhythm via alternating backgrounds.

## Component Patterns
- Buttons: rounded-2xl, warm rose primary, coral accent on hover
- Cards: rounded-xl, shadow-sm with warm glow, soft pink tint
- Badges: rounded-full, accent colors for gift labels

## Motion
- Entrance: soft fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- Hover: subtle lift + warm glow on interactive elements
- Decorative: floating hearts (3s loop), rotating ribbon (4s), bouncing teddy (2s)

## Constraints
- No harsh shadows or neon effects
- All decorative animations must feel joyful, not frantic
- Custom images (couple photo, boyfriend photo, gift content) are user-provided
- Passcode entry must feel intimate and private

## Signature Detail
Curated animation choreography: floating hearts for emotional warmth, rotating ribbon for gift-wrapping celebration, bouncing teddy emoji as playful mascot—each animation reinforces the surprise reveal moment without overwhelming the sincere message.
