

export const resolvers = {

    getTest:async():Promise<string> => {
        const miVar:string = "Hello world"
        return miVar;
    }
}


