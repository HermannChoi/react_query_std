import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
const POSTS = [
  { id: 1, title: "React Query" },
  { id: 2, title: "Studying" },
];

function App() {
  const queryClient = useQueryClient();
  // main.jsx의 QueryClient로 연결시켜줌

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: (title) => {
      return wait(1000).then(() => POSTS.push({ id: uuidv4(), title }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <pre>Loading...</pre>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => {
          console.log(POSTS);
          newPostMutation.mutate("New Post");
        }}
      >
        Add New
      </button>
      <div className="box">
        <span className="text04">100%</span>
        <svg>
          <circle cx="100" cy="100" r="90" />
        </svg>
      </div>
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

//query = 데이터로 어딘가로부터 받아오는 거
//mutation = 데이터를 수정하는 거

export default App;
