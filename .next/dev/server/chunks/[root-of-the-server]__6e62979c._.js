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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/f1-data-loader.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllTimeRecords",
    ()=>getAllTimeRecords,
    "getConstructorCareerStats",
    ()=>getConstructorCareerStats,
    "getConstructorStandings",
    ()=>getConstructorStandings,
    "getDriverCareerStats",
    ()=>getDriverCareerStats,
    "getDriverStandings",
    ()=>getDriverStandings,
    "getSeasonRaces",
    ()=>getSeasonRaces,
    "loadF1Data",
    ()=>loadF1Data
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$csv$2d$parse$40$6$2e$1$2e$0$2f$node_modules$2f$csv$2d$parse$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/csv-parse@6.1.0/node_modules/csv-parse/lib/sync.js [app-route] (ecmascript) <locals>");
;
;
;
// Singleton cache
let cachedData = null;
function parseCsvFile(fileName) {
    try {
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "data", fileName);
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) {
            console.warn(`[F1 Data] CSV file not found: ${fileName}`);
            return [];
        }
        const fileContent = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf-8");
        const records = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$csv$2d$parse$40$6$2e$1$2e$0$2f$node_modules$2f$csv$2d$parse$2f$lib$2f$sync$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"])(fileContent, {
            columns: true,
            skip_empty_lines: true,
            cast: (value, context)=>{
                // Auto-convert numeric fields
                if (context.header) return value;
                if (value === "" || value === null) return null;
                if (!isNaN(Number(value)) && value !== "") return Number(value);
                return value;
            }
        });
        return records;
    } catch (error) {
        console.error(`[F1 Data] Error parsing ${fileName}:`, error);
        return [];
    }
}
function generateMockData() {
    const mockDrivers = new Map([
        [
            1,
            {
                driverId: 1,
                driverRef: "hamilton",
                forename: "Lewis",
                surname: "Hamilton",
                nationality: "British"
            }
        ],
        [
            2,
            {
                driverId: 2,
                driverRef: "verstappen",
                forename: "Max",
                surname: "Verstappen",
                nationality: "Dutch"
            }
        ],
        [
            3,
            {
                driverId: 3,
                driverRef: "alonso",
                forename: "Fernando",
                surname: "Alonso",
                nationality: "Spanish"
            }
        ],
        [
            4,
            {
                driverId: 4,
                driverRef: "leclerc",
                forename: "Charles",
                surname: "Leclerc",
                nationality: "Monegasque"
            }
        ],
        [
            5,
            {
                driverId: 5,
                driverRef: "sainz",
                forename: "Carlos",
                surname: "Sainz",
                nationality: "Spanish"
            }
        ]
    ]);
    const mockConstructors = new Map([
        [
            1,
            {
                constructorId: 1,
                constructorRef: "mercedes",
                name: "Mercedes",
                nationality: "German"
            }
        ],
        [
            2,
            {
                constructorId: 2,
                constructorRef: "red_bull",
                name: "Red Bull Racing",
                nationality: "Austrian"
            }
        ],
        [
            3,
            {
                constructorId: 3,
                constructorRef: "ferrari",
                name: "Ferrari",
                nationality: "Italian"
            }
        ],
        [
            4,
            {
                constructorId: 4,
                constructorRef: "mclaren",
                name: "McLaren",
                nationality: "British"
            }
        ]
    ]);
    const mockCircuits = new Map([
        [
            1,
            {
                circuitId: 1,
                circuitRef: "monza",
                name: "Monza",
                location: "Monza",
                country: "Italy"
            }
        ],
        [
            2,
            {
                circuitId: 2,
                circuitRef: "silverstone",
                name: "Silverstone",
                location: "Silverstone",
                country: "UK"
            }
        ]
    ]);
    const mockRaces = Array.from({
        length: 20
    }, (_, i)=>({
            raceId: i + 1,
            year: 2024,
            round: i + 1,
            circuitId: i % 2 + 1,
            name: `Grand Prix ${i + 1}`,
            date: "2024-01-01"
        }));
    const mockResults = [];
    const mockSeasons = Array.from({
        length: 75
    }, (_, i)=>({
            year: 1950 + i
        }));
    return {
        drivers: mockDrivers,
        constructors: mockConstructors,
        races: mockRaces,
        results: mockResults,
        circuits: mockCircuits,
        seasons: mockSeasons,
        qualifying: []
    };
}
async function loadF1Data() {
    // Return cached data if available
    if (cachedData) {
        return cachedData;
    }
    try {
        // Load all CSV files
        const drivers = parseCsvFile("drivers.csv");
        const constructors = parseCsvFile("constructors.csv");
        const races = parseCsvFile("races.csv");
        const results = parseCsvFile("results.csv");
        const circuits = parseCsvFile("circuits.csv");
        const seasons = parseCsvFile("seasons.csv");
        const qualifying = parseCsvFile("qualifying.csv");
        // Check if we got any real data
        const hasRealData = drivers.length > 0 || races.length > 0 || results.length > 0;
        if (!hasRealData) {
            console.warn("[F1 Data] No CSV files found, using mock data");
            cachedData = generateMockData();
            return cachedData;
        }
        // Create maps for O(1) lookups
        const driverMap = new Map(drivers.map((d)=>[
                d.driverId,
                d
            ]));
        const constructorMap = new Map(constructors.map((c)=>[
                c.constructorId,
                c
            ]));
        const circuitMap = new Map(circuits.map((c)=>[
                c.circuitId,
                c
            ]));
        cachedData = {
            drivers: driverMap,
            constructors: constructorMap,
            races,
            results,
            circuits: circuitMap,
            seasons,
            qualifying
        };
        return cachedData;
    } catch (error) {
        console.error("[F1 Data] Error loading data, using mock data:", error);
        cachedData = generateMockData();
        return cachedData;
    }
}
async function getSeasonRaces(year) {
    const data = await loadF1Data();
    return data.races.filter((r)=>r.year === year).sort((a, b)=>a.round - b.round);
}
async function getDriverStandings(year) {
    const data = await loadF1Data();
    const races = await getSeasonRaces(year);
    if (races.length === 0) {
        return [];
    }
    const raceIds = new Set(races.map((r)=>r.raceId));
    const seasonResults = data.results.filter((r)=>raceIds.has(r.raceId));
    const standings = {};
    seasonResults.forEach((result)=>{
        if (!standings[result.driverId]) {
            standings[result.driverId] = {
                driverId: result.driverId,
                points: 0,
                wins: 0,
                poles: 0
            };
        }
        standings[result.driverId].points += result.points;
        if (result.positionOrder === 1) standings[result.driverId].wins++;
    });
    const quali = data.qualifying.filter((q)=>raceIds.has(q.raceId));
    quali.forEach((q)=>{
        if (q.position === 1 && standings[q.driverId]) {
            standings[q.driverId].poles++;
        }
    });
    return Object.values(standings).sort((a, b)=>b.points - a.points).map((standing)=>({
            ...standing,
            driver: data.drivers.get(standing.driverId)
        }));
}
async function getConstructorStandings(year) {
    const data = await loadF1Data();
    const races = await getSeasonRaces(year);
    if (races.length === 0) {
        return [];
    }
    const raceIds = new Set(races.map((r)=>r.raceId));
    const seasonResults = data.results.filter((r)=>raceIds.has(r.raceId));
    const standings = {};
    seasonResults.forEach((result)=>{
        if (!standings[result.constructorId]) {
            standings[result.constructorId] = {
                constructorId: result.constructorId,
                points: 0,
                wins: 0
            };
        }
        standings[result.constructorId].points += result.points;
        if (result.positionOrder === 1) standings[result.constructorId].wins++;
    });
    return Object.values(standings).sort((a, b)=>b.points - a.points).map((standing)=>({
            ...standing,
            constructor: data.constructors.get(standing.constructorId)
        }));
}
async function getDriverCareerStats(driverId) {
    const data = await loadF1Data();
    const driverResults = data.results.filter((r)=>r.driverId === driverId);
    const stats = {
        wins: driverResults.filter((r)=>r.positionOrder === 1).length,
        podiums: driverResults.filter((r)=>r.positionOrder <= 3).length,
        points: driverResults.reduce((sum, r)=>sum + r.points, 0),
        races: driverResults.length,
        dnfs: driverResults.filter((r)=>!r.position || r.position === null).length
    };
    return stats;
}
async function getConstructorCareerStats(constructorId) {
    const data = await loadF1Data();
    const constructorResults = data.results.filter((r)=>r.constructorId === constructorId);
    const stats = {
        wins: constructorResults.filter((r)=>r.positionOrder === 1).length,
        championships: 0,
        points: constructorResults.reduce((sum, r)=>sum + r.points, 0),
        races: constructorResults.length
    };
    return stats;
}
async function getAllTimeRecords() {
    const data = await loadF1Data();
    // Most wins by driver
    const driverWins = new Map();
    data.results.forEach((r)=>{
        if (r.positionOrder === 1) {
            driverWins.set(r.driverId, (driverWins.get(r.driverId) || 0) + 1);
        }
    });
    // Most wins by constructor
    const constructorWins = new Map();
    data.results.forEach((r)=>{
        if (r.positionOrder === 1) {
            constructorWins.set(r.constructorId, (constructorWins.get(r.constructorId) || 0) + 1);
        }
    });
    // Most poles by driver
    const driverPoles = new Map();
    data.qualifying.forEach((q)=>{
        if (q.position === 1) {
            driverPoles.set(q.driverId, (driverPoles.get(q.driverId) || 0) + 1);
        }
    });
    return {
        driverWins: Array.from(driverWins.entries()).map(([driverId, wins])=>({
                driverId,
                wins,
                driver: data.drivers.get(driverId)
            })).sort((a, b)=>b.wins - a.wins).slice(0, 20),
        constructorWins: Array.from(constructorWins.entries()).map(([constructorId, wins])=>({
                constructorId,
                wins,
                constructor: data.constructors.get(constructorId)
            })).sort((a, b)=>b.wins - a.wins).slice(0, 15),
        driverPoles: Array.from(driverPoles.entries()).map(([driverId, poles])=>({
                driverId,
                poles,
                driver: data.drivers.get(driverId)
            })).sort((a, b)=>b.poles - a.poles).slice(0, 20)
    };
}
}),
"[project]/app/api/season/[year]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$f1$2d$data$2d$loader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/f1-data-loader.ts [app-route] (ecmascript)");
;
async function GET(request, { params }) {
    try {
        const { year } = await params;
        const yearNum = Number.parseInt(year);
        let races = [];
        let driverStandings = [];
        let constructorStandings = [];
        try {
            races = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$f1$2d$data$2d$loader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSeasonRaces"])(yearNum);
            driverStandings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$f1$2d$data$2d$loader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDriverStandings"])(yearNum);
            constructorStandings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$f1$2d$data$2d$loader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConstructorStandings"])(yearNum);
        } catch (error) {
            console.error(`[API] Error loading data for ${yearNum}, using mock data`);
        }
        // Generate mock data if real data is empty
        if (races.length === 0) {
            const numRaces = yearNum < 1960 ? 8 : yearNum < 1980 ? 15 : yearNum < 2000 ? 16 : yearNum < 2010 ? 17 : 21;
            races = Array.from({
                length: numRaces
            }, (_, i)=>({
                    raceId: `${yearNum}_${i + 1}`,
                    round: i + 1,
                    name: [
                        "Australian Grand Prix",
                        "Bahrain Grand Prix",
                        "Chinese Grand Prix",
                        "Azerbaijan Grand Prix",
                        "Miami Grand Prix",
                        "Monaco Grand Prix",
                        "Spanish Grand Prix",
                        "Canadian Grand Prix",
                        "Austrian Grand Prix",
                        "British Grand Prix",
                        "Hungarian Grand Prix",
                        "Belgian Grand Prix",
                        "Dutch Grand Prix",
                        "Italian Grand Prix",
                        "Singapore Grand Prix",
                        "Japanese Grand Prix",
                        "Qatar Grand Prix",
                        "United States Grand Prix",
                        "Mexico City Grand Prix",
                        "Brazilian Grand Prix",
                        "Abu Dhabi Grand Prix"
                    ][i] || `Grand Prix ${i + 1}`,
                    date: `${yearNum}-${String(i + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
                    circuitId: `circuit_${i + 1}`
                }));
        }
        if (driverStandings.length === 0) {
            const drivers = [
                "Max Verstappen",
                "Lewis Hamilton",
                "Charles Leclerc",
                "Sergio Perez",
                "Carlos Sainz",
                "Lando Norris",
                "George Russell",
                "Fernando Alonso",
                "Oscar Piastri",
                "Lance Stroll",
                "Pierre Gasly",
                "Esteban Ocon",
                "Alexander Albon",
                "Yuki Tsunoda",
                "Daniel Ricciardo",
                "Nico Hulkenberg",
                "Kevin Magnussen",
                "Valtteri Bottas",
                "Zhou Guanyu",
                "Logan Sargeant"
            ];
            driverStandings = drivers.map((name, idx)=>{
                const basePoints = 400 - idx * 25;
                const wins = idx === 0 ? 12 : idx < 3 ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2);
                const poles = idx === 0 ? 8 : idx < 3 ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 2);
                return {
                    position: idx + 1,
                    driverId: name.toLowerCase().replace(/ /g, "_"),
                    name,
                    points: Math.max(basePoints, 0),
                    wins,
                    poles
                };
            });
        } else {
            driverStandings = driverStandings.map((s, idx)=>({
                    position: idx + 1,
                    driverId: s.driverId,
                    name: s.driver ? `${s.driver.forename} ${s.driver.surname}` : "Unknown",
                    points: s.points,
                    wins: s.wins || 0,
                    poles: s.poles || 0
                }));
        }
        if (constructorStandings.length === 0) {
            const teams = [
                "Red Bull Racing",
                "Mercedes",
                "Ferrari",
                "McLaren",
                "Aston Martin",
                "Alpine",
                "Williams",
                "AlphaTauri",
                "Alfa Romeo",
                "Haas F1 Team"
            ];
            constructorStandings = teams.map((name, idx)=>({
                    position: idx + 1,
                    constructorId: name.toLowerCase().replace(/ /g, "_"),
                    name,
                    points: Math.max(600 - idx * 60, 0),
                    wins: idx === 0 ? 15 : idx < 3 ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 2)
                }));
        } else {
            constructorStandings = constructorStandings.map((s, idx)=>({
                    position: idx + 1,
                    constructorId: s.constructorId,
                    name: s.constructor?.name || "Unknown",
                    points: s.points,
                    wins: s.wins || 0
                }));
        }
        return Response.json({
            success: true,
            data: {
                year: yearNum,
                races: races.map((r)=>({
                        raceId: r.raceId,
                        round: r.round,
                        name: r.name,
                        date: r.date,
                        circuit: r.circuitId
                    })),
                driverStandings,
                constructorStandings,
                totalRaces: races.length
            }
        });
    } catch (error) {
        console.error("[API] Error fetching season data:", error);
        return Response.json({
            success: false,
            error: "Failed to fetch season data"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6e62979c._.js.map