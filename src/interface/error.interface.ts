

export type TErrourSources = {
    path: string | number,
    message: string
}[]

export type TGenericResponse = {
    statusCode:number,
    message:string,
    errorSources:TErrourSources
}