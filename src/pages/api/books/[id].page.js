import { prisma } from "@/services/prisma";
import nc from "next-connect";
import supabaseUploader from "@/middlewares/supabaseFormUploader";
const getBooksById = async (req, res) => {
  try {
    const { id } = req.query;
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    res.json({ book });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, author, publisher, year, pages } = req.body;
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        publisher,
        year,
        pages,
      },
    });
    res.json({ book });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const { id } = req.query;
    const book = await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.json({ book });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const handler = nc().get(getBooksById).put(updateBook).delete(deleteBookById);
export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
