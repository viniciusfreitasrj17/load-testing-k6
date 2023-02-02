// import 'dotenv/config'
import http from 'k6/http';
import { Trend, Rate } from "k6/metrics";
import { check, fail, sleep } from "k6";
import env from "./.env.js"

export let GetDuration = new Trend('__get_duration');
export let GetFailRate = new Rate('__get_fail_rate');
export let GetSuccessRate = new Rate('__get_success_rate');
export let GetReqs = new Rate('__get_reqs');

const url = env.url

export default function () {
  const res = http.get(url, {headers: {Accepts: "application/json"}});
  
  GetDuration.add(res.timings.duration);
  GetReqs.add(1);
  GetFailRate.add(res.status == 0 || res.status > 399);
  GetSuccessRate.add(res.status < 399);

  check(res, { 'max duration': (r) => r.timings.duration < 1000 }) // by duration
  // check(response, { "status is 200": (r) => r.status === 200 }); // by status

  // Can Generate error 
  // let durationMsg = 'Max Duration ${1000/1000}s'
  // if(!check(res, {
  //   'max duration': (r) => r.timings.duration < 1000,
  // })){
  //   fail(durationMsg);
  // }
  
  sleep(1);
}
