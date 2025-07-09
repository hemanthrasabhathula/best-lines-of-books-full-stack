import express from "express";
import { generateBookData } from "./groq.controller";

const groqRouter = express.Router();

groqRouter.post("/generate-book-data", generateBookData);

export default groqRouter;
