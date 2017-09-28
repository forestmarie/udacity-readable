import { fetchErrored, fetchLoading } from "../features/common/CommonActions";
import toastr from "toastr";

export const baseFetchHeaders = {
    Accept: "application/json",
    Authorization: "foobar",
    "Content-Type": "application/json"
};

export const BaseApiUrl = "http://localhost:3001";

export class FetchService {
    get(action, url, entityType, successFunc, dispatch) {
        dispatch(fetchErrored(action, false));
        dispatch(fetchLoading(action, true));

        (async () => {
            const response = await fetch(`${BaseApiUrl}${url}`, {
                headers: baseFetchHeaders
            });

            if (!response.ok) {
                dispatch(fetchErrored(action));
            } else {
                dispatch(fetchLoading(action, false));
                const items = await response.json();
                dispatch(successFunc(items));
            }
        })();
    }

    delete(action, url, entityType, successFunc, dispatch) {
        dispatch(fetchErrored(action, false));
        dispatch(fetchLoading(action, true));

        (async () => {
            const response = await fetch(`${BaseApiUrl}${url}`, {
                headers: baseFetchHeaders,
                method: "DELETE"
            });

            if (!response.ok) {
                dispatch(fetchErrored(action));
            } else {
                toastr.info(`The ${entityType} was successfully deleted.`);
                dispatch(fetchLoading(action, false));
                dispatch(successFunc);
            }
        })();
    }

    post(action, url, entityType, body, dispatch, successFunc) {
        dispatch(fetchErrored(action, false));
        dispatch(fetchLoading(action, true));

        (async () => {
            const response = await fetch(`${BaseApiUrl}${url}`, {
                headers: baseFetchHeaders,
                method: "POST",
                body: body
            });

            if (!response.ok) {
                dispatch(fetchErrored(action));
            } else {
                toastr.info(`${action} was successfully completed.`);
                dispatch(fetchLoading(action, false));
                if (successFunc) {
                    dispatch(successFunc);
                }
            }
        })();
    }
}

export const fetchService = new FetchService();
