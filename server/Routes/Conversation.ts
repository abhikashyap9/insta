import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
export const conversationRouter = express.Router({
	strict: true,
})
import userAuthentication from '../middeware/jwtauthorization'
import Conversation from '../Schemas/ConversationSchema'

export interface RequestAuthType extends Request {
	auth?: { userId?: string }
}

conversationRouter.post('/createConversation/:id',userAuthentication,async(req:RequestAuthType,res:Response)=>{
    const { id } = req.params
	let senderId = req['auth']?.userId
    let conversation = new Conversation({
        sender:senderId,
        reciever:id
    })

    try{
       let savedConversation = await conversation.save()
       res.status(201).json(savedConversation)
    } 
    catch(err){
       console.log(err)
       res.status(400).json({error:err})
    } 
})



export default conversationRouter;