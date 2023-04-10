import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

function InfoCard(props) {
  const { id, title, author, publisher, image } = props;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt={title}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>
          <Text py="2">{author}</Text>
          <Text py="2">{publisher}</Text>
        </CardBody>
        <CardFooter>
          <Link href={`/books/${id}`}>
            <Button variant="solid" colorScheme="blue" cursor="pointer">
              See More
            </Button>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default InfoCard;
