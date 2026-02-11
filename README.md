# Text Editor Component

A reusable rich text editor built with **TipTap**, **React**, and **Shadcn UI Toggle**. Designed for Next.js App Router projects with Tailwind CSS.

## Preview

The editor provides a toolbar with the following features:

| Feature | Description |
|---|---|
| Align Right / Center / Left | Text alignment (per block) |
| H1 / H2 / H3 | Heading levels |
| Bold | Bold text |
| Italic | Italic text |
| Strikethrough | Strikethrough text |
| Highlight | Highlight text |
| Horizontal Rule | Insert horizontal divider |
| Bullet List | Unordered list |
| Ordered List | Numbered list |
| And you can add others, just visit [Tip-tap docs](https://tiptap.dev/)

## Files

```
text-editor/
├── TextEditor.tsx      # Main editor component
├── MenuBar.tsx         # Toolbar with formatting options
├── text-editor.css     # Editor styles (add to globals.css)
└── README.md
```

## Dependencies

Install the following packages:

```bash
# TipTap core
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/pm

# TipTap extensions
pnpm add @tiptap/extension-text-align @tiptap/extension-highlight

# Icons
pnpm add lucide-react react-icons

# Shadcn UI Toggle (uses Radix UI under the hood)
pnpm add @radix-ui/react-toggle class-variance-authority
```

### Tailwind Typography (required for prose styles)

```bash
pnpm add -D @tailwindcss/typography
```

Then add to your `globals.css`:

```css
@plugin "@tailwindcss/typography";
```

## Setup

### 1. Copy the files

Place `TextEditor.tsx` and `MenuBar.tsx` into your components directory:

```
src/components/shared/text-editor/
├── TextEditor.tsx
├── MenuBar.tsx
```

### 2. Add the CSS styles

Copy the contents of `text-editor.css` into your `globals.css` file (or import it directly).

These styles rely on **Shadcn UI CSS variables** (`--border`, `--card`, `--muted`, `--primary`, etc.). If you're using Shadcn UI in your project, these variables are already defined.

### 3. Shadcn UI Toggle component

The MenuBar uses the Shadcn UI `Toggle` component. If you don't have it yet, add it:

```bash
npx shadcn@latest add toggle
```

This creates `src/components/ui/toggle.tsx` and sets up the `cn` utility at `src/lib/utils.ts` if not present.

### 4. Tailwind Typography plugin

The editor content area uses Tailwind `prose` classes to style headings, lists, bold, italic, etc. Without this plugin, formatting won't be visible.

Make sure `@tailwindcss/typography` is installed and added to your CSS (see Dependencies above).

## Usage

```tsx
import TextEditor from '@/components/shared/text-editor/TextEditor'

// Basic usage — name is used for the hidden <input> (useful in forms)
<TextEditor name="content" />

// With initial value
<TextEditor name="content" initialValue="<p>Hello world</p>" />
```

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Name attribute for the hidden input (for form submission) |
| `initialValue` | `string` | No | Initial HTML content for the editor |

### Getting the value

The component renders a hidden `<input>` with the editor's HTML content. This works with native form submissions and server actions:

```tsx
// In a Server Action or form handler
function handleSubmit(formData: FormData) {
  const content = formData.get('content') // HTML string
}
```

## Customization

### Change the placeholder

In `TextEditor.tsx`, modify the `placeholder` attribute:

```tsx
editorProps: {
    attributes: {
        placeholder: 'Write something...'
    }
}
```

### Change editor height

In `text-editor.css`, modify `.text-editor-body` and `.text-editor-content`:

```css
.text-editor-body {
  min-height: 300px; /* change this */
}

.text-editor-content {
  min-height: 300px; /* match this */
}
```

### Add more TipTap extensions

In `TextEditor.tsx`, add extensions to the array:

```tsx
import Underline from '@tiptap/extension-underline'

extensions: [
    StarterKit,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Highlight,
    Underline, // new
],
```

Then add the corresponding toolbar button in `MenuBar.tsx`.
