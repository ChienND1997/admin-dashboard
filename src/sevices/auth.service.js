import axios from "../common/api/axios";
import response from "../common/api/response";
import { HTTP_STATUS } from "../common/api/response";
export class AuthService {
    /**
     ******************************
     * @API
     ******************************
     */

    static async makeLogin({ username, password }) {
        try {
            const requestBody = { username: username, password: password }
            const res = await axios.post(`/temproject/authenticate`, requestBody);
            return response.create(res, HTTP_STATUS.OK);
        } catch (error) {
            throw new error;
        }
    }
}
