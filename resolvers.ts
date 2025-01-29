

export const resolvers = {

    getTest:async(_:unknown,__:unknown,___:unknown):Promise<string> => {
        const miVar:string = "Hello world"
        return miVar;
    }
}


