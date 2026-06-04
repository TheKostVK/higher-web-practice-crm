import {useSelector} from "react-redux";
import {selectorUserIsInit} from "@/entities/user";

export function DashboardPage() {
    const isUserInit = useSelector(selectorUserIsInit);

    return (
        <div style={{gridColumn: 5}}>
            <h1>DashBoard template</h1>
            <p>
                {isUserInit ? 'true' : 'false'}
            </p>
        </div>
    )
}

