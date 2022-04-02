module.exports = {
    testEnvironment: "jsdom",
    preset: "ts-jest",
    modulePaths: ["<rootDir>/node_modules"],
    moduleNameMapper: {
        "shared-server/(.*)": "<rootDir>/../shared-server/$1",
        "shared-web/(.*)": "<rootDir>/../shared-web/$1"
    },
    modulePathIgnorePatterns: [
        "<rootDir>/build/"
    ],
    coverageReporters: [
        // "html",
        // "lcov",
        "text-summary"
    ]
};
