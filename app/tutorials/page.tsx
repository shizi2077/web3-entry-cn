import type { Metadata } from "next";
import { TutorialsClient } from "./TutorialsClient";
import { tutorials } from "../../content/tutorials";

export const metadata: Metadata = {
  title: "新手教程中心｜Web3 币圈聚合导航",
  description: "14 篇中英文 Web3 新手教程：入金、充提币、钱包、硬件钱包与 TXID 排查。",
};

export default function TutorialsPage() {
  return <TutorialsClient tutorials={tutorials} />;
}
