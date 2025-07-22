import type { FC } from "react";

interface Props {
    username: string;
    email: string;
}

export const WelcomeHeader: FC<Props> = ({ username, email }) => (
    <>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome {username}
        </h1>
        <p className="text-sm text-gray-500 mb-5">Logged in as {email}</p>
    </>
);
