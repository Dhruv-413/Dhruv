/** "React.js" and "React" are the same tool; "Tailwind CSS" and "tailwindcss" too. Used to match a skill to a project's technologies. */
export function normaliseTech(name: string): string {
  return name.toLowerCase().replace(/\.js$/, "").replace(/[^a-z0-9+#]/g, "");
}
