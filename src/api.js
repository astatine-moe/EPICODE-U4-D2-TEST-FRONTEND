export const baseUri = `http://127.0.0.1:1000`;

export const doFetch = (url, opts, returnJson = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, opts);
            if (response.ok) {
                let data;
                if (returnJson) {
                    data = await response.json();
                } else {
                    data = "Valid";
                }
                resolve({
                    status: "ok",
                    data,
                });
            } else {
                let data;
                if (returnJson) {
                    data = await response.json();
                } else {
                    data = "Invalid";
                }
                resolve({
                    status: "error",
                    data,
                });
            }
        } catch (e) {
            resolve({
                status: "error",
                data: e,
            });
        }
    });
};
