import axios from "axios";
const aiModuleURL = "https://quiet-gorge-99239.herokuapp.com/";
const backendURL = "https://glacial-cliffs-16329.herokuapp.com/";
const authURL = backendURL + "api/auth/";
export class API {
  static login(username: string, password: string) {
    const body = {
      username: username,
      password: password,
    };
    return axios.post(authURL + "signin", body);
  }

  static register(username: string, password: string, email: string) {
    const body = {
      username: username,
      password: password,
      email: email,
    };
    return axios.post(authURL + "signup", body);
  }

  static aiMove(fen: string, difficulty: string) {
    const body = {
      fen: fen,
      difficulty: difficulty,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(aiModuleURL + "calculate_move", body);
  }
}
