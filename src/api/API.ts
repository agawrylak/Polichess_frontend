import axios from "axios";
const aiModuleURL = "https://quiet-gorge-99239.herokuapp.com/";
const backendURL = "https://glacial-cliffs-16329.herokuapp.com/";
// TODO: GET RID OF THIS AFTER WE MAKE SURE APP IS WORKING CORRECTLY
//const backendURL = "http://localhost:8081/";

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

  static getGameHistory(token: string) {
    console.log(token);
    return axios.get(backendURL + "games/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static getUserGames(token: string) {
    return axios.get(backendURL + "games/usergames", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  static saveGameHistory(token: string, history: any[], winner: string) {
    return axios.post(
      backendURL + "games/add",
      { moves: history, winner },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  static getGameHistoryById(token: string, id: string) {
    return axios.get(backendURL + "games/id/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
