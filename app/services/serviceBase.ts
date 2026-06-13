export const get = async <T>(url:string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return (await response.json()) as Promise<T>;
};