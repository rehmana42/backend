import express from 'express'
import { AuthUser } from '../middlewere/Auth.js'
import { accept, Delete, deleteRequest, getNotification, sendRequest, userbloodRequest } from '../controller/bllodRequest.js'

export const bloodR=express.Router()

//all routes
bloodR.post('/sendrequest',AuthUser,sendRequest)
bloodR.get('/getnotification',AuthUser,getNotification)
bloodR.post('/accept',AuthUser,accept)
bloodR.get('/allrequest',AuthUser,userbloodRequest)
bloodR.post('/delete',AuthUser,deleteRequest)
bloodR.post('/deleteNotification',AuthUser,Delete)

