/** @type {import("next").NextConfig} */
module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },
    // async headers() {
    //     return [
    //         {
    //             source: '/api/:path*', // Ваши API маршруты
    //             headers: [
    //                 {
    //                     key: 'Access-Control-Allow-Origin',
    //                     value: 'http://91.107.124.229:3000/', // Замените на URL вашего приложения
    //                 },
    //                 {
    //                     key: 'Access-Control-Allow-Methods',
    //                     value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    //                 },
    //                 {
    //                     key: 'Access-Control-Allow-Headers',
    //                     value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    //                 },
    //             ],
    //         },
    //     ]
    // },
    // async rewrites() {
    //     return [
    //         {
    //             source: "/api/:path*",
    //             destination: "http://127.0.0.1:8000/api/:path*"
    //         }
    //     ];
    // }
    async rewrites() {
        // В зависимости от окружения добавляем реврайт или нет
        if (process.env.NODE_ENV !== 'production') {
            return [
                {
                    source: "/api/:path*",
                    destination: process.env.NEXT_PUBLIC_API_URL + "/api/:path*", // используем переменную окружения
                }
            ];
        }

        // Для продакшн окружения возвращаем пустой массив реврайтов
        return [];
    },
};
