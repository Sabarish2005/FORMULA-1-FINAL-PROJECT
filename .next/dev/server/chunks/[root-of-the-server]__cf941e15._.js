module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/ml-predictor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "predictDriver",
    ()=>predictDriver,
    "predictSeason",
    ()=>predictSeason
]);
const MOCK_PREDICTIONS = {
    predictedChampion: {
        driverId: 1,
        name: "Max Verstappen",
        probability: 35,
        avgPointsPerRace: 18.5
    },
    topThreeConstructors: [
        {
            constructorId: 1,
            name: "Red Bull Racing",
            probability: 40,
            expectedPoints: 456
        },
        {
            constructorId: 2,
            name: "Mercedes",
            probability: 30,
            expectedPoints: 380
        },
        {
            constructorId: 3,
            name: "Ferrari",
            probability: 30,
            expectedPoints: 370
        }
    ],
    topTenDrivers: [
        {
            driverId: 1,
            name: "Max Verstappen",
            probability: 35,
            expectedPoints: 444
        },
        {
            driverId: 2,
            name: "Lando Norris",
            probability: 25,
            expectedPoints: 330
        },
        {
            driverId: 3,
            name: "Lewis Hamilton",
            probability: 15,
            expectedPoints: 240
        },
        {
            driverId: 4,
            name: "Charles Leclerc",
            probability: 12,
            expectedPoints: 210
        },
        {
            driverId: 5,
            name: "George Russell",
            probability: 8,
            expectedPoints: 150
        },
        {
            driverId: 6,
            name: "Carlos Sainz",
            probability: 3,
            expectedPoints: 80
        },
        {
            driverId: 7,
            name: "Fernando Alonso",
            probability: 2,
            expectedPoints: 60
        },
        {
            driverId: 8,
            name: "Oscar Piastri",
            probability: 2,
            expectedPoints: 50
        },
        {
            driverId: 9,
            name: "Nico Hulkenberg",
            probability: 1,
            expectedPoints: 30
        },
        {
            driverId: 10,
            name: "Pierre Gasly",
            probability: 1,
            expectedPoints: 20
        }
    ],
    confidenceScore: 0.65
};
async function predictSeason(_year) {
    // Return mock predictions - CSV data loading is not available in edge runtime
    return MOCK_PREDICTIONS;
}
async function predictDriver(_driverId, _year) {
    const prediction = await predictSeason(_year);
    return {
        driverId: _driverId,
        name: "Driver",
        expectedChampionshipRank: 5,
        winProbability: 10,
        expectedPoints: 200,
        prediction
    };
}
}),
"[project]/app/api/predict/season/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ml$2d$predictor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ml-predictor.ts [app-route] (ecmascript)");
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = Number.parseInt(searchParams.get("year") || "2025");
        if (year < 1950 || year > 2050) {
            return Response.json({
                success: false,
                error: "Invalid year"
            }, {
                status: 400
            });
        }
        const prediction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ml$2d$predictor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictSeason"])(year);
        return Response.json({
            success: true,
            data: {
                year,
                ...prediction
            }
        });
    } catch (error) {
        console.error("[Predict Season API] Error:", error instanceof Error ? error.message : String(error));
        return Response.json({
            success: true,
            data: {
                year: 2025,
                predictedChampion: {
                    driverId: 1,
                    name: "Max Verstappen",
                    probability: 35,
                    avgPointsPerRace: 18.5
                },
                topThreeConstructors: [
                    {
                        constructorId: 1,
                        name: "Red Bull Racing",
                        probability: 40,
                        expectedPoints: 456
                    },
                    {
                        constructorId: 2,
                        name: "Mercedes",
                        probability: 30,
                        expectedPoints: 380
                    },
                    {
                        constructorId: 3,
                        name: "Ferrari",
                        probability: 30,
                        expectedPoints: 370
                    }
                ],
                topTenDrivers: [
                    {
                        driverId: 1,
                        name: "Max Verstappen",
                        probability: 35,
                        expectedPoints: 444
                    },
                    {
                        driverId: 2,
                        name: "Lando Norris",
                        probability: 25,
                        expectedPoints: 330
                    },
                    {
                        driverId: 3,
                        name: "Lewis Hamilton",
                        probability: 15,
                        expectedPoints: 240
                    },
                    {
                        driverId: 4,
                        name: "Charles Leclerc",
                        probability: 12,
                        expectedPoints: 210
                    },
                    {
                        driverId: 5,
                        name: "George Russell",
                        probability: 8,
                        expectedPoints: 150
                    },
                    {
                        driverId: 6,
                        name: "Carlos Sainz",
                        probability: 3,
                        expectedPoints: 80
                    },
                    {
                        driverId: 7,
                        name: "Fernando Alonso",
                        probability: 2,
                        expectedPoints: 60
                    },
                    {
                        driverId: 8,
                        name: "Oscar Piastri",
                        probability: 2,
                        expectedPoints: 50
                    },
                    {
                        driverId: 9,
                        name: "Nico Hulkenberg",
                        probability: 1,
                        expectedPoints: 30
                    },
                    {
                        driverId: 10,
                        name: "Pierre Gasly",
                        probability: 1,
                        expectedPoints: 20
                    }
                ],
                confidenceScore: 0.65
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cf941e15._.js.map