import {useSelector} from "react-redux";
import {selectorUserIsInit} from "../entities/user";

export function StubPage() {
    const isUserInit = useSelector(selectorUserIsInit);

    return (
        <div style={{gridColumn: 5}}>
            <h1>Study template</h1>
            <p>
                {isUserInit ? 'true' : 'false'}
            </p>
        </div>
    )
}

