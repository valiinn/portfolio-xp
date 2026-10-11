/** Prefixo do site quando publicado em subpasta (ex.: GitHub Pages /repo) */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
