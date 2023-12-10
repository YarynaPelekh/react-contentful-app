import { createContext } from "react";

import { LibraryContent } from "../types/GeneralTypes";

export const LibraryContext = createContext<LibraryContent>({ items: [] });
