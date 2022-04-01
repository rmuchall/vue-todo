import {AfterResponseHook, UnifiedFetch} from "unified-fetch";
import {decideApiUrl} from "./decide-api-url";

const afterResponseHook: AfterResponseHook = async (response, requestInfo, requestInit) => {
    if (!response.ok) {
        const result = await response.json();
        if (result) {
            throw new Error(result.message);
        } else {
            throw new Error("Unknown fetch error");
        }
    }

    return response;
};

export const webFetchWithHooks = new UnifiedFetch({
    prefixUrl: decideApiUrl(),
    afterResponseHook: afterResponseHook
});
