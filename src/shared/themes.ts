export type Theme = {
  radius: number,
  background: string,
  foreground: string,
  surface: string,
  surface_foreground: string,
  primary: string,
  primary_foreground: string,
  secondary: string,
  secondary_foreground: string,
  muted: string,
  muted_foreground: string,
  accent: string,
  accent_foreground: string,
  destructive: string,
  border: string,
  input: string,
  ring: string
}

export const LightTheme: Theme = {
  // background: oklch(1 0 0);
  // foreground: oklch(0.141 0.005 285.823);
  // surface: oklch(1 0 0);
  // surface-foreground: oklch(0.141 0.005 285.823);
  // primary: oklch(0.705 0.213 47.604);
  // primary-foreground: oklch(0.98 0.016 73.684);
  // secondary: oklch(0.967 0.001 286.375);
  // secondary-foreground: oklch(0.21 0.006 285.885);
  // muted: oklch(0.967 0.001 286.375);
  // muted-foreground: oklch(0.552 0.016 285.938);
  // accent: oklch(0.967 0.001 286.375);
  // accent-foreground: oklch(0.21 0.006 285.885);
  // destructive: oklch(0.577 0.245 27.325);
  // border: oklch(0.92 0.004 286.32);
  // input: oklch(0.92 0.004 286.32);
  // ring: oklch(0.705 0.213 47.604);
  radius: 10,
  background: "#ffffff",
  foreground: "#09090b",
  surface: "#ffffff",
  surface_foreground: "#09090b",
  primary: "#ff6900",
  primary_foreground: "#fff7ed",
  secondary: "#f4f4f5",
  secondary_foreground: "#18181b",
  muted: "#f4f4f5",
  muted_foreground: "#71717b",
  accent: "#f4f4f5",
  accent_foreground: "#18181b",
  destructive: "#e7000b",
  border: "#e4e4e7",
  input: "#e4e4e7",
  ring: "#ff6900"
}

export const DarkTheme: Theme = {
  // background: oklch(0.141 0.005 285.823);
  // foreground: oklch(0.985 0 0);
  // surface: oklch(0.21 0.006 285.885);
  // surface-foreground: oklch(0.985 0 0);
  // primary: oklch(0.646 0.222 41.116);
  // primary-foreground: oklch(0.98 0.016 73.684);
  // secondary: oklch(0.274 0.006 286.033);
  // secondary-foreground: oklch(0.985 0 0);
  // muted: oklch(0.274 0.006 286.033);
  // muted-foreground: oklch(0.705 0.015 286.067);
  // accent: oklch(0.274 0.006 286.033);
  // accent-foreground: oklch(0.985 0 0);
  // destructive: oklch(0.704 0.191 22.216);
  // border: oklch(1 0 0 / 10%);
  // input: oklch(1 0 0 / 15%);
  // ring: oklch(0.646 0.222 41.116);
  radius: 10,
  background: "#09090b",
  foreground: "#fafafa",
  surface: "#18181b",
  surface_foreground: "#fafafa",
  primary: "#f54a00",
  primary_foreground: "#fff7ed",
  secondary: "#27272a",
  secondary_foreground: "#fafafa",
  muted: "#27272a",
  muted_foreground: "#9f9fa9",
  accent: "#27272a",
  accent_foreground: "#fafafa",
  destructive: "#ff6467",
  border: "#ffffff1a",
  input: "#ffffff26",
  ring: "#f54a00"
}

// chart-1: oklch(0.646 0.222 41.116);
// chart-2: oklch(0.6 0.118 184.704);
// chart-3: oklch(0.398 0.07 227.392);
// chart-4: oklch(0.828 0.189 84.429);
// chart-5: oklch(0.769 0.188 70.08);
// sidebar: oklch(0.985 0 0);
// sidebar-foreground: oklch(0.141 0.005 285.823);
// sidebar-primary: oklch(0.705 0.213 47.604);
// sidebar-primary-foreground: oklch(0.98 0.016 73.684);
// sidebar-accent: oklch(0.967 0.001 286.375);
// sidebar-accent-foreground: oklch(0.21 0.006 285.885);
// sidebar-border: oklch(0.92 0.004 286.32);
// sidebar-ring: oklch(0.705 0.213 47.604);
//
// //DARK
// chart-1: oklch(0.488 0.243 264.376);
// chart-2: oklch(0.696 0.17 162.48);
// chart-3: oklch(0.769 0.188 70.08);
// chart-4: oklch(0.627 0.265 303.9);
// chart-5: oklch(0.645 0.246 16.439);
// sidebar: oklch(0.21 0.006 285.885);
// sidebar-foreground: oklch(0.985 0 0);
// sidebar-primary: oklch(0.646 0.222 41.116);
// sidebar-primary-foreground: oklch(0.98 0.016 73.684);
// sidebar-accent: oklch(0.274 0.006 286.033);
// sidebar-accent-foreground: oklch(0.985 0 0);
// sidebar-ring: oklch(0.646 0.222 41.116);
// sidebar-border: oklch(1 0 0 / 10%);
