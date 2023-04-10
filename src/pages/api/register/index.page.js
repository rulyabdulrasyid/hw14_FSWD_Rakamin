import bcrypt from "bcrypt";
import { prisma } from "@/services/prisma";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
};

export default register;
