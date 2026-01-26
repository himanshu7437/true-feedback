import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { success, z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

