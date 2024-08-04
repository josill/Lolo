interface Post {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  author: string;
  content: string;
  mediaContent?: {
    url: string;
    type: string;
    medium?: string;
    width?: string;
    height?: string;
  };
  source?: {
    _: string;
    url: string;
  };
  category?: {
    _: string;
    $?: Record<string, any>;
  }[];
}

interface Feed {
  name: string;
  link: string;
  color: string;
}
