import nc from "next-connect";
import { prisma } from "@/services/prisma";
import withUploader from "@/middlewares/uploader";

const getBooks = async (req, res) => {
  const books = await prisma.book.findMany();
  res.json({ books });
};

const uploadBook = async (req, res) => {
  const { title, author, publisher, year, pages } = req.body;
  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year: parseInt(year),
        pages: parseInt(pages),
        image: req.file.path.split("public")[1], // add the path to the uploaded image to the book data
      },
    });
    res.json({ book });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ message: "Book already exists" });
  }
};

const handler = nc().use(withUploader("image")).get(getBooks).post(uploadBook);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
