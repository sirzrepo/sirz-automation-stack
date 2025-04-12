import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  coverImage: string;
}

const Library = () => {
  const [books] = useState<Book[]>([
    {
      id: 1,
      title: 'Introduction to Design Thinking',
      author: 'John Smith',
      category: 'Design',
      coverImage: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      title: 'Product Innovation Strategies',
      author: 'Emily Johnson',
      category: 'Innovation',
      coverImage: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      title: 'Agile Development Fundamentals',
      author: 'Michael Brown',
      category: 'Development',
      coverImage: 'https://via.placeholder.com/150'
    },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
            <p className="text-gray-600 mb-2">by {book.author}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {book.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Library; 