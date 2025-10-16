export const commentsFromDB = [
  {
    id: 1,
    user: { name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    timestamp: '2025-05-30T10:00:00Z',
    content: 'Great article! Thanks for sharing.',
  },
  {
    id: 2,
    user: { name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    timestamp: '2025-05-29T17:42:00Z',
    content: 'Needs more details on topic X. Thanks!',
  },
  {
    id: 3,
    user: {
      name: 'Alice Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    timestamp: '2025-05-28T08:15:00Z',
    content:
      'Thanks for sharing this article. It was very helpful to me. Keep up the good work!',
  },
  {
    id: 4,
    user: { name: 'Bob Wilson', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    timestamp: '2025-05-27T14:30:00Z',
    content: 'This article is informative.',
  },
  {
    id: 5,
    user: { name: 'Emily Davis', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    timestamp: '2025-05-26T09:45:00Z',
    content:
      'I found this article helpful.Thanks for sharing! Keep up the good work!',
  },
];

export const postsFromDB = [
  {
    id: 1,
    title: 'Mastering React Hooks',
    description:
      'Learn how to effectively use React Hooks to simplify your components and state management.',
    slug: 'mastering-react-hooks',
    image: 'https://picsum.photos/800/600?random=1',
    date: '2025-05-10',
    category: {
      name: 'React',
      color: '#61dafb',
      slug: 'react',
    },
    author: {
      name: 'Alice Smith',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Alice',
    },
    editorsPick: true,
  },
  {
    id: 2,
    title: 'A Beginner’s Guide to TypeScript',
    description:
      'This guide helps JavaScript developers get started with TypeScript quickly and safely.',
    slug: 'beginners-guide-typescript',
    image: 'https://picsum.photos/800/600?random=2',
    date: '2025-05-08',
    category: {
      name: 'TypeScript',
      color: '#007acc',
      slug: 'typescript',
    },
    author: {
      name: 'Bob Johnson',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Bob',
    },
    editorsPick: false,
  },

  {
    id: 3,
    title: 'How to Optimize Web Performance in 2025',
    description:
      'Tips and strategies for making your site lightning fast with modern tools.',
    slug: 'web-performance-2025',
    image: 'https://picsum.photos/800/600?random=3',
    date: '2025-05-03',
    category: {
      name: 'Performance',
      color: '#10b981',
      slug: 'performance',
    },
    author: {
      name: 'Emily Tran',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Emily',
    },
    editorsPick: false,
  },
  {
    id: 4,
    title: 'Build a Blog with Next.js and MDX',
    description:
      'Learn how to combine the power of Next.js and MDX to build a modern blog platform.',
    slug: 'nextjs-mdx-blog',
    image: 'https://picsum.photos/800/600?random=4',
    date: '2025-04-30',
    category: {
      name: 'Next.js',
      color: '#000000',
      slug: 'nextjs',
    },
    author: {
      name: 'John Doe',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=John',
    },
    editorsPick: true,
  },
  {
    id: 5,
    title: 'How to Optimize Web Performance in 2025',
    description:
      'Tips and strategies for making your site lightning fast with modern tools.',
    slug: 'web-performance-2025',
    image: 'https://picsum.photos/800/600?random=5',
    date: '2025-05-03',
    category: {
      name: 'Performance',
      color: '#10b981',
      slug: 'performance',
    },
    author: {
      name: 'Emily Tran',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Emily',
    },
    editorsPick: false,
  }, {
    id: 6,
    title: 'Build a Blog with Next.js and MDX',
    description:
      'Learn how to combine the power of Next.js and MDX to build a modern blog platform.',
    slug: 'nextjs-mdx-blog',
    image: 'https://picsum.photos/800/600?random=6',
    date: '2025-04-30',
    category: {
      name: 'Next.js',
      color: '#000000',
      slug: 'nextjs',
    },
    author: {
      name: 'John Doe',
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Doe',
    },
    editorsPick: true,
  }
]