import request from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import type {UserType} from '../types/userType'
import initMongodb from '../utils/initMongodb'

