export type APISuccessResponse<T> = {
    status: "success"
    data: T
}

export type APIErrorResponse = {
    status: "error"
    message: string
}