/**
 * Class for HTTP requests
 */
export class HTTP {
    /**
     * Get HTTP request as promise
     * @param url Request URL
     * @param urlParams aditional parameters into URL
     * @returns HTTP request promise resolving when returned status code is 200, failing otherwise
     */
    get<T>(url: string, urlParams?: Record<string, string>): Promise<T> {
        // ULR with aditional params
        const urlWithParams =
            url +
            (urlParams
                ? "?" +
                  Object.entries(urlParams)
                      .map(([key, value]) => `${key}=${value}`)
                      .join("&")
                : "");

        // return actual request as promise
        return new Promise<T>((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function () {
                reject(new Error("XMLHttpRequest Error: " + this.statusText));
            };
            request.open("GET", urlWithParams);
            request.send();
        });
    }
}
