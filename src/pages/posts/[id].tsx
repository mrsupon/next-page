import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "@/lib/post";
import { parseISO, format } from "date-fns";
import Helper from "@/lib/helper";

type propsType = { postData: { id: string; contentHtml: string; date?: string; title?: string } };
export default function Post({ postData }: propsType) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            <time dateTime={postData.date}>{Helper.isoDateToFormat(postData.date, "E. d LLLL yyyy")}</time>;
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
