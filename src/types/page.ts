export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface DynamicPageProps<T extends Record<string, string> = Record<string, string>> {
  params: Promise<T>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}
