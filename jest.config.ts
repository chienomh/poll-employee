// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass|jpg|png)$": "identity-obj-proxy",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "\\.(png|jpg|jpeg|gif|svg)$'": "jest-transform-stub",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "\\.png$"],
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src/assest"],
};

export default config;
