import type {ReactNode} from "react";
import Styles from "@/widgets/reportsContent/reportsContent.module.css";

export const ReportSection = ({title, children}: { title: string; children: ReactNode }) => (
    <section className={Styles.reportsContent__section}>
        <h2 className={Styles.reportsContent__sectionTitle}>{title}</h2>
        {children}
    </section>
);