import { cleanup } from "@testing-library/react";
import "@testing-lbirary/jest-dom/vitest";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
