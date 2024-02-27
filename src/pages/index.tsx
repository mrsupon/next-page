import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "@/lib/post";
import Helper from "@/lib/helper";
import Link from "next/link";
import { format, parseISO } from "date-fns";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

type propsType = { allPostsData: { id: string; date?: string; title?: string }[] };
export default function Home({ allPostsData }: propsType) {
    return (
        <Layout home={true}>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }: any) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <time dateTime={date}>{Helper.isoDateToFormat(date, "LLLL d, yyyy")}</time>;
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}
