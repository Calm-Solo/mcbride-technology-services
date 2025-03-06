# First Baptist Church of North Highlands - Project Rules

## Server Components and Server Actions

- Use Next.js 15 Server Components and Server Actions wherever possible
- Create client components with the `"use client"` directive ONLY when needed for client-side state
- Keep client components small and "atomic" for better performance and maintainability
- Utilize lucide-react icons where icons are needed
- Utilize shadcn ui for components when needed

## Page Structure

- Each route's `page.tsx` file must ALWAYS be a server component (never use `"use client"` directive on page.tsx)
- The `page.tsx` should be minimal and responsible only for:
    - Main page setup
    - Metadata
    - Search parameters capture
    - Other minimal requirements

## Component Organization

- Additional functionality should be handled in separate server or client components
- For pages requiring client components:
    - Example: For a page named "services"
    - `/src/app/services/page.tsx` (server component)
    - `/src/app/services/Services.Component.Client.tsx` (client component)
- For pages using only server components:
    - Example: For a page named "details"
    - `/src/app/details/page.tsx` (server component)
    - `/src/app/details/Details.Component.Server.tsx` (server component)

## Search Parameters

- Access search parameters in `page.tsx` using:
    ```typescript
    const resolvedParams = await searchParams;
    ```
- Parse them with a `nuqs` parser to have access to the search parameters on the server side
- Pass parsed parameters down to components as needed

## API Routes and Server Actions

- Do NOT use API routes unless absolutely required
- Always create server actions for server-side operations
- Server actions can be organized in:
    - Global actions directory at `/src/app/actions/`
    - Per-page actions files (e.g., `/src/app/details/Details.Actions.ts`)

## Component Directory Structure

- Global components in `/src/components/` directory (create sub-directories as required)
- Layout components in `/src/components/layout/` directory
- Each page must utilize `/src/components/layout/PageLayout.tsx` which will contain:
    - `Navbar`
    - Other shared layout elements

## Naming Conventions

- Use PascalCase for components
- Use camelCase for functions and variables
- Be descriptive and consistent with naming
- Follow the established pattern for files (e.g., `PageName.Component.Client.tsx`)

## Code Quality

- Maintain consistent formatting with Prettier
- Follow ESLint rules
- Write clean, maintainable, and well-documented code
- Optimize components for performance
