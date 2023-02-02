import duration from "./duration.js";
import status from "./status.js"
import { group , sleep } from 'k6';


export default () => {
  group('Endpoint Duration - Controller - Load Testing Api', () => {
    duration();
  });

  group('Endpoint Status - Controller - Load Testing Api', () => {
    status()
  })

  sleep(1);
}
