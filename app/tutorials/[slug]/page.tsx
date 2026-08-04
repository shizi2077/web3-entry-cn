import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tutorialBySlug, tutorials } from "../../../content/tutorials";
import { TutorialArticleClient } from "./TutorialArticleClient";

export function generateStaticParams() {
  return tutorials.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = tutorialBySlug.get(slug);
  if (!item) return {};
  return {
    title: `${item.title.zh}｜新手教程`,
    description: item.summary.zh,
    alternates: { canonical: `https://shizi2077.github.io/web3-entry-cn/tutorials/${item.slug}/` },
  };
}

export default async function TutorialArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = tutorialBySlug.get(slug);
  if (!item) notFound();
  return <TutorialArticleClient tutorial={item} />;
}
