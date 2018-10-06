import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 300,
  rps: 3000,
  duration: "60s"
};

export default function() {
  let id = Math.floor (Math.random () * 1000000) + 9000000;
  let res = http.get("http://localhost:3000/relatedArtists/artist/" + id);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 500
  });
};