// Fetch the streets and the river around the shop from OpenStreetMap (Overpass API) into src/data/map-fier.json,
// for the drawn map in the Visit section. Map data © OpenStreetMap contributors, ODbL: the map credits it.
// Rerun only to refresh the streets:  node tools/fetch-map.mjs
import fs from 'node:fs';

const center = { lat: 40.7279538, lon: 19.5623415 }; // the shop, from its Google Maps listing
const dLat = 0.0036; // about 400 m north and south
const dLon = 0.0056; // about 470 m east and west
const box = [center.lat - dLat, center.lon - dLon, center.lat + dLat, center.lon + dLon];
const q = `[out:json][timeout:30];(way["highway"](${box.join(',')});way["waterway"](${box.join(',')});way["natural"="water"](${box.join(',')}););out geom;`;

// the main instance is often busy; public mirrors serve the same data
const endpoints = ['https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://maps.mail.ru/osm/tools/overpass/api/interpreter'];
let json;
for (const url of endpoints) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'barber-bros-site-map/1.0 (build tool)' },
      body: 'data=' + encodeURIComponent(q),
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    json = await res.json();
    console.log('from', url);
    break;
  } catch (e) {
    console.log(`${url}: ${e.message}${e.cause ? ` (${e.cause.code || e.cause.message})` : ''}`);
  }
}
if (!json) throw new Error('no Overpass endpoint answered');

const ways = json.elements
  .filter((e) => e.type === 'way' && e.geometry?.length > 1)
  .map((e) => ({
    kind: e.tags.highway ? 'road' : 'water',
    type: e.tags.highway || e.tags.waterway || e.tags.natural,
    name: e.tags.name || '',
    area: e.tags.natural === 'water' || e.tags.waterway === 'riverbank',
    pts: e.geometry.map((g) => [+g.lon.toFixed(6), +g.lat.toFixed(6)]),
  }));

const out = {
  source: 'Map data © OpenStreetMap contributors, ODbL (openstreetmap.org/copyright), via the Overpass API',
  fetched: new Date().toISOString().slice(0, 10),
  center: [center.lon, center.lat],
  box: { west: box[1], south: box[0], east: box[3], north: box[2] },
  ways,
};
fs.writeFileSync('src/data/map-fier.json', JSON.stringify(out));
const named = [...new Set(ways.filter((w) => w.name).map((w) => w.name))];
console.log(`${ways.length} ways (${ways.filter((w) => w.kind === 'road').length} roads), ${fs.statSync('src/data/map-fier.json').size} bytes`);
console.log('named:', named.join(' | '));
