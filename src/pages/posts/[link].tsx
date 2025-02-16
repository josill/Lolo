import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/Error";
import Loading from "@/components/Loading";
import styles from "@/styles/post.module.css";
import fetchContent from "@/utils/fetchContent";

export default function PostDetail() {
  const router = useRouter();
  const { link } = router.query;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", link],
    queryFn: () => fetchContent(link as string),
    enabled: !!link,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage />;

  if (!data) return <ErrorMessage message="Post not found" />;

  return (
    <div className="p-4">
      {data.content ? (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: data.content || data.htmlContent }}
        />
      ) : (
        <ErrorMessage message="Failed to load post content" />
      )}
    </div>
  );
}
