---
name: react-dev
version: 1.0.0
description: This skill should be used when building React components with TypeScript, typing hooks, handling events, or when React TypeScript, React 19, Server Components are mentioned. Covers type-safe patterns for React 18-19 including generic components, proper event typing, and routing integration (TanStack Router, React Router).
---

# React TypeScript

> **On-demand loading**: Read files from `references/` and `examples/` only when specific guidance is needed for the current step.

Type-safe React = compile-time guarantees = confident refactoring.

<when_to_use>

- Building typed React components
- Implementing generic components
- Typing event handlers, forms, refs
- Using React 19 features (Actions, Server Components, use())
- Router integration (TanStack Router, React Router)
- Custom hooks with proper typing

NOT for: non-React TypeScript, vanilla JS React

</when_to_use>

<react_19_changes>

Key breaking changes — see [react-19-patterns.md](references/react-19-patterns.md) for full migration checklist:
- **ref as prop**: `forwardRef` deprecated; pass `ref` as a regular prop
- **useActionState**: replaces `useFormState` from react-dom
- **use()**: unwraps promises/context, triggers Suspense when unresolved
- **useOptimistic**: optimistic UI updates during async transitions

</react_19_changes>

<component_patterns>

Key typing patterns — see references for full examples:
- **Props**: extend native elements with `ComponentPropsWithoutRef<'button'>`
- **Children**: use `ReactNode` (renderable), `ReactElement` (single element), render props for callbacks
- **Discriminated unions**: model variant props with `| { variant: 'link'; href: string }`

</component_patterns>

<event_handlers>

Use specific event types (not `any`) for accurate `currentTarget` typing:
- Mouse: `React.MouseEvent<HTMLButtonElement>`
- Form submit: `React.FormEvent<HTMLFormElement>`
- Input change: `React.ChangeEvent<HTMLInputElement>`
- Keyboard: `React.KeyboardEvent<HTMLInputElement>`

See [event-handlers.md](references/event-handlers.md) for focus, drag, clipboard, touch, wheel events.

</event_handlers>

<hooks_typing>

Key patterns — see [hooks.md](references/hooks.md) for useCallback, useMemo, useImperativeHandle:
- **useState**: explicit type for unions/null — `useState<User | null>(null)`
- **useRef**: `null` initial for DOM refs; non-null for mutable values
- **useReducer**: discriminated union action types for exhaustive handling
- **Custom hooks**: return `[value, fn] as const` for correct tuple inference
- **useContext**: null guard + throw pattern for required context consumers

</hooks_typing>

<generic_components>

Generic components infer types from props — no manual annotations at call site.
- Use `keyof T` for column/field keys; render props for custom cell rendering
- Constrain with `T extends HasId` when a required base shape is needed

See [generic-components.md](examples/generic-components.md) for Table, Select, List, Modal, FormField patterns.

</generic_components>

<server_components>

React 19 Server Components run on server, can be async — see [server-components.md](examples/server-components.md):
- **Async RSC**: `async function Page()` fetches directly, no useEffect
- **Server Actions**: `'use server'` directive, call `revalidatePath` after mutations
- **Client + Action**: `useActionState(serverAction, initialState)` wires form to action
- **use() handoff**: pass `Promise` from server to client; `use()` suspends until resolved

</server_components>

<routing>

Both TanStack Router and React Router v7 provide type-safe routing:
- **TanStack Router**: compile-time safety, Zod `validateSearch`, file-based route tree
- **React Router v7**: auto-generated `+types/` from loaders/actions, Framework Mode

See [tanstack-router.md](references/tanstack-router.md) and [react-router.md](references/react-router.md).

</routing>

<rules>

ALWAYS:
- Specific event types (MouseEvent, ChangeEvent, etc)
- Explicit useState for unions/null
- ComponentPropsWithoutRef for native element extension
- Discriminated unions for variant props
- as const for tuple returns
- ref as prop in React 19 (no forwardRef)
- useActionState for form actions
- Type-safe routing patterns (see routing section)

NEVER:
- any for event handlers
- JSX.Element for children (use ReactNode)
- forwardRef in React 19+
- useFormState (deprecated)
- Forget null handling for DOM refs
- Mix Server/Client components in same file
- Await promises when passing to use()

</rules>

<references>

- [hooks.md](references/hooks.md) - useState, useRef, useReducer, useContext, custom hooks
- [event-handlers.md](references/event-handlers.md) - all event types, generic handlers
- [react-19-patterns.md](references/react-19-patterns.md) - useActionState, use(), useOptimistic, migration
- [generic-components.md](examples/generic-components.md) - Table, Select, List, Modal patterns
- [server-components.md](examples/server-components.md) - async components, Server Actions, streaming
- [tanstack-router.md](references/tanstack-router.md) - TanStack Router typed routes, search params, navigation
- [react-router.md](references/react-router.md) - React Router v7 loaders, actions, type generation, forms

</references>
