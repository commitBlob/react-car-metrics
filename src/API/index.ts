import axios from 'axios';

export default class RestAPI {
  private static endPoint = 'https://vehicle-api-test.herokuapp.com/api';

  public static async getCarsList() {
    return axios.get(`${this.endPoint}/vehicles`);
  }

  public static async getCarDetails(carId: string) {
    return axios.get(`${this.endPoint}/vehicles/${carId}`);
  }

  public static async getCarTelemetry(carId: string) {
    return axios.get(`${this.endPoint}/vehicles/${carId}/telemetry`);
  }
}
