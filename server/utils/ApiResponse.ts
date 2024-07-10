class ApiResponse {
    message: string | undefined
    data: any
    statusCode: number | undefined
    constuctor(statusCode:number,data:any,message="Success"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
    }
}