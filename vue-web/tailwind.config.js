module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{ts,vue}",
        "../shared-web/**/*.{ts,vue}",
    ],
    plugins: [
        ({addUtilities}) => {
            addUtilities({
                ".___": {
                    // Empty CSS class to help visually separate media queries
                }
            });
        }
    ]
}
