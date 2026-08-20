import type { PageContent } from "./types";
import { PROFIL_PAGES } from "./profil";
import { AKADEMIK_PAGES } from "./akademik";
import { KEMAHASISWAAN_PAGES } from "./kemahasiswaan";
import { RISET_PAGES } from "./riset";
import { INFORMASI_PAGES } from "./informasi";
import { PMB_PAGES } from "./pmb";

export const PAGES: Record<string, PageContent> = {
  ...PROFIL_PAGES,
  ...AKADEMIK_PAGES,
  ...KEMAHASISWAAN_PAGES,
  ...RISET_PAGES,
  ...INFORMASI_PAGES,
  ...PMB_PAGES,
};