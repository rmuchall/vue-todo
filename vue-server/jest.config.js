module.exports = {
    testEnvironment: "node",
    preset: "ts-jest",
    modulePaths: [
        "<rootDir>/node_modules",
        "<rootDir>/../node_modules"
    ],
    moduleNameMapper: {
        "shared-server/(.*)": "<rootDir>/../shared-server/$1"
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
