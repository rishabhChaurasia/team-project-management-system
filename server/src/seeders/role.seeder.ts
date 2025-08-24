import "dotenv/config";
import { config } from "../config/app.config";
import mongoDB from "../config/database.config";
import mongoose from "mongoose";
import RoleModel from "../models/roles-permissions.model";
import { RolePermissions } from "../utils/role-permissions";

const seedRoles = async () => {
  console.log("Seeding roles started...");
  try {
    await mongoDB(config.MONGO_URI as string);

    const session = await mongoose.startSession();
    session.startTransaction();

    console.log("Clearing existing roles...");
    await RoleModel.deleteMany({}, { session });

    for (const roleName in RolePermissions) {
      const role = roleName as keyof typeof RolePermissions;
      const permissions = RolePermissions[role];

      const existingRole = await RoleModel.findOne({ name: role }).session(
        session
      );

      if (!existingRole) {
        const newRole = new RoleModel({
          name: role,
          permissions: permissions,
        });
        await newRole.save({ session });
        console.log(`Role ${role} added with permissions.`);
      } else {
        console.log(`Role ${role} already exists`);
      }
    }

    await session.commitTransaction();
    console.log("Transaction committed");

    session.endSession();
    console.log("Session ended");

    console.log("Seeding completed successfuly!");
  } catch (error) {
    console.log("Error during seeding:", error);
  }
};

seedRoles().catch((error) =>
  console.log(`Error running seed script: ${error}`)
);
