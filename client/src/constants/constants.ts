import type { Book } from "@/types/types";

export const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3000";

export const ALL_BOOKS_KEY = "all_books";

export const colors: string[] = [
  "#FFDFD6",
  // "#FFFBF5",
  "#FEFAF6",
  "#FFF8E3",
  "#F9DBBA",
  "#F7EFE5",
  // "#F5EEE6",
  "#F3D7CA",
  "#F5EEE6",
  "#EADBC8",
  // "#E7E8D8",
  "#E6A4B4",
  "#E3A5C7",
  "#E2BFD9",
  "#DAC0A3",
  "#D7D7D8",
  // "#D3B1AB",
  // "#C8A1E0",
  "#B692C2",
  "#BB9AB1",
  "#B5CFB7",
  "#BC9F8B",
  "#987D9A",
  "#8E7AB5",
  // "#74512D",
  // "#694F8E",
  // "#674188",
  // "#102C57",
  "#8E7AB5",
];

export const books: Book[] = [
  {
    _id: "66948289e9fb2891bb3164b1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    ISBN: "950-05-0703-8",
    genre: "Fiction, Fantasy, Mystery",
    published: 1988,
    pages: 209,
    image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
    description:
      "A young shepherd named Santiago, who has a recurring dream of finding treasure at the Pyram_ids in Egypt, begins a journey to fulfill his personal legend. Along the way, he encounters a mysterious fortune teller who tells him to follow his dream, and a crystal merchant who teaches him to listen to his heart. As he journeys to Egypt, Santiago faces numerous challenges, meets new people, and learns valuable life lessons about listening to the universe, trusting oneself, and believing in the power of dreams. The Alchemist is a thought-provoking and inspiring tale that explores the universal themes of spirituality, self-discovery, and following one's heart.",
  },
  {
    _id: "669483b6e9fb2891bb3164d0",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    ISBN: "978-2200123917",
    genre: "Children's Literature, Fantasy, Adventure",
    published: 1943,
    pages: 93,
    image: "https://images-na.ssl-images-amazon.com/images/I/71OZY035QKL.jpg",
    description:
      "The Little Prince tells the story of a young prince who travels to different planets, meeting strange characters along the way, in search of companionship and understanding. Along the way, he learns about the importance of human relationships and the value of taking the time to understand others. The story is a poignant exploration of childhood, friendship, and the human condition, as the little prince shares his experiences and reflections on the planet where he grew up with a pilot who crash-lands nearby. Through his conversations with the pilot, the little prince's stories paint a viv_id picture of a world and characters that are both familiar and strange.",
  },
  {
    _id: "6694842fe9fb2891bb3164ef",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    ISBN: "0385339476-5",
    genre: "Thriller, Mystery",
    published: 2003,
    pages: 591,
    image: "https://images-na.ssl-images-amazon.com/images/I/91InVm4TEgL.jpg",
    description:
      "In this gripping thriller, symbologist Robert Langdon uncovers a series of cryptic clues and puzzles that lead him to the Holy Grail. His search takes him from the Louvre to the streets of Paris, and from the secret societies of ancient Rome to the sacred rituals of the Illuminati. As he gets closer to the truth, Langdon must confront a conspiracy that goes back centuries and threatens to topple the very foundations of Christianity. With its intricate plot and rich historical details, The Da Vinci Code is a thrilling adventure that will keep you on the edge of your seat until the very end.",
  },
  {
    _id: "669484b0e9fb2891bb3164ff",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    ISBN: "978-0743273565",
    genre: "Fiction",
    published: 1925,
    pages: 178,
    image: "https://images-na.ssl-images-amazon.com/images/I/61dRoDRubtL.jpg",
    description:
      "Set in the 1920s in Long Island, New York, and New York City, The Great Gatsby is a novel that revolves around the mysterious millionaire Jay Gatsby and his obsession with winning back his lost love, Daisy Buchanan. Narrated by Nick Carraway, a young man from the M_idwest, the novel delves into the corrupting influence of wealth and the American Dream. Through Gatsby's grand parties and lavish spending, the novel explores themes of class, morality, and the decline of the American Dream. The novel is known for its viv_id portrayal of the Roaring Twenties and its commentary on the empty materialism of the wealthy elite.",
  },
  {
    _id: "669484fce9fb2891bb31650f",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    ISBN: "978-0316769488",
    genre: "Fiction",
    published: 1951,
    pages: 272,
    image: "https://images-na.ssl-images-amazon.com/images/I/71nXPGovoTL.jpg",
    description:
      "The Catcher in the Rye is a novel that tells the story of Holden Caulfield, a troubled teenager who struggles to find his place in the world. After being expelled from a prestigious boarding school, Holden embarks on a solitary journey through New York City, reflecting on his past, present, and future. As he navigates the complexities of adolescence, Holden confronts the phoniness of the adult world and grapples with his own feelings of alienation and disaffection. Through his journey, Salinger explores themes of _identity, belonging, and the human quest for authenticity, making this a timeless and relatable classic.",
  },
  {
    _id: "6694854de9fb2891bb31651f",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    ISBN: "978-0345534835",
    genre: "Fantasy, Adventure",
    published: 1937,
    pages: 310,
    image: "https://images-na.ssl-images-amazon.com/images/I/61Ng-W9EhBL.jpg",
    description:
      "In this fantasy novel, Bilbo Baggins, a comfort-loving hobbit, is recruited by the wizard Gandalf and a group of dwarves to help them reclaim their treasure from the dragon Smaug. The group embarks on a perilous journey, encountering trolls, goblins, and other obstacles along the way. As they near their goal, they must use all their wits and courage to survive. This classic tale of adventure and friendship sets the stage for Tolkien's The Lord of the Rings trilogy.",
  },
  {
    _id: "66948596e9fb2891bb31652f",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    ISBN: "978-0439023481",
    genre: "Science Fiction, Fantasy",
    published: 2008,
    pages: 374,
    image: "https://images-na.ssl-images-amazon.com/images/I/81gExM+-XtL.jpg",
    description:
      "In a dystopian future, the oppressed districts of Panem are forced to participate in a brutal annual event called the Hunger Games, where 24 tributes must fight to the death in a televised event. 16-year-old Katniss Everdeen, a skilled hunter from District 12, volunteers to participate in place of her younger sister Prim. Together with fellow tribute Peeta Mellark, Katniss must use her wits, agility, and archery skills to survive the treacherous arena and the manipulations of the Capitol.",
  },
  {
    _id: "669485dde9fb2891bb31653f",
    title: "The Road",
    author: "Cormac McCarthy",
    ISBN: "978-0307387899",
    genre: "Fiction",
    published: 2006,
    pages: 246,
    image: "https://images-na.ssl-images-amazon.com/images/I/81GAb1QJQQL.jpg",
    description:
      "In a world gone mad, a father and son journey through the desolate landscape, searching for hope and safety. The Road is a haunting and powerful novel about the human condition, exploring themes of survival, humanity, and the indelible bond between parent and child. With sparse, poetic prose, McCarthy masterfully weaves a narrative that is both devastating and beautiful. As they travel through the ruins of civilization, the father and son encounter strange and terrifying creatures, but they also discover fragments of joy, love, and redemption. Will they be able to find a new beginning, or will their journey ultimately lead to the end?",
  },
  {
    _id: "669675d2927d5ddf43f10987",
    title: "Pr_ide and Prejudice",
    author: "Jane Austen",
    ISBN: "978-1503290563",
    genre: "Romance",
    published: 1813,
    pages: 384,
    image:
      "https://images-na.ssl-images-amazon.com/images/I/91eKRbuhgaL._SL1500_.jpg",
    description:
      "This classic romance novel tells the story of Elizabeth Bennet, a strong-willed and independent young woman, and Mr. Darcy, a wealthy and proud gentleman, who are initially dislike each other due to a series of misunderstandings and miscommunications. Through a series of events, they begin to see each other in a different light, and their mutual respect and admiration grow into a deep affection. The novel explores themes of love, class, and social status, as Elizabeth and Darcy navigate their complicated relationship and learn to overcome their initial biases. As they work through their differences, they come to realize that true love can only be achieved by embracing one's true nature and overcoming one's pr_ide and prejudices.",
  },
  {
    _id: "66b300fc167e7393c4c27991",
    title: "The 5 AM Club",
    author: "Robin Sharma",
    ISBN: "978-1524761838",
    genre: "Self-Help, Productivity",
    published: 2018,
    pages: 336,
    image: "https://m.media-amazon.com/images/I/61Av4S46owL.jpg",
    description:
      "Join the millions of people around the world who have already revolutionized their lives with the 5 AM Club. As you'll learn, the 5 AM Club is a simple yet profound routine that can transform your life in profound ways. From the most successful entrepreneurs to the top performers in various fields, the 5 AM Club has proven to be a game-changer. By waking up at 5 AM and dedicating the first 60 minutes to personal development, you can increase your energy, improve your focus, boost your creativity, and heighten your overall sense of well-being. With practical advice and inspiring stories from a w_ide range of leaders, scientists, and artists, this book will show you how you too can harness the power of the 5 AM Club to become the best version of yourself.",
  },
];
